package allumettes;
import java.util.Random;
/**
 * La classe NiveauNaif modélise un jeu ou le
 * joueur  choisit aléatoirement un nombre entre 1 et PRISE_MAX.
 * @author Akkar Khadija
 *
 */
public class NiveauNaif implements Strategie {

	@Override
	public String getNom() {
		return "Naif";
	}

	@Override
	public int getPrise(Jeu game, String name) {
		Random nbr = new Random();
		if (game.getNombreAllumettes() > Jeu.PRISE_MAX) {
			return nbr.nextInt(Jeu.PRISE_MAX) + 1;
		} else {
			return nbr.nextInt(game.getNombreAllumettes()) + 1;
		}
	}

}
