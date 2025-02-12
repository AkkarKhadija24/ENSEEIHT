/**
 *
 */
package fr.n7.stl.block.ast.expression;

import java.util.Iterator;
import java.util.List;

import fr.n7.stl.block.ast.SemanticsUndefinedException;
import fr.n7.stl.block.ast.instruction.declaration.FunctionDeclaration;
import fr.n7.stl.block.ast.scope.Declaration;
import fr.n7.stl.block.ast.scope.HierarchicalScope;
import fr.n7.stl.block.ast.type.Type;
import fr.n7.stl.tam.ast.Fragment;
import fr.n7.stl.tam.ast.Register;
import fr.n7.stl.tam.ast.TAMFactory;
import fr.n7.stl.util.Logger;

/**
 * Abstract Syntax Tree node for a function call expression.
 * @author Marc Pantel
 *
 */
public class FunctionCall implements Expression {

	/**
	 * Name of the called function.
	 * TODO : Should be an expression.
	 */
	protected String name;

	/**
	 * Declaration of the called function after name resolution.
	 * TODO : Should rely on the VariableUse class.
	 */
	protected FunctionDeclaration function;

	/**
	 * List of AST nodes that computes the values of the parameters for the function call.
	 */
	protected List<Expression> arguments;

	/**
	 * @param _name : Name of the called function.
	 * @param _arguments : List of AST nodes that computes the values of the parameters for the function call.
	 */
	public FunctionCall(String _name, List<Expression> _arguments) {
		this.name = _name;
		this.function = null;
		this.arguments = _arguments;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		String _result = ((this.function == null)?this.name:this.function) + "( ";
		Iterator<Expression> _iter = this.arguments.iterator();
		if (_iter.hasNext()) {
			_result += _iter.next();
		}
		while (_iter.hasNext()) {
			_result += " ," + _iter.next();
		}
		return  _result + ")";
	}

	/* (non-Javadoc)
	 * @see fr.n7.stl.block.ast.expression.Expression#collect(fr.n7.stl.block.ast.scope.HierarchicalScope)
	 */
	@Override
	public boolean collectAndBackwardResolve(HierarchicalScope<Declaration> _scope) {
		//throw new SemanticsUndefinedException( "Semantics collect is undefined in FunctionCall.");
		Declaration dect = _scope.get(this.name);
		boolean result = true;
		if (dect instanceof FunctionDeclaration) {
			this.function = (FunctionDeclaration) dect;
			result = (this.arguments.size() == function.getParameters().size());
			for (Expression e : this.arguments) {
				result = result && e.collectAndBackwardResolve(_scope);
			}
			return result;
		} else {
			Logger.error("The function identifier " + this.name + " is not defined!!!!!!!!!");
			return false;
		}
		
//		boolean _function = function.collectAndBackwardResolve(_scope);
//		boolean _arguments = true;
//		if (!arguments.isEmpty()) {
//			for(Expression e : arguments) {
//				_arguments = _arguments && e.collectAndBackwardResolve(_scope);
//			}
//		}
//		return _function && _arguments;
	}

	/* (non-Javadoc)
	 * @see fr.n7.stl.block.ast.expression.Expression#resolve(fr.n7.stl.block.ast.scope.HierarchicalScope)
	 */
	@Override
	public boolean fullResolve(HierarchicalScope<Declaration> _scope) {
		//throw new SemanticsUndefinedException( "Semantics resolve is undefined in FunctionCall.");
		Declaration dect = _scope.get(this.name);
		boolean result = true;
		if (dect instanceof FunctionDeclaration) {
			this.function = (FunctionDeclaration) dect;
			result = (this.arguments.size() == function.getParameters().size());
			for (Expression e : this.arguments) {
				result = result && e.fullResolve(_scope);
			}
			return result;
		} else {
			Logger.error("The function identifier " + this.name + " is not defined.");
			return false;
		}
		
//		boolean _name = _scope.contains(name);
//		boolean _function = function.fullResolve(_scope);
//		boolean _arguments = true;
//		if (!arguments.isEmpty()) {
//			for(Expression e : arguments) {
//				_arguments = _arguments && e.fullResolve(_scope);
//			}
//		}
//		return _name && _function && _arguments;
	}

	/* (non-Javadoc)
	 * @see fr.n7.stl.block.ast.Expression#getType()
	 */
	@Override
	public Type getType() {
		//throw new SemanticsUndefinedException( "Semantics getType is undefined in FunctionCall.");
		return this.function.getType();
	}

	/* (non-Javadoc)
	 * @see fr.n7.stl.block.ast.Expression#getCode(fr.n7.stl.tam.ast.TAMFactory)
	 */
	@Override
	public Fragment getCode(TAMFactory _factory) {
		//throw new SemanticsUndefinedException( "Semantics getCode is undefined in FunctionCall.");
		Fragment _result = _factory.createFragment();
		for (Expression _argument : this.arguments) {
			_result.append(_argument.getCode(_factory));
		}
		_result.add(_factory.createCall("begin:" + this.name, Register.SB));
		return _result;
	}

}
