(* AKKAR KHADIJA *)
(* contrat : 
   l_taille : int -> 'a -> 'a list
   Construit une liste de n fois le meme élément e
   parametre : int la taille de liste
   parametre : 'a l'élement exixtant n fois dans la liste
   résultat : 'a list la liste résultante qui contient l'element passée en parametre n fois *)
let rec l_taille n e = 
  match n with
  | 0 -> []
  | _ -> e::l_taille (n-1) e


(* Tests : *)
let%test _= l_taille 0 3 = []
let%test _= l_taille 3 0 = [0; 0; 0]
let%test _ = l_taille 2 'c' = ['c'; 'c']

(* Exception ArgumentInvalide*)
exception ArgumentInvalide
(* get : int -> 'a list -> 'a *)
(* Renvoie le i-ième élément d'une liste *)
(* La tête de la liste est à la position 0 *)
(* Erreur : l'exception ArgumentInvalide est levée si i est négatif *)
(* ou plus grand que la taille de la liste *)
let get i l = 
  if (i < 0 || i > (List.length l)) then raise ArgumentInvalide
  else
   List.nth l i


let%test _ = get 0 [ 5; 7; 3; 2 ] = 5
let%test _ = get 1 [ 5; 7; 3; 2 ] = 7
let%test _ = get 2 [ 5; 7; 3; 2 ] = 3
let%test _ = get 3 [ 5; 7; 3; 2 ] = 2
let%test _ = get 0 [ true; false; true ] = true
let%test _ = get 1 [ true; false; true ] = false
let%test _ = get 2 [ true; false; true ] = true

let%test _ =
  try
    let _ = get (-10) [] in
    false
  with ArgumentInvalide -> true

let%test _ =
  try
    let _ = get (-10) [ 1; 2; 3 ] in
    false
  with ArgumentInvalide -> true

let%test _ =
  try
    let _ = get (-10) [ 'a'; 'b'; 'c' ] in
    false
  with ArgumentInvalide -> true

let%test _ =
  try
    let _ = get 10 [] in
    false
  with ArgumentInvalide -> true

let%test _ =
  try
    let _ = get 10 [ 1; 2; 3 ] in
    false
  with ArgumentInvalide -> true

let%test _ =
  try
    let _ = get 10 [ 'a'; 'b'; 'c' ] in
    false
  with ArgumentInvalide -> true



(* set : int -> 'a list -> 'a -> 'a list *)
(* "Modifie" le i-ième élément d'une liste *)
(* La tête de la liste est à la position 0 *)
(* Pas de modification sur la liste s'il n'y a pas de i-ième élément*)
let set i l e = 
  if (i < 0 || i > (List.length l)) then l
  else List.mapi (fun k a -> if k = i then e else a) l


let%test _ = set 0 [ 5; 7; 3; 2 ] 10 = [ 10; 7; 3; 2 ]
let%test _ = set 1 [ 5; 7; 3; 2 ] 10 = [ 5; 10; 3; 2 ]
let%test _ = set 2 [ 5; 7; 3; 2 ] 10 = [ 5; 7; 10; 2 ]
let%test _ = set 3 [ 5; 7; 3; 2 ] 10 = [ 5; 7; 3; 10 ]
let%test _ = set 7 [ 5; 7; 3; 2 ] 10 = [ 5; 7; 3; 2 ]
let%test _ = set (-3) [ 5; 7; 3; 2 ] 10 = [ 5; 7; 3; 2 ]
let%test _ = set 0 [ true; false; true ] false = [ false; false; true ]
let%test _ = set 1 [ true; false; true ] false = [ true; false; true ]
let%test _ = set 2 [ true; false; true ] false = [ true; false; false ]
let%test _ = set 10 [ true; false; true ] false = [ true; false; true ]
let%test _ = set (-10) [ true; false; true ] false = [ true; false; true ]

