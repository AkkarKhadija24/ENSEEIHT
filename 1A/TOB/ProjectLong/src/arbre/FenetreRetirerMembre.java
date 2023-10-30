package arbre;

import java.awt.Container;
import java.awt.FlowLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JPanel;
import projectmanagment.*;
public class FenetreRetirerMembre extends JFrame{

	private static final long serialVersionUID = 1L;
	
	public FenetreRetirerMembre(Projet projet, Tache tache) {
		setTitle("Choix du membre à afficher");
        setSize(300, 400);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        
        this.setLayout(new FlowLayout());
        Container panel = this.getContentPane();
        for (Membre membre : projet.getMembres()) {
        	JButton bouton = new JButton(membre.getNom());
        	bouton.addActionListener(new ActionBoutonMembre(this, membre, tache));
        	panel.add(bouton);
        }
        this.setLocationRelativeTo(null);
        this.setVisible(true);
        
	}
	
	
}
class ActionBoutonMembre implements ActionListener {
	private FenetreRetirerMembre fenetre;
	private  Membre membre;
	private Tache tache;
	public ActionBoutonMembre(FenetreRetirerMembre fenetre, Membre membre, Tache tache) {
		this.fenetre = fenetre;
		this.membre = membre;
		this.tache = tache;
	}

	@Override
	public void actionPerformed(ActionEvent e) {
		tache.retirerMembre(membre);
		this.fenetre.dispose();
		
	}
}
