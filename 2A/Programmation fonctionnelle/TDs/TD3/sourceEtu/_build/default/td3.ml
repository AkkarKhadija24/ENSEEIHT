open Chaines

(* EXO 1 *)
(*--------------------------------------------------------------*)
type 'a arbre = Noeud of bool * ( ('a branche) list)
and 'a branche = 'a * 'a arbre
(*--------------------------------------------------------------*)

(* Pour les tests *)
let bb = ('b',Noeud(false,[('a',Noeud(false,[('s',Noeud(true,[]));('t',Noeud(true,[]))]))]))
let bd = ('d',Noeud(false,[('e',Noeud(true,[]))]))
let bl = ('l',Noeud(false,[('a',Noeud(true,[('i',Noeud(true,[('d',Noeud(true,[]));('t',Noeud(true,[]))]));('r',Noeud(false,[('d',Noeud(true,[]))]))]));
                          ('e',Noeud(true,[('s',Noeud(true,[]))]));
                          ('o',Noeud(false,[('n',Noeud(false,[('g',Noeud(true,[]))]))]))]))
let b1 = [bb;bd;bl]
let arbre_test = Noeud(false,b1)

(* EXO 2 *)
(*--------------------------------------------------------------*)
let rec recherche e l = 
  match l with
  | [] -> None
  | ((ltt, ltq):: rest) -> if e = ltt then Some ltq 
                          else if e < ltt then None  
                            (* e < ltq : car l'arbre est 
                                trier de gche a dte *)
                          else recherche e rest


let rec appartient mot (Noeud(b, lb)) = 
  match mot with
  | [] -> b
  | t::q -> match (recherche t lb) with
            | None -> false
            | Some a -> appartient q a

let%test _= appartient [] arbre_test = false
let%test _= appartient ['b'; 'a'] arbre_test = false
let%test _= appartient ['b'; 'a'; 's'] arbre_test = false
(*--------------------------------------------------------------*)


(* EXO 3 *)
(*--------------------------------------------------------------*)

let rec m_a_j ch lb new_arb =
  match lb with
  | [] -> [(ch, new_arb)]
  | ((ltt, ltq):: rest) -> if ch = ltt then (ch, new_arb)::rest
                          else if ch < ltt then (ch, new_arb)::lb 
                            else (ltt, ltq)::(m_a_j ch rest new_arb)


let rec ajout mot (Noeud(b, lb)) = 
  match mot with
  | [] -> Noeud(true, lb)
  | t::q -> let new_arb = 
            match (recherche t lb) with
            | None -> Noeud(false, [])
            | Some a -> a 
  in Noeud(b, m_a_j t lb (ajout q new_arb))

let%test _= ajout [] arbre_test = Noeud(true, b1)
let%test _= ajout ['b'; 'a'; 's'] arbre_test = arbre_test
(* let%test _= ajout ['k'; 'a'] arbre_test =  Noeud (false,
 [('b',
   Noeud (false,
    [('a', Noeud (false, [('s', Noeud (true, [])); ('t', Noeud (true, []))]))]));
  ('d', Noeud (false, [('e', Noeud (true, []))]));
  ('k', Noeud (false, [('a', Noeud (true, []))]));
  ('l',
   Noeud (false,
    [('a',
      Noeud (true,
       [('i', Noeud (true, [('d', Noeud (true, [])); ('t', Noeud (true, []))]));
        ('r', Noeud (false, [('d', Noeud (true, []))]))]));
     ('e', Noeud (true, [('s', Noeud (true, []))]));
     ('o', Noeud (false, [('n', Noeud (false, [('g', Noeud (true, []))]))]))]))])*)
(*--------------------------------------------------------------*)

(* EXO 4 *)
(*--------------------------------------------------------------*)
type ('a,'b) trie = Trie of ('b arbre) * ('a -> 'b list) * ('b list -> 'a)

let nouveau fd fr = Trie(Noeud(false,[]), fd, fr)


(*--------------------------------------------------------------*)

(* EXO 5 *)
(*--------------------------------------------------------------*)
let appartient_trie  mot (Trie(trie , fd, _)) =
  appartient (fd mot) trie


(*--------------------------------------------------------------*)

  (* EXO 6 *)
(*--------------------------------------------------------------*)
let ajout_trie mot (Trie(trie, fd, fr)) =
  Trie (ajout(fd mot) trie,fd,fr)
(*--------------------------------------------------------------*)

(*  Pour les tests *)

let trie_sujet =
  List.fold_right ajout_trie
    ["bas"; "bât"; "de"; "la"; "lai"; "laid"; "lait"; "lard"; "le"; "les"; "long"]
    (nouveau decompose_chaine recompose_chaine)

(* TESTS *)
let%test _= appartient_trie "laid" trie_sujet

let%test _= ajout_trie "laid" trie_sujet = trie_sujet
