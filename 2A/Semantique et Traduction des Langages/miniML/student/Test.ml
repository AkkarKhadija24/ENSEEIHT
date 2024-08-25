open Semantics
open MiniML
open Types

let getValeur (_,v,_) = v

let getType (t,_,_) = t

(* Tests de non regression *)
let%test _ = ( getValeur (miniML "../../exemples/exemple-00.mml") = (IntegerValue 3) )
let%test _ = ( getType (miniML "../../exemples/exemple-00.mml") = IntegerType )
let%test _ = ( getValeur (miniML "../../exemples/exemple-01.mml") = (IntegerValue (-8)) )
let%test _ = ( getValeur (miniML "../../exemples/exemple-02.mml") = (IntegerValue 4) )
let%test _ = ( getValeur (miniML "../../exemples/exemple-03.mml") = (IntegerValue 5) )
let%test _ = ( getValeur (miniML "../../exemples/exemple-04.mml") = (IntegerValue 1) )
let%test _ = ( getValeur (miniML "../../exemples/exemple-05.mml") = (IntegerValue 2) )
let%test _ = ( getValeur (miniML "../../exemples/exemple-06.mml") = (IntegerValue 120) )
let%test _ = ( getValeur (miniML "../../exemples/exemple-07.mml") = (IntegerValue 10) )
let%test _ = ( getValeur (miniML "../../exemples/exemple-08.mml") = (IntegerValue 5) )
let%test _ = ( getValeur (miniML "../../exemples/exemple-09.mml") = (FrozenValue (FunctionNode ("x",AccessNode "x"),[])) )
let%test _ = ( getValeur (miniML "../../exemples/exemple-11.mml") = (IntegerValue 120) )
let%test _ = ( getValeur (miniML "../../exemples/exemple-12.mml") = (IntegerValue 120) )
let%test _ = ( getValeur (miniML "../../exemples/exemple-13.mml") = (NullValue) )

(*Ajout des tests élémentaires*)
(* Test pour la règle `ref` *)
let%test _ = ( getValeur (miniML "../../exemples/exemple-16.mml") = (ReferenceValue "ref@1") )
(* Test pour la règle `:=` *)
let%test _ = ( getValeur (miniML "../../exemples/exemple-17.mml") = NullValue )
(* Test pour la règle `;` *)
let%test _ = ( getValeur (miniML "../../exemples/exemple-18.mml") = (ReferenceValue "ref@2") )
(* Test pour la règle `while` *)
let%test _ = ( getValeur (miniML "../../exemples/exemple-20.mml") = NullValue )
(* Test pour la règle `!` *)
let%test _ = ( getValeur (miniML "../../exemples/exemple-19.mml") = (IntegerValue 1) )


(*Tests de types*)
let%test _ = ( getType (miniML "../../exemples/exemple-01.mml") = IntegerType )
let%test _ = ( getType (miniML "../../exemples/exemple-02.mml") = IntegerType )
let%test _ = ( getType (miniML "../../exemples/exemple-03.mml") = IntegerType )
let%test _ = ( getType (miniML "../../exemples/exemple-04.mml") = IntegerType )
let%test _ = ( getType (miniML "../../exemples/exemple-05.mml") = IntegerType ) 
let%test _ = ( getType (miniML "../../exemples/exemple-06.mml") = (IntegerType) )
let%test _ = ( getType (miniML "../../exemples/exemple-07.mml") = IntegerType )
let%test _ = ( getType (miniML "../../exemples/exemple-08.mml") = IntegerType ) 
let%test _ = ( getType (miniML "../../exemples/exemple-09.mml") = (FunctionType ((VariableType ( ref UnknownType, 1)), (VariableType ( ref UnknownType, 1)))) )
let%test _ = ( getType (miniML "../../exemples/exemple-11.mml") = IntegerType )
let%test _ = ( getType (miniML "../../exemples/exemple-12.mml") = IntegerType )
let%test _ = ( getType (miniML "../../exemples/exemple-13.mml") = UnitType) 
let%test _ = ( getType (miniML "../../exemples/exemple-15.mml") =  ReferenceType (IntegerType))
let%test _ = ( getType (miniML "../../exemples/exemple-16.mml") = ReferenceType (IntegerType) ) 
let%test _ = ( getType (miniML "../../exemples/exemple-17.mml") = UnitType) 
let%test _ = ( getType (miniML "../../exemples/exemple-19.mml") = (IntegerType) ) 

(* Cas d'ERREUR *)
 
(* Evalution *)
let%test _ = ( getValeur (miniML "../../exemples/exemples-KO/1-KO.mml") = (ErrorValue RuntimeError) )
let%test _ = ( getValeur (miniML "../../exemples/exemples-KO/2-KO.mml") = (ErrorValue TypeMismatchError) )
let%test _ = ( getValeur (miniML "../../exemples/exemples-KO/3-KO.mml") = (ErrorValue TypeMismatchError) )
let%test _ = ( getValeur (miniML "../../exemples/exemples-KO/4-KO.mml") = (ErrorValue (UnknownIdentError "y")) )
let%test _ = ( getValeur (miniML "../../exemples/exemples-KO/5-KO.mml") = (ErrorValue TypeMismatchError) )
let%test _ = ( getValeur (miniML "../../exemples/exemples-KO/6-KO.mml") = (ErrorValue TypeMismatchError) )
let%test _ = ( getValeur (miniML "../../exemples/exemples-KO/7-KO.mml") = (ErrorValue (UnknownIdentError "x")) )
let%test _ = ( getValeur (miniML "../../exemples/exemples-KO/8-KO.mml") = (ErrorValue (UnknownIdentError "x")) )
let%test _ = ( getValeur (miniML "../../exemples/exemples-KO/9-KO.mml") = (ErrorValue (UnknownIdentError "x")))


(* Typage *)
let%test _ = ( getType (miniML "../../exemples/exemples-KO/2-KO.mml") = (ErrorType) )
let%test _ = ( getType (miniML "../../exemples/exemples-KO/3-KO.mml") = (ErrorType) )
let%test _ = ( getType (miniML "../../exemples/exemples-KO/4-KO.mml") = (ErrorType) )
let%test _ = ( getType (miniML "../../exemples/exemples-KO/5-KO.mml") = (ErrorType) )
let%test _ = ( getType (miniML "../../exemples/exemples-KO/6-KO.mml") = (ErrorType) )
let%test _ = ( getType (miniML "../../exemples/exemples-KO/7-KO.mml") = (ErrorType) )
let%test _ = ( getType (miniML "../../exemples/exemples-KO/8-KO.mml") = (ErrorType) )
let%test _ = ( getType (miniML "../../exemples/exemples-KO/9-KO.mml") = (ErrorType))
let%test _ = ( getType (miniML "../../exemples/exemples-KO/10-KO.mml") = (ErrorType))

