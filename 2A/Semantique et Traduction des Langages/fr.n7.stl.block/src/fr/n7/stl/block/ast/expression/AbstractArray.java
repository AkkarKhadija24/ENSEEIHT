package fr.n7.stl.block.ast.expression;

import fr.n7.stl.block.ast.scope.Declaration;
import fr.n7.stl.block.ast.scope.HierarchicalScope;
import fr.n7.stl.block.ast.type.ArrayType;
import fr.n7.stl.block.ast.type.AtomicType;
import fr.n7.stl.block.ast.type.Type;

/**
 * Common elements between left (Assignable) and right (Expression) end sides of assignments. These elements
 * share attributes, toString and getType methods.
 * @author Marc Pantel
 *
 */
public abstract class AbstractArray implements Expression {

	/**
	 * AST node that represents the expression whose result is an array.
	 */
	protected Expression array;

	/**
	 * AST node that represents the expression whose result is an integer value used to index the array.
	 */
	protected Expression index;

	/**
	 * Construction for the implementation of an array element access expression Abstract Syntax Tree node.
	 * @param _array Abstract Syntax Tree for the array part in an array element access expression.
	 * @param _index Abstract Syntax Tree for the index part in an array element access expression.
	 */
	public AbstractArray(Expression _array, Expression _index) {
		this.array = _array;
		this.index = _index;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return (this.array + "[ " + this.index + " ]");
	}

	/* (non-Javadoc)
	 * @see fr.n7.stl.block.ast.expression.Expression#collect(fr.n7.stl.block.ast.scope.HierarchicalScope)
	 */
	@Override
	public boolean collectAndBackwardResolve(HierarchicalScope<Declaration> _scope) {
		//return this.array.collectAndBackwardResolve(_scope);
		boolean etat = this.array.collectAndBackwardResolve(_scope);
		etat = etat && this.index.collectAndBackwardResolve(_scope);
		if (!etat) {
			System.out.println("Erreur false in AbstractArray.collectAndBackwardResolve");
		}
		return etat;
	}

	/* (non-Javadoc)
	 * @see fr.n7.stl.block.ast.expression.Expression#resolve(fr.n7.stl.block.ast.scope.HierarchicalScope)
	 */
	@Override
	public boolean fullResolve(HierarchicalScope<Declaration> _scope) {
		//return this.array.fullResolve(_scope);
		boolean res = this.array.fullResolve(_scope) && this.index.fullResolve(_scope);
		if (!res) {
			System.out.println("Erreur false in AbstractArray.fullResolve");
		}
		return res;
	}

	/**
	 * Synthesized Semantics attribute to compute the type of an expression.
	 * @return Synthesized Type of the expression.
	 */
	@Override
	public Type getType() {
		//return this.array.getType();
		try {
			ArrayType t = (ArrayType) this.array.getType();
			if (this.index.getType().compatibleWith(AtomicType.IntegerType)) {
				return t.getType();
			}
			return AtomicType.ErrorType;
		} catch (Exception e){
			return AtomicType.ErrorType;
		}
	}

}