
module MenhirBasics = struct
  
  exception Error
  
  let _eRR =
    fun _s ->
      raise Error
  
  type token = 
    | UL_VIRG
    | UL_VARIABLE of (
# 17 "Parser.mly"
       (string)
# 16 "Parser.ml"
  )
    | UL_SYMBOLE of (
# 16 "Parser.mly"
       (string)
# 21 "Parser.ml"
  )
    | UL_PT
    | UL_PAROUV
    | UL_PARFER
    | UL_NEGATION
    | UL_FIN
    | UL_ECHEC
    | UL_DEDUCTION
    | UL_COUPURE
  
end

include MenhirBasics

# 1 "Parser.mly"
  

(* Partie recopiee dans le fichier CaML genere. *)
(* Ouverture de modules exploites dans les actions *)
(* Declarations de types, de constantes, de fonctions, d'exceptions exploites dans les actions *)


# 44 "Parser.ml"

type ('s, 'r) _menhir_state = 
  | MenhirState00 : ('s, _menhir_box_programme) _menhir_state
    (** State 00.
        Stack shape : .
        Start symbol: programme. *)

  | MenhirState02 : (('s, _menhir_box_programme) _menhir_cell1_UL_SYMBOLE, _menhir_box_programme) _menhir_state
    (** State 02.
        Stack shape : UL_SYMBOLE.
        Start symbol: programme. *)

  | MenhirState04 : (('s, _menhir_box_programme) _menhir_cell1_UL_VARIABLE, _menhir_box_programme) _menhir_state
    (** State 04.
        Stack shape : UL_VARIABLE.
        Start symbol: programme. *)

  | MenhirState07 : (('s, _menhir_box_programme) _menhir_cell1_terme, _menhir_box_programme) _menhir_state
    (** State 07.
        Stack shape : terme.
        Start symbol: programme. *)

  | MenhirState13 : (('s, _menhir_box_programme) _menhir_cell1_regle, _menhir_box_programme) _menhir_state
    (** State 13.
        Stack shape : regle.
        Start symbol: programme. *)

  | MenhirState16 : ((('s, _menhir_box_programme) _menhir_cell1_regle, _menhir_box_programme) _menhir_cell1_regle, _menhir_box_programme) _menhir_state
    (** State 16.
        Stack shape : regle regle.
        Start symbol: programme. *)

  | MenhirState20 : (('s, _menhir_box_programme) _menhir_cell1_predicat, _menhir_box_programme) _menhir_state
    (** State 20.
        Stack shape : predicat.
        Start symbol: programme. *)

  | MenhirState21 : (('s, _menhir_box_programme) _menhir_cell1_UL_NEGATION, _menhir_box_programme) _menhir_state
    (** State 21.
        Stack shape : UL_NEGATION.
        Start symbol: programme. *)

  | MenhirState29 : (('s, _menhir_box_programme) _menhir_cell1_deduction_aux, _menhir_box_programme) _menhir_state
    (** State 29.
        Stack shape : deduction_aux.
        Start symbol: programme. *)


and ('s, 'r) _menhir_cell1_deduction_aux = 
  | MenhirCell1_deduction_aux of 's * ('s, 'r) _menhir_state * (unit)

and ('s, 'r) _menhir_cell1_predicat = 
  | MenhirCell1_predicat of 's * ('s, 'r) _menhir_state * (unit)

and ('s, 'r) _menhir_cell1_regle = 
  | MenhirCell1_regle of 's * ('s, 'r) _menhir_state * (unit)

and ('s, 'r) _menhir_cell1_terme = 
  | MenhirCell1_terme of 's * ('s, 'r) _menhir_state * (unit)

and ('s, 'r) _menhir_cell1_UL_NEGATION = 
  | MenhirCell1_UL_NEGATION of 's * ('s, 'r) _menhir_state

and ('s, 'r) _menhir_cell1_UL_SYMBOLE = 
  | MenhirCell1_UL_SYMBOLE of 's * ('s, 'r) _menhir_state * (
# 16 "Parser.mly"
       (string)
# 112 "Parser.ml"
)

and ('s, 'r) _menhir_cell1_UL_VARIABLE = 
  | MenhirCell1_UL_VARIABLE of 's * ('s, 'r) _menhir_state * (
# 17 "Parser.mly"
       (string)
# 119 "Parser.ml"
)

and _menhir_box_programme = 
  | MenhirBox_programme of (unit) [@@unboxed]

let _menhir_action_01 =
  fun () ->
    (
# 42 "Parser.mly"
                        ( (print_endline "axiome : predicat.") )
# 130 "Parser.ml"
     : (unit))

let _menhir_action_02 =
  fun () ->
    (
# 44 "Parser.mly"
                                                  ( (print_endline "deduction : predicat :- suite_ded ."))
# 138 "Parser.ml"
     : (unit))

let _menhir_action_03 =
  fun () ->
    (
# 49 "Parser.mly"
                         ( (print_endline "deduction_aux : redicat ") )
# 146 "Parser.ml"
     : (unit))

let _menhir_action_04 =
  fun () ->
    (
# 50 "Parser.mly"
                                   ( (print_endline "deduction_aux : - predicat") )
# 154 "Parser.ml"
     : (unit))

let _menhir_action_05 =
  fun () ->
    (
# 51 "Parser.mly"
                        ( (print_endline "deduction_aux :  fail ") )
# 162 "Parser.ml"
     : (unit))

let _menhir_action_06 =
  fun () ->
    (
# 52 "Parser.mly"
                         ( (print_endline "deduction_aux :  ! ") )
# 170 "Parser.ml"
     : (unit))

let _menhir_action_07 =
  fun () ->
    (
# 54 "Parser.mly"
                                                    ( (print_endline "predicat :  symbole ( suite_var ) ") )
# 178 "Parser.ml"
     : (unit))

let _menhir_action_08 =
  fun () ->
    (
# 38 "Parser.mly"
                                     ( (print_endline "programme : regle suite_regle FIN ") )
# 186 "Parser.ml"
     : (unit))

let _menhir_action_09 =
  fun () ->
    (
# 40 "Parser.mly"
                           ( (print_endline "regle : axiome/deduction") )
# 194 "Parser.ml"
     : (unit))

let _menhir_action_10 =
  fun () ->
    (
# 40 "Parser.mly"
                           ( (print_endline "regle : axiome/deduction") )
# 202 "Parser.ml"
     : (unit))

let _menhir_action_11 =
  fun () ->
    (
# 46 "Parser.mly"
                          ( (print_endline "suite_ded : deduction_aux") )
# 210 "Parser.ml"
     : (unit))

let _menhir_action_12 =
  fun () ->
    (
# 47 "Parser.mly"
                                              ( (print_endline "suite_ded : deduction_aux , deduction_aux") )
# 218 "Parser.ml"
     : (unit))

let _menhir_action_13 =
  fun () ->
    (
# 64 "Parser.mly"
                                  ( (print_endline "suite_regle : vide") )
# 226 "Parser.ml"
     : (unit))

let _menhir_action_14 =
  fun () ->
    (
# 65 "Parser.mly"
                                ( (print_endline "suite_regle : suite de regles") )
# 234 "Parser.ml"
     : (unit))

let _menhir_action_15 =
  fun () ->
    (
# 56 "Parser.mly"
                        ( (print_endline "suite_var :  variable ") )
# 242 "Parser.ml"
     : (unit))

let _menhir_action_16 =
  fun () ->
    (
# 57 "Parser.mly"
                    ( (print_endline "suite_var :  terme ") )
# 250 "Parser.ml"
     : (unit))

let _menhir_action_17 =
  fun () ->
    (
# 58 "Parser.mly"
                                            ( (print_endline "suite_var :  variable, suite_var ") )
# 258 "Parser.ml"
     : (unit))

let _menhir_action_18 =
  fun () ->
    (
# 59 "Parser.mly"
                                      ( (print_endline "suite_var :  terme, suite_var ") )
# 266 "Parser.ml"
     : (unit))

let _menhir_action_19 =
  fun () ->
    (
# 61 "Parser.mly"
                   ( (print_endline "terme : symbol ") )
# 274 "Parser.ml"
     : (unit))

let _menhir_action_20 =
  fun () ->
    (
# 62 "Parser.mly"
                   ( (print_endline "terme : predicat ") )
# 282 "Parser.ml"
     : (unit))

let _menhir_print_token : token -> string =
  fun _tok ->
    match _tok with
    | UL_COUPURE ->
        "UL_COUPURE"
    | UL_DEDUCTION ->
        "UL_DEDUCTION"
    | UL_ECHEC ->
        "UL_ECHEC"
    | UL_FIN ->
        "UL_FIN"
    | UL_NEGATION ->
        "UL_NEGATION"
    | UL_PARFER ->
        "UL_PARFER"
    | UL_PAROUV ->
        "UL_PAROUV"
    | UL_PT ->
        "UL_PT"
    | UL_SYMBOLE _ ->
        "UL_SYMBOLE"
    | UL_VARIABLE _ ->
        "UL_VARIABLE"
    | UL_VIRG ->
        "UL_VIRG"

let _menhir_fail : unit -> 'a =
  fun () ->
    Printf.eprintf "Internal failure -- please contact the parser generator's developers.\n%!";
    assert false

include struct
  
  [@@@ocaml.warning "-4-37"]
  
  let _menhir_run_14 : type  ttv_stack. (ttv_stack, _menhir_box_programme) _menhir_cell1_regle -> _menhir_box_programme =
    fun _menhir_stack ->
      let MenhirCell1_regle (_menhir_stack, _, _) = _menhir_stack in
      let _v = _menhir_action_08 () in
      MenhirBox_programme _v
  
  let rec _menhir_run_17 : type  ttv_stack. ((ttv_stack, _menhir_box_programme) _menhir_cell1_regle, _menhir_box_programme) _menhir_cell1_regle -> _menhir_box_programme =
    fun _menhir_stack ->
      let MenhirCell1_regle (_menhir_stack, _menhir_s, _) = _menhir_stack in
      let _ = _menhir_action_14 () in
      _menhir_goto_suite_regle _menhir_stack _menhir_s
  
  and _menhir_goto_suite_regle : type  ttv_stack. ((ttv_stack, _menhir_box_programme) _menhir_cell1_regle as 'stack) -> ('stack, _menhir_box_programme) _menhir_state -> _menhir_box_programme =
    fun _menhir_stack _menhir_s ->
      match _menhir_s with
      | MenhirState16 ->
          _menhir_run_17 _menhir_stack
      | MenhirState13 ->
          _menhir_run_14 _menhir_stack
      | _ ->
          _menhir_fail ()
  
  let rec _menhir_run_01 : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> (ttv_stack, _menhir_box_programme) _menhir_state -> _menhir_box_programme =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s ->
      let _menhir_stack = MenhirCell1_UL_SYMBOLE (_menhir_stack, _menhir_s, _v) in
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | UL_PAROUV ->
          _menhir_run_02 _menhir_stack _menhir_lexbuf _menhir_lexer
      | _ ->
          _eRR ()
  
  and _menhir_run_02 : type  ttv_stack. (ttv_stack, _menhir_box_programme) _menhir_cell1_UL_SYMBOLE -> _ -> _ -> _menhir_box_programme =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer ->
      let _menhir_s = MenhirState02 in
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | UL_VARIABLE _v ->
          _menhir_run_03 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s
      | UL_SYMBOLE _v ->
          _menhir_run_05 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s
      | _ ->
          _eRR ()
  
  and _menhir_run_03 : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> (ttv_stack, _menhir_box_programme) _menhir_state -> _menhir_box_programme =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | UL_VIRG ->
          let _menhir_stack = MenhirCell1_UL_VARIABLE (_menhir_stack, _menhir_s, _v) in
          let _menhir_s = MenhirState04 in
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | UL_VARIABLE _v ->
              _menhir_run_03 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s
          | UL_SYMBOLE _v ->
              _menhir_run_05 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s
          | _ ->
              _eRR ())
      | UL_PARFER ->
          let _ = _menhir_action_15 () in
          _menhir_goto_suite_var _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | _ ->
          _eRR ()
  
  and _menhir_run_05 : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> (ttv_stack, _menhir_box_programme) _menhir_state -> _menhir_box_programme =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | UL_PAROUV ->
          let _menhir_stack = MenhirCell1_UL_SYMBOLE (_menhir_stack, _menhir_s, _v) in
          _menhir_run_02 _menhir_stack _menhir_lexbuf _menhir_lexer
      | UL_PARFER | UL_VIRG ->
          let _v = _menhir_action_19 () in
          _menhir_goto_terme _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | _ ->
          _eRR ()
  
  and _menhir_goto_terme : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> (ttv_stack, _menhir_box_programme) _menhir_state -> _ -> _menhir_box_programme =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      match (_tok : MenhirBasics.token) with
      | UL_VIRG ->
          let _menhir_stack = MenhirCell1_terme (_menhir_stack, _menhir_s, _v) in
          let _menhir_s = MenhirState07 in
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | UL_VARIABLE _v ->
              _menhir_run_03 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s
          | UL_SYMBOLE _v ->
              _menhir_run_05 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s
          | _ ->
              _eRR ())
      | UL_PARFER ->
          let _ = _menhir_action_16 () in
          _menhir_goto_suite_var _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | _ ->
          _eRR ()
  
  and _menhir_goto_suite_var : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_programme) _menhir_state -> _menhir_box_programme =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      match _menhir_s with
      | MenhirState02 ->
          _menhir_run_11 _menhir_stack _menhir_lexbuf _menhir_lexer
      | MenhirState04 ->
          _menhir_run_10 _menhir_stack _menhir_lexbuf _menhir_lexer
      | MenhirState07 ->
          _menhir_run_08 _menhir_stack _menhir_lexbuf _menhir_lexer
      | _ ->
          _menhir_fail ()
  
  and _menhir_run_11 : type  ttv_stack. (ttv_stack, _menhir_box_programme) _menhir_cell1_UL_SYMBOLE -> _ -> _ -> _menhir_box_programme =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      let MenhirCell1_UL_SYMBOLE (_menhir_stack, _menhir_s, _) = _menhir_stack in
      let _v = _menhir_action_07 () in
      _menhir_goto_predicat _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
  
  and _menhir_goto_predicat : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> (ttv_stack, _menhir_box_programme) _menhir_state -> _ -> _menhir_box_programme =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      match _menhir_s with
      | MenhirState29 ->
          _menhir_run_27 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
      | MenhirState20 ->
          _menhir_run_27 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
      | MenhirState21 ->
          _menhir_run_22 _menhir_stack _menhir_lexbuf _menhir_lexer _tok
      | MenhirState00 ->
          _menhir_run_18 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | MenhirState13 ->
          _menhir_run_18 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | MenhirState16 ->
          _menhir_run_18 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | MenhirState02 ->
          _menhir_run_09 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
      | MenhirState04 ->
          _menhir_run_09 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
      | MenhirState07 ->
          _menhir_run_09 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
  
  and _menhir_run_27 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_programme) _menhir_state -> _ -> _menhir_box_programme =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok ->
      let _v = _menhir_action_03 () in
      _menhir_goto_deduction_aux _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
  
  and _menhir_goto_deduction_aux : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> (ttv_stack, _menhir_box_programme) _menhir_state -> _ -> _menhir_box_programme =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      match (_tok : MenhirBasics.token) with
      | UL_VIRG ->
          let _menhir_stack = MenhirCell1_deduction_aux (_menhir_stack, _menhir_s, _v) in
          let _menhir_s = MenhirState29 in
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | UL_SYMBOLE _v ->
              _menhir_run_01 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s
          | UL_NEGATION ->
              _menhir_run_21 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | UL_ECHEC ->
              _menhir_run_23 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | UL_COUPURE ->
              _menhir_run_24 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | _ ->
              _eRR ())
      | UL_PT ->
          let _ = _menhir_action_11 () in
          _menhir_goto_suite_ded _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | _ ->
          _eRR ()
  
  and _menhir_run_21 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_programme) _menhir_state -> _menhir_box_programme =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _menhir_stack = MenhirCell1_UL_NEGATION (_menhir_stack, _menhir_s) in
      let _menhir_s = MenhirState21 in
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | UL_SYMBOLE _v ->
          _menhir_run_01 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s
      | _ ->
          _eRR ()
  
  and _menhir_run_23 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_programme) _menhir_state -> _menhir_box_programme =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      let _v = _menhir_action_05 () in
      _menhir_goto_deduction_aux _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
  
  and _menhir_run_24 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_programme) _menhir_state -> _menhir_box_programme =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      let _v = _menhir_action_06 () in
      _menhir_goto_deduction_aux _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
  
  and _menhir_goto_suite_ded : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_programme) _menhir_state -> _menhir_box_programme =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      match _menhir_s with
      | MenhirState29 ->
          _menhir_run_30 _menhir_stack _menhir_lexbuf _menhir_lexer
      | MenhirState20 ->
          _menhir_run_25 _menhir_stack _menhir_lexbuf _menhir_lexer
      | _ ->
          _menhir_fail ()
  
  and _menhir_run_30 : type  ttv_stack. (ttv_stack, _menhir_box_programme) _menhir_cell1_deduction_aux -> _ -> _ -> _menhir_box_programme =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer ->
      let MenhirCell1_deduction_aux (_menhir_stack, _menhir_s, _) = _menhir_stack in
      let _ = _menhir_action_12 () in
      _menhir_goto_suite_ded _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
  
  and _menhir_run_25 : type  ttv_stack. (ttv_stack, _menhir_box_programme) _menhir_cell1_predicat -> _ -> _ -> _menhir_box_programme =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      let MenhirCell1_predicat (_menhir_stack, _menhir_s, _) = _menhir_stack in
      let _ = _menhir_action_02 () in
      let _v = _menhir_action_10 () in
      _menhir_goto_regle _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
  
  and _menhir_goto_regle : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> (ttv_stack, _menhir_box_programme) _menhir_state -> _ -> _menhir_box_programme =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      match _menhir_s with
      | MenhirState16 ->
          _menhir_run_16 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | MenhirState13 ->
          _menhir_run_16 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | MenhirState00 ->
          _menhir_run_13 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | _ ->
          _menhir_fail ()
  
  and _menhir_run_16 : type  ttv_stack. ((ttv_stack, _menhir_box_programme) _menhir_cell1_regle as 'stack) -> _ -> _ -> _ -> ('stack, _menhir_box_programme) _menhir_state -> _ -> _menhir_box_programme =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      let _menhir_stack = MenhirCell1_regle (_menhir_stack, _menhir_s, _v) in
      match (_tok : MenhirBasics.token) with
      | UL_SYMBOLE _v_0 ->
          _menhir_run_01 _menhir_stack _menhir_lexbuf _menhir_lexer _v_0 MenhirState16
      | UL_FIN ->
          let _ = _menhir_action_13 () in
          _menhir_run_17 _menhir_stack
      | _ ->
          _eRR ()
  
  and _menhir_run_13 : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> (ttv_stack, _menhir_box_programme) _menhir_state -> _ -> _menhir_box_programme =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      let _menhir_stack = MenhirCell1_regle (_menhir_stack, _menhir_s, _v) in
      match (_tok : MenhirBasics.token) with
      | UL_SYMBOLE _v_0 ->
          _menhir_run_01 _menhir_stack _menhir_lexbuf _menhir_lexer _v_0 MenhirState13
      | UL_FIN ->
          let _ = _menhir_action_13 () in
          _menhir_run_14 _menhir_stack
      | _ ->
          _eRR ()
  
  and _menhir_run_22 : type  ttv_stack. (ttv_stack, _menhir_box_programme) _menhir_cell1_UL_NEGATION -> _ -> _ -> _ -> _menhir_box_programme =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _tok ->
      let MenhirCell1_UL_NEGATION (_menhir_stack, _menhir_s) = _menhir_stack in
      let _v = _menhir_action_04 () in
      _menhir_goto_deduction_aux _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
  
  and _menhir_run_18 : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> (ttv_stack, _menhir_box_programme) _menhir_state -> _ -> _menhir_box_programme =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      match (_tok : MenhirBasics.token) with
      | UL_PT ->
          let _tok = _menhir_lexer _menhir_lexbuf in
          let _ = _menhir_action_01 () in
          let _v = _menhir_action_09 () in
          _menhir_goto_regle _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | UL_DEDUCTION ->
          let _menhir_stack = MenhirCell1_predicat (_menhir_stack, _menhir_s, _v) in
          let _menhir_s = MenhirState20 in
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | UL_SYMBOLE _v ->
              _menhir_run_01 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s
          | UL_NEGATION ->
              _menhir_run_21 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | UL_ECHEC ->
              _menhir_run_23 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | UL_COUPURE ->
              _menhir_run_24 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | _ ->
              _eRR ())
      | _ ->
          _eRR ()
  
  and _menhir_run_09 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_programme) _menhir_state -> _ -> _menhir_box_programme =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok ->
      let _v = _menhir_action_20 () in
      _menhir_goto_terme _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
  
  and _menhir_run_10 : type  ttv_stack. (ttv_stack, _menhir_box_programme) _menhir_cell1_UL_VARIABLE -> _ -> _ -> _menhir_box_programme =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer ->
      let MenhirCell1_UL_VARIABLE (_menhir_stack, _menhir_s, _) = _menhir_stack in
      let _ = _menhir_action_17 () in
      _menhir_goto_suite_var _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
  
  and _menhir_run_08 : type  ttv_stack. (ttv_stack, _menhir_box_programme) _menhir_cell1_terme -> _ -> _ -> _menhir_box_programme =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer ->
      let MenhirCell1_terme (_menhir_stack, _menhir_s, _) = _menhir_stack in
      let _ = _menhir_action_18 () in
      _menhir_goto_suite_var _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
  
  let _menhir_run_00 : type  ttv_stack. ttv_stack -> _ -> _ -> _menhir_box_programme =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer ->
      let _menhir_s = MenhirState00 in
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | UL_SYMBOLE _v ->
          _menhir_run_01 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s
      | _ ->
          _eRR ()
  
end

let programme =
  fun _menhir_lexer _menhir_lexbuf ->
    let _menhir_stack = () in
    let MenhirBox_programme v = _menhir_run_00 _menhir_stack _menhir_lexbuf _menhir_lexer in
    v

# 66 "Parser.mly"
  

# 641 "Parser.ml"
