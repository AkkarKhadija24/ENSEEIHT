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
let commentaire =
  (* Commentaire fin de ligne *)
  "#" [^'\n']*

rule lexer = parse
  | ['\n' '\t' ' ']+					{ (lexer lexbuf) }
  | commentaire						{ (lexer lexbuf) }
  | "{"							{ UL_ACCOUV }
  | "}"							{ UL_ACCFER }
  | "model"						{ UL_MODEL }
  | "."             {UL_PT}
  | ":"             {UL_DPT}
  | ","             {UL_VIRG}
  | ";"             {UL_PTVIRG}
  | "["             {UL_CROUV}
  | "]"             {UL_CRFER}
  | "("             {UL_PAROUV}
  | ")"             {UL_PARFER}
  | "bool"          {UL_BOOL}
  | "float"         {UL_FLOAT}
  | ['1' - '9'] chiffre* as texte  {UL_INT (int_of_string texte)}
  | "in"            {UL_IN}
  | "out"           {UL_OUT}
  | "from"          {UL_FROM}
  | "to"            {UL_TO}
  | "flow"          {UL_FLOW}
  | "block"         {UL_BLOCK}
  | "system"        {UL_SYSTEM}
  | majuscule alphabet* as texte    {UL_IDENT (texte)}     
  | minuscule alphabet* as texte    {IDENT (texte)}  
  | eof							{ UL_FIN }
  | _ as texte				 		{ (print_string "Erreur lexicale : ");(print_char texte);(print_newline ()); raise LexicalError }

{






}
