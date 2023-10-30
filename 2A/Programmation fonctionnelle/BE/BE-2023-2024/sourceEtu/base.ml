(* Module précisant la base dans laquelle vont être décomposer des entiers *)
(* AKKAR KHADIJA *)
module type Base = sig
  (* Entier qui va servir de base de décomposition des entiers*)
  val base : int
end

(* A COMPLETER *)
(* Module represente la base 2 dans laquelle vont être décomposer des entiers *)
module Base2 : Base =
struct
  let base = 2
end

(* Module represente la base 5 dans laquelle vont être décomposer des entiers *)
module Base5 : Base =
struct
  let base = 5
end
