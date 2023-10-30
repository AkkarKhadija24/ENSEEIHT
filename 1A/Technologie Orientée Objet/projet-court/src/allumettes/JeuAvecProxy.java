package allumettes;

/**
 * Cette classe sert à modéliser un jeu avec proxy (Une solution
 * consiste à s’appuyer sur le patron de conception Procuration).
 * @author Akkar Khadija
 */
public class JeuAvecProxy implements Jeu {
	private Jeu game;            // le Proxy du jeu.

	/**
	 * Constructeur de la classe JeuAvecProxy.
	 * @param gameProxy le jeu courant
	 */
	public JeuAvecProxy(Jeu game) {
		this.game = game;
	}

	@Override
	public int getNombreAllumettes() {
		return this.game.getNombreAllumettes();
	}

	@Override
	public void retirer(int nbPrises) throws OperationInterditeException {
		throw new OperationInterditeException("Triche");
	}

}
