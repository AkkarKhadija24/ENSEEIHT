package projectmanagment;


import java.awt.BorderLayout;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.*;

public class FenetreMembre extends JFrame {
    private static final long serialVersionUID = 1L;
    private static final String EXIT_ON_CLOSE = null;
    private JTable tableAFaire, tableEnCours, tableTerminees;

	public FenetreMembre(Membre membre) {
        // Configure la fenêtre
        setTitle("Gestion de Projets");
        setSize(1000, 800);
        setDefaultCloseOperation(EXIT_ON_CLOSE);

        // Crée un modèle de table avec des colonnes pour les tâches et les dates d'échéance
        String[] colonnes = {"Tâches à effectuer", "Date d'échéance", "Tache supérieur"};
        TableMembre modelAFaire = new TableMembre(colonnes, 0);
        TableMembre modelEnCours = new TableMembre(colonnes, 0);
        TableMembre modelTerminees = new TableMembre(colonnes, 0);

        // Ajoute les tache du membre au modèle de table
        for (Tache tache : membre.getTachesARealiser()) {
        	if (tache.getEtat() == Etat.EnCours) {
        		modelEnCours.addrow(tache);
        	} else if (tache.getEtat() == Etat.Finie) {
        		modelTerminees.addrow(tache);
        	} else {
        		modelAFaire.addrow(tache);
        	}
        }
        
        
        

        // Crée des tableaux avec les modèles de table
        tableAFaire = new JTable(modelAFaire);
        tableEnCours = new JTable(modelEnCours);
        tableTerminees = new JTable(modelTerminees);

        // Configure les tableaux pour permettre un redimensionnement automatique des colonnes
        tableAFaire.setAutoResizeMode(JTable.AUTO_RESIZE_ALL_COLUMNS);
        tableEnCours.setAutoResizeMode(JTable.AUTO_RESIZE_ALL_COLUMNS);
        tableTerminees.setAutoResizeMode(JTable.AUTO_RESIZE_ALL_COLUMNS);

        // Ajoute les tableaux à la fenêtre
        JPanel tablesPanel = new JPanel(new GridLayout(3, 1));
        tablesPanel.add(new JScrollPane(tableAFaire));
        tablesPanel.add(new JScrollPane(tableEnCours));
        tablesPanel.add(new JScrollPane(tableTerminees));
        getContentPane().add(tablesPanel, BorderLayout.CENTER);

        // Ajoute les titres des tableaux
        JPanel titlesPanel = new JPanel(new GridLayout(3, 1));
        titlesPanel.add(new JLabel("À faire"));
        titlesPanel.add(new JLabel("En cours"));
        titlesPanel.add(new JLabel("Terminées"));
        getContentPane().add(titlesPanel, BorderLayout.WEST);

        // Ajoute un bouton pour ajouter de nouvelles tâches
        JPanel panel = new JPanel();
        JButton addButton = new JButton("Ajouter une tâche sous cette tache");
        addButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
            	int selectedRowAFaire = tableAFaire.getSelectedRow();
                int selectedRowEnCours = tableEnCours.getSelectedRow();
                int selectedRowTerminees = tableTerminees.getSelectedRow();
                // Ajoute une nouvelle ligne au modèle de table avec des valeurs par défaut
                
                if (selectedRowAFaire != -1) {
                    modelAFaire.addtache(selectedRowAFaire, membre);
                } else if (selectedRowEnCours != -1) {
                    modelEnCours.addtache(selectedRowEnCours, membre);
                } else if (selectedRowTerminees != -1) {
                    modelTerminees.addtache(selectedRowTerminees, membre);
                } else {
                    JOptionPane.showMessageDialog(null, "Veuillez sélectionner une tâche à supprimer.");
                }
            }
        });
        panel.add(addButton);
        
        JButton retour = new JButton("Retour");
        retour.addActionListener(new Retour(this));
        panel.add(retour);

        // Ajoute un bouton pour supprimer une tâche
        JButton deleteButton = new JButton("Supprimer une tâche");
        deleteButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e){

                // Supprime une tâche sélectionnée du tableau "À faire", "En cours" ou "Terminées"
                int selectedRowAFaire = tableAFaire.getSelectedRow();
                int selectedRowEnCours = tableEnCours.getSelectedRow();
                int selectedRowTerminees = tableTerminees.getSelectedRow();

                if (selectedRowAFaire != -1) {
                    modelAFaire.removetache(selectedRowAFaire);
                } else if (selectedRowEnCours != -1) {
                    modelEnCours.removetache(selectedRowEnCours);
                } else if (selectedRowTerminees != -1) {
                    modelTerminees.removetache(selectedRowTerminees);
                } else {
                    JOptionPane.showMessageDialog(null, "Veuillez sélectionner une tâche à supprimer.");
                }
            }
        });
        panel.add(deleteButton);
        
        JButton moveToAFaire = new JButton("Déplacer à faire");
        moveToAFaire.addActionListener(e -> {
        	int selectedRowEnCour = tableEnCours.getSelectedRow();
            int selectedRowTerminees = tableTerminees.getSelectedRow();
            if (selectedRowEnCour != -1) {
            	Tache tache = modelEnCours.getTache(selectedRowEnCour);
            	tache.setEtat(Etat.NonCommencee);
            	modelAFaire.addrow(tache);
                modelEnCours.removeRow(selectedRowEnCour);
            } else if (selectedRowTerminees != -1) {
            	Tache tache = modelTerminees.getTache(selectedRowTerminees);
            	tache.setEtat(Etat.NonCommencee);
            	modelAFaire.addrow(tache);
                modelTerminees.removeRow(selectedRowTerminees);
            } else if (tableAFaire.getSelectedRow() == -1) {
                JOptionPane.showMessageDialog(null, "Veuillez sélectionner une tâche à déplacer.");
            }
        });
        panel.add(moveToAFaire);

        // Ajoute les boutons pour déplacer les tâches entre les tableaux
        JButton moveToEnCours = new JButton("Déplacer en cours");
        moveToEnCours.addActionListener(e -> {
            int selectedRowAFaire = tableAFaire.getSelectedRow();
            int selectedRowTerminees = tableTerminees.getSelectedRow();
            if (selectedRowAFaire != -1) {
            	Tache tache = modelAFaire.getTache(selectedRowAFaire);
            	tache.setEtat(Etat.EnCours);
                modelEnCours.addrow(tache);
                modelAFaire.removeRow(selectedRowAFaire);
            } else if (selectedRowTerminees != -1) {
            	Tache tache = modelTerminees.getTache(selectedRowTerminees);
            	tache.setEtat(Etat.EnCours);
                modelEnCours.addrow(tache);
                modelTerminees.removeRow(selectedRowTerminees);
            } else if (tableEnCours.getSelectedRow() == -1) {
                JOptionPane.showMessageDialog(null, "Veuillez sélectionner une tâche à déplacer.");
            }
        });
        panel.add(moveToEnCours);

        JButton moveToTerminee = new JButton("Déplacer terminées");
        moveToTerminee.addActionListener(e -> {
        	int selectedRowAFaire = tableAFaire.getSelectedRow();
            int selectedRowEnCour = tableEnCours.getSelectedRow();
            if (selectedRowAFaire != -1) {
            	Tache tache = modelAFaire.getTache(selectedRowAFaire);
            	tache.setEtat(Etat.Finie);
                modelTerminees.addrow(tache);
                modelAFaire.removeRow(selectedRowAFaire);
            } else if (selectedRowEnCour != -1) {
            	Tache tache = modelEnCours.getTache(selectedRowEnCour);
            	tache.setEtat(Etat.Finie);
            	modelTerminees.addrow(tache);
                modelEnCours.removeRow(selectedRowEnCour);
            } else if (tableTerminees.getSelectedRow() == -1) {
                JOptionPane.showMessageDialog(null, "Veuillez sélectionner une tâche à déplacer.");
            }
        });
        panel.add(moveToTerminee);

        getContentPane().add(panel, BorderLayout.SOUTH);
        this.setLocationRelativeTo(null);
        this.setVisible(true);
    }

    private void setDefaultCloseOperation(String exitOnClose) {
        super.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }
}

class Retour implements ActionListener{
	FenetreMembre f;
	public Retour(FenetreMembre f) {
		this.f = f;
	}
	@Override
	public void actionPerformed(ActionEvent e) {
		// TODO Auto-generated method stub
		f.dispose();
		
	}
	
}
