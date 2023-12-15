open List

type token = 
    | UL_ACCOUV
    | UL_ACCFER
    | UL_MODEL
    | UL_IDENT of string
    | UL_PT 
    | UL_DPT
    | UL_VIRG 
    | UL_PTVIRG 
    | UL_CRFER
    | UL_CROUV
    | UL_PAROUV
    | UL_PARFER
    | UL_BOOL 
    | UL_FLOAT
    | UL_INT of int
    | UL_IN 
    | UL_OUT 
    | UL_FROM
    | UL_TO  
    | UL_FLOW 
    | UL_BLOCK  
    | UL_SYSTEM 
    | IDENT of string
    | UL_FIN
    | UL_ERREUR;;

type inputStream = token list;;

(* string_of_token : token -> string *)
(* Converti un token en une chaîne de caractère*)
let string_of_token token =
     match token with
       | UL_ACCOUV -> "{"
       | UL_ACCFER -> "}"
       | UL_MODEL -> "model"
       | UL_IDENT n -> n
       | UL_PT -> "."
       | UL_DPT -> ":"
       | UL_VIRG -> ","
       | UL_PTVIRG -> ";"
       | UL_CRFER -> "]"
       | UL_CROUV -> "["
       | UL_PAROUV -> "("
       | UL_PARFER -> ")"
       | UL_BOOL -> "bool"
       | UL_FLOAT -> "float"
       | UL_INT n -> string_of_int n
       | UL_IN -> "in"
       | UL_OUT -> "out"
       | UL_FROM -> "from"
       | UL_TO -> "to"
       | UL_FLOW -> "flow"
       | UL_BLOCK -> "block"
       | UL_SYSTEM -> "system"
       | IDENT n -> n
       | UL_FIN -> "EOF"
       | UL_ERREUR -> "Erreur Lexicale";;

(* string_of_stream : inputStream -> string *)
(* Converti un inputStream (liste de token) en une chaîne de caractère *)
let string_of_stream stream =
  List.fold_right (fun t tq -> (string_of_token t) ^ " " ^ tq ) stream "";;


(* peekAtFirstToken : inputStream -> token *)
(* Renvoie le premier élément d'un inputStream *)
(* Erreur : si l'inputStream est vide *)
let peekAtFirstToken stream = 
  match stream with
  (* Normalement, ne doit jamais se produire sauf si la grammaire essaie de lire *)
  (* après la fin de l'inputStream. *)
  | [] -> failwith "Impossible d'acceder au premier element d'un inputStream vide"
   |t::_ -> t;;

(* advanceInStream : inputStream -> inputStream *)
(* Consomme le premier élément d'un inputStream *)
(* Erreur : si l'inputStream est vide *)
let advanceInStream stream =
  match stream with
  (* Normalement, ne doit jamais se produire sauf si la grammaire essaie de lire *)
  (* après la fin de l'inputStream. *)
  | [] -> failwith "Impossible de consommer le premier element d'un inputStream vide"
  | _::q -> q;;
