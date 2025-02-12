/**
 *
 */
package fr.n7.stl.block.ast.instruction.declaration;

import java.util.Iterator;
import java.util.List;

import fr.n7.stl.block.ast.Block;
import fr.n7.stl.block.ast.SemanticsUndefinedException;
import fr.n7.stl.block.ast.instruction.Instruction;
import fr.n7.stl.block.ast.scope.Declaration;
import fr.n7.stl.block.ast.scope.HierarchicalScope;
import fr.n7.stl.block.ast.scope.SymbolTable;
import fr.n7.stl.block.ast.type.AtomicType;
import fr.n7.stl.block.ast.type.Type;
import fr.n7.stl.tam.ast.Fragment;
import fr.n7.stl.tam.ast.Register;
import fr.n7.stl.tam.ast.TAMFactory;
import fr.n7.stl.util.Logger;

/**
 * Abstract Syntax Tree node for a function declaration.
 * @author Marc Pantel
 */
public class FunctionDeclaration implements Instruction, Declaration {

	/**
	 * Name of the function
	 */
	protected String name;

	/**
	 * AST node for the returned type of the function
	 */
	protected Type type;

	protected SymbolTable parameterTable;
	/**
	 * List of AST nodes for the formal parameters of the function
	 */
	protected List<ParameterDeclaration> parameters;

	/**
	 * @return the parameters
	 */
	public List<ParameterDeclaration> getParameters() {
		return parameters;
	}

	/**
	 * AST node for the body of the function
	 */
	protected Block body;

	protected int offset;

	/**
	 * Builds an AST node for a function declaration
	 * @param _name : Name of the function
	 * @param _type : AST node for the returned type of the function
	 * @param _parameters : List of AST nodes for the formal parameters of the function
	 * @param _body : AST node for the body of the function
	 */
	public FunctionDeclaration(String _name, Type _type, List<ParameterDeclaration> _parameters, Block _body) {
		this.name = _name;
		this.type = _type;
		this.parameters = _parameters;
		this.body = _body;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		String _result = this.type + " " + this.name + "( ";
		Iterator<ParameterDeclaration> _iter = this.parameters.iterator();
		if (_iter.hasNext()) {
			_result += _iter.next();
			while (_iter.hasNext()) {
				_result += " ," + _iter.next();
			}
		}
		return _result + " )" + this.body;
	}

	/* (non-Javadoc)
	 * @see fr.n7.stl.block.ast.Declaration#getName()
	 */
	@Override
	public String getName() {
		return this.name;
	}

	/* (non-Javadoc)
	 * @see fr.n7.stl.block.ast.Declaration#getType()
	 */
	@Override
	public Type getType() {
		return this.type;
	}

	/* (non-Javadoc)
	 * @see fr.n7.stl.block.ast.instruction.Instruction#collect(fr.n7.stl.block.ast.scope.Scope)
	 */
	@Override
	public boolean collectAndBackwardResolve(HierarchicalScope<Declaration> _scope) {
		//throw new SemanticsUndefinedException( "Semantics collect is undefined in FunctionDeclaration.");
		if (((HierarchicalScope<Declaration>)_scope).accepts(this)) {
			_scope.register(this);
			this.parameterTable = new SymbolTable(_scope);
			//System.out.println("newts : " + nST);
			boolean result;
			for (ParameterDeclaration p : this.parameters) {
				//System.out.println("parametre : " + p.getType());
				//nST.register(p);
				//System.out.println("nST.accepts(p) :  " + nST.accepts(p));
			   if (this.parameterTable.accepts(p)) {
				   this.parameterTable.register(p);
			   } else {
				 return false;
			   }
			}
			//this.parameterTable = nST;
			result = this.body.collect(this.parameterTable);
			//System.out.println("***************");
			//System.out.println("result body : " + result);
			return result;
		} else {
			Logger.error("The function identifier " + this.name + " is already defined.");
			return false;
		}
	}

	/* (non-Javadoc)
	 * @see fr.n7.stl.block.ast.instruction.Instruction#resolve(fr.n7.stl.block.ast.scope.Scope)
	 */
	@Override
	public boolean fullResolve(HierarchicalScope<Declaration> _scope) {
		//throw new SemanticsUndefinedException( "Semantics resolve is undefined in FunctionDeclaration.");
		SymbolTable.fd = this;
		return this.body.resolve(this.parameterTable);
	}

	/* (non-Javadoc)
	 * @see fr.n7.stl.block.ast.instruction.Instruction#checkType()
	 */
	@Override
	public boolean checkType() {
		//throw new SemanticsUndefinedException( "Semantics checkType is undefined in FunctionDeclaration.");
		// A voir!!!!!!!!!!!!!!!!!!!
		boolean _result = true;
		for(ParameterDeclaration parameterDeclaration : SymbolTable.fd.parameters) {
            if (parameterDeclaration.getType().equalsTo(AtomicType.ErrorType)) {
				Logger.error(parameterDeclaration + " is not compatible with parameters type.");
				_result = false;
            }
        }
		_result = _result && SymbolTable.fd.body.checkType();
		return _result;
	}

	/* (non-Javadoc)
	 * @see fr.n7.stl.block.ast.instruction.Instruction#allocateMemory(fr.n7.stl.tam.ast.Register, int)
	 */
	@Override
	public int allocateMemory(Register _register, int _offset) {
		//throw new SemanticsUndefinedException( "Semantics allocateMemory is undefined in FunctionDeclaration.");
		this.offset = 0;
		for (ParameterDeclaration p : this.parameters) {
			this.offset += p.getType().length();
		}
		this.body.allocateMemory(Register.LB, 3);
		return 0;
	}

	/* (non-Javadoc)
	 * @see fr.n7.stl.block.ast.instruction.Instruction#getCode(fr.n7.stl.tam.ast.TAMFactory)
	 */
	@Override
	public Fragment getCode(TAMFactory _factory) {
		//throw new SemanticsUndefinedException( "Semantics getCode is undefined in FunctionDeclaration.");
		Fragment _result = _factory.createFragment();
		_result.append(this.body.getCode(_factory));
		_result.addPrefix("begin:" + this.name);
		if (this.type == AtomicType.VoidType){
			_result.add(_factory.createReturn(0, this.offset));
		}
		_result.addSuffix("end:" + this.name);
		return _result;
	}

}
