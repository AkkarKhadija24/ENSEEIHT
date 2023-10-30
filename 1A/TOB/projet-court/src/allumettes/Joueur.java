package allumettes;

/**
 * La classe Joueur modélise un joueur.
 * @author Akkar Khadija
 */
public class Joueur {
	private String name;          // Le nom du joueur
	private Strategie strategy;   // Le type de la strategie

	/**Le constructeur de la classe Joueur qui
	 * initialise le joueur et la strategie.
	 * @param name le nom du joueur
	 * @param strategy la strategie choisie
	 */
	public Joueur(String nom, Strategie strategy) {
		assert (nom != null && nom.length() > 0);
		assert (strategy != null);
		this.name = nom;
		this.strategy = strategy;
	}

	/** Obtenir le nom du joueur qui joue.
	 * @return String le nom du joueur qui joue
	 */
	public String getNom() {
		return this.name;
	}

	/** Obtenir le nom du joueur qui joue.
	 * @param String le nouveau nom du joueur qui joue
	 */
	public void setNom(String nom) {
		assert (nom != null && nom.length() > 0);
		this.name = nom;
	}

	/**
     * Modifier la startégie/Niveau du joueur.
     * @param newStr : La nouvelle stratégie
     */
    public void setNiveau(Strategie newStr) {
        assert (newStr != null);
        this.strategy = newStr;
    }

	/** Obtenir le nombre d’allumettes qu’il veut le joueur
	 *  prendre pour un jeu donné.
	 * @return int le nombre d’allumettes voulu
	 * @throws CoupInvalideException indique qu'un coup invalide est joué
	 */
	public int getPrise(Jeu game) throws CoupInvalideException {
		assert (game != null);
		return this.strategy.getPrise(game, name);
	}

}
