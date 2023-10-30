/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package projectmanagment;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.util.Date;

import javax.swing.JButton;
import javax.swing.JDialog;
import javax.swing.JFormattedTextField;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.event.DocumentEvent;
import javax.swing.event.DocumentListener;
import javax.swing.event.ListSelectionEvent;
import javax.swing.event.ListSelectionListener;

import projectmanagment.Membre;
import projectmanagment.Projet;
import projectmanagment.VueGlobale;


/**
 *
 * @author Hay Info
 */
public class ControleurVueGlobale {
	
	private Projet projet;
	private VueGlobale vue;

	public ControleurVueGlobale(Projet projet, VueGlobale vue) {
		this.projet = projet;
		this.vue = vue;
	
		//Actions
		this.vue.getAjouterMembre().addActionListener(new ajouterMembre());
		this.vue.getBoutonAnnuler().addActionListener(new annulerModifs());
		this.vue.getBoutonValider().addActionListener(new validerModifs());
		this.vue.getDescription().getDocument().addDocumentListener(new modifsDescription());
		this.vue.getNomProjet().addMouseListener(new modifsNom());
		this.vue.getDatesPane().addMouseListener(new modifsDates());
		this.vue.getSupprimerMembres().addActionListener(new supprimerMembres());
		this.vue.getAffichageMembres().getSelectionModel().addListSelectionListener(new selectionnerMembres());
		this.vue.getBoutonRetour().addActionListener(new ActionListener() {
			
			@Override
			public void actionPerformed(ActionEvent e) {
				vue.getFenetre().dispose();
				
			}
		});;
	}
	
	
// Les MouseListener
	
	private class modifsNom implements MouseListener {

		@Override
		public void mouseClicked(MouseEvent arg0) {
			String nom = JOptionPane.showInputDialog("nouveau nom du projet :");
	        if (nom != null && nom.length() > 0) {
	            // Changer le nom dans le modèle
	        	projet.setName(nom);
	            // Changer le nom dans la vue
	        	vue.getNomProjet().setText(nom);
	        }
		}
	
	    @Override
	    public void mouseEntered(MouseEvent e) {
	        // afficher le texte "cliquer pour modifier"
	        vue.getNomProjet().setToolTipText("cliquer pour modifier");
	    }
	    @Override
	    public void mouseExited(MouseEvent e) {
	        vue.getNomProjet().setToolTipText(null);
	    }
	
		@Override
		public void mousePressed(MouseEvent arg0) {		
		}
	
		@Override
		public void mouseReleased(MouseEvent arg0) {		
		}
			
	}
	
	private class modifsDates implements MouseListener {

		@Override
		public void mouseClicked(MouseEvent arg0) {
            JDialog dialog = new JDialog(vue.getFenetre(), "Modifier les dates", true);
            JPanel dialogPanel = new JPanel();
            dialog.setContentPane(dialogPanel);
            
            // Création des JFormattedTextFields
            JFormattedTextField dateFieldDebut = new JFormattedTextField(vue.getDateFormat());
            dateFieldDebut.setValue(projet.getDateDebut());
            dialogPanel.add(dateFieldDebut);
            
            JFormattedTextField dateFieldFin = new JFormattedTextField(vue.getDateFormat());
            dateFieldFin.setValue(projet.getDateFin());
            dialogPanel.add(dateFieldFin);
            
            // Ajout d'un bouton "Valider" pour enregistrer la modification
            JButton BoutonValiderDates = new JButton("Valider");
            dialogPanel.add(BoutonValiderDates);
    		BoutonValiderDates.addActionListener(new validerDates(dialog, dateFieldDebut, dateFieldFin));
            dialog.pack();
            dialog.setLocationRelativeTo(vue.getFenetre());
            dialog.setVisible(true);
		}

	    @Override
	    public void mouseEntered(MouseEvent e) {
	        // afficher le texte "cliquer pour modifier"
	        vue.getDatesPane().setToolTipText("cliquer pour modifier");
	    }
	    @Override
	    public void mouseExited(MouseEvent e) {
	        vue.getDatesPane().setToolTipText(null);
	    }

		@Override
		public void mousePressed(MouseEvent arg0) {
			// TODO Auto-generated method stub
			
		}

		@Override
		public void mouseReleased(MouseEvent arg0) {
			// TODO Auto-generated method stub
			
		}
		
	    private class validerDates implements ActionListener {
	        private final JDialog dialog;
	        private final JFormattedTextField dateFieldDebut;
	        private final JFormattedTextField dateFieldFin;

	        public validerDates(JDialog dialog, JFormattedTextField dateFieldDebut, JFormattedTextField dateFieldFin) {
	            this.dialog = dialog;
	            this.dateFieldDebut = dateFieldDebut;
	            this.dateFieldFin = dateFieldFin;
	        }

	        @Override
	        public void actionPerformed(ActionEvent arg0) {
	            // Récupération des dates modifiées
	            Date newDateDebut = (Date) dateFieldDebut.getValue();
	            Date newDateFin = (Date) dateFieldFin.getValue();

	            // Mise à jour du modèle
	            projet.setDateDebut(newDateDebut);
	            projet.setDateFin(newDateFin);

	            // Mise à jour de la vue
	            vue.getLabelDebut().setText(vue.getDateFormat().format(newDateDebut));
	            vue.getLabelFin().setText(vue.getDateFormat().format(newDateFin));

	            // Fermeture de la JDialog
	            dialog.dispose();
            }
	    }
	}

	
	
// Les ActionListener
	
	private class Retour implements ActionListener {
		@Override
		public void actionPerformed (ActionEvent e) {
//			GlobalView gb = new GlobalView();
//			gb.setVisible(true);
			
	}
	}

	private class ajouterMembre implements ActionListener {
		@Override
		public void actionPerformed (ActionEvent e) {
			String nomMembre = JOptionPane.showInputDialog("nom :");
	        if (nomMembre != null && nomMembre.length() > 0) {
	            // Ajouter le membre dans le modèle
	        	Membre newMembre = new Membre(nomMembre);
	        	projet.getMembres().add(newMembre);
	            // Ajouter le membre à la vue
	        	vue.getMembres().addRow(new Object[] {nomMembre});
	        }
		}
	}
	
	private class supprimerMembres implements ActionListener {
		@Override
		public void actionPerformed (ActionEvent e) {
			int[] selectedRows = vue.getAffichageMembres().getSelectedRows();
            int reponse = JOptionPane.showConfirmDialog(vue.getFenetre(), "Êtes-vous sûr de vouloir supprimer les membres sélectionnés ? Ils seront retirés automatiquement de toutes les tâches du projet. Cette action est irréversible.", "Confirmation de suppression", JOptionPane.YES_NO_OPTION, JOptionPane.WARNING_MESSAGE);
            if (reponse == JOptionPane.YES_OPTION) {
                for (int i = selectedRows.length - 1; i >= 0; i--) {
                	try {
                	// Supprimer le membre du modèle
                	String str = (String) vue.getAffichageMembres().getValueAt(selectedRows[i], 0);
                	//Membre membre = projet.stringToMembre(str);
                	//projet.supprimerMembre(membre);
                	
                	//Supprimer le membre de la vue
                	vue.getMembres().removeRow(selectedRows[i]);
                	
                	} catch (Exception exc) {
                		exc.printStackTrace();
                }
	        }
	    }
	}
	}
		
		private class annulerModifs implements ActionListener {
			@Override
			public void actionPerformed (ActionEvent e) {
				vue.getDescription().setText(projet.getDescription());
				activerBoutons(false);
			}
		}
		
		private class validerModifs implements ActionListener {
			@Override
			public void actionPerformed (ActionEvent e) {
				projet.setDescription(vue.getDescription().getText());
				activerBoutons(false);
			}
		}
		
// Les DocumentListener
		
		private class modifsDescription implements DocumentListener {

			@Override
			public void changedUpdate(DocumentEvent arg0) {
				activerBoutons(true);
			}

			@Override
			public void insertUpdate(DocumentEvent arg0) {
				activerBoutons(true);
			}

			@Override
			public void removeUpdate(DocumentEvent arg0) {
				activerBoutons(true);
			}
			
		}
		
		private void activerBoutons(boolean bool) {
			vue.getBoutonAnnuler().setEnabled(bool);
			vue.getBoutonValider().setEnabled(bool);
		}
		
		
// Les ListSelectionListener
		
		private class selectionnerMembres implements ListSelectionListener {

			@Override
			public void valueChanged(ListSelectionEvent arg0) {
				if (vue.getAffichageMembres().getSelectionModel().getSelectedIndices().length >0) {
					vue.getSupprimerMembres().setEnabled(true);
				} else {
					vue.getSupprimerMembres().setEnabled(false);
				}
				
			}
			
		}
}

