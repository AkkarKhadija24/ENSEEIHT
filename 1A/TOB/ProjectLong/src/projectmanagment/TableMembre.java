package projectmanagment;
import javax.swing.JOptionPane;
import javax.swing.table.DefaultTableModel;
import java.util.ArrayList;


public class TableMembre extends DefaultTableModel{
	
	private static final long serialVersionUID = 1L;
	ArrayList<Tache> tache;
	
	
	public TableMembre(Object[] columnNames, int rowCount) {
		super(columnNames, rowCount);
		this.tache = new ArrayList<Tache>();
	}

	@SuppressWarnings("deprecation")
	@Override
	public void fireTableCellUpdated(int row, int column) {
		if (column == 0) {
			super.fireTableCellUpdated(row, column);
			this.tache.get(row).setNom((String) super.getValueAt(row, column));
		} else {
			try {
				String valeur = (String) this.getValueAt(row, column);
				String[] parti = valeur.split("/");
				assert(parti.length == 3);
				int day = Integer.parseInt(parti[0]);
				int month = Integer.parseInt(parti[1]);
				int year = Integer.parseInt(parti[2]);
				assert(day<31 && day>0);
				assert(month>0 && month<13);
				assert(year>0 && year<3000);
				this.tache.get(row).getFin().setDate(day);
				this.tache.get(row).getFin().setMonth(month);
				this.tache.get(row).getFin().setYear(year);
				super.fireTableCellUpdated(row, column);
			} catch(Exception e) {
				JOptionPane.showMessageDialog(null, "Erreur dans la date rentrer.");
				super.setValueAt(this.tache.get(row).getFin().getDay() + "/" + this.tache.get(row).getFin().getMonth() + "/" + this.tache.get(row).getFin().getYear(), row, column);
			}
			
			
		}
		
	}
    
	@Override
	public boolean isCellEditable(int rowIndex, int mColIndex) {
        return mColIndex != 2;
    }

    public void removetache(int row) {
    	this.tache.get(row).supprimer();
        this.tache.remove(row);
        super.removeRow(row); // this deletes it
    }
    
    @SuppressWarnings("deprecation")
	public void addrow(Tache tache) {
    	String nomtache;
    	if (tache.getTacheSuperieure() != null) {
    		nomtache = tache.getTacheSuperieure().getNom();
    	} else {
    		nomtache = "Ceci est la tache supérieur";
    	}
    	super.addRow(new Object[]{tache.getNom(), tache.getFin().getDay() + "/" + tache.getFin().getMonth() + "/" + tache.getFin().getYear(), nomtache});
    	this.tache.add(tache);
    }
    
    public void addtache(int row, Membre membre) {
    	Tache newTache = new Tache("Nouvelle Tache", this.tache.get(row).getDebut(), this.tache.get(row).getFin(), this.tache.get(row).getEtat() , this.tache.get(row));
    	newTache.ajouterMembre(membre);
    	this.tache.get(row).getSousTaches().add(newTache);
    	this.addrow(newTache);
    }
    
    public Tache getTache(int row) {
    	return this.tache.get(row);
    }
}
