package allumettes;

/**
 * Exception qui indique qu'une opération est
 * interdite dans le cas ou un joueur triche.
 * @author Akkar Khadija
 *
 */
public class OperationInterditeException extends RuntimeException {

	/**
	 * Le constructeur qui initialise une operation
	 * invalide par un message msg.
	 * @param msg
	 */
	public OperationInterditeException(String msg) {
		super(msg);
	}
}
