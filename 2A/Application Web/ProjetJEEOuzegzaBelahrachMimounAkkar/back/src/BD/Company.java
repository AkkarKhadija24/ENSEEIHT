package BD;

import java.util.List;
import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
public class Company {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;
    private String reference;
    private String name;
    private String description;
    private String password;
    
    public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

//	@ManyToMany
//    private Collection<Domain> domain;
	
	@ManyToOne
    private Domain domain;
    
	  @OneToMany
//    @OneToMany(fetch = FetchType.EAGER, mappedBy = "company")
	  private Collection<Comment> comments;

	public Company() {
		super();
	}

	public Company(String reference, String name, String description, String password) {
		super();
		this.reference = reference;
		this.name = name;
		this.description = description;
		this.password = password;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getReference() {
		return reference;
	}

	public void setReference(String reference) {
		this.reference = reference;
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

	public Domain getDomain() {
		return domain;
	}

	public void setDomain(Domain domain) {
		this.domain = domain;
	}
	
//	public Collection<Comment> getComments() {
//		return comments;
//	}
//
//	public void setComments(Collection<Comment> comments) {
//		this.comments = comments;
//	}
    
    
}
