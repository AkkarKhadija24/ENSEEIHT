open Delimcc
module GreenThreads =
  struct
    (* à compléter/modifier *)
    (* notifier l'appelant par ce qu'il veut faire *)
    (* Pour fork on doit mettre le type de process (unit -> unit) 
       car il doit etre une fonction pour qu'il soit executer*)
    type res = 
      | Fork of (unit -> unit) * (unit -> res)
      | Yield of (unit -> res)
      | Done;;

    (* Fonction de continuation : k : unit->res pour le syntaxe de shift*)
    let prompt0 = new_prompt ();;
    (* handle : interpreter *)
    let scheduler proc_init = 
      (* des queue de (unit -> res ) Queue.t*)
      let queue = Queue.create () in 
      let rec handle result = 
        match result with
        | Done -> if Queue.is_empty queue then () else 
          let k = Queue.pop queue in handle (k ())
          (* [p] -> p [] -> [p]*)
        | Yield k -> Queue.push k queue; let k' = Queue.pop queue in handle (k' ())
        | Fork (p, k) -> Queue.push k queue; run p

        and run prog = 
          handle (Delimcc.push_prompt prompt0 (fun () -> prog (); Done))
        in run prog_init
    (* j'autorise le scheduler de prendre la main (j'arrete un petit
        moment et je revient aprés)*)
    let yield () = Delimcc.shift prompt0 (fun k -> Yield k);;
    let fork proc = Delimcc.shift prompt0 (fun k -> Fork (proc, k));;
    let exit () = Delimcc.shift prompt0 (fun _ -> Done);;
    
  end

  let ping_pong () = 
    GreenThreads.(let rec ping n =
      if n = 0 then exit ()
      else (proc_string "ping\n"; yield (); ping (n-1))
  
    let rec pong n =
      if n = 0 then exit ()
      else (proc_string "pong\n"; yield (); pong (n-1))
    
    let main = fork ping; fork pong; exit () 
    in scheduler main
    )
  

module type Channel =
  sig
    val create : unit -> ('a -> unit) * (unit -> 'a)
  end

module GTChannel : Channel =
  struct
    (* à compléter/modifier *)
    let create () = assert false;;
  end
    
let sieve () =
  let rec filter reader =
    GreenThreads.(
      let v0 = reader () in
      if v0 = -1 then exit () else
      Format.printf "%d@." v0;
      yield ();
      let (writer', reader') = GTChannel.create () in
      fork (fun () -> filter reader');
      while true
      do
        let v = reader () in
        yield ();
        if v mod v0 <> 0 then writer' v;
        if v = -1 then exit ()
      done
    ) in
  let main () =
    GreenThreads.(
      let (writer, reader) = GTChannel.create () in
      fork (fun () -> filter reader);
      for i = 2 to 1000
      do
        writer i;
        yield ()
      done;
      writer (-1);
      exit ()
    ) in
  GreenThreads.scheduler main;;
