with Ada.Strings;               use Ada.Strings;	
with ada.Calendar;              use ada.Calendar;
with Ada.Text_IO;               use Ada.Text_IO;
with Ada.Integer_Text_IO;       use Ada.Integer_Text_IO;
with Ada.Strings.Unbounded;     use Ada.Strings.Unbounded;
with Ada.Text_IO.Unbounded_IO;  use Ada.Text_IO.Unbounded_IO;
with Ada.Command_Line;          use Ada.Command_Line;
with Ada.Exceptions;            use Ada.Exceptions;
with Ada.Unchecked_Deallocation;
generic

package Routeur_LA is
   
   type T_IP_adresse is mod 2**32;
   
    type T_cache ;
    type T_cache_ptr is access T_cache;
    type T_cache is record
        destination:T_IP_adresse;
        masque:T_IP_adresse;
        intrface:Unbounded_String;
        temps:Time;
        right:T_cache_ptr;
        left:T_cache_ptr;
       end record;
    
    type T_tab_rout;
    type T_tab_rout_ptr is access all T_tab_rout;
    type T_tab_rout is 
        record 
            destination: T_IP_adresse;
            masque:T_IP_adresse;
            intrface:Unbounded_String;
            suivant:T_tab_rout_ptr;
      end record;
   
   -- Remplir le cache par une route
   procedure remp_cache(cache:in out T_cache_ptr;ip:T_IP_adresse;masque:T_IP_adresse;intrface:Unbounded_String);
   
   -- Tester si le cache est vide ou non
   -- Retourne True si le cache est vide et False sinon
   function est_vide(cache:T_cache_ptr) return boolean; 
   
   -- Cherche l'interface correspondante à l'adresse ip et retourne par defaut none s'il y a pas           
   function cher_cache(ip:in T_IP_adresse;cache:in T_cache_ptr) return Unbounded_String ; 
   
   -- Suprrime la route la moins récemment utiliser          
   procedure vide_cache(cache:in out T_cache_ptr) ; 
   
   -- Affiche le contenu du cache    
   procedure affich_cache(cache: T_cache_ptr);                      
                
end Routeur_LA;
