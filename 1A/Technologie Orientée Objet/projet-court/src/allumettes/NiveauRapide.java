package allumettes;

/**
 * La classe NiveauRapide modélise un joueur qui prend
 * le maximum d’allumettes possible (de manière à ce
 * que la partie se termine le plus rapidement possible).
 * @author Akkar Khadija
 *
 */
public class NiveauRapide implements Strategie {

	public NiveauRapide() { }

	@Override
	public String getNom() {
		return "Rapide";
	}

	@Override
	public int getPrise(Jeu game, String name) {
		return Math.min(Jeu.PRISE_MAX, game.getNombreAllumettes());
	}
}
