package projectmanagment;

import org.junit.*;
import java.util.Date;

import static org.junit.Assert.*;

/**
  * Classe de test de la classe Tache.
  */

public class TacheTest {
	
	private Membre Simon;
	private Tache tachePrincipale, tache1, tache2;
	
	@Before public void setUp() {
	   Simon = new Membre("Simon");
	   tachePrincipale = new Tache("Tache principale", new Date(2023, 4, 10), new Date(2023, 4, 14), Etat.NonCommencee, null);
 	   tache1 = new Tache("Tache 1", "Première tâche", new Date(2023, 4, 10), new Date(2023, 4, 14), Etat.NonCommencee, tachePrincipale);
 	   tache2 = new Tache("Tache 2", "2e tâche", new Date(2023, 4, 10), new Date(2023, 4, 14), Etat.NonCommencee, tache1);
	}

    @Test
    public void testAjouterMembre() {
        tachePrincipale.ajouterMembre(Simon);
        assertTrue(tachePrincipale.getRealisateurs().contains(Simon));
        assertTrue(Simon.getTachesARealiser().contains(tachePrincipale));
        }
    
    @Test
    public void testRetirerMembre() {
        tachePrincipale.ajouterMembre(Simon);
        tachePrincipale.retirerMembre(Simon);
        assertFalse(tachePrincipale.getRealisateurs().contains(Simon));
        assertFalse(Simon.getTachesARealiser().contains(tachePrincipale));
    }
    
    @Test
    public void testConstruireSousTache() {
        assertTrue(tachePrincipale.getSousTaches().contains(tache1));
        assertTrue(tache1.getTacheSuperieure() == tachePrincipale);
    }
    
    @Test
    public void testSetTacheSuperieureCasNormal() {
    	tache2.setTacheSuperieure(tachePrincipale);
        assertTrue(tache2.getTacheSuperieure() == tachePrincipale);
        assertTrue(tachePrincipale.getSousTaches().contains(tache2));
        assertFalse(tache1.getSousTaches().contains(tache2));
        assertFalse(tache2.getTacheSuperieure() == tache1);  	
    }
    
    @Test (expected=IllegalArgumentException.class)
    public void testSetTacheSuperieureException() {
    	tache1.setTacheSuperieure(tache2);
    }
    
    @Test
    public void testSupprimer() {
       tache1.ajouterMembre(Simon);
       tache1.supprimer();
       assertFalse(Simon.getTachesARealiser().contains(tache1));
       assertFalse(tachePrincipale.getSousTaches().contains(tache1));
       
       // tache1 a été supprimée
       assertNull(tache1.getNom());
       assertNull(tache1.getDescription());
	   assertNull(tache1.getDebut());
	   assertNull(tache1.getFin());
	   assertNull(tache1.getRealisateurs());
	   assertNull(tache1.getSousTaches());
	   assertNull(tache1.getEtat());
	   
	   //tache2 (sous tâche de tâche1) a été supprimée
       assertNull(tache2.getNom());
       assertNull(tache2.getDescription());
	   assertNull(tache2.getDebut());
	   assertNull(tache2.getFin());
	   assertNull(tache2.getRealisateurs());
	   assertNull(tache2.getSousTaches());
	   assertNull(tache2.getEtat());
    }
        		
}
