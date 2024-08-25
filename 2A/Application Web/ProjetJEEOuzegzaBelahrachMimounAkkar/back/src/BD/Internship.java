package BD;

import java.util.Collection;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

@Entity
public class Internship {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;
    private String title;
    private String description;
    private String location;
    private String date;
    
    @ManyToOne
    //@ManyToMany(cascade = CascadeType.ALL) // Or CascadeType.PERSIST depending on your requirements
    private Domain domain;
    
    public Domain getDomain() {
		return this.domain;
	}

    public void setDomain(Domain domain) {
		this.domain = domain;
	}

	@OneToOne
    //private Collection<Application> applications;
	// Changement 
	private Application applications;
    @ManyToOne
    private Company company;
    
	public Internship() {
		super();
	}

	public Internship(String title, String description, String location, String date) {
		super();
		this.title = title;
		this.description = description;
		this.location = location;
		this.date = date;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

//	public Collection<Domain> getDomain() {
//		return domain;
//	}
//
//	public void setDomain(Collection<Domain> domain) {
//		this.domain = domain;
//	}

	/*public Collection<Application> getApplications() {
		return applications;
	}

	public void setApplications(Collection<Application> applications) {
		this.applications = applications;
	}*/
	
	public Application getApplications() {
		return applications;
	}

	public void setApplications(Application applications) {
		this.applications = applications;
	}

	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}
    
    
}
