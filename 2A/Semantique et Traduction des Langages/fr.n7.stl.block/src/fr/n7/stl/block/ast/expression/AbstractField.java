package fr.n7.stl.block.ast.expression;

import fr.n7.stl.block.ast.scope.Declaration;
import fr.n7.stl.block.ast.scope.HierarchicalScope;
import fr.n7.stl.block.ast.type.AtomicType;
import fr.n7.stl.block.ast.type.NamedType;
import fr.n7.stl.block.ast.type.RecordType;
import fr.n7.stl.block.ast.type.Type;
import fr.n7.stl.block.ast.type.declaration.FieldDeclaration;

/**
 * Common elements between left (Assignable) and right (Expression) end sides of assignments. These elements
 * share attributes, toString and getType methods.
 * @author Marc Pantel
 *
 */
public abstract class AbstractField implements Expression {

	protected Expression record;
	protected String name;
	
	// Ajout
	protected FieldDeclaration field;
	protected RecordType recordType;

	/**
	 * Construction for the implementation of a record field access expression Abstract Syntax Tree node.
	 * @param _record Abstract Syntax Tree for the record part in a record field access expression.
	 * @param _name Name of the field in the record field access expression.
	 */
	public AbstractField(Expression _record, String _name) {
		this.record = _record;
		this.name = _name;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return this.record + "." + this.name;
	}

	/* (non-Javadoc)
	 * @see fr.n7.stl.block.ast.expression.Expression#collect(fr.n7.stl.block.ast.scope.HierarchicalScope)
	 */
	@Override
	public boolean collectAndBackwardResolve(HierarchicalScope<Declaration> _scope) {
		//throw new SemanticsUndefinedException( "collect is undefined in AbstractField.");
		return this.record.collectAndBackwardResolve(_scope);
	}

	/* (non-Javadoc)
	 * @see fr.n7.stl.block.ast.expression.Expression#resolve(fr.n7.stl.block.ast.scope.HierarchicalScope)
	 */
	@Override
	public boolean fullResolve(HierarchicalScope<Declaration> _scope) {
		//throw new SemanticsUndefinedException( "resolve is undefined in AbstractField.");
//		boolean ok1 = this.record.getType().resolve(_scope);
//		System.out.println("record type : " + this.record.getType());
//		boolean ok2 = true;
//		if ( !_scope.knows(this.name)) {
//			Logger.error("Abstract Field FullResolve failed !");
//			ok2 = false;
//		} else {
//			Declaration i = _scope.get(this.name);
//			System.out.println("i : "+ i) ;
//			if (!(i instanceof FieldDeclaration)) {
//				Logger.error("Abstract Field FullResolve failed 2!");
//				ok2 =false;
//			} else {
//				this.field = (FieldDeclaration) i;
//			}
//		}
//		return ok1 && ok2;
		
		
		// Ajout
		Boolean _result = this.record.fullResolve(_scope); 
		Type _type = this.record.getType();
		//System.out.println("type abstract field : _type (..) :" + _type);

		if (_type instanceof NamedType) {
			_type = ((NamedType) _type).getType();
			//System.out.println("type abstract field : _type (NamedType) :" + _type);

		}
		if (_type instanceof RecordType) {
			//System.out.println("type abstract field : _type (RecordType) :" + _type);
			this.recordType = (RecordType) _type;
			this.field = this.recordType.get(this.name);
			//System.out.println("type abstract field : recordType :" + recordType);

		}
		return _result;
	}

	/**
	 * Synthesized Semantics attribute to compute the type of an expression.
	 * @return Synthesized Type of the expression.
	 */
	@Override
	public Type getType() {
		//throw new SemanticsUndefinedException( "getType is undefined in FieldAccess.");
//		String id = this.field.getName();
//		System.out.println("id : " +  id);
//		System.out.println("field : " +  this.field);
//
//		Type trec = this.record.getType();
//		System.out.println("record : " +  record);
//		System.out.println("trec : " +  trec);
//		return trec;
//		if (trec instanceof NamedType) {
//			trec = <unfold struction>;
//
//		}
//		if (trec instanceof RecordType) {
//			if () {
//				return ((RecordType) trec).get(this.getType());
//
//			} else {
//				Logger.error("Abstract Field getType failed 1 !");
//			}
//		} else {
//
//			Logger.error("Abstract Field getType failed 2 !");
//
//		}
//
//		

		this.record.getType();
		if (this.field != null) {
			return this.field.getType();
		} else {
			return AtomicType.ErrorType;
		}

	}

}