package allumettes;

/**
 * La classe NiveauExpert modélise un jeu ou le joueur r joue
 * du mieux qu’il peut (s’il peut gagner, il gagnera).
 * @author Akkar Khadija
 *
 */
public class NiveauExpert implements Strategie {

	@Override
	public String getNom() {
		return "Expert";
	}

	@Override
	public int getPrise(Jeu game, String name) {
		assert (game.getNombreAllumettes() > 0);
		int allumettesRest = game.getNombreAllumettes();
		int allumettesPrises;
		if (allumettesRest == 1) {
			allumettesPrises = allumettesRest;
		} else if (allumettesRest <= Jeu.PRISE_MAX + 1) {
			allumettesPrises = allumettesRest - 1;
		} else if (allumettesRest % (Jeu.PRISE_MAX + 1) <= 1) {
			allumettesPrises = Jeu.PRISE_MAX;
		} else {
			allumettesPrises = allumettesRest % (Jeu.PRISE_MAX + 1) - 1;
		}
		return allumettesPrises;
	}

}
