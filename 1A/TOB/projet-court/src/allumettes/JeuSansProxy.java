package allumettes;

/**
 * La classe JeuSansProxy modélise le jeu sans proxy.
 * @author Akkar Khadija
 *
 */
public class JeuSansProxy implements Jeu {
	private int nbrAllumettes;      // Le nombre courant d'allumettes

	/**
	 * Le constructeur de JeuSansProxy qui initilalise
	 * le nombre d'allumettes courant.
	 * @param nbrAllumettes le nouvelle nombre d'allumettes
	 */
	public JeuSansProxy(int nbrAllumette) {
		this.nbrAllumettes = nbrAllumette;
	}

	@Override
	public int getNombreAllumettes() {
		return this.nbrAllumettes;
	}

	/**
	 * Changer le nombre d'allumettes.
	 * @param nbrAllumettes le nouveau nombre d'allumettes
	 */
	public void setNombreAllumettes(int nbrAllumette) {
		assert (nbrAllumettes > 0);
		this.nbrAllumettes = nbrAllumette;
	}

	@Override
	public void retirer(int nbPrises) throws CoupInvalideException {
	    if (nbPrises > nbrAllumettes) {
	        throw new CoupInvalideException(nbPrises, "Impossible ! Nombre invalide : "
	        + nbPrises + " (> " + nbrAllumettes + ")");
	    } else if (nbPrises > Jeu.PRISE_MAX) {
			throw new CoupInvalideException(nbPrises, "Impossible ! Nombre invalide : "
			+ nbPrises + " (> " + Jeu.PRISE_MAX + ")");
		} else if (nbPrises <= 0) {
			throw new CoupInvalideException(nbPrises, "Impossible ! Nombre invalide : "
			+ nbPrises + " (< 1)");
	    } else {
			this.nbrAllumettes -= nbPrises;
		}
	}

}
