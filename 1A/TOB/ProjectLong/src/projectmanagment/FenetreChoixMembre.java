package projectmanagment;

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

public class FenetreChoixMembre extends JFrame{

	private static final long serialVersionUID = 1L;
	
	public FenetreChoixMembre(Projet projet) {
		setTitle("Choix du membre à afficher");
        setSize(300, 400);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        
        this.setLayout(new FlowLayout());
        Container panel = this.getContentPane();
        for (Membre membre : projet.getMembres()) {
        	JButton bouton = new JButton(membre.getNom());
        	bouton.addActionListener(new ActionBoutonMembre(this, membre));
        	panel.add(bouton);
        }
        this.setLocationRelativeTo(null);
        this.setVisible(true);
        
	}
	
	
}
class ActionBoutonMembre implements ActionListener {
	private FenetreChoixMembre fenetre;
	private  Membre membre;
	public ActionBoutonMembre(FenetreChoixMembre fenetre, Membre membre) {
		this.fenetre = fenetre;
		this.membre = membre;
	}

	@Override
	public void actionPerformed(ActionEvent e) {
		new FenetreMembre(this.membre);
		this.fenetre.dispose();
		
	}
}
