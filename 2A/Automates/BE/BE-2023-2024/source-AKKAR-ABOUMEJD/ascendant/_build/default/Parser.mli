
(* The type of tokens. *)

type token = 
  | UL_VOID
  | UL_SEMICOLON
  | UL_RIGHT_PAREN
  | UL_RIGHT_BRACE
  | UL_PACKAGE
  | UL_LEFT_PAREN
  | UL_LEFT_BRACE
  | UL_INTERFACE
  | UL_INT
  | UL_IDENT_PACKAGE of (string)
  | UL_IDENT_INTERFACE of (string)
  | UL_FIN
  | UL_EXTENDS
  | UL_DOT
  | UL_COMMA
  | UL_BOOLEAN

(* This exception is raised by the monolithic API functions. *)

exception Error

(* The monolithic API. *)

val package: (Lexing.lexbuf -> token) -> Lexing.lexbuf -> (unit)
