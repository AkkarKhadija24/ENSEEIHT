package allumettes;

import java.util.Scanner;

/**
 *  La classe NiveauHumain modélise un jeu ou la strategie
 *  choisit n consiste à demander À l’utilisateur ce nombre.
 * @author Akkar Khadija
 *
 */
public class NiveauHumain implements Strategie {
    // Le nombre d'allumettes à lire
	public static final Scanner scanner = new Scanner(System.in);

	@Override
	public String getNom() {
		return "Humain";
	}

	@Override
	public int getPrise(Jeu game, String name) throws CoupInvalideException {
		assert (game != null);
		String getCommande;
		int nbrPrises;
		try {
			System.out.print(name + ", " + "combien d'allumettes ? ");
			getCommande = this.scanner.nextLine();
			if (getCommande.equals("triche")) {
				int i = game.getNombreAllumettes() - 1;
				System.out.println("[Une allumette en moins, plus que "
				    + i + ". Chut !]");
				System.out.print(name + ", " + "combien d'allumettes ? ");
				game.retirer(1);
				getCommande = this.scanner.nextLine();
			}
			nbrPrises = Integer.parseInt(getCommande);
		} catch (NumberFormatException e) {
			System.out.println("Vous devez donner un entier.");
			return getPrise(game, name);
		}
		return nbrPrises;
	}

}
