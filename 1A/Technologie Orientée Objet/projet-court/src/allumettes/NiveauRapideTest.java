package allumettes;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;
/**
 * La classe NiveauRapideTest sert à tester la classe NiveauRapide.
 * @author Akkar Khadija
 */
public class NiveauRapideTest {

	private Jeu jeu;
	private Strategie strategy;

	@Before public void setUp() {
		strategy = new NiveauRapide();
	}

	@Test
	public void testGetNom() {
		assertEquals("Test sur getNom() : ", this.strategy.getNom(), "Rapide");
	}

	@Test public void testerPriseSupMax() throws CoupInvalideException {
		jeu = new JeuSansProxy(13);
		assertEquals("Rapide ne prend pas le maximum d'allumettes", Jeu.PRISE_MAX, strategy.getPrise(jeu, "David"));
		jeu = new JeuSansProxy(3);
		assertEquals("Rapide ne prend pas le maximum d'allumettes", Jeu.PRISE_MAX, strategy.getPrise(jeu, "Jean"));
	}

	
	@Test public void testerPriseInfMax() throws CoupInvalideException {
		jeu = new JeuSansProxy(2);
		assertEquals("Rapide ne prend pas le maximum d'allumettes", jeu.getNombreAllumettes(), strategy.getPrise(jeu, "Lara"));
		jeu = new JeuSansProxy(1);
		assertEquals("Rapide ne prend pas le maximum d'allumettes", jeu.getNombreAllumettes(), strategy.getPrise(jeu, "Khadija"));
	}
}
