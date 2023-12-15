open Tokens

(* Type du résultat d'une analyse syntaxique *)
type parseResult =
  | Success of inputStream
  | Failure
;;

(* accept : token -> inputStream -> parseResult *)
(* Vérifie que le premier token du flux d'entrée est bien le token attendu *)
(* et avance dans l'analyse si c'est le cas *)
let accept expected stream =
  match (peekAtFirstToken stream) with
    | token when (token = expected) ->
      (Success (advanceInStream stream))
    | _ -> Failure
;;

let acceptIdent  stream = 
  match (peekAtFirstToken stream) with
  | UL_INTERFACE_IDENT _ -> (Success (advanceInStream stream))
  | _ -> Failure
;;

let acceptident  stream = 
  match (peekAtFirstToken stream) with
  | UL_PACKAGE_IDENT _ -> (Success (advanceInStream stream))
  | _ -> Failure
;;
(* accept : token -> inputStream -> parseResult *)
(* Vérifie que le premier token du flux d'entrée est bien le token attendu *)
(* et avance dans l'analyse si c'est le cas *)
let acceptPackageIdent stream =
  match (peekAtFirstToken stream) with
    | UL_PACKAGE_IDENT _ ->
      (Success (advanceInStream stream))
    | _ -> Failure
;;

(* Définition de la monade  qui est composée de : *)
(* - le type de donnée monadique : parseResult  *)
(* - la fonction : inject qui construit ce type à partir d'une liste de terminaux *)
(* - la fonction : bind (opérateur >>=) qui combine les fonctions d'analyse. *)

(* inject inputStream -> parseResult *)
(* Construit le type de la monade à partir d'une liste de terminaux *)
let inject s = Success s;;

(* bind : 'a m -> ('a -> 'b m) -> 'b m *)
(* bind (opérateur >>=) qui combine les fonctions d'analyse. *)
(* ici on utilise une version spécialisée de bind :
   'b  ->  inputStream
   'a  ->  inputStream
    m  ->  parseResult
*)
(* >>= : parseResult -> (inputStream -> parseResult) -> parseResult *)
let (>>=) result f =
  match result with
    | Success next -> f next
    | Failure -> Failure
;;


(* parseMachine : inputStream -> parseResult *)
(* Analyse du non terminal Programme *)
let rec parsePackage stream =
  (print_string "Package -> ");
  (match (peekAtFirstToken stream) with
   | UL_PACKAGE ->
      (print_endline "package UL_IDENT_PACKAGE { ... }");
      ((inject stream) >>=
        (accept UL_PACKAGE) >>=
        acceptPackageIdent >>=
        (accept UL_LEFT_BRACE) >>=
        (accept UL_RIGHT_BRACE))
   | _ -> Failure)

and parseSE stream = 
  (print_string "SE -> ");
  (match (peekAtFirstToken stream) with
   | UL_RIGHT_BRACE ->
      (print_endline "");
      (inject stream)

    | UL_PACKAGE | UL_INTERFACE-> 
      (print_endline "E SE ");
      (inject stream >>=
      parseE >>= 
      parseSE)
   | _ -> Failure)

  and parseE stream = 
  (print_string "E -> ");
  (match (peekAtFirstToken stream) with
    | UL_PACKAGE ->
      (print_endline "P");
      (inject stream >>=
      parsePackage)

    | UL_INTERFACE-> 
      (print_endline "I ");
      (inject stream >>=
      parseI)
    | _ -> Failure)

and parseI stream = 
  (print_string "I -> ");
  (match (peekAtFirstToken stream) with
    | UL_INTERFACE-> 
      (print_endline "interface Ident X { SM } ");
      (inject stream >>=
      accept UL_INTERFACE >>=
      acceptIdent >>=
      parseX >>=
      accept UL_LEFT_BRACE >>=
      parseSM >>=
      accept UL_RIGHT_BRACE)
    | _ -> Failure)

  and parseX stream = 
    (print_string "X -> ");
    (match (peekAtFirstToken stream) with
      | UL_LEFT_BRACE ->
        (print_endline "");
        (inject stream)

      | UL_EXTENDS -> 
        (print_endline "extends Q Ident SQ ");
        (inject stream >>=
        accept UL_EXTENDS >>=
        parseQ >>=
        acceptIdent >>=
        parseSQ)
      | _ -> Failure)

  and parseQ stream = 
    (print_string "Q -> ");
    (match (peekAtFirstToken stream) with
      | UL_INTERFACE_IDENT _ ->
        (print_endline "");
        (inject stream)

      | UL_PACKAGE_IDENT _ -> 
        (print_endline "ident . Q ");
        (inject stream >>=
        acceptident >>=
        accept UL_DOT >>=
        parseQ)
      | _ -> Failure)

  and parseSQ stream = 
    (print_string "SQ -> ");
    (match (peekAtFirstToken stream) with
      | UL_LEFT_BRACE ->
        (print_endline "");
        (inject stream)

      | UL_COMMA -> 
        (print_endline ", Q Ident SQ");
        (inject stream >>=
        accept UL_COMMA >>=
        parseQ >>=
        acceptIdent >>=
        parseSQ)
      | _ -> Failure)

  and parseSM stream = 
    (print_string "SM -> ");
    (match (peekAtFirstToken stream) with
      | UL_RIGHT_BRACE ->
        (print_endline "");
        (inject stream)

      | UL_BOOLEAN | UL_INT | UL_VOID | UL_PACKAGE_IDENT _ | UL_INTERFACE_IDENT _ -> 
        (print_endline ", Q Ident SQ");
        (inject stream >>=
        parseM >>=
        parseSM)
      | _ -> Failure)
    
  and parseT stream =
    (print_string "T -> ");
    match (peekAtFirstToken stream) with
    | UL_BOOLEAN ->
      (print_endline "boolean");
      (inject stream >>=
      accept UL_BOOLEAN)
    | UL_INT ->
      (print_endline "int");
      (inject stream >>=
      accept UL_INT)
    | UL_VOID ->
      (print_endline "void");
      (inject stream >>=
      accept UL_VOID)
    | UL_PACKAGE_IDENT _ | UL_INTERFACE_IDENT _ ->
      (print_endline "Q Ident");
      (inject stream >>=
      parseQ >>=
      acceptIdent)
    | _ -> Failure
    
    
    and parseSt stream = 
      (print_string "ST -> ");
      match (peekAtFirstToken stream) with
      | UL_RIGHT_PAREN ->
      (print_endline ")");
      (inject stream)
      | UL_COMMA ->
      (print_endline ", T St");
      (inject stream >>=
      accept UL_COMMA >>=
      parseT >>=
      parseSt)
      | _ -> Failure
    
    and parseO stream = 
      (print_string "O -> ");
      match (peekAtFirstToken stream) with
      | UL_RIGHT_PAREN ->
      (print_endline ")");
      (inject stream)
      | UL_BOOLEAN | UL_INT | UL_VOID | UL_PACKAGE_IDENT _ | UL_INTERFACE_IDENT _ ->
      (print_endline "T St");
      (inject stream >>=
      parseT >>=
      parseSt)
      | _ -> Failure
    
      and parseM stream = 
      (print_string "O -> ");
      match (peekAtFirstToken stream) with
      | UL_BOOLEAN | UL_INT | UL_VOID | UL_PACKAGE_IDENT _ | UL_INTERFACE_IDENT _ ->
      (print_endline "T ident (O)");
      (inject stream >>=
      parseT >>=
      acceptident >>=
      accept UL_LEFT_PAREN >>=
      parseO >>=
      accept UL_RIGHT_PAREN >>=
      parseSt)
      | _ -> Failure


;;
