%{

(* Partie recopiee dans le fichier CaML genere. *)
(* Ouverture de modules exploites dans les actions *)
(* Declarations de types, de constantes, de fonctions, d'exceptions exploites dans les actions *)

%}

/* Declaration des unites lexicales et de leur type si une valeur particuliere leur est associee */

%token UL_MODEL
%token UL_ACCOUV UL_ACCFER UL_PT UL_DPT UL_VIRG UL_PTVIRG UL_CRFER UL_CROUV UL_PARFER UL_PAROUV
%token UL_BOOL UL_FLOAT UL_IN UL_OUT UL_FROM UL_TO UL_FLOW UL_BLOCK UL_SYSTEM

/* Defini le type des donnees associees a l'unite lexicale */

%token <string> UL_IDENT IDENT
%token <int> UL_INT


/* Unite lexicale particuliere qui represente la fin du fichier */

%token UL_FIN

/* Type renvoye pour le nom terminal document */
%type <unit> modele

/* Le non terminal document est l'axiome */
%start modele

%% /* Regles de productions */

modele : UL_MODEL UL_IDENT UL_ACCOUV suite_model UL_ACCFER UL_FIN { (print_endline "modele : UL_MODEL IDENT { suite_model } UL_FIN ") }

suite_model : /*lambda mot vide */ {(print_endline "suite_model : vide")}
            | model_aux suite_model  {(print_endline "suite_model : model_aux suite_model")}

model_aux : bloc     {(print_endline "model_aux : block")}
            | systeme     {(print_endline "model_aux : system")}
            | flot          {(print_endline "model_aux : flot")}

bloc : UL_BLOCK UL_IDENT parametres UL_PTVIRG   {(print_endline "bloc : block Ident parametres ;")}

systeme : UL_SYSTEM UL_IDENT parametres UL_ACCOUV suite_systeme UL_ACCFER   {(print_endline "system : systeme Ident parametres { suite_systeme }")}

suite_systeme : /*lambda mot vide */ {(print_endline "suite_systeme : vide")}
            | model_aux suite_systeme  {(print_endline "suite_systeme : systeme_aux suite_systeme")}

parametres : UL_PAROUV aux_parametres UL_PARFER     {(print_endline "parametres : (aux_parametres)")}

aux_parametres : port       {(print_endline "aux_parametres : port")}
                | port UL_VIRG aux_parametres     {(print_endline "aux_parametres : port , aux_parametres")}

port : IDENT UL_DPT UL_IN typ  {(print_endline "port : ident : in type")}
    | IDENT UL_DPT UL_OUT typ  {(print_endline "port : ident : out type")}

typ : UL_INT sub_int       {(print_endline "type : int sub_int")}
    | UL_FLOAT sub_int      {(print_endline "type : float sub_int")}
    | UL_BOOL sub_int       {(print_endline "type : boolean sub_int")}

sub_int : /*lambda mot vide */      {(print_endline "sun_int : vide")}
        | UL_CROUV aux_int UL_CRFER     {(print_endline "sub_int : [aux_int]")}

aux_int : UL_INT       {(print_endline "aux_int : int")}
        | UL_INT UL_VIRG aux_int        {(print_endline "aux_int : int , aux_int")}

flot : UL_FLOW IDENT UL_FROM sub_ident IDENT UL_TO suite_flot UL_PTVIRG  {(print_endline "flot : flow ident from sub_ident ident to suite_flot ;")}

sub_ident : /*lambda mot vide*/         {(print_endline "sub_ident : vide")}
        | UL_IDENT UL_PT sub_ident      {(print_endline "sub_ident : Ident .")}

suite_flot : /*lambda mot vide*/        {(print_endline "suite_flot : vide")}
            | IDENT                     {(print_endline "suite_flot : ident")}
            | aux_flot                  {(print_endline "suite_flot : aux_flot")}

aux_flot : UL_IDENT UL_PT IDENT         {(print_endline "aux_flot : Ident . ident")}
        | UL_IDENT UL_PT IDENT UL_VIRG aux_flot     {(print_endline "aux_flot : Ident . ident aux_flot")}

%%

