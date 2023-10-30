package arbre;


import java.awt.Dimension;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;


import java.util.Date;

import javax.swing.JDialog;
import javax.swing.JFrame;
import javax.swing.JOptionPane;
import projectmanagment.Etat;
import projectmanagment.Membre;
import projectmanagment.Projet;
import projectmanagment.Tache;

public class ArbreController {

		private ArbreVue treeView;
	    private ArbreTache treeModel;


	    public ArbreController(ArbreTache treeModell, ArbreVue View) {
	        this.treeModel = treeModell;
	        this.treeView = View;

	      
	        
	        // Add an under task, pour cela il faut récupérer
	        
	        // le noeud selectionner et l'ajouter à partir  de l'abre
	        
	     // BOUTON AJOUTER
	        treeView.getAddButton().addActionListener(new ActionListener() {
	            public void actionPerformed(ActionEvent e) {
	                // Code à exécuter lorsque le bouton est cliqué
	            	
	            	//récupération de la tâche mère
	            	Tache parentTask= (Tache) View.getTree().getSelectedNode();
	            	// Création d'un nouveau nœud
	            	
	            	if (parentTask != null) {
	            	NouvelleSousTachePanel newTaskPanel = new NouvelleSousTachePanel();
	            	newTaskPanel.setPreferredSize(new Dimension(800,600));
	            	newTaskPanel.setVisible(true);
	            	
	            

	            	// Affichage de la boîte de dialogue modale pour saisir les informations de la nouvelle sous-tâche
	            	int option = JOptionPane.showConfirmDialog(null, newTaskPanel, "Ajouter une sous-tâche", JOptionPane.OK_CANCEL_OPTION);
	            	if (option == JOptionPane.OK_OPTION) {
	            	// Récupération des valeurs saisies dans les composants d'interface utilisateur
	            		String nom = newTaskPanel.getNom();
	            		String description = newTaskPanel.getDescription();
	            		Date debut = newTaskPanel.getDebutDate();
	            		Date fin = newTaskPanel.getFinDate();
	            		Etat etat = (Etat) newTaskPanel.getEtat();
	            		Tache SousTache = new Tache(nom, description, debut, fin, etat, parentTask);
	            	
	            	
	            		

	            		// Ajout du nouveau nœud au modèle
	            		treeModel.insertNode(parentTask, SousTache);
	            	
	            		
	            		// Actualisation de l'affichage de l'interface utilisateur
	            		treeModel.reload();
	            		}
	            	}
	            }
	        });
	        
	     // BOUTON SUPPRIMER
	        treeView.getRemoveButton().addActionListener(new ActionListener() {
	        	public void actionPerformed(ActionEvent e) {
	        	
	        	//selection du noued à supprimer
            	Tache noeudAsupprimer= (Tache) View.getTree().getSelectedNode();
            	if (noeudAsupprimer != null) {
            	//récupération du parent du noeud
            	Tache parentNoeud = noeudAsupprimer.getTacheSuperieure();
            	//Suppression du noeud
            	treeModel.removeNode(parentNoeud, noeudAsupprimer);
            	
            	
            	// Actualisation de l'arbre graphique
            	treeModel.reload();
	        	}
	        	}
	        });
	        
	        
	        // BOUTON MODIFIER
	        treeView.getModifyButton().addActionListener(new ActionListener() {
	            public void actionPerformed(ActionEvent e) {
	            	
	            	//selection du noued à supprimer
	            	Tache noeud= (Tache) treeView.getTree().getSelectedNode();
	            	
	            	Projet projet = treeModel.getProjet();
	            	
	            	
	            	
	            	if (noeud != null) {
	            	    ModificationSousTachePanel newTaskPanel = new ModificationSousTachePanel();
	            	    
	            	    newTaskPanel.getAjouterMembre().addActionListener(new ActionListener() {

							@Override
							public void actionPerformed(ActionEvent e) {
								new FenetreAjouterMembre(projet, noeud);
								
							}
	            	    	
	            	    });
	            	    
	            	    newTaskPanel.getSupprimerMembre().addActionListener(new ActionListener() {

							@Override
							public void actionPerformed(ActionEvent e) {
								new FenetreRetirerMembre(projet, noeud);
								
							}
	            	    	
	            	    });
	            	    
	            	    

	            	    // Initialisation des composants avec les valeurs existantes de l'objet Tache
	            	    newTaskPanel.setNom(noeud.getNom());
	            	    newTaskPanel.setDescription(noeud.getDescription());
	            	    newTaskPanel.setDebutDate(noeud.getDebut());
	            	    newTaskPanel.setFinDate(noeud.getFin());
	            	    newTaskPanel.setEtat(noeud.getEtat());

	            	    newTaskPanel.setVisible(true);
	            	    newTaskPanel.setPreferredSize(new Dimension(800,600));

	            	    // Affichage de la boîte de dialogue modale pour modifier la sous-tâche
	            	    int option = JOptionPane.showConfirmDialog(null, newTaskPanel, "Modifier la sous-tâche", JOptionPane.OK_CANCEL_OPTION);
	            	    if (option == JOptionPane.OK_OPTION) {
	            	        // Récupération des valeurs saisies dans les composants d'interface utilisateur
	            	        String nom = newTaskPanel.getNom();
	            	        String description = newTaskPanel.getDescription();
	            	        Date debut = newTaskPanel.getDebutDate();
	            	        Date fin = newTaskPanel.getFinDate();
	            	        Etat etat = (Etat) newTaskPanel.getEtat();

	            	        // Vérification et mise à jour des valeurs modifiées
	            	        if (!nom.equals(noeud.getNom())) {
	            	            noeud.setNom(nom);
	            	        }
	            	        if (!description.equals(noeud.getDescription())) {
	            	            noeud.setDescription(description);
	            	        }
	            	        if (!debut.equals(noeud.getDebut())) {
	            	            noeud.setDebut(debut);
	            	        }
	            	        if (!fin.equals(noeud.getFin())) {
	            	            noeud.setFin(fin);
	            	        }
	            	        if (!etat.equals(noeud.getEtat())) {
	            	            noeud.setEtat(etat);
	            	        }

	            	        // Actualisation de l'affichage de l'interface utilisateur
	            	        treeModel.reload();
	            	}
	            	}

	            
	            }
	        });
	        
	        // BOUTON AFFICHER
	        treeView.getDisplayButton().addActionListener(new ActionListener() {
	            public void actionPerformed(ActionEvent e) {
	            	//afficher les membres, la tache la description de la tache et les dates 
	            	
	            	//selection du noued à afficher
	            	Tache noeudAfficher= (Tache) View.getTree().getSelectedNode();
	            	
	            	JDialog dialog = new JDialog();
	                dialog.setTitle("Tâche");
	                dialog.setModal(true); // Définit le dialogue comme modale pour bloquer l'interaction avec la fenêtre parente
	                dialog.setDefaultCloseOperation(JDialog.DISPOSE_ON_CLOSE); // Ferme le dialogue lorsqu'il est fermé

	                AfficherTachePanel afficherPanel = new AfficherTachePanel(noeudAfficher);

	                dialog.getContentPane().add(afficherPanel);
	                dialog.pack(); // Redimensionne le dialogue pour s'adapter aux composants
	                dialog.setLocationRelativeTo(null); // Centre le dialogue sur l'écran
	                dialog.setVisible(true); // Affiche le dialogue
	            }
	
	        });
	        
	        treeView.getRetourButton().addActionListener((new ActionListener() {

				@Override
				public void actionPerformed(ActionEvent e) {
					treeView.setVisible(false);
					
				}
	        	
	        }));
	        

	    }
	    }

	







        