open Flux

module type TaylorAlgebra =
  sig
    type t = float Flux.t

    (* Affichage fourni *)
    (* affiche t n affiche les termes de la série t jusqu'à l'ordre n inclus *)
    val affiche : t -> int -> unit

    (* Exercice 1 *)
    val constant : float -> t
    val nats : t
    val var : t

    (* Exercice 2 *)
    val evalue : t -> int -> float -> float

    (* Exercice 3 *)
    val somme : t -> t -> t
    val mult_const : float -> t -> t
    val derive : t -> t
    val integre : t -> t

    (* Exercice 4 *)
    val mult_var : t -> t
    val produit : t -> t -> t

    (* Exercice 5 *)
    val compose : t -> t -> t
    val exp : t -> t

    (* Exercice 6 *)
    val fixpoint : (t -> t) -> t  
  end

module Taylor : TaylorAlgebra =
  struct
    type t = float Flux.t

    let affiche t n =
      let pow = ref 0 in
      begin
        Format.printf "0";
        Flux.print (fun fmt f -> Format.fprintf fmt " + %f * x**%d" f !pow; incr pow) n Format.std_formatter t
      end

    (* Remplacez les assert false par des définitions *)
    let constant c = Flux.constant c
    
    let nats = Flux.unfold (fun n -> (float n, n+1)) 0

    let evalue s n x = Flux.sum (Flux.take n (Flux.map (
      fun (coef, power) -> coef *. (x ** float power)) (Flux.zip s nats)))

    let somme s1 s2 = Flux.map2 (+.) s1 s2

    let mult_const k s = Flux.map (( *. ) k) s

    let derive s = Flux.map (fun (coef, power) -> 
      coef *. float power, power - 1) (Flux.zip s nats)

    let integre s = Flux.map (fun (coef, power) -> coef /. (
      float (power + 1)), power + 1) (Flux.zip s nats)

    let var = Flux.unfold (fun n -> if n = 1 then 1.0 else 0.0,n+1) 1

    let mult_var s = Flux.map (fun (coef, power) -> coef *. power, 
    power + 1) (Flux.zip s nats)

    let produit s1 s2 = Flux.accum (fun acc _ -> mult_var acc)
     (mult_var s1) (Flux.take 1 s2)

    let compose f g = Flux.accum (fun acc _ -> mult_var acc) (mult_var f) g

    let exp s = Flux.accum (fun acc n -> mult_const (1. /. float n)
     (mult_var acc)) (constant 1.0) s

    let fixpoint f = 
      let rec loop x = f x in loop
  end


(* Test et tracé de la fonction d'Airy, définie récursivement *)
(* La fonction d'Airy est référencée sur Wikipedia            *)
(* Commentez cette partie si elle ne fonctionne pas           *)
(* Commentez l'appel de Dessin.trace_fonction si la librairie *)
(* Graphics n'est pas installée                               *)
(* Le développement limité obtenu par Taylor.affiche          *)
(* peut être copié-collé dans Google et tracé automatiquement *)
(*
let _ =
  let airy_expr y =
    Taylor.(somme (constant 0.35) (integre (somme (constant (-0.26)) (integre (produit var y))))) in
  let rec airy = Flux.(Tick (lazy (uncons (airy_expr airy)))) in
  let airy_fun = Taylor.evalue airy 100 in
  begin
    Taylor.affiche airy 10;
    Dessin.trace_fonction (-10., 0.) airy_fun
  end
 *)

(* Test et tracé de la composition de fonctions               *)
(* exp(1+x*x(x-1)*(x-2))                                      *)
(* Commentez cette partie si elle ne fonctionne pas           *)
(*
let _ =
  let x_moins_1 = Taylor.(somme var (constant (-1.))) in
  let x_moins_2 = Taylor.(somme var (constant (-2.))) in
  let facteur   = Taylor.(produit var (produit x_moins_1 x_moins_2)) in
  let argument  = Taylor.(somme (constant 1.) facteur) in
  let test_exp  = Taylor.(exp argument) in
  let test_fun  = Taylor.evalue test_exp 100 in
  begin
    Taylor.affiche test_exp 10;
    Dessin.trace_fonction (-1., 2.) test_fun
  end
*)
