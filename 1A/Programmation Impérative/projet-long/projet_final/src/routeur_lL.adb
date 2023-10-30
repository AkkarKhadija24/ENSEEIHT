with Ada.Strings;               use Ada.Strings;	-- pour Both utilisé par Trim
with Ada.Text_IO;               use Ada.Text_IO;
with Ada.Integer_Text_IO;       use Ada.Integer_Text_IO;
with Ada.Strings.Unbounded;     use Ada.Strings.Unbounded;
with Ada.Text_IO.Unbounded_IO;  use Ada.Text_IO.Unbounded_IO;
with ada.Unchecked_Deallocation;
with Ada.Command_Line;          use Ada.Command_Line;
with Ada.Exceptions;            use Ada.Exceptions;	-- pour Exception_Message
with Routeur_Simple;            use Routeur_Simple;
with Ada.Calendar;              use Ada.Calendar;

package body Routeur_LL is

   procedure Free is
     new Ada.Unchecked_Deallocation (Object => T_Route_CL, Name => T_Cache_L);

   function Est_Vide_C (Cache : in  T_Cache_L) return Boolean is
   begin
      return Cache = null;
   end Est_Vide_C;

   procedure Analyser_L_Commande_C (Taille_C : out Integer; T_Fichier : out Unbounded_String; P_Fichier : out Unbounded_String; R_Fichier : out Unbounded_String; P_Cache : out Unbounded_String; Stat : out Boolean) is
      k : Integer;        -- variable compteur;
   begin
      k := 1;
      Taille_C := 10;
      T_Fichier := To_Unbounded_String("table.txt");
      P_Fichier := To_Unbounded_String ("paquets.txt");
      R_Fichier := To_Unbounded_String  ("resultats.txt");
      P_Cache := To_Unbounded_String ("FIFO");
      Stat := False;
      while k <= Argument_Count loop
         if Argument(k) = "c" then
            Taille_C := Integer'Value(Argument (k+1));
            k := k + 2;
         elsif Argument(k) = "t" then
            T_Fichier := To_Unbounded_String (Argument(k+1));
            k := k + 2;
         elsif Argument(k) = "p" then
            P_Fichier := To_Unbounded_String (Argument(k+1));
            k := k + 2;
         elsif Argument(k) = "r" then
            R_Fichier := To_Unbounded_String (Argument(k+1));
            k := k + 2;
         elsif Argument(k) = "s" then
            Stat := True;
            k := k + 1;
         elsif Argument(k) = "S" then
            k := k + 1;
         elsif Argument(k) = "P" then
            P_Cache := To_Unbounded_String (Argument(k+1));
            k := k + 2;
         else
            null;
         end if;
      end loop;
   end Analyser_L_Commande_C;

   procedure Init_Cache (Cache : in out T_Cache_L) is
   begin
      Cache := null;
   end Init_Cache;

   function Taille_Cache (Cache : in  T_Cache_L) return Integer is
      Curseur : T_Cache_L;
      Taille : Integer;
   begin
      Taille := 0;
      Curseur := Cache;
      while Curseur /= null loop
         Taille := Taille + 1;
         Curseur := Curseur.all.Suivante;
      end loop;
      return Taille;
   end Taille_Cache;

   procedure Enregistrer_Cache_L (Cache : in out T_Cache_L; D : in T_Adresse_IP; M : in T_Adresse_IP; I : in Unbounded_String) is
   begin
      if Cache = null then
         Cache := new T_Route_CL;
         Cache.all.Destination := D;
         Cache.all.Masque := M;
         Cache.all.Interface_T := I;
         Cache.all.Temps := Clock;
         Cache.all.Frequence := 1;
         Cache.all.Suivante := null;
      elsif (Cache.all.Destination and M ) = D then
         Cache.all.Frequence := Cache.all.Frequence + 1;
         Cache.all.Temps := Clock;
      else
         Enregistrer_Cache_L (Cache.all.Suivante, D, M, I);
      end if;
   end Enregistrer_Cache_L;

   procedure Supprimer_Cache(Cache : in out T_Cache_L; IP : in T_Adresse_IP) is
      Cache0 : T_Cache_L;
      IP_Absente_Cache : Exception;
   begin
      if Est_Vide_C(Cache) then
         raise IP_Absente_Cache;
      elsif Cache.all.Destination = IP then
         Cache0 := Cache;
         Cache := Cache.all.Suivante;
         Free(Cache0);
      else
         Supprimer_Cache(Cache.all.Suivante, IP);
      end if;
   exception
         when IP_Absente_Cache => null;
   end Supprimer_Cache;

   procedure Afficher_Cache_L (Cache : in T_Cache_L) is
      UN_OCTET: constant T_Adresse_IP := 2 ** 8;
      curseur : T_Cache_L;
   begin
      curseur := Cache;
      if Est_Vide_C(curseur) then
         Put_Line("Le cache est vide");
      end if;
      while curseur /= null loop
         Put (Natural ((curseur.all.Destination / UN_OCTET ** 3) mod UN_OCTET), 1); Put (".");
         Put (Natural ((curseur.all.Destination / UN_OCTET ** 2) mod UN_OCTET), 1); Put (".");
         Put (Natural ((curseur.all.Destination / UN_OCTET ** 1) mod UN_OCTET), 1); Put (".");
         Put (Natural  (curseur.all.Destination mod UN_OCTET), 1);
         Put (" " );
         Put (Natural ((curseur.all.Masque / UN_OCTET ** 3) mod UN_OCTET), 1); Put (".");
         Put (Natural ((curseur.all.Masque / UN_OCTET ** 2) mod UN_OCTET), 1); Put (".");
         Put (Natural ((curseur.all.Masque / UN_OCTET ** 1) mod UN_OCTET), 1); Put (".");
         Put (Natural  (curseur.all.Masque mod UN_OCTET), 1);
         Put (" " & curseur.all.Interface_T);
         New_Line;
         curseur := curseur.all.Suivante;
      end loop;
   end Afficher_Cache_L;

   procedure Commande_Paquets_CL(Paquets_txt : in File_Type; Stop : out Boolean; i : in out Integer; Table : in  T_Table; Cache : in out T_Cache_L; IP : out T_Adresse_IP) is
      Valeur : Character;
      Texte : Unbounded_String;
   begin
      Get (Paquets_txt, Valeur);
      if Valeur = 't' then
         Put ("table (ligne " & Integer'Image(i)); Put (")");
         New_Line;
         Afficher_T(Table);
         texte := Get_Line(Paquets_txt);
         i := i + 1;
         Commande_Paquets(Paquets_txt, Stop, i, Table, IP);
      elsif Valeur = 'c' then
         Put ("cache (ligne " & Integer'Image(i)); Put (")");
         New_Line;
         Afficher_Cache_L(Cache);
         texte := Get_Line(Paquets_txt);
         i := i + 1;
         Commande_Paquets_CL (Paquets_txt, Stop, i, Table, Cache, IP);
      elsif Valeur = 'f' then
         Put ("fin (ligne " & Integer'Image(i) ); Put (")");
         stop := True;
      elsif Valeur = ' ' then
         Get_IP(Paquets_txt, IP);
         i := i + 1;
      else
         stop := True;
      end if;
   exception
         when others => null;
   end Commande_Paquets_CL;

   procedure Chercher_Cache (Cache : in T_Cache_L; IP : in T_Adresse_IP; M_Trouve_C : out T_Adresse_IP;  Int_Trouve_C : out Unbounded_String; Existe : out Boolean) is
      Cache0 : T_Cache_L;
   begin
      Existe := False;
      Cache0 := Cache;
      M_Trouve_C := 0;
      while not Est_Vide_C(Cache0) loop
         if (IP and Cache0.all.Masque) = Cache0.all.Destination  then
            if Comparer_Masque(M_Trouve_C, Cache0.all.Masque) then
               M_Trouve_C := Cache0.all.Masque;
               Int_Trouve_C := Cache0.all.Interface_T;
            end if;
            Existe := True;
         else
            null;
         end if;
         Cache0 := Cache0.all.Suivante;
      end loop;
   end Chercher_Cache;


   procedure Vider_Cache_FIFO (Cache : in out T_Cache_L) is
      Cache0 : T_Cache_L;
   begin
      if not Est_Vide_C (Cache) then
         Cache0 := Cache;
         Cache := Cache.all.Suivante;
         Free(Cache0);
      else
         null;
      end if;
   end Vider_Cache_FIFO;

   procedure Vider_Cache_LFU (Cache : in out T_Cache_L) is
      Cache0 : T_Cache_L;
      Freq : Integer;
      IP_Supp : T_Adresse_IP;
   begin
      Cache0 := Cache;
      Freq := Cache0.all.Frequence;
      while Cache0 /= null loop
         if Cache0.all.Frequence < Freq then
            Freq := Cache0.all.Frequence;
            IP_Supp := Cache0.all.Destination;
         else
            null;
         end if;
         Cache0 := Cache0.all.Suivante;
      end loop;
      Supprimer_Cache(Cache, IP_Supp);
   end Vider_Cache_LFU;

   procedure Vider_Cache_LRU (Cache : in out T_Cache_L) is
      Cache0 : T_Cache_L;
      Time_use : Time;
      IP : T_Adresse_IP;
   begin
      Cache0 := Cache;
      Time_use := Clock;
      while Cache0 /= null loop
         if Cache0.all.Temps < Time_use then
            Time_use := Cache0.all.Temps;
            IP := Cache0.all.Destination;
            Cache0 := Cache0.all.Suivante;
         else
            Cache0 := Cache0.all.Suivante;
         end if;
      end loop;
      Supprimer_Cache(Cache, IP);

   end Vider_Cache_LRU;

   procedure Donner_Resultats_CL (Table : in  T_Table; Cache : in out T_Cache_L; Paquets_txt : in File_Type) is
      UN_OCTET      :constant T_Adresse_IP := 2 ** 8;
      Resultats_txt : File_Type;
      Stop          : Boolean;
      IP            : T_Adresse_IP;
      i             : Integer;
      Int_Finale    : Unbounded_String;
      M_Trouve_C    : T_Adresse_IP;
      Int_Trouve_C  : Unbounded_String;
      M_Trouve_T    : T_Adresse_IP;
      Int_Trouve_T  : Unbounded_String;
      Existe : Boolean;
   begin
      Create(Resultats_txt, Out_File, "resultats.txt");
      begin
         i := 1;
         Stop := False;
         Cache := null;
         loop
            Commande_Paquets_CL (paquets_txt, Stop, i, Table, Cache, IP);
            Chercher_Table (Table, IP, M_Trouve_T, Int_Trouve_T);
            Chercher_Cache (Cache, IP, M_Trouve_C, Int_Trouve_C, Existe);
            if Existe then
               Int_Finale := Int_Trouve_C;
            else
               Int_Finale := Int_Trouve_T;
               Enregistrer_Cache_L (Cache, IP, M_Trouve_T, Int_Trouve_T);
            end if;
            Put (Resultats_txt, Natural ((IP / UN_OCTET ** 3) mod UN_OCTET), 1); Put (Resultats_txt,".");
            Put (Resultats_txt, Natural ((IP / UN_OCTET ** 2) mod UN_OCTET), 1); Put (Resultats_txt,".");
            Put (Resultats_txt, Natural ((IP / UN_OCTET ** 1) mod UN_OCTET), 1); Put (Resultats_txt,".");
            Put (Resultats_txt, Natural  (IP mod UN_OCTET), 1);
            Put (Resultats_txt, " " & Int_Finale);
            New_Line(Resultats_txt);
         exit when End_Of_File(paquets_txt) or stop;
         end loop;
      exception
         when End_Error =>
            Put ("Blancs en surplus à la fin du fichier.");
            null;
      end;
      Close(Resultats_txt);
   exception
      when E : others =>
         Put_Line (Exception_Message (E));
   end Donner_Resultats_CL;

end Routeur_LL;
