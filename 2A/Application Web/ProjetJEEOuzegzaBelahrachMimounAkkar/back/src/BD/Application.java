package BD;
import java.util.Collection;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Application {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int idApplication;
	private int idUser;
	private Date date;
	private String state;
	
	@ManyToOne
	private Internship internship;
	
	public Application () {
		super();
	}
	
	public Application(int idUser,Date date,String state) {
		super();
		this.idUser = idUser;
		this.date = date;
		this.state = state;
	}
	
	public int getIdApplication() {
		return idApplication;
	}

	public void setIdApplication(int idApplication) {
		this.idApplication = idApplication;
	}
	
	public int getIdUser() {
        return idUser;
    }

    public void setIdUser(int idUser) {
        this.idUser = idUser;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

	public void setInternship(Internship internship) {
		this.internship = internship;
		
	}

}
