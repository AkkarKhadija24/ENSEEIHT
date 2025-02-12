/**
 *
 */
package fr.n7.stl.block.ast.expression;

import fr.n7.stl.block.ast.SemanticsUndefinedException;
import fr.n7.stl.block.ast.scope.Declaration;
import fr.n7.stl.block.ast.scope.HierarchicalScope;
import fr.n7.stl.block.ast.type.AtomicType;
import fr.n7.stl.block.ast.type.Type;
import fr.n7.stl.tam.ast.Fragment;
import fr.n7.stl.tam.ast.TAMFactory;
import fr.n7.stl.util.Logger;

/**
 * Abstract Syntax Tree node for a conditional expression.
 * @author Marc Pantel
 *
 */
public class ConditionalExpression implements Expression {

	/**
	 * AST node for the expression whose value is the condition for the conditional expression.
	 */
	protected Expression condition;

	/**
	 * AST node for the expression whose value is the then parameter for the conditional expression.
	 */
	protected Expression thenExpression;

	/**
	 * AST node for the expression whose value is the else parameter for the conditional expression.
	 */
	protected Expression elseExpression;

	/**
	 * Builds a binary expression Abstract Syntax Tree node from the left and right sub-expressions
	 * and the binary operation.
	 * @param _left : Expression for the left parameter.
	 * @param _operator : Binary Operator.
	 * @param _right : Expression for the right parameter.
	 */
	public ConditionalExpression(Expression _condition, Expression _then, Expression _else) {
		this.condition = _condition;
		this.thenExpression = _then;
		this.elseExpression = _else;
	}

	/* (non-Javadoc)
	 * @see fr.n7.stl.block.ast.expression.Expression#collect(fr.n7.stl.block.ast.scope.Scope)
	 */
	@Override
	public boolean collectAndBackwardResolve(HierarchicalScope<Declaration> _scope) {
		//throw new SemanticsUndefinedException( "Semantics collect is undefined in ConditionalExpression.");
		boolean ok = this.condition.collectAndBackwardResolve(_scope);
		boolean b1  = this.thenExpression.collectAndBackwardResolve(_scope);
		if (this.elseExpression == null) {
			ok = ok && b1;
		} else {
			boolean b2  = this.elseExpression.collectAndBackwardResolve(_scope);
			ok = ok && b1 && b2;
		}
		return ok;
	}

	/* (non-Javadoc)
	 * @see fr.n7.stl.block.ast.expression.Expression#resolve(fr.n7.stl.block.ast.scope.Scope)
	 */
	@Override
	public boolean fullResolve(HierarchicalScope<Declaration> _scope) {
		//throw new SemanticsUndefinedException( "Semantics resolve is undefined in ConditionalExpression.");
		boolean ok = this.condition.fullResolve(_scope);
		boolean b1  = this.thenExpression.fullResolve(_scope);
		if (this.elseExpression == null) {
			ok = ok && b1;
		} else {
			boolean b2  = this.elseExpression.fullResolve(_scope);
			ok = ok && b1 && b2;
		}
		return ok;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "(" + this.condition + " ? " + this.thenExpression + " : " + this.elseExpression + ")";
	}

	/* (non-Javadoc)
	 * @see fr.n7.stl.block.ast.Expression#getType()
	 */
	@Override
	public Type getType() {
		//throw new SemanticsUndefinedException( "Semantics getType is undefined in ConditionalExpression.");
		Type typeResultat;
		
		if (this.condition.getType().compatibleWith(AtomicType.BooleanType)) {
			if (this.thenExpression.getType().compatibleWith(this.elseExpression.getType())) {
				typeResultat = this.thenExpression.getType().merge(this.elseExpression.getType());
			} else {
				Logger.error("The type of then and else expression are incompatible.");
				typeResultat = AtomicType.ErrorType;	
			}
		} else {
			Logger.error("The type of condition expression is incompatible.");
			typeResultat = AtomicType.ErrorType;
		}
		return typeResultat;
	}

	/* (non-Javadoc)
	 * @see fr.n7.stl.block.ast.Expression#getCode(fr.n7.stl.tam.ast.TAMFactory)
	 */
	@Override
	public Fragment getCode(TAMFactory _factory) {
		//throw new SemanticsUndefinedException( "Semantics getCode is undefined in ConditionalExpression.");
		Fragment result = _factory.createFragment();
		int id = _factory.createLabelNumber();
		result.append(this.condition.getCode(_factory));
		result.add(_factory.createJumpIf("ElseExpression " + id, 0));
		result.append(this.thenExpression.getCode(_factory));
		result.add(_factory.createJump("EndExpression " + id));
		result.addSuffix("ElseExpression");
		result.append(this.elseExpression.getCode(_factory));
		result.addSuffix("EndExpression " + id);
		return result;
	}

}
