package projectmanagment;
import java.util.HashSet;
import java.util.Set;
import projectmanagment.*;

public class Membre {
	
    //definition des attributs
	private String nom;
	private Set<Tache> tachesARealiser;
	
	//constructeur
	public Membre(String nom) {
		this.nom = nom;
		this.tachesARealiser = new HashSet<>();
	}
	
	public String getNom() {
		return nom;
	}
	public Set<Tache> getTachesARealiser() {
		return this.tachesARealiser;
	}
	
	/*afficher toutes les taches assignées à un membre
	 */
	public void quellesTaches() {
		for (Tache tache : tachesARealiser) {
			System.out.println(tache.getNom());
		}
	}
	
	/* assigner une tache à un membre
	 * du projet. 
	 */
	public void assignerTache(Tache tache) {
		tachesARealiser.add(tache);
	}
	
	/* retirer une tache à un membre
	 * 
	 */
	public void retirerTache(Tache tache) {
		tachesARealiser.remove(tache);
	}
	
	public void afficher() {
		System.out.println(this.nom);
	}
	
	/** supprimer un membre */
	public void supprimer() {
		for (Tache tache : this.tachesARealiser) {
			tache.retirerMembre(this);
		}
	}
}

