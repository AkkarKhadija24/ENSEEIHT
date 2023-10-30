/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package projectmanagment;

import javax.swing.*;
import javax.swing.table.DefaultTableCellRenderer;
import javax.swing.table.DefaultTableModel;

import projectmanagment.Membre;
import projectmanagment.Projet;

import java.awt.*;

import java.text.SimpleDateFormat;

/**
 *
 * @author Hay Info
 */
public class VueGlobale extends JFrame {

	private Projet projet;
	
//  Les éléments de la vue (IHM)
//  ----------------------------

	/** Fenêtre principale */
	private JFrame fenetre;
	
	/**Zone qui indique le nom du projet */
	private JLabel nomProjet;
	
	/**Zone qui indique la date de début du projet */
    private JLabel labelDebut;
    
	/**Zone qui indique la date de fin du projet */
    private JLabel labelFin;
    
    /**Zone qui regroupe l'affichage des dates */
    private JPanel datesPane;
    
    /** Format des dates */
    private SimpleDateFormat dateFormat;
    
	/**Zone qui indique la description du projet */
	private JTextArea description;
	
	/**Table qui recense les membres du projet*/
	private JTable affichageMembres;
	private DefaultTableModel membres;
	
	/**Bouton permettant d'ajouter un membre au projet*/
	private JButton ajouterMembre;
	
	/** Bouton permettant de supprimer un ou plusieurs membres du projet */
	private JButton supprimerMembres;
	
	/** Bouton permettant d'enregistrer les modifications de la description */
	private JButton boutonValider;

	/** Bouton permettant d'annuler les modifications de la description */
	private JButton boutonAnnuler;
	
	/** Bouton permettant de retourner sur la page précédente */
	private JButton boutonRetour;
	
	
	// Le constructeur
	// ---------------

		/** Construire le projet */
		public VueGlobale(Projet projet) {
			
			// Initialiser le modèle
			this.projet = projet;

			// Créer l'élément nomProjet
			this.nomProjet = new JLabel(this.projet.getName());
			
			// Créer les éléments concernant les dates
			this.dateFormat= new SimpleDateFormat("dd/MM/yyyy");
			this.dateFormat.setLenient(false);
			
			this.labelDebut = new JLabel(dateFormat.format(this.projet.getDateDebut()));
			this.labelFin = new JLabel(dateFormat.format(this.projet.getDateFin()));
			
			
			//Créer les éléments concernant la description
			this.description = new JTextArea(this.projet.getDescription());
			this.boutonAnnuler = new JButton("Annuler les modifications");
			this.boutonValider = new JButton("Valider les modifications");
			
			
			// Créer les élements concernant les membres
			this.membres = new DefaultTableModel();
		    this.membres.addColumn("Noms");
			for (Membre membre : this.projet.getMembres()) {
			    this.membres.addRow(new Object[]{membre.getNom()});
			}
			this.supprimerMembres = new JButton("Supprimer les membres sélectionnés");
			this.supprimerMembres.setEnabled(false);
			this.ajouterMembre = new JButton("Ajouter membre");
			
			//Bouton retour
			this.boutonRetour = new JButton("Retour");

						
			// Construire la vue (présentation)
			
			// Polices utilisées
			Font fontTitre = new Font("Verdana", Font.BOLD, 30);
			Font fontTitre2 = new Font("Verdana", Font.BOLD, 18);
			
			//Bouton Retour
			JPanel retourPane = new JPanel(new FlowLayout(FlowLayout.LEFT));
	        retourPane.add(this.boutonRetour);
			
			// Mise en forme du titre du projet
			this.nomProjet.setFont(fontTitre);
			JPanel titlePane = new JPanel(new FlowLayout(FlowLayout.CENTER));
			titlePane.add(this.nomProjet);
			
			// Mise en forme des dates
			JLabel tiret = new JLabel("-");	
			this.labelDebut.setFont(fontTitre2);
			this.labelFin.setFont(fontTitre2);
			
			datesPane = new JPanel();
			datesPane.setLayout(new BoxLayout(datesPane, BoxLayout.X_AXIS));
			datesPane.add(labelDebut);
	        datesPane.add(Box.createHorizontalStrut(10));
			datesPane.add(tiret);
	        datesPane.add(Box.createHorizontalStrut(10));
			datesPane.add(labelFin);
			
			// Mise en forme de la description
			JLabel descriptionLabel = new JLabel("Description du projet");
			descriptionLabel.setFont(fontTitre2);
			descriptionLabel.setAlignmentX(Component.LEFT_ALIGNMENT);
			
			JPanel enteteDescription = new JPanel(new FlowLayout());
			enteteDescription.add(descriptionLabel);
			boutonAnnuler.setEnabled(false);
			enteteDescription.add(boutonAnnuler);
			boutonValider.setEnabled(false);
			enteteDescription.add(boutonValider);
			

			JPanel descriptionPane = new JPanel(new BorderLayout());
			descriptionPane.add(enteteDescription, BorderLayout.NORTH);
			descriptionPane.add(new JScrollPane(this.description), BorderLayout.CENTER);
			
			// Affichage des membres
			this.affichageMembres = new JTable(this.membres);
			this.affichageMembres.setDefaultEditor(Object.class, null);	//empêcher l'utilisateur de pouvoir modifier le contenu des lignes
			this.affichageMembres.setRowSelectionAllowed(true);
	        this.affichageMembres.setSelectionMode(ListSelectionModel.MULTIPLE_INTERVAL_SELECTION);
			JLabel membresLabel = new JLabel("Membres du projet");
			membresLabel.setFont(fontTitre2);
			
			JScrollPane scrollMembres = new JScrollPane(this.affichageMembres);
			DefaultTableCellRenderer centerRenderer = new DefaultTableCellRenderer();
			centerRenderer.setHorizontalAlignment(JLabel.CENTER );

			for (int i = 0; i < this.affichageMembres.getColumnCount(); i++)
			{
			    this.affichageMembres.getColumnModel().getColumn(i).setCellRenderer(centerRenderer);
			}
			
			JPanel enteteMembres = new JPanel(new FlowLayout());
			enteteMembres.add(membresLabel, BorderLayout.NORTH);
			enteteMembres.add(supprimerMembres);
			
			JPanel membresPane = new JPanel(new BorderLayout());
			membresPane.add(enteteMembres, BorderLayout.NORTH);
			membresPane.add(scrollMembres, BorderLayout.CENTER);
			
			membresPane.add(ajouterMembre, BorderLayout.SOUTH);

			
			
		     // Construction de la vue avec un BoxLayout vertical
	        JPanel contentPane = new JPanel();
	        contentPane.setLayout(new BoxLayout(contentPane, BoxLayout.Y_AXIS));
	        contentPane.add(retourPane);
	        contentPane.add(titlePane);
	        contentPane.add(datesPane);
	        contentPane.add(Box.createVerticalStrut(10));
	        contentPane.add(descriptionPane);
	        contentPane.add(Box.createVerticalStrut(10));
	        contentPane.add(membresPane);

	        // Définition de la fenêtre principale
	        this.fenetre = new JFrame("Vue Globale");
	        this.fenetre.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
	        this.fenetre.setContentPane(contentPane);

			// afficher la fenêtre
	        this.fenetre.setSize(1077, 640);
	        this.fenetre.setLocationRelativeTo(null); // centrer la fenêtre
			this.fenetre.setVisible(true);	// l'afficher
		}



		public JLabel getNomProjet() {
			return nomProjet;
		}


		public JLabel getLabelDebut() {
			return labelDebut;
		}



		public JLabel getLabelFin() {
			return labelFin;
		}


		public JTextArea getDescription() {
			return description;
		}


		public DefaultTableModel getMembres() {
			return membres;
		}



		public JButton getAjouterMembre() {
			return ajouterMembre;
		}
		
		public JButton getBoutonAnnuler() {
			return boutonAnnuler;
		}
		
		public JButton getBoutonValider() {
			return boutonValider;
		}



		public JPanel getDatesPane() {
			return datesPane;
		}



		public SimpleDateFormat getDateFormat() {
			return dateFormat;
		}



		public JButton getBoutonRetour() {
			return boutonRetour;
		}



		public JFrame getFenetre() {
			return fenetre;
		}



		public JButton getSupprimerMembres() {
			return supprimerMembres;
		}



		public JTable getAffichageMembres() {
			return affichageMembres;
		}
		
		
		
		
		
}
