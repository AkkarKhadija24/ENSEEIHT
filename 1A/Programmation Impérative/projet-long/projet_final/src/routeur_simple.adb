with Ada.Strings;               use Ada.Strings;	-- pour Both utilisé par Trim
with Ada.Text_IO;               use Ada.Text_IO;
with Ada.Integer_Text_IO;       use Ada.Integer_Text_IO;
with Ada.Strings.Unbounded;     use Ada.Strings.Unbounded;
with Ada.Text_IO.Unbounded_IO;  use Ada.Text_IO.Unbounded_IO;
with Ada.Command_Line;          use Ada.Command_Line;
with Ada.Exceptions;            use Ada.Exceptions;	-- pour Exception_Message

package body Routeur_Simple is

   procedure Analyser_L_Commande (T_Fichier : out Unbounded_String; P_Fichier : out Unbounded_String; R_Fichier : out Unbounded_String) is
      k : Integer;        -- variable compteur;
   begin
      k := 1;
      T_Fichier := To_Unbounded_String("table.txt");
      P_Fichier := To_Unbounded_String ("paquets.txt");
      R_Fichier := To_Unbounded_String  ("resultats.txt");
      while k <= Argument_Count loop
         if Argument(k) = "t" then
            T_Fichier := To_Unbounded_String (Argument(k+1));
            k := k + 2;
         elsif Argument(k) = "p" then
            P_Fichier := To_Unbounded_String (Argument(k+1));
            k := k + 2;
         elsif Argument(k) = "r" then
            R_Fichier := To_Unbounded_String (Argument(k+1));
            k := k + 2;
         else
            null;
         end if;
      end loop;
   end Analyser_L_Commande;

   procedure Enregistrer_Table(Table : in out T_Table; D : in T_Adresse_IP; M : in T_Adresse_IP; I : in Unbounded_String) is
   begin
      if Table = null then
         Table := new T_Route_Table;
         Table.all.Destination := D;
         Table.all.Masque := M;
         Table.all.Interface_T := I;
         Table.all.Suivante := null;
      else
         Enregistrer_Table (Table.all.Suivante, D, M, I);
      end if;
   end Enregistrer_Table;

   procedure Get_IP (Fichier : in File_Type; IP : out T_Adresse_IP) is
      UN_OCTET: constant T_Adresse_IP := 2 ** 8;
      Valeur : Integer;
      txt : Character;
      IP1 : T_Adresse_IP;
   begin
      IP := 1;
      for i in 0..3 loop
         Get (Fichier, Valeur);
         IP1 := T_Adresse_IP(Valeur);
         IP := IP * UN_OCTET + IP1;
         Get (Fichier, txt);
      end loop;
   end Get_IP;

   function Comparer_Masque (M_1 : in T_Adresse_IP; M_2 : in T_Adresse_IP) return Boolean is
      POIDS_FORT : constant T_Adresse_IP  := 2 ** 31;	 -- 10000000.00000000.00000000.00000000
      Dest_1 : T_Adresse_IP;
      Dest_2 : T_Adresse_IP;
      Bool_1 : Boolean;
      Bool_2 : Boolean;
   begin
      Dest_1 := M_1;
      Dest_2 := M_2;
      loop
         Bool_1 := (Dest_1 and POIDS_FORT) /= 0;
         Bool_2 := (Dest_2 and POIDS_FORT) /= 0;
         Dest_1 := Dest_1*2;
         Dest_2 := Dest_2*2;
         exit when not Bool_1 or not Bool_2;
      end loop;
      if not Bool_1 then
         return True;
      else
         return False;
      end if;
   end Comparer_Masque;

   procedure Commande_Paquets(Paquets_txt : in File_Type; Stop : out Boolean; i : in out Integer; Table : in  T_Table; IP : out T_Adresse_IP) is
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
      elsif Valeur = 'f' then
         Put ("fin (ligne " & Integer'Image(i) ); Put (")");
         stop := True;
      else
         Get_IP(Paquets_txt, IP);
         i := i + 1;
      end if;
   exception
         when others => null;
   end Commande_Paquets;

   procedure Chercher_Table (Table : in T_Table; IP : in T_Adresse_IP; M_Trouve_T : out T_Adresse_IP; Int : out Unbounded_String) is
      Table0 : T_Table;
      Table1 : T_Table;
   begin
      Table0 := Table;
      M_Trouve_T := 0;
      while Table0 /= null loop
         if (IP and Table0.all.Masque) = Table0.all.Destination then
            Table1 := Table0;
            if Comparer_Masque(M_Trouve_T, Table1.all.Masque) then
               M_Trouve_T := Table1.all.Masque;
               Int := Table1.all.Interface_T;
            else
               null;
            end if;
         else
            null;
         end if;
         Table0 := Table0.all.Suivante;
      end loop;
   end Chercher_Table;

   procedure Remplire_Table(Fichier : in File_Type; Table : in out T_Table) is
      UN_OCTET: constant T_Adresse_IP := 2 ** 8;
      IP : T_Adresse_IP;
      M : T_Adresse_IP;
      I : Unbounded_String;
   begin
      loop
         Get_IP(Fichier, IP);
         Get_IP(Fichier, M);
         I := Get_Line(Fichier);
         Enregistrer_Table(Table, IP, M, I);
      exit when End_Of_File(Fichier);
      end loop;

   end Remplire_Table;

   procedure Afficher_T (Table :in  T_Table) is
      UN_OCTET: constant T_Adresse_IP := 2 ** 8;
      curseur : T_Table;
   begin
      curseur := Table;
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
   end Afficher_T;

   procedure Donner_Resultats(Table : in out T_Table; paquets_txt  :  in File_Type) is
      UN_OCTET     : constant T_Adresse_IP := 2 ** 8;
      Resultats_txt: File_Type;
      IP           : T_Adresse_IP;
      T_Fichier   : Unbounded_String;
      P_Fichier   : Unbounded_String;
      R_Fichier   : Unbounded_String;
      i           : Integer;
      Stop        : Boolean;
      M_Trouvee : T_Adresse_IP;
      I_Trouvee : Unbounded_String;
   begin
      Analyser_L_Commande (T_Fichier, P_Fichier, R_Fichier);
      Create(Resultats_txt, Out_File, To_String(R_Fichier));
      begin
         i := 1;
         Stop := False;
         loop

            Commande_Paquets (paquets_txt, Stop, i, Table, IP);
            Chercher_Table(Table, IP, M_Trouvee, I_Trouvee);
            Put (Resultats_txt, Natural ((IP / UN_OCTET ** 3) mod UN_OCTET), 1); Put (Resultats_txt,".");
            Put (Resultats_txt, Natural ((IP / UN_OCTET ** 2) mod UN_OCTET), 1); Put (Resultats_txt,".");
            Put (Resultats_txt, Natural ((IP / UN_OCTET ** 1) mod UN_OCTET), 1); Put (Resultats_txt,".");
            Put (Resultats_txt, Natural  (IP mod UN_OCTET), 1);
            Put (Resultats_txt, " " & I_Trouvee);
            New_Line(Resultats_txt);
         exit when End_Of_File(paquets_txt) or stop;
         end loop;
      exception
         when End_Error =>
            Put ("Blancs en surplus à la fin du fichier.");
            null;
      end;
      Close (Resultats_txt);
   exception
      when E : others =>
         Put_Line (Exception_Message (E));
   end Donner_Resultats;

   procedure Pour_Chaque (Table : in T_Table) is
	begin
      if Table /= null then
         Traiter (Table.all.Destination, Table.all.Masque, Table.all.Interface_T);
         Pour_Chaque (Table.all.Suivante);
      else
         null;
      end if;
   exception
         when others => null;
   end Pour_Chaque;

end Routeur_Simple;
