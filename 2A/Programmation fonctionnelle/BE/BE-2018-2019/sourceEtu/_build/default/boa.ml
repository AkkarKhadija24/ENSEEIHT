(* Module qui décrit les différentes régles *)
module type Regle =
sig
  (** tid est le type des identifiants de règles. *)
  type tid = int

  (** td est le type des termes. *)
  type td

  (* id d est le type des termes*)
  val id : tid
  
  (* appliquer : applique une régle a une chaine 
     signature : td -> td list
     parametres : une chaine 
     résultats : une liste de la nouvelle chaine *)
  val appliquer : td -> td list
end


module Regle1 : Regle =
struct
  type tid = int
  type td = char list
  let id = 1
  let appliquer lc = 
    match List.rev lc with
    | 'O'::q -> [lc@['A']]
    | _ -> []

  let%test _ = appliquer ['B';'O'] = [['B'; 'O'; 'A']] 
end


module Regle2 : Regle =
struct
  type tid = int
  type td = char list
  let id = 2
  let appliquer lc = 
    match lc with
    | 'B'::q -> [lc@q]
    | _ -> []

  let%test _ = appliquer ['B'; 'O'; 'A'] = [['B'; 'O'; 'A'; 'O'; 'A']]
end 

module Regle3 : Regle =
struct
  type tid = int
  type td = char list
  let id = 3
  let rec appliquer lc = 
    match lc with
    | 'O'::'O'::'O'::tl -> (['A'::tl]) @ (List.map (fun l -> 'O' :: l) (appliquer ('O' :: 'O' :: tl)))
    | 'A'::'O'::'A'::tl -> (['A'::tl]) @ (List.map (fun l -> 'A' :: l) (appliquer ('O' :: 'A' :: tl)))
    | _ -> []

  let%test _ = List.mem ['B'; 'A'; 'O'] (appliquer ['B'; 'O'; 'O'; 'O'; 'O'])
  let%test _ = List.mem ['B'; 'O'; 'A'] (appliquer ['B'; 'O'; 'O'; 'O'; 'O'])
  let%test _ = List.length (appliquer ['B'; 'O'; 'O'; 'O'; 'O']) = 2
  
end 

module Regle4 : Regle =
struct
  type tid = int
  type td = char list
  let id = 4
  let rec appliquer lc = 
    match lc with
    | 'A'::'A'::tl -> [tl]
    | t::tl -> (List.map (fun x -> t::x) (appliquer tl))
    | _ -> []
  let%test _ = appliquer ['B';'O';'A';'A';'O']  = [['B';'O';'O']]
end 

(* Module qui définit l'arbre n-aires : representatif des régles*)
module type ArbreReecriture =
sig
  (** tid est le type des identifiants de règles. *)
  type tid = int

  (** td est le type des termes. *)
  type td = char list

  type arbre_reecriture = Noeud of td * ((tid * arbre_reecriture) list) 
 
  val creer_noeud : td -> ((tid * arbre_reecriture) list) -> arbre_reecriture

  val racine : arbre_reecriture -> td
  val fils : arbre_reecriture -> ((tid * arbre_reecriture) list) 

  val appartient : td -> arbre_reecriture -> bool
 
end


module ArbreReecritureBOA : ArbreReecriture =
struct
  type tid = int

  type td = char list

  type arbre_reecriture = Noeud of td * ((tid * arbre_reecriture) list) 

  let creer_noeud lr lf = Noeud (lr, lf)

  let racine (Noeud (lr, _)) = lr

  let fils (Noeud (_, lf)) = lf

  let rec appartient noeud (Noeud (lr, lf)) = 
    if (noeud = lr) then true 
    else (List.fold_right (fun (_, arb) app -> app || appartient noeud arb) lf false)

  (* TESTS *)
  let exemple1 = Noeud(['B';'O';'O'], [(1, Noeud(['B';'O';'O';'A'],
   [(1, Noeud(['B'], []));(2, Noeud(['O'], []))])); 
   (2, Noeud(['B';'O';'O';'O';'O'], []))])

   let%test _= creer_noeud ['B';'O';'O'] [(1, Noeud(['B';'O';'O';'A'],
   [(1, Noeud(['B'], []));(2, Noeud(['O'], []))])); 
   (2, Noeud(['B';'O';'O';'O';'O'], []))] = exemple1

   let%test _= racine exemple1 = ['B';'O';'O']

   let%test _= fils exemple1 = [(1, Noeud(['B';'O';'O';'A'],
   [(1, Noeud(['B'], []));(2, Noeud(['O'], []))])); 
   (2, Noeud(['B';'O';'O';'O';'O'], []))]

   let%test _= appartient Noeud(['B';'O';'O';'A'],
   [(1, Noeud(['B'], []));(2, Noeud(['O'], []))]) exemple1 = true

end

module SystemeBOA  =
struct
  type terme = char list
  type regle =
    | Regle1
    | Regle2
    | Regle3
    | Regle4


  let rec construit_arbre lc n = 
    let newListe = match n with
    | 1 ->  (1, Noeud (Regle1.appliquer lc, construit_arbre newListe (n-1)))
    | 2 ->  (2, Noeud (Regle2.appliquer lc, construit_arbre newListe (n-1)))
    | 3 ->  (3, Noeud (Regle3.appliquer lc, construit_arbre newListe (n-1)))
    | 3 ->  (4, Noeud (Regle4.appliquer lc, construit_arbre newListe (n-1)))
    | _ -> (,)
    in  Noeud (lc, newListe)
  
end
