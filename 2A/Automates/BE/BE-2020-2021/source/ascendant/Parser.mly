(* AKKAR KHADIJA *)
%{

(* Partie recopiee dans le fichier CaML genere. *)
(* Ouverture de modules exploites dans les actions *)
(* Declarations de types, de constantes, de fonctions, d'exceptions exploites dans les actions *)

%}

/* Declaration des unites lexicales et de leur type si une valeur particuliere leur est associee */

%token UL_MACHINE 
%token UL_ACCOUV UL_ACCFER
%token UL_PT
%token UL_EVENT UL_REGION UL_STATE UL_FROM UL_TO UL_ON UL_STARTS UL_ENDS

/* Defini le type des donnees associees a l'unite lexicale */

%token <string> UL_IDENT

/* Unite lexicale particuliere qui represente la fin du fichier */

%token UL_FIN

/* Type renvoye pour le nom terminal document */
%type <unit> machine

/* Le non terminal document est l'axiome */
%start machine

%% /* Regles de productions */

machine : UL_MACHINE UL_IDENT UL_ACCOUV suite_mach UL_ACCFER UL_FIN { (print_endline "machine : MACHINE IDENT { ... } FIN ") }

suite_mach : /*lamba mot vide */ {(print_endline "suite_mach :vide ")}
            | UL_EVENT UL_IDENT suite_mach {(print_endline "suite_mach : EVENT IDENT ")}
            | transition suite_mach {(print_endline "suite_mach : transition")}
            | region suite_mach {(print_endline "suite_mach : REGION")}

transition : UL_FROM nomQualifie UL_TO nomQualifie UL_ON UL_IDENT {(print_endline "transition : from nomQualifie to nomQualifie on iden")}

nomQualifie : UL_IDENT {(print_endline "nomQualifie : ident")}
            | UL_IDENT UL_PT nomQualifie {(print_endline "nomQualifie :")}

region : UL_REGION UL_IDENT UL_ACCOUV etat_aux UL_ACCFER {(print_endline "region : region ident { etat+ }")}

etat_aux : /*lambda mot vide */ {(print_endline "etat_aux :vide")}
        | etat etat_aux {(print_endline "etat_aux :etat+")}

etat : UL_STATE UL_IDENT A B C {(print_endline "etat : state ident general")}
        
A : /*lambda mot vide */ {(print_endline "A :vide")}
    | UL_STARTS {(print_endline "A : starts")}
B : /*lambda mot vide */ {(print_endline "B :vide")}
    |UL_ENDS {(print_endline "B : ends")}
C : /*lambda mot vide */ {(print_endline "C :vide")}
    |UL_ACCOUV region_aux UL_ACCFER  {(print_endline "c : region+")}
    
region_aux : /*lambda mot vide */ {(print_endline "region_aux :vide")}
        | region region_aux {(print_endline "region_aux :region+")}
%%
