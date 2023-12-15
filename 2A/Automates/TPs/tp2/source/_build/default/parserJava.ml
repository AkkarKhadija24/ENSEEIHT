
module MenhirBasics = struct
  
  exception Error
  
  let _eRR =
    fun _s ->
      raise Error
  
  type token = 
    | VOID
    | VIRG
    | VIDE
    | TYPEIDENT of (
# 16 "parserJava.mly"
       (string)
# 18 "parserJava.ml"
  )
    | TANTQUE
    | STRING
    | SINON
    | SI
    | RETOUR
    | PTVIRG
    | PAROUV
    | PARFER
    | OPSUPEG
    | OPSUP
    | OPPT
    | OPPLUS
    | OPOU
    | OPNONEG
    | OPNON
    | OPMULT
    | OPMOINS
    | OPMOD
    | OPINFEG
    | OPINF
    | OPET
    | OPEG
    | OPDIV
    | NOUVEAU
    | INT
    | IMPORT
    | IDENT of (
# 16 "parserJava.mly"
       (string)
# 49 "parserJava.ml"
  )
    | FLOTTANT of (
# 23 "parserJava.mly"
       (float)
# 54 "parserJava.ml"
  )
    | FLOAT
    | FIN
    | ENTIER of (
# 22 "parserJava.mly"
       (int)
# 61 "parserJava.ml"
  )
    | CROOUV
    | CROFER
    | CHAR
    | CHAINE of (
# 26 "parserJava.mly"
       (string)
# 69 "parserJava.ml"
  )
    | CARACTERE of (
# 25 "parserJava.mly"
       (char)
# 74 "parserJava.ml"
  )
    | BOOLEEN of (
# 24 "parserJava.mly"
       (bool)
# 79 "parserJava.ml"
  )
    | BOOL
    | ASSIGN
    | ACCOUV
    | ACCFER
  
end

include MenhirBasics

# 1 "parserJava.mly"
  

(* Partie recopiee dans le fichier CaML genere. *)
(* Ouverture de modules exploites dans les actions *)
(* Declarations de types, de constantes, de fonctions, d'exceptions exploites dans les actions *)

(* let nbrVariables = ref 0;; *)

let nbrFonctions = ref 0;;


# 102 "parserJava.ml"

type ('s, 'r) _menhir_state = 
  | MenhirState000 : ('s, _menhir_box_fichier) _menhir_state
    (** State 000.
        Stack shape : .
        Start symbol: fichier. *)

  | MenhirState003 : (('s, _menhir_box_fichier) _menhir_cell1_VOID _menhir_cell0_IDENT, _menhir_box_fichier) _menhir_state
    (** State 003.
        Stack shape : VOID IDENT.
        Start symbol: fichier. *)

  | MenhirState011 : (('s _menhir_cell0_IDENT, _menhir_box_fichier) _menhir_cell1_typeStruct _menhir_cell0_IDENT, _menhir_box_fichier) _menhir_state
    (** State 011.
        Stack shape : IDENT typeStruct IDENT.
        Start symbol: fichier. *)

  | MenhirState012 : ((('s, _menhir_box_fichier) _menhir_cell1_typeStruct _menhir_cell0_IDENT, _menhir_box_fichier) _menhir_cell1_VIRG, _menhir_box_fichier) _menhir_state
    (** State 012.
        Stack shape : typeStruct IDENT VIRG.
        Start symbol: fichier. *)

  | MenhirState014 : (((('s, _menhir_box_fichier) _menhir_cell1_typeStruct _menhir_cell0_IDENT, _menhir_box_fichier) _menhir_cell1_VIRG, _menhir_box_fichier) _menhir_cell1_typeStruct _menhir_cell0_IDENT, _menhir_box_fichier) _menhir_state
    (** State 014.
        Stack shape : typeStruct IDENT VIRG typeStruct IDENT.
        Start symbol: fichier. *)

  | MenhirState023 : (('s, _menhir_box_fichier) _menhir_cell1_IMPORT, _menhir_box_fichier) _menhir_state
    (** State 023.
        Stack shape : IMPORT.
        Start symbol: fichier. *)

  | MenhirState027 : (('s, _menhir_box_fichier) _menhir_cell1_typeStruct _menhir_cell0_IDENT, _menhir_box_fichier) _menhir_state
    (** State 027.
        Stack shape : typeStruct IDENT.
        Start symbol: fichier. *)

  | MenhirState032 : (('s, _menhir_box_fichier) _menhir_cell1_imports, _menhir_box_fichier) _menhir_state
    (** State 032.
        Stack shape : imports.
        Start symbol: fichier. *)

  | MenhirState035 : (('s, _menhir_box_fichier) _menhir_cell1_fonction, _menhir_box_fichier) _menhir_state
    (** State 035.
        Stack shape : fonction.
        Start symbol: fichier. *)

  | MenhirState037 : (('s, _menhir_box_fichier) _menhir_cell1_entete, _menhir_box_fichier) _menhir_state
    (** State 037.
        Stack shape : entete.
        Start symbol: fichier. *)

  | MenhirState038 : (('s, _menhir_box_fichier) _menhir_cell1_ACCOUV, _menhir_box_fichier) _menhir_state
    (** State 038.
        Stack shape : ACCOUV.
        Start symbol: fichier. *)

  | MenhirState039 : ((('s, _menhir_box_fichier) _menhir_cell1_ACCOUV, _menhir_box_fichier) _menhir_cell1_variables, _menhir_box_fichier) _menhir_state
    (** State 039.
        Stack shape : ACCOUV variables.
        Start symbol: fichier. *)

  | MenhirState042 : (('s, _menhir_box_fichier) _menhir_cell1_TANTQUE, _menhir_box_fichier) _menhir_state
    (** State 042.
        Stack shape : TANTQUE.
        Start symbol: fichier. *)

  | MenhirState043 : (('s, _menhir_box_fichier) _menhir_cell1_PAROUV, _menhir_box_fichier) _menhir_state
    (** State 043.
        Stack shape : PAROUV.
        Start symbol: fichier. *)

  | MenhirState047 : (('s, _menhir_box_fichier) _menhir_cell1_OPPLUS, _menhir_box_fichier) _menhir_state
    (** State 047.
        Stack shape : OPPLUS.
        Start symbol: fichier. *)

  | MenhirState057 : (('s, _menhir_box_fichier) _menhir_cell1_NOUVEAU _menhir_cell0_IDENT, _menhir_box_fichier) _menhir_state
    (** State 057.
        Stack shape : NOUVEAU IDENT.
        Start symbol: fichier. *)

  | MenhirState064 : (('s, _menhir_box_fichier) _menhir_cell1_IDENT, _menhir_box_fichier) _menhir_state
    (** State 064.
        Stack shape : IDENT.
        Start symbol: fichier. *)

  | MenhirState065 : (('s, _menhir_box_fichier) _menhir_cell1_PAROUV, _menhir_box_fichier) _menhir_state
    (** State 065.
        Stack shape : PAROUV.
        Start symbol: fichier. *)

  | MenhirState072 : (('s, _menhir_box_fichier) _menhir_cell1_unaire, _menhir_box_fichier) _menhir_state
    (** State 072.
        Stack shape : unaire.
        Start symbol: fichier. *)

  | MenhirState074 : ((('s, _menhir_box_fichier) _menhir_cell1_unaire, _menhir_box_fichier) _menhir_cell1_expression, _menhir_box_fichier) _menhir_state
    (** State 074.
        Stack shape : unaire expression.
        Start symbol: fichier. *)

  | MenhirState075 : ((('s, _menhir_box_fichier) _menhir_cell1_expression, _menhir_box_fichier) _menhir_cell1_OPPLUS, _menhir_box_fichier) _menhir_state
    (** State 075.
        Stack shape : expression OPPLUS.
        Start symbol: fichier. *)

  | MenhirState077 : (((('s, _menhir_box_fichier) _menhir_cell1_expression, _menhir_box_fichier) _menhir_cell1_OPPLUS, _menhir_box_fichier) _menhir_cell1_expression, _menhir_box_fichier) _menhir_state
    (** State 077.
        Stack shape : expression OPPLUS expression.
        Start symbol: fichier. *)

  | MenhirState078 : ((('s, _menhir_box_fichier) _menhir_cell1_expression, _menhir_box_fichier) _menhir_cell1_OPMULT, _menhir_box_fichier) _menhir_state
    (** State 078.
        Stack shape : expression OPMULT.
        Start symbol: fichier. *)

  | MenhirState081 : ((('s, _menhir_box_fichier) _menhir_cell1_PAROUV, _menhir_box_fichier) _menhir_cell1_expression, _menhir_box_fichier) _menhir_state
    (** State 081.
        Stack shape : PAROUV expression.
        Start symbol: fichier. *)

  | MenhirState082 : ((('s, _menhir_box_fichier) _menhir_cell1_expression, _menhir_box_fichier) _menhir_cell1_VIRG, _menhir_box_fichier) _menhir_state
    (** State 082.
        Stack shape : expression VIRG.
        Start symbol: fichier. *)

  | MenhirState083 : (((('s, _menhir_box_fichier) _menhir_cell1_expression, _menhir_box_fichier) _menhir_cell1_VIRG, _menhir_box_fichier) _menhir_cell1_expression, _menhir_box_fichier) _menhir_state
    (** State 083.
        Stack shape : expression VIRG expression.
        Start symbol: fichier. *)

  | MenhirState088 : (('s, _menhir_box_fichier) _menhir_cell1_CROOUV, _menhir_box_fichier) _menhir_state
    (** State 088.
        Stack shape : CROOUV.
        Start symbol: fichier. *)

  | MenhirState089 : ((('s, _menhir_box_fichier) _menhir_cell1_CROOUV, _menhir_box_fichier) _menhir_cell1_expression, _menhir_box_fichier) _menhir_state
    (** State 089.
        Stack shape : CROOUV expression.
        Start symbol: fichier. *)

  | MenhirState092 : (('s, _menhir_box_fichier) _menhir_cell1_suffixe, _menhir_box_fichier) _menhir_state
    (** State 092.
        Stack shape : suffixe.
        Start symbol: fichier. *)

  | MenhirState094 : ((('s, _menhir_box_fichier) _menhir_cell1_NOUVEAU _menhir_cell0_IDENT, _menhir_box_fichier) _menhir_cell1_expression, _menhir_box_fichier) _menhir_state
    (** State 094.
        Stack shape : NOUVEAU IDENT expression.
        Start symbol: fichier. *)

  | MenhirState099 : ((('s, _menhir_box_fichier) _menhir_cell1_PAROUV, _menhir_box_fichier) _menhir_cell1_expression, _menhir_box_fichier) _menhir_state
    (** State 099.
        Stack shape : PAROUV expression.
        Start symbol: fichier. *)

  | MenhirState100 : (((('s, _menhir_box_fichier) _menhir_cell1_PAROUV, _menhir_box_fichier) _menhir_cell1_expression, _menhir_box_fichier) _menhir_cell1_PARFER, _menhir_box_fichier) _menhir_state
    (** State 100.
        Stack shape : PAROUV expression PARFER.
        Start symbol: fichier. *)

  | MenhirState102 : ((('s, _menhir_box_fichier) _menhir_cell1_TANTQUE, _menhir_box_fichier) _menhir_cell1_expression, _menhir_box_fichier) _menhir_state
    (** State 102.
        Stack shape : TANTQUE expression.
        Start symbol: fichier. *)

  | MenhirState103 : (((('s, _menhir_box_fichier) _menhir_cell1_TANTQUE, _menhir_box_fichier) _menhir_cell1_expression, _menhir_box_fichier) _menhir_cell1_PARFER, _menhir_box_fichier) _menhir_state
    (** State 103.
        Stack shape : TANTQUE expression PARFER.
        Start symbol: fichier. *)

  | MenhirState106 : (('s, _menhir_box_fichier) _menhir_cell1_SI, _menhir_box_fichier) _menhir_state
    (** State 106.
        Stack shape : SI.
        Start symbol: fichier. *)

  | MenhirState107 : ((('s, _menhir_box_fichier) _menhir_cell1_SI, _menhir_box_fichier) _menhir_cell1_expression, _menhir_box_fichier) _menhir_state
    (** State 107.
        Stack shape : SI expression.
        Start symbol: fichier. *)

  | MenhirState108 : (((('s, _menhir_box_fichier) _menhir_cell1_SI, _menhir_box_fichier) _menhir_cell1_expression, _menhir_box_fichier) _menhir_cell1_PARFER, _menhir_box_fichier) _menhir_state
    (** State 108.
        Stack shape : SI expression PARFER.
        Start symbol: fichier. *)

  | MenhirState110 : ((((('s, _menhir_box_fichier) _menhir_cell1_SI, _menhir_box_fichier) _menhir_cell1_expression, _menhir_box_fichier) _menhir_cell1_PARFER, _menhir_box_fichier) _menhir_cell1_bloc, _menhir_box_fichier) _menhir_state
    (** State 110.
        Stack shape : SI expression PARFER bloc.
        Start symbol: fichier. *)

  | MenhirState112 : (('s, _menhir_box_fichier) _menhir_cell1_RETOUR, _menhir_box_fichier) _menhir_state
    (** State 112.
        Stack shape : RETOUR.
        Start symbol: fichier. *)

  | MenhirState113 : ((('s, _menhir_box_fichier) _menhir_cell1_RETOUR, _menhir_box_fichier) _menhir_cell1_expression, _menhir_box_fichier) _menhir_state
    (** State 113.
        Stack shape : RETOUR expression.
        Start symbol: fichier. *)

  | MenhirState118 : (('s, _menhir_box_fichier) _menhir_cell1_instruction, _menhir_box_fichier) _menhir_state
    (** State 118.
        Stack shape : instruction.
        Start symbol: fichier. *)

  | MenhirState120 : (('s, _menhir_box_fichier) _menhir_cell1_expression, _menhir_box_fichier) _menhir_state
    (** State 120.
        Stack shape : expression.
        Start symbol: fichier. *)

  | MenhirState122 : (('s, _menhir_box_fichier) _menhir_cell1_variable, _menhir_box_fichier) _menhir_state
    (** State 122.
        Stack shape : variable.
        Start symbol: fichier. *)


and ('s, 'r) _menhir_cell1_bloc = 
  | MenhirCell1_bloc of 's * ('s, 'r) _menhir_state * (unit)

and ('s, 'r) _menhir_cell1_entete = 
  | MenhirCell1_entete of 's * ('s, 'r) _menhir_state * (unit)

and ('s, 'r) _menhir_cell1_expression = 
  | MenhirCell1_expression of 's * ('s, 'r) _menhir_state * (unit)

and ('s, 'r) _menhir_cell1_fonction = 
  | MenhirCell1_fonction of 's * ('s, 'r) _menhir_state * (unit)

and ('s, 'r) _menhir_cell1_imports = 
  | MenhirCell1_imports of 's * ('s, 'r) _menhir_state * (unit)

and ('s, 'r) _menhir_cell1_instruction = 
  | MenhirCell1_instruction of 's * ('s, 'r) _menhir_state * (unit)

and ('s, 'r) _menhir_cell1_suffixe = 
  | MenhirCell1_suffixe of 's * ('s, 'r) _menhir_state * (unit)

and ('s, 'r) _menhir_cell1_typeBase = 
  | MenhirCell1_typeBase of 's * ('s, 'r) _menhir_state * (unit)

and ('s, 'r) _menhir_cell1_typeStruct = 
  | MenhirCell1_typeStruct of 's * ('s, 'r) _menhir_state * (unit)

and ('s, 'r) _menhir_cell1_unaire = 
  | MenhirCell1_unaire of 's * ('s, 'r) _menhir_state * (unit)

and ('s, 'r) _menhir_cell1_variable = 
  | MenhirCell1_variable of 's * ('s, 'r) _menhir_state * (unit)

and ('s, 'r) _menhir_cell1_variables = 
  | MenhirCell1_variables of 's * ('s, 'r) _menhir_state * (int)

and ('s, 'r) _menhir_cell1_ACCOUV = 
  | MenhirCell1_ACCOUV of 's * ('s, 'r) _menhir_state

and ('s, 'r) _menhir_cell1_CROOUV = 
  | MenhirCell1_CROOUV of 's * ('s, 'r) _menhir_state

and ('s, 'r) _menhir_cell1_IDENT = 
  | MenhirCell1_IDENT of 's * ('s, 'r) _menhir_state * (
# 16 "parserJava.mly"
       (string)
# 367 "parserJava.ml"
)

and 's _menhir_cell0_IDENT = 
  | MenhirCell0_IDENT of 's * (
# 16 "parserJava.mly"
       (string)
# 374 "parserJava.ml"
)

and ('s, 'r) _menhir_cell1_IMPORT = 
  | MenhirCell1_IMPORT of 's * ('s, 'r) _menhir_state

and ('s, 'r) _menhir_cell1_NOUVEAU = 
  | MenhirCell1_NOUVEAU of 's * ('s, 'r) _menhir_state

and ('s, 'r) _menhir_cell1_OPMULT = 
  | MenhirCell1_OPMULT of 's * ('s, 'r) _menhir_state

and ('s, 'r) _menhir_cell1_OPPLUS = 
  | MenhirCell1_OPPLUS of 's * ('s, 'r) _menhir_state

and ('s, 'r) _menhir_cell1_PARFER = 
  | MenhirCell1_PARFER of 's * ('s, 'r) _menhir_state

and ('s, 'r) _menhir_cell1_PAROUV = 
  | MenhirCell1_PAROUV of 's * ('s, 'r) _menhir_state

and ('s, 'r) _menhir_cell1_RETOUR = 
  | MenhirCell1_RETOUR of 's * ('s, 'r) _menhir_state

and ('s, 'r) _menhir_cell1_SI = 
  | MenhirCell1_SI of 's * ('s, 'r) _menhir_state

and ('s, 'r) _menhir_cell1_TANTQUE = 
  | MenhirCell1_TANTQUE of 's * ('s, 'r) _menhir_state

and ('s, 'r) _menhir_cell1_VIRG = 
  | MenhirCell1_VIRG of 's * ('s, 'r) _menhir_state

and ('s, 'r) _menhir_cell1_VOID = 
  | MenhirCell1_VOID of 's * ('s, 'r) _menhir_state

and _menhir_box_fichier = 
  | MenhirBox_fichier of (unit) [@@unboxed]

let _menhir_action_01 =
  fun () ->
    (
# 161 "parserJava.mly"
                 ( (print_endline "binaire : =") )
# 418 "parserJava.ml"
     : (unit))

let _menhir_action_02 =
  fun () ->
    (
# 162 "parserJava.mly"
         ( (print_endline "binaire : .") )
# 426 "parserJava.ml"
     : (unit))

let _menhir_action_03 =
  fun () ->
    (
# 163 "parserJava.mly"
           ( (print_endline "binaire : +") )
# 434 "parserJava.ml"
     : (unit))

let _menhir_action_04 =
  fun () ->
    (
# 164 "parserJava.mly"
            ( (print_endline "binaire : -") )
# 442 "parserJava.ml"
     : (unit))

let _menhir_action_05 =
  fun () ->
    (
# 165 "parserJava.mly"
           ( (print_endline "binaire : *") )
# 450 "parserJava.ml"
     : (unit))

let _menhir_action_06 =
  fun () ->
    (
# 166 "parserJava.mly"
          ( (print_endline "binaire : /") )
# 458 "parserJava.ml"
     : (unit))

let _menhir_action_07 =
  fun () ->
    (
# 167 "parserJava.mly"
          ( (print_endline "binaire : %") )
# 466 "parserJava.ml"
     : (unit))

let _menhir_action_08 =
  fun () ->
    (
# 168 "parserJava.mly"
         ( (print_endline "binaire : ||") )
# 474 "parserJava.ml"
     : (unit))

let _menhir_action_09 =
  fun () ->
    (
# 169 "parserJava.mly"
         ( (print_endline "binaire : &&") )
# 482 "parserJava.ml"
     : (unit))

let _menhir_action_10 =
  fun () ->
    (
# 170 "parserJava.mly"
         ( (print_endline "binaire : ==") )
# 490 "parserJava.ml"
     : (unit))

let _menhir_action_11 =
  fun () ->
    (
# 171 "parserJava.mly"
            ( (print_endline "binaire : !=") )
# 498 "parserJava.ml"
     : (unit))

let _menhir_action_12 =
  fun () ->
    (
# 172 "parserJava.mly"
          ( (print_endline "binaire : <") )
# 506 "parserJava.ml"
     : (unit))

let _menhir_action_13 =
  fun () ->
    (
# 173 "parserJava.mly"
          ( (print_endline "binaire : >") )
# 514 "parserJava.ml"
     : (unit))

let _menhir_action_14 =
  fun () ->
    (
# 174 "parserJava.mly"
            ( (print_endline "binaire : <=") )
# 522 "parserJava.ml"
     : (unit))

let _menhir_action_15 =
  fun () ->
    (
# 175 "parserJava.mly"
            ( (print_endline "binaire : >=") )
# 530 "parserJava.ml"
     : (unit))

let _menhir_action_16 =
  fun () ->
    (
# 176 "parserJava.mly"
          ( (print_endline "binaire : !") )
# 538 "parserJava.ml"
     : (unit))

let _menhir_action_17 =
  fun _2 ->
    (
# 91 "parserJava.mly"
     (
	(print_endline "bloc : ACCOUV variables instructions ACCFER");
	(print_string "Nombre de variables = ");
	(print_int _2);
	(print_newline ())
	)
# 551 "parserJava.ml"
     : (unit))

let _menhir_action_18 =
  fun () ->
    (
# 76 "parserJava.mly"
                                 ( (print_endline "declTab : /* Lambda, mot vide */") )
# 559 "parserJava.ml"
     : (unit))

let _menhir_action_19 =
  fun () ->
    (
# 77 "parserJava.mly"
                        ( (print_endline "declTab : CROOUV CROFER") )
# 567 "parserJava.ml"
     : (unit))

let _menhir_action_20 =
  fun () ->
    (
# 81 "parserJava.mly"
                                                    ( (print_endline "entete : typeStruct IDENT PAROUV parsFormels PARFER") )
# 575 "parserJava.ml"
     : (unit))

let _menhir_action_21 =
  fun () ->
    (
# 82 "parserJava.mly"
                                              ( (print_endline "entete : VOID IDENT PAROUV parsFormels PARFER") )
# 583 "parserJava.ml"
     : (unit))

let _menhir_action_22 =
  fun () ->
    (
# 141 "parserJava.mly"
                            ()
# 591 "parserJava.ml"
     : (unit))

let _menhir_action_23 =
  fun () ->
    (
# 142 "parserJava.mly"
                           ()
# 599 "parserJava.ml"
     : (unit))

let _menhir_action_24 =
  fun () ->
    (
# 143 "parserJava.mly"
                ( (print_endline "expression : binaire ") )
# 607 "parserJava.ml"
     : (unit))

let _menhir_action_25 =
  fun () ->
    (
# 158 "parserJava.mly"
                                        ( (print_endline "expression_aux : /* Lambda, mot vide */") )
# 615 "parserJava.ml"
     : (unit))

let _menhir_action_26 =
  fun () ->
    (
# 159 "parserJava.mly"
                                     ( (print_endline " expression_aux : VIRG expression ") )
# 623 "parserJava.ml"
     : (unit))

let _menhir_action_27 =
  fun () ->
    (
# 128 "parserJava.mly"
                        ( (print_endline "expression : ENTIER") )
# 631 "parserJava.ml"
     : (unit))

let _menhir_action_28 =
  fun () ->
    (
# 129 "parserJava.mly"
               ( (print_endline "expression : FLOTTANT") )
# 639 "parserJava.ml"
     : (unit))

let _menhir_action_29 =
  fun () ->
    (
# 130 "parserJava.mly"
                ( (print_endline "expression : CARACTERE") )
# 647 "parserJava.ml"
     : (unit))

let _menhir_action_30 =
  fun () ->
    (
# 131 "parserJava.mly"
              ( (print_endline "expression : BOOLEEN"))
# 655 "parserJava.ml"
     : (unit))

let _menhir_action_31 =
  fun () ->
    (
# 132 "parserJava.mly"
           ( (print_endline "expression : VIDE") )
# 663 "parserJava.ml"
     : (unit))

let _menhir_action_32 =
  fun () ->
    (
# 133 "parserJava.mly"
                                  ( (print_endline "expression : NOUVEAU IDENT ()") )
# 671 "parserJava.ml"
     : (unit))

let _menhir_action_33 =
  fun () ->
    (
# 134 "parserJava.mly"
                                             ( (print_endline "expression : NOUVEAU IDENT [expression]"))
# 679 "parserJava.ml"
     : (unit))

let _menhir_action_34 =
  fun () ->
    (
# 135 "parserJava.mly"
                       ( (print_endline "expression : IDENT") )
# 687 "parserJava.ml"
     : (unit))

let _menhir_action_35 =
  fun () ->
    (
# 136 "parserJava.mly"
                                           ( (print_endline "expression : (expression) suffixe") )
# 695 "parserJava.ml"
     : (unit))

let _menhir_action_36 =
  fun () ->
    (
# 137 "parserJava.mly"
                                   ((print_endline "expression : expression OPPLUS expression"))
# 703 "parserJava.ml"
     : (unit))

let _menhir_action_37 =
  fun () ->
    (
# 138 "parserJava.mly"
                                   ()
# 711 "parserJava.ml"
     : (unit))

let _menhir_action_38 =
  fun () ->
    (
# 139 "parserJava.mly"
                                    ((print_endline "expression : OPPLUS expression %prec OPNON"))
# 719 "parserJava.ml"
     : (unit))

let _menhir_action_39 =
  fun () ->
    (
# 61 "parserJava.mly"
                        ( (print_endline "fichier : programme FIN");(print_string "Nombre de fonctions : ");(print_int !nbrFonctions);(print_newline()) )
# 727 "parserJava.ml"
     : (unit))

let _menhir_action_40 =
  fun () ->
    (
# 62 "parserJava.mly"
                                ( (print_endline "fichier : programme FIN");)
# 735 "parserJava.ml"
     : (unit))

let _menhir_action_41 =
  fun () ->
    (
# 79 "parserJava.mly"
                        ( (print_endline "fonction : entete bloc") )
# 743 "parserJava.ml"
     : (unit))

let _menhir_action_42 =
  fun () ->
    (
# 58 "parserJava.mly"
                                 ( (print_endline "imports : /* Lambda, mot vide */"); )
# 751 "parserJava.ml"
     : (unit))

let _menhir_action_43 =
  fun () ->
    (
# 59 "parserJava.mly"
                           ( (print_endline "imports : IMPORT imports"); )
# 759 "parserJava.ml"
     : (unit))

let _menhir_action_44 =
  fun () ->
    (
# 121 "parserJava.mly"
                                ( (print_endline "instruction : expression PTVIRG") )
# 767 "parserJava.ml"
     : (unit))

let _menhir_action_45 =
  fun () ->
    (
# 122 "parserJava.mly"
                                       ( (print_endline "instruction : SI PAROUV expression PARFER bloc"))
# 775 "parserJava.ml"
     : (unit))

let _menhir_action_46 =
  fun () ->
    (
# 123 "parserJava.mly"
                                                  ( (print_endline "instruction : SI PAROUV expression PARFER bloc SINON bloc"))
# 783 "parserJava.ml"
     : (unit))

let _menhir_action_47 =
  fun () ->
    (
# 124 "parserJava.mly"
                                            ( (print_endline "instruction : TANTQUE PAROUV expression PARFER bloc"))
# 791 "parserJava.ml"
     : (unit))

let _menhir_action_48 =
  fun () ->
    (
# 125 "parserJava.mly"
                                ( (print_endline "instruction : RETURN expression PTVIRG") )
# 799 "parserJava.ml"
     : (unit))

let _menhir_action_49 =
  fun () ->
    (
# 117 "parserJava.mly"
                                         ( (print_endline "instruction_aux: /* Lambda, mot vide */"); 0)
# 807 "parserJava.ml"
     : (int))

let _menhir_action_50 =
  fun _2 ->
    (
# 118 "parserJava.mly"
                                   ( (print_endline "instruction_aux : instruction"); (_2 + 1) )
# 815 "parserJava.ml"
     : (int))

let _menhir_action_51 =
  fun _1 ->
    (
# 112 "parserJava.mly"
                               ( (print_endline "instructions : instruction") ;
(print_string "Nombre d'instructions = ");
                (print_int _1);
                (print_newline ());      )
# 826 "parserJava.ml"
     : (unit))

let _menhir_action_52 =
  fun () ->
    (
# 84 "parserJava.mly"
                                     ( (print_endline "parsFormels : /* Lambda, mot vide */") )
# 834 "parserJava.ml"
     : (unit))

let _menhir_action_53 =
  fun () ->
    (
# 85 "parserJava.mly"
                                                ( (print_endline "parsFormels : typeStruct IDENT suiteParsFormels") )
# 842 "parserJava.ml"
     : (unit))

let _menhir_action_54 =
  fun () ->
    (
# 64 "parserJava.mly"
                                   ( (nbrFonctions := 0); (print_endline "programme : /* Lambda, mot vide */") )
# 850 "parserJava.ml"
     : (unit))

let _menhir_action_55 =
  fun () ->
    (
# 65 "parserJava.mly"
                               ( (nbrFonctions := !nbrFonctions + 1);(print_endline "programme : fonction programme") )
# 858 "parserJava.ml"
     : (unit))

let _menhir_action_56 =
  fun () ->
    (
# 153 "parserJava.mly"
                        ( (print_endline "suffixe : ( type )") )
# 866 "parserJava.ml"
     : (unit))

let _menhir_action_57 =
  fun () ->
    (
# 154 "parserJava.mly"
                             ( (print_endline " sufixe : ( expression )") )
# 874 "parserJava.ml"
     : (unit))

let _menhir_action_58 =
  fun () ->
    (
# 155 "parserJava.mly"
                                            ( (print_endline " sufixe : ( expression + )") )
# 882 "parserJava.ml"
     : (unit))

let _menhir_action_59 =
  fun () ->
    (
# 156 "parserJava.mly"
                             ( (print_endline "sufixe : [ expression ]") )
# 890 "parserJava.ml"
     : (unit))

let _menhir_action_60 =
  fun () ->
    (
# 150 "parserJava.mly"
                                     ( (print_endline "suffixe_aux : /* Lambda, mot vide */") )
# 898 "parserJava.ml"
     : (unit))

let _menhir_action_61 =
  fun () ->
    (
# 151 "parserJava.mly"
                         ( (print_endline "suffixe_aux : suffixe"))
# 906 "parserJava.ml"
     : (unit))

let _menhir_action_62 =
  fun () ->
    (
# 87 "parserJava.mly"
                                          ( (print_endline "suiteParsFormels : /* Lambda, mot vide */") )
# 914 "parserJava.ml"
     : (unit))

let _menhir_action_63 =
  fun () ->
    (
# 88 "parserJava.mly"
                                                          ( (print_endline "suiteParsFormels : VIRG typeStruct IDENT suiteParsFormels") )
# 922 "parserJava.ml"
     : (unit))

let _menhir_action_64 =
  fun () ->
    (
# 69 "parserJava.mly"
               ( (print_endline "typeBase : INT") )
# 930 "parserJava.ml"
     : (unit))

let _menhir_action_65 =
  fun () ->
    (
# 70 "parserJava.mly"
                 ( (print_endline "typeBase : FLOAT") )
# 938 "parserJava.ml"
     : (unit))

let _menhir_action_66 =
  fun () ->
    (
# 71 "parserJava.mly"
                ( (print_endline "typeBase : BOOL") )
# 946 "parserJava.ml"
     : (unit))

let _menhir_action_67 =
  fun () ->
    (
# 72 "parserJava.mly"
                ( (print_endline "typeBase : CHAR") )
# 954 "parserJava.ml"
     : (unit))

let _menhir_action_68 =
  fun () ->
    (
# 73 "parserJava.mly"
                  ( (print_endline "typeBase : STRING") )
# 962 "parserJava.ml"
     : (unit))

let _menhir_action_69 =
  fun () ->
    (
# 74 "parserJava.mly"
                     ( (print_endline "typeBase : TYPEIDENT") )
# 970 "parserJava.ml"
     : (unit))

let _menhir_action_70 =
  fun () ->
    (
# 67 "parserJava.mly"
                              ( (print_endline "typeStruct : typeBase declTab") )
# 978 "parserJava.ml"
     : (unit))

let _menhir_action_71 =
  fun () ->
    (
# 145 "parserJava.mly"
                                ( (print_endline "unaire : ( type )") )
# 986 "parserJava.ml"
     : (unit))

let _menhir_action_72 =
  fun () ->
    (
# 146 "parserJava.mly"
           ( (print_endline "unaire : +"))
# 994 "parserJava.ml"
     : (unit))

let _menhir_action_73 =
  fun () ->
    (
# 147 "parserJava.mly"
            ( (print_endline "unaire : -"))
# 1002 "parserJava.ml"
     : (unit))

let _menhir_action_74 =
  fun () ->
    (
# 148 "parserJava.mly"
          ( (print_endline "unaire : !") )
# 1010 "parserJava.ml"
     : (unit))

let _menhir_action_75 =
  fun () ->
    (
# 109 "parserJava.mly"
                                   ( (print_endline "variable : typeStruct IDENT PTVIRG") )
# 1018 "parserJava.ml"
     : (unit))

let _menhir_action_76 =
  fun () ->
    (
# 99 "parserJava.mly"
   (
		(print_endline "variables : /* Lambda, mot vide */");
		0
		)
# 1029 "parserJava.ml"
     : (int))

let _menhir_action_77 =
  fun _2 ->
    (
# 104 "parserJava.mly"
   (
		(print_endline "variables : variable variables");
		(_2 + 1)
		)
# 1040 "parserJava.ml"
     : (int))

let _menhir_print_token : token -> string =
  fun _tok ->
    match _tok with
    | ACCFER ->
        "ACCFER"
    | ACCOUV ->
        "ACCOUV"
    | ASSIGN ->
        "ASSIGN"
    | BOOL ->
        "BOOL"
    | BOOLEEN _ ->
        "BOOLEEN"
    | CARACTERE _ ->
        "CARACTERE"
    | CHAINE _ ->
        "CHAINE"
    | CHAR ->
        "CHAR"
    | CROFER ->
        "CROFER"
    | CROOUV ->
        "CROOUV"
    | ENTIER _ ->
        "ENTIER"
    | FIN ->
        "FIN"
    | FLOAT ->
        "FLOAT"
    | FLOTTANT _ ->
        "FLOTTANT"
    | IDENT _ ->
        "IDENT"
    | IMPORT ->
        "IMPORT"
    | INT ->
        "INT"
    | NOUVEAU ->
        "NOUVEAU"
    | OPDIV ->
        "OPDIV"
    | OPEG ->
        "OPEG"
    | OPET ->
        "OPET"
    | OPINF ->
        "OPINF"
    | OPINFEG ->
        "OPINFEG"
    | OPMOD ->
        "OPMOD"
    | OPMOINS ->
        "OPMOINS"
    | OPMULT ->
        "OPMULT"
    | OPNON ->
        "OPNON"
    | OPNONEG ->
        "OPNONEG"
    | OPOU ->
        "OPOU"
    | OPPLUS ->
        "OPPLUS"
    | OPPT ->
        "OPPT"
    | OPSUP ->
        "OPSUP"
    | OPSUPEG ->
        "OPSUPEG"
    | PARFER ->
        "PARFER"
    | PAROUV ->
        "PAROUV"
    | PTVIRG ->
        "PTVIRG"
    | RETOUR ->
        "RETOUR"
    | SI ->
        "SI"
    | SINON ->
        "SINON"
    | STRING ->
        "STRING"
    | TANTQUE ->
        "TANTQUE"
    | TYPEIDENT _ ->
        "TYPEIDENT"
    | VIDE ->
        "VIDE"
    | VIRG ->
        "VIRG"
    | VOID ->
        "VOID"

let _menhir_fail : unit -> 'a =
  fun () ->
    Printf.eprintf "Internal failure -- please contact the parser generator's developers.\n%!";
    assert false

include struct
  
  [@@@ocaml.warning "-4-37"]
  
  let _menhir_goto_fichier : type  ttv_stack. ttv_stack -> _ -> _menhir_box_fichier =
    fun _menhir_stack _v ->
      MenhirBox_fichier _v
  
  let _menhir_run_033 : type  ttv_stack. (ttv_stack, _menhir_box_fichier) _menhir_cell1_imports -> _menhir_box_fichier =
    fun _menhir_stack ->
      let MenhirCell1_imports (_menhir_stack, _, _) = _menhir_stack in
      let _v = _menhir_action_40 () in
      _menhir_goto_fichier _menhir_stack _v
  
  let _menhir_run_030 : type  ttv_stack. ttv_stack -> _menhir_box_fichier =
    fun _menhir_stack ->
      let _v = _menhir_action_39 () in
      _menhir_goto_fichier _menhir_stack _v
  
  let rec _menhir_run_036 : type  ttv_stack. (ttv_stack, _menhir_box_fichier) _menhir_cell1_fonction -> _menhir_box_fichier =
    fun _menhir_stack ->
      let MenhirCell1_fonction (_menhir_stack, _menhir_s, _) = _menhir_stack in
      let _ = _menhir_action_55 () in
      _menhir_goto_programme _menhir_stack _menhir_s
  
  and _menhir_goto_programme : type  ttv_stack. ttv_stack -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _menhir_box_fichier =
    fun _menhir_stack _menhir_s ->
      match _menhir_s with
      | MenhirState035 ->
          _menhir_run_036 _menhir_stack
      | MenhirState032 ->
          _menhir_run_033 _menhir_stack
      | MenhirState000 ->
          _menhir_run_030 _menhir_stack
      | _ ->
          _menhir_fail ()
  
  let rec _menhir_run_001 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _menhir_stack = MenhirCell1_VOID (_menhir_stack, _menhir_s) in
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | IDENT _v ->
          let _menhir_stack = MenhirCell0_IDENT (_menhir_stack, _v) in
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | PAROUV ->
              let _tok = _menhir_lexer _menhir_lexbuf in
              (match (_tok : MenhirBasics.token) with
              | TYPEIDENT _ ->
                  _menhir_run_004 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState003
              | STRING ->
                  _menhir_run_005 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState003
              | INT ->
                  _menhir_run_006 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState003
              | FLOAT ->
                  _menhir_run_007 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState003
              | CHAR ->
                  _menhir_run_008 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState003
              | BOOL ->
                  _menhir_run_009 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState003
              | PARFER ->
                  let _ = _menhir_action_52 () in
                  _menhir_run_021 _menhir_stack _menhir_lexbuf _menhir_lexer
              | _ ->
                  _eRR ())
          | _ ->
              _eRR ())
      | _ ->
          _eRR ()
  
  and _menhir_run_004 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      let _v = _menhir_action_69 () in
      _menhir_goto_typeBase _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
  
  and _menhir_goto_typeBase : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _ -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      match _menhir_s with
      | MenhirState043 ->
          _menhir_run_097 _menhir_stack _menhir_lexbuf _menhir_lexer _tok
      | MenhirState038 ->
          _menhir_run_016 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | MenhirState122 ->
          _menhir_run_016 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | MenhirState035 ->
          _menhir_run_016 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | MenhirState032 ->
          _menhir_run_016 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | MenhirState000 ->
          _menhir_run_016 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | MenhirState027 ->
          _menhir_run_016 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | MenhirState003 ->
          _menhir_run_016 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | MenhirState012 ->
          _menhir_run_016 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | _ ->
          _menhir_fail ()
  
  and _menhir_run_097 : type  ttv_stack. (ttv_stack, _menhir_box_fichier) _menhir_cell1_PAROUV -> _ -> _ -> _ -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _tok ->
      match (_tok : MenhirBasics.token) with
      | PARFER ->
          let _tok = _menhir_lexer _menhir_lexbuf in
          let MenhirCell1_PAROUV (_menhir_stack, _menhir_s) = _menhir_stack in
          let _v = _menhir_action_71 () in
          _menhir_goto_unaire _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | _ ->
          _eRR ()
  
  and _menhir_goto_unaire : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _ -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      let _menhir_stack = MenhirCell1_unaire (_menhir_stack, _menhir_s, _v) in
      match (_tok : MenhirBasics.token) with
      | VIDE ->
          _menhir_run_040 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState072
      | PAROUV ->
          _menhir_run_043 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState072
      | OPSUPEG ->
          _menhir_run_044 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState072
      | OPSUP ->
          _menhir_run_045 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState072
      | OPPT ->
          _menhir_run_046 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState072
      | OPPLUS ->
          _menhir_run_047 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState072
      | OPOU ->
          _menhir_run_058 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState072
      | OPNONEG ->
          _menhir_run_059 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState072
      | OPNON ->
          _menhir_run_048 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState072
      | OPMULT ->
          _menhir_run_049 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState072
      | OPMOINS ->
          _menhir_run_060 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState072
      | OPMOD ->
          _menhir_run_050 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState072
      | OPINFEG ->
          _menhir_run_061 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState072
      | OPINF ->
          _menhir_run_062 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState072
      | OPET ->
          _menhir_run_051 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState072
      | OPEG ->
          _menhir_run_063 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState072
      | OPDIV ->
          _menhir_run_052 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState072
      | NOUVEAU ->
          _menhir_run_053 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState072
      | IDENT _v_0 ->
          _menhir_run_064 _menhir_stack _menhir_lexbuf _menhir_lexer _v_0 MenhirState072
      | FLOTTANT _ ->
          _menhir_run_067 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState072
      | ENTIER _ ->
          _menhir_run_068 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState072
      | CARACTERE _ ->
          _menhir_run_069 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState072
      | BOOLEEN _ ->
          _menhir_run_070 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState072
      | ASSIGN ->
          _menhir_run_071 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState072
      | _ ->
          _eRR ()
  
  and _menhir_run_040 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      let _ = _menhir_action_31 () in
      _menhir_goto_expression_int _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
  
  and _menhir_goto_expression_int : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _ -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok ->
      match _menhir_s with
      | MenhirState039 ->
          _menhir_run_076 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
      | MenhirState118 ->
          _menhir_run_076 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
      | MenhirState112 ->
          _menhir_run_076 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
      | MenhirState106 ->
          _menhir_run_076 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
      | MenhirState042 ->
          _menhir_run_076 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
      | MenhirState043 ->
          _menhir_run_076 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
      | MenhirState047 ->
          _menhir_run_076 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
      | MenhirState057 ->
          _menhir_run_076 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
      | MenhirState088 ->
          _menhir_run_076 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
      | MenhirState082 ->
          _menhir_run_076 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
      | MenhirState065 ->
          _menhir_run_076 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
      | MenhirState078 ->
          _menhir_run_076 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
      | MenhirState075 ->
          _menhir_run_076 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
      | MenhirState072 ->
          _menhir_run_073 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
      | _ ->
          _menhir_fail ()
  
  and _menhir_run_076 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _ -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok ->
      let _v = _menhir_action_22 () in
      _menhir_goto_expression _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
  
  and _menhir_goto_expression : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _ -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      match _menhir_s with
      | MenhirState039 ->
          _menhir_run_120 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | MenhirState118 ->
          _menhir_run_120 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | MenhirState112 ->
          _menhir_run_113 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | MenhirState106 ->
          _menhir_run_107 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | MenhirState042 ->
          _menhir_run_102 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | MenhirState043 ->
          _menhir_run_099 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | MenhirState047 ->
          _menhir_run_096 _menhir_stack _menhir_lexbuf _menhir_lexer _tok
      | MenhirState057 ->
          _menhir_run_094 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | MenhirState088 ->
          _menhir_run_089 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | MenhirState082 ->
          _menhir_run_083 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | MenhirState065 ->
          _menhir_run_081 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | MenhirState078 ->
          _menhir_run_079 _menhir_stack _menhir_lexbuf _menhir_lexer _tok
      | MenhirState075 ->
          _menhir_run_077 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | MenhirState072 ->
          _menhir_run_074 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | _ ->
          _menhir_fail ()
  
  and _menhir_run_120 : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _ -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      match (_tok : MenhirBasics.token) with
      | PTVIRG ->
          let _tok = _menhir_lexer _menhir_lexbuf in
          let _v = _menhir_action_44 () in
          _menhir_goto_instruction _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | OPPLUS ->
          let _menhir_stack = MenhirCell1_expression (_menhir_stack, _menhir_s, _v) in
          _menhir_run_075 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState120
      | OPMULT ->
          let _menhir_stack = MenhirCell1_expression (_menhir_stack, _menhir_s, _v) in
          _menhir_run_078 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState120
      | _ ->
          _eRR ()
  
  and _menhir_goto_instruction : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _ -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      let _menhir_stack = MenhirCell1_instruction (_menhir_stack, _menhir_s, _v) in
      match (_tok : MenhirBasics.token) with
      | VIDE ->
          _menhir_run_040 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState118
      | TANTQUE ->
          _menhir_run_041 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState118
      | SI ->
          _menhir_run_105 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState118
      | RETOUR ->
          _menhir_run_112 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState118
      | PAROUV ->
          _menhir_run_043 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState118
      | OPSUPEG ->
          _menhir_run_044 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState118
      | OPSUP ->
          _menhir_run_045 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState118
      | OPPT ->
          _menhir_run_046 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState118
      | OPPLUS ->
          _menhir_run_047 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState118
      | OPOU ->
          _menhir_run_058 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState118
      | OPNONEG ->
          _menhir_run_059 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState118
      | OPNON ->
          _menhir_run_048 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState118
      | OPMULT ->
          _menhir_run_049 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState118
      | OPMOINS ->
          _menhir_run_060 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState118
      | OPMOD ->
          _menhir_run_050 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState118
      | OPINFEG ->
          _menhir_run_061 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState118
      | OPINF ->
          _menhir_run_062 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState118
      | OPET ->
          _menhir_run_051 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState118
      | OPEG ->
          _menhir_run_063 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState118
      | OPDIV ->
          _menhir_run_052 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState118
      | NOUVEAU ->
          _menhir_run_053 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState118
      | IDENT _v_0 ->
          _menhir_run_064 _menhir_stack _menhir_lexbuf _menhir_lexer _v_0 MenhirState118
      | FLOTTANT _ ->
          _menhir_run_067 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState118
      | ENTIER _ ->
          _menhir_run_068 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState118
      | CARACTERE _ ->
          _menhir_run_069 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState118
      | BOOLEEN _ ->
          _menhir_run_070 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState118
      | ASSIGN ->
          _menhir_run_071 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState118
      | ACCFER ->
          let _v_5 = _menhir_action_49 () in
          _menhir_run_119 _menhir_stack _menhir_lexbuf _menhir_lexer _v_5
      | _ ->
          _eRR ()
  
  and _menhir_run_041 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _menhir_stack = MenhirCell1_TANTQUE (_menhir_stack, _menhir_s) in
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | PAROUV ->
          let _menhir_s = MenhirState042 in
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | VIDE ->
              _menhir_run_040 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | PAROUV ->
              _menhir_run_043 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | OPSUPEG ->
              _menhir_run_044 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | OPSUP ->
              _menhir_run_045 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | OPPT ->
              _menhir_run_046 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | OPPLUS ->
              _menhir_run_047 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | OPOU ->
              _menhir_run_058 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | OPNONEG ->
              _menhir_run_059 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | OPNON ->
              _menhir_run_048 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | OPMULT ->
              _menhir_run_049 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | OPMOINS ->
              _menhir_run_060 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | OPMOD ->
              _menhir_run_050 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | OPINFEG ->
              _menhir_run_061 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | OPINF ->
              _menhir_run_062 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | OPET ->
              _menhir_run_051 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | OPEG ->
              _menhir_run_063 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | OPDIV ->
              _menhir_run_052 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | NOUVEAU ->
              _menhir_run_053 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | IDENT _v ->
              _menhir_run_064 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s
          | FLOTTANT _ ->
              _menhir_run_067 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | ENTIER _ ->
              _menhir_run_068 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | CARACTERE _ ->
              _menhir_run_069 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | BOOLEEN _ ->
              _menhir_run_070 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | ASSIGN ->
              _menhir_run_071 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | _ ->
              _eRR ())
      | _ ->
          _eRR ()
  
  and _menhir_run_043 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _menhir_stack = MenhirCell1_PAROUV (_menhir_stack, _menhir_s) in
      let _menhir_s = MenhirState043 in
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | VIDE ->
          _menhir_run_040 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | TYPEIDENT _ ->
          _menhir_run_004 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | STRING ->
          _menhir_run_005 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | PAROUV ->
          _menhir_run_043 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPSUPEG ->
          _menhir_run_044 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPSUP ->
          _menhir_run_045 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPPT ->
          _menhir_run_046 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPPLUS ->
          _menhir_run_047 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPOU ->
          _menhir_run_058 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPNONEG ->
          _menhir_run_059 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPNON ->
          _menhir_run_048 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPMULT ->
          _menhir_run_049 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPMOINS ->
          _menhir_run_060 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPMOD ->
          _menhir_run_050 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPINFEG ->
          _menhir_run_061 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPINF ->
          _menhir_run_062 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPET ->
          _menhir_run_051 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPEG ->
          _menhir_run_063 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPDIV ->
          _menhir_run_052 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | NOUVEAU ->
          _menhir_run_053 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | INT ->
          _menhir_run_006 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | IDENT _v ->
          _menhir_run_064 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s
      | FLOTTANT _ ->
          _menhir_run_067 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | FLOAT ->
          _menhir_run_007 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | ENTIER _ ->
          _menhir_run_068 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | CHAR ->
          _menhir_run_008 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | CARACTERE _ ->
          _menhir_run_069 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | BOOLEEN _ ->
          _menhir_run_070 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | BOOL ->
          _menhir_run_009 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | ASSIGN ->
          _menhir_run_071 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | _ ->
          _eRR ()
  
  and _menhir_run_005 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      let _v = _menhir_action_68 () in
      _menhir_goto_typeBase _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
  
  and _menhir_run_044 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      let _ = _menhir_action_15 () in
      _menhir_goto_binaire _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
  
  and _menhir_goto_binaire : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _ -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok ->
      let _v = _menhir_action_24 () in
      _menhir_goto_expression _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
  
  and _menhir_run_045 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      let _ = _menhir_action_13 () in
      _menhir_goto_binaire _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
  
  and _menhir_run_046 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      let _ = _menhir_action_02 () in
      _menhir_goto_binaire _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
  
  and _menhir_run_047 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | VIDE ->
          let _menhir_stack = MenhirCell1_OPPLUS (_menhir_stack, _menhir_s) in
          _menhir_run_040 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState047
      | PAROUV ->
          let _menhir_stack = MenhirCell1_OPPLUS (_menhir_stack, _menhir_s) in
          _menhir_run_043 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState047
      | OPPT ->
          let _menhir_stack = MenhirCell1_OPPLUS (_menhir_stack, _menhir_s) in
          _menhir_run_046 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState047
      | OPPLUS ->
          let _menhir_stack = MenhirCell1_OPPLUS (_menhir_stack, _menhir_s) in
          _menhir_run_047 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState047
      | OPNON ->
          let _menhir_stack = MenhirCell1_OPPLUS (_menhir_stack, _menhir_s) in
          _menhir_run_048 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState047
      | OPMULT ->
          let _menhir_stack = MenhirCell1_OPPLUS (_menhir_stack, _menhir_s) in
          _menhir_run_049 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState047
      | OPMOD ->
          let _menhir_stack = MenhirCell1_OPPLUS (_menhir_stack, _menhir_s) in
          _menhir_run_050 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState047
      | OPET ->
          let _menhir_stack = MenhirCell1_OPPLUS (_menhir_stack, _menhir_s) in
          _menhir_run_051 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState047
      | OPDIV ->
          let _menhir_stack = MenhirCell1_OPPLUS (_menhir_stack, _menhir_s) in
          _menhir_run_052 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState047
      | NOUVEAU ->
          let _menhir_stack = MenhirCell1_OPPLUS (_menhir_stack, _menhir_s) in
          _menhir_run_053 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState047
      | IDENT _v ->
          let _menhir_stack = MenhirCell1_OPPLUS (_menhir_stack, _menhir_s) in
          _menhir_run_064 _menhir_stack _menhir_lexbuf _menhir_lexer _v MenhirState047
      | FLOTTANT _ ->
          let _menhir_stack = MenhirCell1_OPPLUS (_menhir_stack, _menhir_s) in
          _menhir_run_067 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState047
      | ENTIER _ ->
          let _menhir_stack = MenhirCell1_OPPLUS (_menhir_stack, _menhir_s) in
          _menhir_run_068 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState047
      | CARACTERE _ ->
          let _menhir_stack = MenhirCell1_OPPLUS (_menhir_stack, _menhir_s) in
          _menhir_run_069 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState047
      | BOOLEEN _ ->
          let _menhir_stack = MenhirCell1_OPPLUS (_menhir_stack, _menhir_s) in
          _menhir_run_070 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState047
      | CROFER | PARFER | PTVIRG | VIRG ->
          let _ = _menhir_action_03 () in
          _menhir_goto_binaire _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
      | ASSIGN | OPEG | OPINF | OPINFEG | OPMOINS | OPNONEG | OPOU | OPSUP | OPSUPEG ->
          let _v = _menhir_action_72 () in
          _menhir_goto_unaire _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | _ ->
          _eRR ()
  
  and _menhir_run_048 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | CROFER | PARFER | PTVIRG | VIRG ->
          let _ = _menhir_action_16 () in
          _menhir_goto_binaire _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
      | ASSIGN | BOOLEEN _ | CARACTERE _ | ENTIER _ | FLOTTANT _ | IDENT _ | NOUVEAU | OPDIV | OPEG | OPET | OPINF | OPINFEG | OPMOD | OPMOINS | OPMULT | OPNON | OPNONEG | OPOU | OPPLUS | OPPT | OPSUP | OPSUPEG | PAROUV | VIDE ->
          let _v = _menhir_action_74 () in
          _menhir_goto_unaire _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | _ ->
          _eRR ()
  
  and _menhir_run_049 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      let _ = _menhir_action_05 () in
      _menhir_goto_binaire _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
  
  and _menhir_run_050 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      let _ = _menhir_action_07 () in
      _menhir_goto_binaire _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
  
  and _menhir_run_051 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      let _ = _menhir_action_09 () in
      _menhir_goto_binaire _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
  
  and _menhir_run_052 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      let _ = _menhir_action_06 () in
      _menhir_goto_binaire _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
  
  and _menhir_run_053 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | IDENT _v ->
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | PAROUV ->
              let _tok = _menhir_lexer _menhir_lexbuf in
              (match (_tok : MenhirBasics.token) with
              | PARFER ->
                  let _tok = _menhir_lexer _menhir_lexbuf in
                  let _ = _menhir_action_32 () in
                  _menhir_goto_expression_int _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
              | _ ->
                  _eRR ())
          | CROOUV ->
              let _menhir_stack = MenhirCell1_NOUVEAU (_menhir_stack, _menhir_s) in
              let _menhir_stack = MenhirCell0_IDENT (_menhir_stack, _v) in
              let _menhir_s = MenhirState057 in
              let _tok = _menhir_lexer _menhir_lexbuf in
              (match (_tok : MenhirBasics.token) with
              | VIDE ->
                  _menhir_run_040 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
              | PAROUV ->
                  _menhir_run_043 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
              | OPSUPEG ->
                  _menhir_run_044 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
              | OPSUP ->
                  _menhir_run_045 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
              | OPPT ->
                  _menhir_run_046 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
              | OPPLUS ->
                  _menhir_run_047 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
              | OPOU ->
                  _menhir_run_058 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
              | OPNONEG ->
                  _menhir_run_059 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
              | OPNON ->
                  _menhir_run_048 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
              | OPMULT ->
                  _menhir_run_049 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
              | OPMOINS ->
                  _menhir_run_060 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
              | OPMOD ->
                  _menhir_run_050 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
              | OPINFEG ->
                  _menhir_run_061 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
              | OPINF ->
                  _menhir_run_062 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
              | OPET ->
                  _menhir_run_051 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
              | OPEG ->
                  _menhir_run_063 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
              | OPDIV ->
                  _menhir_run_052 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
              | NOUVEAU ->
                  _menhir_run_053 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
              | IDENT _v ->
                  _menhir_run_064 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s
              | FLOTTANT _ ->
                  _menhir_run_067 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
              | ENTIER _ ->
                  _menhir_run_068 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
              | CARACTERE _ ->
                  _menhir_run_069 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
              | BOOLEEN _ ->
                  _menhir_run_070 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
              | ASSIGN ->
                  _menhir_run_071 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
              | _ ->
                  _eRR ())
          | _ ->
              _eRR ())
      | _ ->
          _eRR ()
  
  and _menhir_run_058 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      let _ = _menhir_action_08 () in
      _menhir_goto_binaire _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
  
  and _menhir_run_059 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      let _ = _menhir_action_11 () in
      _menhir_goto_binaire _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
  
  and _menhir_run_060 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | CROFER | PARFER | PTVIRG | VIRG ->
          let _ = _menhir_action_04 () in
          _menhir_goto_binaire _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
      | ASSIGN | BOOLEEN _ | CARACTERE _ | ENTIER _ | FLOTTANT _ | IDENT _ | NOUVEAU | OPDIV | OPEG | OPET | OPINF | OPINFEG | OPMOD | OPMOINS | OPMULT | OPNON | OPNONEG | OPOU | OPPLUS | OPPT | OPSUP | OPSUPEG | PAROUV | VIDE ->
          let _v = _menhir_action_73 () in
          _menhir_goto_unaire _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | _ ->
          _eRR ()
  
  and _menhir_run_061 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      let _ = _menhir_action_14 () in
      _menhir_goto_binaire _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
  
  and _menhir_run_062 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      let _ = _menhir_action_12 () in
      _menhir_goto_binaire _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
  
  and _menhir_run_063 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      let _ = _menhir_action_10 () in
      _menhir_goto_binaire _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
  
  and _menhir_run_064 : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s ->
      let _menhir_stack = MenhirCell1_IDENT (_menhir_stack, _menhir_s, _v) in
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | PAROUV ->
          _menhir_run_065 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState064
      | CROOUV ->
          _menhir_run_088 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState064
      | CROFER | OPMULT | OPPLUS | PARFER | PTVIRG | VIRG ->
          let _ = _menhir_action_60 () in
          _menhir_run_091 _menhir_stack _menhir_lexbuf _menhir_lexer _tok
      | _ ->
          _eRR ()
  
  and _menhir_run_065 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | VIDE ->
          let _menhir_stack = MenhirCell1_PAROUV (_menhir_stack, _menhir_s) in
          _menhir_run_040 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState065
      | PAROUV ->
          let _menhir_stack = MenhirCell1_PAROUV (_menhir_stack, _menhir_s) in
          _menhir_run_043 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState065
      | PARFER ->
          let _tok = _menhir_lexer _menhir_lexbuf in
          let _v = _menhir_action_56 () in
          _menhir_goto_suffixe _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | OPSUPEG ->
          let _menhir_stack = MenhirCell1_PAROUV (_menhir_stack, _menhir_s) in
          _menhir_run_044 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState065
      | OPSUP ->
          let _menhir_stack = MenhirCell1_PAROUV (_menhir_stack, _menhir_s) in
          _menhir_run_045 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState065
      | OPPT ->
          let _menhir_stack = MenhirCell1_PAROUV (_menhir_stack, _menhir_s) in
          _menhir_run_046 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState065
      | OPPLUS ->
          let _menhir_stack = MenhirCell1_PAROUV (_menhir_stack, _menhir_s) in
          _menhir_run_047 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState065
      | OPOU ->
          let _menhir_stack = MenhirCell1_PAROUV (_menhir_stack, _menhir_s) in
          _menhir_run_058 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState065
      | OPNONEG ->
          let _menhir_stack = MenhirCell1_PAROUV (_menhir_stack, _menhir_s) in
          _menhir_run_059 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState065
      | OPNON ->
          let _menhir_stack = MenhirCell1_PAROUV (_menhir_stack, _menhir_s) in
          _menhir_run_048 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState065
      | OPMULT ->
          let _menhir_stack = MenhirCell1_PAROUV (_menhir_stack, _menhir_s) in
          _menhir_run_049 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState065
      | OPMOINS ->
          let _menhir_stack = MenhirCell1_PAROUV (_menhir_stack, _menhir_s) in
          _menhir_run_060 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState065
      | OPMOD ->
          let _menhir_stack = MenhirCell1_PAROUV (_menhir_stack, _menhir_s) in
          _menhir_run_050 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState065
      | OPINFEG ->
          let _menhir_stack = MenhirCell1_PAROUV (_menhir_stack, _menhir_s) in
          _menhir_run_061 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState065
      | OPINF ->
          let _menhir_stack = MenhirCell1_PAROUV (_menhir_stack, _menhir_s) in
          _menhir_run_062 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState065
      | OPET ->
          let _menhir_stack = MenhirCell1_PAROUV (_menhir_stack, _menhir_s) in
          _menhir_run_051 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState065
      | OPEG ->
          let _menhir_stack = MenhirCell1_PAROUV (_menhir_stack, _menhir_s) in
          _menhir_run_063 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState065
      | OPDIV ->
          let _menhir_stack = MenhirCell1_PAROUV (_menhir_stack, _menhir_s) in
          _menhir_run_052 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState065
      | NOUVEAU ->
          let _menhir_stack = MenhirCell1_PAROUV (_menhir_stack, _menhir_s) in
          _menhir_run_053 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState065
      | IDENT _v ->
          let _menhir_stack = MenhirCell1_PAROUV (_menhir_stack, _menhir_s) in
          _menhir_run_064 _menhir_stack _menhir_lexbuf _menhir_lexer _v MenhirState065
      | FLOTTANT _ ->
          let _menhir_stack = MenhirCell1_PAROUV (_menhir_stack, _menhir_s) in
          _menhir_run_067 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState065
      | ENTIER _ ->
          let _menhir_stack = MenhirCell1_PAROUV (_menhir_stack, _menhir_s) in
          _menhir_run_068 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState065
      | CARACTERE _ ->
          let _menhir_stack = MenhirCell1_PAROUV (_menhir_stack, _menhir_s) in
          _menhir_run_069 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState065
      | BOOLEEN _ ->
          let _menhir_stack = MenhirCell1_PAROUV (_menhir_stack, _menhir_s) in
          _menhir_run_070 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState065
      | ASSIGN ->
          let _menhir_stack = MenhirCell1_PAROUV (_menhir_stack, _menhir_s) in
          _menhir_run_071 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState065
      | _ ->
          _eRR ()
  
  and _menhir_goto_suffixe : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _ -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      let _menhir_stack = MenhirCell1_suffixe (_menhir_stack, _menhir_s, _v) in
      match (_tok : MenhirBasics.token) with
      | PAROUV ->
          _menhir_run_065 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState092
      | CROOUV ->
          _menhir_run_088 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState092
      | CROFER | OPMULT | OPPLUS | PARFER | PTVIRG | VIRG ->
          let _ = _menhir_action_60 () in
          _menhir_run_093 _menhir_stack _menhir_lexbuf _menhir_lexer _tok
      | _ ->
          _eRR ()
  
  and _menhir_run_088 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _menhir_stack = MenhirCell1_CROOUV (_menhir_stack, _menhir_s) in
      let _menhir_s = MenhirState088 in
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | VIDE ->
          _menhir_run_040 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | PAROUV ->
          _menhir_run_043 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPSUPEG ->
          _menhir_run_044 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPSUP ->
          _menhir_run_045 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPPT ->
          _menhir_run_046 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPPLUS ->
          _menhir_run_047 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPOU ->
          _menhir_run_058 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPNONEG ->
          _menhir_run_059 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPNON ->
          _menhir_run_048 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPMULT ->
          _menhir_run_049 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPMOINS ->
          _menhir_run_060 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPMOD ->
          _menhir_run_050 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPINFEG ->
          _menhir_run_061 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPINF ->
          _menhir_run_062 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPET ->
          _menhir_run_051 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPEG ->
          _menhir_run_063 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPDIV ->
          _menhir_run_052 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | NOUVEAU ->
          _menhir_run_053 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | IDENT _v ->
          _menhir_run_064 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s
      | FLOTTANT _ ->
          _menhir_run_067 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | ENTIER _ ->
          _menhir_run_068 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | CARACTERE _ ->
          _menhir_run_069 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | BOOLEEN _ ->
          _menhir_run_070 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | ASSIGN ->
          _menhir_run_071 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | _ ->
          _eRR ()
  
  and _menhir_run_067 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      let _ = _menhir_action_28 () in
      _menhir_goto_expression_int _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
  
  and _menhir_run_068 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      let _ = _menhir_action_27 () in
      _menhir_goto_expression_int _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
  
  and _menhir_run_069 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      let _ = _menhir_action_29 () in
      _menhir_goto_expression_int _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
  
  and _menhir_run_070 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      let _ = _menhir_action_30 () in
      _menhir_goto_expression_int _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
  
  and _menhir_run_071 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      let _ = _menhir_action_01 () in
      _menhir_goto_binaire _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
  
  and _menhir_run_093 : type  ttv_stack. (ttv_stack, _menhir_box_fichier) _menhir_cell1_suffixe -> _ -> _ -> _ -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _tok ->
      let MenhirCell1_suffixe (_menhir_stack, _menhir_s, _) = _menhir_stack in
      let _ = _menhir_action_61 () in
      _menhir_goto_suffixe_aux _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
  
  and _menhir_goto_suffixe_aux : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _ -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok ->
      match _menhir_s with
      | MenhirState100 ->
          _menhir_run_101 _menhir_stack _menhir_lexbuf _menhir_lexer _tok
      | MenhirState092 ->
          _menhir_run_093 _menhir_stack _menhir_lexbuf _menhir_lexer _tok
      | MenhirState064 ->
          _menhir_run_091 _menhir_stack _menhir_lexbuf _menhir_lexer _tok
      | _ ->
          _menhir_fail ()
  
  and _menhir_run_101 : type  ttv_stack. (((ttv_stack, _menhir_box_fichier) _menhir_cell1_PAROUV, _menhir_box_fichier) _menhir_cell1_expression, _menhir_box_fichier) _menhir_cell1_PARFER -> _ -> _ -> _ -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _tok ->
      let MenhirCell1_PARFER (_menhir_stack, _) = _menhir_stack in
      let MenhirCell1_expression (_menhir_stack, _, _) = _menhir_stack in
      let MenhirCell1_PAROUV (_menhir_stack, _menhir_s) = _menhir_stack in
      let _ = _menhir_action_35 () in
      _menhir_goto_expression_int _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
  
  and _menhir_run_091 : type  ttv_stack. (ttv_stack, _menhir_box_fichier) _menhir_cell1_IDENT -> _ -> _ -> _ -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _tok ->
      let MenhirCell1_IDENT (_menhir_stack, _menhir_s, _) = _menhir_stack in
      let _ = _menhir_action_34 () in
      _menhir_goto_expression_int _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
  
  and _menhir_run_006 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      let _v = _menhir_action_64 () in
      _menhir_goto_typeBase _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
  
  and _menhir_run_007 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      let _v = _menhir_action_65 () in
      _menhir_goto_typeBase _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
  
  and _menhir_run_008 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      let _v = _menhir_action_67 () in
      _menhir_goto_typeBase _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
  
  and _menhir_run_009 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      let _v = _menhir_action_66 () in
      _menhir_goto_typeBase _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
  
  and _menhir_run_105 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _menhir_stack = MenhirCell1_SI (_menhir_stack, _menhir_s) in
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | PAROUV ->
          let _menhir_s = MenhirState106 in
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | VIDE ->
              _menhir_run_040 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | PAROUV ->
              _menhir_run_043 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | OPSUPEG ->
              _menhir_run_044 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | OPSUP ->
              _menhir_run_045 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | OPPT ->
              _menhir_run_046 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | OPPLUS ->
              _menhir_run_047 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | OPOU ->
              _menhir_run_058 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | OPNONEG ->
              _menhir_run_059 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | OPNON ->
              _menhir_run_048 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | OPMULT ->
              _menhir_run_049 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | OPMOINS ->
              _menhir_run_060 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | OPMOD ->
              _menhir_run_050 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | OPINFEG ->
              _menhir_run_061 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | OPINF ->
              _menhir_run_062 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | OPET ->
              _menhir_run_051 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | OPEG ->
              _menhir_run_063 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | OPDIV ->
              _menhir_run_052 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | NOUVEAU ->
              _menhir_run_053 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | IDENT _v ->
              _menhir_run_064 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s
          | FLOTTANT _ ->
              _menhir_run_067 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | ENTIER _ ->
              _menhir_run_068 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | CARACTERE _ ->
              _menhir_run_069 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | BOOLEEN _ ->
              _menhir_run_070 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | ASSIGN ->
              _menhir_run_071 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | _ ->
              _eRR ())
      | _ ->
          _eRR ()
  
  and _menhir_run_112 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _menhir_stack = MenhirCell1_RETOUR (_menhir_stack, _menhir_s) in
      let _menhir_s = MenhirState112 in
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | VIDE ->
          _menhir_run_040 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | PAROUV ->
          _menhir_run_043 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPSUPEG ->
          _menhir_run_044 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPSUP ->
          _menhir_run_045 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPPT ->
          _menhir_run_046 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPPLUS ->
          _menhir_run_047 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPOU ->
          _menhir_run_058 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPNONEG ->
          _menhir_run_059 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPNON ->
          _menhir_run_048 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPMULT ->
          _menhir_run_049 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPMOINS ->
          _menhir_run_060 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPMOD ->
          _menhir_run_050 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPINFEG ->
          _menhir_run_061 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPINF ->
          _menhir_run_062 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPET ->
          _menhir_run_051 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPEG ->
          _menhir_run_063 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPDIV ->
          _menhir_run_052 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | NOUVEAU ->
          _menhir_run_053 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | IDENT _v ->
          _menhir_run_064 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s
      | FLOTTANT _ ->
          _menhir_run_067 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | ENTIER _ ->
          _menhir_run_068 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | CARACTERE _ ->
          _menhir_run_069 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | BOOLEEN _ ->
          _menhir_run_070 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | ASSIGN ->
          _menhir_run_071 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | _ ->
          _eRR ()
  
  and _menhir_run_119 : type  ttv_stack. (ttv_stack, _menhir_box_fichier) _menhir_cell1_instruction -> _ -> _ -> _ -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v ->
      let MenhirCell1_instruction (_menhir_stack, _menhir_s, _) = _menhir_stack in
      let _2 = _v in
      let _v = _menhir_action_50 _2 in
      _menhir_goto_instruction_aux _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s
  
  and _menhir_goto_instruction_aux : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s ->
      match _menhir_s with
      | MenhirState118 ->
          _menhir_run_119 _menhir_stack _menhir_lexbuf _menhir_lexer _v
      | MenhirState039 ->
          _menhir_run_117 _menhir_stack _menhir_lexbuf _menhir_lexer _v
      | _ ->
          _menhir_fail ()
  
  and _menhir_run_117 : type  ttv_stack. ((ttv_stack, _menhir_box_fichier) _menhir_cell1_ACCOUV, _menhir_box_fichier) _menhir_cell1_variables -> _ -> _ -> _ -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v ->
      let _1 = _v in
      let _ = _menhir_action_51 _1 in
      let _tok = _menhir_lexer _menhir_lexbuf in
      let MenhirCell1_variables (_menhir_stack, _, _2) = _menhir_stack in
      let MenhirCell1_ACCOUV (_menhir_stack, _menhir_s) = _menhir_stack in
      let _v = _menhir_action_17 _2 in
      _menhir_goto_bloc _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
  
  and _menhir_goto_bloc : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _ -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      match _menhir_s with
      | MenhirState037 ->
          _menhir_run_127 _menhir_stack _menhir_lexbuf _menhir_lexer _tok
      | MenhirState110 ->
          _menhir_run_111 _menhir_stack _menhir_lexbuf _menhir_lexer _tok
      | MenhirState108 ->
          _menhir_run_109 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | MenhirState103 ->
          _menhir_run_104 _menhir_stack _menhir_lexbuf _menhir_lexer _tok
      | _ ->
          _menhir_fail ()
  
  and _menhir_run_127 : type  ttv_stack. (ttv_stack, _menhir_box_fichier) _menhir_cell1_entete -> _ -> _ -> _ -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _tok ->
      let MenhirCell1_entete (_menhir_stack, _menhir_s, _) = _menhir_stack in
      let _v = _menhir_action_41 () in
      let _menhir_stack = MenhirCell1_fonction (_menhir_stack, _menhir_s, _v) in
      match (_tok : MenhirBasics.token) with
      | VOID ->
          _menhir_run_001 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState035
      | TYPEIDENT _ ->
          _menhir_run_004 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState035
      | STRING ->
          _menhir_run_005 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState035
      | INT ->
          _menhir_run_006 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState035
      | FLOAT ->
          _menhir_run_007 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState035
      | CHAR ->
          _menhir_run_008 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState035
      | BOOL ->
          _menhir_run_009 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState035
      | FIN ->
          let _ = _menhir_action_54 () in
          _menhir_run_036 _menhir_stack
      | _ ->
          _eRR ()
  
  and _menhir_run_111 : type  ttv_stack. ((((ttv_stack, _menhir_box_fichier) _menhir_cell1_SI, _menhir_box_fichier) _menhir_cell1_expression, _menhir_box_fichier) _menhir_cell1_PARFER, _menhir_box_fichier) _menhir_cell1_bloc -> _ -> _ -> _ -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _tok ->
      let MenhirCell1_bloc (_menhir_stack, _, _) = _menhir_stack in
      let MenhirCell1_PARFER (_menhir_stack, _) = _menhir_stack in
      let MenhirCell1_expression (_menhir_stack, _, _) = _menhir_stack in
      let MenhirCell1_SI (_menhir_stack, _menhir_s) = _menhir_stack in
      let _v = _menhir_action_46 () in
      _menhir_goto_instruction _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
  
  and _menhir_run_109 : type  ttv_stack. ((((ttv_stack, _menhir_box_fichier) _menhir_cell1_SI, _menhir_box_fichier) _menhir_cell1_expression, _menhir_box_fichier) _menhir_cell1_PARFER as 'stack) -> _ -> _ -> _ -> ('stack, _menhir_box_fichier) _menhir_state -> _ -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      match (_tok : MenhirBasics.token) with
      | SINON ->
          let _menhir_stack = MenhirCell1_bloc (_menhir_stack, _menhir_s, _v) in
          let _menhir_s = MenhirState110 in
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | ACCOUV ->
              _menhir_run_038 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | _ ->
              _eRR ())
      | ACCFER | ASSIGN | BOOLEEN _ | CARACTERE _ | ENTIER _ | FLOTTANT _ | IDENT _ | NOUVEAU | OPDIV | OPEG | OPET | OPINF | OPINFEG | OPMOD | OPMOINS | OPMULT | OPNON | OPNONEG | OPOU | OPPLUS | OPPT | OPSUP | OPSUPEG | PAROUV | RETOUR | SI | TANTQUE | VIDE ->
          let MenhirCell1_PARFER (_menhir_stack, _) = _menhir_stack in
          let MenhirCell1_expression (_menhir_stack, _, _) = _menhir_stack in
          let MenhirCell1_SI (_menhir_stack, _menhir_s) = _menhir_stack in
          let _v = _menhir_action_45 () in
          _menhir_goto_instruction _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | _ ->
          _eRR ()
  
  and _menhir_run_038 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _menhir_stack = MenhirCell1_ACCOUV (_menhir_stack, _menhir_s) in
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | TYPEIDENT _ ->
          _menhir_run_004 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState038
      | STRING ->
          _menhir_run_005 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState038
      | INT ->
          _menhir_run_006 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState038
      | FLOAT ->
          _menhir_run_007 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState038
      | CHAR ->
          _menhir_run_008 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState038
      | BOOL ->
          _menhir_run_009 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState038
      | ACCFER | ASSIGN | BOOLEEN _ | CARACTERE _ | ENTIER _ | FLOTTANT _ | IDENT _ | NOUVEAU | OPDIV | OPEG | OPET | OPINF | OPINFEG | OPMOD | OPMOINS | OPMULT | OPNON | OPNONEG | OPOU | OPPLUS | OPPT | OPSUP | OPSUPEG | PAROUV | RETOUR | SI | TANTQUE | VIDE ->
          let _v = _menhir_action_76 () in
          _menhir_run_039 _menhir_stack _menhir_lexbuf _menhir_lexer _v MenhirState038 _tok
      | _ ->
          _eRR ()
  
  and _menhir_run_039 : type  ttv_stack. ((ttv_stack, _menhir_box_fichier) _menhir_cell1_ACCOUV as 'stack) -> _ -> _ -> _ -> ('stack, _menhir_box_fichier) _menhir_state -> _ -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      let _menhir_stack = MenhirCell1_variables (_menhir_stack, _menhir_s, _v) in
      match (_tok : MenhirBasics.token) with
      | VIDE ->
          _menhir_run_040 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState039
      | TANTQUE ->
          _menhir_run_041 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState039
      | SI ->
          _menhir_run_105 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState039
      | RETOUR ->
          _menhir_run_112 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState039
      | PAROUV ->
          _menhir_run_043 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState039
      | OPSUPEG ->
          _menhir_run_044 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState039
      | OPSUP ->
          _menhir_run_045 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState039
      | OPPT ->
          _menhir_run_046 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState039
      | OPPLUS ->
          _menhir_run_047 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState039
      | OPOU ->
          _menhir_run_058 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState039
      | OPNONEG ->
          _menhir_run_059 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState039
      | OPNON ->
          _menhir_run_048 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState039
      | OPMULT ->
          _menhir_run_049 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState039
      | OPMOINS ->
          _menhir_run_060 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState039
      | OPMOD ->
          _menhir_run_050 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState039
      | OPINFEG ->
          _menhir_run_061 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState039
      | OPINF ->
          _menhir_run_062 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState039
      | OPET ->
          _menhir_run_051 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState039
      | OPEG ->
          _menhir_run_063 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState039
      | OPDIV ->
          _menhir_run_052 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState039
      | NOUVEAU ->
          _menhir_run_053 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState039
      | IDENT _v_0 ->
          _menhir_run_064 _menhir_stack _menhir_lexbuf _menhir_lexer _v_0 MenhirState039
      | FLOTTANT _ ->
          _menhir_run_067 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState039
      | ENTIER _ ->
          _menhir_run_068 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState039
      | CARACTERE _ ->
          _menhir_run_069 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState039
      | BOOLEEN _ ->
          _menhir_run_070 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState039
      | ASSIGN ->
          _menhir_run_071 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState039
      | ACCFER ->
          let _v_5 = _menhir_action_49 () in
          _menhir_run_117 _menhir_stack _menhir_lexbuf _menhir_lexer _v_5
      | _ ->
          _menhir_fail ()
  
  and _menhir_run_104 : type  ttv_stack. (((ttv_stack, _menhir_box_fichier) _menhir_cell1_TANTQUE, _menhir_box_fichier) _menhir_cell1_expression, _menhir_box_fichier) _menhir_cell1_PARFER -> _ -> _ -> _ -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _tok ->
      let MenhirCell1_PARFER (_menhir_stack, _) = _menhir_stack in
      let MenhirCell1_expression (_menhir_stack, _, _) = _menhir_stack in
      let MenhirCell1_TANTQUE (_menhir_stack, _menhir_s) = _menhir_stack in
      let _v = _menhir_action_47 () in
      _menhir_goto_instruction _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
  
  and _menhir_run_075 : type  ttv_stack. ((ttv_stack, _menhir_box_fichier) _menhir_cell1_expression as 'stack) -> _ -> _ -> ('stack, _menhir_box_fichier) _menhir_state -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _menhir_stack = MenhirCell1_OPPLUS (_menhir_stack, _menhir_s) in
      let _menhir_s = MenhirState075 in
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | VIDE ->
          _menhir_run_040 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | PAROUV ->
          _menhir_run_043 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPSUPEG ->
          _menhir_run_044 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPSUP ->
          _menhir_run_045 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPPT ->
          _menhir_run_046 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPPLUS ->
          _menhir_run_047 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPOU ->
          _menhir_run_058 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPNONEG ->
          _menhir_run_059 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPNON ->
          _menhir_run_048 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPMULT ->
          _menhir_run_049 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPMOINS ->
          _menhir_run_060 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPMOD ->
          _menhir_run_050 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPINFEG ->
          _menhir_run_061 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPINF ->
          _menhir_run_062 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPET ->
          _menhir_run_051 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPEG ->
          _menhir_run_063 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPDIV ->
          _menhir_run_052 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | NOUVEAU ->
          _menhir_run_053 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | IDENT _v ->
          _menhir_run_064 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s
      | FLOTTANT _ ->
          _menhir_run_067 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | ENTIER _ ->
          _menhir_run_068 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | CARACTERE _ ->
          _menhir_run_069 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | BOOLEEN _ ->
          _menhir_run_070 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | ASSIGN ->
          _menhir_run_071 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | _ ->
          _eRR ()
  
  and _menhir_run_078 : type  ttv_stack. ((ttv_stack, _menhir_box_fichier) _menhir_cell1_expression as 'stack) -> _ -> _ -> ('stack, _menhir_box_fichier) _menhir_state -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _menhir_stack = MenhirCell1_OPMULT (_menhir_stack, _menhir_s) in
      let _menhir_s = MenhirState078 in
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | VIDE ->
          _menhir_run_040 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | PAROUV ->
          _menhir_run_043 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPSUPEG ->
          _menhir_run_044 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPSUP ->
          _menhir_run_045 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPPT ->
          _menhir_run_046 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPPLUS ->
          _menhir_run_047 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPOU ->
          _menhir_run_058 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPNONEG ->
          _menhir_run_059 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPNON ->
          _menhir_run_048 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPMULT ->
          _menhir_run_049 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPMOINS ->
          _menhir_run_060 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPMOD ->
          _menhir_run_050 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPINFEG ->
          _menhir_run_061 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPINF ->
          _menhir_run_062 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPET ->
          _menhir_run_051 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPEG ->
          _menhir_run_063 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPDIV ->
          _menhir_run_052 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | NOUVEAU ->
          _menhir_run_053 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | IDENT _v ->
          _menhir_run_064 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s
      | FLOTTANT _ ->
          _menhir_run_067 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | ENTIER _ ->
          _menhir_run_068 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | CARACTERE _ ->
          _menhir_run_069 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | BOOLEEN _ ->
          _menhir_run_070 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | ASSIGN ->
          _menhir_run_071 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | _ ->
          _eRR ()
  
  and _menhir_run_113 : type  ttv_stack. ((ttv_stack, _menhir_box_fichier) _menhir_cell1_RETOUR as 'stack) -> _ -> _ -> _ -> ('stack, _menhir_box_fichier) _menhir_state -> _ -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      match (_tok : MenhirBasics.token) with
      | PTVIRG ->
          let _tok = _menhir_lexer _menhir_lexbuf in
          let MenhirCell1_RETOUR (_menhir_stack, _menhir_s) = _menhir_stack in
          let _v = _menhir_action_48 () in
          _menhir_goto_instruction _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | OPPLUS ->
          let _menhir_stack = MenhirCell1_expression (_menhir_stack, _menhir_s, _v) in
          _menhir_run_075 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState113
      | OPMULT ->
          let _menhir_stack = MenhirCell1_expression (_menhir_stack, _menhir_s, _v) in
          _menhir_run_078 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState113
      | _ ->
          _eRR ()
  
  and _menhir_run_107 : type  ttv_stack. ((ttv_stack, _menhir_box_fichier) _menhir_cell1_SI as 'stack) -> _ -> _ -> _ -> ('stack, _menhir_box_fichier) _menhir_state -> _ -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      let _menhir_stack = MenhirCell1_expression (_menhir_stack, _menhir_s, _v) in
      match (_tok : MenhirBasics.token) with
      | PARFER ->
          let _menhir_stack = MenhirCell1_PARFER (_menhir_stack, MenhirState107) in
          let _menhir_s = MenhirState108 in
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | ACCOUV ->
              _menhir_run_038 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | _ ->
              _eRR ())
      | OPPLUS ->
          _menhir_run_075 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState107
      | OPMULT ->
          _menhir_run_078 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState107
      | _ ->
          _eRR ()
  
  and _menhir_run_102 : type  ttv_stack. ((ttv_stack, _menhir_box_fichier) _menhir_cell1_TANTQUE as 'stack) -> _ -> _ -> _ -> ('stack, _menhir_box_fichier) _menhir_state -> _ -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      let _menhir_stack = MenhirCell1_expression (_menhir_stack, _menhir_s, _v) in
      match (_tok : MenhirBasics.token) with
      | PARFER ->
          let _menhir_stack = MenhirCell1_PARFER (_menhir_stack, MenhirState102) in
          let _menhir_s = MenhirState103 in
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | ACCOUV ->
              _menhir_run_038 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | _ ->
              _eRR ())
      | OPPLUS ->
          _menhir_run_075 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState102
      | OPMULT ->
          _menhir_run_078 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState102
      | _ ->
          _eRR ()
  
  and _menhir_run_099 : type  ttv_stack. ((ttv_stack, _menhir_box_fichier) _menhir_cell1_PAROUV as 'stack) -> _ -> _ -> _ -> ('stack, _menhir_box_fichier) _menhir_state -> _ -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      let _menhir_stack = MenhirCell1_expression (_menhir_stack, _menhir_s, _v) in
      match (_tok : MenhirBasics.token) with
      | PARFER ->
          let _menhir_stack = MenhirCell1_PARFER (_menhir_stack, MenhirState099) in
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | PAROUV ->
              _menhir_run_065 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState100
          | CROOUV ->
              _menhir_run_088 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState100
          | CROFER | OPMULT | OPPLUS | PARFER | PTVIRG | VIRG ->
              let _ = _menhir_action_60 () in
              _menhir_run_101 _menhir_stack _menhir_lexbuf _menhir_lexer _tok
          | _ ->
              _eRR ())
      | OPPLUS ->
          _menhir_run_075 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState099
      | OPMULT ->
          _menhir_run_078 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState099
      | _ ->
          _eRR ()
  
  and _menhir_run_096 : type  ttv_stack. (ttv_stack, _menhir_box_fichier) _menhir_cell1_OPPLUS -> _ -> _ -> _ -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _tok ->
      let MenhirCell1_OPPLUS (_menhir_stack, _menhir_s) = _menhir_stack in
      let _ = _menhir_action_38 () in
      _menhir_goto_expression_int _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
  
  and _menhir_run_094 : type  ttv_stack. ((ttv_stack, _menhir_box_fichier) _menhir_cell1_NOUVEAU _menhir_cell0_IDENT as 'stack) -> _ -> _ -> _ -> ('stack, _menhir_box_fichier) _menhir_state -> _ -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      match (_tok : MenhirBasics.token) with
      | OPPLUS ->
          let _menhir_stack = MenhirCell1_expression (_menhir_stack, _menhir_s, _v) in
          _menhir_run_075 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState094
      | OPMULT ->
          let _menhir_stack = MenhirCell1_expression (_menhir_stack, _menhir_s, _v) in
          _menhir_run_078 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState094
      | CROFER ->
          let _tok = _menhir_lexer _menhir_lexbuf in
          let MenhirCell0_IDENT (_menhir_stack, _) = _menhir_stack in
          let MenhirCell1_NOUVEAU (_menhir_stack, _menhir_s) = _menhir_stack in
          let _ = _menhir_action_33 () in
          _menhir_goto_expression_int _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
      | _ ->
          _eRR ()
  
  and _menhir_run_089 : type  ttv_stack. ((ttv_stack, _menhir_box_fichier) _menhir_cell1_CROOUV as 'stack) -> _ -> _ -> _ -> ('stack, _menhir_box_fichier) _menhir_state -> _ -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      match (_tok : MenhirBasics.token) with
      | OPPLUS ->
          let _menhir_stack = MenhirCell1_expression (_menhir_stack, _menhir_s, _v) in
          _menhir_run_075 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState089
      | OPMULT ->
          let _menhir_stack = MenhirCell1_expression (_menhir_stack, _menhir_s, _v) in
          _menhir_run_078 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState089
      | CROFER ->
          let _tok = _menhir_lexer _menhir_lexbuf in
          let MenhirCell1_CROOUV (_menhir_stack, _menhir_s) = _menhir_stack in
          let _v = _menhir_action_59 () in
          _menhir_goto_suffixe _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | _ ->
          _eRR ()
  
  and _menhir_run_083 : type  ttv_stack. (((ttv_stack, _menhir_box_fichier) _menhir_cell1_expression, _menhir_box_fichier) _menhir_cell1_VIRG as 'stack) -> _ -> _ -> _ -> ('stack, _menhir_box_fichier) _menhir_state -> _ -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      let _menhir_stack = MenhirCell1_expression (_menhir_stack, _menhir_s, _v) in
      match (_tok : MenhirBasics.token) with
      | VIRG ->
          _menhir_run_082 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState083
      | OPPLUS ->
          _menhir_run_075 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState083
      | OPMULT ->
          _menhir_run_078 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState083
      | PARFER ->
          let _ = _menhir_action_25 () in
          _menhir_run_084 _menhir_stack _menhir_lexbuf _menhir_lexer
      | _ ->
          _eRR ()
  
  and _menhir_run_082 : type  ttv_stack. ((ttv_stack, _menhir_box_fichier) _menhir_cell1_expression as 'stack) -> _ -> _ -> ('stack, _menhir_box_fichier) _menhir_state -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _menhir_stack = MenhirCell1_VIRG (_menhir_stack, _menhir_s) in
      let _menhir_s = MenhirState082 in
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | VIDE ->
          _menhir_run_040 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | PAROUV ->
          _menhir_run_043 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPSUPEG ->
          _menhir_run_044 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPSUP ->
          _menhir_run_045 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPPT ->
          _menhir_run_046 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPPLUS ->
          _menhir_run_047 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPOU ->
          _menhir_run_058 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPNONEG ->
          _menhir_run_059 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPNON ->
          _menhir_run_048 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPMULT ->
          _menhir_run_049 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPMOINS ->
          _menhir_run_060 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPMOD ->
          _menhir_run_050 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPINFEG ->
          _menhir_run_061 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPINF ->
          _menhir_run_062 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPET ->
          _menhir_run_051 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPEG ->
          _menhir_run_063 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | OPDIV ->
          _menhir_run_052 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | NOUVEAU ->
          _menhir_run_053 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | IDENT _v ->
          _menhir_run_064 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s
      | FLOTTANT _ ->
          _menhir_run_067 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | ENTIER _ ->
          _menhir_run_068 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | CARACTERE _ ->
          _menhir_run_069 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | BOOLEEN _ ->
          _menhir_run_070 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | ASSIGN ->
          _menhir_run_071 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | _ ->
          _eRR ()
  
  and _menhir_run_084 : type  ttv_stack. (((ttv_stack, _menhir_box_fichier) _menhir_cell1_expression, _menhir_box_fichier) _menhir_cell1_VIRG, _menhir_box_fichier) _menhir_cell1_expression -> _ -> _ -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer ->
      let MenhirCell1_expression (_menhir_stack, _, _) = _menhir_stack in
      let MenhirCell1_VIRG (_menhir_stack, _menhir_s) = _menhir_stack in
      let _ = _menhir_action_26 () in
      _menhir_goto_expression_aux _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
  
  and _menhir_goto_expression_aux : type  ttv_stack. ((ttv_stack, _menhir_box_fichier) _menhir_cell1_expression as 'stack) -> _ -> _ -> ('stack, _menhir_box_fichier) _menhir_state -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      match _menhir_s with
      | MenhirState081 ->
          _menhir_run_086 _menhir_stack _menhir_lexbuf _menhir_lexer
      | MenhirState083 ->
          _menhir_run_084 _menhir_stack _menhir_lexbuf _menhir_lexer
      | _ ->
          _menhir_fail ()
  
  and _menhir_run_086 : type  ttv_stack. ((ttv_stack, _menhir_box_fichier) _menhir_cell1_PAROUV, _menhir_box_fichier) _menhir_cell1_expression -> _ -> _ -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      let MenhirCell1_expression (_menhir_stack, _, _) = _menhir_stack in
      let MenhirCell1_PAROUV (_menhir_stack, _menhir_s) = _menhir_stack in
      let _v = _menhir_action_58 () in
      _menhir_goto_suffixe _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
  
  and _menhir_run_081 : type  ttv_stack. ((ttv_stack, _menhir_box_fichier) _menhir_cell1_PAROUV as 'stack) -> _ -> _ -> _ -> ('stack, _menhir_box_fichier) _menhir_state -> _ -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      match (_tok : MenhirBasics.token) with
      | VIRG ->
          let _menhir_stack = MenhirCell1_expression (_menhir_stack, _menhir_s, _v) in
          _menhir_run_082 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState081
      | PARFER ->
          let _tok = _menhir_lexer _menhir_lexbuf in
          let MenhirCell1_PAROUV (_menhir_stack, _menhir_s) = _menhir_stack in
          let _v = _menhir_action_57 () in
          _menhir_goto_suffixe _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | OPPLUS ->
          let _menhir_stack = MenhirCell1_expression (_menhir_stack, _menhir_s, _v) in
          _menhir_run_075 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState081
      | OPMULT ->
          let _menhir_stack = MenhirCell1_expression (_menhir_stack, _menhir_s, _v) in
          _menhir_run_078 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState081
      | _ ->
          _eRR ()
  
  and _menhir_run_079 : type  ttv_stack. ((ttv_stack, _menhir_box_fichier) _menhir_cell1_expression, _menhir_box_fichier) _menhir_cell1_OPMULT -> _ -> _ -> _ -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _tok ->
      let MenhirCell1_OPMULT (_menhir_stack, _) = _menhir_stack in
      let MenhirCell1_expression (_menhir_stack, _menhir_s, _) = _menhir_stack in
      let _ = _menhir_action_37 () in
      _menhir_goto_expression_int _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
  
  and _menhir_run_077 : type  ttv_stack. (((ttv_stack, _menhir_box_fichier) _menhir_cell1_expression, _menhir_box_fichier) _menhir_cell1_OPPLUS as 'stack) -> _ -> _ -> _ -> ('stack, _menhir_box_fichier) _menhir_state -> _ -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      match (_tok : MenhirBasics.token) with
      | OPMULT ->
          let _menhir_stack = MenhirCell1_expression (_menhir_stack, _menhir_s, _v) in
          _menhir_run_078 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState077
      | CROFER | OPPLUS | PARFER | PTVIRG | VIRG ->
          let MenhirCell1_OPPLUS (_menhir_stack, _) = _menhir_stack in
          let MenhirCell1_expression (_menhir_stack, _menhir_s, _) = _menhir_stack in
          let _ = _menhir_action_36 () in
          _menhir_goto_expression_int _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
      | _ ->
          _eRR ()
  
  and _menhir_run_074 : type  ttv_stack. ((ttv_stack, _menhir_box_fichier) _menhir_cell1_unaire as 'stack) -> _ -> _ -> _ -> ('stack, _menhir_box_fichier) _menhir_state -> _ -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      let _menhir_stack = MenhirCell1_expression (_menhir_stack, _menhir_s, _v) in
      match (_tok : MenhirBasics.token) with
      | OPPLUS ->
          _menhir_run_075 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState074
      | OPMULT ->
          _menhir_run_078 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState074
      | _ ->
          _eRR ()
  
  and _menhir_run_073 : type  ttv_stack. ((ttv_stack, _menhir_box_fichier) _menhir_cell1_unaire as 'stack) -> _ -> _ -> ('stack, _menhir_box_fichier) _menhir_state -> _ -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok ->
      match (_tok : MenhirBasics.token) with
      | OPMULT | OPPLUS ->
          let _v = _menhir_action_22 () in
          _menhir_goto_expression _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | CROFER | PARFER | PTVIRG | VIRG ->
          let MenhirCell1_unaire (_menhir_stack, _menhir_s, _) = _menhir_stack in
          let _v = _menhir_action_23 () in
          _menhir_goto_expression _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | _ ->
          _eRR ()
  
  and _menhir_run_016 : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _ -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      let _menhir_stack = MenhirCell1_typeBase (_menhir_stack, _menhir_s, _v) in
      match (_tok : MenhirBasics.token) with
      | CROOUV ->
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | CROFER ->
              let _tok = _menhir_lexer _menhir_lexbuf in
              let _ = _menhir_action_19 () in
              _menhir_goto_declTab _menhir_stack _menhir_lexbuf _menhir_lexer _tok
          | _ ->
              _eRR ())
      | IDENT _ ->
          let _ = _menhir_action_18 () in
          _menhir_goto_declTab _menhir_stack _menhir_lexbuf _menhir_lexer _tok
      | _ ->
          _eRR ()
  
  and _menhir_goto_declTab : type  ttv_stack. (ttv_stack, _menhir_box_fichier) _menhir_cell1_typeBase -> _ -> _ -> _ -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _tok ->
      let MenhirCell1_typeBase (_menhir_stack, _menhir_s, _) = _menhir_stack in
      let _v = _menhir_action_70 () in
      _menhir_goto_typeStruct _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
  
  and _menhir_goto_typeStruct : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _ -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      match _menhir_s with
      | MenhirState038 ->
          _menhir_run_124 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
      | MenhirState122 ->
          _menhir_run_124 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok
      | MenhirState035 ->
          _menhir_run_025 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | MenhirState032 ->
          _menhir_run_025 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | MenhirState000 ->
          _menhir_run_025 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | MenhirState012 ->
          _menhir_run_013 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | MenhirState027 ->
          _menhir_run_010 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | MenhirState003 ->
          _menhir_run_010 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | _ ->
          _menhir_fail ()
  
  and _menhir_run_124 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _ -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s _tok ->
      match (_tok : MenhirBasics.token) with
      | IDENT _ ->
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | PTVIRG ->
              let _tok = _menhir_lexer _menhir_lexbuf in
              let _v = _menhir_action_75 () in
              let _menhir_stack = MenhirCell1_variable (_menhir_stack, _menhir_s, _v) in
              (match (_tok : MenhirBasics.token) with
              | TYPEIDENT _ ->
                  _menhir_run_004 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState122
              | STRING ->
                  _menhir_run_005 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState122
              | INT ->
                  _menhir_run_006 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState122
              | FLOAT ->
                  _menhir_run_007 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState122
              | CHAR ->
                  _menhir_run_008 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState122
              | BOOL ->
                  _menhir_run_009 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState122
              | ACCFER | ASSIGN | BOOLEEN _ | CARACTERE _ | ENTIER _ | FLOTTANT _ | IDENT _ | NOUVEAU | OPDIV | OPEG | OPET | OPINF | OPINFEG | OPMOD | OPMOINS | OPMULT | OPNON | OPNONEG | OPOU | OPPLUS | OPPT | OPSUP | OPSUPEG | PAROUV | RETOUR | SI | TANTQUE | VIDE ->
                  let _v_1 = _menhir_action_76 () in
                  _menhir_run_123 _menhir_stack _menhir_lexbuf _menhir_lexer _v_1 _tok
              | _ ->
                  _eRR ())
          | _ ->
              _eRR ())
      | _ ->
          _eRR ()
  
  and _menhir_run_123 : type  ttv_stack. (ttv_stack, _menhir_box_fichier) _menhir_cell1_variable -> _ -> _ -> _ -> _ -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _tok ->
      let MenhirCell1_variable (_menhir_stack, _menhir_s, _) = _menhir_stack in
      let _2 = _v in
      let _v = _menhir_action_77 _2 in
      _menhir_goto_variables _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
  
  and _menhir_goto_variables : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _ -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      match _menhir_s with
      | MenhirState122 ->
          _menhir_run_123 _menhir_stack _menhir_lexbuf _menhir_lexer _v _tok
      | MenhirState038 ->
          _menhir_run_039 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | _ ->
          _menhir_fail ()
  
  and _menhir_run_025 : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _ -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      let _menhir_stack = MenhirCell1_typeStruct (_menhir_stack, _menhir_s, _v) in
      match (_tok : MenhirBasics.token) with
      | IDENT _v_0 ->
          let _menhir_stack = MenhirCell0_IDENT (_menhir_stack, _v_0) in
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | PAROUV ->
              let _tok = _menhir_lexer _menhir_lexbuf in
              (match (_tok : MenhirBasics.token) with
              | TYPEIDENT _ ->
                  _menhir_run_004 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState027
              | STRING ->
                  _menhir_run_005 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState027
              | INT ->
                  _menhir_run_006 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState027
              | FLOAT ->
                  _menhir_run_007 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState027
              | CHAR ->
                  _menhir_run_008 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState027
              | BOOL ->
                  _menhir_run_009 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState027
              | PARFER ->
                  let _ = _menhir_action_52 () in
                  _menhir_run_028 _menhir_stack _menhir_lexbuf _menhir_lexer
              | _ ->
                  _eRR ())
          | _ ->
              _eRR ())
      | _ ->
          _eRR ()
  
  and _menhir_run_028 : type  ttv_stack. (ttv_stack, _menhir_box_fichier) _menhir_cell1_typeStruct _menhir_cell0_IDENT -> _ -> _ -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      let MenhirCell0_IDENT (_menhir_stack, _) = _menhir_stack in
      let MenhirCell1_typeStruct (_menhir_stack, _menhir_s, _) = _menhir_stack in
      let _v = _menhir_action_20 () in
      _menhir_goto_entete _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
  
  and _menhir_goto_entete : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _ -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      let _menhir_stack = MenhirCell1_entete (_menhir_stack, _menhir_s, _v) in
      match (_tok : MenhirBasics.token) with
      | ACCOUV ->
          _menhir_run_038 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState037
      | _ ->
          _eRR ()
  
  and _menhir_run_013 : type  ttv_stack. (((ttv_stack, _menhir_box_fichier) _menhir_cell1_typeStruct _menhir_cell0_IDENT, _menhir_box_fichier) _menhir_cell1_VIRG as 'stack) -> _ -> _ -> _ -> ('stack, _menhir_box_fichier) _menhir_state -> _ -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      let _menhir_stack = MenhirCell1_typeStruct (_menhir_stack, _menhir_s, _v) in
      match (_tok : MenhirBasics.token) with
      | IDENT _v_0 ->
          let _menhir_stack = MenhirCell0_IDENT (_menhir_stack, _v_0) in
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | VIRG ->
              _menhir_run_012 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState014
          | PARFER ->
              let _ = _menhir_action_62 () in
              _menhir_run_015 _menhir_stack _menhir_lexbuf _menhir_lexer
          | _ ->
              _eRR ())
      | _ ->
          _eRR ()
  
  and _menhir_run_012 : type  ttv_stack. ((ttv_stack, _menhir_box_fichier) _menhir_cell1_typeStruct _menhir_cell0_IDENT as 'stack) -> _ -> _ -> ('stack, _menhir_box_fichier) _menhir_state -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _menhir_stack = MenhirCell1_VIRG (_menhir_stack, _menhir_s) in
      let _menhir_s = MenhirState012 in
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | TYPEIDENT _ ->
          _menhir_run_004 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | STRING ->
          _menhir_run_005 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | INT ->
          _menhir_run_006 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | FLOAT ->
          _menhir_run_007 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | CHAR ->
          _menhir_run_008 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | BOOL ->
          _menhir_run_009 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | _ ->
          _eRR ()
  
  and _menhir_run_015 : type  ttv_stack. (((ttv_stack, _menhir_box_fichier) _menhir_cell1_typeStruct _menhir_cell0_IDENT, _menhir_box_fichier) _menhir_cell1_VIRG, _menhir_box_fichier) _menhir_cell1_typeStruct _menhir_cell0_IDENT -> _ -> _ -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer ->
      let MenhirCell0_IDENT (_menhir_stack, _) = _menhir_stack in
      let MenhirCell1_typeStruct (_menhir_stack, _, _) = _menhir_stack in
      let MenhirCell1_VIRG (_menhir_stack, _menhir_s) = _menhir_stack in
      let _ = _menhir_action_63 () in
      _menhir_goto_suiteParsFormels _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
  
  and _menhir_goto_suiteParsFormels : type  ttv_stack. ((ttv_stack, _menhir_box_fichier) _menhir_cell1_typeStruct _menhir_cell0_IDENT as 'stack) -> _ -> _ -> ('stack, _menhir_box_fichier) _menhir_state -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      match _menhir_s with
      | MenhirState011 ->
          _menhir_run_020 _menhir_stack _menhir_lexbuf _menhir_lexer
      | MenhirState014 ->
          _menhir_run_015 _menhir_stack _menhir_lexbuf _menhir_lexer
      | _ ->
          _menhir_fail ()
  
  and _menhir_run_020 : type  ttv_stack. (ttv_stack _menhir_cell0_IDENT, _menhir_box_fichier) _menhir_cell1_typeStruct _menhir_cell0_IDENT -> _ -> _ -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer ->
      let MenhirCell0_IDENT (_menhir_stack, _) = _menhir_stack in
      let MenhirCell1_typeStruct (_menhir_stack, _menhir_s, _) = _menhir_stack in
      let _ = _menhir_action_53 () in
      _menhir_goto_parsFormels _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
  
  and _menhir_goto_parsFormels : type  ttv_stack. (ttv_stack _menhir_cell0_IDENT as 'stack) -> _ -> _ -> ('stack, _menhir_box_fichier) _menhir_state -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      match _menhir_s with
      | MenhirState027 ->
          _menhir_run_028 _menhir_stack _menhir_lexbuf _menhir_lexer
      | MenhirState003 ->
          _menhir_run_021 _menhir_stack _menhir_lexbuf _menhir_lexer
      | _ ->
          _menhir_fail ()
  
  and _menhir_run_021 : type  ttv_stack. (ttv_stack, _menhir_box_fichier) _menhir_cell1_VOID _menhir_cell0_IDENT -> _ -> _ -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      let MenhirCell0_IDENT (_menhir_stack, _) = _menhir_stack in
      let MenhirCell1_VOID (_menhir_stack, _menhir_s) = _menhir_stack in
      let _v = _menhir_action_21 () in
      _menhir_goto_entete _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
  
  and _menhir_run_010 : type  ttv_stack. (ttv_stack _menhir_cell0_IDENT as 'stack) -> _ -> _ -> _ -> ('stack, _menhir_box_fichier) _menhir_state -> _ -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      let _menhir_stack = MenhirCell1_typeStruct (_menhir_stack, _menhir_s, _v) in
      match (_tok : MenhirBasics.token) with
      | IDENT _v_0 ->
          let _menhir_stack = MenhirCell0_IDENT (_menhir_stack, _v_0) in
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | VIRG ->
              _menhir_run_012 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState011
          | PARFER ->
              let _ = _menhir_action_62 () in
              _menhir_run_020 _menhir_stack _menhir_lexbuf _menhir_lexer
          | _ ->
              _eRR ())
      | _ ->
          _eRR ()
  
  let _menhir_run_032 : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _ -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      let _menhir_stack = MenhirCell1_imports (_menhir_stack, _menhir_s, _v) in
      match (_tok : MenhirBasics.token) with
      | VOID ->
          _menhir_run_001 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState032
      | TYPEIDENT _ ->
          _menhir_run_004 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState032
      | STRING ->
          _menhir_run_005 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState032
      | INT ->
          _menhir_run_006 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState032
      | FLOAT ->
          _menhir_run_007 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState032
      | CHAR ->
          _menhir_run_008 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState032
      | BOOL ->
          _menhir_run_009 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState032
      | FIN ->
          let _ = _menhir_action_54 () in
          _menhir_run_033 _menhir_stack
      | _ ->
          _menhir_fail ()
  
  let rec _menhir_run_024 : type  ttv_stack. (ttv_stack, _menhir_box_fichier) _menhir_cell1_IMPORT -> _ -> _ -> _ -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _tok ->
      let MenhirCell1_IMPORT (_menhir_stack, _menhir_s) = _menhir_stack in
      let _v = _menhir_action_43 () in
      _menhir_goto_imports _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
  
  and _menhir_goto_imports : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _ -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      match _menhir_s with
      | MenhirState000 ->
          _menhir_run_032 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | MenhirState023 ->
          _menhir_run_024 _menhir_stack _menhir_lexbuf _menhir_lexer _tok
      | _ ->
          _menhir_fail ()
  
  let rec _menhir_run_023 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_fichier) _menhir_state -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _menhir_stack = MenhirCell1_IMPORT (_menhir_stack, _menhir_s) in
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | IMPORT ->
          _menhir_run_023 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState023
      | BOOL | CHAR | FIN | FLOAT | INT | STRING | TYPEIDENT _ | VOID ->
          let _ = _menhir_action_42 () in
          _menhir_run_024 _menhir_stack _menhir_lexbuf _menhir_lexer _tok
      | _ ->
          _eRR ()
  
  let _menhir_run_000 : type  ttv_stack. ttv_stack -> _ -> _ -> _menhir_box_fichier =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | VOID ->
          _menhir_run_001 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState000
      | TYPEIDENT _ ->
          _menhir_run_004 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState000
      | STRING ->
          _menhir_run_005 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState000
      | INT ->
          _menhir_run_006 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState000
      | IMPORT ->
          _menhir_run_023 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState000
      | FLOAT ->
          _menhir_run_007 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState000
      | CHAR ->
          _menhir_run_008 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState000
      | BOOL ->
          _menhir_run_009 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState000
      | FIN ->
          let _v = _menhir_action_42 () in
          _menhir_run_032 _menhir_stack _menhir_lexbuf _menhir_lexer _v MenhirState000 _tok
      | _ ->
          _eRR ()
  
end

let fichier =
  fun _menhir_lexer _menhir_lexbuf ->
    let _menhir_stack = () in
    let MenhirBox_fichier v = _menhir_run_000 _menhir_stack _menhir_lexbuf _menhir_lexer in
    v

# 177 "parserJava.mly"
  

# 3145 "parserJava.ml"
