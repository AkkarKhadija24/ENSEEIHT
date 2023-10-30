package arbre;

import javax.swing.event.TreeModelEvent;
import javax.swing.event.TreeModelListener;


import java.util.*;
import projectmanagment.Projet;
import projectmanagment.Tache;

public class ArbreTache {

    private ArrayList<TreeModelListener> listeners = new ArrayList<>();
    private Projet projet;

    public ArbreTache(Projet projet) {
        this.projet = projet;
        this.listeners = new ArrayList<TreeModelListener>();
    }

    public Tache getRoot() {
        return projet.getTachePrincipale();
    }

    public int getChildCount(Object parent) {
        Tache tache = (Tache) parent;
        return tache.getSousTaches().size();
    }

    public void addTreeModelListener(TreeModelListener listener) {
        listeners.add(listener);
    }

    public void removeTreeModelListener(TreeModelListener listener) {
        listeners.remove(listener);
    }

    public ArrayList<Tache> getPathToRoot(Tache node) {
        ArrayList<Tache> path = new ArrayList<>();
        while (node != null) {
            path.add(node);
            node = node.getTacheSuperieure();
        }
        Collections.reverse(path);
        return path;
    }



    public void insertNode(Tache parent, Tache child) {
        parent.getSousTaches().add(child);
        int index = parent.getSousTaches().size() - 1;
        int[] childIndices = {index};
        Object[] children = {child};
        fireTreeNodesInserted(this, getPathToRoot(parent).toArray(), childIndices, children);
    }

    public void removeNode(Tache parent, Tache child) {
        parent.getSousTaches().remove(child);
        Set<Tache> sousTachesSet = parent.getSousTaches();
        List<Tache> sousTachesList = new ArrayList<>(sousTachesSet);
        int index = sousTachesList.indexOf(child);
        if (index != -1) {
            int[] childIndices = {index};
            Object[] children = {child};
            fireTreeNodesRemoved(this, getPathToRoot(parent).toArray(),childIndices, children);
        }
        child.supprimer();
    }

    private void fireTreeNodesInserted(Object source, Object[] path, int[] childIndices, Object[] children) {
        TreeModelEvent event = new TreeModelEvent(source, path, childIndices, children);
        for (TreeModelListener listener : listeners) {
            listener.treeNodesInserted(event);
        }
    }

    private void fireTreeNodesRemoved(Object source, Object[] path, int[] childIndices, Object[] children) {
        TreeModelEvent event = new TreeModelEvent(source, path, childIndices, children);
        for (TreeModelListener listener : listeners) {
            listener.treeNodesRemoved(event);
        }
    }

    public void reload(Tache node) {
        if (node != null) {
            Object[] pathToRoot = getPathToRoot(node).toArray();
            fireTreeStructureChanged(this, pathToRoot, null, null);
        }
    }

    public void reload() {
        reload(projet.getTachePrincipale());
    }

    protected void fireTreeStructureChanged(Object source, Object[] path, int[] childIndices, Object[] children) {
        TreeModelEvent event = new TreeModelEvent(source, path, childIndices, children);
        for (TreeModelListener listener : listeners) {
            listener.treeStructureChanged(event);
        }
    }
    
    public Projet getProjet() {
    	return this.projet;
    }
}
