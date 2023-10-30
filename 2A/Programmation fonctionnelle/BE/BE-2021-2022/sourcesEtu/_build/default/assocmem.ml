open Util
open Mem

(* get_assoc: int -> (int * 'b) list -> 'b -> 'b
retourne la valeur associée à la clef e dans la liste l, ou 
la valeur fournie def si la clef n’existe pas
parametres : la clef e et la liste associative et la valeur la valeur def
resultat : la valeur associée à la clef e 
 *)
let rec get_assoc e l def = 
    match l with
    | [] -> raise OutOfBound
    | (c, v)::tl -> if e = c then (if v = _0 then def else v) else get_assoc e tl def

(* Tests unitaires : TODO *)
let%test _ = get_assoc 1 [(1, 'b'); (5, 'c')] 'a' = 'b' 

(* set_assoc : int -> (int * 'b) list -> 'b -> (int * 'b) list
    remplace la valeur associée à la clef e dans la liste l par x, 
    ou ajoute le couple (e, x) si la clef n’existe pas déjà
    parametre e : int, la clef de la donnée dans la liste
    parametre l : (int * 'a) list, une liste representant la memoire 
    parametre x : int, la nouvelle valeur de e
    resultat : (int * 'a) list la nouvelle liste
 *)
let rec set_assoc e l x = 
    match l with
    | [] -> [(e, x)]
    | (c, v)::tl -> if c = e then (c, x)::tl else (c,v) :: (set_assoc e tl x)

(* Tests unitaires : TODO *)
let%test _= set_assoc 1 [] 'a' = [(1, 'a')]
let%test _= set_assoc 1 [(1, 'b'); (5, 'c')] 'a' = [(1, 'a'); (5, 'c')]


module AssocMemory : Memory =
struct
    (* Type = liste qui associe des adresses (entiers) à des valeurs (caractères) *)
    type mem_type = (int * char) list

    (* Un type qui contient la mémoire + la taille de son bus d'adressage *)
    type mem = int * mem_type

    (* Nom de l'implémentation *)
    let name = "assoc"

    (* Taille du bus d'adressage *)
    let bussize (bs, _) = bs

    (* Taille maximale de la mémoire *)
    let size (bs, _) = pow2 bs

    (* Taille de la mémoire en mémoire *)
    let allocsize (bs, m) = 2 * List.length m

    (* Nombre de cases utilisées *)
    let busyness (bs, m) = 
        List.fold_right (fun (_, v) busTl -> if v = _0 then busTl  else busTl + 1) m 0
        (*         match m with
                | [] -> 0
                | (_, v)::tl -> if v = _0 then busyness (bs, tl) else busyness (bs, tl) + 1
        *)

    (* Construire une mémoire vide *)
    let clear bs =
        let rec aux p = 
            if p<=0 then [(0, _0)]
            else aux (p-1) @ [(p, _0)]
        in let m = aux ((pow2 bs) - 1) in (bs, m)

    (* Lire une valeur *)
    let read (bs, m) addr = 
        get_assoc addr m _0

    (* Écrire une valeur *)
    let write (bs, m) addr x = 
        (bs, (set_assoc addr m x))
end
