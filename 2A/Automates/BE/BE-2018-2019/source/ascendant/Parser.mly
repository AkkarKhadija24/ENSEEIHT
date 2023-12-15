(* AKKAR KHADIJA *)
%{

(* Partie recopiee dans le fichier CaML genere. *)
(* Ouverture de modules exploites dans les actions *)
(* Declarations de types, de constantes, de fonctions, d'exceptions exploites dans les actions *)

%}

/* Declaration des unites lexicales et de leur type si une valeur particuliere leur est associee */

%token UL_ACCOUV UL_ACCFER UL_CROOUV UL_CROFER
%token UL_DBLPT UL_VIRG
%token UL_VIDE
%token UL_VRAI UL_FAUX

/* Defini le type des donnees associees a l'unite lexicale */

%token <string> UL_CHAINE
%token <int> UL_NOMBRE

/* Unite lexicale particuliere qui represente la fin du fichier */

%token UL_FIN

/* Type renvoye pour le nom terminal document */
%type <unit> document

/* Le non terminal document est l'axiome */
%start document

%% /* Regles de productions */


 document : UL_ACCOUV liste_attributs UL_ACCFER UL_FIN   { (print_endline "D : { ... } ") }

liste_attributs : /* Lambda, mot vide */                { (print_endline "LA : /* Lambda, mot vide */") }
                | attribut                              { (print_endline "LA : attribut ") }
                | attribut UL_VIRG liste_attributs      { (print_endline "LA : attribut ,")  }
attribut : UL_CHAINE UL_DBLPT valeur { (print_endline "A :UL_CHAINE UL_DBLPT valeur") }

valeur : UL_CHAINE {(print_endline " V: CHAINE");}
        | UL_NOMBRE {(print_endline " V: NOMBRE");}
        | UL_VRAI {(print_endline " V: VRAI");}
        | UL_FAUX {(print_endline " V: FAUX");}
        | UL_VIDE {(print_endline " V: VIDE");}
        | UL_ACCOUV liste_attributs UL_ACCFER  {(print_endline " V: document");}
        | tableau {(print_endline " V: tableau");}

tableau : UL_CROOUV liste_valeur UL_CROFER { (print_endline "T : [ LV ] ") }
        | UL_CROOUV valeur liste_valeur UL_CROFER { (print_endline "T : [ V LV ] ") }

liste_valeur : /* Lambda, mot vide */ { (print_endline "LV : [...]") }
                | UL_VIRG valeur liste_valeur { (print_endline "LV : , V LV") }


%%
