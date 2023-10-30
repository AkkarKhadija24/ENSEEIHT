package allumettes;

/** L'interface Strategie sert à modéliser tous les
 * strategie qui peut etre choisie par un joueur.
 * @author Akkar Khadija
 */
public interface Strategie {

	/**
	 * Obtenir le nom de la strategie.
	 * @return String le nom de la strategie
	 */
	String getNom();

	/**
	 * Demander au joueur le nombre d'allumetes qu'il veut.
	 * @param game : un jeu
	 * @return int le nombre d'allumetes qu'il veut
	 * @throws CoupInvalideException indique qu'un coup invalide est joué
	 */
	int getPrise(Jeu game, String name) throws CoupInvalideException;
}
