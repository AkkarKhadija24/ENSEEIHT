package projectmanagment;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import projectmanagment.Etat;
import projectmanagment.Membre;
import projectmanagment.Tache;

/**
 * Représente une tâche d'un projet.
 */

public class Tache {
	private String nom;
	private String description;
	private Date debut;
	private Date fin;
	private Tache tacheSuperieure;
	private Set<Membre> realisateurs;
	private Set<Tache> sousTaches;
	private Etat etat;
        private int x;
	private int y;
	
	
	 /**
     * Constructeur pour initialiser toutes les informations d'une tâche.
     * @param nom le nom de la tâche
     * @param description la description de la tâche
     * @param debut la date de début de la tâche
     * @param fin la date de fin de la tâche
     * @param etat l'état d'avancement de la tâche
     * @param tacheSuperieure la tâche supérieure à laquelle la tâche courante doit être rattachée
     */
	public Tache(String nom, String description, Date debut, Date fin, Etat etat, Tache tacheSuperieure) {
		this.nom = nom;
		this.description = description;
		this.debut = debut;
		this.fin = fin;
		this.realisateurs = new HashSet<>();
		this.sousTaches = new HashSet<>();
		this.etat = etat;
		this.tacheSuperieure = tacheSuperieure;
		if (tacheSuperieure != null) {
			tacheSuperieure.getSousTaches().add(this);
		}
	}
        
        public Tache(String nom, String description, Date debut, Date fin) {
		this.nom = nom;
		this.description = description;
		this.debut = debut;
		this.fin = fin;
		this.etat = Etat.NonCommencee;
		this.realisateurs = new HashSet<>();
		this.sousTaches = new HashSet<>();
	}

	  /**
     * Constructeur pour initialiser les informations d'une tâche sans description.
     * @param nom le nom de la tâche
     * @param debut la date de début de la tâche
     * @param fin la date de fin de la tâche
     * @param etat l'état d'avancement de la tâche
     * @param tacheSuperieure la tâche supérieure à laquelle la tâche courante doit être rattachée
     */
	public Tache(String nom, Date debut, Date fin, Etat etat, Tache tacheSuperieure) {
		this(nom, "", debut, fin, etat, tacheSuperieure);
	}

// Accesseurs et modifieurs	

	/**
     * Obtenir le nom de la tâche.
     * @return le nom de la tâche
     */
	public String getNom() {
		return this.nom;
	}

	/**
     * Modifier le nom de la tâche.
     * @param nom le nouveau nom de la tâche
     */
	public void setNom(String nom) {
		this.nom = nom;
	}

	/**
     * Obtenir la description de la tâche.
     * @return la description de la tâche
     */
	public String getDescription() {
		return this.description;
	}
	
	/**
     * Modifier la description de la tâche.
     * @param description la nouvelle description de la tâche
     */
	public void setDescription(String description) {
		this.description = description;
	}

	/**
    * Obtenir la date de début de la tâche.
    * @return la date de début de la tâche.
    */
	public Date getDebut() {
		return this.debut;
	}

	/**
    * Modifier la date de début de la tâche.
    * @param debut la nouvelle date de début de la tâche.
    */
	public void setDebut(Date debut) {
		this.debut = debut;
	}

	/**
    * Obtenir la date de fin de la tâche.
    * @return la date de fin de la tâche.
    */
	public Date getFin() {
		return this.fin;
	}

	/**
    * Modifier la date de fin de la tâche.
    * @param fin la nouvelle date de fin de la tâche.
    */
	public void setFin(Date fin) {
		this.fin = fin;
	}

	/**
    * Obtenir l'ensemble des membres réalisateurs de la tâche.
    * @return l'ensemble des membres réalisateurs de la tâche.
    */
	public Set<Membre> getRealisateurs() {
		return this.realisateurs;
	}

	/**
    * Obtenir l'ensemble des sous-tâches de la tâche.
    * @return l'ensemble des sous-tâches de la tâche.
    */
	public Set<Tache> getSousTaches() {
		return this.sousTaches;
	}

	/**
    * Obtenir l'état de la tâche.
    * @return l'état de la tâche.
    */
	public Etat getEtat() {
		return this.etat;
	}

	/**
    * Modifier l'état de la tâche.
    * @param etat le nouvel état de la tâche.
    */
	public void setEtat(Etat etat) {
		this.etat = etat;
	}
	
	/*
    * Obtenir la tâche supérieure.
    * @return la tâche supérieure.
    */
	public Tache getTacheSuperieure() {
		return this.tacheSuperieure;
	}

	/**
    * Modifier la tâche supérieure.
    * @param tache la nouvelle tâche supérieure.
    */
	public void setTacheSuperieure(Tache nouvelleTacheSuperieure) throws IllegalArgumentException {
	    // Vérifier que la nouvelle tâche supérieure n'est pas plus basse dans l'arbre que la tâche actuelle
	    if (this.estPlusBasseQue(nouvelleTacheSuperieure)) {
	            throw new IllegalArgumentException("La nouvelle tâche supérieure ne peut pas être une sous-tâche de la tâche actuelle.");
	        }
	    
	    // Retirer la tâche actuelle de la liste des sous-tâches de sa tâche supérieure actuelle
	    if (this.tacheSuperieure != null) {
	        this.tacheSuperieure.getSousTaches().remove(this);
	    }
	    
	    // Ajouter la tâche actuelle à la liste des sous-tâches de la nouvelle tâche supérieure
	    this.tacheSuperieure = nouvelleTacheSuperieure;
	    if (nouvelleTacheSuperieure != null) {
	        nouvelleTacheSuperieure.getSousTaches().add(this);
	    }
	}
	
	
	private boolean estPlusBasseQue(Tache tache) {
		Tache copie = tache;
		while (copie != null) {
			if (copie == this) {
				return true;
			}
			copie = copie.getTacheSuperieure();
		}
		return false;
	}

	
// 

	/**
    * Ajouter un membre à la tâche.
    * @param membre le membre à ajouter à la tâche.
    */
	public void ajouterMembre(Membre membre) {
		this.realisateurs.add(membre);
		membre.assignerTache(this);
	}
	
	/**
    * Retirer un membre de la tâche.
    * @param membre le membre à retirer de la tâche.
    */
	public void retirerMembre(Membre membre) {
		this.realisateurs.remove(membre);
		membre.retirerTache(this);
	}	
	
	/* Afficher les noms des réalisateurs de la tâche */
	public void afficherMembres() {
		for (Membre membre : this.realisateurs) {
			System.out.println(membre.getNom());
		}
	}
	
	/* Supprimer la tâche.
	 * Cette action supprimera toutes les sous-tâches associées.
	 */
	public void supprimer() {
		
		// Supprime cette tâche de la tâche supérieure
		if (tacheSuperieure != null) {
			tacheSuperieure.getSousTaches().remove(this);
		}
	    
	    //Supprime cette tâche chez les membres réalisateurs
    	for (Membre membre : this.realisateurs) {
    		membre.retirerTache(this);
    	}
	    	
	    // Supprime les sous-tâches
	    for (Tache tache : this.sousTaches) {
	    	tache.supprimer();
	    }
	    
	    // Supprime la tâche courante
	    nom = null;
	    description = null;
	    debut = null;
	    fin = null;
	    realisateurs = null;
	    sousTaches = null;
	    etat = null;
	}
        
        public int getX() {
		return x;
	}
	
	public int getY() {
		return y;
	}
	
	public void setX(int x) {
		this.x = x;
	}
	
	public void setY(int y) {
		this.y = y;
	}
}
