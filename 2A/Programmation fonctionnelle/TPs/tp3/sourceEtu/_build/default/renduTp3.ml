(*** Combinaisons d'une liste ***)

(* CONTRAT
Fonction prend en paramètre un élément k et une liste l et qui insére e à toutes les possitions possibles dans l
Pamaètre e : ('a) l'élément à insérer
Paramètre l : ('a list) la liste initiale dans laquelle insérer e
Reesultat : la liste des listes avec toutes les insertions possible de e dans l
*)

let rec combinaison k l = 
  match (k, l) with
  | (0, _) -> [[]]
  | (_, []) -> []
  | (k, t::q) -> (List.map (fun s -> t::s) (combinaison (k-1) q))@(combinaison k q)

(* TESTS *)
let%test _ = combinaison 0 [1; 2] = [[]]
let%test _ = combinaison 3 [] = []
let%test _ = combinaison 3 [1;2;3;4] = [[1;2;3]; [1;2;4]; [1;3;4]; [2;3;4]]