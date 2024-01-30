(* AKKAR Khadija *)

type zero = private Dummy1
type _ succ = private Dummy2
type nil = private Dummy3
type 'a list = Nil | Cons of 'a * 'a list

(* EXO 1 *)

type ('a, 'n) nlist = 
  | Nil : ('a, zero) nlist
  | Cons : 'a * ('a, 'n) nlist -> ('a, 'n succ) nlist

(* POur regler le probleme de genericite de n et a pour qu'on va pas 
  avoir un probleme de pattarn matchen comme on dit qlq soit n = type n. *)
let rec map : type n. ('a -> 'b) -> ('a, n) nlist -> ('b, n) nlist =
fun f nl -> 
  match nl with
  | Nil -> Nil
  | Cons (e, sous_nl) -> Cons (f e, (map f sous_nl))

let%test _ = map (fun e -> e) Nil = Nil
let%test _ = map (fun e -> e) Cons (2, Nil) = Cons (2, Nil)

let rec snoc : type n. 'a -> ('a, n) nlist -> ('a, n succ) nlist = 
 fun e nl ->
  match nl with
  | Nil -> Cons (e, Nil)
  | Cons (t, q) -> Cons (t, snoc e q)

let%test _ = snoc "khadija" Nil = Cons ("khadija", Nil)
let%test _ = snoc "akkar" Cons ("Khadija", Nil) = Cons ("khadija", Cons ("akkar", Nil))

let tail : type n. ('a, n succ) nlist -> ('a, n) nlist = function
  | Cons (_, q) -> q

let%test _ = tail Cons ("khadija", Cons ("akkar", Nil)) = Cons ("akkar", Nil)

let rec rev : type n. ('a, n) nlist -> ('a, n) nlist = function
  | Nil -> Nil
  | Cons (t, q) -> snoc t (rev q)

let%test _ = rev Nil = Nil
let%test _ = rev Cons ("khadija", Cons ("akkar", Nil)) = Cons ("akkar", Cons ("khadija", Nil))
  

(* EXO 2 *)

let rec insert : type n. 'a -> ('a, n) nlist -> ('a, n succ) nlist = 
fun e nl ->
  match nl with
  | Nil -> Cons (e, Nil)
  | Cons (t, q) -> if t < e then Cons (t, insert e q) else Cons (e, nl)

let%test _ = insert 4 Nil = Nil
let%test _ = insert 4 Cons (5, Cons (6, Nil)) = Cons (4, Cons (5, Cons (6, Nil)))
let%test _ = insert 4 Cons (3, Cons (6, Nil)) = Cons (3, Cons (4, Cons (6, Nil)))


let rec insertion_sort : type n. ('a, n) nlist -> ('a, n) nlist = 
fun l -> 
  match l with
  | Nil -> Nil
  | Cons (t, q) -> insert t (insertion_sort q)

let%test _ = insertion_sort Nil = Nil
let%test _ = insertion_sort Cons (5, Cons (2, Nil)) = Cons (2, Cons (5, Nil))
let%test _ = insertion_sort Cons (3, Cons (6, Cons (1, Nil))) = Cons (1, Cons (3, Cons (6, Nil)))


(* EXO 3 *)

type 'a hlist = 
| Nil : nil hlist
| Cons : 'p * 'a hlist -> ('p * 'a) hlist

let rec tail : type a. (a * 'p) hlist -> 'p hlist = function
    | Cons (_, q) -> q

let%test _ = tail Cons (1, Cons (true, Nil)) = Cons (true, Nil)

let add : type a. (int * (int * a)) hlist -> (int * a) hlist = function
  | Cons (t1, Cons (t2, q)) -> Cons (t1+t2, q)

let%test _ = add Cons (1, Cons (2, Cons (true, Nil))) = Cons (1, Cons (2, Cons (3, Cons (true, Nil))))
