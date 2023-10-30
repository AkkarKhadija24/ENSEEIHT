package allumettes;

/**
 * La classe NiveauLent modélise un jeu donné ou le joueur
 * suit une strategie qui  consiste à toujours prendre
 * une seule allumette.
 * @author Akkar Khadija
 *
 */
public class NiveauLent implements Strategie {

	@Override
	public String getNom() {
		return "Lent";
	}

	@Override
	public int getPrise(Jeu game, String name) {
		return 1;
	}

}
