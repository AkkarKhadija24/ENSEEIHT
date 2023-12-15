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

let acceptIdent stream = 
  match (peekAtFirstToken stream) with
    | (UL_IDENT _) -> (Success (advanceInStream stream))
    | _ -> Failure
;;

let acceptident stream = 
  match (peekAtFirstToken stream) with
    | (IDENT _) -> (Success (advanceInStream stream))
    | _ -> Failure

let acceptInt stream = 
  match (peekAtFirstToken stream) with
    | (UL_INT _) -> (Success (advanceInStream stream))
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
let rec parseR stream =
  (print_string "R ->");
  (match (peekAtFirstToken stream) with
    | UL_MODEL ->
      (print_endline "model Ident {Se}");
      (inject stream >>=
      accept UL_MODEL >>=
      acceptIdent >>=
      accept UL_ACCOUV >>=
      parseSe >>=
      accept UL_ACCFER)
    | _ -> Failure)

and parseSe stream = 
  (print_string "Se ->");
  (match (peekAtFirstToken stream) with
    | UL_ACCFER ->
      (print_endline "");
      (inject stream)
    | UL_BLOCK | UL_SYSTEM | UL_FLOW ->
      (print_endline "E Se");
      (inject stream >>=
      parseE >>=
      parseSe)
    | _ -> Failure)

and parseE stream = 
  (print_string "E ->");
  (match (peekAtFirstToken stream) with
    | UL_BLOCK ->
      (print_endline "block IDent P ;");
      (inject stream >>=
      accept UL_BLOCK >>=
      acceptIdent >>=
      parseP >>=
      accept UL_PTVIRG)
    | UL_SYSTEM ->
      (print_endline "system IDent P {Se}");
      (inject stream >>=
      accept UL_SYSTEM >>=
      acceptIdent >>=
      parseP >>=
      accept UL_ACCOUV >>=
      parseSe >>=
      accept UL_ACCFER)
    | UL_FLOW -> 
      (print_endline "flow ident from Nq to Ln ;");
      (inject stream >>=
      accept UL_FLOW >>=
      acceptident >>=
      accept UL_FROM >>=
      parseNq >>=
      accept UL_TO>>=
      parseLn >>=
      accept UL_PTVIRG)
    | _ -> Failure)


and parseNq stream = 
  (print_string "Nq ->");
  (match (peekAtFirstToken stream) with
    | IDENT _->
      (print_endline "ident");
      (inject stream >>=
      acceptident)
    | UL_IDENT _->
      (print_endline "Ident.ident");
      (inject stream >>=
      acceptIdent >>=
      accept UL_PT >>=
      acceptident)
    | _ -> Failure)

and parseLn stream = 
  (print_string "Nq ->");
  (match (peekAtFirstToken stream) with
    | UL_PTVIRG ->
      (print_endline "");
      (inject stream)
    | UL_IDENT _ | IDENT _->
      (print_endline "Nq Sn");
      (inject stream >>=
      parseNq >>=
      parseSn)
    | _ -> Failure)

and parseSn stream = 
  (print_string "Nq ->");
  (match (peekAtFirstToken stream) with
    | UL_PTVIRG ->
      (print_endline "");
      (inject stream)
    | UL_VIRG ->
      (print_endline ", Nq Sn");
      (inject stream >>=
      accept UL_VIRG >>=
      parseNq >>=
      parseSn)
    | _ -> Failure)

and parseP stream = 
  (print_string "Nq ->");
  (match (peekAtFirstToken stream) with
    | UL_PAROUV ->
      (print_endline "(Lp)");
      (inject stream >>=
      accept UL_PAROUV >>=
      parseLp >>=
      accept UL_PARFER)
    | _ -> Failure)

and parseLp stream = 
  (print_string "Lp ->");
  (match (peekAtFirstToken stream) with
    | IDENT _ ->
      (print_endline "Dp Sp");
      (inject stream >>=
      parseDp >>=
      parseSp)
    | _ -> Failure)

and parseSp stream = 
  (print_string "Sp ->");
  (match (peekAtFirstToken stream) with
    | UL_PARFER ->
      (print_endline "");
      (inject stream)
    | UL_VIRG ->
      (print_endline ", Dp Sp");
      (inject stream >>=
      accept UL_VIRG >>=
      parseDp >>=
      parseSp)
    | _ -> Failure)

and parseDp stream = 
  (print_string "Lp ->");
  (match (peekAtFirstToken stream) with
    | IDENT _->
      (print_endline "ident : M T Ot");
      (inject stream >>=
      acceptident >>=
      accept UL_DPT >>=
      parseM >>=
      parseT >>=
      parseOt)
    | _ -> Failure)

and parseM stream = 
  (print_string "M ->");
  (match (peekAtFirstToken stream) with
    | UL_IN ->
      (print_endline "in");
      (inject stream >>=
      accept UL_IN)
    | UL_OUT ->
      (print_endline "out");
      (inject stream >>=
      accept UL_OUT)
    | _ -> Failure)  
    
and parseT stream = 
  (print_string "T ->");
  (match (peekAtFirstToken stream) with
    | UL_INT _->
      (print_endline "int");
      (inject stream >>=
      acceptInt)
    | UL_FLOAT ->
      (print_endline "float");
      (inject stream >>=
      accept UL_FLOAT)
    | UL_BOOL ->
      (print_endline "bool");
      (inject stream >>=
      accept UL_BOOL)
    | _ -> Failure)   

and parseOt stream = 
  (print_string "Ot ->");
  (match (peekAtFirstToken stream) with
    | UL_VIRG | UL_PARFER->
      (print_endline "");
      (inject stream)
    | UL_CROUV->
      (print_endline "[entier Sv]");
      (inject stream >>=
      accept UL_CROUV >>=
      acceptInt >>=
      parseSv >>=
      accept UL_CRFER)
    | _ -> Failure)   

and parseSv stream = 
  (print_string "Ot ->");
  (match (peekAtFirstToken stream) with
    | UL_CRFER ->
      (print_endline "");
      (inject stream)
    | UL_VIRG->
      (print_endline ", entier Sv");
      (inject stream >>=
      accept UL_VIRG >>=
      acceptInt >>=
      parseSv)
    | _ -> Failure)   
;;
