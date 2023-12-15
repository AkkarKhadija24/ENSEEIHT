%{

(* Partie recopiee dans le fichier CaML genere. *)
(* Ouverture de modules exploites dans les actions *)
(* Declarations de types, de constantes, de fonctions, d'exceptions exploites dans les actions *)

(* let nbrVariables = ref 0;; *)

let nbrFonctions = ref 0;;

%}

/* Declaration des unites lexicales et de leur type si une valeur particuliere leur est associee */

%token IMPORT
%token <string> IDENT TYPEIDENT
%token INT FLOAT BOOL CHAR VOID STRING
%token ACCOUV ACCFER PAROUV PARFER CROOUV CROFER
%token PTVIRG VIRG
%token SI SINON TANTQUE RETOUR
/* Defini le type des donnees associees a l'unite lexicale */
%token <int> ENTIER
%token <float> FLOTTANT
%token <bool> BOOLEEN
%token <char> CARACTERE
%token <string> CHAINE
%token VIDE
%token NOUVEAU
%token ASSIGN
%token OPINF OPSUP OPINFEG OPSUPEG OPEG OPNONEG
%token OPPLUS OPMOINS OPOU
%token OPMULT OPMOD OPDIV OPET
%token OPNON
%token OPPT
/* Unite lexicale particuliere qui represente la fin du fichier */
%token FIN

/* Declarations des regles d'associative et de priorite pour les operateurs */
/* La priorite est croissante de haut en bas */
/* Associatif a droite */
%right ASSIGN /* Priorite la plus faible */
/* Non associatif */
%nonassoc OPINF OPSUP OPINFEG OPSUPEG OPEG OPNONEG
/* Associatif a gauche */
%left OPPLUS OPMOINS OPOU
%left OPMULT OPMOD OPDIV OPET
%right OPNON
%left OPPT PAROUV CROOUV /* Priorite la plus forte */

/* Type renvoye pour le nom terminal fichier */
%type <unit> fichier
%type <int> variables

/* Le non terminal fichier est l'axiome */
%start fichier

%% /* Regles de productions */
imports : /* Lambda, mot vide */ { (print_endline "imports : /* Lambda, mot vide */"); }
          | IMPORT imports { (print_endline "imports : IMPORT imports"); } 

fichier : programme FIN { (print_endline "fichier : programme FIN");(print_string "Nombre de fonctions : ");(print_int !nbrFonctions);(print_newline()) }
        | imports programme FIN { (print_endline "fichier : programme FIN");}

programme : /* Lambda, mot vide */ { (nbrFonctions := 0); (print_endline "programme : /* Lambda, mot vide */") }
          | fonction programme { (nbrFonctions := !nbrFonctions + 1);(print_endline "programme : fonction programme") }

typeStruct : typeBase declTab { (print_endline "typeStruct : typeBase declTab") }

typeBase : INT { (print_endline "typeBase : INT") }
         | FLOAT { (print_endline "typeBase : FLOAT") }
         | BOOL { (print_endline "typeBase : BOOL") }
         | CHAR { (print_endline "typeBase : CHAR") }
         | STRING { (print_endline "typeBase : STRING") }
         | TYPEIDENT { (print_endline "typeBase : TYPEIDENT") }

declTab : /* Lambda, mot vide */ { (print_endline "declTab : /* Lambda, mot vide */") }
        | CROOUV CROFER { (print_endline "declTab : CROOUV CROFER") }

fonction : entete bloc  { (print_endline "fonction : entete bloc") }

entete : typeStruct IDENT PAROUV parsFormels PARFER { (print_endline "entete : typeStruct IDENT PAROUV parsFormels PARFER") }
       | VOID IDENT PAROUV parsFormels PARFER { (print_endline "entete : VOID IDENT PAROUV parsFormels PARFER") }

parsFormels : /* Lambda, mot vide */ { (print_endline "parsFormels : /* Lambda, mot vide */") }
            | typeStruct IDENT suiteParsFormels { (print_endline "parsFormels : typeStruct IDENT suiteParsFormels") }

suiteParsFormels : /* Lambda, mot vide */ { (print_endline "suiteParsFormels : /* Lambda, mot vide */") }
                 | VIRG typeStruct IDENT suiteParsFormels { (print_endline "suiteParsFormels : VIRG typeStruct IDENT suiteParsFormels") }

bloc : ACCOUV /* $1 */ variables /* $2 */ instructions /* $3 */ ACCFER /* $4 */
     {
	(print_endline "bloc : ACCOUV variables instructions ACCFER");
	(print_string "Nombre de variables = ");
	(print_int $2);
	(print_newline ())
	}

variables : /* Lambda, mot vide */
	  {
		(print_endline "variables : /* Lambda, mot vide */");
		0
		}
          | variable /* $1 */ variables /* $2 */
	  {
		(print_endline "variables : variable variables");
		($2 + 1)
		}

variable : typeStruct IDENT PTVIRG { (print_endline "variable : typeStruct IDENT PTVIRG") }

/* Completer pour decrire une liste d'instructions eventuellement vide */
instructions : instruction_aux { (print_endline "instructions : instruction") ;
(print_string "Nombre d'instructions = ");
                (print_int $1);
                (print_newline ());      }
	
instruction_aux : /* Lambda, mot vide */ { (print_endline "instruction_aux: /* Lambda, mot vide */"); 0}
					| instruction instruction_aux { (print_endline "instruction_aux : instruction"); ($2 + 1) }

/* Completer pour ajouter les autres formes d'instructions */
instruction : expression PTVIRG { (print_endline "instruction : expression PTVIRG") }
				| SI PAROUV expression PARFER bloc { (print_endline "instruction : SI PAROUV expression PARFER bloc")}
				| SI PAROUV expression PARFER bloc SINON bloc { (print_endline "instruction : SI PAROUV expression PARFER bloc SINON bloc")}
				| TANTQUE PAROUV expression PARFER bloc { (print_endline "instruction : TANTQUE PAROUV expression PARFER bloc")}
				| RETOUR expression PTVIRG  { (print_endline "instruction : RETURN expression PTVIRG") }

/*Completer pour ajouter les autres formes d'expressions */
expression_int : ENTIER { (print_endline "expression : ENTIER") }
	   | FLOTTANT { (print_endline "expression : FLOTTANT") }
	   | CARACTERE { (print_endline "expression : CARACTERE") }
	   | BOOLEEN { (print_endline "expression : BOOLEEN")}
	   | VIDE { (print_endline "expression : VIDE") }
	   | NOUVEAU IDENT PAROUV PARFER { (print_endline "expression : NOUVEAU IDENT ()") }
	   | NOUVEAU IDENT CROOUV expression CROFER { (print_endline "expression : NOUVEAU IDENT [expression]")}
	   | IDENT suffixe_aux{ (print_endline "expression : IDENT") }
	   | PAROUV expression PARFER suffixe_aux { (print_endline "expression : (expression) suffixe") }
	   | expression OPPLUS expression {(print_endline "expression : expression OPPLUS expression")}
	   | expression OPMULT expression {}
	   | OPPLUS expression %prec OPNON {(print_endline "expression : OPPLUS expression %prec OPNON")}

expression : expression_int {}
			| unaire expression_int {}
	   		| binaire { (print_endline "expression : binaire ") }

unaire : PAROUV typeBase PARFER { (print_endline "unaire : ( type )") }
		| OPPLUS { (print_endline "unaire : +")}
		| OPMOINS { (print_endline "unaire : -")}
		| OPNON { (print_endline "unaire : !") }

suffixe_aux : /* Lambda, mot vide */ { (print_endline "suffixe_aux : /* Lambda, mot vide */") }
			| suffixe suffixe_aux { (print_endline "suffixe_aux : suffixe")}

suffixe : PAROUV PARFER { (print_endline "suffixe : ( type )") }
		| PAROUV expression PARFER { (print_endline " sufixe : ( expression )") }
		| PAROUV expression expression_aux PARFER { (print_endline " sufixe : ( expression + )") }
		| CROOUV expression CROFER { (print_endline "sufixe : [ expression ]") }

expression_aux : /* Lambda, mot vide */ { (print_endline "expression_aux : /* Lambda, mot vide */") }
				| VIRG expression expression_aux { (print_endline " expression_aux : VIRG expression ") }

binaire : ASSIGN { (print_endline "binaire : =") }
		| OPPT { (print_endline "binaire : .") }
		| OPPLUS { (print_endline "binaire : +") }
		| OPMOINS { (print_endline "binaire : -") }
		| OPMULT { (print_endline "binaire : *") }
		| OPDIV { (print_endline "binaire : /") }
		| OPMOD { (print_endline "binaire : %") }
		| OPOU { (print_endline "binaire : ||") }
		| OPET { (print_endline "binaire : &&") }
		| OPEG { (print_endline "binaire : ==") }
		| OPNONEG { (print_endline "binaire : !=") }
		| OPINF { (print_endline "binaire : <") }
		| OPSUP { (print_endline "binaire : >") }
		| OPINFEG { (print_endline "binaire : <=") }
		| OPSUPEG { (print_endline "binaire : >=") }
		| OPNON { (print_endline "binaire : !") }
%%
