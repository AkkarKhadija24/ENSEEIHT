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
let commentaire =
  (* Commentaire fin de ligne *)
  "#" [^'\n']*

let Ident = majuscule alphabet*

rule scanner = parse
  | ['\n' '\t' ' ']+					{ (scanner lexbuf) }
  | commentaire						{ (scanner lexbuf) }
  | "{"							{ UL_LEFT_BRACE::(scanner lexbuf) }
  | "}"							{ UL_RIGHT_BRACE::(scanner lexbuf) }
  | "package"						{ UL_PACKAGE::(scanner lexbuf) }
  | minuscule alphabet* as name   { (UL_PACKAGE_IDENT name)::(scanner lexbuf)}
  | Ident as texte         { (UL_INTERFACE_IDENT texte)::(scanner lexbuf)}
  | "."    {UL_DOT::(scanner lexbuf)}
  | ","   {UL_COMMA::(scanner lexbuf)}
  | ";"    {UL_SEMICOLON::(scanner lexbuf)}
  | "(" {UL_LEFT_PAREN::(scanner lexbuf)}
  | ")"    {UL_RIGHT_PAREN::(scanner lexbuf)}
  | "interface"   {UL_INTERFACE::(scanner lexbuf)}
  | "extends"   {UL_EXTENDS::(scanner lexbuf)}
  | "boolean" {UL_BOOLEAN::(scanner lexbuf)}
  | "int"    {UL_INT::(scanner lexbuf)}
  | "void"   { UL_VOID::(scanner lexbuf)}                   
  | eof							{ [UL_FIN] }
  | _ as texte				 		{ (print_string "Erreur lexicale : ");(print_char texte);(print_newline ()); (UL_ERREUR::(scanner lexbuf)) }

{

}
