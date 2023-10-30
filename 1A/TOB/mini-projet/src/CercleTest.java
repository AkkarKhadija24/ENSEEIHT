import static org.junit.Assert.assertEquals;
import org.junit.Test;
import java.awt.Color;

/**
  * Classe de test des constructeurs de la classe Cercle
  *
  * @author	Akkar Khadija
  */
public class CercleTest {
	
	// précision pour les comparaisons réelle
	public final static double EPSILON = 0.001;
	
	/** Une méthode de test pour l'exigence E12 qui est un constructeur d'un 
	 * cercle à partir de deux points diamétralement opposés, sa couleur est
	 * considérée comme étant le bleu par défaut
	 */
    @Test public void testerE12() {
    	// Construire les points
    	Point A = new Point(1, 6);
   		Point B = new Point(3, 2);
   		Point C = new Point(1, 4);
   		
    	// Construire les cercles
    	Cercle C1 = new Cercle(A, B);
    	Cercle C2 = new Cercle(B, C);
   		Cercle C3 = new Cercle(A, C);
   		
    	//Test sur C1
    	assertEquals("E12 sur C1 : abcisse du centre", C1.getCentre().getX(), 2.0, EPSILON);
		assertEquals("E12 sur C1 : ordonné du centre", C1.getCentre().getY(), 4.0, EPSILON);
		assertEquals("E12 sur C1 : rayon", C1.getRayon(), 2.23606797749979, EPSILON);
		assertEquals("E12 sur C1 : couleur", C1.getCouleur(), Color.blue);
		
		// Tests sur C2
		assertEquals("E12 sur C2 : abcisse du centre", C2.getCentre().getX(), 2.0, EPSILON);
        assertEquals("E12 sur C2 : ordonné du centre", C2.getCentre().getY(), 3.0, EPSILON);
		assertEquals("E12 sur C2 : rayon", C2.getRayon(), 1.4142135623730951, EPSILON);
                assertEquals("E12 sur C2 : couleur", C2.getCouleur(), Color.blue);
		
		// Tests sur C3
		assertEquals("E12 sur C3 : abcisse du centre", C3.getCentre().getX(), 1.0, EPSILON);
        assertEquals("E12 sur C3 : ordonné du centre", C3.getCentre().getY(), 5.0, EPSILON);
		assertEquals("E12 sur C3 : rayon", C3.getRayon(), 1.0, EPSILON);
		assertEquals("E12 sur C3 : couleur", C3.getCouleur(), Color.blue);
    	
    }
    
    /**
	 * Une méthode de test pour l'exigence E13 qui est un constructeur d'un 
	 * cercle à partir de deux points diamétralement opposés et de sa couleur
	 */
	@Test public void testerE13() {
		// Construire les points
		Point A = new Point(1, 6);
		Point B = new Point(3, 2);
		Point C = new Point(1, 4);
				
		// Construire des cercles
		Cercle C1 = new Cercle(A, B, Color.red);
		Cercle C2 = new Cercle(B, C, Color.yellow);
		Cercle C3 = new Cercle(A, C, Color.black);
		
		//Test sur C1
    	assertEquals("E13 sur C1 : abcisse du centre", C1.getCentre().getX(), 2.0, EPSILON);
		assertEquals("E13 sur C1 : ordonné du centre", C1.getCentre().getY(), 4.0, EPSILON);
		assertEquals("E13 sur C1 : rayon", C1.getRayon(), 2.23606797749979, EPSILON);
		assertEquals("E13 sur C1 : couleur", C1.getCouleur(), Color.red);
		
		// Tests sur C2
		assertEquals("E13 sur C2 : abcisse du centre", C2.getCentre().getX(), 2.0, EPSILON);
        assertEquals("E13 sur C2 : ordonné du centre", C2.getCentre().getY(), 3.0, EPSILON);
		assertEquals("E13 sur C2 : rayon", C2.getRayon(), 1.4142135623730951, EPSILON);
        assertEquals("E13 sur C2 : couleur", C2.getCouleur(), Color.yellow);
		
		// Tests sur C3
		assertEquals("E13 sur C3 : abcisse du centre", C3.getCentre().getX(), 1.0, EPSILON);
        assertEquals("E13 sur C3 : ordonné du centre", C3.getCentre().getY(), 5.0, EPSILON);
		assertEquals("E13 sur C3 : rayon", C3.getRayon(), 1.0, EPSILON);
		assertEquals("E13 sur C3 : couleur", C3.getCouleur(), Color.black);
	}
	
	/**
	 * Une méthode de test pour l'exigence E14 qui est un constructeur d'un
	 * cercle à partir de deux points, le premier correspond au centre du cercle
	 * et le deuxième est un point du cercle de sa circonférence, ces deux 
	 * points forment donc un rayon du cercle, avec une couleur bleu par défaut
	 */ 
	@Test public void testerE14() {
		// Construire les points
		Point A = new Point(1, 6);
		Point B = new Point(3, 2);
		Point C = new Point(1, 4);

		// Construire des cercles
		Cercle C1 = new Cercle(new Point(0, 0), 0.1); 
		C1 = Cercle.creerCercle(A, B);
		Cercle C2 = new Cercle(new Point(0, 0), 0.1);
		C2 = Cercle.creerCercle(B, C);
		Cercle C3 = new Cercle(new Point(0, 0), 0.1);
		C3 = Cercle.creerCercle(C, A);
		
		// Tests sur C1
		assertEquals("E14 sur C1 : abcisse du centre", C1.getCentre().getX(), 1.0, EPSILON);
		assertEquals("E14 sur C1 : ordonné du centre", C1.getCentre().getY(), 6.0, EPSILON);
		assertEquals("E14 sur C1 : rayon", C1.getRayon(), 4.47213595499958, EPSILON);
		assertEquals("E14 sur C1 : couleur", C1.getCouleur(), Color.blue);
		
		// Tests sur C2
		assertEquals("E14 sur C2 : abcisse du centre", C2.getCentre().getX(), 3.0, EPSILON);
		assertEquals("E14 sur C2 : ordonné du centre", C2.getCentre().getY(), 2.0, EPSILON);
		assertEquals("E14 sur C2 : rayon", C2.getRayon(), 2.8284271247461903, EPSILON);
        assertEquals("E14 sur C2 : couleur", C2.getCouleur(), Color.blue);
		
		// Tests sur C3
        assertEquals("E14 sur C3 : abcisse du centre", C3.getCentre().getX(), 1.0, EPSILON);
        assertEquals("E14 sur C3 : ordonné du centre", C3.getCentre().getY(), 4.0, EPSILON);
		assertEquals("E14 sur C3 : rayon", C3.getRayon(), 2.0, EPSILON);
		assertEquals("E14 sur C3 : couleur", C3.getCouleur(), Color.blue);
	}

    /** Méthode pricipale de la classe CercleTest
	*
	* @param args est la variable d'environnement qui est une table de caractères
	*/
	public static void main(String[] args) {
		org.junit.runner.JUnitCore.main("CercleTest");
	}


}
