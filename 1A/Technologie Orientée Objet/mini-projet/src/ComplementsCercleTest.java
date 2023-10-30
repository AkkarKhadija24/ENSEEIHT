import static org.junit.Assert.assertEquals;
import java.awt.Color;
import org.junit.Test;

/**
  * Classe de test des exigences E11 et E15  de la classe Cercle
  *
  * @author	Akkar Khadija
  */
public class ComplementsCercleTest {
	
	// précision pour les comparaisons réelle
	public final static double EPSILON = 0.001;
	
	/** Une méthode de test pour l'exigence E11 qui est un constructeur d'un 
	 * cercle à partir  d’un point qui désigne son centre et d’un réel corespondant à
	 * la valeur de son rayon. Sa couleur est considérée comme étant le bleu.
	 */
    @Test public void testerE11() {
    	// Construire les points
    	Point A = new Point(1, 6);
   		Point B = new Point(3, 2);
   		Point C = new Point(1, 4);
   		
    	// Construire les cercles
    	Cercle C1 = new Cercle(A, 2.5);
    	Cercle C2 = new Cercle(B, 3);
   		Cercle C3 = new Cercle(C, 0.7);
   		
    	//Test sur C1
    	assertEquals("E11 sur C1 : abcisse du centre", C1.getCentre().getX(), 1.0, EPSILON);
		assertEquals("E11 sur C1 : ordonné du centre", C1.getCentre().getY(), 6.0, EPSILON);
		assertEquals("E11 sur C1 : rayon", C1.getRayon(), 2.5, EPSILON);
		assertEquals("E11 sur C1 : couleur", C1.getCouleur(), Color.blue);
		
		// Tests sur C2
		assertEquals("E11 sur C2 : abcisse du centre", C2.getCentre().getX(), 3.0, EPSILON);
        assertEquals("E11 sur C2 : ordonné du centre", C2.getCentre().getY(), 2.0, EPSILON);
		assertEquals("E11 sur C2 : rayon", C2.getRayon(), 3, EPSILON);
        assertEquals("E11 sur C2 : couleur", C2.getCouleur(), Color.blue);
		
		// Tests sur C3
		assertEquals("E11 sur C3 : abcisse du centre", C3.getCentre().getX(), 1.0, EPSILON);
        assertEquals("E11 sur C3 : ordonné du centre", C3.getCentre().getY(), 4.0, EPSILON);
		assertEquals("E11 sur C3 : rayon", C3.getRayon(), 0.7, EPSILON);
		assertEquals("E11 sur C3 : couleur", C3.getCouleur(), Color.blue);
    	
    }
    
    /**
	 * Une méthode de test pour l'exigence E15 qui affiche le cercle sousla forme  Cr@(a, b)
     * où r est la valeur du rayon et (a, b) le centre du cercle 
	 */
	@Test public void testerE15() {
		// Construire les points
    	Point A = new Point(1, 6);
   		
    	// Construire les cercles
    	Cercle C = new Cercle(A, 2.5);
    	
		//Test sur C1
    	assertEquals("E15 sur C1 : affichage de C :", C.toString(), "C2.5@(1.0, 6.0)");
		
	}

    /** Méthode pricipale de la classe CercleTest
	*
	* @param args est la variable d'environnement qui est une table de caractères
	*/
	public static void main(String[] args) {
		org.junit.runner.JUnitCore.main("CercleTest");
	}


}
