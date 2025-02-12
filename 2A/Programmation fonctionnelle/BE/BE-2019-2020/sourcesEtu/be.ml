(*AKKAR KHADIJA*)
(*  Exercice 1 **)

let p0 = [2.5]
let p1 = [2.;3.]
let p2 = [2.;5.5;-2.]
let p3 = [4.5;6.;-3.5;-8.]


(* evalue *)
(* evalue : float -> float list -> float
  ́value un polynôme pour une valeur donnée de x 
  parametres : l'entier a evaluer dans le polynome et la liste representatif du polynome
  resultat : le calccule de p(x)*)

let evalue x p = 
  List.fold_right (fun hd eval -> hd +. (eval *. x)) p 0.
  
(*TESTs*)

let%test _= evalue 1. [] = 0.
let%test _= evalue 2. p0 = 8.
let%test _= evalue 1. p1 = 5.5

(* retract : float list -> float list
Prend un poulynome et supprime les coéfficients nuls inutiles (ceux de la fin de la liste)
poly : un polynome codé avec une float list
Retour : équivalent à poly sans zéro superflu
*)

let rec retract p = 
  match p with
  | [] -> failwith "Polynôme invalide"
  | hd::tl -> if (hd = 0.) then (retract tl) else (hd::retract tl)
  

let%test _ = retract p0 = p0
let%test _ = retract p1 = p1
let%test _ = retract p2 = p2
let%test _ = retract p3 = p3
let%test _ = retract [2.;0.;0.;0.;0.;0.] = [2.]
let%test _ = retract [2.;0.;0.;0.;0.;2.] = [2.;0.;0.;0.;0.;2.]
let%test _ = retract [2.;0.;0.;0.;0.;2.;0.;0.] = [2.;0.;0.;0.;0.;2.]
let%test _ = retract [2.;0.;0.;0.;0.;2.;0.] = [2.;0.;0.;0.;0.;2.]
let%test _ = retract [2.;3.;0.;0.;0.;0.] = [2.;3.]
let%test _ = retract [2.;5.;-2.;0.;0.;0.] = [2.;5.;-2.]
let%test _ = retract [4.;6.;-3.;-8.;0.;0.] = [4.;6.;-3.;-8.]


(* scal_mult : float -> float liste -> float list
Fonction qui multiplie un polynome par un scalaire
Parametre x : un réel
Paramètre poly : un polynome codé avec une float list
Résultat : x * poly, un polynome
*)

let scal_mult x p = 
  List.map (fun s -> s *. x) p

let%test _ = scal_mult 0. p0 = []
let%test _ = scal_mult 0. p1 = []
let%test _ = scal_mult 0. p2 = []
let%test _ = scal_mult 0. p3 = []
let%test _ = scal_mult 1. p0 = p0
let%test _ = scal_mult 1. p1 = p1
let%test _ = scal_mult 1. p2 = p2
let%test _ = scal_mult 1. p3 = p3
let%test _ = scal_mult 2. p0 = [5.]
let%test _ = scal_mult 2. p1 = [4.;6.]
let%test _ = scal_mult 2. p2 = [4.;11.;-4.]
let%test _ = scal_mult 2. p3 = [9.;12.;-7.;-16.]

(* plus : float list -> float list -> float list
Fonction qui fait la somme de deux polynomes
Paramètre poly1, poly2 : deux polynomes codés avec une float list
Resultat : un polynome, somme de poly1 et poly2
*)

let rec plus  p1 p2 =
  match (p1, p2) with
  | ([], _) -> p2
  | (_, []) -> p1
  | ((hd1::tl1), (hd2::tl2)) -> (hd1 +. hd2)::(plus tl1 tl2)


let%test _ = plus p0 p0 = [5.]
let%test _ = plus p0 p1 = [4.5;3.]
let%test _ = plus p0 p2 = [4.5;5.5;-2.]
let%test _ = plus p0 p3 = [7.;6.;-3.5;-8.]
let%test _ = plus p1 p0 = plus p0 p1
let%test _ = plus p1 p1 = [4.;6.]
let%test _ = plus p1 p2 = [4.;8.5;-2.]
let%test _ = plus p1 p3 = [6.5;9.;-3.5;-8.]
let%test _ = plus p2 p0 = plus p0 p2
let%test _ = plus p2 p1 = plus p1 p2
let%test _ = plus p2 p2 = [4.;11.;-4.]
let%test _ = plus p2 p3 = [6.5;11.5;-5.5;-8.]
let%test _ = plus p3 p0 = plus p0 p3
let%test _ = plus p3 p1 = plus p1 p3
let%test _ = plus p3 p2 = plus p2 p3
let%test _ = plus p3 p3 = [9.;12.;-7.;-16.]
let%test _ = plus p3 [-4.5;-6.;3.5;8.] = []
let%test _ = plus p3 [-4.5;-6.;3.5] = [0.;0.;0.;-8.]
let%test _ = plus p3 [0.;-6.;3.5;8.] = [4.5]
let%test _ = plus p3 [0.;0.;3.5;8.] = [4.5;6.]
let%test _ = plus p3 [0.;0.;0.;8.] = [4.5;6.;-3.5]


(* Exercice 2 *)

open Util

(* Arbre d'encodage : arbre ternaire *)
type arbre_encodage = Vide | Lettre of char | Noeud of arbre_encodage * arbre_encodage * arbre_encodage

(* Arbre d'encodage complexe du sujet 
Permet de coder les mots sur {'a','b','c','d','e','f'} 
en codant le 'a' par 3, le 'b' par 12, le 'c' par 212, le 'd' par 22, le 'e' par 11 et le 'f' par 213
*)
let arbre_sujet =
  Noeud (
          Noeud (Lettre 'e',Lettre 'b',Vide) ,
          Noeud (
                Noeud (Vide, Lettre 'c', Lettre 'f'),
                Lettre 'd',
                Vide),
          Lettre 'a'
        )

(* Arbre d'encodage simple du sujet
Permet de coder les mots sur {'a','b','c'} 
en codant le 'a' par 1, le 'b' par 2 et le 'c' par 3*)
let arbre_simple =
  Noeud (Lettre 'a', Lettre 'b', Lettre 'c')


(* Exception levée quand le code ne peut pas être décodé avec l'arbre d'encodage *)
exception CodeNonValide

(* decoder : int -> arbre_encodage -> string
Décode un entier en utilisant l'abre d'encodage
Paramètre code : l'entier à décoder
Paramètre arbre : l'arbre d'encodage
Retour : la chaîne de caractère correspondant à l'entier
Erreur si le code ne peut pas être décodé avec l'arbre d'encodage
*)
let decoder i arb = 
  let rec aux_decoder l a = 
    match l, a with
    | [], Lettre c -> [c]
    | 1::tl, (Noeud (aa, _, _)) -> aux_decoder tl aa
    | 2::tl, (Noeud (_, aa, _)) -> aux_decoder tl aa 
    | 3::tl, (Noeud (_, _, aa)) -> aux_decoder tl aa
    | _ -> raise CodeNonValide 
  in recompose_chaine (aux_decoder (decompose_int i) arb)

let%test _ = decoder 123212 arbre_simple = "abcbab"
let%test _ = decoder 123212 arbre_sujet = "bac"
let%test _ = decoder 123 arbre_simple = "abc"
let%test _ = decoder 123 arbre_sujet = "ba"
let%test _ = decoder 321321 arbre_simple = "cbacba"
let%test _ = try let _ = decoder 321321 arbre_sujet in false with CodeNonValide -> true
let%test _ = try let _ = decoder 457 arbre_simple in false with CodeNonValide -> true

(* arbre_to_liste : arbre_encodage -> (char*int) list
  Converti un arbre d'encodage en une liste associative (caractère, code)
  Paramètre a : l'abre à convertir
  Retour la liste  associative (caractère, code)
*)
let rec arbre_to_liste arb =  
  match arb with
  | Lettre c -> [(c, [1])]
  | Noeud (a1, a2, a3) -> 
  (List.map (fun (c, path) -> (c, 1::path)) (arbre_to_liste a1)) @ 
  (List.map (fun (c, path) -> (c, 1::path)) (arbre_to_liste a2)) @ 
  (List.map (fun (c, path) -> (c, 3::path)) (arbre_to_liste a3))
  | _ -> []

let liste_arbre_simple = arbre_to_liste arbre_simple
let%test _ = List.length liste_arbre_simple =3
let%test _ = List.mem ('a',1) liste_arbre_simple
let%test _ = List.mem ('b',2) liste_arbre_simple
let%test _ = List.mem ('c',3) liste_arbre_simple

let liste_arbre_sujet = arbre_to_liste arbre_sujet
let%test _ = List.length liste_arbre_sujet =6
let%test _ = List.mem ('a',3) liste_arbre_sujet
let%test _ = List.mem ('b',12) liste_arbre_sujet
let%test _ = List.mem ('c',212) liste_arbre_sujet
let%test _ = List.mem ('d',22) liste_arbre_sujet
let%test _ = List.mem ('e',11) liste_arbre_sujet
let%test _ = List.mem ('f',213) liste_arbre_sujet

(* Exception levée quand le mot ne peut pas être encodé avec l'arbre d'encodage *)
exception MotNonValide


(* encoder : string -> arbre_encodage -> int
Encode un mot à l'aide d'un arbre d'encodage
Paramètre mot : le mot à encoder
Paramètre arbre : l'arbre d'encodage
Retour : le code associé au mot
Erreur si le mot ne peut pas être encodé avec l'arbre d'encodage
*)
let encoder ch arb = 
  let rec aux chd lArb = 
  match lArb, chd with
  | [], _ -> raise MotNonValide
  | _, [] ->  []
  | (hds, hdi)::tll, hdc::tlc -> if hdc = hds then hdi::(aux tlc tll)
  else aux chd tll

in (aux (decompose_chaine ch) (arbre_to_liste arb))
  

let%test _ = encoder "abcbab" arbre_simple = 123212
let%test _ = encoder "bac" arbre_sujet = 123212
let%test _ = encoder "abc" arbre_simple = 123
let%test _ = encoder "ba" arbre_sujet = 123
let%test _ = encoder "cbacba" arbre_simple = 321321
let%test _ = try let _ = encoder "dab" arbre_simple in false with MotNonValide -> true 
let%test _ = try let _ = encoder "zut" arbre_simple in false with MotNonValide -> true 


(* fold :  COMPLETER
Itérateur fold pour les arbres d'encodage
*)
let rec fold f acc arb  = 
  match arb with 
  | Vide -> acc
  | Lettre c -> (f acc c)
  | Noeud ( a1, a2, a3) -> fold f (fold f (fold f acc a1) a2) a3

(* arbre_encodage : arbre_encodage -> int
Fonction qui calcule le nombre de lettres présentent dans un arbre d'encodage
Paramètre : l'arbre d'encodage
Retour : le nombre de lettre
*)

let nbLettres  arb = fold (fun acc _ -> acc + 1) 0 arb

let%test _ = nbLettres arbre_simple = 3
let%test _ = nbLettres arbre_sujet = 6


(* lettres :  arbre_encodage -> char list
Fonction qui renvoie la liste des lettres présentent dans un arbre d'encodage
Paramètre : l'arbre d'encodage
Retour : la liste de lettre
*)
let lettres arb = fold (fun acc c ->  c::acc) [] arb


let lettres_arbre_simple = lettres arbre_simple
let%test _ = List.length lettres_arbre_simple = 3
let%test _ = List.mem 'a' lettres_arbre_simple
let%test _ = List.mem 'b' lettres_arbre_simple
let%test _ = List.mem 'c' lettres_arbre_simple

let lettres_arbre_sujet = lettres arbre_sujet
let%test _ = List.length lettres_arbre_sujet = 6
let%test _ = List.mem 'a' lettres_arbre_sujet
let%test _ = List.mem 'b' lettres_arbre_sujet
let%test _ = List.mem 'c' lettres_arbre_sujet
let%test _ = List.mem 'd' lettres_arbre_sujet
let%test _ = List.mem 'e' lettres_arbre_sujet
let%test _ = List.mem 'f' lettres_arbre_sujet


(* arbre_to_liste_2 : arbre_encodage -> (char*int) list
  Converti un arbre d'encodage en une liste associative (caractère, code)
  Paramètre a : l'abre à convertir
  Retour la liste  associative (caractère, code)
*)
let arbre_to_liste_2 arb = 
  fold (fun acc c  -> (c, 1)::acc) [] arb
  
let liste_arbre_simple_2 = arbre_to_liste_2 arbre_simple
let%test _ = List.length liste_arbre_simple_2 =3
let%test _ = List.mem ('a',1) liste_arbre_simple_2
let%test _ = List.mem ('b',2) liste_arbre_simple_2
let%test _ = List.mem ('c',3) liste_arbre_simple_2

let liste_arbre_sujet_2 = arbre_to_liste_2 arbre_sujet
let%test _ = List.length liste_arbre_sujet_2 =6
let%test _ = List.mem ('a',3) liste_arbre_sujet_2
let%test _ = List.mem ('b',12) liste_arbre_sujet_2
let%test _ = List.mem ('c',212) liste_arbre_sujet_2
let%test _ = List.mem ('d',22) liste_arbre_sujet_2
let%test _ = List.mem ('e',11) liste_arbre_sujet_2
let%test _ = List.mem ('f',213) liste_arbre_sujet_2
