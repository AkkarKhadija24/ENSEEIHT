
module MenhirBasics = struct
  
  exception Error
  
  let _eRR =
    fun _s ->
      raise Error
  
  type token = 
    | UL_TO
    | UL_STATE
    | UL_STARTS
    | UL_REGION
    | UL_PT
    | UL_ON
    | UL_MACHINE
    | UL_IDENT of (
# 18 "Parser.mly"
       (string)
# 22 "Parser.ml"
  )
    | UL_FROM
    | UL_FIN
    | UL_EVENT
    | UL_ENDS
    | UL_ACCOUV
    | UL_ACCFER
  
end

include MenhirBasics

# 1 "Parser.mly"
  

(* Partie recopiee dans le fichier CaML genere. *)
(* Ouverture de modules exploites dans les actions *)
(* Declarations de types, de constantes, de fonctions, d'exceptions exploites dans les actions *)


# 43 "Parser.ml"

type ('s, 'r) _menhir_state = 
  | MenhirState03 : ('s _menhir_cell0_UL_IDENT, _menhir_box_machine) _menhir_state
    (** State 03.
        Stack shape : UL_IDENT.
        Start symbol: machine. *)

  | MenhirState06 : (('s, _menhir_box_machine) _menhir_cell1_UL_REGION _menhir_cell0_UL_IDENT, _menhir_box_machine) _menhir_state
    (** State 06.
        Stack shape : UL_REGION UL_IDENT.
        Start symbol: machine. *)

  | MenhirState13 : (('s, _menhir_box_machine) _menhir_cell1_UL_STATE _menhir_cell0_UL_IDENT _menhir_cell0_A _menhir_cell0_B, _menhir_box_machine) _menhir_state
    (** State 13.
        Stack shape : UL_STATE UL_IDENT A B.
        Start symbol: machine. *)

  | MenhirState16 : (('s, _menhir_box_machine) _menhir_cell1_region, _menhir_box_machine) _menhir_state
    (** State 16.
        Stack shape : region.
        Start symbol: machine. *)

  | MenhirState21 : (('s, _menhir_box_machine) _menhir_cell1_etat, _menhir_box_machine) _menhir_state
    (** State 21.
        Stack shape : etat.
        Start symbol: machine. *)

  | MenhirState23 : (('s, _menhir_box_machine) _menhir_cell1_UL_FROM, _menhir_box_machine) _menhir_state
    (** State 23.
        Stack shape : UL_FROM.
        Start symbol: machine. *)

  | MenhirState25 : (('s, _menhir_box_machine) _menhir_cell1_UL_IDENT, _menhir_box_machine) _menhir_state
    (** State 25.
        Stack shape : UL_IDENT.
        Start symbol: machine. *)

  | MenhirState28 : ((('s, _menhir_box_machine) _menhir_cell1_UL_FROM, _menhir_box_machine) _menhir_cell1_nomQualifie, _menhir_box_machine) _menhir_state
    (** State 28.
        Stack shape : UL_FROM nomQualifie.
        Start symbol: machine. *)

  | MenhirState33 : (('s, _menhir_box_machine) _menhir_cell1_UL_EVENT _menhir_cell0_UL_IDENT, _menhir_box_machine) _menhir_state
    (** State 33.
        Stack shape : UL_EVENT UL_IDENT.
        Start symbol: machine. *)

  | MenhirState34 : (('s, _menhir_box_machine) _menhir_cell1_transition, _menhir_box_machine) _menhir_state
    (** State 34.
        Stack shape : transition.
        Start symbol: machine. *)

  | MenhirState36 : (('s, _menhir_box_machine) _menhir_cell1_region, _menhir_box_machine) _menhir_state
    (** State 36.
        Stack shape : region.
        Start symbol: machine. *)


and 's _menhir_cell0_A = 
  | MenhirCell0_A of 's * (unit)

and 's _menhir_cell0_B = 
  | MenhirCell0_B of 's * (unit)

and ('s, 'r) _menhir_cell1_etat = 
  | MenhirCell1_etat of 's * ('s, 'r) _menhir_state * (unit)

and ('s, 'r) _menhir_cell1_nomQualifie = 
  | MenhirCell1_nomQualifie of 's * ('s, 'r) _menhir_state * (unit)

and ('s, 'r) _menhir_cell1_region = 
  | MenhirCell1_region of 's * ('s, 'r) _menhir_state * (unit)

and ('s, 'r) _menhir_cell1_transition = 
  | MenhirCell1_transition of 's * ('s, 'r) _menhir_state * (unit)

and ('s, 'r) _menhir_cell1_UL_EVENT = 
  | MenhirCell1_UL_EVENT of 's * ('s, 'r) _menhir_state

and ('s, 'r) _menhir_cell1_UL_FROM = 
  | MenhirCell1_UL_FROM of 's * ('s, 'r) _menhir_state

and ('s, 'r) _menhir_cell1_UL_IDENT = 
  | MenhirCell1_UL_IDENT of 's * ('s, 'r) _menhir_state * (
# 18 "Parser.mly"
       (string)
# 130 "Parser.ml"
)

and 's _menhir_cell0_UL_IDENT = 
  | MenhirCell0_UL_IDENT of 's * (
# 18 "Parser.mly"
       (string)
# 137 "Parser.ml"
)

and ('s, 'r) _menhir_cell1_UL_REGION = 
  | MenhirCell1_UL_REGION of 's * ('s, 'r) _menhir_state

and ('s, 'r) _menhir_cell1_UL_STATE = 
  | MenhirCell1_UL_STATE of 's * ('s, 'r) _menhir_state

and _menhir_box_machine = 
  | MenhirBox_machine of (unit) [@@unboxed]

let _menhir_action_01 =
  fun () ->
    (
# 51 "Parser.mly"
                         ((print_endline "A :vide"))
# 154 "Parser.ml"
     : (unit))

let _menhir_action_02 =
  fun () ->
    (
# 52 "Parser.mly"
                ((print_endline "A : starts"))
# 162 "Parser.ml"
     : (unit))

let _menhir_action_03 =
  fun () ->
    (
# 53 "Parser.mly"
                         ((print_endline "B :vide"))
# 170 "Parser.ml"
     : (unit))

let _menhir_action_04 =
  fun () ->
    (
# 54 "Parser.mly"
             ((print_endline "B : ends"))
# 178 "Parser.ml"
     : (unit))

let _menhir_action_05 =
  fun () ->
    (
# 55 "Parser.mly"
                         ((print_endline "C :vide"))
# 186 "Parser.ml"
     : (unit))

let _menhir_action_06 =
  fun () ->
    (
# 56 "Parser.mly"
                                     ((print_endline "c : region+"))
# 194 "Parser.ml"
     : (unit))

let _menhir_action_07 =
  fun () ->
    (
# 49 "Parser.mly"
                               ((print_endline "etat : state ident general"))
# 202 "Parser.ml"
     : (unit))

let _menhir_action_08 =
  fun () ->
    (
# 46 "Parser.mly"
                                ((print_endline "etat_aux :vide"))
# 210 "Parser.ml"
     : (unit))

let _menhir_action_09 =
  fun () ->
    (
# 47 "Parser.mly"
                        ((print_endline "etat_aux :etat+"))
# 218 "Parser.ml"
     : (unit))

let _menhir_action_10 =
  fun () ->
    (
# 32 "Parser.mly"
                                                                    ( (print_endline "machine : MACHINE IDENT { ... } FIN ") )
# 226 "Parser.ml"
     : (unit))

let _menhir_action_11 =
  fun () ->
    (
# 41 "Parser.mly"
                       ((print_endline "nomQualifie : ident"))
# 234 "Parser.ml"
     : (unit))

let _menhir_action_12 =
  fun () ->
    (
# 42 "Parser.mly"
                                         ((print_endline "nomQualifie :"))
# 242 "Parser.ml"
     : (unit))

let _menhir_action_13 =
  fun () ->
    (
# 44 "Parser.mly"
                                                         ((print_endline "region : region ident { etat+ }"))
# 250 "Parser.ml"
     : (unit))

let _menhir_action_14 =
  fun () ->
    (
# 58 "Parser.mly"
                                  ((print_endline "region_aux :vide"))
# 258 "Parser.ml"
     : (unit))

let _menhir_action_15 =
  fun () ->
    (
# 59 "Parser.mly"
                            ((print_endline "region_aux :region+"))
# 266 "Parser.ml"
     : (unit))

let _menhir_action_16 =
  fun () ->
    (
# 34 "Parser.mly"
                                 ((print_endline "suite_mach :vide "))
# 274 "Parser.ml"
     : (unit))

let _menhir_action_17 =
  fun () ->
    (
# 35 "Parser.mly"
                                           ((print_endline "suite_mach : EVENT IDENT "))
# 282 "Parser.ml"
     : (unit))

let _menhir_action_18 =
  fun () ->
    (
# 36 "Parser.mly"
                                    ((print_endline "suite_mach : transition"))
# 290 "Parser.ml"
     : (unit))

let _menhir_action_19 =
  fun () ->
    (
# 37 "Parser.mly"
                                ((print_endline "suite_mach : REGION"))
# 298 "Parser.ml"
     : (unit))

let _menhir_action_20 =
  fun () ->
    (
# 39 "Parser.mly"
                                                                  ((print_endline "transition : from nomQualifie to nomQualifie on iden"))
# 306 "Parser.ml"
     : (unit))

let _menhir_print_token : token -> string =
  fun _tok ->
    match _tok with
    | UL_ACCFER ->
        "UL_ACCFER"
    | UL_ACCOUV ->
        "UL_ACCOUV"
    | UL_ENDS ->
        "UL_ENDS"
    | UL_EVENT ->
        "UL_EVENT"
    | UL_FIN ->
        "UL_FIN"
    | UL_FROM ->
        "UL_FROM"
    | UL_IDENT _ ->
        "UL_IDENT"
    | UL_MACHINE ->
        "UL_MACHINE"
    | UL_ON ->
        "UL_ON"
    | UL_PT ->
        "UL_PT"
    | UL_REGION ->
        "UL_REGION"
    | UL_STARTS ->
        "UL_STARTS"
    | UL_STATE ->
        "UL_STATE"
    | UL_TO ->
        "UL_TO"

let _menhir_fail : unit -> 'a =
  fun () ->
    Printf.eprintf "Internal failure -- please contact the parser generator's developers.\n%!";
    assert false

include struct
  
  [@@@ocaml.warning "-4-37"]
  
  let _menhir_run_39 : type  ttv_stack. ttv_stack _menhir_cell0_UL_IDENT -> _ -> _ -> _menhir_box_machine =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | UL_FIN ->
          let MenhirCell0_UL_IDENT (_menhir_stack, _) = _menhir_stack in
          let _v = _menhir_action_10 () in
          MenhirBox_machine _v
      | _ ->
          _eRR ()
  
  let rec _menhir_run_38 : type  ttv_stack. (ttv_stack, _menhir_box_machine) _menhir_cell1_UL_EVENT _menhir_cell0_UL_IDENT -> _ -> _ -> _menhir_box_machine =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer ->
      let MenhirCell0_UL_IDENT (_menhir_stack, _) = _menhir_stack in
      let MenhirCell1_UL_EVENT (_menhir_stack, _menhir_s) = _menhir_stack in
      let _ = _menhir_action_17 () in
      _menhir_goto_suite_mach _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
  
  and _menhir_goto_suite_mach : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_machine) _menhir_state -> _menhir_box_machine =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      match _menhir_s with
      | MenhirState03 ->
          _menhir_run_39 _menhir_stack _menhir_lexbuf _menhir_lexer
      | MenhirState33 ->
          _menhir_run_38 _menhir_stack _menhir_lexbuf _menhir_lexer
      | MenhirState36 ->
          _menhir_run_37 _menhir_stack _menhir_lexbuf _menhir_lexer
      | MenhirState34 ->
          _menhir_run_35 _menhir_stack _menhir_lexbuf _menhir_lexer
      | _ ->
          _menhir_fail ()
  
  and _menhir_run_37 : type  ttv_stack. (ttv_stack, _menhir_box_machine) _menhir_cell1_region -> _ -> _ -> _menhir_box_machine =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer ->
      let MenhirCell1_region (_menhir_stack, _menhir_s, _) = _menhir_stack in
      let _ = _menhir_action_19 () in
      _menhir_goto_suite_mach _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
  
  and _menhir_run_35 : type  ttv_stack. (ttv_stack, _menhir_box_machine) _menhir_cell1_transition -> _ -> _ -> _menhir_box_machine =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer ->
      let MenhirCell1_transition (_menhir_stack, _menhir_s, _) = _menhir_stack in
      let _ = _menhir_action_18 () in
      _menhir_goto_suite_mach _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
  
  let rec _menhir_run_04 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_machine) _menhir_state -> _menhir_box_machine =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _menhir_stack = MenhirCell1_UL_REGION (_menhir_stack, _menhir_s) in
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | UL_IDENT _v ->
          let _menhir_stack = MenhirCell0_UL_IDENT (_menhir_stack, _v) in
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | UL_ACCOUV ->
              let _tok = _menhir_lexer _menhir_lexbuf in
              (match (_tok : MenhirBasics.token) with
              | UL_STATE ->
                  _menhir_run_07 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState06
              | UL_ACCFER ->
                  let _ = _menhir_action_08 () in
                  _menhir_run_19 _menhir_stack _menhir_lexbuf _menhir_lexer
              | _ ->
                  _eRR ())
          | _ ->
              _eRR ())
      | _ ->
          _eRR ()
  
  and _menhir_run_07 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_machine) _menhir_state -> _menhir_box_machine =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _menhir_stack = MenhirCell1_UL_STATE (_menhir_stack, _menhir_s) in
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | UL_IDENT _v ->
          let _menhir_stack = MenhirCell0_UL_IDENT (_menhir_stack, _v) in
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | UL_STARTS ->
              let _tok = _menhir_lexer _menhir_lexbuf in
              let _v = _menhir_action_02 () in
              _menhir_goto_A _menhir_stack _menhir_lexbuf _menhir_lexer _v _tok
          | UL_ACCFER | UL_ACCOUV | UL_ENDS | UL_STATE ->
              let _v = _menhir_action_01 () in
              _menhir_goto_A _menhir_stack _menhir_lexbuf _menhir_lexer _v _tok
          | _ ->
              _eRR ())
      | _ ->
          _eRR ()
  
  and _menhir_goto_A : type  ttv_stack. (ttv_stack, _menhir_box_machine) _menhir_cell1_UL_STATE _menhir_cell0_UL_IDENT -> _ -> _ -> _ -> _ -> _menhir_box_machine =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _tok ->
      let _menhir_stack = MenhirCell0_A (_menhir_stack, _v) in
      match (_tok : MenhirBasics.token) with
      | UL_ENDS ->
          let _tok = _menhir_lexer _menhir_lexbuf in
          let _v = _menhir_action_04 () in
          _menhir_goto_B _menhir_stack _menhir_lexbuf _menhir_lexer _v _tok
      | UL_ACCFER | UL_ACCOUV | UL_STATE ->
          let _v = _menhir_action_03 () in
          _menhir_goto_B _menhir_stack _menhir_lexbuf _menhir_lexer _v _tok
      | _ ->
          _eRR ()
  
  and _menhir_goto_B : type  ttv_stack. (ttv_stack, _menhir_box_machine) _menhir_cell1_UL_STATE _menhir_cell0_UL_IDENT _menhir_cell0_A -> _ -> _ -> _ -> _ -> _menhir_box_machine =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _tok ->
      let _menhir_stack = MenhirCell0_B (_menhir_stack, _v) in
      match (_tok : MenhirBasics.token) with
      | UL_ACCOUV ->
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | UL_REGION ->
              _menhir_run_04 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState13
          | UL_ACCFER ->
              let _ = _menhir_action_14 () in
              _menhir_run_14 _menhir_stack _menhir_lexbuf _menhir_lexer
          | _ ->
              _eRR ())
      | UL_ACCFER | UL_STATE ->
          let _ = _menhir_action_05 () in
          _menhir_goto_C _menhir_stack _menhir_lexbuf _menhir_lexer _tok
      | _ ->
          _eRR ()
  
  and _menhir_run_14 : type  ttv_stack. (ttv_stack, _menhir_box_machine) _menhir_cell1_UL_STATE _menhir_cell0_UL_IDENT _menhir_cell0_A _menhir_cell0_B -> _ -> _ -> _menhir_box_machine =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      let _ = _menhir_action_06 () in
      _menhir_goto_C _menhir_stack _menhir_lexbuf _menhir_lexer _tok
  
  and _menhir_goto_C : type  ttv_stack. (ttv_stack, _menhir_box_machine) _menhir_cell1_UL_STATE _menhir_cell0_UL_IDENT _menhir_cell0_A _menhir_cell0_B -> _ -> _ -> _ -> _menhir_box_machine =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _tok ->
      let MenhirCell0_B (_menhir_stack, _) = _menhir_stack in
      let MenhirCell0_A (_menhir_stack, _) = _menhir_stack in
      let MenhirCell0_UL_IDENT (_menhir_stack, _) = _menhir_stack in
      let MenhirCell1_UL_STATE (_menhir_stack, _menhir_s) = _menhir_stack in
      let _v = _menhir_action_07 () in
      let _menhir_stack = MenhirCell1_etat (_menhir_stack, _menhir_s, _v) in
      match (_tok : MenhirBasics.token) with
      | UL_STATE ->
          _menhir_run_07 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState21
      | UL_ACCFER ->
          let _ = _menhir_action_08 () in
          _menhir_run_22 _menhir_stack _menhir_lexbuf _menhir_lexer
      | _ ->
          _eRR ()
  
  and _menhir_run_22 : type  ttv_stack. (ttv_stack, _menhir_box_machine) _menhir_cell1_etat -> _ -> _ -> _menhir_box_machine =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer ->
      let MenhirCell1_etat (_menhir_stack, _menhir_s, _) = _menhir_stack in
      let _ = _menhir_action_09 () in
      _menhir_goto_etat_aux _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
  
  and _menhir_goto_etat_aux : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_machine) _menhir_state -> _menhir_box_machine =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      match _menhir_s with
      | MenhirState21 ->
          _menhir_run_22 _menhir_stack _menhir_lexbuf _menhir_lexer
      | MenhirState06 ->
          _menhir_run_19 _menhir_stack _menhir_lexbuf _menhir_lexer
      | _ ->
          _menhir_fail ()
  
  and _menhir_run_19 : type  ttv_stack. (ttv_stack, _menhir_box_machine) _menhir_cell1_UL_REGION _menhir_cell0_UL_IDENT -> _ -> _ -> _menhir_box_machine =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      let MenhirCell0_UL_IDENT (_menhir_stack, _) = _menhir_stack in
      let MenhirCell1_UL_REGION (_menhir_stack, _menhir_s) = _menhir_stack in
      let _v = _menhir_action_13 () in
      _menhir_goto_region _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
  
  and _menhir_goto_region : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> (ttv_stack, _menhir_box_machine) _menhir_state -> _ -> _menhir_box_machine =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      match _menhir_s with
      | MenhirState03 ->
          _menhir_run_36 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | MenhirState33 ->
          _menhir_run_36 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | MenhirState36 ->
          _menhir_run_36 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | MenhirState34 ->
          _menhir_run_36 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | MenhirState16 ->
          _menhir_run_16 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | MenhirState13 ->
          _menhir_run_16 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | _ ->
          _menhir_fail ()
  
  and _menhir_run_36 : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> (ttv_stack, _menhir_box_machine) _menhir_state -> _ -> _menhir_box_machine =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      let _menhir_stack = MenhirCell1_region (_menhir_stack, _menhir_s, _v) in
      match (_tok : MenhirBasics.token) with
      | UL_REGION ->
          _menhir_run_04 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState36
      | UL_FROM ->
          _menhir_run_23 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState36
      | UL_EVENT ->
          _menhir_run_32 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState36
      | UL_ACCFER ->
          let _ = _menhir_action_16 () in
          _menhir_run_37 _menhir_stack _menhir_lexbuf _menhir_lexer
      | _ ->
          _eRR ()
  
  and _menhir_run_23 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_machine) _menhir_state -> _menhir_box_machine =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _menhir_stack = MenhirCell1_UL_FROM (_menhir_stack, _menhir_s) in
      let _menhir_s = MenhirState23 in
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | UL_IDENT _v ->
          _menhir_run_24 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s
      | _ ->
          _eRR ()
  
  and _menhir_run_24 : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> (ttv_stack, _menhir_box_machine) _menhir_state -> _menhir_box_machine =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | UL_PT ->
          let _menhir_stack = MenhirCell1_UL_IDENT (_menhir_stack, _menhir_s, _v) in
          let _menhir_s = MenhirState25 in
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | UL_IDENT _v ->
              _menhir_run_24 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s
          | _ ->
              _eRR ())
      | UL_ON | UL_TO ->
          let _v = _menhir_action_11 () in
          _menhir_goto_nomQualifie _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | _ ->
          _eRR ()
  
  and _menhir_goto_nomQualifie : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> (ttv_stack, _menhir_box_machine) _menhir_state -> _ -> _menhir_box_machine =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      match _menhir_s with
      | MenhirState28 ->
          _menhir_run_29 _menhir_stack _menhir_lexbuf _menhir_lexer _tok
      | MenhirState23 ->
          _menhir_run_27 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | MenhirState25 ->
          _menhir_run_26 _menhir_stack _menhir_lexbuf _menhir_lexer _tok
      | _ ->
          _menhir_fail ()
  
  and _menhir_run_29 : type  ttv_stack. ((ttv_stack, _menhir_box_machine) _menhir_cell1_UL_FROM, _menhir_box_machine) _menhir_cell1_nomQualifie -> _ -> _ -> _ -> _menhir_box_machine =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _tok ->
      match (_tok : MenhirBasics.token) with
      | UL_ON ->
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | UL_IDENT _ ->
              let _tok = _menhir_lexer _menhir_lexbuf in
              let MenhirCell1_nomQualifie (_menhir_stack, _, _) = _menhir_stack in
              let MenhirCell1_UL_FROM (_menhir_stack, _menhir_s) = _menhir_stack in
              let _v = _menhir_action_20 () in
              let _menhir_stack = MenhirCell1_transition (_menhir_stack, _menhir_s, _v) in
              (match (_tok : MenhirBasics.token) with
              | UL_REGION ->
                  _menhir_run_04 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState34
              | UL_FROM ->
                  _menhir_run_23 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState34
              | UL_EVENT ->
                  _menhir_run_32 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState34
              | UL_ACCFER ->
                  let _ = _menhir_action_16 () in
                  _menhir_run_35 _menhir_stack _menhir_lexbuf _menhir_lexer
              | _ ->
                  _eRR ())
          | _ ->
              _eRR ())
      | _ ->
          _eRR ()
  
  and _menhir_run_32 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_machine) _menhir_state -> _menhir_box_machine =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _menhir_stack = MenhirCell1_UL_EVENT (_menhir_stack, _menhir_s) in
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | UL_IDENT _v ->
          let _menhir_stack = MenhirCell0_UL_IDENT (_menhir_stack, _v) in
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | UL_REGION ->
              _menhir_run_04 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState33
          | UL_FROM ->
              _menhir_run_23 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState33
          | UL_EVENT ->
              _menhir_run_32 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState33
          | UL_ACCFER ->
              let _ = _menhir_action_16 () in
              _menhir_run_38 _menhir_stack _menhir_lexbuf _menhir_lexer
          | _ ->
              _eRR ())
      | _ ->
          _eRR ()
  
  and _menhir_run_27 : type  ttv_stack. ((ttv_stack, _menhir_box_machine) _menhir_cell1_UL_FROM as 'stack) -> _ -> _ -> _ -> ('stack, _menhir_box_machine) _menhir_state -> _ -> _menhir_box_machine =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      let _menhir_stack = MenhirCell1_nomQualifie (_menhir_stack, _menhir_s, _v) in
      match (_tok : MenhirBasics.token) with
      | UL_TO ->
          let _menhir_s = MenhirState28 in
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | UL_IDENT _v ->
              _menhir_run_24 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s
          | _ ->
              _eRR ())
      | _ ->
          _eRR ()
  
  and _menhir_run_26 : type  ttv_stack. (ttv_stack, _menhir_box_machine) _menhir_cell1_UL_IDENT -> _ -> _ -> _ -> _menhir_box_machine =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _tok ->
      let MenhirCell1_UL_IDENT (_menhir_stack, _menhir_s, _) = _menhir_stack in
      let _v = _menhir_action_12 () in
      _menhir_goto_nomQualifie _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
  
  and _menhir_run_16 : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> (ttv_stack, _menhir_box_machine) _menhir_state -> _ -> _menhir_box_machine =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      let _menhir_stack = MenhirCell1_region (_menhir_stack, _menhir_s, _v) in
      match (_tok : MenhirBasics.token) with
      | UL_REGION ->
          _menhir_run_04 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState16
      | UL_ACCFER ->
          let _ = _menhir_action_14 () in
          _menhir_run_17 _menhir_stack _menhir_lexbuf _menhir_lexer
      | _ ->
          _eRR ()
  
  and _menhir_run_17 : type  ttv_stack. (ttv_stack, _menhir_box_machine) _menhir_cell1_region -> _ -> _ -> _menhir_box_machine =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer ->
      let MenhirCell1_region (_menhir_stack, _menhir_s, _) = _menhir_stack in
      let _ = _menhir_action_15 () in
      _menhir_goto_region_aux _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
  
  and _menhir_goto_region_aux : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_machine) _menhir_state -> _menhir_box_machine =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      match _menhir_s with
      | MenhirState16 ->
          _menhir_run_17 _menhir_stack _menhir_lexbuf _menhir_lexer
      | MenhirState13 ->
          _menhir_run_14 _menhir_stack _menhir_lexbuf _menhir_lexer
      | _ ->
          _menhir_fail ()
  
  let _menhir_run_00 : type  ttv_stack. ttv_stack -> _ -> _ -> _menhir_box_machine =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | UL_MACHINE ->
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | UL_IDENT _v ->
              let _menhir_stack = MenhirCell0_UL_IDENT (_menhir_stack, _v) in
              let _tok = _menhir_lexer _menhir_lexbuf in
              (match (_tok : MenhirBasics.token) with
              | UL_ACCOUV ->
                  let _tok = _menhir_lexer _menhir_lexbuf in
                  (match (_tok : MenhirBasics.token) with
                  | UL_REGION ->
                      _menhir_run_04 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState03
                  | UL_FROM ->
                      _menhir_run_23 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState03
                  | UL_EVENT ->
                      _menhir_run_32 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState03
                  | UL_ACCFER ->
                      let _ = _menhir_action_16 () in
                      _menhir_run_39 _menhir_stack _menhir_lexbuf _menhir_lexer
                  | _ ->
                      _eRR ())
              | _ ->
                  _eRR ())
          | _ ->
              _eRR ())
      | _ ->
          _eRR ()
  
end

let machine =
  fun _menhir_lexer _menhir_lexbuf ->
    let _menhir_stack = () in
    let MenhirBox_machine v = _menhir_run_00 _menhir_stack _menhir_lexbuf _menhir_lexer in
    v

# 60 "Parser.mly"
  

# 740 "Parser.ml"
