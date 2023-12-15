// Time-stamp: <28 oct 2022 09:24 queinnec@enseeiht.fr>

import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;
import Synchro.Assert;

/** Lecteurs/rédacteurs
 * stratégie d'ordonnancement: priorité aux rédacteurs,
 * implantation: avec un moniteur. */
public class LectRed_PrioRedacteur implements LectRed
{
    private int nombreLecteur;
    private int nombreAttRedacteur;
    private boolean redacteur;
    // Protection des variables partagées
    private Lock moniteur;
    // varriable de condition de blocage
    private Condition accesLecture; 
    private Condition accesRedacteur; 

    public LectRed_PrioRedacteur() {
        this.nombreLecteur = 0;
        this.nombreAttRedacteur = 0;
        this.redacteur = false;
        this.moniteur = new ReentrantLock();
        this.accesLecture = moniteur.newCondition();
        this.accesRedacteur = moniteur.newCondition();
    }

    public void demanderLecture() throws InterruptedException {
        moniteur.lock();
        while (redacteur || nombreAttRedacteur > 0) {
            accesLecture.await();
        }
        nombreLecteur++;
        if (!redacteur && nombreAttRedacteur == 0) {
            accesLecture.signal();
        }
        moniteur.unlock();
    }

    public void terminerLecture() throws InterruptedException {     
        moniteur.lock();
        nombreLecteur--;
        accesRedacteur.signal();
        moniteur.unlock();

    }

    public void demanderEcriture() throws InterruptedException {
        moniteur.lock();
        nombreAttRedacteur++;
        while (redacteur || nombreLecteur > 0) {
            accesRedacteur.await();
        }
        redacteur = true;
        nombreAttRedacteur--;
        accesRedacteur.signal();
        moniteur.unlock();
    }

    public void terminerEcriture() throws InterruptedException {
        //nombreAttRedacteur--;
        moniteur.lock();
        redacteur   = false;
        if (nombreAttRedacteur>0) {
            accesRedacteur.signal();
        } else {
            accesLecture.signal();
        }
        moniteur.unlock();
    }

    public String nomStrategie() {
        return "Stratégie: Priorité Rédacteurs.";
    }

}
