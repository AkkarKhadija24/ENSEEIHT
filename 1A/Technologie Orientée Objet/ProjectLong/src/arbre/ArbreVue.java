package arbre;

import java.awt.BorderLayout;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JPanel;

public class ArbreVue extends JFrame {
	
	private NoeudVue tree;
	private ModificationArbreButtons buttons;
	
	// But de la classe centraliser les  boutons et l'arbre dans la Frame principale
	
	
	public ArbreVue(NoeudVue tree, ModificationArbreButtons Buttons){
		this.tree = tree;
		this.buttons = Buttons;
		// Créez des panneaux pour l'arbre et les boutons
        JPanel treePanel = new JPanel(new BorderLayout());
        JPanel buttonsPanel = new JPanel(new BorderLayout());

        // Ajoutez l'arbre au panneau de l'arbre
        treePanel.add(this.tree, BorderLayout.CENTER);

        // Ajoutez les boutons au panneau des boutons
        buttonsPanel.add(buttons, BorderLayout.CENTER);

        // Utilisez BorderLayout pour disposer les panneaux
        setLayout(new BorderLayout());
        add(treePanel, BorderLayout.CENTER);
        add(buttonsPanel, BorderLayout.SOUTH);
	}
	
	
	
	public NoeudVue getTree() {
		return this.tree;
	}
	
	public JButton getAddButton() {
		return this.buttons.getAjouterButton();
	}
	
	
	public JButton getRemoveButton() {
		return this.buttons.getSupprimerButton();
	}
	
	public JButton getModifyButton() {
		return this.buttons.getModifierButton();
	}
	
	public JButton getDisplayButton() {
		return this.buttons.getAfficherButton();
	}
	
	public JButton getRetourButton() {
		return this.buttons.getRetour();
	}
	

}
