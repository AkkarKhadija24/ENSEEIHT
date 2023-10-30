package allumettes;

import java.util.Scanner;

/**
 * La classe Arbitre sert à modéliser le jeu entre deux
 * joueur et sert aussi à vérifierles régles du jeu.
 * @author Akkar Khadija
 */
public class Arbitre {
	private Joueur j1;                    // Le Joueur numéro 1.
	private Joueur j2;                    // Le joueur numéro 2.
	private Boolean confiant;
	static final int MAX_OPTIONS = 3;  // Nombre d'options possible.
	static final int MAX_NIVEAU = 6;  // Nombre de niveau possible.
	static final int par1 = 3, par2 = 4, par3 = 5, par4 = 6;

	/**
	 * Le constructeur de la classe Arbitre qui initialise
	 * les deux joueurrs qui jeuent.
	 * @param j1
	 * @param j2
	 */
	public Arbitre(Joueur jr1, Joueur jr2) {
		this.j1 = jr1;
		this.j2 = jr2;
		this.confiant = false;
	}

	/**
	 * Obtenir le premier joueur.
	 * @return lr premier joueur
	 */
	public Joueur getJoueur1() {
		return this.j1;
	}

	/** Obtenir le deuxième joueur.
	 * @return le deuxième joueur
	 */
	public Joueur getJoueur2() {
		return this.j2;
	}

	/**
	 * Mettre à jour le premier joueur.
	 * @param j1 le nouveau joueur
	 */
	public void setJoueur1(Joueur jr1) {
		this.j1 = jr1;
	}

	/**
	 * Mettre à jour le deuxième joueur.
	 * @param j2 le nouveau joueur
	 */
	public void setJoueur2(Joueur jr2) {
		this.j2 = jr2;
	}

	/**
	 * Obtenir le joueur qui a le tour.
	 * @param tour le tour courant du jeu
	 * @return Joueur qui represente le joueur courant
	 */
	public Joueur getJoueur(int tour) {
		assert (tour > 0);
		if (tour % 2 == 1) {
			return this.j1;
		} else {
			return this.j2;
		}
	}

	/**
	 * Affiche le mot allumette(s).
	 * @param nbr : Le nombre prise d'allumettes
	 * @return String : allumettes si nbr >= 2 et allumette sinon
	 */
	public String toString(int nbr) {
		if (nbr >= 2) {
			return " allumettes.";
		} else {
			return " allumette.";
		}
	}

	/**
	 * Annoncer si une partie du jeu est terminéé ou
	 * nom et afficher le gagnant et aussi qui a perdu.
	 * @param tour le tour courant du jeu
	 * @param game un jeu donné
	 * @return
	 */
	public boolean getFin(int tour, Jeu game) {
		assert (tour > 0 && game != null);
		if (game.getNombreAllumettes() > 0) {
			return false;
		} else {
			System.out.println("\r\n" + getJoueur(tour + 1).getNom() + " perd !");
			System.out.println(getJoueur(tour).getNom() + " gagne !");
			return true;
		}
	}

	/**
	 * Cette méthode sert à arbitrer une partie
	 * entre deux joueur j1 et j2.
	 * @param game un jeu donné
	 * @param gameProxy
	 */
	public void arbitrer(Jeu game) {
		assert (game != null);
		int tour = 1;
		int nbrPrises;
		Jeu jeuProxy = this.confiant ? game : new JeuAvecProxy(game);
		while (!getFin(tour, game)) {
			System.out.println("\nAllumettes restantes : "
		+ game.getNombreAllumettes());
			try {
				nbrPrises = getJoueur(tour).getPrise(jeuProxy);
				System.out.println(getJoueur(tour).getNom()
				    + " prend " + nbrPrises + toString(nbrPrises));
				game.retirer(nbrPrises);
			} catch (CoupInvalideException e) {
				System.out.println(e.getProbleme());
				tour++;
			} catch (OperationInterditeException e) {
				System.out.println("[Je triche...]");
				System.out.println("Abandon de la partie car "
				    + getJoueur(tour).getNom() + " triche !");
				break;
			}
			tour++;
		}
	}

	/** Pour signaler à l'arbitre le paramètre confiant.
	 */
	public void setConfiant() {
		this.confiant = true;
	}

	/**
	 * Afficher le menu des niveau existants.
	 */
	public void afficherMenu() {
		System.out.println("\nQuelle niveau voulez vous ?");
		System.out.println("Niveau naif");
		System.out.println("Niveu lent");
		System.out.println("Niveau rapide");
		System.out.println("Niveau expert");
		System.out.println("Niveau humain");
		System.out.println("Tricheur");
		System.out.println("Entrez un entier entre 1 et " + Arbitre.MAX_NIVEAU + ".\n");
	}

	/**
	 * Lire un entier entre 1 et 6.
	 * @return un entier entre 1 et 6 saisi par un utilisateur
	 */
	public int getChoise() {
		int choise = 0;
		Scanner scanner = new Scanner(System.in);
		do {
			System.out.println("Entrez un entier entre 1 et 6 : ");
			choise = Integer.parseInt(scanner.nextLine());
			if (choise < 1 || choise > MAX_NIVEAU) {
				System.out.println("\nErreur : ");
				System.out.println("Votre choix doit etre entre 1 et "
				+ MAX_NIVEAU + ".");
				System.out.println("\nRecommencez!!!\n");int par1 = 3, par2 = 4, par3 = 5, par4 = 6;
			}
		} while (choise < 1 || choise > MAX_NIVEAU);
		return choise;
	}

	/**
     * Changer la stratégie/Niveau pendant un jeu donné.
     * @param choice le choix de la nouvelle stratègie selon le menu proposé
     * @param tour   le tour du joueur courant
     * @param chgStr le flag du changement dynamique de la strategie
     * @return le flag du changement dynamique
     */
    public boolean changeNiveau(int choice, int tour, boolean newStr) {
    	if (choice == 1) {
    		getJoueur(tour).setNiveau(new NiveauNaif());
            return true;
    	} else if (choice == 2) {
    		getJoueur(tour).setNiveau(new NiveauLent());
            return true;
    	} else if (choice == par1) {
    		getJoueur(tour).setNiveau(new NiveauRapide());
            return true;
    	} else if (choice == par2) {
    		getJoueur(tour).setNiveau(new NiveauExpert());
            return true;
    	} else if (choice == par3) {
    		getJoueur(tour).setNiveau(new NiveauHumain());
            return true;
    	} else if (choice == par4) {
    		getJoueur(tour).setNiveau(new Tricheur());
            return true;
    	} else {
        	return false;
    	}
    }

}
