package allumettes;

/**
 * La classe Tricheur modélise le cas d'un joueur qui triche
 * @author Akkar Khadija
 *
 */
public class Tricheur implements Strategie {

	@Override
	public String getNom() {
		return "Tricheur";
	}

	@Override
	public int getPrise(Jeu game, String name) throws CoupInvalideException {
		assert (game.getNombreAllumettes() > 0);
		try {
			while (game.getNombreAllumettes() > 2) {
				game.retirer(1);
			}
			System.out.println("[Je triche...]");
			System.out.println("[Allumettes restantes : 2]");
		} catch (CoupInvalideException e) {
			System.out.println(e.getMessage());
		}
		return 1;
	}
}
