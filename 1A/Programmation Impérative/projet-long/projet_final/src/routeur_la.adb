
package body Routeur_LA is
    

    function est_vide(cache:T_cache_ptr) return boolean is
    begin        
        return cache=null;
    end est_vide;
  
    procedure remp_cache(cache: in out T_cache_ptr; ip:T_IP_adresse; masque:T_IP_adresse; intrface:Unbounded_String)  is
        C :T_IP_adresse := ip;
        curseur :T_cache_ptr := cache;
      
        -- Remplir le cache intermédiaire
        procedure remp_cache_inter(cache: in out T_cache_ptr; ip:T_IP_adresse; inter:in out T_IP_adresse; masque:T_IP_adresse; intrface:Unbounded_String) is
        begin
               if cache=null then
                   cache:=new T_cache;    
                   cache.destination:=1;
               end if ; 
               if inter mod 2=0 and inter/2 /=0 then       --quand il s'agit d'un bit 0 on va à gauche 
                     inter:=inter/2;                           -- à droite dans le cas échéant 
                      
                     remp_cache_inter(cache.left,ip,inter,masque,intrface);
                  
               elsif inter mod 2 =1 and inter/2 /=0 then       
                     inter:=inter/2;
                     remp_cache_inter(cache.right,ip,inter,masque,intrface);
                        
               elsif inter/2 =0 then                                      
                    if inter mod 2=0 then
                       cache.left:=new T_cache'(ip,masque,intrface,clock,null,null) ;    
                    elsif inter mod 2=1 then    
                       cache.right:=new T_cache'(ip,masque,intrface,clock,null,null);
                    end if ;
                      
               end if ;
        end remp_cache_inter;
    begin
         
         --if cache=null then
           -- cache:=new T_cache;    
            --cache.destination:=1;         --la destination est égal 1  tantque on est pas sur la fin de l'arbre
            
        -- end if ;
                           -- on Décompose l'ip selon son écriture binaire et on regarde
         remp_cache_inter(cache,ip,C,masque,intrface);       --quand il s'agit d'un bit 0 on va à gauche 
                                                 -- à droite dans le cas échéant 
                      
                     

         
  
    end remp_cache;            
    function cher_cache(ip:in T_IP_adresse;cache:in T_cache_ptr) return Unbounded_String is 
              masque: T_IP_adresse:=0;
              inter:Unbounded_String:=To_Unbounded_String("none");  --Par defaut interface est égal 'none' 
              curseur:T_cache_ptr;
              procedure cherch_cache(cache:in T_cache_ptr) is
              begin
                if not est_vide(cache) then
                 if cache.destination /= 1 then             --si le la destination est différent à 1 , on est  sur la fin d'une brache de l'arbre 
                    if (cache.destination and cache.masque) = ip then
                        
                        if masque<cache.masque then
                            masque:=cache.masque;
                            inter:=cache.intrface;
                            curseur:=cache; 
                        end if ; 
                    end if ;    
                 elsif cache.destination=1 then       --si destination = 1 on doit toujours parcourir le fils droit et gauche
                    cherch_cache(cache.right);
                    cherch_cache(cache.left);
                 end if ;
                end if;
              end cherch_cache;
    begin
                cherch_cache(cache);
                if inter /= To_Unbounded_String("none") then  --si on a trouvé une destination correspondante alors on note la date de son utlisation
                   curseur.temps:=clock;
                end if;
                return inter ;
   end cher_cache;
   
   procedure Free is
     new Ada.Unchecked_Deallocation(Object => T_cache, Name => T_cache_ptr);
   
    procedure vide_cache(cache:in out T_cache_ptr) is 
        time1 : Time := clock;
        curseur : T_cache_ptr;
      
        procedure vide_cache_m(cache : in out T_cache_ptr) is
        begin
          if not est_vide(cache) then
             if cache.destination/=1 then       --on compare les temps de la dernière utilisation des différents destinations
                if cache.temps<=time1 then      -- et on supprime la moins récemment utiliser  
                    curseur:=cache;
                    time1:=cache.temps;
                end if ;
             elsif cache.destination=1 then
                vide_cache_m(cache.right);
                vide_cache_m(cache.left);
             end if ;
          end if;
        end vide_cache_m;    
    begin    
        vide_cache_m(cache);
        Free(curseur);
           
    end vide_cache;    
    procedure affich_cache(cache: T_cache_ptr) is    
        UN_OCTET: constant T_IP_adresse := 2 ** 8;
    begin
       if cache/=null then 
         if cache.destination/=1  then
        
	    
            Put (Natural ((cache.destination / UN_OCTET ** 3) mod UN_OCTET), 1); Put (".");
	    
            Put (Natural ((cache.destination / UN_OCTET ** 2) mod UN_OCTET), 1); Put (".");
	    
            Put (Natural ((cache.destination / UN_OCTET ** 1) mod UN_OCTET), 1); Put (".");
	    
            Put (Natural  (cache.destination mod UN_OCTET), 1);Put(' ');
            
            Put (Natural ((cache.masque / UN_OCTET ** 3) mod UN_OCTET), 1); Put (".");
	    
            Put (Natural ((cache.masque / UN_OCTET ** 2) mod UN_OCTET), 1); Put (".");
	      
            Put (Natural ((cache.masque / UN_OCTET ** 1) mod UN_OCTET), 1); Put (".");
	    
            Put (Natural  (cache.masque mod UN_OCTET), 1);Put(' ');
            Put_Line(cache.intrface);
                
         elsif cache.destination=1 then   
           affich_cache(cache.right); 
           affich_cache(cache.left);
         end if ;   
       end if ;
    end affich_cache;        
 end Routeur_LA;
