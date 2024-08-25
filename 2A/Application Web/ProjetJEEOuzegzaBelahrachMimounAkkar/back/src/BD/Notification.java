package BD;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import java.util.Date;
import java.util.Collection;
@Entity
public class Notification {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int idNotification;
	private int idUser;
	private String message;
	private Date date;
	private boolean read;
	
	public Notification() {
		super();
	}
	
	public Notification(int idUser,String message,Date date, boolean read) {
		super();
		this.idUser = idUser;
		this.message = message;
		this.date = date;
		this.read = read;
	}
	
	public int getIdNotification() {
        return idNotification;
    }

    public int getIdUser() {
        return idUser;
    }

    public void setIdUser(int idUser) {
        this.idUser = idUser;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public boolean isRead() {
        return read;
    }

    public void setRead(boolean read) {
        this.read = read;
    }
	
}
