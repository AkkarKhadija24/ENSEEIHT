(* Exercice 1*)

(* max : int list -> int  *)
(* Paramètre : liste dont on cherche le maximum *)
(* Précondition : la liste n'est pas vide *)
(* Résultat :  l'élément le plus grand de la liste *)
let max l = 
  match l with
  | [] -> failwith " Liste vide!"
  | t::_ -> List.fold_right (fun x acc -> if x > acc then x else
    acc) l t


(************ tests de max ************)
let%test _ = max [ 1 ] = 1
let%test _ = max [ 1; 2 ] = 2
let%test _ = max [ 2; 1 ] = 2
let%test _ = max [ 1; 2; 3; 4; 3; 2; 1 ] = 4

(* TO DO : copier / coller les tests depuis conwayTests.txt *)

(* max_max : int list list -> int  *)
(* Paramètre : la liste de listes dont on cherche le maximum *)
(* Précondition : il y a au moins un élement dans une des listes *)
(* Résultat :  l'élément le plus grand de la liste *)
let max_max ll = 
  max (List.flatten ll)

(************ tests de max_max ************)
let%test _ = max_max [ [ 1 ] ] = 1
let%test _ = max_max [ [ 1 ]; [ 2 ] ] = 2
let%test _ = max_max [ [ 2 ]; [ 2 ]; [ 1; 1; 2; 1; 2 ] ] = 2
let%test _ = max_max [ [ 2 ]; [ 1 ] ] = 2
let%test _ = max_max [ [ 1; 1; 2; 1 ]; [ 1; 2; 2 ] ] = 2

(* Exercice 2*)

(* suivant : int list -> int list *)
(* Calcule le terme suivant dans une suite de Conway *)
(* Paramètre : le terme dont on cherche le suivant *)
(* Précondition : paramètre différent de la liste vide *)
(* Retour : le terme suivant *)

(* let rec suivant l = 
  match l with
  | [] -> []
  | hd::tl -> 
    let rec aux acc curr lst = 
      match lst with
      | [] -> (List.length acc + 1, curr)::[]
      | h::t when h = curr -> aux (h::acc) curr t
      | h::t -> aux [] h t
    in let count = aux [] hd tl in
    let flatt = List.flatten (List.map (fun (c, d) -> [c; d]) count) in
    flatt @ (suivant tl)
 *)
    let  suivant l= 
    let rec aux e occ res acc = 
     match res with 
     | []->  List.rev (e::occ::acc)
     | t::q -> if t= e then aux t (occ+1) q acc
               else  aux t 1 q (e::occ::acc)
     in   aux (List.hd l) 0 l []

(************ tests de suivant ************)
let%test _ = suivant [ 1 ] = [ 1; 1 ]
let%test _ = suivant [ 2 ] = [ 1; 2 ]
let%test _ = suivant [ 3 ] = [ 1; 3 ]
let%test _ = suivant [ 1; 1 ] = [ 2; 1 ]
let%test _ = suivant [ 1; 2 ] = [ 1; 1; 1; 2 ]
let%test _ = suivant [ 1; 1; 1; 1; 3; 3; 4 ] = [ 4; 1; 2; 3; 1; 4 ]
let%test _ = suivant [ 1; 1; 1; 3; 3; 4 ] = [ 3; 1; 2; 3; 1; 4 ]
let%test _ = suivant [ 1; 3; 3; 4 ] = [ 1; 1; 2; 3; 1; 4 ]
let%test _ = suivant [3;3] = [2;3]

(* suite : int -> int list -> int list list *)
(* Calcule la suite de Conway *)
(* Paramètre taille : le nombre de termes de la suite que l'on veut calculer *)
(* Paramètre depart : le terme de départ de la suite de Conway *)
(* Résultat : la suite de Conway *)
let rec suite n lp = 
  match n with
  | 1 -> [lp]
  | _ -> [lp] @ (suite (n-1) (suivant lp)) 

(*   List.fold_right (fun s suite1 ->  ) n lp 
 *)

(************ tests de suite ************)
let%test _ = suite 1 [ 1 ] = [ [ 1 ] ]
let%test _ = suite 2 [ 1 ] = [ [ 1 ]; [ 1; 1 ] ]
let%test _ = suite 3 [ 1 ] = [ [ 1 ]; [ 1; 1 ]; [ 2; 1 ] ]
let%test _ = suite 4 [ 1 ] = [ [ 1 ]; [ 1; 1 ]; [ 2; 1 ]; [ 1; 2; 1; 1 ] ]

(* Tests de la conjecture *)
(* "Aucun terme de la suite, démarant à 1, ne comporte un chiffre supérieur à 3" *)
(* TO DO *)
let%test _= suite 10 [1] = [[1]; [1; 1]; [2; 1]; [1; 2; 1; 1]; [1; 1; 1; 2; 2; 1]; [3; 1; 2; 2; 1; 1];
 [1; 3; 1; 1; 2; 2; 2; 1]; [1; 1; 1; 3; 2; 1; 3; 2; 1; 1];
 [3; 1; 1; 3; 1; 2; 1; 1; 1; 3; 1; 2; 2; 1];
 [1; 3; 2; 1; 1; 3; 1; 1; 1; 2; 3; 1; 1; 3; 1; 1; 2; 2; 1; 1]]

(* Remarque :  c'est une méthode fiable et efficace pour s'assurer que
 la propriété est vraie pour un certain nombre de termes, mais
 cela ne garantit pas que la propriété est vraie pour tous les termes
 de la suite de Conway. Cela dépend de la profondeur des tests effectués *)