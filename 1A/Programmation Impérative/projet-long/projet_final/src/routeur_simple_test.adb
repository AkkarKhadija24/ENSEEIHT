with Ada.Strings;               use Ada.Strings;	-- pour Both utilisÃ© par Trim
with Ada.Text_IO;               use Ada.Text_IO;
with Ada.Integer_Text_IO;       use Ada.Integer_Text_IO;
with Ada.Strings.Unbounded;     use Ada.Strings.Unbounded;
with Ada.Text_IO.Unbounded_IO;  use Ada.Text_IO.Unbounded_IO;
with Ada.Command_Line;          use Ada.Command_Line;
with Ada.Exceptions;            use Ada.Exceptions;	-- pour Exception_Message
with Routeur_Simple;            use Routeur_Simple;

-- Tester le routeur simple (sans cache)  pour un exemples de fichiers
procedure routeur_simple_test is
   Paquets_txt : File_Type;        -- le fichier qui contient les paquets à router
   Table_txt   : File_Type;        -- le ficher qui remplit la table de routage
   T_Fichier   : Unbounded_String; -- le nom du fichier table
   P_Fichier   : Unbounded_String; -- le nom du ficher paquets
   R_Fichier   : Unbounded_String; -- le nom du ficher résultats
   Table       : T_Table;          -- le nom de la liste chainée : table de routage
   
begin
   -- Analyser la ligne de commande
   Analyser_L_Commande(T_Fichier, P_Fichier, R_Fichier);
   
   -- ouvrir les deux fichers paquets.txt et table.txt
   Open(Paquets_txt, In_File, To_String (P_Fichier));
   Open(Table_txt, In_File, To_String (T_Fichier));
   
   -- Remplir la table de routage à travers le fichier table.txt
   Remplire_Table(Table_txt, Table);
   
   Put_Line("Le résultats du routage simple est :");
   New_Line;
   
   -- Chercher l'interface convenable dans la table de routage
   Donner_Resultats(Table, Paquets_txt);
   Afficher_T(Table);
   
   -- Fermer les deux fichers paquets.txt et table.txt
   Close(Paquets_txt);
   Close(Table_txt);
end routeur_simple_test;
