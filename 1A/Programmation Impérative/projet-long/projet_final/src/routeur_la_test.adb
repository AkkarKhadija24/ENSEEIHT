with Ada.Strings;               use Ada.Strings;
with ada.Calendar;              use ada.Calendar;
with Ada.Text_IO;               use Ada.Text_IO;
with Ada.Integer_Text_IO;       use Ada.Integer_Text_IO;
with Ada.Strings.Unbounded;     use Ada.Strings.Unbounded;
with Ada.Text_IO.Unbounded_IO;  use Ada.Text_IO.Unbounded_IO;
with Ada.Command_Line;          use Ada.Command_Line;
with Ada.Exceptions;            use Ada.Exceptions;
with Routeur_LA;

procedure Routeur_LA_Test is
    package  P is new Routeur_LA;
    use P ;
    IP1:T_IP_adresse;
    M1:T_IP_adresse;
    D1:T_IP_adresse;
    UN_OCTET: constant T_IP_adresse := 2 ** 8;
    cache:T_cache_ptr;
begin
   --remp_cache(cache,4,2552552,To_Unbounded_String("eth0"));
   --remp_cache(Cache,147128000000,255255000000,To_Unbounded_String("eth1"));
   --remp_cache(Cache,000000000000,000000000000,To_Unbounded_String("eth2"));
   --affich_cache(cache );

    IP1 := 147;

    IP1 := IP1 * UN_OCTET + 128;

    IP1 := IP1 * UN_OCTET + 18;

    IP1 := IP1 * UN_OCTET + 15;


    M1 := -1;	-- des 1 partout
    M1 := M1 - 255;
    D1 := IP1 - 15;
    remp_cache(cache,IP1,M1,To_Unbounded_String("eth0"));


    put(cher_cache(D1,cache));




end Routeur_LA_Test;
