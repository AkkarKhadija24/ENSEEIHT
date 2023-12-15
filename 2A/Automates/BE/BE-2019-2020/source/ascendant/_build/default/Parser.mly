%{

(* Partie recopiee dans le fichier CaML genere. *)
(* Ouverture de modules exploites dans les actions *)
(* Declarations de types, de constantes, de fonctions, d'exceptions exploites dans les actions *)

%}

/* Declaration des unites lexicales et de leur type si une valeur particuliere leur est associee */

%token UL_PAROUV UL_PARFER
%token UL_PT UL_VIRG

/* Defini le type des donnees associees a l'unite lexicale */

%token <string> UL_SYMBOLE
%token <string> UL_VARIABLE

/* Unite lexicale particuliere qui represente la fin du fichier */
%token UL_ECHEC
%token UL_COUPURE
%token UL_NEGATION
%token UL_DEDUCTION


/* Unite lexicale particuliere qui represente la fin du fichier */

%token UL_FIN

/* Type renvoye pour le nom terminal document */
%type <unit> programme

/* Le non terminal document est l'axiome */
%start programme

%% /* Regles de productions */

programme : regle suite_regle UL_FIN { (print_endline "programme : regle suite_regle FIN ") }

regle : axiome | deduction { (print_endline "regle : axiome/deduction") }

axiome : predicat UL_PT { (print_endline "axiome : predicat.") }

deduction : predicat UL_DEDUCTION suite_ded UL_PT { (print_endline "deduction : predicat :- suite_ded .")}

suite_ded : deduction_aux { (print_endline "suite_ded : deduction_aux") }
            | deduction_aux UL_VIRG suite_ded { (print_endline "suite_ded : deduction_aux , deduction_aux") }

deduction_aux : predicat { (print_endline "deduction_aux : redicat ") }
            | UL_NEGATION predicat { (print_endline "deduction_aux : - predicat") }
            | UL_ECHEC  { (print_endline "deduction_aux :  fail ") }
            | UL_COUPURE { (print_endline "deduction_aux :  ! ") }

predicat : UL_SYMBOLE UL_PAROUV suite_var UL_PARFER { (print_endline "predicat :  symbole ( suite_var ) ") }

suite_var : UL_VARIABLE { (print_endline "suite_var :  variable ") }
            | terme { (print_endline "suite_var :  terme ") }
            | UL_VARIABLE UL_VIRG suite_var { (print_endline "suite_var :  variable, suite_var ") }
            | terme UL_VIRG suite_var { (print_endline "suite_var :  terme, suite_var ") }

terme : UL_SYMBOLE { (print_endline "terme : symbol ") }
        | predicat { (print_endline "terme : predicat ") }
        
suite_regle : /*Lambda mot vide*/ { (print_endline "suite_regle : vide") }
            | regle suite_regle { (print_endline "suite_regle : suite de regles") }
%%
