(*AKKAR KHADIJA*)
(*  Module qui permet la décomposition et la recomposition de données **)
(*  Passage du type t1 vers une liste d'éléments de type t2 (décompose) **)
(*  et inversement (recopose).**)
module type DecomposeRecompose =
sig
  (*  Type de la donnée **)
  type mot
  (*  Type des symboles de l'alphabet de t1 **)
  type symbole

  val decompose : mot -> symbole list
  val recompose : symbole list -> mot
end

module DRString : DecomposeRecompose with 
type mot = string and type symbole = char =
  struct
  
  type mot = string
  
  type symbole = char
  
  let decompose mot = 
    let rec decompose_aux i accu =
      if i < 0 then accu
      else decompose_aux (i-1) (mot.[i]::accu)
    in decompose_aux (String.length mot - 1) []

  let%test _= decompose "" = []
  let%test _= decompose "yous" = ['y'; 'o'; 'u'; 's']

  let recompose l =
    List.fold_right (fun s acc -> String.make 1 s ^ acc) l ""


  let%test _= recompose [] = ""
  let%test _= recompose ['y'; 'o'; 'u'; 's'] = "yous"
  
  
end

module DRNat : DecomposeRecompose with type mot = int and type symbole = int =
struct
  type mot = int

  type symbole = int 

  let decompose mot = 
    List.map int_of_string (List.map (String.make 1) (DRString.decompose (string_of_int mot)))

  let%test _= decompose 123 = [1; 2; 3]
  let%test _= decompose 0 = [0]

  let recompose l = 
    int_of_string (List.fold_right (^) (List.map string_of_int l) "")

  let%test _= recompose [1; 2; 3] = 123
end