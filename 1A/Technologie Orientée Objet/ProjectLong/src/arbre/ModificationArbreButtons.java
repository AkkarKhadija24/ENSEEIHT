package arbre;

import java.awt.BorderLayout;
import java.awt.FlowLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JPanel;

public class ModificationArbreButtons extends JPanel{
	

	private JButton ajouterSousTache;
	private JButton supprimerSousTache;
	private JButton modifierSousTache;
	private JButton AfficherSousTache;
	private JButton retour;
	
	
	public ModificationArbreButtons() {
		super();
		modifierSousTache = new JButton("Modifier");
		supprimerSousTache = new JButton("Supprimer");
		ajouterSousTache = new JButton("Ajouter");
		AfficherSousTache = new JButton("Afficher");
		retour = new JButton("Retour");
	    
	    setLayout(new BorderLayout());

	    JPanel buttonPanel = new JPanel(new FlowLayout());
	    buttonPanel.add(ajouterSousTache);
	    buttonPanel.add(supprimerSousTache);
	    buttonPanel.add(modifierSousTache);
	    buttonPanel.add(AfficherSousTache);
	    buttonPanel.add(retour);
	    
	    add(buttonPanel, BorderLayout.SOUTH);
    
	}
	
	public JButton getAjouterButton() {
		return this.ajouterSousTache;
	}
	public JButton getSupprimerButton() {
		return this.supprimerSousTache;
	}
	public JButton getModifierButton() {
		return this.modifierSousTache;
	}
	
	public JButton getAfficherButton() {
		return this.AfficherSousTache;
	}
	
	public JButton getRetour() {
		return this.retour;
	}
	
	
}
