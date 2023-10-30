package projectmanagment;
import java.util.Date;
import java.util.HashSet;
import projectmanagment.*;

public class Projet {
    private String name;
    private Tache tachePrincipale;
    private HashSet<Membre> membres;
    private String description;
    private Date dateDebut;
    private Date dateFin;

    public Projet(String name, Tache tachePrincipale, HashSet<Membre> membres, String description, Date dateDebut, Date dateFin) {
        this.name = name;
        this.tachePrincipale = tachePrincipale;
        this.membres = membres;
        this.description = description;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
    }
   
 // Getters et setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Tache getTachePrincipale() {
        return tachePrincipale;
    }

    public void setTachePrincipale(Tache tachePrincipale) {
        this.tachePrincipale = tachePrincipale;
    }

    public HashSet<Membre> getMembres() {
        return membres;
    }

    public void setMembres(HashSet<Membre> membres) {
        this.membres = membres;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getDateDebut() {
        return dateDebut;
    }
    
    public void setDateDebut(Date dateDebut) {
        this.dateDebut = dateDebut;
    }

    public Date getDateFin() {
        return dateFin;
    }

    public void setDateFin(Date dateFin) {
        this.dateFin = dateFin;
    }

    // Autres méthodes
    public void ajouterMembre(Membre membre) {
        this.membres.add(membre);
    }
    
    public void supprimerMembre(Membre membre) {
        this.membres.remove(membre);
        membre.supprimer();
    }

    public void afficherMembres() {
    	for (Membre membre : this.membres) {
    		membre.afficher();
    	}
    	System.out.println();
        // Code pour afficher tous les membres du tableau membres
    }

    
	/** Trouver un membre à partir de son nom */
	public Membre stringToMembre(String str) throws MembreInconnuException {
		for (Membre membre : membres) {
			if (membre.getNom().equals(str)) {
				return membre;
			}
		}
		throw new MembreInconnuException();
	}


}
