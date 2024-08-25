/**
 *
 */
package fr.n7.stl.block.ast.expression.accessible;

import fr.n7.stl.block.ast.SemanticsUndefinedException;
import fr.n7.stl.block.ast.expression.assignable.AssignableExpression;
import fr.n7.stl.block.ast.expression.assignable.VariableAssignment;
import fr.n7.stl.block.ast.instruction.declaration.VariableDeclaration;
import fr.n7.stl.block.ast.scope.Declaration;
import fr.n7.stl.block.ast.scope.HierarchicalScope;
import fr.n7.stl.block.ast.type.PointerType;
import fr.n7.stl.block.ast.type.Type;
import fr.n7.stl.tam.ast.Fragment;
import fr.n7.stl.tam.ast.Register;
import fr.n7.stl.tam.ast.TAMFactory;
import fr.n7.stl.util.Logger;

/**
* Implementation of the Abstract Syntax Tree node for accessing an expression address.
* @author Marc Pantel
*
*/
public class AddressAccess implements AccessibleExpression {

	protected AssignableExpression assignable;

	public AddressAccess(AssignableExpression _assignable) {
		this.assignable = _assignable;
	}

	/* (non-Javadoc)
	 * @see fr.n7.stl.block.ast.expression.Expression#collect(fr.n7.stl.block.ast.scope.Scope)
	 */
	@Override
	public boolean collectAndBackwardResolve(HierarchicalScope<Declaration> _scope) {

		 /*Instruction i = (Instruction) _scope.get(this.toString());
		 // à voir Instruction i = _scope.get(this.getName());
		 boolean ok = true;
		 if (i == null) {
		 	ok = false;
		 	Logger.error("Address Access collect failed");
		 } else {
			 if ( i instanceof VariableDeclaration) {
				 this.assignable = (AssignableExpression) i;
			 } else {
				 ok = false;
				 Logger.error("Address Access collect failed 2 ");
			 }
		 }
		 return ok;*/

		return this.assignable.collectAndBackwardResolve(_scope);
	}

	/* (non-Javadoc)
	 * @see fr.n7.stl.block.ast.expression.Expression#resolve(fr.n7.stl.block.ast.scope.Scope)
	 */
	@Override
	public boolean fullResolve(HierarchicalScope<Declaration> _scope) {
		//throw new SemanticsUndefinedException( "resolve is undefined in AddressAccess.");
		//J'ai ajouter ceci je sais pas si on doit l'implementer
		return this.assignable.fullResolve(_scope);
	}

	/* (non-Javadoc)
	 * @see fr.n7.stl.block.ast.Expression#getType()
	 */
	@Override
	public Type getType() {
		//throw new SemanticsUndefinedException( "getType is undefined in AddressAccess.");
		System.out.println("assignable address : " + this.assignable);
		System.out.println("assignable address type : " + this.assignable.getType());

		return new PointerType(this.assignable.getType());
	}

	/* (non-Javadoc)
	 * @see fr.n7.stl.block.ast.Expression#getCode(fr.n7.stl.tam.ast.TAMFactory)
	 */
	@Override
	public Fragment getCode(TAMFactory _factory) {
		//throw new SemanticsUndefinedException( "getCode is undefined in AddressAccess.");
		Fragment result = _factory.createFragment();
		VariableAssignment var = (VariableAssignment) this.assignable;
	    VariableDeclaration declaration = var.getDeclaration();
	    
	    /*if (declaration == null) {
	        // Gerer le cas ou la declaration n'est pas disponible
	        Logger.error("Declaration not found for variable assignment.");
	        return result;
	    }*/
 
	    Register register = declaration.getRegister();
	    int offset = declaration.getOffset();

	    result.add(_factory.createLoadA(register, offset));
	    
		return result;
	}

}
