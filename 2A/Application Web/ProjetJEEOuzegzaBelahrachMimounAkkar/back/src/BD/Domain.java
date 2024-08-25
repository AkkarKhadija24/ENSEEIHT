package BD;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Domain {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int idDomain;
    private String name;
    private String description;
    
	public Domain() {
		super();
	}

	public Domain(String name, String description) {
		super();
		this.name = name;
		this.description = description;
	}

	public int getIdDomain() {
		return idDomain;
	}

	public void setIdDomain(int idDomain) {
		this.idDomain = idDomain;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
    
    
}
