
module MenhirBasics = struct
  
  exception Error
  
  let _eRR =
    fun _s ->
      raise Error
  
  type token = 
    | UL_VIRG
    | UL_TO
    | UL_SYSTEM
    | UL_PTVIRG
    | UL_PT
    | UL_PAROUV
    | UL_PARFER
    | UL_OUT
    | UL_MODEL
    | UL_INT of (
# 18 "Parser.mly"
       (int)
# 24 "Parser.ml"
  )
    | UL_IN
    | UL_IDENT of (
# 17 "Parser.mly"
       (string)
# 30 "Parser.ml"
  )
    | UL_FROM
    | UL_FLOW
    | UL_FLOAT
    | UL_FIN
    | UL_DPT
    | UL_CROUV
    | UL_CRFER
    | UL_BOOL
    | UL_BLOCK
    | UL_ACCOUV
    | UL_ACCFER
    | IDENT of (
# 17 "Parser.mly"
       (string)
# 46 "Parser.ml"
  )
  
end

include MenhirBasics

# 1 "Parser.mly"
  

(* Partie recopiee dans le fichier CaML genere. *)
(* Ouverture de modules exploites dans les actions *)
(* Declarations de types, de constantes, de fonctions, d'exceptions exploites dans les actions *)


# 61 "Parser.ml"

type ('s, 'r) _menhir_state = 
  | MenhirState03 : ('s _menhir_cell0_UL_IDENT, _menhir_box_modele) _menhir_state
    (** State 03.
        Stack shape : UL_IDENT.
        Start symbol: modele. *)

  | MenhirState05 : (('s, _menhir_box_modele) _menhir_cell1_UL_SYSTEM _menhir_cell0_UL_IDENT, _menhir_box_modele) _menhir_state
    (** State 05.
        Stack shape : UL_SYSTEM UL_IDENT.
        Start symbol: modele. *)

  | MenhirState06 : (('s _menhir_cell0_UL_IDENT, _menhir_box_modele) _menhir_cell1_UL_PAROUV, _menhir_box_modele) _menhir_state
    (** State 06.
        Stack shape : UL_IDENT UL_PAROUV.
        Start symbol: modele. *)

  | MenhirState09 : (('s, _menhir_box_modele) _menhir_cell1_IDENT, _menhir_box_modele) _menhir_state
    (** State 09.
        Stack shape : IDENT.
        Start symbol: modele. *)

  | MenhirState10 : (('s, _menhir_box_modele) _menhir_cell1_UL_INT, _menhir_box_modele) _menhir_state
    (** State 10.
        Stack shape : UL_INT.
        Start symbol: modele. *)

  | MenhirState11 : (('s, _menhir_box_modele) _menhir_cell1_UL_CROUV, _menhir_box_modele) _menhir_state
    (** State 11.
        Stack shape : UL_CROUV.
        Start symbol: modele. *)

  | MenhirState13 : (('s, _menhir_box_modele) _menhir_cell1_UL_INT, _menhir_box_modele) _menhir_state
    (** State 13.
        Stack shape : UL_INT.
        Start symbol: modele. *)

  | MenhirState18 : (('s, _menhir_box_modele) _menhir_cell1_UL_FLOAT, _menhir_box_modele) _menhir_state
    (** State 18.
        Stack shape : UL_FLOAT.
        Start symbol: modele. *)

  | MenhirState20 : (('s, _menhir_box_modele) _menhir_cell1_UL_BOOL, _menhir_box_modele) _menhir_state
    (** State 20.
        Stack shape : UL_BOOL.
        Start symbol: modele. *)

  | MenhirState23 : (('s, _menhir_box_modele) _menhir_cell1_IDENT, _menhir_box_modele) _menhir_state
    (** State 23.
        Stack shape : IDENT.
        Start symbol: modele. *)

  | MenhirState26 : (('s, _menhir_box_modele) _menhir_cell1_port, _menhir_box_modele) _menhir_state
    (** State 26.
        Stack shape : port.
        Start symbol: modele. *)

  | MenhirState31 : ((('s, _menhir_box_modele) _menhir_cell1_UL_SYSTEM _menhir_cell0_UL_IDENT, _menhir_box_modele) _menhir_cell1_parametres, _menhir_box_modele) _menhir_state
    (** State 31.
        Stack shape : UL_SYSTEM UL_IDENT parametres.
        Start symbol: modele. *)

  | MenhirState34 : (('s, _menhir_box_modele) _menhir_cell1_UL_FLOW _menhir_cell0_IDENT, _menhir_box_modele) _menhir_state
    (** State 34.
        Stack shape : UL_FLOW IDENT.
        Start symbol: modele. *)

  | MenhirState36 : (('s, _menhir_box_modele) _menhir_cell1_UL_IDENT, _menhir_box_modele) _menhir_state
    (** State 36.
        Stack shape : UL_IDENT.
        Start symbol: modele. *)

  | MenhirState40 : ((('s, _menhir_box_modele) _menhir_cell1_UL_FLOW _menhir_cell0_IDENT, _menhir_box_modele) _menhir_cell1_sub_ident _menhir_cell0_IDENT, _menhir_box_modele) _menhir_state
    (** State 40.
        Stack shape : UL_FLOW IDENT sub_ident IDENT.
        Start symbol: modele. *)

  | MenhirState44 : (('s, _menhir_box_modele) _menhir_cell1_UL_IDENT _menhir_cell0_IDENT, _menhir_box_modele) _menhir_state
    (** State 44.
        Stack shape : UL_IDENT IDENT.
        Start symbol: modele. *)

  | MenhirState51 : (('s, _menhir_box_modele) _menhir_cell1_UL_BLOCK _menhir_cell0_UL_IDENT, _menhir_box_modele) _menhir_state
    (** State 51.
        Stack shape : UL_BLOCK UL_IDENT.
        Start symbol: modele. *)

  | MenhirState57 : (('s, _menhir_box_modele) _menhir_cell1_model_aux, _menhir_box_modele) _menhir_state
    (** State 57.
        Stack shape : model_aux.
        Start symbol: modele. *)

  | MenhirState64 : (('s, _menhir_box_modele) _menhir_cell1_model_aux, _menhir_box_modele) _menhir_state
    (** State 64.
        Stack shape : model_aux.
        Start symbol: modele. *)


and ('s, 'r) _menhir_cell1_model_aux = 
  | MenhirCell1_model_aux of 's * ('s, 'r) _menhir_state * (unit)

and ('s, 'r) _menhir_cell1_parametres = 
  | MenhirCell1_parametres of 's * ('s, 'r) _menhir_state * (unit)

and ('s, 'r) _menhir_cell1_port = 
  | MenhirCell1_port of 's * ('s, 'r) _menhir_state * (unit)

and ('s, 'r) _menhir_cell1_sub_ident = 
  | MenhirCell1_sub_ident of 's * ('s, 'r) _menhir_state * (unit)

and ('s, 'r) _menhir_cell1_IDENT = 
  | MenhirCell1_IDENT of 's * ('s, 'r) _menhir_state * (
# 17 "Parser.mly"
       (string)
# 176 "Parser.ml"
)

and 's _menhir_cell0_IDENT = 
  | MenhirCell0_IDENT of 's * (
# 17 "Parser.mly"
       (string)
# 183 "Parser.ml"
)

and ('s, 'r) _menhir_cell1_UL_BLOCK = 
  | MenhirCell1_UL_BLOCK of 's * ('s, 'r) _menhir_state

and ('s, 'r) _menhir_cell1_UL_BOOL = 
  | MenhirCell1_UL_BOOL of 's * ('s, 'r) _menhir_state

and ('s, 'r) _menhir_cell1_UL_CROUV = 
  | MenhirCell1_UL_CROUV of 's * ('s, 'r) _menhir_state

and ('s, 'r) _menhir_cell1_UL_FLOAT = 
  | MenhirCell1_UL_FLOAT of 's * ('s, 'r) _menhir_state

and ('s, 'r) _menhir_cell1_UL_FLOW = 
  | MenhirCell1_UL_FLOW of 's * ('s, 'r) _menhir_state

and ('s, 'r) _menhir_cell1_UL_IDENT = 
  | MenhirCell1_UL_IDENT of 's * ('s, 'r) _menhir_state * (
# 17 "Parser.mly"
       (string)
# 205 "Parser.ml"
)

and 's _menhir_cell0_UL_IDENT = 
  | MenhirCell0_UL_IDENT of 's * (
# 17 "Parser.mly"
       (string)
# 212 "Parser.ml"
)

and ('s, 'r) _menhir_cell1_UL_INT = 
  | MenhirCell1_UL_INT of 's * ('s, 'r) _menhir_state * (
# 18 "Parser.mly"
       (int)
# 219 "Parser.ml"
)

and ('s, 'r) _menhir_cell1_UL_PAROUV = 
  | MenhirCell1_UL_PAROUV of 's * ('s, 'r) _menhir_state

and ('s, 'r) _menhir_cell1_UL_SYSTEM = 
  | MenhirCell1_UL_SYSTEM of 's * ('s, 'r) _menhir_state

and _menhir_box_modele = 
  | MenhirBox_modele of (unit) [@@unboxed]

let _menhir_action_01 =
  fun () ->
    (
# 76 "Parser.mly"
                                        ((print_endline "aux_flot : Ident . ident"))
# 236 "Parser.ml"
     : (unit))

let _menhir_action_02 =
  fun () ->
    (
# 77 "Parser.mly"
                                                    ((print_endline "aux_flot : Ident . ident aux_flot"))
# 244 "Parser.ml"
     : (unit))

let _menhir_action_03 =
  fun () ->
    (
# 64 "Parser.mly"
                       ((print_endline "aux_int : int"))
# 252 "Parser.ml"
     : (unit))

let _menhir_action_04 =
  fun () ->
    (
# 65 "Parser.mly"
                                        ((print_endline "aux_int : int , aux_int"))
# 260 "Parser.ml"
     : (unit))

let _menhir_action_05 =
  fun () ->
    (
# 51 "Parser.mly"
                            ((print_endline "aux_parametres : port"))
# 268 "Parser.ml"
     : (unit))

let _menhir_action_06 =
  fun () ->
    (
# 52 "Parser.mly"
                                                  ((print_endline "aux_parametres : port , aux_parametres"))
# 276 "Parser.ml"
     : (unit))

let _menhir_action_07 =
  fun () ->
    (
# 42 "Parser.mly"
                                                ((print_endline "bloc : block Ident parametres ;"))
# 284 "Parser.ml"
     : (unit))

let _menhir_action_08 =
  fun () ->
    (
# 67 "Parser.mly"
                                                                         ((print_endline "flot : flow ident from sub_ident ident to suite_flot ;"))
# 292 "Parser.ml"
     : (unit))

let _menhir_action_09 =
  fun () ->
    (
# 38 "Parser.mly"
                     ((print_endline "model_aux : block"))
# 300 "Parser.ml"
     : (unit))

let _menhir_action_10 =
  fun () ->
    (
# 39 "Parser.mly"
                          ((print_endline "model_aux : system"))
# 308 "Parser.ml"
     : (unit))

let _menhir_action_11 =
  fun () ->
    (
# 40 "Parser.mly"
                            ((print_endline "model_aux : flot"))
# 316 "Parser.ml"
     : (unit))

let _menhir_action_12 =
  fun () ->
    (
# 33 "Parser.mly"
                                                                  ( (print_endline "modele : UL_MODEL IDENT { suite_model } UL_FIN ") )
# 324 "Parser.ml"
     : (unit))

let _menhir_action_13 =
  fun () ->
    (
# 49 "Parser.mly"
                                                    ((print_endline "parametres : (aux_parametres)"))
# 332 "Parser.ml"
     : (unit))

let _menhir_action_14 =
  fun () ->
    (
# 54 "Parser.mly"
                               ((print_endline "port : ident : in type"))
# 340 "Parser.ml"
     : (unit))

let _menhir_action_15 =
  fun () ->
    (
# 55 "Parser.mly"
                               ((print_endline "port : ident : out type"))
# 348 "Parser.ml"
     : (unit))

let _menhir_action_16 =
  fun () ->
    (
# 69 "Parser.mly"
                                        ((print_endline "sub_ident : vide"))
# 356 "Parser.ml"
     : (unit))

let _menhir_action_17 =
  fun () ->
    (
# 70 "Parser.mly"
                                        ((print_endline "sub_ident : Ident ."))
# 364 "Parser.ml"
     : (unit))

let _menhir_action_18 =
  fun () ->
    (
# 61 "Parser.mly"
                                    ((print_endline "sun_int : vide"))
# 372 "Parser.ml"
     : (unit))

let _menhir_action_19 =
  fun () ->
    (
# 62 "Parser.mly"
                                        ((print_endline "sub_int : [aux_int]"))
# 380 "Parser.ml"
     : (unit))

let _menhir_action_20 =
  fun () ->
    (
# 72 "Parser.mly"
                                        ((print_endline "suite_flot : vide"))
# 388 "Parser.ml"
     : (unit))

let _menhir_action_21 =
  fun () ->
    (
# 73 "Parser.mly"
                                        ((print_endline "suite_flot : ident"))
# 396 "Parser.ml"
     : (unit))

let _menhir_action_22 =
  fun () ->
    (
# 74 "Parser.mly"
                                        ((print_endline "suite_flot : aux_flot"))
# 404 "Parser.ml"
     : (unit))

let _menhir_action_23 =
  fun () ->
    (
# 35 "Parser.mly"
                                   ((print_endline "suite_model : vide"))
# 412 "Parser.ml"
     : (unit))

let _menhir_action_24 =
  fun () ->
    (
# 36 "Parser.mly"
                                     ((print_endline "suite_model : model_aux suite_model"))
# 420 "Parser.ml"
     : (unit))

let _menhir_action_25 =
  fun () ->
    (
# 46 "Parser.mly"
                                     ((print_endline "suite_systeme : vide"))
# 428 "Parser.ml"
     : (unit))

let _menhir_action_26 =
  fun () ->
    (
# 47 "Parser.mly"
                                       ((print_endline "suite_systeme : systeme_aux suite_systeme"))
# 436 "Parser.ml"
     : (unit))

let _menhir_action_27 =
  fun () ->
    (
# 44 "Parser.mly"
                                                                            ((print_endline "system : systeme Ident parametres { suite_systeme }"))
# 444 "Parser.ml"
     : (unit))

let _menhir_action_28 =
  fun () ->
    (
# 57 "Parser.mly"
                           ((print_endline "type : int sub_int"))
# 452 "Parser.ml"
     : (unit))

let _menhir_action_29 =
  fun () ->
    (
# 58 "Parser.mly"
                            ((print_endline "type : float sub_int"))
# 460 "Parser.ml"
     : (unit))

let _menhir_action_30 =
  fun () ->
    (
# 59 "Parser.mly"
                            ((print_endline "type : boolean sub_int"))
# 468 "Parser.ml"
     : (unit))

let _menhir_print_token : token -> string =
  fun _tok ->
    match _tok with
    | IDENT _ ->
        "IDENT"
    | UL_ACCFER ->
        "UL_ACCFER"
    | UL_ACCOUV ->
        "UL_ACCOUV"
    | UL_BLOCK ->
        "UL_BLOCK"
    | UL_BOOL ->
        "UL_BOOL"
    | UL_CRFER ->
        "UL_CRFER"
    | UL_CROUV ->
        "UL_CROUV"
    | UL_DPT ->
        "UL_DPT"
    | UL_FIN ->
        "UL_FIN"
    | UL_FLOAT ->
        "UL_FLOAT"
    | UL_FLOW ->
        "UL_FLOW"
    | UL_FROM ->
        "UL_FROM"
    | UL_IDENT _ ->
        "UL_IDENT"
    | UL_IN ->
        "UL_IN"
    | UL_INT _ ->
        "UL_INT"
    | UL_MODEL ->
        "UL_MODEL"
    | UL_OUT ->
        "UL_OUT"
    | UL_PARFER ->
        "UL_PARFER"
    | UL_PAROUV ->
        "UL_PAROUV"
    | UL_PT ->
        "UL_PT"
    | UL_PTVIRG ->
        "UL_PTVIRG"
    | UL_SYSTEM ->
        "UL_SYSTEM"
    | UL_TO ->
        "UL_TO"
    | UL_VIRG ->
        "UL_VIRG"

let _menhir_fail : unit -> 'a =
  fun () ->
    Printf.eprintf "Internal failure -- please contact the parser generator's developers.\n%!";
    assert false

include struct
  
  [@@@ocaml.warning "-4-37"]
  
  let _menhir_run_61 : type  ttv_stack. ttv_stack _menhir_cell0_UL_IDENT -> _ -> _ -> _menhir_box_modele =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | UL_FIN ->
          let MenhirCell0_UL_IDENT (_menhir_stack, _) = _menhir_stack in
          let _v = _menhir_action_12 () in
          MenhirBox_modele _v
      | _ ->
          _eRR ()
  
  let rec _menhir_run_65 : type  ttv_stack. (ttv_stack, _menhir_box_modele) _menhir_cell1_model_aux -> _ -> _ -> _menhir_box_modele =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer ->
      let MenhirCell1_model_aux (_menhir_stack, _menhir_s, _) = _menhir_stack in
      let _ = _menhir_action_24 () in
      _menhir_goto_suite_model _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
  
  and _menhir_goto_suite_model : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_modele) _menhir_state -> _menhir_box_modele =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      match _menhir_s with
      | MenhirState64 ->
          _menhir_run_65 _menhir_stack _menhir_lexbuf _menhir_lexer
      | MenhirState03 ->
          _menhir_run_61 _menhir_stack _menhir_lexbuf _menhir_lexer
      | _ ->
          _menhir_fail ()
  
  let rec _menhir_run_04 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_modele) _menhir_state -> _menhir_box_modele =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _menhir_stack = MenhirCell1_UL_SYSTEM (_menhir_stack, _menhir_s) in
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | UL_IDENT _v ->
          let _menhir_stack = MenhirCell0_UL_IDENT (_menhir_stack, _v) in
          let _menhir_s = MenhirState05 in
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | UL_PAROUV ->
              _menhir_run_06 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | _ ->
              _eRR ())
      | _ ->
          _eRR ()
  
  and _menhir_run_06 : type  ttv_stack. (ttv_stack _menhir_cell0_UL_IDENT as 'stack) -> _ -> _ -> ('stack, _menhir_box_modele) _menhir_state -> _menhir_box_modele =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _menhir_stack = MenhirCell1_UL_PAROUV (_menhir_stack, _menhir_s) in
      let _menhir_s = MenhirState06 in
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | IDENT _v ->
          _menhir_run_07 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s
      | _ ->
          _eRR ()
  
  and _menhir_run_07 : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> (ttv_stack, _menhir_box_modele) _menhir_state -> _menhir_box_modele =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s ->
      let _menhir_stack = MenhirCell1_IDENT (_menhir_stack, _menhir_s, _v) in
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | UL_DPT ->
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | UL_OUT ->
              let _menhir_s = MenhirState09 in
              let _tok = _menhir_lexer _menhir_lexbuf in
              (match (_tok : MenhirBasics.token) with
              | UL_INT _v ->
                  _menhir_run_10 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s
              | UL_FLOAT ->
                  _menhir_run_18 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
              | UL_BOOL ->
                  _menhir_run_20 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
              | _ ->
                  _eRR ())
          | UL_IN ->
              let _menhir_s = MenhirState23 in
              let _tok = _menhir_lexer _menhir_lexbuf in
              (match (_tok : MenhirBasics.token) with
              | UL_INT _v ->
                  _menhir_run_10 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s
              | UL_FLOAT ->
                  _menhir_run_18 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
              | UL_BOOL ->
                  _menhir_run_20 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
              | _ ->
                  _eRR ())
          | _ ->
              _eRR ())
      | _ ->
          _eRR ()
  
  and _menhir_run_10 : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> (ttv_stack, _menhir_box_modele) _menhir_state -> _menhir_box_modele =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s ->
      let _menhir_stack = MenhirCell1_UL_INT (_menhir_stack, _menhir_s, _v) in
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | UL_CROUV ->
          _menhir_run_11 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState10
      | UL_PARFER | UL_VIRG ->
          let _ = _menhir_action_18 () in
          _menhir_run_17 _menhir_stack _menhir_lexbuf _menhir_lexer _tok
      | _ ->
          _eRR ()
  
  and _menhir_run_11 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_modele) _menhir_state -> _menhir_box_modele =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _menhir_stack = MenhirCell1_UL_CROUV (_menhir_stack, _menhir_s) in
      let _menhir_s = MenhirState11 in
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | UL_INT _v ->
          _menhir_run_12 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s
      | _ ->
          _eRR ()
  
  and _menhir_run_12 : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> (ttv_stack, _menhir_box_modele) _menhir_state -> _menhir_box_modele =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | UL_VIRG ->
          let _menhir_stack = MenhirCell1_UL_INT (_menhir_stack, _menhir_s, _v) in
          let _menhir_s = MenhirState13 in
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | UL_INT _v ->
              _menhir_run_12 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s
          | _ ->
              _eRR ())
      | UL_CRFER ->
          let _ = _menhir_action_03 () in
          _menhir_goto_aux_int _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | _ ->
          _eRR ()
  
  and _menhir_goto_aux_int : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_modele) _menhir_state -> _menhir_box_modele =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      match _menhir_s with
      | MenhirState11 ->
          _menhir_run_15 _menhir_stack _menhir_lexbuf _menhir_lexer
      | MenhirState13 ->
          _menhir_run_14 _menhir_stack _menhir_lexbuf _menhir_lexer
      | _ ->
          _menhir_fail ()
  
  and _menhir_run_15 : type  ttv_stack. (ttv_stack, _menhir_box_modele) _menhir_cell1_UL_CROUV -> _ -> _ -> _menhir_box_modele =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      let MenhirCell1_UL_CROUV (_menhir_stack, _menhir_s) = _menhir_stack in
      let _ = _menhir_action_19 () in
      _menhir_goto_sub_int _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
  
  and _menhir_goto_sub_int : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_modele) _menhir_state -> _ -> _menhir_box_modele =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok ->
      match _menhir_s with
      | MenhirState20 ->
          _menhir_run_21 _menhir_stack _menhir_lexbuf _menhir_lexer _tok
      | MenhirState18 ->
          _menhir_run_19 _menhir_stack _menhir_lexbuf _menhir_lexer _tok
      | MenhirState10 ->
          _menhir_run_17 _menhir_stack _menhir_lexbuf _menhir_lexer _tok
      | _ ->
          _menhir_fail ()
  
  and _menhir_run_21 : type  ttv_stack. (ttv_stack, _menhir_box_modele) _menhir_cell1_UL_BOOL -> _ -> _ -> _ -> _menhir_box_modele =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _tok ->
      let MenhirCell1_UL_BOOL (_menhir_stack, _menhir_s) = _menhir_stack in
      let _ = _menhir_action_30 () in
      _menhir_goto_typ _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
  
  and _menhir_goto_typ : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_modele) _menhir_state -> _ -> _menhir_box_modele =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok ->
      match _menhir_s with
      | MenhirState23 ->
          _menhir_run_24 _menhir_stack _menhir_lexbuf _menhir_lexer _tok
      | MenhirState09 ->
          _menhir_run_22 _menhir_stack _menhir_lexbuf _menhir_lexer _tok
      | _ ->
          _menhir_fail ()
  
  and _menhir_run_24 : type  ttv_stack. (ttv_stack, _menhir_box_modele) _menhir_cell1_IDENT -> _ -> _ -> _ -> _menhir_box_modele =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _tok ->
      let MenhirCell1_IDENT (_menhir_stack, _menhir_s, _) = _menhir_stack in
      let _v = _menhir_action_14 () in
      _menhir_goto_port _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
  
  and _menhir_goto_port : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> (ttv_stack, _menhir_box_modele) _menhir_state -> _ -> _menhir_box_modele =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      match (_tok : MenhirBasics.token) with
      | UL_VIRG ->
          let _menhir_stack = MenhirCell1_port (_menhir_stack, _menhir_s, _v) in
          let _menhir_s = MenhirState26 in
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | IDENT _v ->
              _menhir_run_07 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s
          | _ ->
              _eRR ())
      | UL_PARFER ->
          let _ = _menhir_action_05 () in
          _menhir_goto_aux_parametres _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | _ ->
          _eRR ()
  
  and _menhir_goto_aux_parametres : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_modele) _menhir_state -> _menhir_box_modele =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      match _menhir_s with
      | MenhirState06 ->
          _menhir_run_28 _menhir_stack _menhir_lexbuf _menhir_lexer
      | MenhirState26 ->
          _menhir_run_27 _menhir_stack _menhir_lexbuf _menhir_lexer
      | _ ->
          _menhir_fail ()
  
  and _menhir_run_28 : type  ttv_stack. (ttv_stack _menhir_cell0_UL_IDENT, _menhir_box_modele) _menhir_cell1_UL_PAROUV -> _ -> _ -> _menhir_box_modele =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      let MenhirCell1_UL_PAROUV (_menhir_stack, _menhir_s) = _menhir_stack in
      let _v = _menhir_action_13 () in
      _menhir_goto_parametres _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
  
  and _menhir_goto_parametres : type  ttv_stack. (ttv_stack _menhir_cell0_UL_IDENT as 'stack) -> _ -> _ -> _ -> ('stack, _menhir_box_modele) _menhir_state -> _ -> _menhir_box_modele =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      match _menhir_s with
      | MenhirState51 ->
          _menhir_run_52 _menhir_stack _menhir_lexbuf _menhir_lexer _tok
      | MenhirState05 ->
          _menhir_run_30 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | _ ->
          _menhir_fail ()
  
  and _menhir_run_52 : type  ttv_stack. (ttv_stack, _menhir_box_modele) _menhir_cell1_UL_BLOCK _menhir_cell0_UL_IDENT -> _ -> _ -> _ -> _menhir_box_modele =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _tok ->
      match (_tok : MenhirBasics.token) with
      | UL_PTVIRG ->
          let _tok = _menhir_lexer _menhir_lexbuf in
          let MenhirCell0_UL_IDENT (_menhir_stack, _) = _menhir_stack in
          let MenhirCell1_UL_BLOCK (_menhir_stack, _menhir_s) = _menhir_stack in
          let _ = _menhir_action_07 () in
          let _v = _menhir_action_09 () in
          _menhir_goto_model_aux _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | _ ->
          _eRR ()
  
  and _menhir_goto_model_aux : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> (ttv_stack, _menhir_box_modele) _menhir_state -> _ -> _menhir_box_modele =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      match _menhir_s with
      | MenhirState64 ->
          _menhir_run_64 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | MenhirState03 ->
          _menhir_run_64 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | MenhirState57 ->
          _menhir_run_57 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | MenhirState31 ->
          _menhir_run_57 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | _ ->
          _menhir_fail ()
  
  and _menhir_run_64 : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> (ttv_stack, _menhir_box_modele) _menhir_state -> _ -> _menhir_box_modele =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      let _menhir_stack = MenhirCell1_model_aux (_menhir_stack, _menhir_s, _v) in
      match (_tok : MenhirBasics.token) with
      | UL_SYSTEM ->
          _menhir_run_04 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState64
      | UL_FLOW ->
          _menhir_run_32 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState64
      | UL_BLOCK ->
          _menhir_run_50 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState64
      | UL_ACCFER ->
          let _ = _menhir_action_23 () in
          _menhir_run_65 _menhir_stack _menhir_lexbuf _menhir_lexer
      | _ ->
          _eRR ()
  
  and _menhir_run_32 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_modele) _menhir_state -> _menhir_box_modele =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _menhir_stack = MenhirCell1_UL_FLOW (_menhir_stack, _menhir_s) in
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | IDENT _v ->
          let _menhir_stack = MenhirCell0_IDENT (_menhir_stack, _v) in
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | UL_FROM ->
              let _tok = _menhir_lexer _menhir_lexbuf in
              (match (_tok : MenhirBasics.token) with
              | UL_IDENT _v_0 ->
                  _menhir_run_35 _menhir_stack _menhir_lexbuf _menhir_lexer _v_0 MenhirState34
              | IDENT _ ->
                  let _v_1 = _menhir_action_16 () in
                  _menhir_run_38 _menhir_stack _menhir_lexbuf _menhir_lexer _v_1 MenhirState34 _tok
              | _ ->
                  _eRR ())
          | _ ->
              _eRR ())
      | _ ->
          _eRR ()
  
  and _menhir_run_35 : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> (ttv_stack, _menhir_box_modele) _menhir_state -> _menhir_box_modele =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s ->
      let _menhir_stack = MenhirCell1_UL_IDENT (_menhir_stack, _menhir_s, _v) in
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | UL_PT ->
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | UL_IDENT _v_0 ->
              _menhir_run_35 _menhir_stack _menhir_lexbuf _menhir_lexer _v_0 MenhirState36
          | IDENT _ ->
              let _ = _menhir_action_16 () in
              _menhir_run_37 _menhir_stack _menhir_lexbuf _menhir_lexer _tok
          | _ ->
              _eRR ())
      | _ ->
          _eRR ()
  
  and _menhir_run_37 : type  ttv_stack. (ttv_stack, _menhir_box_modele) _menhir_cell1_UL_IDENT -> _ -> _ -> _ -> _menhir_box_modele =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _tok ->
      let MenhirCell1_UL_IDENT (_menhir_stack, _menhir_s, _) = _menhir_stack in
      let _v = _menhir_action_17 () in
      _menhir_goto_sub_ident _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
  
  and _menhir_goto_sub_ident : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> (ttv_stack, _menhir_box_modele) _menhir_state -> _ -> _menhir_box_modele =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      match _menhir_s with
      | MenhirState34 ->
          _menhir_run_38 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | MenhirState36 ->
          _menhir_run_37 _menhir_stack _menhir_lexbuf _menhir_lexer _tok
      | _ ->
          _menhir_fail ()
  
  and _menhir_run_38 : type  ttv_stack. ((ttv_stack, _menhir_box_modele) _menhir_cell1_UL_FLOW _menhir_cell0_IDENT as 'stack) -> _ -> _ -> _ -> ('stack, _menhir_box_modele) _menhir_state -> _ -> _menhir_box_modele =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      let _menhir_stack = MenhirCell1_sub_ident (_menhir_stack, _menhir_s, _v) in
      match (_tok : MenhirBasics.token) with
      | IDENT _v_0 ->
          let _menhir_stack = MenhirCell0_IDENT (_menhir_stack, _v_0) in
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | UL_TO ->
              let _tok = _menhir_lexer _menhir_lexbuf in
              (match (_tok : MenhirBasics.token) with
              | UL_IDENT _v_1 ->
                  _menhir_run_41 _menhir_stack _menhir_lexbuf _menhir_lexer _v_1 MenhirState40
              | IDENT _ ->
                  let _tok = _menhir_lexer _menhir_lexbuf in
                  let _ = _menhir_action_21 () in
                  _menhir_goto_suite_flot _menhir_stack _menhir_lexbuf _menhir_lexer _tok
              | UL_PTVIRG ->
                  let _ = _menhir_action_20 () in
                  _menhir_goto_suite_flot _menhir_stack _menhir_lexbuf _menhir_lexer _tok
              | _ ->
                  _eRR ())
          | _ ->
              _eRR ())
      | _ ->
          _menhir_fail ()
  
  and _menhir_run_41 : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> (ttv_stack, _menhir_box_modele) _menhir_state -> _menhir_box_modele =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | UL_PT ->
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | IDENT _v_0 ->
              let _tok = _menhir_lexer _menhir_lexbuf in
              (match (_tok : MenhirBasics.token) with
              | UL_VIRG ->
                  let _menhir_stack = MenhirCell1_UL_IDENT (_menhir_stack, _menhir_s, _v) in
                  let _menhir_stack = MenhirCell0_IDENT (_menhir_stack, _v_0) in
                  let _menhir_s = MenhirState44 in
                  let _tok = _menhir_lexer _menhir_lexbuf in
                  (match (_tok : MenhirBasics.token) with
                  | UL_IDENT _v ->
                      _menhir_run_41 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s
                  | _ ->
                      _eRR ())
              | UL_PTVIRG ->
                  let _ = _menhir_action_01 () in
                  _menhir_goto_aux_flot _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
              | _ ->
                  _eRR ())
          | _ ->
              _eRR ())
      | _ ->
          _eRR ()
  
  and _menhir_goto_aux_flot : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_modele) _menhir_state -> _ -> _menhir_box_modele =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok ->
      match _menhir_s with
      | MenhirState40 ->
          _menhir_run_49 _menhir_stack _menhir_lexbuf _menhir_lexer _tok
      | MenhirState44 ->
          _menhir_run_45 _menhir_stack _menhir_lexbuf _menhir_lexer _tok
      | _ ->
          _menhir_fail ()
  
  and _menhir_run_49 : type  ttv_stack. ((ttv_stack, _menhir_box_modele) _menhir_cell1_UL_FLOW _menhir_cell0_IDENT, _menhir_box_modele) _menhir_cell1_sub_ident _menhir_cell0_IDENT -> _ -> _ -> _ -> _menhir_box_modele =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _tok ->
      let _ = _menhir_action_22 () in
      _menhir_goto_suite_flot _menhir_stack _menhir_lexbuf _menhir_lexer _tok
  
  and _menhir_goto_suite_flot : type  ttv_stack. ((ttv_stack, _menhir_box_modele) _menhir_cell1_UL_FLOW _menhir_cell0_IDENT, _menhir_box_modele) _menhir_cell1_sub_ident _menhir_cell0_IDENT -> _ -> _ -> _ -> _menhir_box_modele =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _tok ->
      match (_tok : MenhirBasics.token) with
      | UL_PTVIRG ->
          let _tok = _menhir_lexer _menhir_lexbuf in
          let MenhirCell0_IDENT (_menhir_stack, _) = _menhir_stack in
          let MenhirCell1_sub_ident (_menhir_stack, _, _) = _menhir_stack in
          let MenhirCell0_IDENT (_menhir_stack, _) = _menhir_stack in
          let MenhirCell1_UL_FLOW (_menhir_stack, _menhir_s) = _menhir_stack in
          let _ = _menhir_action_08 () in
          let _v = _menhir_action_11 () in
          _menhir_goto_model_aux _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | _ ->
          _eRR ()
  
  and _menhir_run_45 : type  ttv_stack. (ttv_stack, _menhir_box_modele) _menhir_cell1_UL_IDENT _menhir_cell0_IDENT -> _ -> _ -> _ -> _menhir_box_modele =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _tok ->
      let MenhirCell0_IDENT (_menhir_stack, _) = _menhir_stack in
      let MenhirCell1_UL_IDENT (_menhir_stack, _menhir_s, _) = _menhir_stack in
      let _ = _menhir_action_02 () in
      _menhir_goto_aux_flot _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
  
  and _menhir_run_50 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_modele) _menhir_state -> _menhir_box_modele =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _menhir_stack = MenhirCell1_UL_BLOCK (_menhir_stack, _menhir_s) in
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | UL_IDENT _v ->
          let _menhir_stack = MenhirCell0_UL_IDENT (_menhir_stack, _v) in
          let _menhir_s = MenhirState51 in
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | UL_PAROUV ->
              _menhir_run_06 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | _ ->
              _eRR ())
      | _ ->
          _eRR ()
  
  and _menhir_run_57 : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> (ttv_stack, _menhir_box_modele) _menhir_state -> _ -> _menhir_box_modele =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      let _menhir_stack = MenhirCell1_model_aux (_menhir_stack, _menhir_s, _v) in
      match (_tok : MenhirBasics.token) with
      | UL_SYSTEM ->
          _menhir_run_04 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState57
      | UL_FLOW ->
          _menhir_run_32 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState57
      | UL_BLOCK ->
          _menhir_run_50 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState57
      | UL_ACCFER ->
          let _ = _menhir_action_25 () in
          _menhir_run_58 _menhir_stack _menhir_lexbuf _menhir_lexer
      | _ ->
          _eRR ()
  
  and _menhir_run_58 : type  ttv_stack. (ttv_stack, _menhir_box_modele) _menhir_cell1_model_aux -> _ -> _ -> _menhir_box_modele =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer ->
      let MenhirCell1_model_aux (_menhir_stack, _menhir_s, _) = _menhir_stack in
      let _ = _menhir_action_26 () in
      _menhir_goto_suite_systeme _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
  
  and _menhir_goto_suite_systeme : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_modele) _menhir_state -> _menhir_box_modele =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      match _menhir_s with
      | MenhirState57 ->
          _menhir_run_58 _menhir_stack _menhir_lexbuf _menhir_lexer
      | MenhirState31 ->
          _menhir_run_55 _menhir_stack _menhir_lexbuf _menhir_lexer
      | _ ->
          _menhir_fail ()
  
  and _menhir_run_55 : type  ttv_stack. ((ttv_stack, _menhir_box_modele) _menhir_cell1_UL_SYSTEM _menhir_cell0_UL_IDENT, _menhir_box_modele) _menhir_cell1_parametres -> _ -> _ -> _menhir_box_modele =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      let MenhirCell1_parametres (_menhir_stack, _, _) = _menhir_stack in
      let MenhirCell0_UL_IDENT (_menhir_stack, _) = _menhir_stack in
      let MenhirCell1_UL_SYSTEM (_menhir_stack, _menhir_s) = _menhir_stack in
      let _ = _menhir_action_27 () in
      let _v = _menhir_action_10 () in
      _menhir_goto_model_aux _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
  
  and _menhir_run_30 : type  ttv_stack. ((ttv_stack, _menhir_box_modele) _menhir_cell1_UL_SYSTEM _menhir_cell0_UL_IDENT as 'stack) -> _ -> _ -> _ -> ('stack, _menhir_box_modele) _menhir_state -> _ -> _menhir_box_modele =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      let _menhir_stack = MenhirCell1_parametres (_menhir_stack, _menhir_s, _v) in
      match (_tok : MenhirBasics.token) with
      | UL_ACCOUV ->
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | UL_SYSTEM ->
              _menhir_run_04 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState31
          | UL_FLOW ->
              _menhir_run_32 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState31
          | UL_BLOCK ->
              _menhir_run_50 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState31
          | UL_ACCFER ->
              let _ = _menhir_action_25 () in
              _menhir_run_55 _menhir_stack _menhir_lexbuf _menhir_lexer
          | _ ->
              _eRR ())
      | _ ->
          _eRR ()
  
  and _menhir_run_27 : type  ttv_stack. (ttv_stack, _menhir_box_modele) _menhir_cell1_port -> _ -> _ -> _menhir_box_modele =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer ->
      let MenhirCell1_port (_menhir_stack, _menhir_s, _) = _menhir_stack in
      let _ = _menhir_action_06 () in
      _menhir_goto_aux_parametres _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
  
  and _menhir_run_22 : type  ttv_stack. (ttv_stack, _menhir_box_modele) _menhir_cell1_IDENT -> _ -> _ -> _ -> _menhir_box_modele =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _tok ->
      let MenhirCell1_IDENT (_menhir_stack, _menhir_s, _) = _menhir_stack in
      let _v = _menhir_action_15 () in
      _menhir_goto_port _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
  
  and _menhir_run_19 : type  ttv_stack. (ttv_stack, _menhir_box_modele) _menhir_cell1_UL_FLOAT -> _ -> _ -> _ -> _menhir_box_modele =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _tok ->
      let MenhirCell1_UL_FLOAT (_menhir_stack, _menhir_s) = _menhir_stack in
      let _ = _menhir_action_29 () in
      _menhir_goto_typ _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
  
  and _menhir_run_17 : type  ttv_stack. (ttv_stack, _menhir_box_modele) _menhir_cell1_UL_INT -> _ -> _ -> _ -> _menhir_box_modele =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _tok ->
      let MenhirCell1_UL_INT (_menhir_stack, _menhir_s, _) = _menhir_stack in
      let _ = _menhir_action_28 () in
      _menhir_goto_typ _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
  
  and _menhir_run_14 : type  ttv_stack. (ttv_stack, _menhir_box_modele) _menhir_cell1_UL_INT -> _ -> _ -> _menhir_box_modele =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer ->
      let MenhirCell1_UL_INT (_menhir_stack, _menhir_s, _) = _menhir_stack in
      let _ = _menhir_action_04 () in
      _menhir_goto_aux_int _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
  
  and _menhir_run_18 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_modele) _menhir_state -> _menhir_box_modele =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _menhir_stack = MenhirCell1_UL_FLOAT (_menhir_stack, _menhir_s) in
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | UL_CROUV ->
          _menhir_run_11 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState18
      | UL_PARFER | UL_VIRG ->
          let _ = _menhir_action_18 () in
          _menhir_run_19 _menhir_stack _menhir_lexbuf _menhir_lexer _tok
      | _ ->
          _eRR ()
  
  and _menhir_run_20 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_modele) _menhir_state -> _menhir_box_modele =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _menhir_stack = MenhirCell1_UL_BOOL (_menhir_stack, _menhir_s) in
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | UL_CROUV ->
          _menhir_run_11 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState20
      | UL_PARFER | UL_VIRG ->
          let _ = _menhir_action_18 () in
          _menhir_run_21 _menhir_stack _menhir_lexbuf _menhir_lexer _tok
      | _ ->
          _eRR ()
  
  let _menhir_run_00 : type  ttv_stack. ttv_stack -> _ -> _ -> _menhir_box_modele =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | UL_MODEL ->
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | UL_IDENT _v ->
              let _menhir_stack = MenhirCell0_UL_IDENT (_menhir_stack, _v) in
              let _tok = _menhir_lexer _menhir_lexbuf in
              (match (_tok : MenhirBasics.token) with
              | UL_ACCOUV ->
                  let _tok = _menhir_lexer _menhir_lexbuf in
                  (match (_tok : MenhirBasics.token) with
                  | UL_SYSTEM ->
                      _menhir_run_04 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState03
                  | UL_FLOW ->
                      _menhir_run_32 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState03
                  | UL_BLOCK ->
                      _menhir_run_50 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState03
                  | UL_ACCFER ->
                      let _ = _menhir_action_23 () in
                      _menhir_run_61 _menhir_stack _menhir_lexbuf _menhir_lexer
                  | _ ->
                      _eRR ())
              | _ ->
                  _eRR ())
          | _ ->
              _eRR ())
      | _ ->
          _eRR ()
  
end

let modele =
  fun _menhir_lexer _menhir_lexbuf ->
    let _menhir_stack = () in
    let MenhirBox_modele v = _menhir_run_00 _menhir_stack _menhir_lexbuf _menhir_lexer in
    v

# 79 "Parser.mly"
  


# 1138 "Parser.ml"
