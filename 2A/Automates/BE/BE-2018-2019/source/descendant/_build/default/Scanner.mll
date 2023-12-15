{

(* Partie recopiée dans le fichier CaML généré. *)
(* Ouverture de modules exploités dans les actions *)
(* Déclarations de types, de constantes, de fonctions, d'exceptions exploités dans les actions *)

  open Tokens 
  exception Printf

}

(* Déclaration d'expressions régulières exploitées par la suite *)
let chiffre = ['0' - '9']
let minuscule = ['a' - 'z']
let majuscule = ['A' - 'Z']
let alphabet = minuscule | majuscule
let alphanum = alphabet | chiffre | '_'
let chaine = '"' (alphabet)* '"'
let nombre = ('+' | '-')? chiffre chiffre*
let commentaire =
  (* Commentaire fin de ligne *)
  "#" [^'\n']*

rule scanner = parse
  | ['\n' '\t' ' ']+					{ (scanner lexbuf) }
  | commentaire						{ (scanner lexbuf) }
  | "null"						{ UL_VIDE::(scanner lexbuf) }
  | eof							{ [UL_FIN] }
  | "["         {UL_CROOUV::(scanner lexbuf)}
  | "]"         {UL_CROFER::(scanner lexbuf)}
  | ","      {UL_VIRG::(scanner lexbuf)}
  | ":"       {UL_DBLPT::(scanner lexbuf)}
  | "true"  {UL_VRAI::(scanner lexbuf)}
  | "false" {UL_FAUX::(scanner lexbuf)}
  | chaine as texte {UL_CHAINE (texte)::(scanner lexbuf)}
  | nombre as texte {UL_NOMBRE (int_of_string texte)::(scanner lexbuf)}
  | "{"							{ UL_ACCOUV ::(scanner lexbuf)}
  | "}"							{ UL_ACCFER ::(scanner lexbuf)}
  | _ as texte				 		{ (print_string "Erreur lexicale : ");(print_char texte);(print_newline ()); (UL_ERREUR::(scanner lexbuf)) }

{

}
