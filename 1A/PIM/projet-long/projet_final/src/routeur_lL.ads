with Ada.Text_IO;               use Ada.Text_IO;
with Ada.Integer_Text_IO;       use Ada.Integer_Text_IO;
with Ada.Strings.Unbounded;     use Ada.Strings.Unbounded;
with Ada.Text_IO.Unbounded_IO;  use  Ada.Text_IO.Unbounded_IO;
with Routeur_Simple;            use Routeur_Simple;
with Ada.Calendar;              use Ada.Calendar;

package Routeur_LL is

   type T_Cache_L is limited private;

   -- Tester c'est le cache est vide ou non
   function Est_Vide_C (Cache : in  T_Cache_L) return Boolean;

   -- Lire et traduire la ligne de commande
   procedure Analyser_L_Commande_C (Taille_C : out Integer; T_Fichier : out Unbounded_String; P_Fichier : out Unbounded_String; R_Fichier : out Unbounded_String; P_Cache : out Unbounded_String; Stat : out Boolean);

   -- Initialiser le cache à null
   procedure Init_Cache (Cache : in out T_Cache_L) with
     post => Est_Vide_C(Cache );

   -- Quelle est la taille du Cache
   function Taille_Cache (Cache : in  T_Cache_L) return Integer with
     post => Taille_Cache'Result >= 0;

   -- Enregistrer une nouvelle route dans le Cache
   procedure Enregistrer_Cache_L (Cache : in out T_Cache_L; D : in T_Adresse_IP; M : in T_Adresse_IP; I : in Unbounded_String) with
     post => not Est_Vide_C(Cache);

   -- Supprimer la route qui correspond à l'adresse IP dans le cache
   procedure Supprimer_Cache(Cache : in out T_Cache_L; IP : in T_Adresse_IP);

   -- Afficher le contenu du cache
   procedure Afficher_Cache_L (Cache : in T_Cache_L);

   -- Analyser les commandes du paquets
   procedure Commande_Paquets_CL(Paquets_txt : in File_Type; Stop : out Boolean; i : in out Integer; Table : in  T_Table; Cache : in out T_Cache_L; IP : out T_Adresse_IP);

   -- Chercher l'interface convenable dans le cache
   procedure Chercher_Cache (Cache : in T_Cache_L; IP : in T_Adresse_IP; M_Trouve_C : out T_Adresse_IP; Int_Trouve_C : out Unbounded_String; Existe : out Boolean);

   -- Vider le cache en utilisant la politique FIFO
   procedure Vider_Cache_FIFO (Cache : in out T_Cache_L);

   -- Vider le cache en utilisant la politique LFU
   procedure Vider_Cache_LFU (Cache : in out T_Cache_L);

   -- Vider le cache en utilisant la politique LRU
   procedure Vider_Cache_LRU (Cache : in out T_Cache_L);

   -- chercher la bonne route et remplir le ficher resultats.txt
   procedure Donner_Resultats_CL (Table : in  T_Table; Cache : in out T_Cache_L; Paquets_txt : in File_Type);

private

   type T_Route_CL;
   type T_Cache_L is access T_Route_CL;
   type T_Route_CL is record
      Destination : T_Adresse_IP;
      Masque      : T_Adresse_IP;
      Interface_T : Unbounded_String;
      Frequence   : Integer;
      Temps       : Time;
      Suivante    : T_Cache_L;
   end record;
end Routeur_LL;
