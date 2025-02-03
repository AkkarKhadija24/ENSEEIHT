/**
 * author: Pieter Heyvaert (pheyvaer.heyvaert@ugent.be)
 * Ghent University - imec - IDLab
 */


class RMLWriter {

  constructor(sourcesPaths, nodes, edges) {
    this.sourcesPaths = sourcesPaths;
    this.nodes = nodes;
    this.edges = edges;
    this.rmlTriples = [];
    this.uniqueID = 0;
    this.idWithIRIMap = {};
    this.idWithLSIRIMap = {};
    this.baseIRI = 'http://example.com#';
  }

  write(callback) {
    const RDFWriter = N3.Writer();

    RDFWriter.addQuads(this.getQuads());
    RDFWriter.end((error, result) => callback(result, this.getQuads()));
  }

  getQuads() {
    this.nodes.forEach(node => {
      if (node.type === 'resource' || node.type === "blank") {
        if (node.source) {
          const nodeIRI = namedNode(this._getIRIForNode(node));
          const smIRI = namedNode(this.baseIRI + 'SM' + this._getUniqueID());
          const logicalSourceIRI = namedNode(this._getLogicalSourceIRIForNode(node));
          const referenceFormulation = namedNode(RMLWriter._getReferenceFormulation(node.source.type));
          const rmlSource = literal(this._getRMLSourceOfSource(node.source));
          let iterator = node.iterator;

          if (iterator !== null && iterator !== '') {
            iterator = literal(iterator);
          } else {
            iterator = null;
          }

          this.rmlTriples.push(quad(nodeIRI, namedNode(namespaces.rdf + 'type'), namedNode(namespaces.rr + 'TriplesMap')));
          this.rmlTriples.push(quad(nodeIRI, namedNode(namespaces.rml + 'logicalSource'), logicalSourceIRI));
          this.rmlTriples.push(quad(nodeIRI, namedNode(namespaces.rr + 'subjectMap'), smIRI));
          this.rmlTriples.push(quad(nodeIRI, namedNode(namespaces.dcterms + 'identifier'), literal(node.id)));
          this.rmlTriples.push(quad(logicalSourceIRI, namedNode(namespaces.rdf + 'type'), namedNode(namespaces.rml + 'LogicalSource')));
          this.rmlTriples.push(quad(logicalSourceIRI, namedNode(namespaces.rml + 'referenceFormulation'), referenceFormulation));
          this.rmlTriples.push(quad(logicalSourceIRI, namedNode(namespaces.rml + 'source'), rmlSource));

          if (iterator) {
            this.rmlTriples.push(quad(logicalSourceIRI, namedNode(namespaces.rml + 'iterator'), iterator));
          }

          this.rmlTriples.push(quad(smIRI, namedNode(namespaces.rdf + 'type'), namedNode(namespaces.rml + 'SubjectMap')));
          if(node.type === "resource")
            this.rmlTriples.push(quad(smIRI, namedNode(namespaces.rr + 'template'), literal(Util.expandPrefix(node.template))));

          this.rmlTriples.push(quad(smIRI, namedNode(namespaces.dcterms + 'identifier'), literal(node.id)));
          if(node.comment) {
            this.rmlTriples.push(quad(smIRI, namedNode(namespaces.rdfs + 'comment'), literal(node.comment)))
          }
          if(node.description) {
            this.rmlTriples.push(quad(smIRI, namedNode(namespaces.dcterms + 'description'), literal(node.description)))
          }

          if(node.type === "blank") {
            this.rmlTriples.push(quad(smIRI,  namedNode(namespaces.rr + 'termType'), namedNode(namespaces.rr + 'BlankNode')))
          }

          if (node.className) {
            const pomIRI = namedNode(this.baseIRI + 'POM' + this._getUniqueID());
            const omIRI = namedNode(this.baseIRI + 'OM' + this._getUniqueID());
            const pmIRI = namedNode(this.baseIRI + 'PM' + this._getUniqueID());

            this.rmlTriples.push(quad(nodeIRI, namedNode(namespaces.rr + 'predicateObjectMap'), pomIRI));
            this.rmlTriples.push(quad(pomIRI, namedNode(namespaces.rdf + 'type'), namedNode(namespaces.rr + 'PredicateObjectMap')));
            this.rmlTriples.push(quad(pomIRI, namedNode(namespaces.dcterms + 'identifier'), literal(node.id)));
            this.rmlTriples.push(quad(pomIRI, namedNode(namespaces.rr + 'objectMap'), omIRI));
            this.rmlTriples.push(quad(pomIRI, namedNode(namespaces.rr + 'predicateMap'), pmIRI));
            this.rmlTriples.push(quad(pmIRI, namedNode(namespaces.rdf + 'type'), namedNode(namespaces.rr + 'PredicateMap')));
            this.rmlTriples.push(quad(pmIRI, namedNode(namespaces.rr + 'constant'), namedNode(namespaces.rdf + 'type')));
            this.rmlTriples.push(quad(omIRI, namedNode(namespaces.rdf + 'type'), namedNode(namespaces.rr + 'ObjectMap')));
            this.rmlTriples.push(quad(omIRI, namedNode(namespaces.rr + 'constant'), namedNode(Util.expandPrefix(node.className))));
            this.rmlTriples.push(quad(omIRI, namedNode(namespaces.rr + 'termType'), namedNode(namespaces.rr + 'IRI')));
          }
        }
      }
    });

    this.edges.forEach(edge => {
      const edgeSourceIRI = namedNode(this.idWithIRIMap[edge.sourceID]);
      const targetNode = graphStore.findNode(edge.targetID);
      const pomIRI = namedNode(this.baseIRI + 'POM' + this._getUniqueID());
      const omIRI = namedNode(this.baseIRI + 'OM' + this._getUniqueID());
      const pmIRI = namedNode(this.baseIRI + 'PM' + this._getUniqueID());

      this.rmlTriples.push(quad(edgeSourceIRI, namedNode(namespaces.rr + 'predicateObjectMap'), pomIRI));
      this.rmlTriples.push(quad(pomIRI, namedNode(namespaces.rdf + 'type'), namedNode(namespaces.rr + 'PredicateObjectMap')));
      this.rmlTriples.push(quad(pomIRI, namedNode(namespaces.dcterms + 'identifier'), literal(edge.id)));
      this.rmlTriples.push(quad(pomIRI, namedNode(namespaces.rr + 'objectMap'), omIRI));
      this.rmlTriples.push(quad(pomIRI, namedNode(namespaces.rr + 'predicateMap'), pmIRI));
      this.rmlTriples.push(quad(pmIRI, namedNode(namespaces.rdf + 'type'), namedNode(namespaces.rr + 'PredicateMap')));
      this.rmlTriples.push(quad(pmIRI, namedNode(namespaces.rr + 'template'), literal(Util.expandPrefix(edge.template))));
      this.rmlTriples.push(quad(omIRI, namedNode(namespaces.rdf + 'type'), namedNode(namespaces.rr + 'ObjectMap')));

      if(edge.comment) {
        this.rmlTriples.push(quad(pmIRI, namedNode(namespaces.rdfs + 'comment'), literal(edge.comment)));
      }

      if(edge.description) {
        this.rmlTriples.push(quad(pmIRI, namedNode(namespaces.dcterms + 'description'), literal(edge.description)));
      }

      if (targetNode.type === 'literal') {
        this.rmlTriples.push(quad(omIRI, namedNode(namespaces.dcterms + 'identifier'), literal(targetNode.id)));

      if (targetNode.datatype) {
        this.rmlTriples.push(quad(omIRI, namedNode(namespaces.rr + 'datatype'), namedNode(Util.expandPrefix(targetNode.datatype))));
      }

      if (targetNode.language) {
        this.rmlTriples.push(quad(omIRI, namedNode(namespaces.rr + 'language'), literal(targetNode.language)));
      }

      if (targetNode.comment) {
        this.rmlTriples.push(quad(omIRI, namedNode(namespaces.rdfs + 'comment'), literal(targetNode.comment)));
      }
      if (targetNode.description) {
        this.rmlTriples.push(quad(omIRI, namedNode(namespaces.dcterms + 'description'), literal(targetNode.description)));
      }

        const functionDetails = RMLWriter._getFunctionDetails(targetNode);

        if (functionDetails) {
          const functionValueIRI = namedNode(this.baseIRI + 'FNV' + this._getUniqueID());
          const functionPOMIRI =  namedNode(this.baseIRI + 'POM' + this._getUniqueID());
          const functionPMIRI =  namedNode(this.baseIRI + 'PM' + this._getUniqueID());
          const functionOMIRI =  namedNode(this.baseIRI + 'OM' + this._getUniqueID());

          this.rmlTriples.push(quad(omIRI, namedNode(namespaces.fnml + 'functionValue'), functionValueIRI));
          this.rmlTriples.push(quad(functionValueIRI, namedNode(namespaces.rr + 'predicateObjectMap'), functionPOMIRI));
          this.rmlTriples.push(quad(functionPOMIRI, namedNode(namespaces.rdf + 'type'), namedNode(namespaces.rr + 'PredicateObjectMap')));
          this.rmlTriples.push(quad(functionPOMIRI, namedNode(namespaces.rr + 'predicateMap'), functionPMIRI));
          this.rmlTriples.push(quad(functionPOMIRI, namedNode(namespaces.rr + 'objectMap'), functionOMIRI));
          this.rmlTriples.push(quad(functionPMIRI, namedNode(namespaces.rdf + 'type'), namedNode(namespaces.rr + 'PredicateMap')));
          this.rmlTriples.push(quad(functionPMIRI, namedNode(namespaces.rr + 'constant'), literal(namespaces.fno + 'executes')));
          this.rmlTriples.push(quad(functionOMIRI, namedNode(namespaces.rdf + 'type'), namedNode(namespaces.rr + 'ObjectMap')));
          this.rmlTriples.push(quad(functionOMIRI, namedNode(namespaces.rr + 'constant'), literal(functionDetails.function)));

          functionDetails.parameters.forEach(parameterDetails => {
            const pomIRI =  namedNode(this.baseIRI + 'POM' + this._getUniqueID());
            const omIRI =  namedNode(this.baseIRI + 'OM' + this._getUniqueID());
            const pmIRI =  namedNode(this.baseIRI + 'PM' + this._getUniqueID());

            this.rmlTriples.push(quad(functionValueIRI, namedNode(namespaces.rr + 'predicateObjectMap'), pomIRI));
            this.rmlTriples.push(quad(pomIRI, namedNode(namespaces.rdf + 'type'), namedNode(namespaces.rr + 'PredicateObjectMap')));
            this.rmlTriples.push(quad(pomIRI, namedNode(namespaces.rr + 'predicateMap'), pmIRI));
            this.rmlTriples.push(quad(pomIRI, namedNode(namespaces.rr + 'objectMap'), omIRI));
            this.rmlTriples.push(quad(pmIRI, namedNode(namespaces.rdf + 'type'), namedNode(namespaces.rr + 'PredicateMap')));
            this.rmlTriples.push(quad(pmIRI, namedNode(namespaces.rr + 'constant'), literal(parameterDetails.parameter)));
            this.rmlTriples.push(quad(omIRI, namedNode(namespaces.rdf + 'type'), namedNode(namespaces.rr + 'ObjectMap')));
            this.rmlTriples.push(quad(omIRI, namedNode(namespaces.rml + 'reference'), literal(parameterDetails.value)));
          });
        } else {
          if (RMLWriter._countReference(targetNode.template) === 1 && !RMLWriter._hasConstantPart(targetNode.template) ) {
            this.rmlTriples.push(quad(omIRI, namedNode(namespaces.rml + 'reference'), literal(Util.expandPrefix(RMLWriter._getFirstReference(targetNode.template)))));
          } else {
            this.rmlTriples.push(quad(omIRI, namedNode(namespaces.rr + 'template'), literal(Util.expandPrefix(targetNode.template))));
          }
        }
      } else if (this.idWithIRIMap[targetNode.id]){
        const edgeTargetIRI = namedNode(this.idWithIRIMap[targetNode.id]);

        this.rmlTriples.push(quad(omIRI, namedNode(namespaces.rr + 'parentTriplesMap'), edgeTargetIRI));

        if (!edge.conditions.join.all) {
          const joinConditionIRI =  namedNode(this.baseIRI + 'JC' + this._getUniqueID());

          this.rmlTriples.push(quad(omIRI, namedNode(namespaces.rr + 'joinCondition'), joinConditionIRI));
          this.rmlTriples.push(quad(joinConditionIRI, namedNode(namespaces.rdf + 'type'), namedNode(namespaces.rr + 'JoinCondition')));
          this.rmlTriples.push(quad(joinConditionIRI, namedNode(namespaces.rr + 'child'), literal(edge.conditions.join.child)));
          this.rmlTriples.push(quad(joinConditionIRI, namedNode(namespaces.rr + 'parent'), literal(edge.conditions.join.parent)));
        }
      } else if (targetNode.type !== 'blank'&& !targetNode.source){
        //this case is for a resource node that represents a constant IRI
        this.rmlTriples.push(quad(omIRI, namedNode(namespaces.rr + 'template'), literal(Util.expandPrefix(targetNode.template))));
      }
    });

    console.log(this.rmlTriples);

    return this.rmlTriples;
  }

  _getUniqueID() {
    const temp = this.uniqueID;
    this.uniqueID ++;

    return temp;
  }

  _getIRIForNode(node) {
    if (!this.idWithIRIMap[node.id]) {
      if (node.type === 'resource' || node.type === 'blank') {
        this.idWithIRIMap[node.id] = this.baseIRI + 'TriplesMap' + this._getUniqueID();
      } else {
        this.idWithIRIMap[node.id] = this.baseIRI + 'ObjectMap' + this._getUniqueID();
      }
    }

    return this.idWithIRIMap[node.id];
  }

  _getLogicalSourceIRIForNode(node) {
    if (!this.idWithLSIRIMap[node.id]) {
      this.idWithLSIRIMap[node.id] = this.baseIRI + 'LogicalSource' + this._getUniqueID();
    }

    return this.idWithLSIRIMap[node.id];
  }

  static _getReferenceFormulation(str) {
    const map = {
      'csv': 'CSV',
      'json': 'JSONPath',
      'xml': 'XPath'
    };

    return namespaces.ql + map[str];
  }

  _getRMLSourceOfSource(source) {
    if (this.sourcesPaths && this.sourcesPaths[source.title]) {
      return this.sourcesPaths[source.title];
    } else {
      return source.id;
    }
  }

  static _getFunctionDetails(node) {
    let temp = node.template;
    temp = temp.replace('{', '');
    temp = temp.replace('}', '');

    const open = node.template.indexOf("{");
    const close = node.template.indexOf("}");

    let treeData;

    if (node.source) {
      treeData = Util.getTreeDataOfReference(node.source, temp);
    }

    if (treeData && open === 0 && close === node.template.length - 1 && treeData && treeData.custom) {
      const parameters = [];

      for (let j = 0; j < treeData.values.length; j++) {
        const fnParameters = functionsStore.getFunctionByID(treeData.function).parameters;
        const parameter = fnParameters[treeData.values[j].parameter - 1].id;

        parameters.push({
          parameter,
          value: treeData.values[j].theValue
        });
      }

      return {
        function: treeData.function,
        parameters
      };
    } else {
      return null;
    }
  }

  static _countReference(t) {
    t = '' + t;
    const match =  t.match(/\{([^\}]*)\}/g);

    if (match === null) {
      return 0;
    } else {
      return match.length;
    }
  }

  static _hasConstantPart(t) {
    return ('' + t).replace(/\{([^\}]*)\}/g, "").length > 0;
  }

  static _getFirstReference(t) {
    t = '' + t;
    const a = t.match(/\{([^\}]*)\}/g);

    return a[0].substr(1, a[0].length - 2);
  }
}