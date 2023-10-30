package allumettes;

/** Lance une partie des 13 allumettes en fonction des arguments fournis
 * sur la ligne de commande.
 * @author	Xavier Crégut
 * @version	$Revision: 1.5 $
 */
public class Jouer {
    static final int MAX_ALLUMETTES = 13;  // Nombre d'Allumettes.
    static final int MAX_ARG = 3;          // Nombre d'argument

	/** Lancer une partie. En argument sont donnés les deux joueurs sous
	 * la forme nom@stratégie.
	 * @param args la description des deux joueurs
	 */
	public static void main(String[] args) {
		try {
			verifierNombreArguments(args);
			boolean confiant = false;
			Joueur[] joueurs = new Joueur[2];
			try {
				for (int i = 0; i < args.length; i++) {
					if (args[i].contentEquals("-confiant")) {
						confiant = true;
					} else if (confiant) {
						joueurs[i - 1] = getJoueur(args[i]);
					} else {
						joueurs[i] = getJoueur(args[i]);
					}
				}
			} catch (ArrayIndexOutOfBoundsException e) { }
			for (int i = 0; i <= 1; i++) {
				if (joueurs[i] == null) {
					throw new ConfigurationException("Pas assez de joueur");
				}
			}
			Arbitre arbitre = new Arbitre(joueurs[0], joueurs[1]);
			if (confiant) {
				arbitre.setConfiant();
			}
			Jeu game = new JeuSansProxy(Jouer.MAX_ALLUMETTES);
			arbitre.arbitrer(game);
		} catch (ConfigurationException e) {
			System.out.println();
			System.out.println("Erreur : " + e.getMessage());
			afficherUsage();
			System.exit(1);
		}
	}

	private static void verifierNombreArguments(String[] args) {
		final int nbJoueurs = 2;
		if (args.length < nbJoueurs) {
			throw new ConfigurationException("Trop peu d'arguments : "
					+ args.length);
		}
		if (args.length > nbJoueurs + 1) {
			throw new ConfigurationException("Trop d'arguments : "
					+ args.length);
		}
	}

	/**
	 * Configurer la ligne de commande en ajoutant une "@"
	 * entre chaque "joueur@strategie".
	 * @param arguments la ligne de commande
	 * @return la nouvelle ligne de commande
	 * sous forme string
	 */
	public static String configArg(String[] arguments) {
		String arg = "";
		for (int i = arguments.length - 1; i >= 0; i--) {
			if (i > 0) {
				arg += arguments[i] + "@";
			} else {
				arg += arguments[i];
			}
		}
		return arg;
	}

	/** Obtenir le joueur depuis la ligne de commande.
	 * @param string nom du joueur
	 * @return joueur Joueur créé.
	 */
	public static Joueur getJoueur(String string) {
		String[] tab = string.split("@");
		String name = tab[0];
		if (name.length() == 0) {
			throw new ConfigurationException("Nom invalide");
		}
		Strategie strategy = creerNiveau(tab[1]);
		Joueur joueur = new Joueur(name, strategy);
		return joueur;
	}

	/**
	 * Obtenir le niveau choisie par chaque joueur.
	 * @param nameS le niveau voulu sur la ligne de commande
	 * @return Strategie la stratgie choisie
	 * @throws ConfigurationException si la commande est inconnue
	 */
	public static Strategie creerNiveau(String nameS) throws ConfigurationException {
		Strategie strategie;
		switch (nameS.toLowerCase()) {
		case "expert" :
			strategie = new NiveauExpert();
			break;
		case "humain" :
			strategie = new NiveauHumain();
			break;
		case "naif" :
			strategie = new NiveauNaif();
			break;
		case "rapide" :
			strategie = new NiveauRapide();
			break;
		case "tricheur" :
			strategie = new Tricheur();
			break;
		default :
			throw new ConfigurationException("La stratégie que"
					+ " vous voulez choisir n'existe pas");
		}
		return strategie;
	}

	/** Afficher des indications sur la manière d'exécuter cette classe. */
	public static void afficherUsage() {
		System.out.println("\n" + "Usage :"
				+ "\n\t" + "java allumettes.Jouer joueur1 joueur2"
				+ "\n\t\t" + "joueur est de la forme nom@stratégie"
				+ "\n\t\t" + "strategie = naif | rapide | expert | humain | tricheur"
				+ "\n"
				+ "\n\t" + "Exemple :"
				+ "\n\t" + "	java allumettes.Jouer Xavier@humain "
					   + "Ordinateur@naif"
				+ "\n"
				);
	}

}
