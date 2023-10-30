module Td2 = 
struct
(* EXO 1 *)
(* Le nombre de parties d'un ens de cardinale n c'est  2^n *)

(* EXO 2 *)
(*--------------------------------------------------------------*)
  (* ajout  :  ajouter un element a chaque sous ensemble d'un grand ensemble
     signature : 'a list -> 'a list list
     paramètres: une liste (un ensemble)
     résultat  : la nouvelle liste créer (ensemble) *)
  
  let ajout e l = 
    List.flatten (List.map (fun t -> [t; e::t]) l)


  (* let ajout e l = 
    List.fold_right (fun t fq -> t::(e::t)::fq) l [] *)


  (* TESTS *)
  let%test _ = ajout 2 [] = []
  let%test _ = ajout 7 [[3]] = [[3]; [7;3]]
  let%test _ = ajout 7 [[3]; [2]] = [[3]; [7;3]; [2]; [7;2]]
  
  

  (* let rec parties l =
    match l with
    | [] -> [[]]
    | t::q -> ajout t (parties q) *)

  let parties l = 
    List.fold_right ajout l [[]]

  let%test _ = parties [] =[[]]
  let%test _ = parties [3] = [[]; [3]]
  let%test _= parties [3; 2] = [[]; [3]; [2]; [3;2]]

  (*--------------------------------------------------------------*)
  
  (* EXO 1 *)
  (* Le nombre de permutations d'un ens de taille n c'est  n! *)

  (* EXO 4 *)
  (*--------------------------------------------------------------*)

  let rec insertions e l = 
    match l with
    | [] -> [[e]]
    | t::rest -> [e::l]@(List.map (fun s -> t::s) (insertions e rest))

  let%test _= insertions  'a' [] = [['a']]
  let%test _= insertions 'b' ['a'] = [['b'; 'a']; ['a'; 'b']]

 (*  let rec permutations l = 
    match l with
    | [] -> [[]]
    | t::q -> List.flatten (List.map (fun s -> insertions t s)
    (permutations q)) 
   *)
  let permutations l = 
    List.fold_right (fun t permQ -> List.flatten (List.map 
    (insertions t) permQ)) l [[]]


  let%test _= permutations [] = [[]]
  let%test _= permutations [1] = [[1]]
  let%test _= permutations ['a';'b'] = [['a';'b']; ['b';'a']] 

  (*--------------------------------------------------------------*)
  
  (* EXO 6 *)
  (*--------------------------------------------------------------*)
  
  let rec combinaisons k l = 
    match (k, l) with
    | (0, _) -> [[]]
    | (_, []) -> []
    | (_, t::q) -> (List.map (fun x -> t::x) (combinaisons (k-1) q))@(combinaisons k q)

    let%test _= combinaisons 0 [1] = [[]]
    let%test _= combinaisons 5 [] = []
    let%test _= combinaisons 3 [1;2;3;4] = [[1;2;3]; [1;2;4]; [1;3;4]; [2;3;4]]
  
end
