package Model;
import BD.*;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;

import javax.ejb.Singleton;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;

@Singleton
@Path("/")
public class Facade {

    @PersistenceContext
    EntityManager em;

    @POST
	@Path("/addcompany")
    @Consumes({ "application/json" })
	public Response addCompany(Company p) {
    	System.out.println("HIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII");

    	Domain d = p.getDomain();
    	System.out.println("domaiiiiiiiiiin6  " + p.getDomain().toString());

    	System.out.println("domaiiiiiiiiiin  " + p.getDomain().getName());
    	System.out.println("domaiiiiiiiiiiny  " + p.getDomain().getDescription());
    	em.persist(d);

		System.out.println("coucou");
		
		try {
            em.persist(p);
            return Response.ok().entity("{\"message\": \"Company registered successfully\"}").build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                           .entity("{\"message\": \"Error registering company\"}")
                           .build();
        }
	}
    
    @POST
	@Path("/addstudent")
    @Consumes({ "application/json" })
	public Response addStudent(User p) {
		System.out.println("coucou");
		/*em.persist(p);
		return null;*/
		try {
            em.persist(p);
            return Response.ok().entity("{\"message\": \"Student registered successfully\"}").build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                           .entity("{\"message\": \"Error registering company\"}")
                           .build();
        }
	}
    @POST
    @Path("/login")
    @Consumes({ "application/json" })
    @Produces({ "application/json" })
    public Response login(LoginRequest loginRequest) {
        System.out.println("coucou");
        
      String mail = loginRequest.getEmail();
      String password = loginRequest.getPassword();
      System.out.println("mail : " + mail + " et mdp : " + password);
      List<Company> employeur = em.createQuery("SELECT u FROM Company u WHERE u.reference = :mail AND u.password = :password", Company.class)
                               .setParameter("mail", mail)
                               .setParameter("password", password)
                               .getResultList();
      System.out.println("***********************");
      System.out.println("Employer size : " + employeur.size());
      if (!employeur.isEmpty() && employeur.size() == 1) {
    	  System.out.println("--------------------------------------");
          Company user = employeur.get(0); // retourne le premier (et seul normalement) utilisateur trouvÃ©
          
          // Retourne une rÃ©ponse de succÃ¨s avec les dÃ©tails de l'utilisateur
          System.out.println("User password");
          System.out.println(user.getPassword());
          
          return Response.ok(user.getId()).build();
      } else {
    	  System.out.println("	Error Register company");
          // Retourne une rÃ©ponse non autorisÃ©e si aucun utilisateur trouvÃ©
          return Response.status(Response.Status.UNAUTHORIZED).entity("Identifiants incorrects").build();
      }
    }
    ///
    
    @POST
    @Path("/loginstudent")
    @Consumes({ "application/json" })
    @Produces({ "application/json" })
    public Response loginstudent(LoginRequest loginRequest) {
        System.out.println("Attempting student login");

        String mail = loginRequest.getEmail();
        String password = loginRequest.getPassword();
        System.out.println("Email: " + mail + " | Password: " + password);

        List<User> users = em.createQuery("SELECT u FROM User u WHERE u.mail = :mail AND u.password = :password", User.class)
                             .setParameter("mail", mail)
                             .setParameter("password", password)
                             .getResultList();

        System.out.println("User size: " + users.size());

        if (!users.isEmpty()) {
            User user = users.get(0); // Get the first (and only) user found
            System.out.println("User found: " + user.getName());

            // Return a success response with user details if needed
            return Response.ok(user.getIdUser()).build();
        } else {
            System.out.println("Error logging in user");
            return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid credentials").build();
        }
    }
    
    
    
    
//    
    @GET
    @Path("/newSearch")
    @Produces({ "application/json" })
    public List<Internship> searchInternship(@javax.ws.rs.QueryParam("title") String title,
                                       @javax.ws.rs.QueryParam("location") String location,
                                       @javax.ws.rs.QueryParam("field") String field) {
        try {
            List<Internship> results = em.createQuery(
                "SELECT i FROM Internship i WHERE i.title = :title AND i.location = :location AND i.domain.name = :field", Internship.class)
                .setParameter("title", title)
                .setParameter("location", location)
                .setParameter("field", field)
                .getResultList();

            if (!results.isEmpty()) {
                return results;
            } else {
                return null;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    @POST
    @Path("/applying")
    @Consumes({ "multipart/form-data" })
    @Produces({ "application/json" })
    public Response applyForInternship(ApplyRequest applyRequest) {
        try {
            // Récupérer l'étudiant par son ID
            User student = em.find(User.class, applyRequest.getStudentId());
            if (student == null) {
                return Response.status(Response.Status.NOT_FOUND)
                               .entity("{\"message\": \"Student not found\"}")
                               .build();
            }

            // Récupérer l'offre de stage par son ID
            Internship internship = em.find(Internship.class, applyRequest.getInternshipId());
            if (internship == null) {
                return Response.status(Response.Status.NOT_FOUND)
                               .entity("{\"message\": \"Internship not found\"}")
                               .build();
            }

            // Créer une nouvelle candidature
            Application application = new Application();
            application.setIdUser(student.getIdUser());
            application.setInternship(internship);
            application.setState("Pending");

            // Persister la candidature
            em.persist(application);

            // Retourner les détails de l'application
            HashMap<String, Object> response = new HashMap<>();
            response.put("message", "Application submitted successfully");
            response.put("applicationId", application.getIdApplication());
            response.put("studentId", student.getIdUser());
            response.put("internshipId", internship.getId());
            
            return Response.ok().entity(response).build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                           .entity("{\"message\": \"Error submitting application\"}")
                           .build();
        }
    }


    
    @GET
    @Path("/allOffers")
    @Produces({ "application/json" })
    public Response getAllInternships() {
        try {
            // Requête JPQL pour récupérer toutes les offres de stage
            List<Internship> results = em.createQuery("SELECT i FROM Internship i", Internship.class)
                                         .getResultList();

            return Response.ok().entity(results).build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                           .entity("{\"message\": \"Erreur lors de la récupération des offres de stage\"}")
                           .build();
        }
    }
    @POST
	@Path("/addoffer/{companyId}")
    @Consumes({ "application/json" })
	public Response addofferCompany(Internship p, @PathParam("companyId") int companyId) {	
    	System.out.println("in offer intern facade");

    	Domain domain = p.getDomain();
    	em.persist(domain);
    	//p.setDomain(null);
    	p.setApplications(null);
    	//Company c = p.getCompany();
    	Company c = em.find(Company.class, companyId);
    	
    	System.out.println("in offer intern comapny" + c);
    	System.out.println("in offer intern comapny id" + c.getId());
    	p.setCompany(c);
    	//System.out.println("in offer intern domain" + domains);

    		
		try {
			System.out.println("in offer intern avant persistence intership");
            em.persist(p);
	    	System.out.println("in offer intern apres persistence domain");

            return Response.ok().entity("{\"message\": \"Company Internship Offer registered successfully\"}").build();
        } catch (Exception e) {
	    	System.out.println("in offer intern ERROR FACADE");

            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                           .entity("{\"message\": \"Error registering company internship offer\"}")
                           .build();
        }
	}
   
    @GET
    @Path("/offers/{id}")
    @Produces({ "application/json" })
    public Collection<Internship> getOffers(@PathParam("id") int id) {
        try {
        	System.out.println("Hellloooooooooooooooooooooooooooooooooooooooooo");
            Collection<Internship> offers = em.createQuery("SELECT i FROM Internship i WHERE i.company.id = :id", Internship.class)
                                               .setParameter("id", id)
                                               .getResultList();
            
            List<Internship> offer = em.createQuery("SELECT i FROM Internship i WHERE i.company.id = :id", Internship.class)
                    .setParameter("id", id)
                    .getResultList();
            
        	System.out.println("Helllo 11" + offer.get(0));

          if (offers != null ) {
        	System.out.println("Helllo in not empty");
            
        	return offers;
            } else {
            	return null;
            	
            }
        } catch (Exception e) {
            System.err.println("Error fetching offers: " + e.getMessage());
            
            return null;
        }
    }

    
    @DELETE
    @Path("/delete/{id}")
    public Response deleteOffer(@PathParam("id") int id) {
        try {
        	System.out.println("Hiiiiii");

            // Recherche de l'offre par ID
            Internship offer = em.find(Internship.class, id);
            if (offer == null) {
            	System.out.println("Hiii7777777");

                return Response.status(Response.Status.NOT_FOUND).entity("Offer not found").build();
            }

            // Suppression de l'offre
            em.remove(offer);
        	System.out.println("Hoiiii8888");

            return Response.ok().build();
        } catch (Exception e) {
            System.err.println("Error deleting offer: " + e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("{\"message\": \"Error deleting company internship offer\"}")
                    .build();
        }
    }
    
   
    
    @PUT
    @Path("/update/{id}")
    @Consumes({ "application/json" })
    @Produces({ "application/json" })
    public Response updateOffer(@PathParam("id") int id, Internship updatedOffer) {
        try {
            System.out.println("Updating offer with ID: " + id);

            Internship offer = em.find(Internship.class, id);
            if (offer == null) {
                return Response.status(Response.Status.NOT_FOUND).entity("Offer not found").build();
            }

            offer.setTitle(updatedOffer.getTitle());
            offer.setDescription(updatedOffer.getDescription());
            offer.setDate(updatedOffer.getDate());
            offer.setLocation(updatedOffer.getLocation());
            String nomDomaine = updatedOffer.getDomain().getName();
            Domain offerDomain = offer.getDomain();
            offerDomain.setName(nomDomaine);
            em.merge(offerDomain);
            em.merge(offer);

            System.out.println("Offer updated successfully");

            return Response.ok().entity("{\"message\": \"Offer updated successfully\"}").build();
        } catch (Exception e) {
            System.err.println("Error updating offer: " + e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("{\"message\": \"Error updating internship offer\"}")
                    .build();
        }
    }

    
    
    @GET
    @Path("/comments/{companyid}")
    @Produces({ "application/json" })
    public Response getComments(@PathParam("companyid") int companyid) {
        try {
        	System.out.println("commentloooooooooooooooooooooooooooooooooooooooooo");
            Collection<Internship> comments = em.createQuery("SELECT i FROM Comment i WHERE i.idUser = :companyid", Internship.class)
                    .setParameter("companyid", companyid)
                    .getResultList();
            
            List<Internship> comment = em.createQuery("SELECT i FROM Comment i WHERE i.idUser = :companyid", Internship.class)
                    .setParameter("companyid", companyid)
                    .getResultList();
            
        	System.out.println("comment 11" + comment.get(0));

            if (comments != null && !comments.isEmpty()) {
            	System.out.println("Helllo in not empty comment");
                return Response.ok(comments).build();
            } else {
            	return Response.status(Response.Status.NOT_FOUND).entity("No comments found for the given company ID").build();
            }
    
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                           .entity("{\"message\": \"Failed to fetch comments\"}")
                           .build();
        }
    }
    @GET
    @Path("/allCompanies")
    @Produces({ "application/json" })
    public Response getAllCompanies() {
        try {
            List<Company> companies = em.createQuery("SELECT c FROM Company c", Company.class).getResultList();
            return Response.ok().entity(companies).build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                           .entity("{\"message\": \"Erreur lors de la récupération des entreprises\"}")
                           .build();
        }
    }
    @GET
    @Path("/userApplications")
    @Produces({ "application/json" })
    public Response getUserApplications(@QueryParam("userId") int userId) {
        try {
            User user = em.find(User.class, userId);
            if (user == null) {
                return Response.status(Response.Status.NOT_FOUND)
                               .entity("{\"message\": \"Utilisateur non trouvé\"}")
                               .build();
            }

            List<Application> applications = (List<Application>) user.getApplications();
            return Response.ok().entity(applications).build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                           .entity("{\"message\": \"Erreur lors de la récupération des applications\"}")
                           .build();
        }
    }
    @GET
    @Path("/applicationsoffers/{offerId}")
    @Produces({"application/json"})
    public Collection<Application> getApplicationsCompany(@PathParam("offerId") int offerId) {
        try {
        	System.out.println("Helllo APP");

            Collection<Application> applications = em.createQuery("SELECT a FROM Application a WHERE a.internship.id = :offerId", Application.class)
                    .setParameter("offerId", offerId)
                    .getResultList();

            if(applications != null) {
            	return applications;
            } else {
            	return null;
            }
        } catch (Exception e) {
        	return null;
        }
    }

}

// Classe pour reprÃ©senter la requÃªte de connexion
class LoginRequest {
    private String email;
    private String password;

    // Getters et setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
class ApplyRequest {
	
    private Long studentId;
    private Long internshipId;

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public Long getInternshipId() {
        return internshipId;
    }

    public void setInternshipId(Long internshipId) {
        this.internshipId = internshipId;
    }
}