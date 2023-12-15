
module MenhirBasics = struct
  
  exception Error
  
  let _eRR =
    fun _s ->
      raise Error
  
  type token = 
    | UL_VRAI
    | UL_VIRG
    | UL_VIDE
    | UL_NOMBRE of (
# 19 "Parser.mly"
       (int)
# 18 "Parser.ml"
  )
    | UL_FIN
    | UL_FAUX
    | UL_DBLPT
    | UL_CROOUV
    | UL_CROFER
    | UL_CHAINE of (
# 18 "Parser.mly"
       (string)
# 28 "Parser.ml"
  )
    | UL_ACCOUV
    | UL_ACCFER
  
end

include MenhirBasics

# 1 "Parser.mly"
  

(* Partie recopiee dans le fichier CaML genere. *)
(* Ouverture de modules exploites dans les actions *)
(* Declarations de types, de constantes, de fonctions, d'exceptions exploites dans les actions *)


# 45 "Parser.ml"

type ('s, 'r) _menhir_state = 
  | MenhirState01 : ('s, _menhir_box_document) _menhir_state
    (** State 01.
        Stack shape : .
        Start symbol: document. *)

  | MenhirState03 : (('s, _menhir_box_document) _menhir_cell1_UL_CHAINE, _menhir_box_document) _menhir_state
    (** State 03.
        Stack shape : UL_CHAINE.
        Start symbol: document. *)

  | MenhirState08 : (('s, _menhir_box_document) _menhir_cell1_UL_CROOUV, _menhir_box_document) _menhir_state
    (** State 08.
        Stack shape : UL_CROOUV.
        Start symbol: document. *)

  | MenhirState09 : (('s, _menhir_box_document) _menhir_cell1_UL_VIRG, _menhir_box_document) _menhir_state
    (** State 09.
        Stack shape : UL_VIRG.
        Start symbol: document. *)

  | MenhirState11 : (('s, _menhir_box_document) _menhir_cell1_UL_ACCOUV, _menhir_box_document) _menhir_state
    (** State 11.
        Stack shape : UL_ACCOUV.
        Start symbol: document. *)

  | MenhirState15 : (('s, _menhir_box_document) _menhir_cell1_attribut, _menhir_box_document) _menhir_state
    (** State 15.
        Stack shape : attribut.
        Start symbol: document. *)

  | MenhirState17 : ((('s, _menhir_box_document) _menhir_cell1_UL_VIRG, _menhir_box_document) _menhir_cell1_valeur, _menhir_box_document) _menhir_state
    (** State 17.
        Stack shape : UL_VIRG valeur.
        Start symbol: document. *)

  | MenhirState20 : ((('s, _menhir_box_document) _menhir_cell1_UL_CROOUV, _menhir_box_document) _menhir_cell1_valeur, _menhir_box_document) _menhir_state
    (** State 20.
        Stack shape : UL_CROOUV valeur.
        Start symbol: document. *)


and ('s, 'r) _menhir_cell1_attribut = 
  | MenhirCell1_attribut of 's * ('s, 'r) _menhir_state * (unit)

and ('s, 'r) _menhir_cell1_valeur = 
  | MenhirCell1_valeur of 's * ('s, 'r) _menhir_state * (unit)

and ('s, 'r) _menhir_cell1_UL_ACCOUV = 
  | MenhirCell1_UL_ACCOUV of 's * ('s, 'r) _menhir_state

and ('s, 'r) _menhir_cell1_UL_CHAINE = 
  | MenhirCell1_UL_CHAINE of 's * ('s, 'r) _menhir_state * (
# 18 "Parser.mly"
       (string)
# 102 "Parser.ml"
)

and ('s, 'r) _menhir_cell1_UL_CROOUV = 
  | MenhirCell1_UL_CROOUV of 's * ('s, 'r) _menhir_state

and ('s, 'r) _menhir_cell1_UL_VIRG = 
  | MenhirCell1_UL_VIRG of 's * ('s, 'r) _menhir_state

and _menhir_box_document = 
  | MenhirBox_document of (unit) [@@unboxed]

let _menhir_action_01 =
  fun () ->
    (
# 39 "Parser.mly"
                                     ( (print_endline "A :UL_CHAINE UL_DBLPT valeur") )
# 119 "Parser.ml"
     : (unit))

let _menhir_action_02 =
  fun () ->
    (
# 34 "Parser.mly"
                                                         ( (print_endline "D : { ... } ") )
# 127 "Parser.ml"
     : (unit))

let _menhir_action_03 =
  fun () ->
    (
# 36 "Parser.mly"
                                                        ( (print_endline "LA : /* Lambda, mot vide */") )
# 135 "Parser.ml"
     : (unit))

let _menhir_action_04 =
  fun () ->
    (
# 37 "Parser.mly"
                                                        ( (print_endline "LA : attribut ") )
# 143 "Parser.ml"
     : (unit))

let _menhir_action_05 =
  fun () ->
    (
# 38 "Parser.mly"
                                                        ( (print_endline "LA : attribut ,")  )
# 151 "Parser.ml"
     : (unit))

let _menhir_action_06 =
  fun () ->
    (
# 52 "Parser.mly"
                                      ( (print_endline "LV : [...]") )
# 159 "Parser.ml"
     : (unit))

let _menhir_action_07 =
  fun () ->
    (
# 53 "Parser.mly"
                                              ( (print_endline "LV : , V LV") )
# 167 "Parser.ml"
     : (unit))

let _menhir_action_08 =
  fun () ->
    (
# 49 "Parser.mly"
                                           ( (print_endline "T : [ LV ] ") )
# 175 "Parser.ml"
     : (unit))

let _menhir_action_09 =
  fun () ->
    (
# 50 "Parser.mly"
                                                  ( (print_endline "T : [ V LV ] ") )
# 183 "Parser.ml"
     : (unit))

let _menhir_action_10 =
  fun () ->
    (
# 41 "Parser.mly"
                   ((print_endline " V: CHAINE");)
# 191 "Parser.ml"
     : (unit))

let _menhir_action_11 =
  fun () ->
    (
# 42 "Parser.mly"
                    ((print_endline " V: NOMBRE");)
# 199 "Parser.ml"
     : (unit))

let _menhir_action_12 =
  fun () ->
    (
# 43 "Parser.mly"
                  ((print_endline " V: VRAI");)
# 207 "Parser.ml"
     : (unit))

let _menhir_action_13 =
  fun () ->
    (
# 44 "Parser.mly"
                  ((print_endline " V: FAUX");)
# 215 "Parser.ml"
     : (unit))

let _menhir_action_14 =
  fun () ->
    (
# 45 "Parser.mly"
                  ((print_endline " V: VIDE");)
# 223 "Parser.ml"
     : (unit))

let _menhir_action_15 =
  fun () ->
    (
# 46 "Parser.mly"
                                               ((print_endline " V: document");)
# 231 "Parser.ml"
     : (unit))

let _menhir_action_16 =
  fun () ->
    (
# 47 "Parser.mly"
                  ((print_endline " V: tableau");)
# 239 "Parser.ml"
     : (unit))

let _menhir_print_token : token -> string =
  fun _tok ->
    match _tok with
    | UL_ACCFER ->
        "UL_ACCFER"
    | UL_ACCOUV ->
        "UL_ACCOUV"
    | UL_CHAINE _ ->
        "UL_CHAINE"
    | UL_CROFER ->
        "UL_CROFER"
    | UL_CROOUV ->
        "UL_CROOUV"
    | UL_DBLPT ->
        "UL_DBLPT"
    | UL_FAUX ->
        "UL_FAUX"
    | UL_FIN ->
        "UL_FIN"
    | UL_NOMBRE _ ->
        "UL_NOMBRE"
    | UL_VIDE ->
        "UL_VIDE"
    | UL_VIRG ->
        "UL_VIRG"
    | UL_VRAI ->
        "UL_VRAI"

let _menhir_fail : unit -> 'a =
  fun () ->
    Printf.eprintf "Internal failure -- please contact the parser generator's developers.\n%!";
    assert false

include struct
  
  [@@@ocaml.warning "-4-37"]
  
  let _menhir_run_26 : type  ttv_stack. ttv_stack -> _ -> _ -> _menhir_box_document =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | UL_FIN ->
          let _v = _menhir_action_02 () in
          MenhirBox_document _v
      | _ ->
          _eRR ()
  
  let rec _menhir_run_02 : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> (ttv_stack, _menhir_box_document) _menhir_state -> _menhir_box_document =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s ->
      let _menhir_stack = MenhirCell1_UL_CHAINE (_menhir_stack, _menhir_s, _v) in
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | UL_DBLPT ->
          let _menhir_s = MenhirState03 in
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | UL_VRAI ->
              _menhir_run_04 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | UL_VIDE ->
              _menhir_run_05 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | UL_NOMBRE _ ->
              _menhir_run_06 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | UL_FAUX ->
              _menhir_run_07 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | UL_CROOUV ->
              _menhir_run_08 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | UL_CHAINE _ ->
              _menhir_run_10 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | UL_ACCOUV ->
              _menhir_run_11 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | _ ->
              _eRR ())
      | _ ->
          _eRR ()
  
  and _menhir_run_04 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_document) _menhir_state -> _menhir_box_document =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      let _v = _menhir_action_12 () in
      _menhir_goto_valeur _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
  
  and _menhir_goto_valeur : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> (ttv_stack, _menhir_box_document) _menhir_state -> _ -> _menhir_box_document =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      match _menhir_s with
      | MenhirState03 ->
          _menhir_run_25 _menhir_stack _menhir_lexbuf _menhir_lexer _tok
      | MenhirState08 ->
          _menhir_run_20 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | MenhirState09 ->
          _menhir_run_17 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | _ ->
          _menhir_fail ()
  
  and _menhir_run_25 : type  ttv_stack. (ttv_stack, _menhir_box_document) _menhir_cell1_UL_CHAINE -> _ -> _ -> _ -> _menhir_box_document =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _tok ->
      let MenhirCell1_UL_CHAINE (_menhir_stack, _menhir_s, _) = _menhir_stack in
      let _v = _menhir_action_01 () in
      match (_tok : MenhirBasics.token) with
      | UL_VIRG ->
          let _menhir_stack = MenhirCell1_attribut (_menhir_stack, _menhir_s, _v) in
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | UL_CHAINE _v_0 ->
              _menhir_run_02 _menhir_stack _menhir_lexbuf _menhir_lexer _v_0 MenhirState15
          | UL_ACCFER ->
              let _ = _menhir_action_03 () in
              _menhir_run_16 _menhir_stack _menhir_lexbuf _menhir_lexer
          | _ ->
              _eRR ())
      | UL_ACCFER ->
          let _ = _menhir_action_04 () in
          _menhir_goto_liste_attributs _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | _ ->
          _eRR ()
  
  and _menhir_run_16 : type  ttv_stack. (ttv_stack, _menhir_box_document) _menhir_cell1_attribut -> _ -> _ -> _menhir_box_document =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer ->
      let MenhirCell1_attribut (_menhir_stack, _menhir_s, _) = _menhir_stack in
      let _ = _menhir_action_05 () in
      _menhir_goto_liste_attributs _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
  
  and _menhir_goto_liste_attributs : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_document) _menhir_state -> _menhir_box_document =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      match _menhir_s with
      | MenhirState01 ->
          _menhir_run_26 _menhir_stack _menhir_lexbuf _menhir_lexer
      | MenhirState15 ->
          _menhir_run_16 _menhir_stack _menhir_lexbuf _menhir_lexer
      | MenhirState11 ->
          _menhir_run_12 _menhir_stack _menhir_lexbuf _menhir_lexer
      | _ ->
          _menhir_fail ()
  
  and _menhir_run_12 : type  ttv_stack. (ttv_stack, _menhir_box_document) _menhir_cell1_UL_ACCOUV -> _ -> _ -> _menhir_box_document =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      let MenhirCell1_UL_ACCOUV (_menhir_stack, _menhir_s) = _menhir_stack in
      let _v = _menhir_action_15 () in
      _menhir_goto_valeur _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
  
  and _menhir_run_20 : type  ttv_stack. ((ttv_stack, _menhir_box_document) _menhir_cell1_UL_CROOUV as 'stack) -> _ -> _ -> _ -> ('stack, _menhir_box_document) _menhir_state -> _ -> _menhir_box_document =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      let _menhir_stack = MenhirCell1_valeur (_menhir_stack, _menhir_s, _v) in
      match (_tok : MenhirBasics.token) with
      | UL_VIRG ->
          _menhir_run_09 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState20
      | UL_CROFER ->
          let _ = _menhir_action_06 () in
          _menhir_run_21 _menhir_stack _menhir_lexbuf _menhir_lexer
      | _ ->
          _eRR ()
  
  and _menhir_run_09 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_document) _menhir_state -> _menhir_box_document =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _menhir_stack = MenhirCell1_UL_VIRG (_menhir_stack, _menhir_s) in
      let _menhir_s = MenhirState09 in
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | UL_VRAI ->
          _menhir_run_04 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | UL_VIDE ->
          _menhir_run_05 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | UL_NOMBRE _ ->
          _menhir_run_06 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | UL_FAUX ->
          _menhir_run_07 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | UL_CROOUV ->
          _menhir_run_08 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | UL_CHAINE _ ->
          _menhir_run_10 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | UL_ACCOUV ->
          _menhir_run_11 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | _ ->
          _eRR ()
  
  and _menhir_run_05 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_document) _menhir_state -> _menhir_box_document =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      let _v = _menhir_action_14 () in
      _menhir_goto_valeur _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
  
  and _menhir_run_06 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_document) _menhir_state -> _menhir_box_document =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      let _v = _menhir_action_11 () in
      _menhir_goto_valeur _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
  
  and _menhir_run_07 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_document) _menhir_state -> _menhir_box_document =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      let _v = _menhir_action_13 () in
      _menhir_goto_valeur _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
  
  and _menhir_run_08 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_document) _menhir_state -> _menhir_box_document =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _menhir_stack = MenhirCell1_UL_CROOUV (_menhir_stack, _menhir_s) in
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | UL_VRAI ->
          _menhir_run_04 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState08
      | UL_VIRG ->
          _menhir_run_09 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState08
      | UL_VIDE ->
          _menhir_run_05 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState08
      | UL_NOMBRE _ ->
          _menhir_run_06 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState08
      | UL_FAUX ->
          _menhir_run_07 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState08
      | UL_CROOUV ->
          _menhir_run_08 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState08
      | UL_CHAINE _ ->
          _menhir_run_10 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState08
      | UL_ACCOUV ->
          _menhir_run_11 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState08
      | UL_CROFER ->
          let _ = _menhir_action_06 () in
          _menhir_run_23 _menhir_stack _menhir_lexbuf _menhir_lexer
      | _ ->
          _eRR ()
  
  and _menhir_run_10 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_document) _menhir_state -> _menhir_box_document =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      let _v = _menhir_action_10 () in
      _menhir_goto_valeur _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
  
  and _menhir_run_11 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_document) _menhir_state -> _menhir_box_document =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _menhir_stack = MenhirCell1_UL_ACCOUV (_menhir_stack, _menhir_s) in
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | UL_CHAINE _v ->
          _menhir_run_02 _menhir_stack _menhir_lexbuf _menhir_lexer _v MenhirState11
      | UL_ACCFER ->
          let _ = _menhir_action_03 () in
          _menhir_run_12 _menhir_stack _menhir_lexbuf _menhir_lexer
      | _ ->
          _eRR ()
  
  and _menhir_run_23 : type  ttv_stack. (ttv_stack, _menhir_box_document) _menhir_cell1_UL_CROOUV -> _ -> _ -> _menhir_box_document =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      let MenhirCell1_UL_CROOUV (_menhir_stack, _menhir_s) = _menhir_stack in
      let _ = _menhir_action_08 () in
      _menhir_goto_tableau _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
  
  and _menhir_goto_tableau : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_document) _menhir_state -> _ -> _menhir_box_document =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok ->
      let _v = _menhir_action_16 () in
      _menhir_goto_valeur _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
  
  and _menhir_run_21 : type  ttv_stack. ((ttv_stack, _menhir_box_document) _menhir_cell1_UL_CROOUV, _menhir_box_document) _menhir_cell1_valeur -> _ -> _ -> _menhir_box_document =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      let MenhirCell1_valeur (_menhir_stack, _, _) = _menhir_stack in
      let MenhirCell1_UL_CROOUV (_menhir_stack, _menhir_s) = _menhir_stack in
      let _ = _menhir_action_09 () in
      _menhir_goto_tableau _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
  
  and _menhir_run_17 : type  ttv_stack. ((ttv_stack, _menhir_box_document) _menhir_cell1_UL_VIRG as 'stack) -> _ -> _ -> _ -> ('stack, _menhir_box_document) _menhir_state -> _ -> _menhir_box_document =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      let _menhir_stack = MenhirCell1_valeur (_menhir_stack, _menhir_s, _v) in
      match (_tok : MenhirBasics.token) with
      | UL_VIRG ->
          _menhir_run_09 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState17
      | UL_CROFER ->
          let _ = _menhir_action_06 () in
          _menhir_run_18 _menhir_stack _menhir_lexbuf _menhir_lexer
      | _ ->
          _eRR ()
  
  and _menhir_run_18 : type  ttv_stack. ((ttv_stack, _menhir_box_document) _menhir_cell1_UL_VIRG, _menhir_box_document) _menhir_cell1_valeur -> _ -> _ -> _menhir_box_document =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer ->
      let MenhirCell1_valeur (_menhir_stack, _, _) = _menhir_stack in
      let MenhirCell1_UL_VIRG (_menhir_stack, _menhir_s) = _menhir_stack in
      let _ = _menhir_action_07 () in
      _menhir_goto_liste_valeur _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
  
  and _menhir_goto_liste_valeur : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_document) _menhir_state -> _menhir_box_document =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      match _menhir_s with
      | MenhirState08 ->
          _menhir_run_23 _menhir_stack _menhir_lexbuf _menhir_lexer
      | MenhirState20 ->
          _menhir_run_21 _menhir_stack _menhir_lexbuf _menhir_lexer
      | MenhirState17 ->
          _menhir_run_18 _menhir_stack _menhir_lexbuf _menhir_lexer
      | _ ->
          _menhir_fail ()
  
  let _menhir_run_00 : type  ttv_stack. ttv_stack -> _ -> _ -> _menhir_box_document =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | UL_ACCOUV ->
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | UL_CHAINE _v ->
              _menhir_run_02 _menhir_stack _menhir_lexbuf _menhir_lexer _v MenhirState01
          | UL_ACCFER ->
              let _ = _menhir_action_03 () in
              _menhir_run_26 _menhir_stack _menhir_lexbuf _menhir_lexer
          | _ ->
              _eRR ())
      | _ ->
          _eRR ()
  
end

let document =
  fun _menhir_lexer _menhir_lexbuf ->
    let _menhir_stack = () in
    let MenhirBox_document v = _menhir_run_00 _menhir_stack _menhir_lexbuf _menhir_lexer in
    v

# 56 "Parser.mly"
  

# 560 "Parser.ml"
