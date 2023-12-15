import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;
import java.util.concurrent.locks.Condition;

/* Squelette d'une solution avec un moniteur.
 * Il manque le moniteur (verrou + variables conditions).
 */
public class PhiloMon implements StrategiePhilo {

    // État d'un philosophe : pense, mange, demande ?
    private EtatPhilosophe[] etat;
/*     private int nbPhilosophesAtt;
 */
    // Protection des variables partagées
    private Lock moniteur;
    private Condition[] accesFourchettes;

    /****************************************************************/

    public PhiloMon (int nbPhilosophes) {
        this.etat = new EtatPhilosophe[nbPhilosophes];
        for (int i = 0; i < nbPhilosophes; i++) {
            etat[i] = EtatPhilosophe.Pense;
        }
        this.moniteur = new ReentrantLock();
        this.accesFourchettes = new Condition[nbPhilosophes];
        for (int i = 0; i < nbPhilosophes; i++) {
            accesFourchettes[i] = moniteur.newCondition();
        }
    }

    public void demanderFourchettes (int no) throws InterruptedException
    {
        moniteur.lock();
        etat[no] = EtatPhilosophe.Demande;
        while (etat[Main.PhiloGauche(no)] == EtatPhilosophe.Mange || etat[Main.PhiloDroite(no)] == EtatPhilosophe.Mange) {
            accesFourchettes[no].await();
        }
        etat[no] = EtatPhilosophe.Mange;
        // j'ai les fourchette G et D
        IHMPhilo.poser (Main.FourchetteGauche(no), EtatFourchette.AssietteDroite);
        IHMPhilo.poser (Main.FourchetteDroite(no), EtatFourchette.AssietteGauche);

        moniteur.unlock();
    }

    public void libererFourchettes (int no)
    {
        moniteur.lock();
        IHMPhilo.poser (Main.FourchetteGauche(no), EtatFourchette.Table);
        IHMPhilo.poser (Main.FourchetteDroite(no), EtatFourchette.Table);
        etat[no] = EtatPhilosophe.Pense;
        /* XXXX */
        if (etat[Main.PhiloGauche(no)] == EtatPhilosophe.Demande && !(etat[Main.PhiloGauche(Main.PhiloGauche(no))] == EtatPhilosophe.Mange)) {
            accesFourchettes[Main.PhiloGauche(no)].signal();
        } else if (etat[Main.PhiloDroite(no)] == EtatPhilosophe.Demande && !(etat[Main.PhiloDroite(Main.PhiloDroite(no))] == EtatPhilosophe.Mange)) {
            accesFourchettes[Main.PhiloDroite(no)].signal();
        }
        moniteur.unlock();
    }

    public String nom() {
        return "Moniteur";
    }

}

