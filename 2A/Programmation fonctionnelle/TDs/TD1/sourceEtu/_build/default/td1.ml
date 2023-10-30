module Exercice1 = 
struct
  (* deuxieme  :  renvoie le deuxieme element d'une liste 
     signature : ('a, 'a) list -> 'a list
     paramètres: une liste d'éléments 
     résultat  : le deuxieme de la liste *)
  
  let rec deuxieme l =
    match l with
    | [] -> []
    | (_,b)::q -> b::deuxieme q

  (* TESTS *)
  let%test _ = deuxieme [] = []
  let%test _ = deuxieme [(2,3)] = [3]
  let%test _ = deuxieme [(1,2); (55,66)] = [2; 66]

  let second l = 
    match l with
    | _::e::_ -> e
    | _ -> failwith "second doesn't exist"

  (* TESTS *)
  (* let%test _ = second [] = "second doesn't exist"
  let%test _ = second [(2,3)] = "second doesn't exist" *)
  let%test _ = second [55; 66] = 66
  let%test _ = second [55; 66; 88; 99] = 66


  (* n_a_zero  :  renvoie la liste des entiers descendante (n)
    signature : int -> 'a list
    paramètres: l'entier n (le rang de la liste)
    résultat  : la liste des entiers descendante*)
  
  let rec n_a_zero n =
    if n < 0 then
      []
    else
      n::(n_a_zero (n - 1))
    (* match n with
    | 0 -> [0]
    | _ -> n::(n_a_zero (n - 1))
 *)
  (* TESTS *)
  let%test _ = n_a_zero 0 = [0]
  let%test _ = n_a_zero (-1) = []
  let%test _ = n_a_zero 3 = [3; 2; 1; 0]


(* zero_a_n  :  renvoie la liste des entiers ascendante (n)
    signature : int -> 'a list
    paramètres: l'entier n (le rang de la liste)
    résultat  : la liste des entiers ascendante*)
  
  let rec zero_a_n n =
    match n with
    | 0 -> [0]
    | _ -> (zero_a_n (n - 1))@[n]
  
  (*Generer zero_a_n a partir de n_a_zero*)
  (* let zero_a_n n =
    List.rev(n_a_zero n) *)

  (* TESTS *)
  let%test _ = zero_a_n 0 = [0]
  let%test _ = zero_a_n 1 = [0; 1]
  let%test _ = zero_a_n 3 = [0; 1; 2; 3]

end

module Exercice2 = 
struct
  
  (* map : applique une fonction sur tous les elmts d'une liste
     parametres : la fonction f et la liste l
     résultat : la liste des elements aprées l'application de f *)
  
  (* let rec map f l =
  match l with
  | [] -> []
  | t::q -> (f t)::(map f q) *)
  
  let map f l =
    List.fold_right (fun t mapQ -> (f t)::mapQ) l []
  
  (* TESTS *)
  let%test _= map (fun x -> 2*x) [] = []
  let%test _= map (fun x -> 2*x) [1] = [2]
  let%test _= map (fun x -> 1/x) [2; 6; 9] = [1/2; 1/6; 1/9]

  (* flatten : sert a faire l'aplatissement d'une liste de listes
    parametres : 'a list list  une liste de listes
    resultat : une liste*)

  (* let rec myFlatten ll=
  match ll with
  | [] -> []
  | sl::lf -> sl@myFlatten lf *)

  let myFlatten ll =
    List.fold_right (fun sl lf -> sl@lf) ll []

  (* TESTS *)

  let%test _= myFlatten [] = []
  let%test _= myFlatten [[5; 4]; [2; 6; 9]] = [5; 4; 2; 6; 9]


  (* fsts : renvoie la liste des premiers élements dechaque couples d'une liste
    signature : ('a * 'a) list -> 'a list
    parametres : la liste des couples
    resultat : la listes des premiers de la liste*)
    
  let fsts l = List.fold_right (fun (t, _) fstsq -> t::fstsq) l []
  (* let rec fsts l = 
    match l with
    | [] -> []
    | (t, _) :: rest -> t::(fsts rest) *)
    
  (* TESTS *)
  let%test _= fsts [] = []
  let%test _= fsts [(2, 6)] = [2]
  let%test _= fsts [(55, 77); (44, 00)] = [55; 44]

  (* split :  divise une liste des couples en deux listes, une des fsts et l'autres des sencond
     signature : ('a * 'a) list -> (('a list) * ('a list))
     parametres : une listes des couples
     resultat : une pair de deux liste*)

  
  (* ERROR :let mySplit l = 
    let rec aux ll acc 
      match ll with
      | [] -> acc
      | (x, y) :: rest -> let (l1, l2) = acc in
          aux rest ((x::l1), (y::l2))
    in aux l ([], []) *)

  let mySplit l =  List.fold_right (fun (t1, t2) (l1, l2) -> 
    ((t1::l1), (t2::l2))) l ([],[])

  (* TEST *)
  let%test _= mySplit [] = ([],[])
  let%test _ = mySplit [(1, 2)] = ([1], [2])
  

  (* supprimerDouble : supprime les doublons d'une liste
     signature : 'a list -> 'a list
     parametres : une liste qui peut contient des doublons
     resultat : la nouvelle listes sans doublons*)
  
  let supprimerDouble l = 
    let rec aux acc ll = 
      match ll with
      | [] -> acc
      | x::xs -> if (List.mem x acc) then aux acc xs 
      else aux (acc@[x]) xs 
    in 
    aux [] l

  (* ERROR :let supprimerDouble l =
    List.fold_right (fun x acc -> if List.mem x acc then acc
                                  else x::acc) l [] *)

  (* TESTS *)
  let%test _= supprimerDouble [] = []
  let%test _ = supprimerDouble [4; 4] = [4]
  let%test _= supprimerDouble [1; 2; 1] = [1; 2]
  let%test _= supprimerDouble [1; 2; 3; 2; 4; 3; 5; 6; 1] = [1; 2; 3; 4; 5; 6]
end