package arbre;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.event.TreeModelEvent;
import javax.swing.event.TreeModelListener;
import javax.swing.tree.TreeNode;
import projectmanagment.Etat;
import projectmanagment.Tache;


public class NoeudVue extends JPanel implements TreeModelListener{
    private Tache rootNode; // Le nœud racine de votre modèle d'arbre
    private Tache selectedNode; // Le nœud sélectionné

    public NoeudVue(ArbreTache treeModel) {
        this.rootNode = treeModel.getRoot();
        this.selectedNode = null;

        addMouseListener(new MouseAdapter() {
            @Override
            public void mouseClicked(MouseEvent e) {
                // Récupérer les coordonnées du clic de la souris
                int x = e.getX();
                int y = e.getY();

                // Parcourir les nœuds de l'arbre pour vérifier si le clic se situe sur un nœud
                selectedNode = findNodeAtPosition(rootNode, x, y);

                // Redessiner le composant pour mettre en évidence le nœud sélectionné
                repaint();
            }
            
        });
        repaint();
    }

    /*
     * dessine l'arbre, l'appel a drawNode est recursif
     */
    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);

        // Dessiner les nœuds de l'arbre
        drawNode(g, rootNode, getWidth()/2, 50);

        // Mettre en évidence le nœud sélectionné
        if (selectedNode != null) {
            highlightNode(g, selectedNode);
        }
    }

    /*
     * Dessine les noeuds, à modifier pour une meilleure esthetique
     */
    private void drawNode(Graphics g, Tache node, int x, int y) {
        // Dessiner le cercle représentant le nœud
    	int radius = 50;
    	node.setX(x);
    	node.setY(y);
        g.setColor(Color.black);
        g.drawOval(x - radius, y - radius, 2 * radius, 2 * radius);
        
        if (node.getEtat() == Etat.Finie) {
            g.setColor(new Color(204, 255, 204)); // Vert pastel
        } else if (node.getEtat() == Etat.EnCours) {
            g.setColor(new Color(255, 204, 153)); // Orange pastel
        } else if (node.getEtat() == Etat.NonCommencee) {
            g.setColor(new Color(255, 204, 204)); // Rouge pastel
        } else {
            g.setColor(Color.WHITE); // Par défaut, noir
        }
        
        g.fillOval(x - radius, y - radius, 2 * radius, 2 * radius);

        
        g.setColor(Color.black);
        // Dessiner le contenu du nœud (par exemple, le nom)
        g.drawString(node.getNom(), x - radius / 2, y);


        // Dessiner les liens vers les nœuds enfants
        int childY = y + 100;
        Set<Tache> children = node.getSousTaches();
        
        int childCount;
        if (children==null) {
        	childCount = 0;
        }else {
        	childCount = children.size();
        }
        int subtreeWidth = childCount * 2 * radius; // Largeur totale du sous-arbre

        // Calculer la position de départ du premier enfant
        int childXStart = x - subtreeWidth / 2 + radius;
        int childX = childXStart;


        for (Tache child : children) {
        	
            // Dessiner le lien entre le nœud parent et l'enfant
            g.drawLine(x, y + radius, childX, childY - radius);

            // Dessiner le nœud enfant récursivement
            drawNode(g, child, childX, childY);

            // Mettre à jour la position du prochain enfant en fonction de la largeur totale du sous-arbre
            childX += subtreeWidth / childCount ;
        }
    }


    private void highlightNode(Graphics g, Tache node) {
        // Dessiner un contour autour du nœud sélectionné
        int x = node.getX();
        int y = node.getY();
        int radius = 50;
        g.setColor(Color.red);
        g.drawOval(x - radius - 2, y - radius - 2, 2 * radius + 4, 2 * radius + 4);
    }

    private Tache findNodeAtPosition(Tache node, int x, int y) {
        // Vérifier si les coordonnées x et y se situent à l'intérieur du cercle représentant le noeud
    	int nodeX = node.getX();
    	int nodeY = node.getY();
    	int radius = 50;
        if (Math.pow(x - nodeX, 2) + Math.pow(y - nodeY, 2) <= Math.pow(radius, 2)) {
            return node;
        }

        // Parcourir les nœuds enfants pour trouver le nœud correspondant aux coordonnées
        for (Tache child : node.getSousTaches()) {
            Tache foundNode = findNodeAtPosition(child, x, y);
            if (foundNode != null) {
                return foundNode;
            }
        }

        return null;
    }

    /*
     * retourne le dernier noeud selectionner
     */
    public Tache getSelectedNode() {
        return selectedNode;
    }

    
  /*Provoque la mise à jour de l'arbre graphique à chaque noeud modifier, utiliser dans la classe modèle*/
    @Override
    public void treeNodesChanged(TreeModelEvent e) {
        Object[] path = e.getPath(); // Chemin du nœud modifié
        int[] childIndices = e.getChildIndices(); // Indices des enfants modifiés
        Object[] children = e.getChildren(); // Enfants modifiés
        
        // Mettez à jour votre vue en fonction des modifications
        // Utilisez les informations fournies par les paramètres pour déterminer les nœuds affectés
        // Par exemple, si vous avez besoin d'accéder à un nœud modifié spécifique :
        // Object modifiedNode = path[path.length - 1];
        
        repaint(); // Rafraîchissez votre vue
    }

    /*Provoque la mise à jour de l'arbre graphique à chaque noeud ajouter, utiliser dans la classe modèle*/
    @Override
    public void treeNodesInserted(TreeModelEvent e) {
        Object[] path = e.getPath(); // Chemin du nœud parent
        int[] childIndices = e.getChildIndices(); // Indices des nouveaux enfants
        Object[] children = e.getChildren(); // Nouveaux enfants
        
        
        repaint(); // Rafraîchissez votre vue
    }

  /*Provoque la mise à jour de l'arbre graphique à chaque noeud supprimer, utiliser dans la classe modèle*/
    @Override
    public void treeNodesRemoved(TreeModelEvent e) {
        Object[] path = e.getPath(); // Chemin du nœud parent
        int[] childIndices = e.getChildIndices(); // Indices des enfants supprimés
        Object[] children = e.getChildren(); // Enfants supprimés
        
        
        repaint(); // Rafraîchissez votre vue
    }
    
  /*Provoque la mise à jour de l'arbre graphique à chaque changement, utiliser dans la classe modèle*/
    @Override
    public void treeStructureChanged(TreeModelEvent e) {

        
        repaint(); // Rafraîchissez votre vue
    }
    
    
    
    
}