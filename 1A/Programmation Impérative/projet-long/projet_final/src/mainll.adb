with Ada.Strings;               use Ada.Strings;	-- pour Both utilisÃ© par Trim
with Ada.Text_IO;               use Ada.Text_IO;
with Ada.Integer_Text_IO;       use Ada.Integer_Text_IO;
with Ada.Strings.Unbounded;     use Ada.Strings.Unbounded;
with Ada.Text_IO.Unbounded_IO;  use Ada.Text_IO.Unbounded_IO;
with ada.Unchecked_Deallocation; 
with Ada.Command_Line;          use Ada.Command_Line;
with Ada.Exceptions;            use Ada.Exceptions;	-- pour Exception_Message
with Routeur_Simple;            use Routeur_Simple;
with Routeur_LL;                use Routeur_LL;
with Ada.Calendar;              use Ada.Calendar;

procedure mainll is
   Paquets_txt : File_Type;  -- le fichier qui contient les paquets à router
   Table_txt   : File_Type;  -- le ficher qui remplit la table de routage
   Taille_C    : Integer;    -- la taille du cache
   T_Fichier   : Unbounded_String; -- le nom du fichier table
   P_Fichier   : Unbounded_String; -- le nom du ficher paquets
   R_Fichier   : Unbounded_String; -- le nom du ficher résultats
   P_Cache     : Unbounded_String; -- la politique choisit pour vider le cache
   Stat        : Boolean;    -- la statistique choisit
   Table       : T_Table;    -- le nom de la liste chainée : table de routage
   Cache       : T_Cache_L;  -- le nom de la liste chainée : le cache
   
begin
   Analyser_L_Commande_C(Taille_C, T_Fichier, P_Fichier, R_Fichier, P_Cache, Stat);
   Open(Paquets_txt, In_File, To_String (P_Fichier));
   Open(Table_txt, In_File, To_String (T_Fichier));
   begin
      -- Remplir la table de routage à travers le fichier table.txt
      Remplire_Table(Table_txt, Table);
      Put_Line("Le résultats du routage avec Cache (Liste chainée) est :");
      New_Line;
      if Taille_C /= 0 then 
         -- Chercher l'interface convenable dans ke cache et la table
         Donner_Resultats_CL(Table, Cache, Paquets_txt);
         
         -- Vider le cache en suivant la politique choisie
         
         if Taille_Cache(Cache) >= Taille_C then
            if P_Cache = To_Unbounded_String("FIFO") then
               Vider_Cache_FIFO(Cache);
            elsif P_Cache = To_Unbounded_String("LFU") then
               Vider_Cache_LFU(Cache);
            elsif P_Cache = To_Unbounded_String("LRU") then
               Vider_Cache_LRU(Cache);
            else 
               null;
            end if;
         end if;
         
         -- Afficher le contenu de la liste chainée Cache
         if Stat then
            Put_Line("les statistiques du cache sont :");
            New_Line;
            Afficher_Cache_L(Cache);
         else 
            null;
         end if;
         
      else
         -- Chercher l'interface convenable dans la table de routage
         Donner_Resultats(Table, Paquets_txt);
      end if;
   end;
   Vider_Cache_FIFO(Cache);
   Afficher_Cache_L(Cache);
   
   -- Fermer les deux fichers paquets.txt et table.txt
   Close(Table_txt);
   Close(Paquets_txt);
end mainll;
