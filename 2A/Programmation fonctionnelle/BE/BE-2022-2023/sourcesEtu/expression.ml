(*AKKAR KHADIJA*)
(* Exercice 3 *)
module type Expression = sig
  (* Type pour représenter les expressions *)
  type exp


  (* eval : exp -> int
   permet d’évaluer la valeur d’une expression. 
   parametre : exp : l'expression a evaluer
   resultat : la valeur de l'espression passée en parametres *)
  val eval : exp -> int
end

(* Exercice 4 *)

module ExpAvecArbreBinaire : Expression = 
struct
  type op = Moins | Plus | Mult | Div
  type exp = Binaire of exp * op * exp | Entier of int

  (* eval *)
  let rec eval e =  
    match e with
    | Entier x -> x
    | Binaire (e1, op, e2) -> 
      match op with
        | Moins -> (eval e1) - (eval e2)
        | Plus -> (eval e1) + (eval e2)
        | Mult -> (eval e1) * (eval e2)
        | Div -> if (eval e2) = 0 then raise (Failure "")  else (eval e1) / (eval e2)

  (* TESTS EVAL *)
  let%test _= eval (Binaire (Entier 3, Plus, Entier 4)) = 7
  let%test _= eval (Binaire (Binaire ((Entier 3, Plus, Entier 4)), Moins, Entier 12)) = -5
  let%test _ = eval (Binaire ((Entier 2), Moins, (Entier 3))) = -1
  let%test _ = eval (Binaire ((Entier 2), Mult, (Entier 3))) = 6
  let%test _ = eval (Binaire ((Entier 2), Div, (Entier 3))) = 0
end

(* Exercice 5 *)

module ExpAvecArbreNaire : Expression = 
struct
  
  (* Linéarisation des opérateurs binaire associatif gauche et droit *)
  type op = Moins | Plus | Mult | Div
  type exp = Naire of op * exp list | Valeur of int

  
  (* bienformee : exp -> bool *)
  (* Vérifie qu'un arbre n-aire représente bien une expression n-aire *)
  (* c'est-à-dire que les opérateurs d'addition et multiplication ont au moins deux opérandes *)
  (* et que les opérateurs de division et soustraction ont exactement deux opérandes.*)
  (* Paramètre : l'arbre n-aire dont ont veut vérifier si il correspond à une expression *)
  let rec bienformee e = 
    match e with
    | Valeur (_) -> true
    | Naire (o, l) -> let curr =
      match o with
        | Plus | Mult -> ((List.length l) >= 2)
        | Moins | Div -> ((List.length l) == 2 )
    in curr && (List.for_all bienformee l)


  let en1 = Naire (Plus, [ Valeur 3; Valeur 4; Valeur 12 ])
  let en2 = Naire (Moins, [ en1; Valeur 5 ])
  let en3 = Naire (Mult, [ en1; en2; en1 ])
  let en4 = Naire (Div, [ en3; Valeur 2 ])
  let en1err = Naire (Plus, [ Valeur 3 ])
  let en2err = Naire (Moins, [ en1; Valeur 5; Valeur 4 ])
  let en3err = Naire (Mult, [ en1 ])
  let en4err = Naire (Div, [ en3; Valeur 2; Valeur 3 ])

  let%test _ = bienformee en1
  let%test _ = bienformee en2
  let%test _ = bienformee en3
  let%test _ = bienformee en4
  let%test _ = not (bienformee en1err)
  let%test _ = not (bienformee en2err)
  let%test _ = not (bienformee en3err)
  let%test _ = not (bienformee en4err)

  (* eval : exp-> int *)
  (* Calcule la valeur d'une expression n-aire *)
  (* Paramètre : l'expression dont on veut calculer la valeur *)
  (* Précondition : l'expression est bien formée *)
  (* Résultat : la valeur de l'expression *)
  let rec eval_bienformee e =  
    match e with
    | Valeur (x) -> x
    | Naire (op, l) -> 
      match op with
        | Moins -> List.fold_right (fun e acc -> eval_bienformee(e) - acc) l 0
        | Plus -> List.fold_right (fun e acc -> eval_bienformee(e) + acc) l 0
        | Mult -> List.fold_right (fun e acc -> eval_bienformee(e) * acc) l 1
        | Div -> List.fold_right (fun e acc -> eval_bienformee(e) / acc) l 1

  

  let%test _ = eval_bienformee en1 = 19
  let%test _ = eval_bienformee en2 = 14
  let%test _ = eval_bienformee en3 = 5054
  let%test _ = eval_bienformee en4 = 2527

  (* Définition de l'exception Malformee *)
  (* TO DO *)
  exception Malformee

  (* eval : exp-> int *)
  (* Calcule la valeur d'une expression n-aire *)
  (* Paramètre : l'expression dont on veut calculer la valeur *)
  (* Résultat : la valeur de l'expression *)
  (* Exception  Malformee si le paramètre est mal formé *)
  let eval  e = 
   if bienformee e then eval_bienformee e
   else raise Malformee

  let%test _ = eval en1 = 19
  let%test _ = eval en2 = 14
  let%test _ = eval en3 = 5054
  let%test _ = eval en4 = 2527

  let%test _ =
    try
      let _ = eval en1err in
      false
    with Malformee -> true

  let%test _ =
    try
      let _ = eval en2err in
      false
    with Malformee -> true

  let%test _ =
    try
      let _ = eval en3err in
      false
    with Malformee -> true

  let%test _ =
    try
      let _ = eval en4err in
      false
    with Malformee -> true

end
(* TO DO avec l'aide du fichier  expressionArbreNaire.txt *)