package projectmanagment;

import java.io.FileWriter;
import java.io.IOException;
import java.text.FieldPosition;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.io.FileReader;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public class Sauvegarde {
	
	/**
	 * Renvoie tous les projets enregistrés localement
	 * 
	 * @return projets chargés
	 */
	public static List<Projet> chargerTousProjets() {
		List<Projet> projetsCharges = new ArrayList<Projet>();
		File folder = new File("./");
		File[] files = folder.listFiles();
        for (File file : files){
        	if (file.isFile() && file.getName().endsWith(".json")) {
	            projetsCharges.add(charger(file.getName()));
        	}
        }
        
        return projetsCharges;
	}
	
	/**
	 * Sauvegarde tous les projets donnés
	 * 
	 * @param projets à sauvegarder
	 */
	public static void sauvegarderTousProjets (List<Projet> projets) {
		for (Projet projet : projets) {
			sauvegarder (projet);
		}
	}

	/**
	 * Charge un projet à partir d'un fichier
	 * 
	 * @param nom du fichier à charger
	 * @return projet
	 */
	public static Projet charger(String nomFichier) {
		JSONParser jsonParser = new JSONParser();
		FileReader reader = null;
		JSONObject projetJObj = null;

		// Lis le fichier de sauvegarde du projet
		try {
			reader = new FileReader(nomFichier);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}

		// Lis le JSON du projet
		try {
			projetJObj = (JSONObject) jsonParser.parse(reader);
		} catch (IOException e) {
			e.printStackTrace();
		} catch (ParseException e) {
			e.printStackTrace();
		}

		// Lis le nom
		String nom = (String) projetJObj.get("Nom");

		// Lis la description
		String description = (String) projetJObj.get("Description");

		// Lis les dates
		JSONArray datesJArray = (JSONArray) projetJObj.get("Dates");
		Date[] dates = lireDates(datesJArray);
		Date debut = dates[0];
		Date fin = dates[1];

		// Lis les membres
		JSONArray membresJArray = (JSONArray) projetJObj.get("Membres");
		Membre[] membres = new Membre[membresJArray.size()];
		String[] nomsMembres = new String[membresJArray.size()];
		for (int i = 0; i < membres.length; i++) {
			String nomMembre = membresJArray.get(i).toString();
			membres[i] = new Membre(nomMembre);
			nomsMembres[i] = nomMembre;
		}
		
		// Création des tâches
		JSONArray tachesJArray = (JSONArray) projetJObj.get("Tâches");
		Tache[] taches = new Tache[tachesJArray.size()]; // Tâches lues
		String[] nomsTaches = new String[tachesJArray.size()]; // Nom des tâches lues
		String[] nomsTachesSup = new String[tachesJArray.size()]; // Nom des tâches supérieures des tâches lues

		// Créé les tâches, sans relations entre elles (sans tâches supérieures attribuées)
		for (int i = 0; i < tachesJArray.size(); i++) {
			JSONObject objTache = (JSONObject) tachesJArray.get(i);
			taches[i] = lireTache(objTache, membres, nomsMembres); // Lis la tâche et l'enregistre
			nomsTaches[i] = taches[i].getNom(); // Enregistre le nom de la tâche
			nomsTachesSup[i] = (String) objTache.get("Tâche supérieure"); // Enregistre le nom de la tâche supérieure de la tâche
		}

		// Relations entre les tâches (attribution des tâches supérieures)
		Tache tachePrincipale = null; // Tâche principale du projet
		for (int i = 0; i < tachesJArray.size(); i++) {
			Tache tacheCourante = taches[i]; // Tâche
			String nomTacheSup = nomsTachesSup[i]; // Nom de la tâche supérieure de la tâche

			if (nomTacheSup != null) {
				Tache tacheSup = taches[Arrays.asList(nomsTaches).indexOf(nomTacheSup)]; // Récupère la tâche supérieure à partir de son nom
				tacheCourante.setTacheSuperieure(tacheSup); // Attribue la tâche supérieure à la tâche
			} else {
				tachePrincipale = tacheCourante; // Si pas de tâche supérieure, c'est la tâche principale du projet
			}
		}

		// Création du projet
		HashSet<Membre> membresSet = new HashSet<>(Arrays.asList(membres));
		Projet projetCharge = new Projet(nom, tachePrincipale, membresSet, description, debut, fin);

		return projetCharge;
	}

	/**
	 * Lis une tâche à partir d'un JSONObject
	 * 
	 * @param objet JSON
	 * @param membres du projet
	 * @param noms des membres du projet
	 * @return tâche
	 */
	private static Tache lireTache(JSONObject objTache, Membre[] membres, String[] nomsMembres) {
		// Lis le nom
		String nomTache = (String) objTache.get("Nom");

		// Lis la description
		String descriptionTache = (String) objTache.get("Description");

		// Lis les dates
		JSONArray datesJArray = (JSONArray) objTache.get("Dates");
		Date[] dates = lireDates(datesJArray);
		Date debut = dates[0];
		Date fin = dates[1];

		// Lis l'état
		Etat etat = Etat.values()[((Long) objTache.get("État")).intValue()];

		// Lis les réalisateurs
		JSONArray realisateursJArray = (JSONArray) (objTache.get("Réalisateurs"));
		Membre[] realisateurs = new Membre[realisateursJArray.size()];
		for (int i = 0; i < realisateurs.length; i++) {
			String nomRealisateur = realisateursJArray.get(i).toString();
			Membre realisateur = membres[Arrays.asList(nomsMembres).indexOf(nomRealisateur)]; // Récupère le membre du projet à partir de son nom
			realisateurs[i] = realisateur; // Assigne le membre comme réalisateur de la tâches
		}

		// Création de la tâche
		Tache tache_lue;
		tache_lue = new Tache(nomTache, descriptionTache, debut, fin, etat, null);
		for (int i = 0; i < realisateurs.length; i++) {
			tache_lue.ajouterMembre(realisateurs[i]);
		}

		return tache_lue;
	}

	/**
	 * Lis une date à partir d'un JSONArray
	 * 
	 * @param tableau JSON
	 * @return date
	 */
	private static Date[] lireDates(JSONArray datesJArray) {
		SimpleDateFormat format = new SimpleDateFormat("EEE MMM dd HH:mm:ss zzz yyyy");
		Date debut = format.parse(datesJArray.get(0).toString(), new ParsePosition(0));
		Date fin = format.parse(datesJArray.get(1).toString(), new ParsePosition(0));
		return new Date[] { debut, fin };
	}

	/**
	 * Sauvegarde un projet dans un fichier
	 * 
	 * @param projet à sauvegarder
	 */
	@SuppressWarnings("unchecked")
	public static void sauvegarder(Projet projet) {
		JSONObject projetObj = new JSONObject();

		// Écris le nom
		projetObj.put("Nom", projet.getName());

		// Écris la description
		projetObj.put("Description", projet.getDescription());

		// Écris les dates
		JSONArray datesArr = new JSONArray();
		ecrireDate(datesArr, projet.getDateDebut());
		ecrireDate(datesArr, projet.getDateFin());
		projetObj.put("Dates", datesArr);

		// Écris les membres
		JSONArray membresArr = new JSONArray();
		ecrireMembres(membresArr, projet.getMembres());
		projetObj.put("Membres", membresArr);

		// Écris les tâches
		JSONArray tachesArr = new JSONArray();
		ecrireTache(tachesArr, projet.getTachePrincipale());
		projetObj.put("Tâches", tachesArr);

		// Créé le fichier de sauvegarde
		try {
			FileWriter file = new FileWriter(projet.getName() + ".json");
			file.write(projetObj.toJSONString());
			file.flush();
			file.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * Écris une tâche dans un JSONArray et itère sur ses sous-tâches
	 * 
	 * @param tableau JSON
	 * @param tâche à écrire
	 */
	@SuppressWarnings("unchecked")
	private static void ecrireTache(JSONArray tachesJArray, Tache tache) {
		// Object JSON de la tâche
		JSONObject tacheJObj = new JSONObject();

		// Écris le nom
		tacheJObj.put("Nom", tache.getNom());

		// Écris la description
		tacheJObj.put("Description", tache.getDescription());

		// Écris les dates
		JSONArray datesJArray = new JSONArray();
		ecrireDate(datesJArray, tache.getDebut());
		ecrireDate(datesJArray, tache.getFin());
		tacheJObj.put("Dates", datesJArray);

		// Écris les réalisateurs
		JSONArray realisateursJArray = new JSONArray();
		ecrireMembres(realisateursJArray, tache.getRealisateurs());
		tacheJObj.put("Réalisateurs", realisateursJArray);

		// Écris le nom de la tâche supérieure
		Tache tacheSup = tache.getTacheSuperieure();
		tacheJObj.put("Tâche supérieure", tacheSup == null ? null : tacheSup.getNom());

		// Écris l'indice de l'état
		tacheJObj.put("État", tache.getEtat().ordinal());

		// Convertit le set des sous-tâches de la tâche en array
		Set<Tache> sousTachesSet = tache.getSousTaches();
		Tache[] sousTaches = new Tache[sousTachesSet.size()];
		sousTachesSet.toArray(sousTaches);

		// Écris les noms des sous tâches
		JSONArray sousTachesJArray = new JSONArray();
		for (int i = 0; i < sousTaches.length; i++) {
			sousTachesJArray.add(sousTaches[i].getNom());
		}
		tacheJObj.put("Sous tâches", sousTachesJArray);

		// Ajoute la tâche au tableau JSON des tâches du projet
		tachesJArray.add(tacheJObj);

		// Itère sur les sous-tâches de la tâche
		for (int i = 0; i < sousTaches.length; i++) {
			ecrireTache(tachesJArray, sousTaches[i]);
		}
	}

	/**
	 * Écris une date dans un JSONArray
	 * 
	 * @param tableau JSON
	 * @param date à écrire
	 */
	@SuppressWarnings("unchecked")
	private static void ecrireDate(JSONArray datesJArray, Date date) {
		SimpleDateFormat format = new SimpleDateFormat("EEE MMM dd HH:mm:ss zzz yyyy");
		datesJArray.add(format.format(date, new StringBuffer(), new FieldPosition(0)).toString());
	}

	/**
	 * Écris des membres dans un JSONArray
	 * 
	 * @param tableau JSON
	 * @param membres à écrire
	 */
	@SuppressWarnings("unchecked")
	private static void ecrireMembres(JSONArray membresJArray, Set<Membre> membres) {
		for (Membre membre : membres) {
			membresJArray.add(membre.getNom());
		}
	}
}
