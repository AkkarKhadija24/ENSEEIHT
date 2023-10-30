package arbre;

import javax.swing.*;

import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;

import javax.swing.*;
import java.awt.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import projectmanagment.Membre;
import projectmanagment.Tache;

public class AfficherTachePanel extends JPanel {
    private Tache tache;

    public AfficherTachePanel(Tache tache) {
        this.tache = tache;

        // Création et configuration des composants pour la partie supérieure du panel
        JLabel nomLabel = new JLabel("Nom : " + tache.getNom());
        JLabel debutLabel = new JLabel("Date de début : " + formatDate(tache.getDebut()));
        JLabel finLabel = new JLabel("Date de fin : " + formatDate(tache.getFin()));
        JPanel topPanel = new JPanel();
        topPanel.setLayout(new GridLayout(3, 1));
        topPanel.add(nomLabel);
        topPanel.add(debutLabel);
        topPanel.add(finLabel);

        // Création et configuration du composant pour la partie des réalisateurs
        JLabel realisateursLabel = new JLabel("Réalisateurs : " + formatRealisateurs());
        JPanel realisateursPanel = new JPanel();
        realisateursPanel.add(realisateursLabel);

        // Création et configuration du composant pour la partie de la description
        JLabel descriptionLabel = new JLabel("Description : " + tache.getDescription());
        JPanel descriptionPanel = new JPanel();
        descriptionPanel.add(descriptionLabel);

        // Configuration du layout principal du panel
        setLayout(new BorderLayout());
        add(topPanel, BorderLayout.NORTH);
        add(realisateursPanel, BorderLayout.CENTER);
        add(descriptionPanel, BorderLayout.SOUTH);
    }

    private String formatDate(Date date) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
        return dateFormat.format(date);
    }

    private String formatRealisateurs() {
        StringBuilder sb = new StringBuilder();
        for (Membre membre : tache.getRealisateurs()) {
            sb.append(membre.getNom()).append(", ");
        }
        // Supprimer la virgule et l'espace en trop à la fin
        if (sb.length() > 0) {
            sb.setLength(sb.length() - 2);
        }
        return sb.toString();
    }
}
