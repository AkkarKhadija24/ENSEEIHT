package arbre;

import javax.swing.*;
import javax.swing.event.DocumentEvent;
import javax.swing.event.DocumentListener;


import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Objects;
import projectmanagment.Etat;

public class ModificationSousTachePanel extends JPanel {
    private JTextField nomField = new JTextField("nom de la tache");
    private JTextArea descriptionField = new JTextArea("description");
    private JTextField debutDateChooser = new JTextField("date début");
    private JTextField finDateChooser = new JTextField("date fin");
    private JComboBox<Etat> etatComboBox = new JComboBox<>(Etat.values());
    private JButton validerButton = new JButton("Valider");
    private JButton ajouterMembre = new JButton("ajouterMembre");
    private JButton supprimerMembre = new JButton("supprimerMembre");

    private Date debutDate;
    private Date finDate;
    private boolean isModified;


    public ModificationSousTachePanel() {
        setLayout(new BorderLayout());

        JPanel contentPanel = new JPanel();
        contentPanel.setLayout(new BorderLayout());
        add(contentPanel, BorderLayout.CENTER);

        // Ajout des composants au JPanel avec BorderLayout
        JPanel topPanel = new JPanel(new BorderLayout());
        topPanel.add(nomField, BorderLayout.NORTH);
        contentPanel.add(topPanel, BorderLayout.NORTH);

        JScrollPane descriptionScrollPane = new JScrollPane(descriptionField);
        contentPanel.add(descriptionScrollPane, BorderLayout.CENTER);
        

        JPanel bottomPanel = new JPanel(new BorderLayout());
        JPanel datePanel = new JPanel(new BorderLayout());
        datePanel.add(debutDateChooser, BorderLayout.WEST);
        datePanel.add(finDateChooser, BorderLayout.EAST);
        bottomPanel.add(datePanel, BorderLayout.NORTH);
        bottomPanel.add(etatComboBox, BorderLayout.CENTER);
        
        JPanel south = new JPanel(new FlowLayout());
        bottomPanel.add(south, BorderLayout.SOUTH);
        south.add(ajouterMembre);
        south.add(supprimerMembre);
        south.add(validerButton);
//        bottomPanel.add(ajouterMembre, BorderLayout.SOUTH);
//        bottomPanel.add(validerButton, BorderLayout.SOUTH);
//        bottomPanel.add(supprimerMembre, BorderLayout.SOUTH);
        contentPanel.add(bottomPanel, BorderLayout.SOUTH);

        // Ajoute un DocumentListener pour chaque composant de saisie


        // Ajout d'un gestionnaire d'événements au bouton de conversion
        validerButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                convertDates();
            }
        });


    }

    // Méthode pour convertir les dates saisies
    private void convertDates() {
        String debutDateString = debutDateChooser.getText();
        String finDateString = finDateChooser.getText();

        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");

        try {
            debutDate = dateFormat.parse(debutDateString);
            finDate = dateFormat.parse(finDateString);

            // Utilisez les dates converties comme vous le souhaitez
            System.out.println("Date début : " + debutDate);
            System.out.println("Date fin : " + finDate);
        } catch (ParseException ex) {
            System.out.println("Format de date invalide !");
            ex.printStackTrace();
        }
    }

    // Méthodes getter pour les dates converties
    public Date getDebutDate() {
        return debutDate;
    }

    public Date getFinDate() {
        return finDate;
    }

    // Méthodes pour récupérer les autres valeurs saisies dans les composants d'interface utilisateur
    public String getNom() {
        return nomField.getText();
    }

    public String getDescription() {
        return descriptionField.getText();
    }

    public Etat getEtat() {
        return (Etat) etatComboBox.getSelectedItem();
    }

    public void setEtat(Etat etat) {
        etatComboBox.setSelectedItem(etat);
    }

    public void setFinDate(Date fin) {
        finDateChooser.setText(formatDate(fin));
    }
    public void setDebutDate(Date debut) {
        debutDateChooser.setText(formatDate(debut));
    }

    public void setDescription(String description) {
        descriptionField.setText(description);
    }

    public void setNom(String nom) {
        nomField.setText(nom);
    }



    private String formatDate(Date date) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
        return dateFormat.format(date);
    }
    
    public JButton getAjouterMembre() {
    	return ajouterMembre;
    }
    
    public JButton getSupprimerMembre() {
    	return supprimerMembre;
    }
}
