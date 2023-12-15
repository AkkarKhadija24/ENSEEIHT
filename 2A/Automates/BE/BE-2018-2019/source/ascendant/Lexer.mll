(* AKKAR KHADIJA *)
{

(* Partie recopiée dans le fichier CaML généré. *)
(* Ouverture de modules exploités dans les actions *)
(* Déclarations de types, de constantes, de fonctions, d'exceptions exploités dans les actions *)

  open Parser 
  exception LexicalError

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

rule lexer = parse
  | ['\n' '\t' ' ']+					{ (lexer lexbuf) }
  | commentaire						{ (lexer lexbuf) }
  | "["         {UL_CROOUV}
  | "]"         {UL_CROFER}
  | ","      {UL_VIRG}
  | ":"       {UL_DBLPT}
  | "true"  {UL_VRAI}
  | "false" {UL_FAUX}
  | chaine as texte {UL_CHAINE (texte)}
  | nombre as texte {UL_NOMBRE (int_of_string texte)}
  | "null"						{ UL_VIDE }
  | "{"							{ UL_ACCOUV }
  | "}"							{ UL_ACCFER }
  | eof							{ UL_FIN }
  | _ as texte				 		{ (print_string "Erreur lexicale : ");(print_char texte);(print_newline ()); raise LexicalError }

{

}
