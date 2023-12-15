// Time-stamp: <06 jui 2023 11:58 Philippe Queinnec>

import CSP.*;

/** Réalisation de la voie unique avec des canaux JCSP. */
/* Version par automate d'états */
public class VoieUniqueAutomate implements VoieUnique {

    enum ChannelId { EntrerNS, EntrerSN, Sortir };
    
    private Channel<ChannelId> entrerNS;
    private Channel<ChannelId> entrerSN;
    private Channel<ChannelId> sortir;
    
    public VoieUniqueAutomate() {
        this.entrerNS = new Channel<>(ChannelId.EntrerNS);
        this.entrerSN = new Channel<>(ChannelId.EntrerSN);
        this.sortir = new Channel<>(ChannelId.Sortir);
        (new Thread(new Scheduler())).start();
    }

    public void entrer(Sens sens) {
        System.out.println("In  entrer " + sens);
        switch (sens) {
          case NS:
            entrerNS.write(true);
            break;
          case SN:
            entrerSN.write(true);
            break;
        }
        System.out.println("Out entrer " + sens);
    }

    public void sortir(Sens sens) {
        System.out.println("In  sortir " + sens);
        sortir.write(true);
        System.out.println("Out sortir " + sens);
    }

    public String nomStrategie() {
        return "Automate";
    }

    /****************************************************************/
    enum Voix { Libre, SNencours, NSencours }
    class Scheduler implements Runnable {
        private Voix voix = Voix.Libre;
        public void run() {
            var voixLibre = new Alternative<>(entrerNS, entrerSN);
            var voixEncours = new Alternative<>(entrerNS, entrerSN);
            while (true) {
                if (voix == Voix.Libre) {
                    switch (voixLibre.select()) {
                      case EntrerNS:
                        entrerNS.read();
                        voix = Voix.NSencours;
                        break;
                      case EntrerSN:
                        entrerSN.read();
                        voix = Voix.SNencours;
                        break;
                    }
                } else if (voix == Voix.SNencours){
                    switch (voixEncours.select()) {
                      case EntrerSN:
                        entrerSN.read();
                        break;
                      case Sortir:
                        sortir.read();
                        break;
                    }
                } else if (voix == Voix.NSencours){
                    switch (voixEncours.select()) {
                      case EntrerNS:
                        entrerNS.read();
                        break;
                      case Sortir:
                        sortir.read();
                        break;
                    }
                }
            }

        }
    } // class Scheduler
}

