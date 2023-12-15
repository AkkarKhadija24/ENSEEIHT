
module MenhirBasics = struct
  
  exception Error
  
  let _eRR =
    fun _s ->
      raise Error
  
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
    | UL_IDENT_PACKAGE of (
# 18 "Parser.mly"
       (string)
# 24 "Parser.ml"
  )
    | UL_IDENT_INTERFACE of (
# 14 "Parser.mly"
       (string)
# 29 "Parser.ml"
  )
    | UL_FIN
    | UL_EXTENDS
    | UL_DOT
    | UL_COMMA
    | UL_BOOLEAN
  
end

include MenhirBasics

# 1 "Parser.mly"
  

(* Partie recopiee dans le fichier CaML genere. *)
(* Ouverture de modules exploites dans les actions *)
(* Declarations de types, de constantes, de fonctions, d'exceptions exploites dans les actions *)


# 49 "Parser.ml"

type ('s, 'r) _menhir_state = 
  | MenhirState00 : ('s, _menhir_box_package) _menhir_state
    (** State 00.
        Stack shape : .
        Start symbol: package. *)

  | MenhirState03 : (('s, _menhir_box_package) _menhir_cell1_UL_PACKAGE _menhir_cell0_UL_IDENT_PACKAGE, _menhir_box_package) _menhir_state
    (** State 03.
        Stack shape : UL_PACKAGE UL_IDENT_PACKAGE.
        Start symbol: package. *)

  | MenhirState06 : (('s, _menhir_box_package) _menhir_cell1_UL_INTERFACE _menhir_cell0_UL_IDENT_INTERFACE, _menhir_box_package) _menhir_state
    (** State 06.
        Stack shape : UL_INTERFACE UL_IDENT_INTERFACE.
        Start symbol: package. *)

  | MenhirState08 : (('s, _menhir_box_package) _menhir_cell1_UL_DOT _menhir_cell0_UL_IDENT_PACKAGE, _menhir_box_package) _menhir_state
    (** State 08.
        Stack shape : UL_DOT UL_IDENT_PACKAGE.
        Start symbol: package. *)

  | MenhirState14 : (('s, _menhir_box_package) _menhir_cell1_nomQualifie, _menhir_box_package) _menhir_state
    (** State 14.
        Stack shape : nomQualifie.
        Start symbol: package. *)

  | MenhirState17 : (('s, _menhir_box_package) _menhir_cell1_UL_INTERFACE _menhir_cell0_UL_IDENT_INTERFACE _menhir_cell0_sub1, _menhir_box_package) _menhir_state
    (** State 17.
        Stack shape : UL_INTERFACE UL_IDENT_INTERFACE sub1.
        Start symbol: package. *)

  | MenhirState23 : (('s, _menhir_box_package) _menhir_cell1_typ _menhir_cell0_UL_IDENT_PACKAGE, _menhir_box_package) _menhir_state
    (** State 23.
        Stack shape : typ UL_IDENT_PACKAGE.
        Start symbol: package. *)

  | MenhirState25 : (('s, _menhir_box_package) _menhir_cell1_typ, _menhir_box_package) _menhir_state
    (** State 25.
        Stack shape : typ.
        Start symbol: package. *)

  | MenhirState34 : (('s, _menhir_box_package) _menhir_cell1_methode, _menhir_box_package) _menhir_state
    (** State 34.
        Stack shape : methode.
        Start symbol: package. *)

  | MenhirState41 : (('s, _menhir_box_package) _menhir_cell1_interface, _menhir_box_package) _menhir_state
    (** State 41.
        Stack shape : interface.
        Start symbol: package. *)


and ('s, 'r) _menhir_cell1_interface = 
  | MenhirCell1_interface of 's * ('s, 'r) _menhir_state * (unit)

and ('s, 'r) _menhir_cell1_methode = 
  | MenhirCell1_methode of 's * ('s, 'r) _menhir_state * (unit)

and ('s, 'r) _menhir_cell1_nomQualifie = 
  | MenhirCell1_nomQualifie of 's * ('s, 'r) _menhir_state * (unit)

and 's _menhir_cell0_sub1 = 
  | MenhirCell0_sub1 of 's * (unit)

and ('s, 'r) _menhir_cell1_typ = 
  | MenhirCell1_typ of 's * ('s, 'r) _menhir_state * (unit)

and ('s, 'r) _menhir_cell1_UL_DOT = 
  | MenhirCell1_UL_DOT of 's * ('s, 'r) _menhir_state

and 's _menhir_cell0_UL_IDENT_INTERFACE = 
  | MenhirCell0_UL_IDENT_INTERFACE of 's * (
# 14 "Parser.mly"
       (string)
# 125 "Parser.ml"
)

and 's _menhir_cell0_UL_IDENT_PACKAGE = 
  | MenhirCell0_UL_IDENT_PACKAGE of 's * (
# 18 "Parser.mly"
       (string)
# 132 "Parser.ml"
)

and ('s, 'r) _menhir_cell1_UL_INTERFACE = 
  | MenhirCell1_UL_INTERFACE of 's * ('s, 'r) _menhir_state

and ('s, 'r) _menhir_cell1_UL_PACKAGE = 
  | MenhirCell1_UL_PACKAGE of 's * ('s, 'r) _menhir_state

and _menhir_box_package = 
  | MenhirBox_package of (unit) [@@unboxed]

let _menhir_action_01 =
  fun () ->
    (
# 43 "Parser.mly"
                                                                                   ((print_endline "interface : interface Ident sub1 { sub2 }"))
# 149 "Parser.ml"
     : (unit))

let _menhir_action_02 =
  fun () ->
    (
# 34 "Parser.mly"
                                                                                          ( (print_endline "package : package IDENT_PACKAGE { paquetage_aux }") )
# 157 "Parser.ml"
     : (unit))

let _menhir_action_03 =
  fun () ->
    (
# 63 "Parser.mly"
                                                                                     ((print_endline "method : type ident ( sous_methode ) ;") )
# 165 "Parser.ml"
     : (unit))

let _menhir_action_04 =
  fun () ->
    (
# 57 "Parser.mly"
                                           ((print_endline "nonQualifie : sous_qual Ident");)
# 173 "Parser.ml"
     : (unit))

let _menhir_action_05 =
  fun () ->
    (
# 32 "Parser.mly"
                                  ( (print_endline "package : internal_package FIN") )
# 181 "Parser.ml"
     : (unit))

let _menhir_action_06 =
  fun () ->
    (
# 36 "Parser.mly"
                        ((print_endline "paquetage_aux : package");)
# 189 "Parser.ml"
     : (unit))

let _menhir_action_07 =
  fun () ->
    (
# 37 "Parser.mly"
                                           ((print_endline "paquetage_aux : interface sous_inteface");)
# 197 "Parser.ml"
     : (unit))

let _menhir_action_08 =
  fun () ->
    (
# 49 "Parser.mly"
                         ((print_endline "sousNomQua : nonQualifie"))
# 205 "Parser.ml"
     : (unit))

let _menhir_action_09 =
  fun () ->
    (
# 50 "Parser.mly"
                                               ((print_endline "sousNomQua : nonQualifie , sousNonQua"))
# 213 "Parser.ml"
     : (unit))

let _menhir_action_10 =
  fun () ->
    (
# 39 "Parser.mly"
                                       ((print_endline "sous_interface : vide");)
# 221 "Parser.ml"
     : (unit))

let _menhir_action_11 =
  fun () ->
    (
# 40 "Parser.mly"
                                    ((print_endline "sous_interface : paquetage_aux");)
# 229 "Parser.ml"
     : (unit))

let _menhir_action_12 =
  fun () ->
    (
# 65 "Parser.mly"
                                    ((print_endline "sous_method : vide");)
# 237 "Parser.ml"
     : (unit))

let _menhir_action_13 =
  fun () ->
    (
# 66 "Parser.mly"
                        ((print_endline "sous_method : sous_type"))
# 245 "Parser.ml"
     : (unit))

let _menhir_action_14 =
  fun () ->
    (
# 59 "Parser.mly"
                                  ((print_endline "sous_qual : vide");)
# 253 "Parser.ml"
     : (unit))

let _menhir_action_15 =
  fun () ->
    (
# 60 "Parser.mly"
                                            ((print_endline "sous_qual : . ident sous_qual"))
# 261 "Parser.ml"
     : (unit))

let _menhir_action_16 =
  fun () ->
    (
# 68 "Parser.mly"
                ((print_endline "sous_type : type "))
# 269 "Parser.ml"
     : (unit))

let _menhir_action_17 =
  fun () ->
    (
# 69 "Parser.mly"
                                 ( (print_endline "sous_type : type , sous_type"))
# 277 "Parser.ml"
     : (unit))

let _menhir_action_18 =
  fun () ->
    (
# 45 "Parser.mly"
                             ((print_endline "sub1 : vide");)
# 285 "Parser.ml"
     : (unit))

let _menhir_action_19 =
  fun () ->
    (
# 46 "Parser.mly"
                            ((print_endline "sub1 : extends sousNomQua"))
# 293 "Parser.ml"
     : (unit))

let _menhir_action_20 =
  fun () ->
    (
# 54 "Parser.mly"
                             ((print_endline "sub2 : vide");)
# 301 "Parser.ml"
     : (unit))

let _menhir_action_21 =
  fun () ->
    (
# 55 "Parser.mly"
                   ((print_endline "method : method +"))
# 309 "Parser.ml"
     : (unit))

let _menhir_action_22 =
  fun () ->
    (
# 71 "Parser.mly"
                 ((print_endline "type : boolean"))
# 317 "Parser.ml"
     : (unit))

let _menhir_action_23 =
  fun () ->
    (
# 72 "Parser.mly"
                 ((print_endline "type : int"))
# 325 "Parser.ml"
     : (unit))

let _menhir_action_24 =
  fun () ->
    (
# 73 "Parser.mly"
                  ((print_endline "type : void"))
# 333 "Parser.ml"
     : (unit))

let _menhir_action_25 =
  fun () ->
    (
# 74 "Parser.mly"
                      ((print_endline "type : non_qualifie"))
# 341 "Parser.ml"
     : (unit))

let _menhir_print_token : token -> string =
  fun _tok ->
    match _tok with
    | UL_BOOLEAN ->
        "UL_BOOLEAN"
    | UL_COMMA ->
        "UL_COMMA"
    | UL_DOT ->
        "UL_DOT"
    | UL_EXTENDS ->
        "UL_EXTENDS"
    | UL_FIN ->
        "UL_FIN"
    | UL_IDENT_INTERFACE _ ->
        "UL_IDENT_INTERFACE"
    | UL_IDENT_PACKAGE _ ->
        "UL_IDENT_PACKAGE"
    | UL_INT ->
        "UL_INT"
    | UL_INTERFACE ->
        "UL_INTERFACE"
    | UL_LEFT_BRACE ->
        "UL_LEFT_BRACE"
    | UL_LEFT_PAREN ->
        "UL_LEFT_PAREN"
    | UL_PACKAGE ->
        "UL_PACKAGE"
    | UL_RIGHT_BRACE ->
        "UL_RIGHT_BRACE"
    | UL_RIGHT_PAREN ->
        "UL_RIGHT_PAREN"
    | UL_SEMICOLON ->
        "UL_SEMICOLON"
    | UL_VOID ->
        "UL_VOID"

let _menhir_fail : unit -> 'a =
  fun () ->
    Printf.eprintf "Internal failure -- please contact the parser generator's developers.\n%!";
    assert false

include struct
  
  [@@@ocaml.warning "-4-37"]
  
  let _menhir_run_44 : type  ttv_stack. ttv_stack -> _ -> _menhir_box_package =
    fun _menhir_stack _v ->
      MenhirBox_package _v
  
  let rec _menhir_goto_sous_interface : type  ttv_stack. (ttv_stack, _menhir_box_package) _menhir_cell1_interface -> _ -> _ -> _ -> _menhir_box_package =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _tok ->
      let MenhirCell1_interface (_menhir_stack, _menhir_s, _) = _menhir_stack in
      let _ = _menhir_action_07 () in
      _menhir_goto_paquetage_aux _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
  
  and _menhir_goto_paquetage_aux : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_package) _menhir_state -> _ -> _menhir_box_package =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok ->
      match _menhir_s with
      | MenhirState41 ->
          _menhir_run_43 _menhir_stack _menhir_lexbuf _menhir_lexer _tok
      | MenhirState03 ->
          _menhir_run_36 _menhir_stack _menhir_lexbuf _menhir_lexer _tok
      | _ ->
          _menhir_fail ()
  
  and _menhir_run_43 : type  ttv_stack. (ttv_stack, _menhir_box_package) _menhir_cell1_interface -> _ -> _ -> _ -> _menhir_box_package =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _tok ->
      let _ = _menhir_action_11 () in
      _menhir_goto_sous_interface _menhir_stack _menhir_lexbuf _menhir_lexer _tok
  
  and _menhir_run_36 : type  ttv_stack. (ttv_stack, _menhir_box_package) _menhir_cell1_UL_PACKAGE _menhir_cell0_UL_IDENT_PACKAGE -> _ -> _ -> _ -> _menhir_box_package =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _tok ->
      match (_tok : MenhirBasics.token) with
      | UL_RIGHT_BRACE ->
          let _tok = _menhir_lexer _menhir_lexbuf in
          let MenhirCell0_UL_IDENT_PACKAGE (_menhir_stack, _) = _menhir_stack in
          let MenhirCell1_UL_PACKAGE (_menhir_stack, _menhir_s) = _menhir_stack in
          let _ = _menhir_action_02 () in
          _menhir_goto_internal_package _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
      | _ ->
          _eRR ()
  
  and _menhir_goto_internal_package : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_package) _menhir_state -> _ -> _menhir_box_package =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok ->
      match _menhir_s with
      | MenhirState00 ->
          _menhir_run_45 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
      | MenhirState41 ->
          _menhir_run_39 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
      | MenhirState03 ->
          _menhir_run_39 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
      | _ ->
          _menhir_fail ()
  
  and _menhir_run_45 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_package) _menhir_state -> _ -> _menhir_box_package =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok ->
      match (_tok : MenhirBasics.token) with
      | UL_FIN ->
          let _v = _menhir_action_05 () in
          _menhir_goto_package _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | _ ->
          _eRR ()
  
  and _menhir_goto_package : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> (ttv_stack, _menhir_box_package) _menhir_state -> _ -> _menhir_box_package =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      match _menhir_s with
      | MenhirState00 ->
          _menhir_run_44 _menhir_stack _v
      | MenhirState41 ->
          _menhir_run_38 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
      | MenhirState03 ->
          _menhir_run_38 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
      | _ ->
          _menhir_fail ()
  
  and _menhir_run_38 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_package) _menhir_state -> _ -> _menhir_box_package =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok ->
      let _ = _menhir_action_06 () in
      _menhir_goto_paquetage_aux _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
  
  and _menhir_run_39 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_package) _menhir_state -> _ -> _menhir_box_package =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok ->
      match (_tok : MenhirBasics.token) with
      | UL_FIN ->
          let _tok = _menhir_lexer _menhir_lexbuf in
          let _v = _menhir_action_05 () in
          _menhir_goto_package _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | _ ->
          _eRR ()
  
  let rec _menhir_run_01 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_package) _menhir_state -> _menhir_box_package =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _menhir_stack = MenhirCell1_UL_PACKAGE (_menhir_stack, _menhir_s) in
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | UL_IDENT_PACKAGE _v ->
          let _menhir_stack = MenhirCell0_UL_IDENT_PACKAGE (_menhir_stack, _v) in
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | UL_LEFT_BRACE ->
              let _menhir_s = MenhirState03 in
              let _tok = _menhir_lexer _menhir_lexbuf in
              (match (_tok : MenhirBasics.token) with
              | UL_PACKAGE ->
                  _menhir_run_01 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
              | UL_INTERFACE ->
                  _menhir_run_04 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
              | _ ->
                  _eRR ())
          | _ ->
              _eRR ())
      | _ ->
          _eRR ()
  
  and _menhir_run_04 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_package) _menhir_state -> _menhir_box_package =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _menhir_stack = MenhirCell1_UL_INTERFACE (_menhir_stack, _menhir_s) in
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | UL_IDENT_INTERFACE _v ->
          let _menhir_stack = MenhirCell0_UL_IDENT_INTERFACE (_menhir_stack, _v) in
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | UL_EXTENDS ->
              let _tok = _menhir_lexer _menhir_lexbuf in
              (match (_tok : MenhirBasics.token) with
              | UL_DOT ->
                  _menhir_run_07 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState06
              | UL_IDENT_INTERFACE _ ->
                  let _ = _menhir_action_14 () in
                  _menhir_run_10 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState06 _tok
              | _ ->
                  _eRR ())
          | UL_LEFT_BRACE ->
              let _v = _menhir_action_18 () in
              _menhir_goto_sub1 _menhir_stack _menhir_lexbuf _menhir_lexer _v
          | _ ->
              _eRR ())
      | _ ->
          _eRR ()
  
  and _menhir_run_07 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_package) _menhir_state -> _menhir_box_package =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _menhir_stack = MenhirCell1_UL_DOT (_menhir_stack, _menhir_s) in
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | UL_IDENT_PACKAGE _v ->
          let _menhir_stack = MenhirCell0_UL_IDENT_PACKAGE (_menhir_stack, _v) in
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | UL_DOT ->
              _menhir_run_07 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState08
          | UL_IDENT_INTERFACE _ ->
              let _ = _menhir_action_14 () in
              _menhir_run_09 _menhir_stack _menhir_lexbuf _menhir_lexer _tok
          | _ ->
              _eRR ())
      | _ ->
          _eRR ()
  
  and _menhir_run_09 : type  ttv_stack. (ttv_stack, _menhir_box_package) _menhir_cell1_UL_DOT _menhir_cell0_UL_IDENT_PACKAGE -> _ -> _ -> _ -> _menhir_box_package =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _tok ->
      let MenhirCell0_UL_IDENT_PACKAGE (_menhir_stack, _) = _menhir_stack in
      let MenhirCell1_UL_DOT (_menhir_stack, _menhir_s) = _menhir_stack in
      let _ = _menhir_action_15 () in
      _menhir_goto_sous_qual _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
  
  and _menhir_goto_sous_qual : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_package) _menhir_state -> _ -> _menhir_box_package =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok ->
      match _menhir_s with
      | MenhirState34 ->
          _menhir_run_10 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
      | MenhirState17 ->
          _menhir_run_10 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
      | MenhirState23 ->
          _menhir_run_10 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
      | MenhirState25 ->
          _menhir_run_10 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
      | MenhirState14 ->
          _menhir_run_10 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
      | MenhirState06 ->
          _menhir_run_10 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
      | MenhirState08 ->
          _menhir_run_09 _menhir_stack _menhir_lexbuf _menhir_lexer _tok
      | _ ->
          _menhir_fail ()
  
  and _menhir_run_10 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_package) _menhir_state -> _ -> _menhir_box_package =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok ->
      match (_tok : MenhirBasics.token) with
      | UL_IDENT_INTERFACE _ ->
          let _tok = _menhir_lexer _menhir_lexbuf in
          let _v = _menhir_action_04 () in
          _menhir_goto_nomQualifie _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | _ ->
          _menhir_fail ()
  
  and _menhir_goto_nomQualifie : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> (ttv_stack, _menhir_box_package) _menhir_state -> _ -> _menhir_box_package =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      match _menhir_s with
      | MenhirState34 ->
          _menhir_run_27 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
      | MenhirState17 ->
          _menhir_run_27 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
      | MenhirState23 ->
          _menhir_run_27 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
      | MenhirState25 ->
          _menhir_run_27 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
      | MenhirState14 ->
          _menhir_run_13 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | MenhirState06 ->
          _menhir_run_13 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | _ ->
          _menhir_fail ()
  
  and _menhir_run_27 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_package) _menhir_state -> _ -> _menhir_box_package =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok ->
      let _v = _menhir_action_25 () in
      _menhir_goto_typ _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
  
  and _menhir_goto_typ : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> (ttv_stack, _menhir_box_package) _menhir_state -> _ -> _menhir_box_package =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      match _menhir_s with
      | MenhirState25 ->
          _menhir_run_24 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | MenhirState23 ->
          _menhir_run_24 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | MenhirState34 ->
          _menhir_run_21 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | MenhirState17 ->
          _menhir_run_21 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | _ ->
          _menhir_fail ()
  
  and _menhir_run_24 : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> (ttv_stack, _menhir_box_package) _menhir_state -> _ -> _menhir_box_package =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      match (_tok : MenhirBasics.token) with
      | UL_COMMA ->
          let _menhir_stack = MenhirCell1_typ (_menhir_stack, _menhir_s, _v) in
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | UL_VOID ->
              _menhir_run_18 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState25
          | UL_INT ->
              _menhir_run_19 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState25
          | UL_DOT ->
              _menhir_run_07 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState25
          | UL_BOOLEAN ->
              _menhir_run_20 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState25
          | UL_IDENT_INTERFACE _ ->
              let _ = _menhir_action_14 () in
              _menhir_run_10 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState25 _tok
          | _ ->
              _eRR ())
      | UL_RIGHT_PAREN ->
          let _ = _menhir_action_16 () in
          _menhir_goto_sous_type _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | _ ->
          _eRR ()
  
  and _menhir_run_18 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_package) _menhir_state -> _menhir_box_package =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      let _v = _menhir_action_24 () in
      _menhir_goto_typ _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
  
  and _menhir_run_19 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_package) _menhir_state -> _menhir_box_package =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      let _v = _menhir_action_23 () in
      _menhir_goto_typ _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
  
  and _menhir_run_20 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_package) _menhir_state -> _menhir_box_package =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      let _v = _menhir_action_22 () in
      _menhir_goto_typ _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
  
  and _menhir_goto_sous_type : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_package) _menhir_state -> _menhir_box_package =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      match _menhir_s with
      | MenhirState23 ->
          _menhir_run_28 _menhir_stack _menhir_lexbuf _menhir_lexer
      | MenhirState25 ->
          _menhir_run_26 _menhir_stack _menhir_lexbuf _menhir_lexer
      | _ ->
          _menhir_fail ()
  
  and _menhir_run_28 : type  ttv_stack. (ttv_stack, _menhir_box_package) _menhir_cell1_typ _menhir_cell0_UL_IDENT_PACKAGE -> _ -> _ -> _menhir_box_package =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer ->
      let _ = _menhir_action_13 () in
      _menhir_goto_sous_method _menhir_stack _menhir_lexbuf _menhir_lexer
  
  and _menhir_goto_sous_method : type  ttv_stack. (ttv_stack, _menhir_box_package) _menhir_cell1_typ _menhir_cell0_UL_IDENT_PACKAGE -> _ -> _ -> _menhir_box_package =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | UL_SEMICOLON ->
          let _tok = _menhir_lexer _menhir_lexbuf in
          let MenhirCell0_UL_IDENT_PACKAGE (_menhir_stack, _) = _menhir_stack in
          let MenhirCell1_typ (_menhir_stack, _menhir_s, _) = _menhir_stack in
          let _v = _menhir_action_03 () in
          let _menhir_stack = MenhirCell1_methode (_menhir_stack, _menhir_s, _v) in
          (match (_tok : MenhirBasics.token) with
          | UL_VOID ->
              _menhir_run_18 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState34
          | UL_INT ->
              _menhir_run_19 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState34
          | UL_DOT ->
              _menhir_run_07 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState34
          | UL_BOOLEAN ->
              _menhir_run_20 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState34
          | UL_IDENT_INTERFACE _ ->
              let _ = _menhir_action_14 () in
              _menhir_run_10 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState34 _tok
          | UL_RIGHT_BRACE ->
              let _ = _menhir_action_20 () in
              _menhir_run_35 _menhir_stack _menhir_lexbuf _menhir_lexer
          | _ ->
              _eRR ())
      | _ ->
          _eRR ()
  
  and _menhir_run_35 : type  ttv_stack. (ttv_stack, _menhir_box_package) _menhir_cell1_methode -> _ -> _ -> _menhir_box_package =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer ->
      let MenhirCell1_methode (_menhir_stack, _menhir_s, _) = _menhir_stack in
      let _ = _menhir_action_21 () in
      _menhir_goto_sub2 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
  
  and _menhir_goto_sub2 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_package) _menhir_state -> _menhir_box_package =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      match _menhir_s with
      | MenhirState34 ->
          _menhir_run_35 _menhir_stack _menhir_lexbuf _menhir_lexer
      | MenhirState17 ->
          _menhir_run_32 _menhir_stack _menhir_lexbuf _menhir_lexer
      | _ ->
          _menhir_fail ()
  
  and _menhir_run_32 : type  ttv_stack. (ttv_stack, _menhir_box_package) _menhir_cell1_UL_INTERFACE _menhir_cell0_UL_IDENT_INTERFACE _menhir_cell0_sub1 -> _ -> _ -> _menhir_box_package =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      let MenhirCell0_sub1 (_menhir_stack, _) = _menhir_stack in
      let MenhirCell0_UL_IDENT_INTERFACE (_menhir_stack, _) = _menhir_stack in
      let MenhirCell1_UL_INTERFACE (_menhir_stack, _menhir_s) = _menhir_stack in
      let _v = _menhir_action_01 () in
      let _menhir_stack = MenhirCell1_interface (_menhir_stack, _menhir_s, _v) in
      match (_tok : MenhirBasics.token) with
      | UL_PACKAGE ->
          _menhir_run_01 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState41
      | UL_INTERFACE ->
          _menhir_run_04 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState41
      | UL_RIGHT_BRACE ->
          let _ = _menhir_action_10 () in
          _menhir_goto_sous_interface _menhir_stack _menhir_lexbuf _menhir_lexer _tok
      | _ ->
          _eRR ()
  
  and _menhir_run_26 : type  ttv_stack. (ttv_stack, _menhir_box_package) _menhir_cell1_typ -> _ -> _ -> _menhir_box_package =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer ->
      let MenhirCell1_typ (_menhir_stack, _menhir_s, _) = _menhir_stack in
      let _ = _menhir_action_17 () in
      _menhir_goto_sous_type _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
  
  and _menhir_run_21 : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> (ttv_stack, _menhir_box_package) _menhir_state -> _ -> _menhir_box_package =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      let _menhir_stack = MenhirCell1_typ (_menhir_stack, _menhir_s, _v) in
      match (_tok : MenhirBasics.token) with
      | UL_IDENT_PACKAGE _v_0 ->
          let _menhir_stack = MenhirCell0_UL_IDENT_PACKAGE (_menhir_stack, _v_0) in
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | UL_LEFT_PAREN ->
              let _tok = _menhir_lexer _menhir_lexbuf in
              (match (_tok : MenhirBasics.token) with
              | UL_VOID ->
                  _menhir_run_18 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState23
              | UL_INT ->
                  _menhir_run_19 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState23
              | UL_DOT ->
                  _menhir_run_07 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState23
              | UL_BOOLEAN ->
                  _menhir_run_20 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState23
              | UL_RIGHT_PAREN ->
                  let _ = _menhir_action_12 () in
                  _menhir_goto_sous_method _menhir_stack _menhir_lexbuf _menhir_lexer
              | UL_IDENT_INTERFACE _ ->
                  let _ = _menhir_action_14 () in
                  _menhir_run_10 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState23 _tok
              | _ ->
                  _eRR ())
          | _ ->
              _eRR ())
      | _ ->
          _eRR ()
  
  and _menhir_run_13 : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> (ttv_stack, _menhir_box_package) _menhir_state -> _ -> _menhir_box_package =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      match (_tok : MenhirBasics.token) with
      | UL_COMMA ->
          let _menhir_stack = MenhirCell1_nomQualifie (_menhir_stack, _menhir_s, _v) in
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | UL_DOT ->
              _menhir_run_07 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState14
          | UL_IDENT_INTERFACE _ ->
              let _ = _menhir_action_14 () in
              _menhir_run_10 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState14 _tok
          | _ ->
              _eRR ())
      | UL_LEFT_BRACE ->
          let _ = _menhir_action_08 () in
          _menhir_goto_sousNomQua _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | _ ->
          _eRR ()
  
  and _menhir_goto_sousNomQua : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_package) _menhir_state -> _menhir_box_package =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      match _menhir_s with
      | MenhirState14 ->
          _menhir_run_15 _menhir_stack _menhir_lexbuf _menhir_lexer
      | MenhirState06 ->
          _menhir_run_12 _menhir_stack _menhir_lexbuf _menhir_lexer
      | _ ->
          _menhir_fail ()
  
  and _menhir_run_15 : type  ttv_stack. (ttv_stack, _menhir_box_package) _menhir_cell1_nomQualifie -> _ -> _ -> _menhir_box_package =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer ->
      let MenhirCell1_nomQualifie (_menhir_stack, _menhir_s, _) = _menhir_stack in
      let _ = _menhir_action_09 () in
      _menhir_goto_sousNomQua _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
  
  and _menhir_run_12 : type  ttv_stack. (ttv_stack, _menhir_box_package) _menhir_cell1_UL_INTERFACE _menhir_cell0_UL_IDENT_INTERFACE -> _ -> _ -> _menhir_box_package =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer ->
      let _v = _menhir_action_19 () in
      _menhir_goto_sub1 _menhir_stack _menhir_lexbuf _menhir_lexer _v
  
  and _menhir_goto_sub1 : type  ttv_stack. (ttv_stack, _menhir_box_package) _menhir_cell1_UL_INTERFACE _menhir_cell0_UL_IDENT_INTERFACE -> _ -> _ -> _ -> _menhir_box_package =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v ->
      let _menhir_stack = MenhirCell0_sub1 (_menhir_stack, _v) in
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | UL_VOID ->
          _menhir_run_18 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState17
      | UL_INT ->
          _menhir_run_19 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState17
      | UL_DOT ->
          _menhir_run_07 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState17
      | UL_BOOLEAN ->
          _menhir_run_20 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState17
      | UL_IDENT_INTERFACE _ ->
          let _ = _menhir_action_14 () in
          _menhir_run_10 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState17 _tok
      | UL_RIGHT_BRACE ->
          let _ = _menhir_action_20 () in
          _menhir_run_32 _menhir_stack _menhir_lexbuf _menhir_lexer
      | _ ->
          _eRR ()
  
  let _menhir_run_00 : type  ttv_stack. ttv_stack -> _ -> _ -> _menhir_box_package =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer ->
      let _menhir_s = MenhirState00 in
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | UL_PACKAGE ->
          _menhir_run_01 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | _ ->
          _eRR ()
  
end

let package =
  fun _menhir_lexer _menhir_lexbuf ->
    let _menhir_stack = () in
    let MenhirBox_package v = _menhir_run_00 _menhir_stack _menhir_lexbuf _menhir_lexer in
    v

# 75 "Parser.mly"
  


# 865 "Parser.ml"
