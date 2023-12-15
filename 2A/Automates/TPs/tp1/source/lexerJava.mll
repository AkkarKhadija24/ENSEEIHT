(* AKKAR KHADIJA *)
(* pour executer un test :
./_build/default/mainJava.exe tests//exemple-tres-simple.java  *)
{

  open TokenJava
(*  open String *)
(*  open Str *)
  exception LexicalError

}

(* Macro-definitions *)
let minuscule = ['a'-'z']
let majuscule = ['A'-'Z']
let chiffre = ['0'-'9']
let alphabet = minuscule | majuscule
let alphanum = alphabet | chiffre | '_'
(*  *)
let commentaireBloc = ("/*" [^ '*']* '*'* ([^ '*' '/'] [^ '*']* '*'*)* '/') 

let commentaireLigne = "//" [^'\n']* '\n'
let Underscore = '_'
let Underscores = Underscore Underscore*


let integerTyypeSuffix = 'l' | 'L' 

(* DecimalNumeral *)
let nonZeroDigit = ['1'-'9']
let digit = '0' | nonZeroDigit
let DigitOrUnderscore = digit | Underscore
let DigitsAndUnderscores = DigitOrUnderscore (DigitOrUnderscore)*
let Digits = digit | digit (DigitsAndUnderscores)? digit
let DecimalNumeral = '0' 
                    | nonZeroDigit (Digits)? 
                    | nonZeroDigit Underscores Digits

(* HexNumeral *)
let HexDigit = chiffre | ['a'-'f'] | ['A'-'F']
let HexDigitOrUnderscore = HexDigit | Underscore
let HexDigitsAndUnderscores = HexDigitOrUnderscore (DigitOrUnderscore)*
let HexDigits = HexDigit | HexDigit (HexDigitsAndUnderscores)? HexDigit
let HexNumeral = '0' ('x' | 'X') HexDigits

(* OctalNumeral*)
let OctalDigit = ['0' - '7']
let OctalDigitOrUnderscore = OctalDigit | Underscore
let OctalDigitsAndUnderscores = OctalDigitOrUnderscore (OctalDigitOrUnderscore)*
let OctalDigits = OctalDigit | OctalDigit (OctalDigitsAndUnderscores)? OctalDigit
let OctalNumeral = '0' (OctalDigits | Underscores OctalDigits)

(* BinaryNumeral*)
let BinaryDigit = '0' | '1'
let BinaryDigitOrUnderscore = BinaryDigit | Underscore
let BinaryDigitsAndUnderscores = BinaryDigitOrUnderscore (BinaryDigitOrUnderscore)*
let BinaryDigits = BinaryDigit | BinaryDigit (BinaryDigitsAndUnderscores)? BinaryDigit
let BinaryNumeral = '0' ('b' | 'B') BinaryDigits

(* DecimalFloating *)
let Sign = '+' | '-'
let floatTypeSuffix = 'f' | 'F' | 'd' | 'D'
let ExponentIndicator = 'e' | 'E' 
let SignedInteger = (Sign)? Digits
let ExponentPart = ExponentIndicator SignedInteger
let DecimalFloating = Digits '.' (Digits)? (ExponentPart)? (floatTypeSuffix)?
      | '.' Digits (ExponentPart)? (floatTypeSuffix)?
      | Digits ExponentPart (floatTypeSuffix)?
      | Digits (ExponentPart)? floatTypeSuffix

(* HexadecimalFloating *)
let BinaryExponentIndicator = 'p' | 'P'
let BinaryExponent = BinaryExponentIndicator SignedInteger
let HexSignificand = HexNumeral ('.')? | '0' ('x' | 'X') '.' HexDigits
let HexadecimalFloating = HexSignificand BinaryExponent (floatTypeSuffix)?

(* Character *)
let SpecialCharacter = "'" ("\\b" | "\\t" | "\\n" | "\\r" | "\\\"" | "\\\'" | "\\\\" | "\\" OctalDigit) "'"

(* Analyseur lexical : expression reguliere { action CaML } *)
rule lexer = parse
(* Espace, tabulation, passage a ligne, etc : consommes par l'analyse lexicale *)
  | ['\n' '\t' ' ']+    { lexer lexbuf }
(* Commentaires consommes par l'analyse lexicale *)
  | commentaireBloc  	{ lexer lexbuf }
  | commentaireLigne	{ lexer lexbuf }
(* Structures de blocs *)
  | "("                 { PAROUV }
  | ")"                 { PARFER }
  | "["                 { CROOUV }
  | "]"                 { CROFER }
  | "{"                 { ACCOUV }
  | "}"                 { ACCFER }
(* Separateurs *)
  | ","                 { VIRG }
  | ";"                 { PTVIRG }
(* Operateurs booleens *)
  | "||"                { OPOU }
  | "&&"                { OPET }
  | "!"                 { OPNON }
(* Operateurs comparaisons *)
  | "=="                { OPEG }
  | "!="                { OPNONEG }
  | "<="                { OPSUPEG }
  | "<"                 { OPSUP }
  | ">="                { OPINFEG }
  | ">"                 { OPINF }
(* Operateurs arithmetiques *)
  | "+"                 { OPPLUS }
  | "-"                 { OPMOINS }
  | "*"                 { OPMULT }
  | "/"                 { OPDIV }
  | "%"                 { OPMOD }
  | "."                 { OPPT }
  | "="                 { ASSIGN }
  | "new"               { NOUVEAU }
(* Mots cles : types *)
  | "bool"              { BOOL }
  | "char"              { CHAR }
  | "float"             { FLOAT }
  | "int"               { INT }
  | "String"            { STRING }
  | "void"              { VOID }
(* Mots cles : instructions *)
  | "while"		{ TANTQUE }
  | "if"		{ SI }
  | "else"		{ SINON }
  | "return"		{ RETOUR }
(* Mots cles : constantes *)
  | "true"		{ (BOOLEEN true) }
  | "false"		{ (BOOLEEN false) }
  | "null"		{ VIDE }
(* Nombres entiers : *)
  | DecimalNumeral (integerTyypeSuffix)? as texte   { (ENTIER (int_of_string texte)) }
  | HexNumeral (integerTyypeSuffix)? as texte   { (HEXADECIMAL (int_of_string texte)) }
  | OctalNumeral (integerTyypeSuffix)? as texte   { (OCTAL (int_of_string texte)) }
  | BinaryNumeral (integerTyypeSuffix)? as texte   { (BINARY (int_of_string texte)) }

(* Nombres flottants : *)
  | (DecimalFloating | HexadecimalFloating) as texte { (FLOTTANT (float_of_string texte)) }

(* Caracteres : *)
  | "'" _ "'" as texte                   { CARACTERE texte.[1] }
  | SpecialCharacter as texte as texte                   { CARACTERESPECIAL texte.[2] }
(* Chaines de caracteres : *)
  | '"' (_ | SpecialCharacter)* '"' as texte                  { CHAINE texte }
(* Identificateurs *)
  | majuscule alphanum* as texte              { TYPEIDENT texte }
  | minuscule alphanum* as texte              { IDENT texte }
  | eof                                       { FIN }
  | _                                         { raise LexicalError }

{

}
