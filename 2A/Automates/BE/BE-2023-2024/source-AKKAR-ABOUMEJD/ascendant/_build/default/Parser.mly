%{

(* Partie recopiee dans le fichier CaML genere. *)
(* Ouverture de modules exploites dans les actions *)
(* Declarations de types, de constantes, de fonctions, d'exceptions exploites dans les actions *)

%}

/* Declaration des unites lexicales et de leur type si une valeur particuliere leur est associee */

%token UL_PACKAGE
%token UL_LEFT_BRACE UL_RIGHT_BRACE
%token UL_LEFT_PAREN UL_RIGHT_PAREN UL_DOT UL_COMMA  UL_SEMICOLON UL_INTERFACE UL_EXTENDS UL_BOOLEAN UL_INT UL_VOID
%token <string> UL_IDENT_INTERFACE

/* Defini le type des donnees associees a l'unite lexicale */

%token <string> UL_IDENT_PACKAGE

/* Unite lexicale particuliere qui represente la fin du fichier */

%token UL_FIN

/* Type renvoye pour le nom terminal document */
%type <unit> package

/* Le non terminal document est l'axiome */
%start package

%% /* Regles de productions */

package : internal_package UL_FIN { (print_endline "package : internal_package FIN") }

internal_package : UL_PACKAGE UL_IDENT_PACKAGE UL_LEFT_BRACE paquetage_aux UL_RIGHT_BRACE { (print_endline "package : package IDENT_PACKAGE { paquetage_aux }") }

paquetage_aux : package {(print_endline "paquetage_aux : package");}
                | interface sous_interface {(print_endline "paquetage_aux : interface sous_inteface");}

sous_interface : /* Lambda mot vide */ {(print_endline "sous_interface : vide");}
                | paquetage_aux     {(print_endline "sous_interface : paquetage_aux");}


interface : UL_INTERFACE UL_IDENT_INTERFACE sub1 UL_LEFT_BRACE sub2 UL_RIGHT_BRACE {(print_endline "interface : interface Ident sub1 { sub2 }")}

sub1 : /* Lambda mot vide */ {(print_endline "sub1 : vide");}
    | UL_EXTENDS sousNomQua {(print_endline "sub1 : extends sousNomQua")}


sousNomQua : nomQualifie {(print_endline "sousNomQua : nonQualifie")}
            | nomQualifie UL_COMMA sousNomQua  {(print_endline "sousNomQua : nonQualifie , sousNonQua")} 

        

sub2 : /* Lambda mot vide */ {(print_endline "sub2 : vide");}
    | methode sub2 {(print_endline "method : method +")}

nomQualifie : sous_qual UL_IDENT_INTERFACE {(print_endline "nonQualifie : sous_qual Ident");}

sous_qual : /* Lambda mot vide */ {(print_endline "sous_qual : vide");}
        | UL_DOT UL_IDENT_PACKAGE sous_qual {(print_endline "sous_qual : . ident sous_qual")}


methode : typ UL_IDENT_PACKAGE UL_LEFT_PAREN sous_method UL_RIGHT_PAREN UL_SEMICOLON {(print_endline "method : type ident ( sous_methode ) ;") }

sous_method : /* Lambda mot vide */ {(print_endline "sous_method : vide");}
            | sous_type {(print_endline "sous_method : sous_type")}

sous_type : typ {(print_endline "sous_type : type ")}
        | typ UL_COMMA sous_type { (print_endline "sous_type : type , sous_type")}

typ : UL_BOOLEAN {(print_endline "type : boolean")}
        | UL_INT {(print_endline "type : int")}
        | UL_VOID {(print_endline "type : void")}
        | nomQualifie {(print_endline "type : non_qualifie")}
%%

