(* Evaluation des expressions simples *)


(* Module abstrayant les expressions *)
module type ExprSimple =
sig
  type t
  val const : int -> t
  val plus : t -> t -> t
  val mult : t-> t -> t
end

(* Module réalisant l'évaluation d'une expression *)
module EvalSimple : ExprSimple with type t = int =
struct
  type t = int
  let const c = c
  let plus e1 e2 = e1 + e2
  let mult e1 e2 = e1 * e2
end


(* Solution 1 pour tester *)
(* A l'aide de foncteur *)

(* Définition des expressions *)
module ExemplesSimples (E:ExprSimple) =
struct
  (* 1+(2*3) *)
  let exemple1  = E.(plus (const 1) (mult (const 2) (const 3)) )
  (* (5+2)*(2*3) *)
  let exemple2 =  E.(mult (plus (const 5) (const 2)) (mult (const 2) (const 3)) )
end

(* exo 1 *)
(* ermet de convertir les expressions en chaîne de caractères. *)
module PrintSimple : ExprSimple with type t = string =
struct
  type t = string
  let const c = string_of_int c
  let plus e1 e2 = "(" ^ e1 ^ " + " ^ e2 ^")"
  let mult e1 e2 = "(" ^ e1 ^ " * " ^ e2^")"
end

module PrintExemples = ExemplesSimples (PrintSimple)
let%test _= PrintExemples.exemple1 = "(1 + (2 * 3))"
let%test _= PrintExemples.exemple2 = "((5 + 2) * (2 * 3))"

module CompteSimple : ExprSimple with type t = int = 
struct
  type t = int
  let const _ = 0
  let plus e1 e2 = e1 + e2 + 1
  let mult e1 e2 = e1 + e2 + 1
end

module CompteExemples = ExemplesSimples (CompteSimple)
let%test _= CompteExemples.exemple1 = 2
let%test _= CompteExemples.exemple2 = 3



module type ExprVar =
sig
  type t (* type k : voir ligne 73 *)
  val def : (string * t) -> t -> t (* let a = 3 in exp*)
  val var : string -> t
end 

module type Expr = 
sig
  include ExprSimple
  include (ExprVar with type t := t) (*k := t  (voir ligne 65)*)
end

module PrintVar : ExprVar with type t = string = 
struct
  type t = string
  let def (x, a) b = "let " ^ x ^" = " ^ a ^ " in " ^ b
  let var x = x
end

module Print : Expr with type t = string = 
struct
include PrintSimple
include (PrintVar : ExprVar with type t := t)
end

module VarExemples (E:Expr) = 
struct
  (* let x = 1+2 in x*3 *)
  let exemple = E.(def ("x", (plus (const 1) (const 2))) (mult (var "x") (const 3)) )
end

module PrintVarExemples1 = VarExemples(Print)
let%test _= PrintVarExemples1.exemple = "let x = (1 + 2) in (x * 3)"


module PrintVarExemples2 = ExemplesSimples(Print)

let%test _ = (PrintVarExemples2.exemple1 = "(1 + (2 * 3))")
let%test _ = (PrintVarExemples2.exemple2 = "((5 + 2) * (2 * 3))")

type env = (string * int) list

module EvalVar : ExprVar with type t = env -> int =
struct
  type t = env -> int
  let def (x, a) b = fun env -> b ((x, a env)::env) 
  let var x = try List.assoc x with Not_found -> failwith "forme_expression_invalide" 
end


module EvalSimpleEnv : ExprSimple with type t = env -> int =
struct
  type t = env -> int
  let const a = fun _env -> a
  let plus a b = fun env -> (a env) + (b env)
  let mult a b = fun env -> (a env) * (b env)
end

module Eval : Expr with type t = env -> int =
struct
    include EvalSimpleEnv
    include (EvalVar : ExprVar with type t := t)
end

module TestNonReg (E: Expr) = 
struct
include ExemplesSimples(E)
(* let x = 1+2 in x*3 *)
  let exemple3 = E.(def ("x", (plus (const 1) (const 2))) (mult (var "x" ) (const 3)))
end


module EvalExemples = TestNonReg (Eval)

let%test _= EvalExemples.exemple1 [] = 7
let%test _= EvalExemples.exemple2 [] = 42
let%test _= EvalExemples.exemple3 [] = 9

















(* module CompteSimple : ExprSimple with type t = int =
struct
  type t = int
  let const _ = 0
  let plus e1 e2 = 1 + e1 + e2
  let mult e1 e2 = 1 + e1 + e2
end

(* Module abstrayant les expressions *)
module type ExprVar =
sig
  type t (* chiwawa *)
  val def : (string*t) -> t -> t (* let a = 3 in exp*)
  val var : string -> t
end

module type Expr =
sig
  include ExprSimple
  include (ExprVar with type t := t) (*chiwawa := t*)
end


(* Module de conversion des expressions en chaine *)
module PrintVar : ExprVar with type t = string =
struct
  type t = string
  let def (str, e1) e2 = "let "^str^" = "^e1^" in "^e2
  let var str = str
end

module Print : Expr with type t = string =
struct
  include PrintSimple
  include (PrintVar : ExprVar with type t := t)
end

(* Définition des expressions *)
module ExemplesSimples2 (E:Expr) =
struct
  include ExemplesSimples(E) (* tant que tout ce qui est dans exeplessimples existe deja dans E dans on a le droit de faire *)
  (* let a = 6 in (((a+2)*4)+(6*a)) 
     “let x = 1+2 in x*3” *)
  let exemple4 = E.(def ("x", (plus (const 1) (const 2))) (mult (var "x") (const 3)))
  (* let exemple3 = E.(def ("a" ,(const 6)) (plus (mult (plus (var "a") (const 2)) (const 4)) (mult (const 6) (var "a")))) *)
end


module CompteExemples =  ExemplesSimples (EvalSimple)

let%test _ = (CompteExemples.exemple1 = 2)
let%test _ = (CompteExemples.exemple2 = 3)


module PrintExemples =  ExemplesSimples (EvalSimple)

let%test _ = (PrintExemples.exemple1 = "(1+2*3)")
let%test _ = (PrintExemples.exemple2 = "(5+2)*2*3")

(* Module d'évaluation des exemples *)
module EvalExemples =  ExemplesSimples (EvalSimple)

let%test _ = (EvalExemples.exemple1 = 7)
let%test _ = (EvalExemples.exemple2 = 42)


type env = (string*int) list ;; *)