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

rule scanner = parse
  | ['\n' '\t' ' ']+					{ (scanner lexbuf) }
  | commentaire						{ (scanner lexbuf) }
  | "model"						{ UL_MODEL::(scanner lexbuf) }
  | "{"							{ UL_ACCOUV::(scanner lexbuf) }
  | "}"							{ UL_ACCFER::(scanner lexbuf) }
  | "."             {UL_PT::(scanner lexbuf)}
  | ":"             {UL_DPT::(scanner lexbuf)}
  | ","             {UL_VIRG::(scanner lexbuf)}
  | ";"             {UL_PTVIRG::(scanner lexbuf)}
  | "["             {UL_CROUV::(scanner lexbuf)}
  | "]"             {UL_CRFER::(scanner lexbuf)}
  | "("             {UL_PAROUV::(scanner lexbuf)}
  | ")"             {UL_PARFER::(scanner lexbuf)}
  | "bool"          {UL_BOOL::(scanner lexbuf)}
  | "float"         {UL_FLOAT::(scanner lexbuf)}
  | ['1' - '9'] chiffre* as texte  {UL_INT (int_of_string texte)::(scanner lexbuf)}
  | "in"            {UL_IN::(scanner lexbuf)}
  | "out"           {UL_OUT::(scanner lexbuf)}
  | "from"          {UL_FROM::(scanner lexbuf)}
  | "to"            {UL_TO::(scanner lexbuf)}
  | "flow"          {UL_FLOW::(scanner lexbuf)}
  | "block"         {UL_BLOCK::(scanner lexbuf)}
  | "system"        {UL_SYSTEM::(scanner lexbuf)}
  | majuscule alphabet* as texte    {UL_IDENT (texte)::(scanner lexbuf)}     
  | minuscule alphabet* as texte    {IDENT (texte)::(scanner lexbuf)}  
  | eof							{ [UL_FIN] }
  | _ as texte				 		{ (print_string "Erreur lexicale : ");(print_char texte);(print_newline ()); (UL_ERREUR::(scanner lexbuf)) }

{

}
