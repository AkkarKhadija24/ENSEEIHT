(* EXO 1 *)
(**********************************************************************)
module type Collection = 
sig 
  type 'a t
  val vide : 'a t
  val est_vide : 'a t -> bool
  val ajouter : 'a t -> 'a -> 'a t
  val supprimer : 'a t -> ('a * 'a t)

end

module Pile : Collection =
struct
  type 'a t = 'a list
  exception  Collection_empty
  let vide = []
  let est_vide c = (c = vide)
  let ajouter e c = e::c 
  let supprimer c = 
    match c with
    | [] -> exception Collection_empty
    | t:: q -> (t, q)
end

module File : Collection =
struct
  type 'a t = 'a list
  exception  Collection_empty
  let vide = []
  let est_vide c = (c = vide)
  let ajouter e c = c@[e]
  let supprimer c = 
    match c with
    | [] -> exception Collection_empty
    | t:: q -> (t, q)
end
(**********************************************************************)


(* EXO 2 *)
(**********************************************************************)

module type Fold = 
sig
  type a
  type b
  val cas_base : b
  val  traiter : a -> b -> b
end

module CreerListeEntier : Fold with type a = int 
  and type b = int list = 
struct
  type a = int
  type b = int list
  let cas_base = []
  let traiter e l = 
    e::l
end

module RechercheNombrePair : Fold with type a =  and type b = = 
struct
  type a = int 
  type b = int option
  let cas_base = None
  let traiter i q = 
    if (i%2 = 0) then some i 
    else q
end
(**********************************************************************)

(* EXO 3 :: FONCTEURS*)
(**********************************************************************)
(*3-1*)
module FoldList ( F: Fold) = 
struct
  let rec fold_right l = 
    match l with
    |[] -> F.cas_base
    | t::q -> F.traiter t (fold_right q)
end

module FoldCollection (C : Collection) (F : Fold) = 
struct
  let rec fold col = 
    if c.est_vide col then F.cas_base 
    else let (t, q) = C.supprimer col in 
    F.traiter t (fold q)
end


(*3-2*)
(**********************************************************************)


