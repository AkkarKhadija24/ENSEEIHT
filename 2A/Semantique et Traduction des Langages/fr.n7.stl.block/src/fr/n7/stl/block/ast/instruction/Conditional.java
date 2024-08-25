/**
 *
 */
package fr.n7.stl.block.ast.instruction;

import fr.n7.stl.block.ast.Block;
import fr.n7.stl.block.ast.SemanticsUndefinedException;
import fr.n7.stl.block.ast.expression.Expression;
import fr.n7.stl.block.ast.scope.Declaration;
import fr.n7.stl.block.ast.scope.HierarchicalScope;
import fr.n7.stl.block.ast.type.AtomicType;
import fr.n7.stl.block.ast.type.Type;
import fr.n7.stl.tam.ast.Fragment;
import fr.n7.stl.tam.ast.Register;
import fr.n7.stl.tam.ast.TAMFactory;
import fr.n7.stl.util.Logger;

/**
 * Implementation of the Abstract Syntax Tree node for a conditional instruction.
 * @author Marc Pantel
 *
 */
public class Conditional implements Instruction {

	protected Expression condition;
	protected Block thenBranch;
	protected Block elseBranch;

	public Conditional(Expression _condition, Block _then, Block _else) {
		this.condition = _condition;
		this.thenBranch = _then;
		this.elseBranch = _else;
	}

	public Conditional(Expression _condition, Block _then) {
		this.condition = _condition;
		this.thenBranch = _then;
		this.elseBranch = null;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "if (" + this.condition + " )" + this.thenBranch + ((this.elseBranch != null)?(" else " + this.elseBranch):"");
	}

	/* (non-Javadoc)
	 * @see fr.n7.stl.block.ast.instruction.Instruction#collect(fr.n7.stl.block.ast.scope.Scope)
	 */
	@Override
	public boolean collectAndBackwardResolve(HierarchicalScope<Declaration> _scope) {
		boolean b1 = this.condition.collectAndBackwardResolve(_scope);
		boolean b2  = this.thenBranch.collect(_scope);
		if (this.elseBranch == null) {
			return b1 && b2;
		} else {
			boolean b3 = this.elseBranch.collect(_scope);
			return b1 && b2 && b3;
		}
	}

	/* (non-Javadoc)
	 * @see fr.n7.stl.block.ast.instruction.Instruction#resolve(fr.n7.stl.block.ast.scope.Scope)
	 */
	@Override
	public boolean fullResolve(HierarchicalScope<Declaration> _scope) {
		boolean b1 = this.condition.fullResolve(_scope);
		boolean b2  = this.thenBranch.resolve(_scope);
		if (this.elseBranch == null) {
			return b1 && b2;
		} else {
			boolean b3 = this.elseBranch.resolve(_scope);
			return b1 && b2 && b3;
		}
	}

	/* (non-Javadoc)
	 * @see fr.n7.stl.block.ast.Instruction#checkType()
	 */
	@Override
	public boolean checkType() {
		Type tc = condition.getType();
		boolean tb = thenBranch.checkType();
		boolean te = true;
		if (this.elseBranch != null) {
			te = elseBranch.checkType();
		}
		if (tc.compatibleWith(AtomicType.BooleanType)) {
			return tb && te;
		} else {
			Logger.error("Conditional type error!");
			return false;
		}
	}

	/* (non-Javadoc)
	 * @see fr.n7.stl.block.ast.Instruction#allocateMemory(fr.n7.stl.tam.ast.Register, int)
	 */
	@Override
	public int allocateMemory(Register _register, int _offset) {
		//throw new SemanticsUndefinedException( "Semantics allocateMemory is undefined in Conditional.");
		// Blocs de then et Else
		this.thenBranch.allocateMemory(_register, _offset);
		if (this.elseBranch != null) {
			this.elseBranch.allocateMemory(_register, _offset);
		}
		return 0;
	}

	/* (non-Javadoc)
	 * @see fr.n7.stl.block.ast.Instruction#getCode(fr.n7.stl.tam.ast.TAMFactory)
	 */
	@Override
	public Fragment getCode(TAMFactory _factory) {
		//throw new SemanticsUndefinedException( "Semantics getCode is undefined in Conditional.");
		Fragment _result = _factory.createFragment();
		int id = _factory.createLabelNumber();
		_result.append(this.condition.getCode(_factory));
		//_result.add(_factory.createPop(0, 1));
		//_result.add(_factory.createPush(1));
		if (this.elseBranch == null) {
			_result.add(_factory.createJumpIf("endif" + id, 0));
			_result.append(this.thenBranch.getCode(_factory ));
		} else {
			_result.add(_factory.createJumpIf("else" + id, 0));
			_result.append(this.thenBranch.getCode(_factory));
			_result.add(_factory.createJump("endif" + id));
			_result.addSuffix("else" + id);
			_result.append(this.elseBranch.getCode(_factory));
		}
		_result.addSuffix("endif" + id);
		return _result;
	}

}
