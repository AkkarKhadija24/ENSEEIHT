(*AKKAR KHADIJA*)
(*  Exercice à rendre **)
(*  TO DO : contrat *)
let rec pgcd a b = 
  if (abs a) == (abs b) then (abs a)
    else if (abs a) > (abs b) then pgcd ((abs a)- (abs b)) (abs b)
    else pgcd (abs a) ((abs b)- (abs a))
(*  TO DO : tests unitaires *)
let%test _= pgcd 0 5 = 5
let%test _= pgcd 5 0 = 5
let%test _= pgcd 5 5 = 5
let%test _= pgcd 2 3 = 1
let%test _= pgcd 0 0 = 0 
let%test _= pgcd (-5) 3 = 1
let%test _= pgcd 3 (-5) = 1
let%test _= pgcd (-3) (-5) = 1

