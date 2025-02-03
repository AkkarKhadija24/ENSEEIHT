(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ontology2rml = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/**
 * Created by pheyvaer on 23.02.17.
 */

let generateGraph = require('./lib/graphgenerator.js');
let generateRML = require('./lib/rmlgenerator.js');

function generate(ontologyTriples) {
  return generateRML(generateGraph(ontologyTriples));
}

module.exports = generate;
},{"./lib/graphgenerator.js":3,"./lib/rmlgenerator.js":5}],2:[function(require,module,exports){
/**
 * Created by pheyvaer on 23.02.17.
 */

let PROPERTY_TYPES = require('./propertytypes.js');

class Graph {

  constructor() {
    this.classNodes = [];
    this.datatypeNodes = [];
    this.datatypeEdges  = [];
    this.objectEdges  = [];
  }

  getClassNode(classname) {
    let i = 0;

    while (i < this.classNodes.length && this.classNodes[i].classname !== classname) {
      i ++;
    }

    if (i < this.classNodes.length) {
      return this.classNodes[i];
    } else {
      let newNode = {
        classname: classname,
        properties: []
      };

      this.classNodes.push(newNode);

      return newNode;
    }
  }

  getAllClassNodes() {
    return this.classNodes;
  }

  getDatatypeNode(datatype) {
    let i = 0;

    while (i < this.datatypeNodes.length && this.datatypeNodes[i].datatype !== datatype) {
      i ++;
    }

    if (i < this.datatypeNodes.length) {
      return this.datatypeNodes[i];
    } else {
      let newNode = {
        datatype: datatype,
        properties: []
      };

      this.datatypeNodes.push(newNode);

      return newNode;
    }
  }

  getDatatypeEdge(property) {
    let i = 0;

    while (i < this.datatypeEdges.length && this.datatypeEdges[i].property !== property) {
      i ++;
    }

    if (i < this.datatypeEdges.length) {
      return this.datatypeEdges[i];
    } else {
      let newEdge = {
        property: property,
        targetNodes: [],
        type: PROPERTY_TYPES.DATATYPE
      };

      this.datatypeEdges.push(newEdge);

      return newEdge;
    }
  }

  getAllDatatypeEdges() {
    return this.datatypeEdges;
  }

  getObjectEdge(property) {
    let i = 0;

    while (i < this.objectEdges.length && this.objectEdges[i].property !== property) {
      i ++;
    }

    if (i < this.objectEdges.length) {
      return this.objectEdges[i];
    } else {
      let newEdge = {
        property: property,
        targetNodes: [],
        type: PROPERTY_TYPES.OBJECT
      };

      this.objectEdges.push(newEdge);

      return newEdge;
    }
  }

  getAllObjectEdges() {
    return this.objectEdges;
  }

  getAllEdgesWithoutDomain() {
    let edgesWithoutDomain = [];
    let edges = this.objectEdges.concat(this.datatypeEdges);
    let nodes = this.classNodes.concat(this.datatypeNodes);

    for (let i = 0; i < edges.length; i ++) {
      let edge = edges[i];
      let j = 0;

      while (j < nodes.length && nodes[j].properties.indexOf(edge) === -1) {
        j ++;
      }

      if (j === nodes.length) {
        edgesWithoutDomain.push(edge);
      }
    }

    return edgesWithoutDomain;
  }

  getEdge(property) {
    let i = 0;
    let edges = this.objectEdges.concat(this.datatypeEdges);

    while (i < edges.length && edges[i].property !== property) {
      i ++;
    }

    if (i < edges.length) {
      return edges[i];
    } else {
      return null;
    }
  }

  getNode(data) {
    let i = 0;
    let nodes = this.classNodes.concat(this.datatypeNodes);

    while (i < nodes.length && nodes[i].classname !== data && nodes[i].datatype !== data) {
      i ++;
    }

    if (i < nodes.length) {
      return nodes[i];
    } else {
      return null;
    }
  }
}

module.exports = Graph;
},{"./propertytypes.js":4}],3:[function(require,module,exports){
/**
 * Created by pheyvaer on 23.02.17.
 */

let Graph = require('./graph.js');
let PROPERTY_TYPE = require('./propertytypes.js');
let N3 = require('n3');
const namespaces = require('prefix-ns').asMap();
const {DataFactory} = N3;
const {namedNode, literal, defaultGraph, quad} = DataFactory;

/**
 *
 * @param ontologyTriples: an N3.Store
 * @returns {*}
 */
function generate(ontologyTriples) {
  const graph = new Graph();

  //get all classes
  let classes = ontologyTriples.getQuads(null, namedNode(namespaces.rdf + 'type'), namedNode(namespaces.rdfs + 'Class')).map(a => a.subject);
  classes = classes.concat(ontologyTriples.getQuads(null, namedNode(namespaces.rdf + 'type'), namespaces.owl + 'Class').map(a => a.subject));

  classes.forEach(c => {
    if (!N3.Util.isBlankNode(c)) {
      graph.getClassNode(c.value);
    }
  });

  //get all object properties
  const objectProperties = ontologyTriples.getQuads(null, namedNode(namespaces.rdf + 'type'), namedNode(namespaces.owl + 'ObjectProperty')).map(a => a.subject.value);

  objectProperties.forEach(property => {
    const edge = graph.getObjectEdge(property);
    generateDomainRange(ontologyTriples, graph, edge, false);
  });

  //get all datatype properties
  const datatypeProperties = ontologyTriples.getQuads(null, namedNode(namespaces.rdf + 'type'), namedNode(namespaces.owl + 'DatatypeProperty')).map(a => a.subject.value);

  datatypeProperties.forEach(property => {
    const edge = graph.getDatatypeEdge(property);
    generateDomainRange(ontologyTriples, graph, edge, true);
  });

  //get all OWL restrictions
  const restrictions = getOWLRestrictions(ontologyTriples);

  restrictions.forEach(restriction => {
    const node = graph.getClassNode(restriction.class);
    const edge = graph.getEdge(restriction.property);
    let targetNode = graph.getNode(restriction.value);

    if (!targetNode) {
      if (edge.type === PROPERTY_TYPE.DATATYPE) {
        targetNode = graph.getDatatypeNode(restriction.value);
      } else {
        targetNode = graph.getClassNode(restriction.value);
      }
    }

    //make sure that an edge is added only once
    let j = 0;

    while (j < node.properties.length && node.properties[j].property !== edge.property) {
      j++;
    }

    if (j === node.properties.length) {
      node.properties.push(edge);
    }

    //make sure that a targetnode is added only once
    j = 0;

    if (targetNode.classname) {
      while (j < edge.targetNodes.length && edge.targetNodes[j].classname !== targetNode.classname) {
        j++;
      }
    } else {
      while (j < edge.targetNodes.length && edge.targetNodes[j].datatype !== targetNode.datatype) {
        j++;
      }
    }

    if (j === edge.targetNodes.length) {
      edge.targetNodes.push(targetNode);
    }
  });

  console.log(graph);

  return graph;
}

function generateDomainRange(ontologyTriples, graph, edge, isDatatype) {
  //get domains
  const domains = ontologyTriples.getQuads(namedNode(edge.property), namedNode(namespaces.rdfs + 'domain'), null).map(a => a.object.value);

  domains.forEach(domain => {
    graph.getClassNode(domain).properties.push(edge);
  });

  //get ranges
  const ranges = ontologyTriples.getQuads(namedNode(edge.property), namedNode(namespaces.rdfs + 'range'), null).map(a => a.object.value);

  ranges.forEach(range => {
    if (isDatatype) {
      edge.targetNodes.push(graph.getDatatypeNode(range));
    } else {
      edge.targetNodes.push(graph.getClassNode(range));
    }
  });
}

function getOWLRestrictions(ontologyTriples) {
  const results = ontologyTriples.getQuads(null, namedNode(namespaces.rdfs + 'subClassOf'), null);
  const restrictions = [];

  results.forEach(result => {
    const c = result.subject;
    const subClass = result.object;
    const types = ontologyTriples.getQuads(subClass, namedNode(namespaces.rdf + 'type'), namedNode(namespaces.owl + 'Restriction')).map(a => a.object.value);
    const onProperties = ontologyTriples.getQuads(subClass, namedNode(namespaces.owl + 'onProperty'), null).map(a => a.object.value);
    const allValuesFroms = ontologyTriples.getQuads(subClass, namedNode(namespaces.owl + 'allValuesFrom'), null).map(a => a.object.value);
    const someValuesFroms = ontologyTriples.getQuads(subClass, namedNode(namespaces.owl + 'someValuesFrom'), null).map(a => a.object.value);
    const onClasses = ontologyTriples.getQuads(subClass, namedNode(namespaces.owl + 'onClass'), null).map(a => a.object.value);
    const qualifiedCardinalities = ontologyTriples.getQuads(subClass, namedNode(namespaces.owl + 'qualifiedCardinality'), null).map(a => a.object.value);

    if (types.length > 0) {
      const restriction = {
        class: c.value
      };

      if (onProperties.length > 0) {
        restriction.property = onProperties[0];
      }

      if (allValuesFroms.length > 0) {
        restriction.value = allValuesFroms[0];
      }

      if (someValuesFroms.length > 0) {
        restriction.value = someValuesFroms[0];
      }

      if (onClasses.length > 0 && qualifiedCardinalities.length > 0 && qualifiedCardinalities[0] > 0) {
        restriction.value = onClasses[0];
      }

      restrictions.push(restriction);
    }
  });

  return restrictions;
}

module.exports = generate;
},{"./graph.js":2,"./propertytypes.js":4,"n3":6,"prefix-ns":17}],4:[function(require,module,exports){
/**
 * Created by pheyvaer on 28.02.17.
 */

let PROPERTY_TYPES = {
  DATATYPE: 0,
  OBJECT: 1
};

module.exports = PROPERTY_TYPES;
},{}],5:[function(require,module,exports){
/**
 * Created by pheyvaer on 23.02.17.
 */

const N3 = require('n3');
const {DataFactory} = N3;
const {namedNode, literal, defaultGraph, quad} = DataFactory;
const PROPERTY_TYPES = require('./propertytypes.js');
const namespaces = require('prefix-ns').asMap();

class Generator {

  constructor() {
    this.mappingCounter = 0;
    this.mappingCounterMap = {};
  }

  generate(graph) {
    const store = N3.Store();

    //iterate over all classes and generate term maps and subject maps
    const nodes = graph.getAllClassNodes();

    for (let i = 0; i < nodes.length; i++) {
      let uri = this.generateMappingURI(nodes[i].classname);
      store.addQuad(namedNode(uri), namedNode(namespaces.rdf + 'type'), namedNode(namespaces.rr + 'TriplesMap'));
      this.generatePredicateObjectMap(uri, nodes[i].classname, namespaces.rdf + 'type', {value: nodes[i].classname, type: 'IRI'}, store);
    }

    for (let i = 0; i < nodes.length; i++) {
      //iterate over all the  properties of the class
      const properties = nodes[i].properties;
      console.log(properties);
      for (let j = 0; j < properties.length; j++) {

        if (properties[j].type === PROPERTY_TYPES.DATATYPE && properties[j].targetNodes.length > 0) {
          const datatype = properties[j].targetNodes[0].datatype;
          this.generatePredicateObjectMap(this.mappingCounterMap[nodes[i].classname].uri, nodes[i].classname, properties[j].property, {datatype}, store);
        } else {
          const pomURI = this.generatePredicateObjectMap(this.mappingCounterMap[nodes[i].classname].uri, nodes[i].classname, properties[j].property, null, store);

          let targetNodes = properties[j].targetNodes;
          for (let k = 0; k < targetNodes.length; k++) {
            this.generateObjectMapWithParentTriplsMap(pomURI, nodes[i].classname, targetNodes[k].classname, store);
          }
        }
      }
    }
    
    //output all the object properties without a range (because you can't fill in the parenttriplesmap)

    return {
      rml: store.getQuads(null, null, null),
      propertiesWithoutDomain: graph.getAllEdgesWithoutDomain()
    };
  }

  generateMappingURI(classname) {
    let classes = Object.keys(this.mappingCounterMap);

    if (classes.indexOf(classname) === -1) {
      let uri = namespaces.ex + 'Mapping' + this.mappingCounter;
      this.mappingCounterMap[classname] = {uri: uri, number: this.mappingCounter, pomCounter: 0, omCounter: 0, pmCounter: 0};
      this.mappingCounter++;
    }

    return this.mappingCounterMap[classname].uri;
  }

  generateSubjectMap(mappingURI, classname, store) {
    let uri = namespaces.ex + 'SubjectMap' + this.mappingCounterMap[classname].number;

    store.addQuad(namedNode(mappingURI), namedNode(namespaces.rr + 'subjectMap'), namedNode(uri));
    store.addQuad(namedNode(uri), namedNode(namespaces.rr + 'class'), namedNode(classname));
  }

  generatePredicateObjectMap(mappingURI, classname, predicate, object = null, store) {
    let pom = namespaces.ex + 'POM' + this.mappingCounterMap[classname].number + '-' + this.mappingCounterMap[classname].pomCounter;
    this.mappingCounterMap[classname].pomCounter ++;
    pom = namedNode(pom);

    let pm = namespaces.ex + 'PM' + this.mappingCounterMap[classname].number + '-' + this.mappingCounterMap[classname].pmCounter;
    this.mappingCounterMap[classname].pmCounter ++;
    pm = namedNode(pm);

    store.addQuad(mappingURI, namedNode(namespaces.rr + 'predicateObjectMap'), pom);
    store.addQuad(pom, namedNode(namespaces.rdf + 'type'), namedNode(namespaces.rr + 'PredicateObjectMap'));
    store.addQuad(pom, namedNode(namespaces.rr + 'predicateMap'), pm);
    store.addQuad(pm, namedNode(namespaces.rdf + 'type'), namedNode(namespaces.rr + 'PredicateMap'));
    store.addQuad(pm, namedNode(namespaces.rr + 'constant'), namedNode(predicate));

    if (object) {
      let om = namespaces.ex + 'OM' + this.mappingCounterMap[classname].number + '-' + this.mappingCounterMap[classname].omCounter;
      this.mappingCounterMap[classname].omCounter++;
      om = namedNode(om);
      store.addQuad(pom, namedNode(namespaces.rr + 'objectMap'), om);
      store.addQuad(om, namedNode(namespaces.rdf + 'type'), namedNode(namespaces.rr + 'ObjectMap'));

      if (object.value) {
        store.addQuad(om, namedNode(namespaces.rr + 'constant'), object.value);
      }

      if (object.type) {
        store.addQuad(om, namedNode(namespaces.rr + 'termType'), namedNode(namespaces.rr + object.type));
      } else {
        store.addQuad(om, namedNode(namespaces.rr + 'termType'), namedNode(namespaces.rr + 'Literal'));
      }

      if (object.datatype) {
        store.addQuad(om, namedNode(namespaces.rr + 'datatype'), namedNode(object.datatype));
      }
    }

    return pom;
  }

  generateObjectMapWithParentTriplsMap(pomURI, classnameSource, classNameTarget, store){
    let uri = namedNode(namespaces.ex + 'OM' + this.mappingCounterMap[classnameSource].number + '-' + this.mappingCounterMap[classnameSource].omCounter);
    this.mappingCounterMap[classnameSource].omCounter ++;
    let parentTriplesMapURI = namedNode(this.mappingCounterMap[classNameTarget].uri);

    store.addQuad(pomURI, namedNode(namespaces.rr + 'objectMap'), uri);
    store.addQuad(uri, namedNode(namespaces.rr + 'parentTriplesMap'), parentTriplesMapURI);
  }
}

module.exports = function(graph){
  return (new Generator()).generate(graph);
};
},{"./propertytypes.js":4,"n3":6,"prefix-ns":17}],6:[function(require,module,exports){
module.exports = {
  DataFactory:  require('./lib/N3DataFactory'),
  Lexer:        require('./lib/N3Lexer'),
  Parser:       require('./lib/N3Parser'),
  Writer:       require('./lib/N3Writer'),
  Store:        require('./lib/N3Store'),
  StreamParser: require('./lib/N3StreamParser'),
  StreamWriter: require('./lib/N3StreamWriter'),
  Util:         require('./lib/N3Util'),
};

},{"./lib/N3DataFactory":8,"./lib/N3Lexer":9,"./lib/N3Parser":10,"./lib/N3Store":11,"./lib/N3StreamParser":12,"./lib/N3StreamWriter":13,"./lib/N3Util":14,"./lib/N3Writer":15}],7:[function(require,module,exports){
var RDF  = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
    XSD  = 'http://www.w3.org/2001/XMLSchema#',
    SWAP = 'http://www.w3.org/2000/10/swap/';

module.exports = {
  xsd: {
    decimal: XSD + 'decimal',
    boolean: XSD + 'boolean',
    double:  XSD + 'double',
    integer: XSD + 'integer',
    string:  XSD + 'string',
  },
  rdf: {
    type:       RDF + 'type',
    nil:        RDF + 'nil',
    first:      RDF + 'first',
    rest:       RDF + 'rest',
    langString: RDF + 'langString',
  },
  owl: {
    sameAs: 'http://www.w3.org/2002/07/owl#sameAs',
  },
  r: {
    forSome: SWAP + 'reify#forSome',
    forAll:  SWAP + 'reify#forAll',
  },
  log: {
    implies: SWAP + 'log#implies',
  },
};

},{}],8:[function(require,module,exports){
// N3.js implementations of the RDF/JS core data types
// See https://github.com/rdfjs/representation-task-force/blob/master/interface-spec.md

var namespaces = require('./IRIs');
var rdf = namespaces.rdf,
    xsd = namespaces.xsd;

var DataFactory, DEFAULTGRAPH;

var _blankNodeCounter = 0;

// ## Term constructor
function Term(id) {
  if (!(this instanceof Term))
    return new Term(id);
  this.id = id;
}
// ### Makes this class a subclass of the given type
Term.subclass = function subclass(Type, name) {
  Type.prototype = Object.create(this.prototype, {
    constructor: { value: Type },
    termType:    { value: name || Type.name },
  });
  Type.subclass = subclass;
};

// ### Returns whether this object represents the same term as the other
Term.prototype.equals = function (other) {
  // If both terms were created by this library,
  // equality can be computed through ids
  if (other instanceof Term)
    return this.id === other.id;
  // Otherwise, compare term type and value
  return !!other && this.termType === other.termType &&
                    this.value    === other.value;
};

// ### Returns a plain object representation of this term
Term.prototype.toJSON = function () {
  return {
    termType: this.termType,
    value:    this.value,
  };
};

// ### Constructs a term from the given internal string ID
function fromId(id, factory) {
  factory = factory || DataFactory;

  // Falsy value or empty string indicate the default graph
  if (!id)
    return factory.defaultGraph();

  // Identify the term type based on the first character
  switch (id[0]) {
  case '_': return factory.blankNode(id.substr(2));
  case '?': return factory.variable(id.substr(1));
  case '"':
    // Shortcut for internal literals
    if (factory === DataFactory)
      return new Literal(id);
    // Literal without datatype or language
    if (id[id.length - 1] === '"')
      return factory.literal(id.substr(1, id.length - 2));
    // Literal with datatype or language
    var endPos = id.lastIndexOf('"', id.length - 1);
    return factory.literal(id.substr(1, endPos - 1),
            id[endPos + 1] === '@' ? id.substr(endPos + 2)
                                   : factory.namedNode(id.substr(endPos + 3)));
  default:  return factory.namedNode(id);
  }
}

// ### Constructs an internal string ID from the given term or ID string
function toId(term) {
  if (typeof term === 'string')
    return term;
  if (term instanceof Term)
    return term.id;
  if (!term)
    return DEFAULTGRAPH.value;

  // Term instantiated with another library
  switch (term.termType) {
  case 'NamedNode':    return term.value;
  case 'BlankNode':    return '_:' + term.value;
  case 'Variable':     return '?' + term.value;
  case 'DefaultGraph': return '';
  case 'Literal':      return '"' + term.value + '"' +
    (term.language ? '@' + term.language :
      (term.datatype && term.datatype.value !== xsd.string ? '^^' + term.datatype.value : ''));
  default: throw new Error('Unexpected termType: ' + term.termType);
  }
}

// ## NamedNode constructor
function NamedNode(iri) {
  if (!(this instanceof NamedNode))
    return new NamedNode(iri);
  this.id = iri;
}
Term.subclass(NamedNode, 'NamedNode');

// ### The IRI of this named node
Object.defineProperty(NamedNode.prototype, 'value', {
  get: function () { return this.id; },
});


// ## BlankNode constructor
function BlankNode(name) {
  if (!(this instanceof BlankNode))
    return new BlankNode(name);
  this.id = '_:' + name;
}
Term.subclass(BlankNode, 'BlankNode');

// ### The name of this blank node
Object.defineProperty(BlankNode.prototype, 'value', {
  get: function () { return this.id.substr(2); },
});


// ## Variable constructor
function Variable(name) {
  if (!(this instanceof Variable))
    return new Variable(name);
  this.id = '?' + name;
}
Term.subclass(Variable, 'Variable');

// ### The name of this variable
Object.defineProperty(Variable.prototype, 'value', {
  get: function () { return this.id.substr(1); },
});


// ## Literal constructor
function Literal(id) {
  if (!(this instanceof Literal))
    return new Literal(id);
  this.id = id;
}
Term.subclass(Literal, 'Literal');

// ### The text value of this literal
Object.defineProperty(Literal.prototype, 'value', {
  get: function () {
    return this.id.substring(1, this.id.lastIndexOf('"'));
  },
});

// ### The language of this literal
Object.defineProperty(Literal.prototype, 'language', {
  get: function () {
    // Find the last quotation mark (e.g., '"abc"@en-us')
    var id = this.id, atPos = id.lastIndexOf('"') + 1;
    // If "@" it follows, return the remaining substring; empty otherwise
    return atPos < id.length && id[atPos++] === '@' ? id.substr(atPos).toLowerCase() : '';
  },
});

// ### The datatype IRI of this literal
Object.defineProperty(Literal.prototype, 'datatype', {
  get: function () {
    return new NamedNode(this.datatypeString);
  },
});

// ### The datatype string of this literal
Object.defineProperty(Literal.prototype, 'datatypeString', {
  get: function () {
    // Find the last quotation mark (e.g., '"abc"^^http://ex.org/types#t')
    var id = this.id, dtPos = id.lastIndexOf('"') + 1, ch;
    // If "^" it follows, return the remaining substring
    return dtPos < id.length && (ch = id[dtPos]) === '^' ? id.substr(dtPos + 2) :
           // If "@" follows, return rdf:langString; xsd:string otherwise
           (ch !== '@' ? xsd.string : rdf.langString);
  },
});

// ### Returns whether this object represents the same term as the other
Literal.prototype.equals = function (other) {
  // If both literals were created by this library,
  // equality can be computed through ids
  if (other instanceof Literal)
    return this.id === other.id;
  // Otherwise, compare term type, value, language, and datatype
  return !!other && !!other.datatype &&
                    this.termType === other.termType &&
                    this.value    === other.value    &&
                    this.language === other.language &&
                    this.datatype.value === other.datatype.value;
};

// ### Returns a plain object representation of this term
Literal.prototype.toJSON = function () {
  return {
    termType: this.termType,
    value:    this.value,
    language: this.language,
    datatype: { termType: 'NamedNode', value: this.datatypeString },
  };
};


// ## DefaultGraph singleton
function DefaultGraph() {
  return DEFAULTGRAPH || this;
}
Term.subclass(DefaultGraph, 'DefaultGraph');

// Initialize singleton
DEFAULTGRAPH = new DefaultGraph();
DEFAULTGRAPH.id = '';

// ### The empty string
Object.defineProperty(DefaultGraph.prototype, 'value', { value: '' });

// ### Returns whether this object represents the same term as the other
DefaultGraph.prototype.equals = function (other) {
  // If both terms were created by this library,
  // equality can be computed through strict equality;
  // otherwise, compare term types.
  return (this === other) || (!!other && (this.termType === other.termType));
};


// ## Quad constructor
function Quad(subject, predicate, object, graph) {
  if (!(this instanceof Quad))
    return new Quad();
  this.subject   = subject;
  this.predicate = predicate;
  this.object    = object;
  this.graph     = graph || DEFAULTGRAPH;
}

// ### Returns a plain object representation of this quad
Quad.prototype.toJSON = function () {
  return {
    subject:   this.subject.toJSON(),
    predicate: this.predicate.toJSON(),
    object:    this.object.toJSON(),
    graph:     this.graph.toJSON(),
  };
};

// ### Returns whether this object represents the same quad as the other
Quad.prototype.equals = function (other) {
  return !!other && this.subject.equals(other.subject)     &&
                    this.predicate.equals(other.predicate) &&
                    this.object.equals(other.object)       &&
                    this.graph.equals(other.graph);
};


// ## DataFactory functions

// ### Creates an IRI
function namedNode(iri) {
  return new NamedNode(iri);
}

// ### Creates a blank node
function blankNode(name) {
  if (!name)
    name = 'n3-' + _blankNodeCounter++;
  return new BlankNode(name);
}

// ### Creates a literal
function literal(value, languageOrDataType) {
  // Create a language-tagged string
  if (typeof languageOrDataType === 'string')
    return new Literal('"' + value + '"@' + languageOrDataType.toLowerCase());

  // Create a datatyped literal
  var datatype = languageOrDataType && languageOrDataType.value || '';
  if (!datatype) {
    switch (typeof value) {
    // Convert a boolean
    case 'boolean':
      datatype = xsd.boolean;
      break;
    // Convert an integer or double
    case 'number':
      if (Number.isFinite(value))
        datatype = Number.isInteger(value) ? xsd.integer : xsd.double;
      else {
        datatype = xsd.double;
        if (!Number.isNaN(value))
          value = value > 0 ? 'INF' : '-INF';
      }
      break;
    // No datatype, so convert a plain string
    default:
      return new Literal('"' + value + '"');
    }
  }
  return new Literal('"' + value + '"^^' + datatype);
}

// ### Creates a variable
function variable(name) {
  return new Variable(name);
}

// ### Returns the default graph
function defaultGraph() {
  return DEFAULTGRAPH;
}

// ### Creates a quad
function quad(subject, predicate, object, graph) {
  return new Quad(subject, predicate, object, graph);
}


// ## Module exports
module.exports = DataFactory = {
  // ### Public factory functions
  namedNode: namedNode,
  blankNode: blankNode,
  variable:  variable,
  literal:   literal,
  defaultGraph: defaultGraph,
  quad:      quad,
  triple:    quad,

  // ### Internal datatype constructors
  internal: {
    Term:      Term,
    NamedNode: NamedNode,
    BlankNode: BlankNode,
    Variable:  Variable,
    Literal:   Literal,
    DefaultGraph: DefaultGraph,
    Quad:      Quad,
    Triple:    Quad,
    fromId:    fromId,
    toId:      toId,
  },
};

},{"./IRIs":7}],9:[function(require,module,exports){
(function (setImmediate){
// **N3Lexer** tokenizes N3 documents.
var xsd = require('./IRIs').xsd;

var fromCharCode = String.fromCharCode;
var immediately = typeof setImmediate === 'function' ? setImmediate :
                  function setImmediate(func) { setTimeout(func, 0); };

// Regular expression and replacement string to escape N3 strings.
// Note how we catch invalid unicode sequences separately (they will trigger an error).
var escapeSequence = /\\u([a-fA-F0-9]{4})|\\U([a-fA-F0-9]{8})|\\[uU]|\\(.)/g;
var escapeReplacements = {
  '\\': '\\', "'": "'", '"': '"',
  'n': '\n', 'r': '\r', 't': '\t', 'f': '\f', 'b': '\b',
  '_': '_', '~': '~', '.': '.', '-': '-', '!': '!', '$': '$', '&': '&',
  '(': '(', ')': ')', '*': '*', '+': '+', ',': ',', ';': ';', '=': '=',
  '/': '/', '?': '?', '#': '#', '@': '@', '%': '%',
};
var illegalIriChars = /[\x00-\x20<>\\"\{\}\|\^\`]/;

// ## Constructor
function N3Lexer(options) {
  if (!(this instanceof N3Lexer))
    return new N3Lexer(options);
  options = options || {};

  // In line mode (N-Triples or N-Quads), only simple features may be parsed
  if (options.lineMode) {
    // Don't tokenize special literals
    this._tripleQuotedString = this._number = this._boolean = /$0^/;
    // Swap the tokenize method for a restricted version
    var self = this;
    this._tokenize = this.tokenize;
    this.tokenize = function (input, callback) {
      this._tokenize(input, function (error, token) {
        if (!error && /^(?:IRI|blank|literal|langcode|typeIRI|\.|eof)$/.test(token.type))
          callback && callback(error, token);
        else
          callback && callback(error || self._syntaxError(token.type, callback = null));
      });
    };
  }
  // Enable N3 functionality by default
  this._n3Mode = options.n3 !== false;
  // Disable comment tokens by default
  this._comments = !!options.comments;
}

N3Lexer.prototype = {
  // ## Regular expressions
  // It's slightly faster to have these as properties than as in-scope variables

  _iri: /^<((?:[^ <>{}\\]|\\[uU])+)>[ \t]*/, // IRI with escape sequences; needs sanity check after unescaping
  _unescapedIri: /^<([^\x00-\x20<>\\"\{\}\|\^\`]*)>[ \t]*/, // IRI without escape sequences; no unescaping
  _unescapedString: /^"([^"\\\r\n]+)"/, // non-empty string without escape sequences
  _singleQuotedString: /^"((?:[^"\\\r\n]|\\.)*)"(?=[^"])|^'((?:[^'\\\r\n]|\\.)*)'(?=[^'])/,
  _tripleQuotedString: /^"""([^"\\]*(?:(?:\\.|"(?!""))[^"\\]*)*)"""|^'''([^'\\]*(?:(?:\\.|'(?!''))[^'\\]*)*)'''/,
  _langcode: /^@([a-z]+(?:-[a-z0-9]+)*)(?=[^a-z0-9\-])/i,
  _prefix: /^((?:[A-Za-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:\.?[\-0-9A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)?:(?=[#\s<])/,
  _prefixed: /^((?:[A-Za-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:\.?[\-0-9A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)?:((?:(?:[0-:A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~])(?:(?:[\.\-0-:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~])*(?:[\-0-:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~]))?)?)(?:[ \t]+|(?=\.?[,;!\^\s#()\[\]\{\}"'<]))/,
  _variable: /^\?(?:(?:[A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:[\-0-:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)(?=[.,;!\^\s#()\[\]\{\}"'<])/,
  _blank: /^_:((?:[0-9A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:\.?[\-0-9A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)(?:[ \t]+|(?=\.?[,;:\s#()\[\]\{\}"'<]))/,
  _number: /^[\-+]?(?:\d+\.?\d*([eE](?:[\-\+])?\d+)|\d*\.?\d+)(?=\.?[,;:\s#()\[\]\{\}"'<])/,
  _boolean: /^(?:true|false)(?=[.,;\s#()\[\]\{\}"'<])/,
  _keyword: /^@[a-z]+(?=[\s#<:])/i,
  _sparqlKeyword: /^(?:PREFIX|BASE|GRAPH)(?=[\s#<])/i,
  _shortPredicates: /^a(?=\s+|<)/,
  _newline: /^[ \t]*(?:#[^\n\r]*)?(?:\r\n|\n|\r)[ \t]*/,
  _comment: /#([^\n\r]*)/,
  _whitespace: /^[ \t]+/,
  _endOfFile: /^(?:#[^\n\r]*)?$/,

  // ## Private methods

  // ### `_tokenizeToEnd` tokenizes as for as possible, emitting tokens through the callback
  _tokenizeToEnd: function (callback, inputFinished) {
    // Continue parsing as far as possible; the loop will return eventually
    var input = this._input, outputComments = this._comments;
    while (true) {
      // Count and skip whitespace lines
      var whiteSpaceMatch, comment;
      while (whiteSpaceMatch = this._newline.exec(input)) {
        // Try to find a comment
        if (outputComments && (comment = this._comment.exec(whiteSpaceMatch[0])))
          callback(null, { line: this._line, type: 'comment', value: comment[1], prefix: '' });
        // Advance the input
        input = input.substr(whiteSpaceMatch[0].length, input.length);
        this._line++;
      }
      // Skip whitespace on current line
      if (whiteSpaceMatch = this._whitespace.exec(input))
        input = input.substr(whiteSpaceMatch[0].length, input.length);

      // Stop for now if we're at the end
      if (this._endOfFile.test(input)) {
        // If the input is finished, emit EOF
        if (inputFinished) {
          // Try to find a final comment
          if (outputComments && (comment = this._comment.exec(input)))
            callback(null, { line: this._line, type: 'comment', value: comment[1], prefix: '' });
          callback(input = null, { line: this._line, type: 'eof', value: '', prefix: '' });
        }
        return this._input = input;
      }

      // Look for specific token types based on the first character
      var line = this._line, type = '', value = '', prefix = '',
          firstChar = input[0], match = null, matchLength = 0, inconclusive = false;
      switch (firstChar) {
      case '^':
        // We need at least 3 tokens lookahead to distinguish ^^<IRI> and ^^pre:fixed
        if (input.length < 3)
          break;
        // Try to match a type
        else if (input[1] === '^') {
          this._previousMarker = '^^';
          // Move to type IRI or prefixed name
          input = input.substr(2);
          if (input[0] !== '<') {
            inconclusive = true;
            break;
          }
        }
        // If no type, it must be a path expression
        else {
          if (this._n3Mode) {
            matchLength = 1;
            type = '^';
          }
          break;
        }
        // Fall through in case the type is an IRI
      case '<':
        // Try to find a full IRI without escape sequences
        if (match = this._unescapedIri.exec(input))
          type = 'IRI', value = match[1];
        // Try to find a full IRI with escape sequences
        else if (match = this._iri.exec(input)) {
          value = this._unescape(match[1]);
          if (value === null || illegalIriChars.test(value))
            return reportSyntaxError(this);
          type = 'IRI';
        }
        // Try to find a backwards implication arrow
        else if (this._n3Mode && input.length > 1 && input[1] === '=')
          type = 'inverse', matchLength = 2, value = '>';
        break;

      case '_':
        // Try to find a blank node. Since it can contain (but not end with) a dot,
        // we always need a non-dot character before deciding it is a blank node.
        // Therefore, try inserting a space if we're at the end of the input.
        if ((match = this._blank.exec(input)) ||
            inputFinished && (match = this._blank.exec(input + ' ')))
          type = 'blank', prefix = '_', value = match[1];
        break;

      case '"':
      case "'":
        // Try to find a non-empty double-quoted literal without escape sequences
        if (match = this._unescapedString.exec(input))
          value = match[1];
        // Try to find any other literal wrapped in a pair of single or double quotes
        else if (match = this._singleQuotedString.exec(input))
          value = this._unescape(typeof match[1] === 'string' ? match[1] : match[2]);
        // Try to find a literal wrapped in three pairs of single or double quotes
        else if (match = this._tripleQuotedString.exec(input)) {
          value = typeof match[1] === 'string' ? match[1] : match[2];
          // Advance line counter
          this._line += value.split(/\r\n|\r|\n/).length - 1;
          value = this._unescape(value);
        }
        if (value === null)
          return reportSyntaxError(this);
        if (match !== null)
          type = 'literal';
        break;

      case '?':
        // Try to find a variable
        if (this._n3Mode && (match = this._variable.exec(input)))
          type = 'var', value = match[0];
        break;

      case '@':
        // Try to find a language code
        if (this._previousMarker === 'literal' && (match = this._langcode.exec(input)))
          type = 'langcode', value = match[1];
        // Try to find a keyword
        else if (match = this._keyword.exec(input))
          type = match[0];
        break;

      case '.':
        // Try to find a dot as punctuation
        if (input.length === 1 ? inputFinished : (input[1] < '0' || input[1] > '9')) {
          type = '.';
          matchLength = 1;
          break;
        }
        // Fall through to numerical case (could be a decimal dot)

      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '+':
      case '-':
        // Try to find a number. Since it can contain (but not end with) a dot,
        // we always need a non-dot character before deciding it is a number.
        // Therefore, try inserting a space if we're at the end of the input.
        if (match = this._number.exec(input) ||
            inputFinished && (match = this._number.exec(input + ' '))) {
          type = 'literal', value = match[0];
          prefix = (match[1] ? xsd.double :
                    (/^[+\-]?\d+$/.test(match[0]) ? xsd.integer : xsd.decimal));
        }
        break;

      case 'B':
      case 'b':
      case 'p':
      case 'P':
      case 'G':
      case 'g':
        // Try to find a SPARQL-style keyword
        if (match = this._sparqlKeyword.exec(input))
          type = match[0].toUpperCase();
        else
          inconclusive = true;
        break;

      case 'f':
      case 't':
        // Try to match a boolean
        if (match = this._boolean.exec(input))
          type = 'literal', value = match[0], prefix = xsd.boolean;
        else
          inconclusive = true;
        break;

      case 'a':
        // Try to find an abbreviated predicate
        if (match = this._shortPredicates.exec(input))
          type = 'abbreviation', value = 'a';
        else
          inconclusive = true;
        break;

      case '=':
        // Try to find an implication arrow or equals sign
        if (this._n3Mode && input.length > 1) {
          type = 'abbreviation';
          if (input[1] !== '>')
            matchLength = 1, value = '=';
          else
            matchLength = 2, value = '>';
        }
        break;

      case '!':
        if (!this._n3Mode)
          break;
      case ',':
      case ';':
      case '[':
      case ']':
      case '(':
      case ')':
      case '{':
      case '}':
        // The next token is punctuation
        matchLength = 1;
        type = firstChar;
        break;

      default:
        inconclusive = true;
      }

      // Some first characters do not allow an immediate decision, so inspect more
      if (inconclusive) {
        // Try to find a prefix
        if ((this._previousMarker === '@prefix' || this._previousMarker === 'PREFIX') &&
            (match = this._prefix.exec(input)))
          type = 'prefix', value = match[1] || '';
        // Try to find a prefixed name. Since it can contain (but not end with) a dot,
        // we always need a non-dot character before deciding it is a prefixed name.
        // Therefore, try inserting a space if we're at the end of the input.
        else if ((match = this._prefixed.exec(input)) ||
                 inputFinished && (match = this._prefixed.exec(input + ' ')))
          type = 'prefixed', prefix = match[1] || '', value = this._unescape(match[2]);
      }

      // A type token is special: it can only be emitted after an IRI or prefixed name is read
      if (this._previousMarker === '^^') {
        switch (type) {
        case 'prefixed': type = 'type';    break;
        case 'IRI':      type = 'typeIRI'; break;
        default:         type = '';
        }
      }

      // What if nothing of the above was found?
      if (!type) {
        // We could be in streaming mode, and then we just wait for more input to arrive.
        // Otherwise, a syntax error has occurred in the input.
        // One exception: error on an unaccounted linebreak (= not inside a triple-quoted literal).
        if (inputFinished || (!/^'''|^"""/.test(input) && /\n|\r/.test(input)))
          return reportSyntaxError(this);
        else
          return this._input = input;
      }

      // Emit the parsed token
      var token = { line: line, type: type, value: value, prefix: prefix };
      callback(null, token);
      this.previousToken = token;
      this._previousMarker = type;
      // Advance to next part to tokenize
      input = input.substr(matchLength || match[0].length, input.length);
    }

    // Signals the syntax error through the callback
    function reportSyntaxError(self) { callback(self._syntaxError(/^\S*/.exec(input)[0])); }
  },

  // ### `_unescape` replaces N3 escape codes by their corresponding characters
  _unescape: function (item) {
    try {
      return item.replace(escapeSequence, function (sequence, unicode4, unicode8, escapedChar) {
        var charCode;
        if (unicode4) {
          charCode = parseInt(unicode4, 16);
          if (isNaN(charCode)) throw new Error(); // can never happen (regex), but helps performance
          return fromCharCode(charCode);
        }
        else if (unicode8) {
          charCode = parseInt(unicode8, 16);
          if (isNaN(charCode)) throw new Error(); // can never happen (regex), but helps performance
          if (charCode <= 0xFFFF) return fromCharCode(charCode);
          return fromCharCode(0xD800 + ((charCode -= 0x10000) / 0x400), 0xDC00 + (charCode & 0x3FF));
        }
        else {
          var replacement = escapeReplacements[escapedChar];
          if (!replacement)
            throw new Error();
          return replacement;
        }
      });
    }
    catch (error) { return null; }
  },

  // ### `_syntaxError` creates a syntax error for the given issue
  _syntaxError: function (issue) {
    this._input = null;
    var err = new Error('Unexpected "' + issue + '" on line ' + this._line + '.');
    err.context = {
      token: undefined,
      line: this._line,
      previousToken: this.previousToken,
    };
    return err;
  },


  // ## Public methods

  // ### `tokenize` starts the transformation of an N3 document into an array of tokens.
  // The input can be a string or a stream.
  tokenize: function (input, callback) {
    var self = this;
    this._line = 1;

    // If the input is a string, continuously emit tokens through the callback until the end
    if (typeof input === 'string') {
      this._input = input;
      // If a callback was passed, asynchronously call it
      if (typeof callback === 'function')
        immediately(function () { self._tokenizeToEnd(callback, true); });
      // If no callback was passed, tokenize synchronously and return
      else {
        var tokens = [], error;
        this._tokenizeToEnd(function (e, t) { e ? (error = e) : tokens.push(t); }, true);
        if (error) throw error;
        return tokens;
      }
    }
    // Otherwise, the input must be a stream
    else {
      this._input = '';
      if (typeof input.setEncoding === 'function')
        input.setEncoding('utf8');
      // Adds the data chunk to the buffer and parses as far as possible
      input.on('data', function (data) {
        if (self._input !== null) {
          self._input += data;
          self._tokenizeToEnd(callback, false);
        }
      });
      // Parses until the end
      input.on('end', function () {
        if (self._input !== null)
          self._tokenizeToEnd(callback, true);
      });
      input.on('error', callback);
    }
  },
};

// ## Exports
module.exports = N3Lexer;

}).call(this,require("timers").setImmediate)
},{"./IRIs":7,"timers":45}],10:[function(require,module,exports){
// **N3Parser** parses N3 documents.
var N3Lexer = require('./N3Lexer'),
    DataFactory = require('./N3DataFactory'),
    namespaces = require('./IRIs');

// Regexes for IRIs
var absoluteIRI = /^[a-z][a-z0-9+.-]*:/i,
    schemeAuthority = /^(?:([a-z][a-z0-9+.-]*:))?(?:\/\/[^\/]*)?/i,
    dotSegments = /(?:^|\/)\.\.?(?:$|[\/#?])/;

// The next ID for new blank nodes
var blankNodePrefix = 0, blankNodeCount = 0;

// ## Constructor
function N3Parser(options) {
  if (!(this instanceof N3Parser))
    return new N3Parser(options);
  this._contextStack = [];
  this._graph = null;

  // Set the document IRI
  options = options || {};
  this._setBase(options.baseIRI);
  options.factory && initDataFactory(this, options.factory);

  // Set supported features depending on the format
  var format = (typeof options.format === 'string') ?
               options.format.match(/\w*$/)[0].toLowerCase() : '',
      isTurtle = format === 'turtle', isTriG = format === 'trig',
      isNTriples = /triple/.test(format), isNQuads = /quad/.test(format),
      isN3 = this._n3Mode = /n3/.test(format),
      isLineMode = isNTriples || isNQuads;
  if (!(this._supportsNamedGraphs = !(isTurtle || isN3)))
    this._readPredicateOrNamedGraph = this._readPredicate;
  this._supportsQuads = !(isTurtle || isTriG || isNTriples || isN3);
  // Disable relative IRIs in N-Triples or N-Quads mode
  if (isLineMode) {
    this._base = '';
    this._resolveIRI = function (token) {
      this._error('Disallowed relative IRI', token);
      return this._callback = noop, this._subject = null;
    };
  }
  this._blankNodePrefix = typeof options.blankNodePrefix !== 'string' ? '' :
                            options.blankNodePrefix.replace(/^(?!_:)/, '_:');
  this._lexer = options.lexer || new N3Lexer({ lineMode: isLineMode, n3: isN3 });
  // Disable explicit quantifiers by default
  this._explicitQuantifiers = !!options.explicitQuantifiers;
}

// ## Private class methods

// ### `_resetBlankNodeIds` restarts blank node identification
N3Parser._resetBlankNodeIds = function () {
  blankNodePrefix = blankNodeCount = 0;
};

N3Parser.prototype = {
  // ## Private methods

  // ### `_blank` creates a new blank node
  _blank: function () {
    return this._blankNode('b' + blankNodeCount++);
  },

  // ### `_setBase` sets the base IRI to resolve relative IRIs
  _setBase: function (baseIRI) {
    if (!baseIRI)
      this._base = null;
    else {
      // Remove fragment if present
      var fragmentPos = baseIRI.indexOf('#');
      if (fragmentPos >= 0)
        baseIRI = baseIRI.substr(0, fragmentPos);
      // Set base IRI and its components
      this._base = baseIRI;
      this._basePath   = baseIRI.indexOf('/') < 0 ? baseIRI :
                         baseIRI.replace(/[^\/?]*(?:\?.*)?$/, '');
      baseIRI = baseIRI.match(schemeAuthority);
      this._baseRoot   = baseIRI[0];
      this._baseScheme = baseIRI[1];
    }
  },

  // ### `_saveContext` stores the current parsing context
  // when entering a new scope (list, blank node, formula)
  _saveContext: function (type, graph, subject, predicate, object) {
    var n3Mode = this._n3Mode;
    this._contextStack.push({
      subject: subject, predicate: predicate, object: object,
      graph: graph, type: type,
      inverse: n3Mode ? this._inversePredicate : false,
      blankPrefix: n3Mode ? this._prefixes._ : '',
      quantified: n3Mode ? this._quantified : null,
    });
    // The settings below only apply to N3 streams
    if (n3Mode) {
      // Every new scope resets the predicate direction
      this._inversePredicate = false;
      // In N3, blank nodes are scoped to a formula
      // (using a dot as separator, as a blank node label cannot start with it)
      this._prefixes._ = (this._graph ? this._graph.id.substr(2) + '.' : '.');
      // Quantifiers are scoped to a formula
      this._quantified = Object.create(this._quantified);
    }
  },

  // ### `_restoreContext` restores the parent context
  // when leaving a scope (list, blank node, formula)
  _restoreContext: function () {
    var context = this._contextStack.pop(), n3Mode = this._n3Mode;
    this._subject   = context.subject;
    this._predicate = context.predicate;
    this._object    = context.object;
    this._graph     = context.graph;
    // The settings below only apply to N3 streams
    if (n3Mode) {
      this._inversePredicate = context.inverse;
      this._prefixes._ = context.blankPrefix;
      this._quantified = context.quantified;
    }
  },

  // ### `_readInTopContext` reads a token when in the top context
  _readInTopContext: function (token) {
    switch (token.type) {
    // If an EOF token arrives in the top context, signal that we're done
    case 'eof':
      if (this._graph !== null)
        return this._error('Unclosed graph', token);
      delete this._prefixes._;
      return this._callback(null, null, this._prefixes);
    // It could be a prefix declaration
    case 'PREFIX':
      this._sparqlStyle = true;
    case '@prefix':
      return this._readPrefix;
    // It could be a base declaration
    case 'BASE':
      this._sparqlStyle = true;
    case '@base':
      return this._readBaseIRI;
    // It could be a graph
    case '{':
      if (this._supportsNamedGraphs) {
        this._graph = '';
        this._subject = null;
        return this._readSubject;
      }
    case 'GRAPH':
      if (this._supportsNamedGraphs)
        return this._readNamedGraphLabel;
    // Otherwise, the next token must be a subject
    default:
      return this._readSubject(token);
    }
  },

  // ### `_readEntity` reads an IRI, prefixed name, blank node, or variable
  _readEntity: function (token, quantifier) {
    var value;
    switch (token.type) {
    // Read a relative or absolute IRI
    case 'IRI':
    case 'typeIRI':
      value = this._namedNode(this._base === null || absoluteIRI.test(token.value) ?
                              token.value : this._resolveIRI(token));
      break;
    // Read a prefixed name
    case 'type':
    case 'prefixed':
      var prefix = this._prefixes[token.prefix];
      if (prefix === undefined)
        return this._error('Undefined prefix "' + token.prefix + ':"', token);
      value = this._namedNode(prefix + token.value);
      break;
    // Read a blank node
    case 'blank':
      value = this._blankNode(this._prefixes[token.prefix] + token.value);
      break;
    // Read a variable
    case 'var':
      value = this._variable(token.value.substr(1));
      break;
    // Everything else is not an entity
    default:
      return this._error('Expected entity but got ' + token.type, token);
    }
    // In N3 mode, replace the entity if it is quantified
    if (!quantifier && this._n3Mode && (value.id in this._quantified))
      value = this._quantified[value.id];
    return value;
  },

  // ### `_readSubject` reads a quad's subject
  _readSubject: function (token) {
    this._predicate = null;
    switch (token.type) {
    case '[':
      // Start a new quad with a new blank node as subject
      this._saveContext('blank', this._graph,
                        this._subject = this._blank(), null, null);
      return this._readBlankNodeHead;
    case '(':
      // Start a new list
      this._saveContext('list', this._graph, this.RDF_NIL, null, null);
      this._subject = null;
      return this._readListItem;
    case '{':
      // Start a new formula
      if (!this._n3Mode)
        return this._error('Unexpected graph', token);
      this._saveContext('formula', this._graph,
                        this._graph = this._blank(), null, null);
      return this._readSubject;
    case '}':
       // No subject; the graph in which we are reading is closed instead
      return this._readPunctuation(token);
    case '@forSome':
      if (!this._n3Mode)
        return this._error('Unexpected "@forSome"', token);
      this._subject = null;
      this._predicate = this.N3_FORSOME;
      this._quantifier = this._blankNode;
      return this._readQuantifierList;
    case '@forAll':
      if (!this._n3Mode)
        return this._error('Unexpected "@forAll"', token);
      this._subject = null;
      this._predicate = this.N3_FORALL;
      this._quantifier = this._variable;
      return this._readQuantifierList;
    default:
      // Read the subject entity
      if ((this._subject = this._readEntity(token)) === undefined)
        return;
      // In N3 mode, the subject might be a path
      if (this._n3Mode)
        return this._getPathReader(this._readPredicateOrNamedGraph);
    }

    // The next token must be a predicate,
    // or, if the subject was actually a graph IRI, a named graph
    return this._readPredicateOrNamedGraph;
  },

  // ### `_readPredicate` reads a quad's predicate
  _readPredicate: function (token) {
    var type = token.type;
    switch (type) {
    case 'inverse':
      this._inversePredicate = true;
    case 'abbreviation':
      this._predicate = this.ABBREVIATIONS[token.value];
      break;
    case '.':
    case ']':
    case '}':
      // Expected predicate didn't come, must have been trailing semicolon
      if (this._predicate === null)
        return this._error('Unexpected ' + type, token);
      this._subject = null;
      return type === ']' ? this._readBlankNodeTail(token) : this._readPunctuation(token);
    case ';':
      // Additional semicolons can be safely ignored
      return this._predicate !== null ? this._readPredicate :
             this._error('Expected predicate but got ;', token);
    case 'blank':
      if (!this._n3Mode)
        return this._error('Disallowed blank node as predicate', token);
    default:
      if ((this._predicate = this._readEntity(token)) === undefined)
        return;
    }
    // The next token must be an object
    return this._readObject;
  },

  // ### `_readObject` reads a quad's object
  _readObject: function (token) {
    switch (token.type) {
    case 'literal':
      // Regular literal, can still get a datatype or language
      if (token.prefix.length === 0) {
        this._literalValue = token.value;
        return this._readDataTypeOrLang;
      }
      // Pre-datatyped string literal (prefix stores the datatype)
      else
        this._object = this._literal(token.value, this._namedNode(token.prefix));
      break;
    case '[':
      // Start a new quad with a new blank node as subject
      this._saveContext('blank', this._graph, this._subject, this._predicate,
                        this._subject = this._blank());
      return this._readBlankNodeHead;
    case '(':
      // Start a new list
      this._saveContext('list', this._graph, this._subject, this._predicate, this.RDF_NIL);
      this._subject = null;
      return this._readListItem;
    case '{':
      // Start a new formula
      if (!this._n3Mode)
        return this._error('Unexpected graph', token);
      this._saveContext('formula', this._graph, this._subject, this._predicate,
                        this._graph = this._blank());
      return this._readSubject;
    default:
      // Read the object entity
      if ((this._object = this._readEntity(token)) === undefined)
        return;
      // In N3 mode, the object might be a path
      if (this._n3Mode)
        return this._getPathReader(this._getContextEndReader());
    }
    return this._getContextEndReader();
  },

  // ### `_readPredicateOrNamedGraph` reads a quad's predicate, or a named graph
  _readPredicateOrNamedGraph: function (token) {
    return token.type === '{' ? this._readGraph(token) : this._readPredicate(token);
  },

  // ### `_readGraph` reads a graph
  _readGraph: function (token) {
    if (token.type !== '{')
      return this._error('Expected graph but got ' + token.type, token);
    // The "subject" we read is actually the GRAPH's label
    this._graph = this._subject, this._subject = null;
    return this._readSubject;
  },

  // ### `_readBlankNodeHead` reads the head of a blank node
  _readBlankNodeHead: function (token) {
    if (token.type === ']') {
      this._subject = null;
      return this._readBlankNodeTail(token);
    }
    else {
      this._predicate = null;
      return this._readPredicate(token);
    }
  },

  // ### `_readBlankNodeTail` reads the end of a blank node
  _readBlankNodeTail: function (token) {
    if (token.type !== ']')
      return this._readBlankNodePunctuation(token);

    // Store blank node quad
    if (this._subject !== null)
      this._emit(this._subject, this._predicate, this._object, this._graph);

    // Restore the parent context containing this blank node
    var empty = this._predicate === null;
    this._restoreContext();
    // If the blank node was the subject, continue reading the predicate
    if (this._object === null)
      // If the blank node was empty, it could be a named graph label
      return empty ? this._readPredicateOrNamedGraph : this._readPredicateAfterBlank;
    // If the blank node was the object, restore previous context and read punctuation
    else
      return this._getContextEndReader();
  },

  // ### `_readPredicateAfterBlank` reads a predicate after an anonymous blank node
  _readPredicateAfterBlank: function (token) {
    // If a dot follows a blank node in top context, there is no predicate
    if (token.type === '.' && !this._contextStack.length) {
      this._subject = null; // cancel the current quad
      return this._readPunctuation(token);
    }
    return this._readPredicate(token);
  },

  // ### `_readListItem` reads items from a list
  _readListItem: function (token) {
    var item = null,                      // The item of the list
        list = null,                      // The list itself
        prevList = this._subject,         // The previous list that contains this list
        stack = this._contextStack,       // The stack of parent contexts
        parent = stack[stack.length - 1], // The parent containing the current list
        next = this._readListItem;        // The next function to execute

    switch (token.type) {
    case '[':
      // Stack the current list quad and start a new quad with a blank node as subject
      this._saveContext('blank', this._graph,
                        list = this._blank(), this.RDF_FIRST,
                        this._subject = item = this._blank());
      next = this._readBlankNodeHead;
      break;
    case '(':
      // Stack the current list quad and start a new list
      this._saveContext('list', this._graph,
                        list = this._blank(), this.RDF_FIRST, this.RDF_NIL);
      this._subject = null;
      break;
    case ')':
      // Closing the list; restore the parent context
      this._restoreContext();
      // If this list is contained within a parent list, return the membership quad here.
      // This will be `<parent list element> rdf:first <this list>.`.
      if (stack.length !== 0 && stack[stack.length - 1].type === 'list')
        this._emit(this._subject, this._predicate, this._object, this._graph);
      // Was this list the parent's subject?
      if (this._predicate === null) {
        // The next token is the predicate
        next = this._readPredicate;
        // No list tail if this was an empty list
        if (this._subject === this.RDF_NIL)
          return next;
      }
      // The list was in the parent context's object
      else {
        next = this._getContextEndReader();
        // No list tail if this was an empty list
        if (this._object === this.RDF_NIL)
          return next;
      }
      // Close the list by making the head nil
      list = this.RDF_NIL;
      break;
    case 'literal':
      // Regular literal, can still get a datatype or language
      if (token.prefix.length === 0) {
        this._literalValue = token.value;
        next = this._readListItemDataTypeOrLang;
      }
      // Pre-datatyped string literal (prefix stores the datatype)
      else {
        item = this._literal(token.value, this._namedNode(token.prefix));
        next = this._getContextEndReader();
      }
      break;
    default:
      if ((item = this._readEntity(token)) === undefined)
        return;
    }

     // Create a new blank node if no item head was assigned yet
    if (list === null)
      this._subject = list = this._blank();

    // Is this the first element of the list?
    if (prevList === null) {
      // This list is either the subject or the object of its parent
      if (parent.predicate === null)
        parent.subject = list;
      else
        parent.object = list;
    }
    else {
      // Continue the previous list with the current list
      this._emit(prevList, this.RDF_REST, list, this._graph);
    }
    // If an item was read, add it to the list
    if (item !== null) {
      // In N3 mode, the item might be a path
      if (this._n3Mode && (token.type === 'IRI' || token.type === 'prefixed')) {
        // Create a new context to add the item's path
        this._saveContext('item', this._graph, list, this.RDF_FIRST, item);
        this._subject = item, this._predicate = null;
        // _readPath will restore the context and output the item
        return this._getPathReader(this._readListItem);
      }
      // Output the item
      this._emit(list, this.RDF_FIRST, item, this._graph);
    }
    return next;
  },

  // ### `_readDataTypeOrLang` reads an _optional_ datatype or language
  _readDataTypeOrLang: function (token) {
    return this._completeLiteral(token, false);
  },

  // ### `_readListItemDataTypeOrLang` reads an _optional_ datatype or language in a list
  _readListItemDataTypeOrLang: function (token) {
    return this._completeLiteral(token, true);
  },

  // ### `_completeLiteral` completes a literal with an optional datatype or language
  _completeLiteral: function (token, listItem) {
    switch (token.type) {
    // Create a datatyped literal
    case 'type':
    case 'typeIRI':
      var datatype = this._readEntity(token);
      if (datatype === undefined) return; // No datatype means an error occurred
      this._object = this._literal(this._literalValue, datatype);
      token = null;
      break;
    // Create a language-tagged string
    case 'langcode':
      this._object = this._literal(this._literalValue, token.value);
      token = null;
      break;
    // Create a simple string literal
    default:
      this._object = this._literal(this._literalValue);
    }
    // If this literal was part of a list, write the item
    // (we could also check the context stack, but passing in a flag is faster)
    if (listItem)
      this._emit(this._subject, this.RDF_FIRST, this._object, this._graph);
    // If the token was consumed, continue with the rest of the input
    if (token === null)
      return this._getContextEndReader();
    // Otherwise, consume the token now
    else {
      this._readCallback = this._getContextEndReader();
      return this._readCallback(token);
    }
  },

  // ### `_readFormulaTail` reads the end of a formula
  _readFormulaTail: function (token) {
    if (token.type !== '}')
      return this._readPunctuation(token);

    // Store the last quad of the formula
    if (this._subject !== null)
      this._emit(this._subject, this._predicate, this._object, this._graph);

    // Restore the parent context containing this formula
    this._restoreContext();
    // If the formula was the subject, continue reading the predicate.
    // If the formula was the object, read punctuation.
    return this._object === null ? this._readPredicate : this._getContextEndReader();
  },

  // ### `_readPunctuation` reads punctuation between quads or quad parts
  _readPunctuation: function (token) {
    var next, subject = this._subject, graph = this._graph,
        inversePredicate = this._inversePredicate;
    switch (token.type) {
    // A closing brace ends a graph
    case '}':
      if (this._graph === null)
        return this._error('Unexpected graph closing', token);
      if (this._n3Mode)
        return this._readFormulaTail(token);
      this._graph = null;
    // A dot just ends the statement, without sharing anything with the next
    case '.':
      this._subject = null;
      next = this._contextStack.length ? this._readSubject : this._readInTopContext;
      if (inversePredicate) this._inversePredicate = false;
      break;
    // Semicolon means the subject is shared; predicate and object are different
    case ';':
      next = this._readPredicate;
      break;
    // Comma means both the subject and predicate are shared; the object is different
    case ',':
      next = this._readObject;
      break;
    default:
      // An entity means this is a quad (only allowed if not already inside a graph)
      if (this._supportsQuads && this._graph === null && (graph = this._readEntity(token)) !== undefined) {
        next = this._readQuadPunctuation;
        break;
      }
      return this._error('Expected punctuation to follow "' + this._object.id + '"', token);
    }
    // A quad has been completed now, so return it
    if (subject !== null) {
      var predicate = this._predicate, object = this._object;
      if (!inversePredicate)
        this._emit(subject, predicate, object,  graph);
      else
        this._emit(object,  predicate, subject, graph);
    }
    return next;
  },

    // ### `_readBlankNodePunctuation` reads punctuation in a blank node
  _readBlankNodePunctuation: function (token) {
    var next;
    switch (token.type) {
    // Semicolon means the subject is shared; predicate and object are different
    case ';':
      next = this._readPredicate;
      break;
    // Comma means both the subject and predicate are shared; the object is different
    case ',':
      next = this._readObject;
      break;
    default:
      return this._error('Expected punctuation to follow "' + this._object.id + '"', token);
    }
    // A quad has been completed now, so return it
    this._emit(this._subject, this._predicate, this._object, this._graph);
    return next;
  },

  // ### `_readQuadPunctuation` reads punctuation after a quad
  _readQuadPunctuation: function (token) {
    if (token.type !== '.')
      return this._error('Expected dot to follow quad', token);
    return this._readInTopContext;
  },

  // ### `_readPrefix` reads the prefix of a prefix declaration
  _readPrefix: function (token) {
    if (token.type !== 'prefix')
      return this._error('Expected prefix to follow @prefix', token);
    this._prefix = token.value;
    return this._readPrefixIRI;
  },

  // ### `_readPrefixIRI` reads the IRI of a prefix declaration
  _readPrefixIRI: function (token) {
    if (token.type !== 'IRI')
      return this._error('Expected IRI to follow prefix "' + this._prefix + ':"', token);
    var prefixNode = this._readEntity(token);
    this._prefixes[this._prefix] = prefixNode.value;
    this._prefixCallback(this._prefix, prefixNode);
    return this._readDeclarationPunctuation;
  },

  // ### `_readBaseIRI` reads the IRI of a base declaration
  _readBaseIRI: function (token) {
    if (token.type !== 'IRI')
      return this._error('Expected IRI to follow base declaration', token);
    this._setBase(this._base === null || absoluteIRI.test(token.value) ?
                  token.value : this._resolveIRI(token));
    return this._readDeclarationPunctuation;
  },

  // ### `_readNamedGraphLabel` reads the label of a named graph
  _readNamedGraphLabel: function (token) {
    switch (token.type) {
    case 'IRI':
    case 'blank':
    case 'prefixed':
      return this._readSubject(token), this._readGraph;
    case '[':
      return this._readNamedGraphBlankLabel;
    default:
      return this._error('Invalid graph label', token);
    }
  },

  // ### `_readNamedGraphLabel` reads a blank node label of a named graph
  _readNamedGraphBlankLabel: function (token) {
    if (token.type !== ']')
      return this._error('Invalid graph label', token);
    this._subject = this._blank();
    return this._readGraph;
  },

  // ### `_readDeclarationPunctuation` reads the punctuation of a declaration
  _readDeclarationPunctuation: function (token) {
    // SPARQL-style declarations don't have punctuation
    if (this._sparqlStyle) {
      this._sparqlStyle = false;
      return this._readInTopContext(token);
    }

    if (token.type !== '.')
      return this._error('Expected declaration to end with a dot', token);
    return this._readInTopContext;
  },

  // Reads a list of quantified symbols from a @forSome or @forAll statement
  _readQuantifierList: function (token) {
    var entity;
    switch (token.type) {
    case 'IRI':
    case 'prefixed':
      if ((entity = this._readEntity(token, true)) !== undefined)
        break;
    default:
      return this._error('Unexpected ' + token.type, token);
    }
    // Without explicit quantifiers, map entities to a quantified entity
    if (!this._explicitQuantifiers)
      this._quantified[entity.id] = this._quantifier('b' + blankNodeCount++);
    // With explicit quantifiers, output the reified quantifier
    else {
      // If this is the first item, start a new quantifier list
      if (this._subject === null)
        this._emit(this._graph || this.DEFAULTGRAPH, this._predicate,
                   this._subject = this._blank(), this.QUANTIFIERS_GRAPH);
      // Otherwise, continue the previous list
      else
        this._emit(this._subject, this.RDF_REST,
                   this._subject = this._blank(), this.QUANTIFIERS_GRAPH);
      // Output the list item
      this._emit(this._subject, this.RDF_FIRST, entity, this.QUANTIFIERS_GRAPH);
    }
    return this._readQuantifierPunctuation;
  },

  // Reads punctuation from a @forSome or @forAll statement
  _readQuantifierPunctuation: function (token) {
    // Read more quantifiers
    if (token.type === ',')
      return this._readQuantifierList;
    // End of the quantifier list
    else {
      // With explicit quantifiers, close the quantifier list
      if (this._explicitQuantifiers) {
        this._emit(this._subject, this.RDF_REST, this.RDF_NIL, this.QUANTIFIERS_GRAPH);
        this._subject = null;
      }
      // Read a dot
      this._readCallback = this._getContextEndReader();
      return this._readCallback(token);
    }
  },

  // ### `_getPathReader` reads a potential path and then resumes with the given function
  _getPathReader: function (afterPath) {
    this._afterPath = afterPath;
    return this._readPath;
  },

  // ### `_readPath` reads a potential path
  _readPath: function (token) {
    switch (token.type) {
    // Forward path
    case '!': return this._readForwardPath;
    // Backward path
    case '^': return this._readBackwardPath;
    // Not a path; resume reading where we left off
    default:
      var stack = this._contextStack, parent = stack.length && stack[stack.length - 1];
      // If we were reading a list item, we still need to output it
      if (parent && parent.type === 'item') {
        // The list item is the remaining subejct after reading the path
        var item = this._subject;
        // Switch back to the context of the list
        this._restoreContext();
        // Output the list item
        this._emit(this._subject, this.RDF_FIRST, item, this._graph);
      }
      return this._afterPath(token);
    }
  },

  // ### `_readForwardPath` reads a '!' path
  _readForwardPath: function (token) {
    var subject, predicate, object = this._blank();
    // The next token is the predicate
    if ((predicate = this._readEntity(token)) === undefined)
      return;
    // If we were reading a subject, replace the subject by the path's object
    if (this._predicate === null)
      subject = this._subject, this._subject = object;
    // If we were reading an object, replace the subject by the path's object
    else
      subject = this._object,  this._object  = object;
    // Emit the path's current quad and read its next section
    this._emit(subject, predicate, object, this._graph);
    return this._readPath;
  },

  // ### `_readBackwardPath` reads a '^' path
  _readBackwardPath: function (token) {
    var subject = this._blank(), predicate, object;
    // The next token is the predicate
    if ((predicate = this._readEntity(token)) === undefined)
      return;
    // If we were reading a subject, replace the subject by the path's subject
    if (this._predicate === null)
      object = this._subject, this._subject = subject;
    // If we were reading an object, replace the subject by the path's subject
    else
      object = this._object,  this._object  = subject;
    // Emit the path's current quad and read its next section
    this._emit(subject, predicate, object, this._graph);
    return this._readPath;
  },

  // ### `_getContextEndReader` gets the next reader function at the end of a context
  _getContextEndReader: function () {
    var contextStack = this._contextStack;
    if (!contextStack.length)
      return this._readPunctuation;

    switch (contextStack[contextStack.length - 1].type) {
    case 'blank':
      return this._readBlankNodeTail;
    case 'list':
      return this._readListItem;
    case 'formula':
      return this._readFormulaTail;
    }
  },

  // ### `_emit` sends a quad through the callback
  _emit: function (subject, predicate, object, graph) {
    this._callback(null, this._quad(subject, predicate, object, graph || this.DEFAULTGRAPH));
  },

  // ### `_error` emits an error message through the callback
  _error: function (message, token) {
    var err = new Error(message + ' on line ' + token.line + '.');
    err.context = {
      token: token,
      line: token.line,
      previousToken: this._lexer.previousToken,
    };
    this._callback(err);
    this._callback = noop;
  },

  // ### `_resolveIRI` resolves a relative IRI token against the base path,
  // assuming that a base path has been set and that the IRI is indeed relative
  _resolveIRI: function (token) {
    var iri = token.value;
    switch (iri[0]) {
    // An empty relative IRI indicates the base IRI
    case undefined: return this._base;
    // Resolve relative fragment IRIs against the base IRI
    case '#': return this._base + iri;
    // Resolve relative query string IRIs by replacing the query string
    case '?': return this._base.replace(/(?:\?.*)?$/, iri);
    // Resolve root-relative IRIs at the root of the base IRI
    case '/':
      // Resolve scheme-relative IRIs to the scheme
      return (iri[1] === '/' ? this._baseScheme : this._baseRoot) + this._removeDotSegments(iri);
    // Resolve all other IRIs at the base IRI's path
    default:
      return this._removeDotSegments(this._basePath + iri);
    }
  },

  // ### `_removeDotSegments` resolves './' and '../' path segments in an IRI as per RFC3986
  _removeDotSegments: function (iri) {
    // Don't modify the IRI if it does not contain any dot segments
    if (!dotSegments.test(iri))
      return iri;

    // Start with an imaginary slash before the IRI in order to resolve trailing './' and '../'
    var result = '', length = iri.length, i = -1, pathStart = -1, segmentStart = 0, next = '/';

    while (i < length) {
      switch (next) {
      // The path starts with the first slash after the authority
      case ':':
        if (pathStart < 0) {
          // Skip two slashes before the authority
          if (iri[++i] === '/' && iri[++i] === '/')
            // Skip to slash after the authority
            while ((pathStart = i + 1) < length && iri[pathStart] !== '/')
              i = pathStart;
        }
        break;
      // Don't modify a query string or fragment
      case '?':
      case '#':
        i = length;
        break;
      // Handle '/.' or '/..' path segments
      case '/':
        if (iri[i + 1] === '.') {
          next = iri[++i + 1];
          switch (next) {
          // Remove a '/.' segment
          case '/':
            result += iri.substring(segmentStart, i - 1);
            segmentStart = i + 1;
            break;
          // Remove a trailing '/.' segment
          case undefined:
          case '?':
          case '#':
            return result + iri.substring(segmentStart, i) + iri.substr(i + 1);
          // Remove a '/..' segment
          case '.':
            next = iri[++i + 1];
            if (next === undefined || next === '/' || next === '?' || next === '#') {
              result += iri.substring(segmentStart, i - 2);
              // Try to remove the parent path from result
              if ((segmentStart = result.lastIndexOf('/')) >= pathStart)
                result = result.substr(0, segmentStart);
              // Remove a trailing '/..' segment
              if (next !== '/')
                return result + '/' + iri.substr(i + 1);
              segmentStart = i + 1;
            }
          }
        }
      }
      next = iri[++i];
    }
    return result + iri.substring(segmentStart);
  },

  // ## Public methods

  // ### `parse` parses the N3 input and emits each parsed quad through the callback
  parse: function (input, quadCallback, prefixCallback) {
    var self = this;
    // The read callback is the next function to be executed when a token arrives.
    // We start reading in the top context.
    this._readCallback = this._readInTopContext;
    this._sparqlStyle = false;
    this._prefixes = Object.create(null);
    this._prefixes._ = this._blankNodePrefix ? this._blankNodePrefix.substr(2)
                                             : 'b' + blankNodePrefix++ + '_';
    this._prefixCallback = prefixCallback || noop;
    this._inversePredicate = false;
    this._quantified = Object.create(null);

    // Parse synchronously if no quad callback is given
    if (!quadCallback) {
      var quads = [], error;
      this._callback = function (e, t) { e ? (error = e) : t && quads.push(t); };
      this._lexer.tokenize(input).every(function (token) {
        return self._readCallback = self._readCallback(token);
      });
      if (error) throw error;
      return quads;
    }

    // Parse asynchronously otherwise, executing the read callback when a token arrives
    this._callback = quadCallback;
    this._lexer.tokenize(input, function (error, token) {
      if (error !== null)
        self._callback(error), self._callback = noop;
      else if (self._readCallback)
        self._readCallback = self._readCallback(token);
    });
  },
};

// The empty function
function noop() {}

// Initializes the parser with the given data factory
function initDataFactory(parser, factory) {
  // Set factory methods
  var namedNode = factory.namedNode;
  parser._namedNode   = namedNode;
  parser._blankNode   = factory.blankNode;
  parser._literal     = factory.literal;
  parser._variable    = factory.variable;
  parser._quad        = factory.quad;
  parser.DEFAULTGRAPH = factory.defaultGraph();

  // Set common named nodes
  parser.RDF_FIRST  = namedNode(namespaces.rdf.first);
  parser.RDF_REST   = namedNode(namespaces.rdf.rest);
  parser.RDF_NIL    = namedNode(namespaces.rdf.nil);
  parser.N3_FORALL  = namedNode(namespaces.r.forAll);
  parser.N3_FORSOME = namedNode(namespaces.r.forSome);
  parser.ABBREVIATIONS = {
    'a': namedNode(namespaces.rdf.type),
    '=': namedNode(namespaces.owl.sameAs),
    '>': namedNode(namespaces.log.implies),
  };
  parser.QUANTIFIERS_GRAPH = namedNode('urn:n3:quantifiers');
}
initDataFactory(N3Parser.prototype, DataFactory);

// ## Exports
module.exports = N3Parser;

},{"./IRIs":7,"./N3DataFactory":8,"./N3Lexer":9}],11:[function(require,module,exports){
// **N3Store** objects store N3 quads by graph in memory.

var DataFactory = require('./N3DataFactory');
var toId = DataFactory.internal.toId,
    fromId = DataFactory.internal.fromId;

// ## Constructor
function N3Store(quads, options) {
  if (!(this instanceof N3Store))
    return new N3Store(quads, options);

  // The number of quads is initially zero
  this._size = 0;
  // `_graphs` contains subject, predicate, and object indexes per graph
  this._graphs = Object.create(null);
  // `_ids` maps entities such as `http://xmlns.com/foaf/0.1/name` to numbers,
  // saving memory by using only numbers as keys in `_graphs`
  this._id = 0;
  this._ids = Object.create(null);
  this._ids['><'] = 0; // dummy entry, so the first actual key is non-zero
  this._entities = Object.create(null); // inverse of `_ids`
  // `_blankNodeIndex` is the index of the last automatically named blank node
  this._blankNodeIndex = 0;

  // Shift parameters if `quads` is not given
  if (!options && quads && !quads[0])
    options = quads, quads = null;
  options = options || {};
  this._factory = options.factory || DataFactory;

  // Add quads if passed
  if (quads)
    this.addQuads(quads);
}

N3Store.prototype = {
  // ## Public properties

  // ### `size` returns the number of quads in the store
  get size() {
    // Return the quad count if if was cached
    var size = this._size;
    if (size !== null)
      return size;

    // Calculate the number of quads by counting to the deepest level
    size = 0;
    var graphs = this._graphs, subjects, subject;
    for (var graphKey in graphs)
      for (var subjectKey in (subjects = graphs[graphKey].subjects))
        for (var predicateKey in (subject = subjects[subjectKey]))
          size += Object.keys(subject[predicateKey]).length;
    return this._size = size;
  },

  // ## Private methods

  // ### `_addToIndex` adds a quad to a three-layered index.
  // Returns if the index has changed, if the entry did not already exist.
  _addToIndex: function (index0, key0, key1, key2) {
    // Create layers as necessary
    var index1 = index0[key0] || (index0[key0] = {});
    var index2 = index1[key1] || (index1[key1] = {});
    // Setting the key to _any_ value signals the presence of the quad
    var existed = key2 in index2;
    if (!existed)
      index2[key2] = null;
    return !existed;
  },

  // ### `_removeFromIndex` removes a quad from a three-layered index
  _removeFromIndex: function (index0, key0, key1, key2) {
    // Remove the quad from the index
    var index1 = index0[key0], index2 = index1[key1], key;
    delete index2[key2];

    // Remove intermediary index layers if they are empty
    for (key in index2) return;
    delete index1[key1];
    for (key in index1) return;
    delete index0[key0];
  },

  // ### `_findInIndex` finds a set of quads in a three-layered index.
  // The index base is `index0` and the keys at each level are `key0`, `key1`, and `key2`.
  // Any of these keys can be undefined, which is interpreted as a wildcard.
  // `name0`, `name1`, and `name2` are the names of the keys at each level,
  // used when reconstructing the resulting quad
  // (for instance: _subject_, _predicate_, and _object_).
  // Finally, `graph` will be the graph of the created quads.
  // If `callback` is given, each result is passed through it
  // and iteration halts when it returns truthy for any quad.
  // If instead `array` is given, each result is added to the array.
  _findInIndex: function (index0, key0, key1, key2, name0, name1, name2, graph, callback, array) {
    var tmp, index1, index2, varCount = !key0 + !key1 + !key2,
        // depending on the number of variables, keys or reverse index are faster
        entityKeys = varCount > 1 ? Object.keys(this._ids) : this._entities;

    // If a key is specified, use only that part of index 0.
    if (key0) (tmp = index0, index0 = {})[key0] = tmp[key0];
    for (var value0 in index0) {
      var entity0 = entityKeys[value0];

      if (index1 = index0[value0]) {
        // If a key is specified, use only that part of index 1.
        if (key1) (tmp = index1, index1 = {})[key1] = tmp[key1];
        for (var value1 in index1) {
          var entity1 = entityKeys[value1];

          if (index2 = index1[value1]) {
            // If a key is specified, use only that part of index 2, if it exists.
            var values = key2 ? (key2 in index2 ? [key2] : []) : Object.keys(index2);
            // Create quads for all items found in index 2.
            for (var l = 0; l < values.length; l++) {
              var parts = { subject: null, predicate: null, object: null };
              parts[name0] = fromId(entity0, this._factory);
              parts[name1] = fromId(entity1, this._factory);
              parts[name2] = fromId(entityKeys[values[l]], this._factory);
              var quad = this._factory.quad(
                parts.subject, parts.predicate, parts.object, fromId(graph, this._factory));
              if (array)
                array.push(quad);
              else if (callback(quad))
                return true;
            }
          }
        }
      }
    }
    return array;
  },

  // ### `_loop` executes the callback on all keys of index 0
  _loop: function (index0, callback) {
    for (var key0 in index0)
      callback(key0);
  },

  // ### `_loopByKey0` executes the callback on all keys of a certain entry in index 0
  _loopByKey0: function (index0, key0, callback) {
    var index1, key1;
    if (index1 = index0[key0]) {
      for (key1 in index1)
        callback(key1);
    }
  },

  // ### `_loopByKey1` executes the callback on given keys of all entries in index 0
  _loopByKey1: function (index0, key1, callback) {
    var key0, index1;
    for (key0 in index0) {
      index1 = index0[key0];
      if (index1[key1])
        callback(key0);
    }
  },

  // ### `_loopBy2Keys` executes the callback on given keys of certain entries in index 2
  _loopBy2Keys: function (index0, key0, key1, callback) {
    var index1, index2, key2;
    if ((index1 = index0[key0]) && (index2 = index1[key1])) {
      for (key2 in index2)
        callback(key2);
    }
  },

  // ### `_countInIndex` counts matching quads in a three-layered index.
  // The index base is `index0` and the keys at each level are `key0`, `key1`, and `key2`.
  // Any of these keys can be undefined, which is interpreted as a wildcard.
  _countInIndex: function (index0, key0, key1, key2) {
    var count = 0, tmp, index1, index2;

    // If a key is specified, count only that part of index 0
    if (key0) (tmp = index0, index0 = {})[key0] = tmp[key0];
    for (var value0 in index0) {
      if (index1 = index0[value0]) {
        // If a key is specified, count only that part of index 1
        if (key1) (tmp = index1, index1 = {})[key1] = tmp[key1];
        for (var value1 in index1) {
          if (index2 = index1[value1]) {
            // If a key is specified, count the quad if it exists
            if (key2) (key2 in index2) && count++;
            // Otherwise, count all quads
            else count += Object.keys(index2).length;
          }
        }
      }
    }
    return count;
  },

  // ### `_getGraphs` returns an array with the given graph,
  // or all graphs if the argument is null or undefined.
  _getGraphs: function (graph) {
    if (!isString(graph))
      return this._graphs;
    var graphs = {};
    graphs[graph] = this._graphs[graph];
    return graphs;
  },

  // ### `_uniqueEntities` returns a function that accepts an entity ID
  // and passes the corresponding entity to callback if it hasn't occurred before.
  _uniqueEntities: function (callback) {
    var uniqueIds = Object.create(null), entities = this._entities;
    return function (id) {
      if (!(id in uniqueIds)) {
        uniqueIds[id] = true;
        callback(fromId(entities[id]));
      }
    };
  },

  // ## Public methods

  // ### `addQuad` adds a new quad to the store.
  // Returns if the quad index has changed, if the quad did not already exist.
  addQuad: function (subject, predicate, object, graph) {
    // Shift arguments if a quad object is given instead of components
    if (!predicate)
      graph = subject.graph, object = subject.object,
        predicate = subject.predicate, subject = subject.subject;

    // Convert terms to internal string representation
    subject = toId(subject);
    predicate = toId(predicate);
    object = toId(object);
    graph = toId(graph);

    // Find the graph that will contain the triple
    var graphItem = this._graphs[graph];
    // Create the graph if it doesn't exist yet
    if (!graphItem) {
      graphItem = this._graphs[graph] = { subjects: {}, predicates: {}, objects: {} };
      // Freezing a graph helps subsequent `add` performance,
      // and properties will never be modified anyway
      Object.freeze(graphItem);
    }

    // Since entities can often be long IRIs, we avoid storing them in every index.
    // Instead, we have a separate index that maps entities to numbers,
    // which are then used as keys in the other indexes.
    var ids = this._ids;
    var entities = this._entities;
    subject   = ids[subject]   || (ids[entities[++this._id] = subject]   = this._id);
    predicate = ids[predicate] || (ids[entities[++this._id] = predicate] = this._id);
    object    = ids[object]    || (ids[entities[++this._id] = object]    = this._id);

    var changed = this._addToIndex(graphItem.subjects,   subject,   predicate, object);
    this._addToIndex(graphItem.predicates, predicate, object,    subject);
    this._addToIndex(graphItem.objects,    object,    subject,   predicate);

    // The cached quad count is now invalid
    this._size = null;
    return changed;
  },

  // ### `addQuads` adds multiple quads to the store
  addQuads: function (quads) {
    for (var i = 0; i < quads.length; i++)
      this.addQuad(quads[i]);
  },

  // ### `import` adds a stream of quads to the store
  import: function (stream) {
    var self = this;
    stream.on('data', function (quad) { self.addQuad(quad); });
    return stream;
  },

  // ### `removeQuad` removes a quad from the store if it exists
  removeQuad: function (subject, predicate, object, graph) {
    // Shift arguments if a quad object is given instead of components
    if (!predicate)
      graph = subject.graph, object = subject.object,
        predicate = subject.predicate, subject = subject.subject;

    // Convert terms to internal string representation
    subject = toId(subject);
    predicate = toId(predicate);
    object = toId(object);
    graph = toId(graph);

    // Find internal identifiers for all components
    // and verify the quad exists.
    var graphItem, ids = this._ids, graphs = this._graphs, subjects, predicates;
    if (!(subject    = ids[subject]) || !(predicate = ids[predicate]) ||
        !(object     = ids[object])  || !(graphItem = graphs[graph])  ||
        !(subjects   = graphItem.subjects[subject]) ||
        !(predicates = subjects[predicate]) ||
        !(object in predicates))
      return false;

    // Remove it from all indexes
    this._removeFromIndex(graphItem.subjects,   subject,   predicate, object);
    this._removeFromIndex(graphItem.predicates, predicate, object,    subject);
    this._removeFromIndex(graphItem.objects,    object,    subject,   predicate);
    if (this._size !== null) this._size--;

    // Remove the graph if it is empty
    for (subject in graphItem.subjects) return true;
    delete graphs[graph];
    return true;
  },

  // ### `removeQuads` removes multiple quads from the store
  removeQuads: function (quads) {
    for (var i = 0; i < quads.length; i++)
      this.removeQuad(quads[i]);
  },

  // ### `remove` removes a stream of quads from the store
  remove: function (stream) {
    var self = this;
    stream.on('data', function (quad) { self.removeQuad(quad); });
    return stream;
  },

  // ### `getQuads` returns an array of quads matching a pattern.
  // Setting any field to `undefined` or `null` indicates a wildcard.
  getQuads: function (subject, predicate, object, graph) {
    // Convert terms to internal string representation
    subject = subject && toId(subject);
    predicate = predicate && toId(predicate);
    object = object && toId(object);
    graph = graph && toId(graph);

    var quads = [], graphs = this._getGraphs(graph), content,
        ids = this._ids, subjectId, predicateId, objectId;

    // Translate IRIs to internal index keys.
    if (isString(subject)   && !(subjectId   = ids[subject])   ||
        isString(predicate) && !(predicateId = ids[predicate]) ||
        isString(object)    && !(objectId    = ids[object]))
      return quads;

    for (var graphId in graphs) {
      // Only if the specified graph contains triples, there can be results
      if (content = graphs[graphId]) {
        // Choose the optimal index, based on what fields are present
        if (subjectId) {
          if (objectId)
            // If subject and object are given, the object index will be the fastest
            this._findInIndex(content.objects, objectId, subjectId, predicateId,
                              'object', 'subject', 'predicate', graphId, null, quads);
          else
            // If only subject and possibly predicate are given, the subject index will be the fastest
            this._findInIndex(content.subjects, subjectId, predicateId, null,
                              'subject', 'predicate', 'object', graphId, null, quads);
        }
        else if (predicateId)
          // If only predicate and possibly object are given, the predicate index will be the fastest
          this._findInIndex(content.predicates, predicateId, objectId, null,
                            'predicate', 'object', 'subject', graphId, null, quads);
        else if (objectId)
          // If only object is given, the object index will be the fastest
          this._findInIndex(content.objects, objectId, null, null,
                            'object', 'subject', 'predicate', graphId, null, quads);
        else
          // If nothing is given, iterate subjects and predicates first
          this._findInIndex(content.subjects, null, null, null,
                            'subject', 'predicate', 'object', graphId, null, quads);
      }
    }
    return quads;
  },

  // ### `countQuads` returns the number of quads matching a pattern.
  // Setting any field to `undefined` or `null` indicates a wildcard.
  countQuads: function (subject, predicate, object, graph) {
    // Convert terms to internal string representation
    subject = subject && toId(subject);
    predicate = predicate && toId(predicate);
    object = object && toId(object);
    graph = graph && toId(graph);

    var count = 0, graphs = this._getGraphs(graph), content,
        ids = this._ids, subjectId, predicateId, objectId;

    // Translate IRIs to internal index keys.
    if (isString(subject)   && !(subjectId   = ids[subject])   ||
        isString(predicate) && !(predicateId = ids[predicate]) ||
        isString(object)    && !(objectId    = ids[object]))
      return 0;

    for (var graphId in graphs) {
      // Only if the specified graph contains triples, there can be results
      if (content = graphs[graphId]) {
        // Choose the optimal index, based on what fields are present
        if (subject) {
          if (object)
            // If subject and object are given, the object index will be the fastest
            count += this._countInIndex(content.objects, objectId, subjectId, predicateId);
          else
            // If only subject and possibly predicate are given, the subject index will be the fastest
            count += this._countInIndex(content.subjects, subjectId, predicateId, objectId);
        }
        else if (predicate) {
          // If only predicate and possibly object are given, the predicate index will be the fastest
          count += this._countInIndex(content.predicates, predicateId, objectId, subjectId);
        }
        else {
          // If only object is possibly given, the object index will be the fastest
          count += this._countInIndex(content.objects, objectId, subjectId, predicateId);
        }
      }
    }
    return count;
  },

  // ### `forEach` executes the callback on all quads.
  // Setting any field to `undefined` or `null` indicates a wildcard.
  forEach: function (callback, subject, predicate, object, graph) {
    this.some(function (quad) {
      callback(quad);
      return false;
    }, subject, predicate, object, graph);
  },

  // ### `every` executes the callback on all quads,
  // and returns `true` if it returns truthy for all them.
  // Setting any field to `undefined` or `null` indicates a wildcard.
  every: function (callback, subject, predicate, object, graph) {
    var some = false;
    var every = !this.some(function (quad) {
      some = true;
      return !callback(quad);
    }, subject, predicate, object, graph);
    return some && every;
  },

  // ### `some` executes the callback on all quads,
  // and returns `true` if it returns truthy for any of them.
  // Setting any field to `undefined` or `null` indicates a wildcard.
  some: function (callback, subject, predicate, object, graph) {
    // Convert terms to internal string representation
    subject = subject && toId(subject);
    predicate = predicate && toId(predicate);
    object = object && toId(object);
    graph = graph && toId(graph);

    var graphs = this._getGraphs(graph), content,
        ids = this._ids, subjectId, predicateId, objectId;

    // Translate IRIs to internal index keys.
    if (isString(subject)   && !(subjectId   = ids[subject])   ||
        isString(predicate) && !(predicateId = ids[predicate]) ||
        isString(object)    && !(objectId    = ids[object]))
      return false;

    for (var graphId in graphs) {
      // Only if the specified graph contains triples, there can be results
      if (content = graphs[graphId]) {
        // Choose the optimal index, based on what fields are present
        if (subjectId) {
          if (objectId) {
          // If subject and object are given, the object index will be the fastest
            if (this._findInIndex(content.objects, objectId, subjectId, predicateId,
                                  'object', 'subject', 'predicate', graphId, callback, null))
              return true;
          }
          else
            // If only subject and possibly predicate are given, the subject index will be the fastest
            if (this._findInIndex(content.subjects, subjectId, predicateId, null,
                                  'subject', 'predicate', 'object', graphId, callback, null))
              return true;
        }
        else if (predicateId) {
          // If only predicate and possibly object are given, the predicate index will be the fastest
          if (this._findInIndex(content.predicates, predicateId, objectId, null,
                                'predicate', 'object', 'subject', graphId, callback, null)) {
            return true;
          }
        }
        else if (objectId) {
          // If only object is given, the object index will be the fastest
          if (this._findInIndex(content.objects, objectId, null, null,
                                'object', 'subject', 'predicate', graphId, callback, null)) {
            return true;
          }
        }
        else
        // If nothing is given, iterate subjects and predicates first
        if (this._findInIndex(content.subjects, null, null, null,
                              'subject', 'predicate', 'object', graphId, callback, null)) {
          return true;
        }
      }
    }
    return false;
  },

  // ### `getSubjects` returns all subjects that match the pattern.
  // Setting any field to `undefined` or `null` indicates a wildcard.
  getSubjects: function (predicate, object, graph) {
    var results = [];
    this.forSubjects(function (s) { results.push(s); }, predicate, object, graph);
    return results;
  },

  // ### `forSubjects` executes the callback on all subjects that match the pattern.
  // Setting any field to `undefined` or `null` indicates a wildcard.
  forSubjects: function (callback, predicate, object, graph) {
    // Convert terms to internal string representation
    predicate = predicate && toId(predicate);
    object = object && toId(object);
    graph = graph && toId(graph);

    var ids = this._ids, graphs = this._getGraphs(graph), content, predicateId, objectId;
    callback = this._uniqueEntities(callback);

    // Translate IRIs to internal index keys.
    if (isString(predicate) && !(predicateId = ids[predicate]) ||
        isString(object)    && !(objectId    = ids[object]))
      return;

    for (graph in graphs) {
      // Only if the specified graph contains triples, there can be results
      if (content = graphs[graph]) {
        // Choose optimal index based on which fields are wildcards
        if (predicateId) {
          if (objectId)
            // If predicate and object are given, the POS index is best.
            this._loopBy2Keys(content.predicates, predicateId, objectId, callback);
          else
            // If only predicate is given, the SPO index is best.
            this._loopByKey1(content.subjects, predicateId, callback);
        }
        else if (objectId)
          // If only object is given, the OSP index is best.
          this._loopByKey0(content.objects, objectId, callback);
        else
          // If no params given, iterate all the subjects
          this._loop(content.subjects, callback);
      }
    }
  },

  // ### `getPredicates` returns all predicates that match the pattern.
  // Setting any field to `undefined` or `null` indicates a wildcard.
  getPredicates: function (subject, object, graph) {
    var results = [];
    this.forPredicates(function (p) { results.push(p); }, subject, object, graph);
    return results;
  },

  // ### `forPredicates` executes the callback on all predicates that match the pattern.
  // Setting any field to `undefined` or `null` indicates a wildcard.
  forPredicates: function (callback, subject, object, graph) {
    // Convert terms to internal string representation
    subject = subject && toId(subject);
    object = object && toId(object);
    graph = graph && toId(graph);

    var ids = this._ids, graphs = this._getGraphs(graph), content, subjectId, objectId;
    callback = this._uniqueEntities(callback);

    // Translate IRIs to internal index keys.
    if (isString(subject) && !(subjectId = ids[subject]) ||
        isString(object)  && !(objectId  = ids[object]))
      return;

    for (graph in graphs) {
      // Only if the specified graph contains triples, there can be results
      if (content = graphs[graph]) {
        // Choose optimal index based on which fields are wildcards
        if (subjectId) {
          if (objectId)
            // If subject and object are given, the OSP index is best.
            this._loopBy2Keys(content.objects, objectId, subjectId, callback);
          else
            // If only subject is given, the SPO index is best.
            this._loopByKey0(content.subjects, subjectId, callback);
        }
        else if (objectId)
          // If only object is given, the POS index is best.
          this._loopByKey1(content.predicates, objectId, callback);
        else
          // If no params given, iterate all the predicates.
          this._loop(content.predicates, callback);
      }
    }
  },

  // ### `getObjects` returns all objects that match the pattern.
  // Setting any field to `undefined` or `null` indicates a wildcard.
  getObjects: function (subject, predicate, graph) {
    var results = [];
    this.forObjects(function (o) { results.push(o); }, subject, predicate, graph);
    return results;
  },

  // ### `forObjects` executes the callback on all objects that match the pattern.
  // Setting any field to `undefined` or `null` indicates a wildcard.
  forObjects: function (callback, subject, predicate, graph) {
    // Convert terms to internal string representation
    subject = subject && toId(subject);
    predicate = predicate && toId(predicate);
    graph = graph && toId(graph);

    var ids = this._ids, graphs = this._getGraphs(graph), content, subjectId, predicateId;
    callback = this._uniqueEntities(callback);

    // Translate IRIs to internal index keys.
    if (isString(subject)   && !(subjectId   = ids[subject]) ||
        isString(predicate) && !(predicateId = ids[predicate]))
      return;

    for (graph in graphs) {
      // Only if the specified graph contains triples, there can be results
      if (content = graphs[graph]) {
        // Choose optimal index based on which fields are wildcards
        if (subjectId) {
          if (predicateId)
            // If subject and predicate are given, the SPO index is best.
            this._loopBy2Keys(content.subjects, subjectId, predicateId, callback);
          else
            // If only subject is given, the OSP index is best.
            this._loopByKey1(content.objects, subjectId, callback);
        }
        else if (predicateId)
          // If only predicate is given, the POS index is best.
          this._loopByKey0(content.predicates, predicateId, callback);
        else
          // If no params given, iterate all the objects.
          this._loop(content.objects, callback);
      }
    }
  },

  // ### `getGraphs` returns all graphs that match the pattern.
  // Setting any field to `undefined` or `null` indicates a wildcard.
  getGraphs: function (subject, predicate, object) {
    var results = [];
    this.forGraphs(function (g) { results.push(g); }, subject, predicate, object);
    return results;
  },

  // ### `forGraphs` executes the callback on all graphs that match the pattern.
  // Setting any field to `undefined` or `null` indicates a wildcard.
  forGraphs: function (callback, subject, predicate, object) {
    for (var graph in this._graphs) {
      this.some(function (quad) {
        callback(quad.graph);
        return true; // Halt iteration of some()
      }, subject, predicate, object, graph);
    }
  },

  // ### `createBlankNode` creates a new blank node, returning its name
  createBlankNode: function (suggestedName) {
    var name, index;
    // Generate a name based on the suggested name
    if (suggestedName) {
      name = suggestedName = '_:' + suggestedName, index = 1;
      while (this._ids[name])
        name = suggestedName + index++;
    }
    // Generate a generic blank node name
    else {
      do { name = '_:b' + this._blankNodeIndex++; }
      while (this._ids[name]);
    }
    // Add the blank node to the entities, avoiding the generation of duplicates
    this._ids[name] = ++this._id;
    this._entities[this._id] = name;
    return this._factory.blankNode(name.substr(2));
  },
};

// Determines whether the argument is a string
function isString(s) {
  return typeof s === 'string' || s instanceof String;
}

// ## Exports
module.exports = N3Store;

},{"./N3DataFactory":8}],12:[function(require,module,exports){
// **N3StreamParser** parses a text stream into a quad stream.
var Transform = require('stream').Transform,
    util = require('util'),
    N3Parser = require('./N3Parser.js');

// ## Constructor
function N3StreamParser(options) {
  if (!(this instanceof N3StreamParser))
    return new N3StreamParser(options);

  // Initialize Transform base class
  Transform.call(this, { decodeStrings: true });
  this._readableState.objectMode = true;

  // Set up parser
  var self = this, parser = new N3Parser(options), onData, onEnd;
  // Pass dummy stream to obtain `data` and `end` callbacks
  parser.parse({
    on: function (event, callback) {
      switch (event) {
      case 'data': onData = callback; break;
      case 'end':   onEnd = callback; break;
      }
    },
  },
  // Handle quads by pushing them down the pipeline
  function (error, quad) { error && self.emit('error', error) || quad && self.push(quad); },
  // Emit prefixes through the `prefix` event
  function (prefix, uri) { self.emit('prefix', prefix, uri); });

  // Implement Transform methods through parser callbacks
  this._transform = function (chunk, encoding, done) { onData(chunk); done(); };
  this._flush = function (done) { onEnd(); done(); };
}
util.inherits(N3StreamParser, Transform);

// ### Parses a stream of strings
N3StreamParser.prototype.import = function (stream) {
  var self = this;
  stream.on('data',  function (chunk) { self.write(chunk); });
  stream.on('end',   function ()      { self.end(); });
  stream.on('error', function (error) { self.emit('error', error); });
  return this;
};

// ## Exports
module.exports = N3StreamParser;

},{"./N3Parser.js":10,"stream":43,"util":48}],13:[function(require,module,exports){
// **N3StreamWriter** serializes a quad stream into a text stream.
var Transform = require('stream').Transform,
    util = require('util'),
    N3Writer = require('./N3Writer.js');

// ## Constructor
function N3StreamWriter(options) {
  if (!(this instanceof N3StreamWriter))
    return new N3StreamWriter(options);

  // Initialize Transform base class
  Transform.call(this, { encoding: 'utf8' });
  this._writableState.objectMode = true;

  // Set up writer with a dummy stream object
  var self = this;
  var writer = this._writer = new N3Writer({
    write: function (quad, encoding, callback) { self.push(quad); callback && callback(); },
    end: function (callback) { self.push(null); callback && callback(); },
  }, options);

  // Implement Transform methods on top of writer
  this._transform = function (quad, encoding, done) { writer.addQuad(quad, done); };
  this._flush = function (done) { writer.end(done); };
}
util.inherits(N3StreamWriter, Transform);

// ### Serializes a stream of quads
N3StreamWriter.prototype.import = function (stream) {
  var self = this;
  stream.on('data',   function (quad)  { self.write(quad); });
  stream.on('end',    function ()      { self.end(); });
  stream.on('error',  function (error) { self.emit('error', error); });
  stream.on('prefix', function (prefix, iri) { self._writer.addPrefix(prefix, iri); });
  return this;
};

// ## Exports
module.exports = N3StreamWriter;

},{"./N3Writer.js":15,"stream":43,"util":48}],14:[function(require,module,exports){
// **N3Util** provides N3 utility functions.

var DataFactory = require('./N3DataFactory');

var N3Util = {
  // Tests whether the given term represents an IRI
  isNamedNode: function (term) {
    return !!term && term.termType === 'NamedNode';
  },

  // Tests whether the given term represents a blank node
  isBlankNode: function (term) {
    return !!term && term.termType === 'BlankNode';
  },

  // Tests whether the given term represents a literal
  isLiteral: function (term) {
    return !!term && term.termType === 'Literal';
  },

  // Tests whether the given term represents a variable
  isVariable: function (term) {
    return !!term && term.termType === 'Variable';
  },

  // Tests whether the given term represents the default graph
  isDefaultGraph: function (term) {
    return !!term && term.termType === 'DefaultGraph';
  },

  // Tests whether the given quad is in the default graph
  inDefaultGraph: function (quad) {
    return N3Util.isDefaultGraph(quad.graph);
  },

  // Creates a function that prepends the given IRI to a local name
  prefix: function (iri, factory) {
    return N3Util.prefixes({ '': iri }, factory)('');
  },

  // Creates a function that allows registering and expanding prefixes
  prefixes: function (defaultPrefixes, factory) {
    // Add all of the default prefixes
    var prefixes = Object.create(null);
    for (var prefix in defaultPrefixes)
      processPrefix(prefix, defaultPrefixes[prefix]);
    // Set the default factory if none was specified
    factory = factory || DataFactory;

    // Registers a new prefix (if an IRI was specified)
    // or retrieves a function that expands an existing prefix (if no IRI was specified)
    function processPrefix(prefix, iri) {
      // Create a new prefix if an IRI is specified or the prefix doesn't exist
      if (typeof iri === 'string') {
        // Create a function that expands the prefix
        var cache = Object.create(null);
        prefixes[prefix] = function (local) {
          return cache[local] || (cache[local] = factory.namedNode(iri + local));
        };
      }
      else if (!(prefix in prefixes)) {
        throw new Error('Unknown prefix: ' + prefix);
      }
      return prefixes[prefix];
    }
    return processPrefix;
  },
};

// ## Exports
module.exports = N3Util;

},{"./N3DataFactory":8}],15:[function(require,module,exports){
// **N3Writer** writes N3 documents.

var namespaces = require('./IRIs'),
    DataFactory = require('./N3DataFactory');

var DEFAULTGRAPH = DataFactory.defaultGraph();

var rdf = namespaces.rdf,
    xsd = namespaces.xsd;

// Characters in literals that require escaping
var escape    = /["\\\t\n\r\b\f\u0000-\u0019\ud800-\udbff]/,
    escapeAll = /["\\\t\n\r\b\f\u0000-\u0019]|[\ud800-\udbff][\udc00-\udfff]/g,
    escapedCharacters = {
      '\\': '\\\\', '"': '\\"', '\t': '\\t',
      '\n': '\\n', '\r': '\\r', '\b': '\\b', '\f': '\\f',
    };

// ## Constructor
function N3Writer(outputStream, options) {
  if (!(this instanceof N3Writer))
    return new N3Writer(outputStream, options);

  // Shift arguments if the first argument is not a stream
  if (outputStream && typeof outputStream.write !== 'function')
    options = outputStream, outputStream = null;
  options = options || {};

  // If no output stream given, send the output as string through the end callback
  if (!outputStream) {
    var output = '';
    this._outputStream = {
      write: function (chunk, encoding, done) { output += chunk; done && done(); },
      end:   function (done) { done && done(null, output); },
    };
    this._endStream = true;
  }
  else {
    this._outputStream = outputStream;
    this._endStream = options.end === undefined ? true : !!options.end;
  }

  // Initialize writer, depending on the format
  this._subject = null;
  if (!(/triple|quad/i).test(options.format)) {
    this._graph = DEFAULTGRAPH;
    this._prefixIRIs = Object.create(null);
    options.prefixes && this.addPrefixes(options.prefixes);
  }
  else {
    this._writeQuad = this._writeQuadLine;
  }
}

N3Writer.prototype = {
  // ## Private methods

  // ### Whether the current graph is the default graph
  get _inDefaultGraph() {
    return DEFAULTGRAPH.equals(this._graph);
  },

  // ### `_write` writes the argument to the output stream
  _write: function (string, callback) {
    this._outputStream.write(string, 'utf8', callback);
  },

  // ### `_writeQuad` writes the quad to the output stream
  _writeQuad: function (subject, predicate, object, graph, done) {
    try {
      // Write the graph's label if it has changed
      if (!graph.equals(this._graph)) {
        // Close the previous graph and start the new one
        this._write((this._subject === null ? '' : (this._inDefaultGraph ? '.\n' : '\n}\n')) +
                    (DEFAULTGRAPH.equals(graph) ? '' : this._encodeIriOrBlank(graph) + ' {\n'));
        this._graph = graph;
        this._subject = null;
      }
      // Don't repeat the subject if it's the same
      if (subject.equals(this._subject)) {
        // Don't repeat the predicate if it's the same
        if (predicate.equals(this._predicate))
          this._write(', ' + this._encodeObject(object), done);
        // Same subject, different predicate
        else
          this._write(';\n    ' +
                      this._encodePredicate(this._predicate = predicate) + ' ' +
                      this._encodeObject(object), done);
      }
      // Different subject; write the whole quad
      else
        this._write((this._subject === null ? '' : '.\n') +
                    this._encodeIriOrBlank(this._subject = subject) + ' ' +
                    this._encodePredicate(this._predicate = predicate) + ' ' +
                    this._encodeObject(object), done);
    }
    catch (error) { done && done(error); }
  },

  // ### `_writeQuadLine` writes the quad to the output stream as a single line
  _writeQuadLine: function (subject, predicate, object, graph, done) {
    // Write the quad without prefixes
    delete this._prefixMatch;
    this._write(this.quadToString(subject, predicate, object, graph), done);
  },

  // ### `quadToString` serializes a quad as a string
  quadToString: function (subject, predicate, object, graph) {
    return  this._encodeIriOrBlank(subject)   + ' ' +
            this._encodeIriOrBlank(predicate) + ' ' +
            this._encodeObject(object) +
            (graph && graph.value ? ' ' + this._encodeIriOrBlank(graph) + '.\n' : '.\n');
  },

  // ### `quadsToString` serializes an array of quads as a string
  quadsToString: function (quads) {
    return quads.map(function (t) {
      return this.quadToString(t.subject, t.predicate, t.object, t.graph);
    }, this).join('');
  },

  // ### `_encodeIriOrBlank` represents an IRI or blank node
  _encodeIriOrBlank: function (entity) {
    // A blank node or list is represented as-is
    if (entity.termType !== 'NamedNode')
      return 'id' in entity ? entity.id : '_:' + entity.value;
    // Escape special characters
    var iri = entity.value;
    if (escape.test(iri))
      iri = iri.replace(escapeAll, characterReplacer);
    // Try to represent the IRI as prefixed name
    var prefixMatch = this._prefixRegex.exec(iri);
    return !prefixMatch ? '<' + iri + '>' :
           (!prefixMatch[1] ? iri : this._prefixIRIs[prefixMatch[1]] + prefixMatch[2]);
  },

  // ### `_encodeLiteral` represents a literal
  _encodeLiteral: function (literal) {
    // Escape special characters
    var value = literal.value;
    if (escape.test(value))
      value = value.replace(escapeAll, characterReplacer);
    // Write the literal, possibly with type or language
    if (literal.language)
      return '"' + value + '"@' + literal.language;
    else if (literal.datatype.value !== xsd.string)
      return '"' + value + '"^^' + this._encodeIriOrBlank(literal.datatype);
    else
      return '"' + value + '"';
  },

  // ### `_encodePredicate` represents a predicate
  _encodePredicate: function (predicate) {
    return predicate.value === rdf.type ? 'a' : this._encodeIriOrBlank(predicate);
  },

  // ### `_encodeObject` represents an object
  _encodeObject: function (object) {
    return object.termType === 'Literal' ? this._encodeLiteral(object) : this._encodeIriOrBlank(object);
  },

  // ### `_blockedWrite` replaces `_write` after the writer has been closed
  _blockedWrite: function () {
    throw new Error('Cannot write because the writer has been closed.');
  },

  // ### `addQuad` adds the quad to the output stream
  addQuad: function (subject, predicate, object, graph, done) {
    // The quad was given as an object, so shift parameters
    if (object === undefined)
      this._writeQuad(subject.subject, subject.predicate, subject.object, subject.graph, predicate);
    // The optional `graph` parameter was not provided
    else if (typeof graph === 'function')
      this._writeQuad(subject, predicate, object, DEFAULTGRAPH, graph);
    // The `graph` parameter was provided
    else
      this._writeQuad(subject, predicate, object, graph || DEFAULTGRAPH, done);
  },

  // ### `addQuads` adds the quads to the output stream
  addQuads: function (quads) {
    for (var i = 0; i < quads.length; i++)
      this.addQuad(quads[i]);
  },

  // ### `addPrefix` adds the prefix to the output stream
  addPrefix: function (prefix, iri, done) {
    var prefixes = {};
    prefixes[prefix] = iri;
    this.addPrefixes(prefixes, done);
  },

  // ### `addPrefixes` adds the prefixes to the output stream
  addPrefixes: function (prefixes, done) {
    // Add all useful prefixes
    var prefixIRIs = this._prefixIRIs, hasPrefixes = false;
    for (var prefix in prefixes) {
      // Verify whether the prefix can be used and does not exist yet
      var iri = prefixes[prefix];
      if (typeof iri !== 'string')
        iri = iri.value;
      if (/[#\/]$/.test(iri) && prefixIRIs[iri] !== (prefix += ':')) {
        hasPrefixes = true;
        prefixIRIs[iri] = prefix;
        // Finish a possible pending quad
        if (this._subject !== null) {
          this._write(this._inDefaultGraph ? '.\n' : '\n}\n');
          this._subject = null, this._graph = '';
        }
        // Write prefix
        this._write('@prefix ' + prefix + ' <' + iri + '>.\n');
      }
    }
    // Recreate the prefix matcher
    if (hasPrefixes) {
      var IRIlist = '', prefixList = '';
      for (var prefixIRI in prefixIRIs) {
        IRIlist += IRIlist ? '|' + prefixIRI : prefixIRI;
        prefixList += (prefixList ? '|' : '') + prefixIRIs[prefixIRI];
      }
      IRIlist = IRIlist.replace(/[\]\/\(\)\*\+\?\.\\\$]/g, '\\$&');
      this._prefixRegex = new RegExp('^(?:' + prefixList + ')[^\/]*$|' +
                                     '^(' + IRIlist + ')([a-zA-Z][\\-_a-zA-Z0-9]*)$');
    }
    // End a prefix block with a newline
    this._write(hasPrefixes ? '\n' : '', done);
  },

  // ### `blank` creates a blank node with the given content
  blank: function (predicate, object) {
    var children = predicate, child, length;
    // Empty blank node
    if (predicate === undefined)
      children = [];
    // Blank node passed as blank(Term("predicate"), Term("object"))
    else if (predicate.termType)
      children = [{ predicate: predicate, object: object }];
    // Blank node passed as blank({ predicate: predicate, object: object })
    else if (!('length' in predicate))
      children = [predicate];

    switch (length = children.length) {
    // Generate an empty blank node
    case 0:
      return new SerializedTerm('[]');
    // Generate a non-nested one-triple blank node
    case 1:
      child = children[0];
      if (!(child.object instanceof SerializedTerm))
        return new SerializedTerm('[ ' + this._encodePredicate(child.predicate) + ' ' +
                                  this._encodeObject(child.object) + ' ]');
    // Generate a multi-triple or nested blank node
    default:
      var contents = '[';
      // Write all triples in order
      for (var i = 0; i < length; i++) {
        child = children[i];
        // Write only the object is the predicate is the same as the previous
        if (child.predicate.equals(predicate))
          contents += ', ' + this._encodeObject(child.object);
        // Otherwise, write the predicate and the object
        else {
          contents += (i ? ';\n  ' : '\n  ') +
                      this._encodePredicate(child.predicate) + ' ' +
                      this._encodeObject(child.object);
          predicate = child.predicate;
        }
      }
      return new SerializedTerm(contents + '\n]');
    }
  },

  // ### `list` creates a list node with the given content
  list: function (elements) {
    var length = elements && elements.length || 0, contents = new Array(length);
    for (var i = 0; i < length; i++)
      contents[i] = this._encodeObject(elements[i]);
    return new SerializedTerm('(' + contents.join(' ') + ')');
  },

  // ### `_prefixRegex` matches a prefixed name or IRI that begins with one of the added prefixes
  _prefixRegex: /$0^/,

  // ### `end` signals the end of the output stream
  end: function (done) {
    // Finish a possible pending quad
    if (this._subject !== null) {
      this._write(this._inDefaultGraph ? '.\n' : '\n}\n');
      this._subject = null;
    }
    // Disallow further writing
    this._write = this._blockedWrite;

    // Try to end the underlying stream, ensuring done is called exactly one time
    var singleDone = done && function (error, result) { singleDone = null, done(error, result); };
    if (this._endStream) {
      try { return this._outputStream.end(singleDone); }
      catch (error) { /* error closing stream */ }
    }
    singleDone && singleDone();
  },
};

// Replaces a character by its escaped version
function characterReplacer(character) {
  // Replace a single character by its escaped version
  var result = escapedCharacters[character];
  if (result === undefined) {
    // Replace a single character with its 4-bit unicode escape sequence
    if (character.length === 1) {
      result = character.charCodeAt(0).toString(16);
      result = '\\u0000'.substr(0, 6 - result.length) + result;
    }
    // Replace a surrogate pair with its 8-bit unicode escape sequence
    else {
      result = ((character.charCodeAt(0) - 0xD800) * 0x400 +
                 character.charCodeAt(1) + 0x2400).toString(16);
      result = '\\U00000000'.substr(0, 10 - result.length) + result;
    }
  }
  return result;
}

// ## Placeholder class to represent already pretty-printed terms
function SerializedTerm(value) {
  this.id = value;
}
DataFactory.internal.Term.subclass(SerializedTerm);

// Pretty-printed nodes are not equal to any other node
// (e.g., [] does not equal [])
SerializedTerm.prototype.equals = function () { return false; };

// ## Exports
module.exports = N3Writer;

},{"./IRIs":7,"./N3DataFactory":8}],16:[function(require,module,exports){
module.exports={
    "@context": {
        "madsrdf": "http://www.loc.gov/mads/rdf/v1#",
        "bflc": "http://id.loc.gov/ontologies/bflc/",
        "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
        "foaf": "http://xmlns.com/foaf/0.1/",
        "yago": "http://yago-knowledge.org/resource/",
        "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
        "dbo": "http://dbpedia.org/ontology/",
        "dbp": "http://dbpedia.org/property/",
        "dc": "http://purl.org/dc/elements/1.1/",
        "gr": "http://purl.org/goodrelations/v1#",
        "owl": "http://www.w3.org/2002/07/owl#",
        "spacerel": "http://data.ordnancesurvey.co.uk/ontology/spatialrelations/",
        "skos": "http://www.w3.org/2004/02/skos/core#",
        "geo": "http://www.opengis.net/ont/geosparql#",
        "dcat": "http://www.w3.org/ns/dcat#",
        "xsd": "http://www.w3.org/2001/XMLSchema#",
        "ont": "http://purl.org/net/ns/ontology-annot#",
        "qb": "http://purl.org/linked-data/cube#",
        "sioc": "http://rdfs.org/sioc/ns#",
        "xtypes": "http://purl.org/xtypes/",
        "sd": "http://www.w3.org/ns/sparql-service-description#",
        "org": "http://www.w3.org/ns/org#",
        "onto": "http://www.ontotext.com/",
        "prov": "http://www.w3.org/ns/prov#",
        "dcterms": "http://purl.org/dc/terms/",
        "dbpedia": "http://dbpedia.org/resource/",
        "void": "http://rdfs.org/ns/void#",
        "commerce": "http://search.yahoo.com/searchmonkey/commerce/",
        "gldp": "http://www.w3.org/ns/people#",
        "rss": "http://purl.org/rss/1.0/",
        "dct": "http://purl.org/dc/terms/",
        "bibo": "http://purl.org/ontology/bibo/",
        "wd": "http://www.wikidata.org/entity/",
        "event": "http://purl.org/NET/c4dm/event.owl#",
        "geonames": "http://www.geonames.org/ontology#",
        "fb": "http://rdf.freebase.com/ns/",
        "dcmit": "http://purl.org/dc/dcmitype/",
        "md": "http://www.w3.org/ns/md#",
        "sc": "http://purl.org/science/owl/sciencecommons/",
        "pto": "http://www.productontology.org/id/",
        "prog": "http://purl.org/prog/",
        "cc": "http://creativecommons.org/ns#",
        "vcard": "http://www.w3.org/2006/vcard/ns#",
        "rr": "http://www.w3.org/ns/r2rml#",
        "doap": "http://usefulinc.com/ns/doap#",
        "schema": "http://schema.org/",
        "swrc": "http://swrc.ontoware.org/ontology#",
        "ma": "http://www.w3.org/ns/ma-ont#",
        "nie": "http://www.semanticdesktop.org/ontologies/2007/01/19/nie#",
        "dbpprop": "http://dbpedia.org/property/",
        "vann": "http://purl.org/vocab/vann/",
        "ex": "http://example.org/",
        "dbr": "http://dbpedia.org/resource/",
        "tl": "http://purl.org/NET/c4dm/timeline.owl#",
        "http": "http://www.w3.org/2011/http#",
        "akt": "http://www.aktors.org/ontology/portal#",
        "content": "http://purl.org/rss/1.0/modules/content/",
        "dcterm": "http://purl.org/dc/terms/",
        "fn": "http://www.w3.org/2005/xpath-functions#",
        "swc": "http://data.semanticweb.org/ns/swc/ontology#",
        "vs": "http://www.w3.org/2003/06/sw-vocab-status/ns#",
        "wot": "http://xmlns.com/wot/0.1/",
        "oo": "http://purl.org/openorg/",
        "xmp": "http://ns.adobe.com/xap/1.0/",
        "ical": "http://www.w3.org/2002/12/cal/ical#",
        "marcrel": "http://id.loc.gov/vocabulary/relators/",
        "aiiso": "http://purl.org/vocab/aiiso/schema#",
        "earl": "http://www.w3.org/ns/earl#",
        "gen": "http://purl.org/gen/0.1#",
        "xhtml": "http://www.w3.org/1999/xhtml#",
        "cv": "http://rdfs.org/resume-rdf/",
        "rel": "http://purl.org/vocab/relationship/",
        "cyc": "http://sw.opencyc.org/concept/",
        "ad": "http://schemas.talis.com/2005/address/schema#",
        "factbook": "http://wifo5-04.informatik.uni-mannheim.de/factbook/ns#",
        "dc11": "http://purl.org/dc/elements/1.1/",
        "mo": "http://purl.org/ontology/mo/",
        "test2": "http://this.invalid/test2#",
        "bio": "http://purl.org/vocab/bio/0.1/",
        "bill": "http://www.rdfabout.com/rdf/schema/usbill/",
        "sdmxdim": "http://purl.org/linked-data/sdmx/2009/dimension#",
        "xhv": "http://www.w3.org/1999/xhtml/vocab#",
        "d2rq": "http://www.wiwiss.fu-berlin.de/suhl/bizer/D2RQ/0.1#",
        "og": "http://ogp.me/ns#",
        "rdfg": "http://www.w3.org/2004/03/trix/rdfg-1/",
        "daia": "http://purl.org/ontology/daia/",
        "crm": "http://www.cidoc-crm.org/cidoc-crm/",
        "pc": "http://purl.org/procurement/public-contracts#",
        "cs": "http://purl.org/vocab/changeset/schema#",
        "log": "http://www.w3.org/2000/10/swap/log#",
        "air": "http://dig.csail.mit.edu/TAMI/2007/amord/air#",
        "oa": "http://www.w3.org/ns/oa#",
        "co": "http://rhizomik.net/ontologies/copyrightonto.owl#",
        "media": "http://search.yahoo.com/searchmonkey/media/",
        "dv": "http://rdf.data-vocabulary.org/#",
        "admin": "http://webns.net/mvcb/",
        "tzont": "http://www.w3.org/2006/timezone#",
        "ir": "http://www.ontologydesignpatterns.org/cp/owl/informationrealization.owl#",
        "book": "http://purl.org/NET/book/vocab#",
        "ctag": "http://commontag.org/ns#",
        "days": "http://ontologi.es/days#",
        "tag": "http://www.holygoat.co.uk/owl/redwood/0.1/tags/",
        "biblio": "http://purl.org/net/biblio#",
        "afn": "http://jena.hpl.hp.com/ARQ/function#",
        "con": "http://www.w3.org/2000/10/swap/pim/contact#",
        "photoshop": "http://ns.adobe.com/photoshop/1.0/",
        "botany": "http://purl.org/NET/biol/botany#",
        "xfn": "http://gmpg.org/xfn/11#",
        "osag": "http://www.ordnancesurvey.co.uk/ontology/AdministrativeGeography/v2.0/AdministrativeGeography.rdf#",
        "musim": "http://purl.org/ontology/similarity/",
        "cal": "http://www.w3.org/2002/12/cal/ical#",
        "cld": "http://purl.org/cld/terms/",
        "sr": "http://www.openrdf.org/config/repository/sail#",
        "mu": "http://mu.semte.ch/vocabularies/core/",
        "ome": "http://purl.org/ontomedia/core/expression#",
        "wfs": "http://schemas.opengis.net/wfs/",
        "dir": "http://schemas.talis.com/2005/dir/schema#",
        "myspace": "http://purl.org/ontology/myspace#",
        "reco": "http://purl.org/reco#",
        "dcq": "http://purl.org/dc/qualifiers/1.0/",
        "af": "http://purl.org/ontology/af/",
        "xs": "http://www.w3.org/2001/XMLSchema#",
        "xf": "http://www.w3.org/2002/xforms/",
        "cmp": "http://www.ontologydesignpatterns.org/cp/owl/componency.owl#",
        "sism": "http://purl.oclc.org/NET/sism/0.1/",
        "time": "http://www.w3.org/2006/time#",
        "rif": "http://www.w3.org/2007/rif#",
        "lomvoc": "http://ltsc.ieee.org/rdf/lomv1p0/vocabulary#",
        "math": "http://www.w3.org/2000/10/swap/math#",
        "giving": "http://ontologi.es/giving#",
        "ok": "http://okkam.org/terms#",
        "memo": "http://ontologies.smile.deri.ie/2009/02/27/memo#",
        "rev": "http://purl.org/stuff/rev#",
        "dcn": "http://www.w3.org/2007/uwa/context/deliverycontext.owl#",
        "swanq": "http://purl.org/swan/1.2/qualifiers/",
        "swande": "http://purl.org/swan/1.2/discourse-elements/",
        "owlim": "http://www.ontotext.com/trree/owlim#",
        "cfp": "http://sw.deri.org/2005/08/conf/cfp.owl#",
        "exif": "http://www.w3.org/2003/12/exif/ns#",
        "sio": "http://semanticscience.org/resource/",
        "sdmxa": "http://purl.org/linked-data/sdmx/2009/attribute#",
        "gn": "http://www.geonames.org/ontology#",
        "jdbc": "http://d2rq.org/terms/jdbc/",
        "frbr": "http://purl.org/vocab/frbr/core#",
        "xsi": "http://www.w3.org/2001/XMLSchema-instance#",
        "as": "http://www.w3.org/ns/activitystreams#",
        "ov": "http://open.vocab.org/terms/",
        "obo": "http://purl.obolibrary.org/obo/",
        "swrcfe": "http://www.morelab.deusto.es/ontologies/swrcfe#",
        "om": "http://opendata.caceres.es/def/ontomunicipio#",
        "swrl": "http://www.w3.org/2003/11/swrl#",
        "type": "http://info.deepcarbon.net/schema/type#",
        "swrlb": "http://www.w3.org/2003/11/swrlb#",
        "adms": "http://www.w3.org/ns/adms#",
        "bf": "http://bibframe.org/vocab/",
        "cert": "http://www.w3.org/ns/auth/cert#",
        "scovo": "http://purl.org/NET/scovo#",
        "cnt": "http://www.w3.org/2011/content#",
        "sioct": "http://rdfs.org/sioc/types#",
        "gtfs": "http://vocab.gtfs.org/terms#",
        "sdmx": "http://purl.org/linked-data/sdmx#",
        "siocserv": "http://rdfs.org/sioc/services#",
        "nfo": "http://www.semanticdesktop.org/ontologies/2007/03/22/nfo#",
        "coref": "http://www.rkbexplorer.com/ontologies/coref#",
        "drugbank": "http://www4.wiwiss.fu-berlin.de/drugbank/resource/drugbank/",
        "voaf": "http://purl.org/vocommons/voaf#",
        "sf": "http://www.opengis.net/ont/sf#",
        "pmlj": "http://inference-web.org/2.0/pml-justification.owl#",
        "omn": "http://open-multinet.info/ontology/omn#",
        "ptr": "http://www.w3.org/2009/pointers#",
        "unit": "http://qudt.org/vocab/unit#",
        "ac": "http://umbel.org/umbel/ac/",
        "isbd": "http://iflastandards.info/ns/isbd/elements/",
        "fabio": "http://purl.org/spar/fabio/",
        "lyou": "http://purl.org/linkingyou/",
        "prism": "http://prismstandard.org/namespaces/basic/2.0/",
        "openlinks": "http://www.openlinksw.com/schemas/virtrdf#",
        "db": "http://dbpedia.org/",
        "acc": "http://purl.org/NET/acc#",
        "ldp": "http://www.w3.org/ns/ldp#",
        "geoes": "http://geo.linkeddata.es/ontology/",
        "eat": "http://www.eat.rl.ac.uk/#",
        "lemon": "http://lemon-model.net/lemon#",
        "ontology": "http://dbpedia.org/ontology/",
        "geosparql": "http://www.opengis.net/ont/geosparql#",
        "wn": "http://xmlns.com/wordnet/1.6/",
        "rsa": "http://www.w3.org/ns/auth/rsa#",
        "akts": "http://www.aktors.org/ontology/support#",
        "movie": "http://data.linkedmdb.org/resource/movie/",
        "ore": "http://www.openarchives.org/ore/terms/",
        "wn20schema": "http://www.w3.org/2006/03/wn/wn20/schema/",
        "aat": "http://vocab.getty.edu/aat/",
        "sider": "http://www4.wiwiss.fu-berlin.de/sider/resource/sider/",
        "skosxl": "http://www.w3.org/2008/05/skos-xl#",
        "test": "http://test2.example.com/",
        "eg": "http://eulergui.sourceforge.net/engine.owl#",
        "dul": "http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#",
        "lv": "http://purl.org/lobid/lv#",
        "ssn": "http://purl.oclc.org/NET/ssnx/ssn#",
        "qudt": "http://qudt.org/1.1/schema/qudt#",
        "acm": "http://www.rkbexplorer.com/ontologies/acm#",
        "nsogi": "http://prefix.cc/nsogi:",
        "core": "http://vivoweb.org/ontology/core#",
        "umbelrc": "http://umbel.org/umbel/rc/",
        "service": "http://purl.org/ontology/service#",
        "lgd": "http://linkedgeodata.org/triplify/",
        "loc": "http://www.w3.org/2007/uwa/context/location.owl#",
        "po": "http://purl.org/ontology/po/",
        "zoology": "http://purl.org/NET/biol/zoology#",
        "room": "http://vocab.deri.ie/rooms#",
        "music": "http://musicontology.com/",
        "uniprot": "http://purl.uniprot.org/core/",
        "organism": "http://eulersharp.sourceforge.net/2003/03swap/organism#",
        "formats": "http://www.w3.org/ns/formats/",
        "cito": "http://purl.org/spar/cito/",
        "ignf": "http://data.ign.fr/def/ignf#",
        "prv": "http://purl.org/net/provenance/ns#",
        "irw": "http://www.ontologydesignpatterns.org/ont/web/irw.owl#",
        "dcam": "http://purl.org/dc/dcam/",
        "swid": "http://semanticweb.org/id/",
        "sp": "http://spinrdf.org/sp#",
        "whois": "http://www.kanzaki.com/ns/whois#",
        "ndl": "http://schemas.ogf.org/nml/2013/05/base#",
        "dbpediaowl": "http://dbpedia.org/ontology/",
        "dce": "http://purl.org/dc/elements/1.1/",
        "pr": "http://purl.org/ontology/prv/core#",
        "gvp": "http://vocab.getty.edu/ontology#",
        "gold": "http://purl.org/linguistics/gold/",
        "georss": "http://www.georss.org/georss/",
        "java": "http://www.w3.org/2007/uwa/context/java.owl#",
        "acl": "http://www.w3.org/ns/auth/acl#",
        "dblp": "http://dblp.uni-trier.de/rdf/schema-2015-01-26#",
        "lode": "http://linkedevents.org/ontology/",
        "atom": "http://www.w3.org/2005/Atom/",
        "rec": "http://purl.org/ontology/rec/core#",
        "wo": "http://purl.org/ontology/wo/",
        "fresnel": "http://www.w3.org/2004/09/fresnel#",
        "space": "http://purl.org/net/schemas/space/",
        "ti": "http://www.ontologydesignpatterns.org/cp/owl/timeinterval.owl#",
        "granatum": "http://chem.deri.ie/granatum/",
        "daml": "http://www.daml.org/2001/03/daml+oil#",
        "go": "http://purl.org/obo/owl/GO#",
        "spin": "http://spinrdf.org/spin#",
        "tgn": "http://vocab.getty.edu/tgn/",
        "ecs": "http://rdf.ecs.soton.ac.uk/ontology/ecs#",
        "nco": "http://www.semanticdesktop.org/ontologies/2007/03/22/nco#",
        "abc": "http://www.metadata.net/harmony/ABCSchemaV5Commented.rdf#",
        "link": "http://www.w3.org/2006/link#",
        "protege": "http://protege.stanford.edu/system#",
        "biocore": "http://bio2rdf.org/core#",
        "admingeo": "http://data.ordnancesurvey.co.uk/ontology/admingeo/",
        "resist": "http://www.rkbexplorer.com/ontologies/resist#",
        "dbprop": "http://dbpedia.org/property/",
        "pmt": "http://tipsy.googlecode.com/svn/trunk/vocab/pmt#",
        "umbel": "http://umbel.org/umbel#",
        "ya": "http://blogs.yandex.ru/schema/foaf/",
        "omt": "http://purl.org/ontomedia/ext/common/trait#",
        "ulan": "http://vocab.getty.edu/ulan/",
        "bibtex": "http://purl.oclc.org/NET/nknouf/ns/bibtex#",
        "doc": "http://www.w3.org/2000/10/swap/pim/doc#",
        "user": "http://schemas.talis.com/2005/user/schema#",
        "sesame": "http://www.openrdf.org/schema/sesame#",
        "scot": "http://rdfs.org/scot/ns#",
        "profiling": "http://ontologi.es/profiling#",
        "doac": "http://ramonantonio.net/doac/0.1/#",
        "politico": "http://www.rdfabout.com/rdf/schema/politico/",
        "omb": "http://purl.org/ontomedia/ext/common/being#",
        "nif": "http://persistence.uni-leipzig.org/nlp2rdf/ontologies/nif-core#",
        "oauth": "http://demiblog.org/vocab/oauth#",
        "taxo": "http://purl.org/rss/1.0/modules/taxonomy/",
        "mit": "http://purl.org/ontology/mo/mit#",
        "edm": "http://www.europeana.eu/schemas/edm/",
        "climb": "http://climb.dataincubator.org/vocabs/climb/",
        "dctype": "http://purl.org/dc/dcmitype/",
        "gd": "http://rdf.data-vocabulary.org/#",
        "rnews": "http://iptc.org/std/rNews/2011-10-07#",
        "opm": "https://w3id.org/opm#",
        "oc": "http://opencoinage.org/rdf/",
        "biol": "http://purl.org/NET/biol/ns#",
        "dbc": "http://dbpedia.org/resource/Category:",
        "sec": "https://w3id.org/security#",
        "courseware": "http://courseware.rkbexplorer.com/ontologies/courseware#",
        "ddc": "http://purl.org/NET/decimalised#",
        "atomix": "http://buzzword.org.uk/rdf/atomix#",
        "compass": "http://purl.org/net/compass#",
        "kb": "http://deductions.sf.net/ontology/knowledge_base.owl#",
        "opensearch": "http://a9.com/-/spec/opensearch/1.1/",
        "wv": "http://vocab.org/waiver/terms/",
        "tmo": "http://www.semanticdesktop.org/ontologies/2008/05/20/tmo#",
        "myspo": "http://purl.org/ontology/myspace#",
        "gndo": "http://d-nb.info/standards/elementset/gnd#",
        "imm": "http://schemas.microsoft.com/imm/",
        "meteo": "http://purl.org/ns/meteo#",
        "label": "http://purl.org/net/vocab/2004/03/label#",
        "wgs84": "http://www.w3.org/2003/01/geo/wgs84_pos#",
        "disco": "http://rdf-vocabulary.ddialliance.org/discovery#",
        "cco": "http://purl.org/ontology/cco/core#",
        "lfn": "http://www.dotnetrdf.org/leviathan#",
        "bio2rdf": "http://bio2rdf.org/",
        "es": "http://eulersharp.sourceforge.net/2003/03swap/log-rules#",
        "httph": "http://www.w3.org/2007/ont/httph#",
        "swivt": "http://semantic-mediawiki.org/swivt/1.0#",
        "sparql": "http://www.w3.org/ns/sparql#",
        "usgov": "http://www.rdfabout.com/rdf/schema/usgovt/",
        "bif": "http://www.openlinksw.com/schemas/bif#",
        "os": "http://www.w3.org/2000/10/swap/os#",
        "fec": "http://www.rdfabout.com/rdf/schema/usfec/",
        "conv": "http://purl.org/twc/vocab/conversion/",
        "kwijibo": "http://kwijibo.talis.com/",
        "chord": "http://purl.org/ontology/chord/",
        "wdrs": "http://www.w3.org/2007/05/powder-s#",
        "rep": "http://www.openrdf.org/config/repository#",
        "powder": "http://www.w3.org/2007/05/powder#",
        "omc": "http://purl.org/ontomedia/ext/common/bestiary#",
        "audio": "http://purl.org/media/audio#",
        "sdl": "http://purl.org/vocab/riro/sdl#",
        "pmlp": "http://inference-web.org/2.0/pml-provenance.owl#",
        "ngeo": "http://geovocab.org/geometry#",
        "contact": "http://www.w3.org/2000/10/swap/pim/contact#",
        "dailymed": "http://www4.wiwiss.fu-berlin.de/dailymed/resource/dailymed/",
        "lx": "http://purl.org/NET/lx#",
        "worldbank": "http://worldbank.270a.info/dataset/",
        "eztag": "http://ontologies.ezweb.morfeo-project.org/eztag/ns#",
        "iswc": "http://annotation.semanticweb.org/2004/iswc#",
        "affy": "http://www.affymetrix.com/community/publications/affymetrix/tmsplice#",
        "xro": "http://purl.org/xro/ns#",
        "nmo": "http://www.semanticdesktop.org/ontologies/2007/03/22/nmo#",
        "sv": "http://schemas.talis.com/2005/service/schema#",
        "nao": "http://www.semanticdesktop.org/ontologies/2007/08/15/nao#",
        "am": "http://vocab.deri.ie/am#",
        "resource": "http://purl.org/vocab/resourcelist/schema#",
        "food": "http://purl.org/foodontology#",
        "lfm": "http://purl.org/ontology/last-fm/",
        "mf": "http://www.w3.org/2001/sw/DataAccess/tests/test-manifest#",
        "swandr": "http://purl.org/swan/1.2/discourse-relationships/",
        "awol": "http://bblfish.net/work/atom-owl/2006-06-06/#",
        "copyright": "http://rhizomik.net/ontologies/copyrightonto.owl#",
        "prj": "http://purl.org/stuff/project/",
        "hcterms": "http://purl.org/uF/hCard/terms/",
        "postcode": "http://data.ordnancesurvey.co.uk/id/postcodeunit/",
        "cdm": "http://publications.europa.eu/ontology/cdm#",
        "doclist": "http://www.junkwork.net/xml/DocumentList#",
        "ire": "http://www.ontologydesignpatterns.org/cpont/ire.owl#",
        "hard": "http://www.w3.org/2007/uwa/context/hardware.owl#",
        "biopax": "http://www.biopax.org/release/biopax-level3.owl#",
        "rei": "http://www.w3.org/2004/06/rei#",
        "code": "http://telegraphis.net/ontology/measurement/code#",
        "p3p": "http://www.w3.org/2002/01/p3prdfv1#",
        "irrl": "http://www.ontologydesignpatterns.org/cp/owl/informationobjectsandrepresentationlanguages.owl#",
        "nrl": "http://www.semanticdesktop.org/ontologies/2007/08/15/nrl#",
        "gpt": "http://purl.org/vocab/riro/gpt#",
        "moat": "http://moat-project.org/ns#",
        "money": "http://purl.org/net/rdf-money/",
        "so": "http://purl.org/ontology/symbolic-music/",
        "nexif": "http://www.semanticdesktop.org/ontologies/2007/05/10/nexif#",
        "tio": "http://purl.org/tio/ns#",
        "tdb": "http://jena.hpl.hp.com/2008/tdb#",
        "wordmap": "http://purl.org/net/ns/wordmap#",
        "sail": "http://www.openrdf.org/config/sail#",
        "vote": "http://www.rdfabout.com/rdf/schema/vote/",
        "smf": "http://topbraid.org/sparqlmotionfunctions#",
        "spl": "http://spinrdf.org/spl#",
        "ddl": "http://purl.org/vocab/riro/ddl#",
        "xhe": "http://buzzword.org.uk/rdf/xhtml-elements#",
        "web": "http://www.w3.org/2007/uwa/context/web.owl#",
        "cycann": "http://sw.cyc.com/CycAnnotations_v1#",
        "obj": "http://www.openrdf.org/rdf/2009/object#",
        "gso": "http://www.w3.org/2006/gen/ont#",
        "product": "http://purl.org/commerce/product#",
        "sit": "http://www.ontologydesignpatterns.org/cp/owl/situation.owl#",
        "hlisting": "http://sindice.com/hlisting/0.1/",
        "swh": "http://plugin.org.uk/swh-plugins/",
        "interval": "http://reference.data.gov.uk/def/intervals/",
        "sede": "http://eventography.org/sede/0.1/",
        "prissma": "http://ns.inria.fr/prissma/v1#",
        "omp": "http://purl.org/ontomedia/ext/common/profession#",
        "scv": "http://purl.org/NET/scovo#",
        "rdfa": "http://www.w3.org/ns/rdfa#",
        "xen": "http://buzzword.org.uk/rdf/xen#",
        "lang": "http://ontologi.es/lang/core#",
        "spc": "http://purl.org/ontomedia/core/space#",
        "meetup": "http://www.lotico.com/meetup/",
        "sim": "http://purl.org/ontology/similarity/",
        "site": "http://ns.ontowiki.net/SysOnt/Site/",
        "swp": "http://www.w3.org/2004/03/trix/swp-2/",
        "swanqs": "http://purl.org/swan/1.2/qualifiers/",
        "icaltzd": "http://www.w3.org/2002/12/cal/icaltzd#",
        "dcmitype": "http://purl.org/dc/dcmitype/",
        "video": "http://purl.org/media/video#",
        "uco": "http://purl.org/uco/ns#",
        "fed": "http://www.openrdf.org/config/sail/federation#",
        "phss": "http://ns.poundhill.com/phss/1.0/",
        "ref": "http://purl.org/vocab/relationship/",
        "resex": "http://resex.rkbexplorer.com/ontologies/resex#",
        "xl": "http://langegger.at/xlwrap/vocab#",
        "xforms": "http://www.w3.org/2002/xforms/",
        "itsrdf": "http://www.w3.org/2005/11/its/rdf#",
        "lastfm": "http://purl.org/ontology/last-fm/",
        "string": "http://www.w3.org/2000/10/swap/string#",
        "dady": "http://purl.org/NET/dady#",
        "bd": "http://www.bigdata.com/rdf#",
        "lexinfo": "http://www.lexinfo.net/ontology/2.0/lexinfo#",
        "lgdo": "http://linkedgeodata.org/ontology/",
        "opo": "http://online-presence.net/opo/ns#",
        "lom": "http://ltsc.ieee.org/rdf/lomv1p0/lom#",
        "sysont": "http://ns.ontowiki.net/SysOnt/",
        "sco": "http://purl.org/ontology/sco#",
        "gob": "http://purl.org/ontology/last-fm/",
        "library": "http://purl.org/library/",
        "ezcontext": "http://ontologies.ezweb.morfeo-project.org/ezcontext/ns#",
        "custom": "http://www.openrdf.org/config/sail/custom#",
        "dgtwc": "http://data-gov.tw.rpi.edu/2009/data-gov-twc.rdf#",
        "pmlr": "http://inference-web.org/2.0/pml-relation.owl#",
        "crypto": "http://www.w3.org/2000/10/swap/crypto#",
        "bib": "http://zeitkunst.org/bibtex/0.1/bibtex.owl#",
        "ne": "http://umbel.org/umbel/ne/",
        "smiley": "http://www.smileyontology.com/ns#",
        "acco": "http://purl.org/acco/ns#",
        "sport": "http://www.bbc.co.uk/ontologies/sport/",
        "ct": "http://data.linkedct.org/resource/linkedct/",
        "trackback": "http://madskills.com/public/xml/rss/module/trackback/",
        "omm": "http://purl.org/ontomedia/core/media#",
        "ping": "http://purl.org/net/pingback/",
        "wgs": "http://www.w3.org/2003/01/geo/wgs84_pos#",
        "common": "http://www.w3.org/2007/uwa/context/common.owl#",
        "tags": "http://www.holygoat.co.uk/owl/redwood/0.1/tags/",
        "net": "http://www.w3.org/2007/uwa/context/network.owl#",
        "nid3": "http://www.semanticdesktop.org/ontologies/2007/05/10/nid3#",
        "like": "http://ontologi.es/like#",
        "pobo": "http://purl.obolibrary.org/obo/",
        "lotico": "http://www.lotico.com/resource/",
        "dummy": "http://hello.com/",
        "mysql": "http://web-semantics.org/ns/mysql/",
        "qdoslf": "http://foaf.qdos.com/lastfm/schema/",
        "lifecycle": "http://purl.org/vocab/lifecycle/schema#",
        "psych": "http://purl.org/vocab/psychometric-profile/",
        "ao": "http://purl.org/ontology/ao/core#",
        "b2bo": "http://purl.org/b2bo#",
        "swanco": "http://purl.org/swan/1.2/swan-commons/",
        "freebase": "http://rdf.freebase.com/ns/",
        "soft": "http://www.w3.org/2007/uwa/context/software.owl#",
        "ero": "http://purl.obolibrary.org/obo/",
        "rov": "http://www.w3.org/ns/regorg#",
        "c4n": "http://vocab.deri.ie/c4n#",
        "states": "http://www.w3.org/2005/07/aaa#",
        "push": "http://www.w3.org/2007/uwa/context/push.owl#",
        "ocd": "http://dati.camera.it/ocd/",
        "anca": "http://users.utcluj.ro/~raluca/rdf_ontologies_ralu/ralu_modified_ontology_pizzas2_0#",
        "conserv": "http://conserv.deri.ie/ontology#",
        "grddl": "http://www.w3.org/2003/g/data-view#",
        "aifb": "http://www.aifb.kit.edu/id/",
        "ttl": "http://www.w3.org/2008/turtle#",
        "lingvoj": "http://www.lingvoj.org/ontology#",
        "rdrel": "http://rdvocab.info/RDARelationshipsWEMI/",
        "isi": "http://purl.org/ontology/is/inst/",
        "xhtmlvocab": "http://www.w3.org/1999/xhtml/vocab/",
        "airport": "http://www.daml.org/2001/10/html/airport-ont#",
        "cogs": "http://vocab.deri.ie/cogs#",
        "bsbm": "http://www4.wiwiss.fu-berlin.de/bizer/bsbm/v01/vocabulary/",
        "h5": "http://buzzword.org.uk/rdf/h5#",
        "rdagr1": "http://rdvocab.info/Elements/",
        "rdac": "http://rdaregistry.info/Elements/c/",
        "ibis": "http://purl.org/ibis#",
        "frbre": "http://purl.org/vocab/frbr/extended#",
        "ass": "http://uptheasset.org/ontology#",
        "lt": "http://diplomski.nelakolundzija.org/LTontology.rdf#",
        "puc": "http://purl.org/NET/puc#",
        "wdr": "http://www.w3.org/2007/05/powder#",
        "ist": "http://purl.org/ontology/is/types/",
        "rail": "http://ontologi.es/rail/vocab#",
        "ro": "http://purl.org/wf4ever/ro#",
        "meta": "http://www.openrdf.org/rdf/2009/metadata#",
        "tripfs": "http://purl.org/tripfs/2010/02#",
        "sawsdl": "http://www.w3.org/ns/sawsdl#",
        "pgterms": "http://www.gutenberg.org/2009/pgterms/",
        "prot": "http://www.proteinontology.info/po.owl#",
        "game": "http://data.totl.net/game/",
        "efo": "http://www.ebi.ac.uk/efo/",
        "bookmark": "http://www.w3.org/2002/01/bookmark#",
        "urn": "http://fliqz.com/",
        "lark1": "http://users.utcluj.ro/~raluca/ontology/Ontology1279614123500.owl#",
        "gnd": "http://d-nb.info/gnd/",
        "ncal": "http://www.semanticdesktop.org/ontologies/2007/04/02/ncal#",
        "npg": "http://ns.nature.com/terms/",
        "timeline": "http://purl.org/NET/c4dm/timeline.owl#",
        "conversion": "http://purl.org/twc/vocab/conversion/",
        "pav": "http://purl.org/pav/",
        "cgov": "http://reference.data.gov.uk/def/central-government/",
        "viaf": "http://viaf.org/ontology/1.1/#",
        "eu": "http://eulersharp.sourceforge.net/2003/03swap/log-rules#",
        "rulz": "http://purl.org/NET/rulz#",
        "cpv": "http://purl.org/weso/cpv/",
        "ps": "https://w3id.org/payswarm#",
        "dbpp": "http://dbpedia.org/property/",
        "sm": "http://topbraid.org/sparqlmotion#",
        "wnschema": "http://www.cogsci.princeton.edu/~wn/schema/",
        "geographis": "http://telegraphis.net/ontology/geography/geography#",
        "oat": "http://openlinksw.com/schemas/oat/",
        "sml": "http://topbraid.org/sparqlmotionlib#",
        "places": "http://purl.org/ontology/places#",
        "apivc": "http://purl.org/linked-data/api/vocab#",
        "pat": "http://purl.org/hpi/patchr#",
        "list": "http://www.w3.org/2000/10/swap/list#",
        "ean": "http://openean.kaufkauf.net/id/",
        "evset": "http://dsnotify.org/vocab/eventset/0.1/",
        "opus": "http://lsdis.cs.uga.edu/projects/semdis/opus#",
        "cordis": "http://cordis.europa.eu/projects/",
        "is": "http://purl.org/ontology/is/core#",
        "olia": "http://purl.org/olia/olia.owl#",
        "dwc": "http://rs.tdwg.org/dwc/terms/",
        "wairole": "http://www.w3.org/2005/01/wai-rdf/GUIRoleTaxonomy#",
        "name": "http://example.org/name#",
        "ui": "http://www.w3.org/ns/ui#",
        "ldap": "http://purl.org/net/ldap/",
        "eprints": "http://eprints.org/ontology/",
        "play": "http://uriplay.org/spec/ontology/#",
        "okkam": "http://models.okkam.org/ENS-core-vocabulary#",
        "hydra": "http://www.w3.org/ns/hydra/core#",
        "act": "http://www.w3.org/2007/rif-builtin-action#",
        "dnr": "http://www.dotnetrdf.org/configuration#",
        "drug": "http://www.agfa.com/w3c/2009/drugTherapy#",
        "human": "http://eulersharp.sourceforge.net/2003/03swap/human#",
        "muto": "http://purl.org/muto/core#",
        "httpvoc": "http://www.w3.org/2006/http#",
        "datafaqs": "http://purl.org/twc/vocab/datafaqs#",
        "osgb": "http://data.ordnancesurvey.co.uk/id/",
        "lp": "http://launchpad.net/rdf/launchpad#",
        "plink": "http://buzzword.org.uk/rdf/personal-link-types#",
        "osoc": "http://web-semantics.org/ns/opensocial#",
        "gml": "http://www.opengis.net/ont/gml#",
        "remus": "http://www.semanticweb.org/ontologies/2010/6/Ontology1279614123500.owl#",
        "cro": "http://rhizomik.net/ontologies/copyrightonto.owl#",
        "phil": "http://philosurfical.open.ac.uk/ontology/philosurfical.owl#",
        "xkos": "http://rdf-vocabulary.ddialliance.org/xkos#",
        "arpfo": "http://vocab.ouls.ox.ac.uk/projectfunding#",
        "coin": "http://purl.org/court/def/2009/coin#",
        "pbo": "http://purl.org/ontology/pbo/core#",
        "lvont": "http://lexvo.org/ontology#",
        "asn": "http://purl.org/ASN/schema/core/",
        "yoda": "http://purl.org/NET/yoda#",
        "session": "http://redfoot.net/2005/session#",
        "eco": "http://www.ebusiness-unibw.org/ontologies/eclass/5.1.4/#",
        "protons": "http://proton.semanticweb.org/2005/04/protons#",
        "swanci": "http://purl.org/swan/1.2/citations/",
        "sioca": "http://rdfs.org/sioc/actions#",
        "pimo": "http://www.semanticdesktop.org/ontologies/2007/11/01/pimo#",
        "dita": "http://purl.org/dita/ns#",
        "prvtypes": "http://purl.org/net/provenance/types#",
        "imreg": "http://www.w3.org/2004/02/image-regions#",
        "person": "http://www.w3.org/ns/person#",
        "txn": "http://lod.taxonconcept.org/ontology/txn.owl#",
        "pml": "http://provenanceweb.org/ns/pml#",
        "swanpav": "http://purl.org/swan/1.2/pav/",
        "inno": "http://purl.org/innovation/ns#",
        "kontakt": "http://richard.cyganiak.de/",
        "isothes": "http://purl.org/iso25964/skos-thes#",
        "wisski": "http://wiss-ki.eu/",
        "swanag": "http://purl.org/swan/1.2/agents/",
        "muo": "http://purl.oclc.org/NET/muo/muo#",
        "search": "http://sindice.com/vocab/search#",
        "uri": "http://purl.org/NET/uri#",
        "cerif": "http://spi-fm.uca.es/neologism/cerif#",
        "ub": "http://www.lehigh.edu/~zhp2/2004/0401/univ-bench.owl#",
        "sl": "http://www.semanlink.net/2001/00/semanlink-schema#",
        "vitro": "http://vitro.mannlib.cornell.edu/ns/vitro/public#",
        "nsa": "http://multimedialab.elis.ugent.be/organon/ontologies/ninsuna#",
        "arch": "http://purl.org/archival/vocab/arch#",
        "vsr": "http://purl.org/twc/vocab/vsr#",
        "com": "http://purl.org/commerce#",
        "xbrli": "http://www.xbrl.org/2003/instance#",
        "agents": "http://eulersharp.sourceforge.net/2003/03swap/agent#",
        "linkedct": "http://data.linkedct.org/vocab/",
        "pmlt": "http://inference-web.org/2.0/pml-trust.owl#",
        "agg": "http://purl.org/twc/health/vocab/aggregate/",
        "enc": "http://www.w3.org/2001/04/xmlenc#",
        "address": "http://schemas.talis.com/2005/address/schema#",
        "vso": "http://purl.org/vso/ns#",
        "geospecies": "http://rdf.geospecies.org/ont/geospecies#",
        "ceo": "http://www.ebusiness-unibw.org/ontologies/consumerelectronics/v1#",
        "card": "http://www.ashutosh.com/test/",
        "xesam": "http://freedesktop.org/standards/xesam/1.0/core#",
        "pdo": "http://ontologies.smile.deri.ie/pdo#",
        "posh": "http://poshrdf.org/ns/posh/",
        "mods": "http://www.loc.gov/mods/v3#",
        "dbnary": "http://kaiko.getalp.org/dbnary#",
        "mei": "http://www.music-encoding.org/ns/mei/",
        "evopat": "http://ns.aksw.org/Evolution/",
        "tarot": "http://data.totl.net/tarot/card/",
        "cube": "http://purl.org/linked-data/cube#",
        "res": "http://dbpedia.org/resource/",
        "isq": "http://purl.org/ontology/is/quality/",
        "cheminf": "http://www.semanticweb.org/ontologies/cheminf.owl#",
        "ospost": "http://data.ordnancesurvey.co.uk/ontology/postcode/",
        "locn": "http://www.w3.org/ns/locn#",
        "fab": "http://purl.org/fab/ns#",
        "status": "http://ontologi.es/status#",
        "agetec": "http://www.agetec.org/",
        "cmo": "http://purl.org/twc/ontologies/cmo.owl#",
        "zem": "http://s.zemanta.com/ns#",
        "rooms": "http://vocab.deri.ie/rooms#",
        "languages": "http://eulersharp.sourceforge.net/2003/03swap/languages#",
        "hospital": "http://www.agfa.com/w3c/2009/hospital#",
        "pro": "http://purl.org/hpi/patchr#",
        "geodata": "http://sws.geonames.org/",
        "fise": "http://fise.iks-project.eu/ontology/",
        "oslc": "http://open-services.net/ns/core#",
        "payment": "http://reference.data.gov.uk/def/payment#",
        "ccom": "http://purl.org/ontology/cco/mappings#",
        "dgfoaf": "http://west.uni-koblenz.de/ontologies/2010/07/dgfoaf.owl#",
        "wordnet": "http://wordnet-rdf.princeton.edu/ontology#",
        "opmv": "http://purl.org/net/opmv/ns#",
        "olo": "http://purl.org/ontology/olo/core#",
        "cos": "http://www.inria.fr/acacia/corese#",
        "gsp": "http://www.opengis.net/ont/geosparql#",
        "ann": "http://www.w3.org/2000/10/annotation-ns#",
        "nndsr": "http://semanticdiet.com/schema/usda/nndsr/",
        "rdau": "http://rdaregistry.info/Elements/u/",
        "zbwext": "http://zbw.eu/namespaces/zbw-extensions/",
        "care": "http://eulersharp.sourceforge.net/2003/03swap/care#",
        "derecho": "http://purl.org/derecho#",
        "example": "http://www.example.org/rdf#",
        "hemogram": "http://www.agfa.com/w3c/2009/hemogram#",
        "nt": "http://ns.inria.fr/nicetag/2010/09/09/voc#",
        "gridworks": "http://purl.org/net/opmv/types/gridworks#",
        "calli": "http://callimachusproject.org/rdf/2009/framework#",
        "c4o": "http://purl.org/spar/c4o/",
        "dayta": "http://dayta.me/resource#",
        "loticoowl": "http://www.lotico.com/ontology/",
        "xfnv": "http://vocab.sindice.com/xfn#",
        "dso": "http://purl.org/ontology/dso#",
        "esd": "http://def.esd.org.uk/",
        "idemo": "http://rdf.insee.fr/def/demo#",
        "gc": "http://www.oegov.org/core/owl/gc#",
        "arg": "http://rdfs.org/sioc/argument#",
        "webtlab": "http://webtlab.it.uc3m.es/",
        "prefix": "http://prefix.cc/",
        "marl": "http://www.gsi.dit.upm.es/ontologies/marl/ns#",
        "oboro": "http://obofoundry.org/ro/ro.owl#",
        "voag": "http://voag.linkedmodel.org/schema/voag#",
        "cidoc": "http://erlangen-crm.org/current/",
        "oboso": "http://purl.org/obo/owl/SO#",
        "gv": "http://rdf.data-vocabulary.org/#",
        "sindice": "http://vocab.sindice.net/",
        "bte": "http://purl.org/twc/vocab/between-the-edges/",
        "req": "http://purl.org/req/",
        "dnb": "http://d-nb.info/gnd/",
        "fowl": "http://www.w3.org/TR/2003/PR-owl-guide-20031209/food#",
        "ludo": "http://ns.inria.fr/ludo/v1#",
        "organiz": "http://eulersharp.sourceforge.net/2003/03swap/organization#",
        "dt": "http://dbpedia.org/datatype/",
        "ogp": "http://ogp.me/ns#",
        "opwn": "http://www.ontologyportal.org/WordNet.owl#",
        "blt": "http://www.bl.uk/schemas/bibliographic/blterms#",
        "rdam": "http://rdaregistry.info/Elements/m/",
        "aair": "http://xmlns.notu.be/aair#",
        "coo": "http://purl.org/coo/ns#",
        "xsl": "http://www.w3.org/1999/XSL/Transform#",
        "edam": "http://edamontology.org/",
        "muni": "http://vocab.linkeddata.es/urbanismo-infraestructuras/territorio#",
        "theatre": "http://purl.org/theatre#",
        "bioskos": "http://eulersharp.sourceforge.net/2003/03swap/bioSKOSSchemes#",
        "ncbitaxon": "http://purl.org/obo/owl/NCBITaxon#",
        "deo": "http://purl.org/spar/deo/",
        "elog": "http://eulersharp.sourceforge.net/2003/03swap/log-rules#",
        "wlp": "http://weblab-project.org/core/model/property/processing/",
        "quak": "http://dev.w3.org/cvsweb/2000/quacken/vocab#",
        "tcga": "http://purl.org/tcga/core#",
        "gazetteer": "http://data.ordnancesurvey.co.uk/ontology/50kGazetteer/",
        "govtrackus": "http://www.rdfabout.com/rdf/usgov/geo/us/",
        "wikipedia": "http://wikipedia.no/rdf/",
        "kdo": "http://kdo.render-project.eu/kdo#",
        "r2r": "http://www4.wiwiss.fu-berlin.de/bizer/r2r/",
        "oboe": "http://ecoinformatics.org/oboe/oboe.1.0/oboe-core.owl#",
        "wgspos": "http://www.w3.org/2003/01/geo/wgs84_pos#",
        "w3p": "http://prov4j.org/w3p/",
        "gelo": "http://krauthammerlab.med.yale.edu/ontologies/gelo#",
        "rdaa": "http://rdaregistry.info/Elements/a/",
        "owltime": "http://www.w3.org/TR/owl-time#",
        "life": "http://life.deri.ie/schema/",
        "spatial": "http://geovocab.org/spatial#",
        "genab": "http://eulersharp.sourceforge.net/2003/03swap/genomeAbnormality#",
        "linkedmdb": "http://data.linkedmdb.org/sparql/",
        "provenir": "http://knoesis.wright.edu/provenir/provenir.owl#",
        "mygrid": "http://www.mygrid.org.uk/ontology#",
        "ufmedia": "http://purl.org/microformat/hmedia/",
        "aapi": "http://rdf.alchemyapi.com/rdf/v1/s/aapi-schema#",
        "dtype": "http://www.linkedmodel.org/schema/dtype#",
        "atomowl": "http://bblfish.net/work/atom-owl/2006-06-06/#",
        "ens": "http://models.okkam.org/ENS-core-vocabulary.owl#",
        "br": "http://vocab.deri.ie/br#",
        "decl": "http://www.linkedmodel.org/1.0/schema/decl#",
        "odp": "http://ontologydesignpatterns.org/",
        "pay": "http://reference.data.gov.uk/def/payment#",
        "toby": "http://tobyinkster.co.uk/#",
        "pos": "http://www.w3.org/2003/01/geo/wgs84_pos#",
        "qa": "http://www.mit.jyu.fi/ai/TRUST_Ontologies/QA.owl#",
        "dcr": "http://www.isocat.org/ns/dcr.rdf#",
        "teach": "http://linkedscience.org/teach/ns#",
        "frir": "http://purl.org/twc/ontology/frir.owl#",
        "owls": "http://www.daml.org/services/owl-s/1.2/Service.owl#",
        "exterms": "http://www.example.org/terms/",
        "rlog": "http://persistence.uni-leipzig.org/nlp2rdf/ontologies/rlog#",
        "skip": "http://skipforward.net/skipforward/resource/",
        "clineva": "http://www.agfa.com/w3c/2009/clinicalEvaluation#",
        "pf": "http://jena.hpl.hp.com/ARQ/property#",
        "nocal": "http://vocab.deri.ie/nocal#",
        "xml": "http://www.w3.org/XML/1998/namespace/",
        "rdo": "http://purl.org/rdo/ns#",
        "govwild": "http://govwild.org/0.6/GWOntology.rdf/",
        "pccz": "http://purl.org/procurement/public-contracts-czech#",
        "bing": "http://bing.com/schema/media/",
        "uni": "http://purl.org/weso/uni/uni.html#",
        "hartigprov": "http://purl.org/net/provenance/ns#",
        "arecipe": "http://purl.org/amicroformat/arecipe/",
        "scsv": "http://purl.org/NET/schema-org-csv#",
        "s4ac": "http://ns.inria.fr/s4ac/v2#",
        "ppo": "http://vocab.deri.ie/ppo#",
        "emotion": "http://ns.inria.fr/emoca#",
        "aneo": "http://akonadi-project.org/ontologies/aneo#",
        "healthcare": "http://www.agfa.com/w3c/2009/healthCare#",
        "enhancer": "http://stanbol.apache.org/ontology/enhancer/enhancer#",
        "wai": "http://purl.org/wai#",
        "city": "http://datos.localidata.com/def/City#",
        "prvr": "http://purl.org/ontology/prv/rules#",
        "span": "http://www.ifomis.org/bfo/1.1/span#",
        "pns": "http://data.press.net/ontology/stuff/",
        "dis": "http://stanbol.apache.org/ontology/disambiguation/disambiguation#",
        "lctr": "http://data.linkedct.org/vocab/resource/",
        "purl": "http://www.purl.org/",
        "wfdesc": "http://purl.org/wf4ever/wfdesc#",
        "dbpo": "http://dbpedia.org/ontology/",
        "ms": "http://purl.org/obo/owl/MS#",
        "agent": "http://eulersharp.sourceforge.net/2003/03swap/agent#",
        "events": "http://eulersharp.sourceforge.net/2003/03swap/event#",
        "nytimes": "http://data.nytimes.com/elements/",
        "cao": "http://purl.org/makolab/caont/",
        "humanbody": "http://eulersharp.sourceforge.net/2003/03swap/humanBody#",
        "wbc": "http://worldbank.270a.info/classification/",
        "jita": "http://aims.fao.org/aos/jita/",
        "dive": "http://scubadive.networld.to/dive.rdf#",
        "countries": "http://eulersharp.sourceforge.net/2003/03swap/countries#",
        "wbp": "http://worldbank.270a.info/property/",
        "igeo": "http://rdf.insee.fr/def/geo#",
        "tr": "http://www.thomsonreuters.com/",
        "fcm": "http://eulersharp.sourceforge.net/2006/02swap/fcm#",
        "dco": "http://info.deepcarbon.net/schema#",
        "metalex": "http://www.metalex.eu/schema/1.0#",
        "artstor": "http://simile.mit.edu/2003/10/ontologies/artstor#",
        "bne": "http://datos.bne.es/resource/",
        "rlno": "http://rdflivenews.aksw.org/ontology/",
        "fc": "http://www.freeclass.eu/freeclass_v1#",
        "xds": "http://www.w3.org/2001/XMLSchema#",
        "ekaw": "http://data.semanticweb.org/conference/ekaw/2012/complete/",
        "scowt": "http://purl.org/weso/ontologies/scowt#",
        "fls": "http://lukasblaho.sk/football_league_schema#",
        "shv": "http://ns.aksw.org/spatialHierarchy/",
        "out": "http://ontologies.hypios.com/out#",
        "un": "http://www.w3.org/2007/ont/unit#",
        "fd": "http://foodable.co/ns/",
        "rad": "http://www.w3.org/ns/rad#",
        "cex": "http://purl.org/weso/computex/ontology#",
        "visit": "http://purl.org/net/vocab/2004/07/visit#",
        "pom": "http://maven.apache.org/POM/4.0.0#",
        "semtweet": "http://semantictweet.com/",
        "iao": "http://purl.obolibrary.org/obo/iao.owl#",
        "admssw": "http://purl.org/adms/sw/",
        "infosys": "http://www.infosys.com/",
        "omv": "http://omv.ontoware.org/2005/05/ontology#",
        "lex": "http://purl.org/lex#",
        "tmpl": "http://purl.org/restdesc/http-template#",
        "cidoccrm": "http://purl.org/NET/cidoc-crm/core#",
        "geom": "http://data.ign.fr/def/geometrie#",
        "osn": "http://spatial.ucd.ie/lod/osn/",
        "mte": "http://nl.ijs.si/ME/owl/",
        "units": "http://eulersharp.sourceforge.net/2003/03swap/units#",
        "intervals": "http://reference.data.gov.uk/def/intervals/",
        "penn": "http://purl.org/olia/penn.owl#",
        "cpm": "http://catalogus-professorum.org/cpm/2/",
        "wm": "http://ns.inria.fr/webmarks#",
        "rda": "http://www.rdaregistry.info/",
        "sgv": "http://www.w3.org/TR/SVG/",
        "hgnc": "http://bio2rdf.org/hgnc:",
        "pkmn": "http://pokedex.dataincubator.org/pkm/",
        "pext": "http://www.ontotext.com/proton/protonext#",
        "lr": "http://linkedrecipes.org/schema/",
        "pol": "http://escience.rpi.edu/ontology/semanteco/2/0/pollution.owl#",
        "oax": "http://www.w3.org/ns/openannotation/extensions/",
        "sdo": "http://schema.org/",
        "ic": "http://imi.go.jp/ns/core/rdf#",
        "tei": "http://www.tei-c.org/ns/1.0/",
        "algo": "http://securitytoolbox.appspot.com/securityAlgorithms#",
        "vivo": "http://vivoweb.org/ontology/core#",
        "commons": "http://commons.psi.enakting.org/def/",
        "htir": "http://www.w3.org/2011/http#",
        "spif": "http://spinrdf.org/spif#",
        "agrelon": "http://d-nb.info/standards/elementset/agrelon#",
        "wao": "http://webtlab.it.uc3m.es/2010/10/WebAppsOntology#",
        "wp": "http://vocabularies.wikipathways.org/wp#",
        "oper": "http://sweet.jpl.nasa.gov/2.0/mathOperation.owl#",
        "wfprov": "http://purl.org/wf4ever/wfprov#",
        "vaem": "http://www.linkedmodel.org/schema/vaem#",
        "bp": "http://open-services.net/ns/basicProfile#",
        "health": "http://purl.org/twc/health/vocab/",
        "clinproc": "http://www.agfa.com/w3c/2009/clinicalProcedure#",
        "greg": "http://kasei.us/about/foaf.xrdf#",
        "ipad": "http://www.padinthecity.com/",
        "flow": "http://www.w3.org/2005/01/wf/flow#",
        "ple": "http://pleiades.stoa.org/places/",
        "environ": "http://eulersharp.sourceforge.net/2003/03swap/environment#",
        "fl": "http://eulersharp.sourceforge.net/2003/03swap/fl-rules#",
        "dsp": "http://purl.org/metainfo/terms/dsp#",
        "ogorg": "http://opengraph.org/schema/",
        "pronom": "http://reference.data.gov.uk/technical-registry/",
        "coeus": "http://bioinformatics.ua.pt/coeus/",
        "set": "http://www.w3.org/2000/10/swap/set#",
        "nxp": "http://purl.org/nxp/schema/v1/",
        "rating": "http://www.tvblob.com/ratings/#",
        "frapo": "http://purl.org/cerif/frapo/",
        "myprefix": "http://myprefix.org/",
        "aersv": "http://aers.data2semantics.org/vocab/",
        "gxa": "http://www.ebi.ac.uk/gxa/",
        "role": "https://w3id.org/role/",
        "hcard": "http://purl.org/uF/hCard/terms/",
        "transit": "http://vocab.org/transit/terms/",
        "vocab": "http://rdf.ontology2.com/vocab#",
        "bbc": "http://www.bbc.co.uk/ontologies/news/",
        "sql": "http://ns.inria.fr/ast/sql#",
        "rv": "http://wifo-ravensburg.de/semanticweb.rdf#",
        "pne": "http://data.press.net/ontology/event/",
        "namespaces": "https://vg.no/",
        "oac": "http://www.openannotation.org/ns/",
        "wscaim": "http://www.openk.org/wscaim.owl#",
        "ngeoi": "http://vocab.lenka.no/geo-deling#",
        "soap": "http://www.w3.org/2003/05/soap-envelope/",
        "re": "http://www.w3.org/2000/10/swap/reason#",
        "crtv": "http://open-services.net/ns/crtv#",
        "sem": "http://semanticweb.cs.vu.nl/2009/11/sem/",
        "aerols": "http://xmlns.com/aerols/0.1/",
        "mime": "https://www.iana.org/assignments/media-types/",
        "telix": "http://purl.org/telix#",
        "hxl": "http://hxl.humanitarianresponse.info/ns/#",
        "rdfdf": "http://www.openlinksw.com/virtrdf-data-formats#",
        "aos": "http://rdf.muninn-project.org/ontologies/appearances#",
        "p20": "http://zbw.eu/beta/p20/vocab/",
        "xch": "http://oanda2rdf.appspot.com/xch/",
        "opmw": "http://www.opmw.org/ontology/",
        "fingal": "http://vocab.deri.ie/fingal#",
        "geof": "http://www.opengis.net/def/function/geosparql/",
        "quantities": "http://eulersharp.sourceforge.net/2003/03swap/quantitiesExtension#",
        "wikidata": "http://www.wikidata.org/entity/",
        "saxon": "http://saxon.sf.net/",
        "sdgp": "http://stats.data-gov.ie/property/",
        "atomrdf": "http://atomowl.org/ontologies/atomrdf#",
        "goef": "http://purl.org/twc/vocab/goef#",
        "ccard": "http://purl.org/commerce/creditcard#",
        "bcnnorms": "http://datos.bcn.cl/ontologies/bcn-norms#",
        "nuts": "http://dd.eionet.europa.eu/vocabulary/common/nuts/",
        "mtecore": "http://purl.org/olia/mte/multext-east.owl#",
        "httpm": "http://www.w3.org/2011/http-methods#",
        "func": "http://www.w3.org/2007/rif-builtin-function#",
        "aims": "http://aims.fao.org/aos/common/",
        "l4a": "http://labels4all.info/ns/",
        "dl": "http://ontology.ip.rm.cnr.it/ontologies/DOLCE-Lite#",
        "aigp": "http://swat.cse.lehigh.edu/resources/onto/aigp.owl#",
        "campsite": "http://www.openlinksw.com/campsites/schema#",
        "identity": "http://purl.org/twc/ontologies/identity.owl#",
        "wf": "http://www.w3.org/2005/01/wf/flow#",
        "visko": "http://trust.utep.edu/visko/ontology/visko-operator-v3.owl#",
        "pna": "http://data.press.net/ontology/asset/",
        "protegedc": "http://protege.stanford.edu/plugins/owl/dc/protege-dc.owl#",
        "ends": "http://labs.mondeca.com/vocab/endpointStatus#",
        "kupkb": "http://www.e-lico.eu/data/kupkb/",
        "wapp": "http://ns.rww.io/wapp#",
        "d2r": "http://sites.wiwiss.fu-berlin.de/suhl/bizer/d2r-server/config.rdf#",
        "dssn": "http://purl.org/net/dssn/",
        "osr": "http://dati.senato.it/osr/",
        "category": "http://dbpedia.org/resource/Category:",
        "c4dm": "http://purl.org/NET/c4dm/event.owl#",
        "carfo": "http://purl.org/carfo#",
        "tripfs2": "http://purl.org/tripfs/2010/06#",
        "iot": "http://www.linkedthings.com/iot/",
        "fct": "http://openlinksw.com/services/facets/1.0/",
        "mpeg7": "http://rhizomik.net/ontologies/2005/03/Mpeg7-2001.owl#",
        "sig": "http://purl.org/signature#",
        "np": "http://www.nanopub.org/nschema#",
        "eye": "http://jena.hpl.hp.com/Eyeball#",
        "hg": "http://www.holygoat.co.uk/owl/redwood/0.1/tags/",
        "prolog": "http://eulersharp.sourceforge.net/2003/03swap/prolog#",
        "oj": "http://ontojob.at/",
        "wfm": "http://purl.org/net/wf-motifs#",
        "kw": "http://kwantu.net/kw/",
        "cdtype": "http://purl.org/cld/cdtype/",
        "faldo": "http://biohackathon.org/resource/faldo#",
        "xt": "http://purl.org/twc/vocab/cross-topix#",
        "biordf": "http://purl.org/net/biordfmicroarray/ns#",
        "coun": "http://www.daml.org/2001/09/countries/iso-3166-ont#",
        "iso": "http://purl.org/iso25964/skos-thes#",
        "rec54": "http://www.w3.org/2001/02pd/rec54.rdf#",
        "recipe": "http://linkedrecipes.org/schema/",
        "grs": "http://www.georss.org/georss/",
        "doco": "http://purl.org/spar/doco/",
        "diseasome": "http://www4.wiwiss.fu-berlin.de/diseasome/resource/diseasome/",
        "genea": "http://www.owl-ontologies.com/generations.owl#",
        "zoomaterms": "http://rdf.ebi.ac.uk/vocabulary/zooma/",
        "vcardx": "http://buzzword.org.uk/rdf/vcardx#",
        "reve": "http://data.eurecom.fr/ontology/reve#",
        "xmls": "http://www.w3.org/2001/XMLSchema#",
        "lod2": "http://lod2.eu/schema/",
        "frbrcore": "http://purl.org/vocab/frbr/core#",
        "hints2005": "http://purl.org/twc/cabig/model/HINTS2005-1.owl#",
        "overheid": "http://standaarden.overheid.nl/owms/",
        "open": "http://open.vocab.org/terms/",
        "cb": "http://cbasewrap.ontologycentral.com/vocab#",
        "occult": "http://data.totl.net/occult/",
        "osmsemnet": "http://spatial.ucd.ie/2012/08/osmsemnet/",
        "fea": "http://vocab.data.gov/def/fea#",
        "mohammad": "http://manesht.ir/",
        "gesis": "http://lod.gesis.org/lodpilot/ALLBUS/vocab.rdf#",
        "b2rpubchem": "http://bio2rdf.org/ns/ns/ns/pubchem#",
        "rpubl": "http://rinfo.lagrummet.se/ns/2008/11/rinfo/publ#",
        "marshall": "http://sites.google.com/site/xgmaitc/",
        "dbyago": "http://dbpedia.org/class/yago/",
        "place": "http://purl.org/ontology/places/",
        "poder": "http://poderopedia.com/vocab/",
        "lh": "http://vocab.inf.ed.ac.uk/library/holdings#",
        "malignneo": "http://www.agfa.com/w3c/2009/malignantNeoplasm#",
        "s2s": "http://escience.rpi.edu/ontology/sesf/s2s/4/0/",
        "xlink": "http://www.w3.org/1999/xlink/",
        "bcncon": "http://datos.bcn.cl/ontologies/bcn-congress#",
        "puelia": "http://kwijibo.talis.com/vocabs/puelia#",
        "moby": "http://www.mygrid.org.uk/mygrid-moby-service#",
        "orca": "http://geni-orca.renci.org/owl/topology.owl#",
        "okg": "http://openknowledgegraph.org/ontology/",
        "hifm": "http://purl.org/net/hifm/data#",
        "premis": "http://www.loc.gov/premis/rdf/v1#",
        "daiaserv": "http://purl.org/ontology/daia/Service/",
        "sioctypes": "http://rdfs.org/sioc/types#",
        "iron": "http://purl.org/ontology/iron#",
        "lgv": "http://linkedgeodata.org/ontology/",
        "npgd": "http://ns.nature.com/datasets/",
        "gfo": "http://www.onto-med.de/ontologies/gfo.owl#",
        "centrifuge": "http://purl.org/twc/vocab/centrifuge#",
        "dbt": "http://dbpedia.org/resource/Template:",
        "geofla": "http://data.ign.fr/ontologies/geofla#",
        "eseduc": "http://www.purl.org/ontologia/eseduc#",
        "transmed": "http://www.w3.org/2001/sw/hcls/ns/transmed/",
        "wiki": "http://en.wikipedia.org/wiki/",
        "chebi": "http://bio2rdf.org/chebi:",
        "oecd": "http://oecd.270a.info/dataset/",
        "npgg": "http://ns.nature.com/graphs/",
        "prf": "http://www.openmobilealliance.org/tech/profiles/UAPROF/ccppschema-20021212#",
        "odcs": "http://opendata.cz/infrastructure/odcleanstore/",
        "rich": "http://rdf.data-vocabulary.org/",
        "eumida": "http://data.kasabi.com/dataset/eumida/terms/",
        "sci": "http://data.scientology.org/ns/",
        "dcm": "http://dcm.com/",
        "str": "http://nlp2rdf.lod2.eu/schema/string/",
        "osukdt": "http://www.ordnancesurvey.co.uk/ontology/Datatypes.owl#",
        "omapi": "http://purl.org/omapi/0.2/#",
        "l4lod": "http://ns.inria.fr/l4lod/v2/",
        "ql": "http://www.w3.org/2004/ql#",
        "emp": "http://purl.org/ctic/empleo/oferta#",
        "dawgt": "http://www.w3.org/2001/sw/DataAccess/tests/test-dawg#",
        "frad": "http://iflastandards.info/ns/fr/frad/",
        "laposte": "http://data.lirmm.fr/ontologies/laposte#",
        "rdaw": "http://rdaregistry.info/Elements/w/",
        "ling": "http://purl.org/voc/ling/",
        "geovocab": "http://geovocab.org/",
        "pam": "http://prismstandard.org/namespaces/pam/2.0/",
        "camelot": "http://vocab.ox.ac.uk/camelot#",
        "no": "http://km.aifb.kit.edu/projects/numbers/number#",
        "prism21": "http://prismstandard.org/namespaces/basic/2.1/",
        "cold": "http://purl.org/configurationontology#",
        "kbp": "http://tackbp.org/2013/ontology#",
        "italy": "http://data.kasabi.com/dataset/italy/schema/",
        "bsb": "http://opacplus.bsb-muenchen.de/title/",
        "cts2": "http://schema.omg.org/spec/CTS2/1.0/",
        "skiresort": "http://www.openlinksw.com/ski_resorts/schema#",
        "bcnbio": "http://datos.bcn.cl/ontologies/bcn-biographies#",
        "ecb": "http://ecb.270a.info/class/1.0/",
        "germplasm": "http://purl.org/germplasm/terms#",
        "ebu": "http://semantic.eurobau.com/eurobau-utility.owl#",
        "tvc": "http://www.essepuntato.it/2012/04/tvc/",
        "alchemy": "http://rdf.alchemyapi.com/rdf/v1/s/aapi-schema#",
        "nsl": "http://purl.org/ontology/storyline/",
        "rssynd": "http://web.resource.org/rss/1.0/modules/syndication/",
        "stream": "http://dbpedia.org/ontology/Stream/",
        "osp": "http://data.lirmm.fr/ontologies/osp#",
        "tblcard": "http://www.w3.org/People/Berners-Lee/card#",
        "gbv": "http://purl.org/ontology/gbv/",
        "wsc": "http://www.openk.org/wscaim.owl#",
        "npgx": "http://ns.nature.com/extensions/",
        "swpo": "http://sw-portal.deri.org/ontologies/swportal#",
        "bm": "http://bio2rdf.org/",
        "dpl": "http://dbpedialite.org/things/",
        "mrel": "http://id.loc.gov/vocabulary/relators/",
        "wi": "http://purl.org/ontology/wi/core#",
        "ec": "http://eulergui.sourceforge.net/contacts.owl.n3#",
        "ecpo": "http://purl.org/ontology/ecpo#",
        "prvt": "http://purl.org/net/provenance/types#",
        "eui": "http://institutions.publicdata.eu/#",
        "graffle": "http://purl.org/twc/vocab/vsr/graffle#",
        "lcy": "http://purl.org/vocab/lifecycle/schema#",
        "r4ta": "http://ns.inria.fr/ratio4ta/v1#",
        "lexvo": "http://lexvo.org/ontology#",
        "article": "http://ogp.me/ns/article#",
        "qrl": "http://www.aifb.kit.edu/project/ld-retriever/qrl#",
        "vsto": "http://escience.rpi.edu/ontology/vsto/2/0/vsto.owl#",
        "webbox": "http://webbox.ecs.soton.ac.uk/ns#",
        "lldr": "http://purl.oclc.org/NET/lldr/ns#",
        "nyt": "http://data.nytimes.com/",
        "mm": "http://linkedmultimedia.org/sparql-mm/ns/2.0.0/function#",
        "dcndl": "http://ndl.go.jp/dcndl/terms/",
        "wkd": "http://schema.wolterskluwer.de/",
        "pso": "http://purl.org/spar/pso/",
        "dcite": "http://purl.org/spar/datacite/",
        "mp": "http://jicamaro.info/mp#",
        "eunis": "http://eunis.eea.europa.eu/rdf/species-schema.rdf#",
        "dctypes": "http://purl.org/dc/dcmitype/",
        "sso": "http://nlp2rdf.lod2.eu/schema/sso/",
        "vsw": "http://verticalsearchworks.com/ontology/",
        "qud": "http://qudt.org/1.1/schema/qudt#",
        "fos": "http://futurios.org/fos/spec/",
        "wl": "http://www.wsmo.org/ns/wsmo-lite#",
        "csm": "http://purl.org/csm/1.0#",
        "api": "http://purl.org/linked-data/api/vocab#",
        "cvbase": "http://purl.org/captsolo/resume-rdf/0.2/base#",
        "vsws": "http://verticalsearchworks.com/ontology/synset#",
        "cf": "http://mmisw.org/ont/cf/parameter/",
        "aers": "http://aers.data2semantics.org/resource/",
        "vrank": "http://purl.org/voc/vrank#",
        "mil": "http://rdf.muninn-project.org/ontologies/military#",
        "w3con": "http://www.w3.org/2000/10/swap/pim/contact#",
        "comm": "http://vocab.resc.info/communication#",
        "paia": "http://purl.org/ontology/paia#",
        "mads": "http://www.loc.gov/mads/rdf/v1#",
        "scms": "http://ns.aksw.org/scms/annotations/",
        "dvia": "http://data.eurecom.fr/ontology/dvia#",
        "te": "http://www.w3.org/2006/time-entry#",
        "iol": "http://www.ontologydesignpatterns.org/ont/dul/IOLite.owl#",
        "ds": "http://purl.org/ctic/dcat#",
        "r2rml": "http://www.w3.org/ns/r2rml#",
        "psh": "http://psh.techlib.cz/skos/",
        "tisc": "http://observedchange.com/tisc/ns#",
        "w3po": "http://purl.org/provenance/w3p/w3po#",
        "rdamedia": "http://rdvocab.info/termList/RDAMediaType/",
        "voidp": "http://www.enakting.org/provenance/voidp/",
        "stac": "http://securitytoolbox.appspot.com/stac#",
        "bwb": "http://doc.metalex.eu/bwb/ontology/",
        "nidm": "http://nidm.nidash.org/",
        "cis": "http://purl.org/NET/cloudisus#",
        "wsl": "http://www.wsmo.org/ns/wsmo-lite#",
        "fcp": "http://www.newmedialab.at/fcp/",
        "qvoc": "http://mlode.nlp2rdf.org/quranvocab#",
        "rso": "http://www.researchspace.org/ontology/",
        "telmap": "http://purl.org/telmap/",
        "oarj": "http://opendepot.org/reference/linked/1.0/",
        "infection": "http://www.agfa.com/w3c/2009/infectiousDisorder#",
        "rdacontent": "http://rdvocab.info/termList/RDAContentType/",
        "conf": "http://richard.cyganiak.de/2007/pubby/config.rdf#",
        "dqm": "http://purl.org/dqm-vocabulary/v1/dqm#",
        "archdesc": "http://archdesc.info/archEvent#",
        "harrisons": "http://harrisons.cc/",
        "opl": "http://openlinksw.com/schema/attribution#",
        "disease": "http://www.agfa.com/w3c/2009/humanDisorder#",
        "rdacarrier": "http://rdvocab.info/termList/RDACarrierType/",
        "strdf": "http://strdf.di.uoa.gr/ontology#",
        "msr": "http://www.telegraphis.net/ontology/measurement/measurement#",
        "cpa": "http://www.ontologydesignpatterns.org/schemas/cpannotationschema.owl#",
        "rdarole": "http://rdvocab.info/roles/",
        "wf4ever": "http://purl.org/wf4ever/wf4ever#",
        "cosmo": "http://purl.org/ontology/cosmo#",
        "lodac": "http://lod.ac/ns/lodac#",
        "swpatho": "http://swpatho.ag-nbi.de/context/meta.owl#",
        "curr": "https://w3id.org/cc#",
        "sh": "http://www.w3.org/ns/shacl#",
        "onyx": "http://www.gsi.dit.upm.es/ontologies/onyx/ns#",
        "crv": "http://purl.org/twc/vocab/datacarver#",
        "rdae": "http://rdaregistry.info/Elements/e/",
        "soc": "http://purl.org/net/hdlipcores/ontology/soc#",
        "water": "http://escience.rpi.edu/ontology/semanteco/2/0/water.owl#",
        "rlnr": "http://rdflivenews.aksw.org/resource/",
        "steel": "http://ontorule-project.eu/resources/steel-30#",
        "bibframe": "http://bibframe.org/vocab/",
        "wikterms": "http://wiktionary.dbpedia.org/terms/",
        "scufl2": "http://ns.taverna.org.uk/2010/scufl2#",
        "fincaselaw": "http://purl.org/finlex/schema/oikeus/",
        "part": "http://purl.org/vocab/participation/schema#",
        "ptop": "http://www.ontotext.com/proton/protontop#",
        "won": "http://purl.org/webofneeds/model#",
        "qu": "http://purl.oclc.org/NET/ssnx/qu/qu#",
        "twaapi": "http://purl.org/twc/vocab/aapi-schema#",
        "osspr": "http://data.ordnancesurvey.co.uk/ontology/spatialrelations/",
        "pkgsrc": "http://pkgsrc.co/schema#",
        "swperson": "http://data.semanticweb.org/person/",
        "qb4o": "http://purl.org/olap#",
        "prviv": "http://purl.org/net/provenance/integrity#",
        "daisy": "http://www.daisy.org/z3998/2012/vocab/",
        "sdmxd": "http://purl.org/linked-data/sdmx/2009/dimension#",
        "odv": "http://reference.data.gov.uk/def/organogram/",
        "up": "http://users.ugent.be/~tdenies/up/",
        "jjd": "http://www.joshuajeeson.com/",
        "meb": "http://rdf.myexperiment.org/ontologies/base/",
        "rdarel": "http://rdvocab.info/RDARelationshipsWEMI/",
        "situ": "http://www.ontologydesignpatterns.org/cp/owl/situation.owl#",
        "roevo": "http://purl.org/wf4ever/roevo#",
        "va": "http://code-research.eu/ontology/visual-analytics#",
        "gastro": "http://www.ebsemantics.net/gastro#",
        "moac": "http://observedchange.com/moac/ns#",
        "pubmed": "http://bio2rdf.org/pubmed_vocabulary:",
        "frbrer": "http://iflastandards.info/ns/fr/frbr/frbrer/",
        "finlaw": "http://purl.org/finlex/schema/laki/",
        "radion": "http://www.w3.org/ns/radion#",
        "ctorg": "http://purl.org/ctic/infraestructuras/organizacion#",
        "hlygt": "http://www.holygoat.co.uk/owl/redwood/0.1/tags/",
        "viskov": "http://trust.utep.edu/visko/ontology/visko-view-v3.owl#",
        "ru": "http://purl.org/imbi/ru-meta.owl#",
        "onssprel": "http://www.ordnancesurvey.co.uk/ontology/SpatialRelations/v0.2/SpatialRelations.owl#",
        "refe": "http://orion.tw.rpi.edu/~xgmatwc/refe/",
        "pizza": "http://www.co-ode.org/ontologies/pizza/pizza.owl#",
        "ep": "http://eprints.org/ontology/",
        "emoca": "http://ns.inria.fr/emoca#",
        "rdafrbr": "http://rdvocab.info/uri/schema/FRBRentitiesRDA/",
        "op": "http://environment.data.gov.au/def/op#",
        "vdpp": "http://data.lirmm.fr/ontologies/vdpp#",
        "dbptmpl": "http://dbpedia.org/resource/Template:",
        "cbase": "http://ontologycentral.com/2010/05/cb/vocab#",
        "ox": "http://vocab.ox.ac.uk/projectfunding#",
        "quty": "http://www.telegraphis.net/ontology/measurement/quantity#",
        "csp": "http://vocab.deri.ie/csp#",
        "rdf123": "http://rdf123.umbc.edu/ns/",
        "od": "http://purl.org/twc/vocab/opendap#",
        "poste": "http://data.lirmm.fr/ontologies/poste#",
        "accom": "http://purl.org/acco/ns#",
        "who": "http://www.who.int/vocab/ontology#",
        "dbpr": "http://dbpedia.org/resource/",
        "viskoo": "http://trust.utep.edu/visko/ontology/visko-operator-v3.owl#",
        "lexcz": "http://purl.org/lex/cz#",
        "pim": "http://www.w3.org/ns/pim/space#",
        "roterms": "http://purl.org/wf4ever/roterms#",
        "biro": "http://purl.org/spar/biro/",
        "gawd": "http://gawd.atlantides.org/terms/",
        "locwd": "http://purl.org/locwd/schema#",
        "wn20": "http://www.w3.org/2006/03/wn/wn20/",
        "ecos": "http://kmm.lboro.ac.uk/ecos/1.0#",
        "lsc": "http://linkedscience.org/lsc/ns#",
        "oecc": "http://www.oegov.org/core/owl/cc#",
        "icane": "http://www.icane.es/opendata/vocab#",
        "bihap": "http://bihap.kb.gov.tr/ontology/",
        "wlo": "http://purl.org/ontology/wo/",
        "pingback": "http://purl.org/net/pingback/",
        "vcard2006": "http://www.w3.org/2006/vcard/ns#",
        "infor": "http://www.ontologydesignpatterns.org/cp/owl/informationrealization.owl#",
        "ssso": "http://purl.org/ontology/ssso#",
        "olad": "http://openlad.org/vocab#",
        "mvco": "http://purl.oclc.org/NET/mvco.owl#",
        "saif": "http://wwwiti.cs.uni-magdeburg.de/~srahman/",
        "owlse": "http://www.daml.org/services/owl-s/1.2/generic/Expression.owl#",
        "itsmo": "http://ontology.it/itsmo/v1#",
        "ontolex": "http://www.w3.org/ns/lemon/ontolex#",
        "sad": "http://vocab.deri.ie/sad#",
        "osgeom": "http://data.ordnancesurvey.co.uk/ontology/geometry/",
        "dn": "http://purl.org/datanode/ns/",
        "bcngeo": "http://datos.bcn.cl/ontologies/bcn-geographics#",
        "penis": "http://penis.to/#",
        "vvo": "http://purl.org/vvo/ns#",
        "seq": "http://www.ontologydesignpatterns.org/cp/owl/sequence.owl#",
        "dr": "http://purl.org/swan/2.0/discourse-relationships/",
        "vapour": "http://vapour.sourceforge.net/vocab.rdf#",
        "elec": "http://purl.org/ctic/sector-publico/elecciones#",
        "ecrm": "http://erlangen-crm.org/current/",
        "spt": "http://spitfire-project.eu/ontology/ns/",
        "snarm": "http://rdf.myexperiment.org/ontologies/snarm/",
        "ostop": "http://www.ordnancesurvey.co.uk/ontology/Topography/v0.1/Topography.owl#",
        "particip": "http://purl.org/vocab/participation/schema#",
        "graves": "http://rdf.muninn-project.org/ontologies/graves#",
        "biotop": "http://purl.org/biotop/biotop.owl#",
        "limoo": "http://purl.org/LiMo/0.1/",
        "rdai": "http://rdaregistry.info/Elements/i/",
        "gadm": "http://gadm.geovocab.org/ontology#",
        "delta": "http://www.w3.org/2004/delta#",
        "lime": "http://www.w3.org/ns/lemon/lime#",
        "s3db": "http://www.s3db.org/core#",
        "drm": "http://vocab.data.gov/def/drm#",
        "geosp": "http://rdf.geospecies.org/ont/geospecies#",
        "lingvo": "http://www.lingvoj.org/ontology#",
        "mged": "http://mged.sourceforge.net/ontologies/MGEDOntology.owl#",
        "stats": "http://purl.org/rdfstats/stats#",
        "ntag": "http://ns.inria.fr/nicetag/2010/09/09/voc#",
        "mammal": "http://lod.taxonconcept.org/ontology/p01/Mammalia/index.owl#",
        "dbtont": "http://dbtropes.org/ont/",
        "evident": "http://purl.org/net/evident#",
        "amalgame": "http://purl.org/vocabularies/amalgame#",
        "geop": "http://aims.fao.org/aos/geopolitical.owl#",
        "frsad": "http://iflastandards.info/ns/fr/frsad/",
        "agls": "http://www.agls.gov.au/agls/terms/",
        "gnvc": "http://purl.org/gc/",
        "ogbd": "http://www.ogbd.fr/2012/ontologie#",
        "tis": "http://www.ontologydesignpatterns.org/cp/owl/timeindexedsituation.owl#",
        "obsm": "http://rdf.geospecies.org/methods/observationMethod#",
        "ontopic": "http://www.ontologydesignpatterns.org/ont/dul/ontopic.owl#",
        "semio": "http://www.lingvoj.org/semio#",
        "odrl": "http://www.w3.org/ns/odrl/2/",
        "turismo": "http://idi.fundacionctic.org/cruzar/turismo#",
        "uta": "http://uptheasset.org/ontology#",
        "odapp": "http://vocab.deri.ie/odapp#",
        "cmd": "http://clarin.eu/cmd#",
        "geocontext": "http://www.geocontext.org/publ/2013/vocab#",
        "opmo": "http://openprovenance.org/model/opmo#",
        "crsw": "http://courseware.rkbexplorer.com/ontologies/courseware#",
        "pwo": "http://purl.org/spar/pwo/",
        "gq": "http://genomequest.com/",
        "oboinowl": "http://www.geneontology.org/formats/oboInOwl#",
        "dcoid": "http://dx.deepcarbon.net/",
        "rdag3": "http://rdvocab.info/ElementsGr3/",
        "odpart": "http://www.ontologydesignpatterns.org/cp/owl/participation.owl#",
        "ordf": "http://purl.org/NET/ordf/",
        "vin": "http://www.w3.org/TR/2003/PR-owl-guide-20031209/wine#",
        "fao": "http://fao.270a.info/dataset/",
        "gcis": "http://data.globalchange.gov/gcis.owl#",
        "tsioc": "http://rdfs.org/sioc/types#",
        "gnm": "http://www.geonames.org/ontology/mappings/",
        "kai": "http://kai.uni-kiel.de/",
        "asgv": "http://aims.fao.org/aos/agrovoc/",
        "lmm2": "http://www.ontologydesignpatterns.org/ont/lmm/LMM_L2.owl#",
        "st": "http://semweb.mmlab.be/ns/stoptimes#",
        "laabs": "http://dbpedia.org/resource/",
        "viso": "http://purl.org/viso/",
        "edgar": "http://edgarwrap.ontologycentral.com/vocab/edgar#",
        "pproc": "http://contsem.unizar.es/def/sector-publico/pproc#",
        "geod": "http://vocab.lenka.no/geo-deling#",
        "coll": "http://purl.org/co/",
        "tddo": "http://databugger.aksw.org/ns/core#",
        "rdag1": "http://rdvocab.info/Elements/",
        "seas": "https://w3id.org/seas/",
        "rdfdata": "http://rdf.data-vocabulary.org/rdf.xml#",
        "passim": "http://data.lirmm.fr/ontologies/passim#",
        "vgo": "http://purl.org/net/VideoGameOntology#",
        "ses": "http://lod.taxonconcept.org/ses/",
        "mocanal": "http://www.semanticweb.org/asow/ontologies/2013/9/untitled-ontology-36#",
        "eurlex": "http://eur-lex.publicdata.eu/ontology/",
        "provone": "http://purl.org/provone#",
        "ftcontent": "http://www.ft.com/ontology/content/",
        "raul": "http://vocab.deri.ie/raul#",
        "trait": "http://contextus.net/ontology/ontomedia/ext/common/trait#",
        "dogont": "http://elite.polito.it/ontologies/dogont.owl#",
        "li": "http://def.seegrid.csiro.au/isotc211/iso19115/2003/lineage#",
        "oprovo": "http://openprovenance.org/ontology#",
        "muldicat": "http://iflastandards.info/ns/muldicat#",
        "stanford": "http://purl.org/olia/stanford.owl#",
        "lmm1": "http://www.ontologydesignpatterns.org/ont/lmm/LMM_L1.owl#",
        "mds": "http://doc.metalex.eu/id/",
        "my": "http://www.mobile.com/model/",
        "bk": "http://www.provbook.org/ns/#",
        "osadm": "http://data.ordnancesurvey.co.uk/ontology/admingeo/",
        "being": "http://purl.org/ontomedia/ext/common/being#",
        "san": "http://www.irit.fr/recherches/MELODI/ontologies/SAN#",
        "tao": "http://vocab.deri.ie/tao#",
        "pvcs": "http://purl.org/twc/vocab/pvcs#",
        "mb": "http://dbtune.org/musicbrainz/resource/instrument/",
        "opencyc": "http://sw.opencyc.org/concept/",
        "bco": "http://purl.obolibrary.org/obo/bco.owl#",
        "oliasystem": "http://purl.org/olia/system.owl#",
        "pois": "http://purl.oclc.org/POIS/vcblr#",
        "fma": "http://sig.uw.edu/fma#",
        "ebucore": "http://www.ebu.ch/metadata/ontologies/ebucore/ebucore#",
        "opllic": "http://www.openlinksw.com/ontology/licenses#",
        "tw": "http://tw.rpi.edu/schema/",
        "wno": "http://wordnet-rdf.princeton.edu/ontology#",
        "of": "http://owlrep.eu01.aws.af.cm/fridge#",
        "dpd": "http://www.kanzaki.com/ns/dpd#",
        "dbrc": "http://dbpedia.org/resource/Category:",
        "rdl": "http://data.posccaesar.org/rdl/",
        "bis": "http://bis.270a.info/dataset/",
        "app": "http://jmvanel.free.fr/ontology/software_applications.n3#",
        "mt": "http://www.w3.org/2001/sw/DataAccess/tests/test-manifest#",
        "defns": "http://www.openarchives.org/OAI/2.0/",
        "agro": "http://agrinepaldata.com/vocab/",
        "openskos": "http://openskos.org/xmlns#",
        "lu": "http://www.ontologydesignpatterns.org/ont/framenet/abox/lu/",
        "dbpedia2": "http://dbpedia.org/property/",
        "bag": "http://bag.basisregistraties.overheid.nl/def/bag#",
        "call": "http://webofcode.org/wfn/call:",
        "csv": "http://vocab.sindice.net/csv/",
        "oplprod": "http://www.openlinksw.com/ontology/products#",
        "pnc": "http://data.press.net/ontology/classification/",
        "onc": "http://www.ics.forth.gr/isl/oncm/core#",
        "cjr": "http://vocab.linkeddata.es/datosabiertos/def/urbanismo-infraestructuras/callejero#",
        "erce": "http://xxefe.de/",
        "omnlife": "http://open-multinet.info/ontology/omn-lifecycle#",
        "eli": "http://data.europa.eu/eli/ontology#",
        "fbgeo": "http://rdf.freebase.com/ns/location/geocode/",
        "vra": "http://simile.mit.edu/2003/10/ontologies/vraCore3#",
        "imf": "http://imf.270a.info/dataset/",
        "oplres": "http://www.openlinksw.com/ontology/restrictions#",
        "fam": "http://vocab.fusepool.info/fam#",
        "cdc": "http://www.contextdatacloud.org/resource/",
        "language": "http://id.loc.gov/vocabulary/iso639-1/",
        "thors": "http://resource.geosciml.org/ontology/timescale/thors#",
        "uis": "http://uis.270a.info/dataset/",
        "sam": "http://def.seegrid.csiro.au/isotc211/iso19156/2011/sampling#",
        "location": "http://sw.deri.org/2006/07/location/loc#",
        "mico": "http://www.mico-project.eu/ns/platform/1.0/schema#",
        "frb": "http://frb.270a.info/dataset/",
        "ecc": "https://ns.eccenca.com/",
        "msm": "http://iserve.kmi.open.ac.uk/ns/msm#",
        "parl": "http://reference.data.gov.uk/def/parliament/",
        "bmo": "http://collection.britishmuseum.org/id/ontology/",
        "nxs": "http://www.neclimateus.org/",
        "agrd": "http://agrinepaldata.com/",
        "contsem": "http://contsem.unizar.es/def/sector-publico/contratacion#",
        "lfov": "https://w3id.org/legal_form#",
        "geos": "http://www.telegraphis.net/ontology/geography/geography#",
        "oad": "http://lod.xdams.org/reload/oad/",
        "videogame": "http://purl.org/net/vgo#",
        "skos08": "http://www.w3.org/2008/05/skos#",
        "lc": "http://semweb.mmlab.be/ns/linkedconnections#",
        "cmdm": "http://infra.clarin.eu/cmd/",
        "spdx": "http://spdx.org/rdf/terms#",
        "olac11": "http://www.language-archives.org/OLAC/1.1/",
        "bv": "http://purl.org/vocommons/bv#",
        "tm": "http://def.seegrid.csiro.au/isotc211/iso19108/2002/temporal#",
        "wfn": "http://webofcode.org/wfn/",
        "ext": "http://def.seegrid.csiro.au/isotc211/iso19115/2003/extent#",
        "omdoc": "http://omdoc.org/ontology/",
        "lso": "http://linkedspending.aksw.org/ontology/",
        "cl": "http://advene.org/ns/cinelab/",
        "guo": "http://purl.org/hpi/guo#",
        "ldr": "http://purl.oclc.org/NET/ldr/ns#",
        "odo": "http://ocean-data.org/schema/",
        "maso": "http://securitytoolbox.appspot.com/MASO#",
        "cmdi": "http://www.clarin.eu/cmd/",
        "bbcprov": "http://www.bbc.co.uk/ontologies/provenance/",
        "fcs": "http://clarin.eu/fcs/resource#",
        "static": "http://vocab-ld.org/vocab/static-ld#",
        "abs": "http://abs.270a.info/dataset/",
        "aws": "http://purl.oclc.org/NET/ssnx/meteo/aws#",
        "gf": "http://def.seegrid.csiro.au/isotc211/iso19109/2005/feature#",
        "bevon": "http://rdfs.co/bevon/",
        "oh": "http://semweb.mmlab.be/ns/oh#",
        "wdt": "http://www.wikidata.org/prop/direct/",
        "mmd": "http://musicbrainz.org/ns/mmd-1.0#",
        "odapps": "http://semweb.mmlab.be/ns/odapps#",
        "ruto": "http://rdfunit.aksw.org/ns/core#",
        "sru": "http://www.loc.gov/zing/srw/",
        "hr": "http://iserve.kmi.open.ac.uk/ns/hrests#",
        "deps": "http://ontologi.es/doap-deps#",
        "onisep": "http://rdf.onisep.fr/resource/",
        "dq": "http://def.seegrid.csiro.au/isotc211/iso19115/2003/dataquality#",
        "esaloj": "http://vocab.linkeddata.es/datosabiertos/def/turismo/alojamiento#",
        "smg": "http://ns.cerise-project.nl/energy/def/cim-smartgrid#",
        "dannet": "http://www.wordnet.dk/owl/instance/2009/03/instances/",
        "pnt": "http://data.press.net/ontology/tag/",
        "irsteaont": "http://ontology.irstea.fr/weather/ontology#",
        "taxon": "http://purl.org/biodiversity/taxon/",
        "gl": "http://schema.geolink.org/",
        "dbug": "http://ontologi.es/doap-bugs#",
        "llo": "http://lodlaundromat.org/ontology/",
        "sro": "http://salt.semanticauthoring.org/ontologies/sro#",
        "dicom": "http://purl.org/healthcarevocab/v1#",
        "gaf": "http://groundedannotationframework.org/",
        "form": "http://deductions-software.com/ontologies/forms.owl.ttl#",
        "olac": "http://www.language-archives.org/OLAC/1.0/",
        "bgcat": "http://bg.dbpedia.org/resource/?????????:",
        "mmt": "http://linkedmultimedia.org/sparql-mm/functions/temporal#",
        "jp1": "http://rdf.muninn-project.org/ontologies/jp1/",
        "wikim": "http://spi-fm.uca.es/spdef/models/genericTools/wikim/1.0#",
        "oan": "http://data.lirmm.fr/ontologies/oan/",
        "babelnet": "http://babelnet.org/2.0/",
        "pic": "http://www.ipaw.info/ns/picaso#",
        "sbench": "http://swat.cse.lehigh.edu/onto/univ-bench.owl#",
        "rdarel2": "http://metadataregistry.org/uri/schema/RDARelationshipsGR2/",
        "vext": "http://ldf.fi/void-ext#",
        "pco": "http://purl.org/procurement/public-contracts#",
        "citof": "http://www.essepuntato.it/2013/03/cito-functions#",
        "gov": "http://gov.genealogy.net/ontology.owl#",
        "nex": "http://www.nexml.org/2009/",
        "cpant": "http://purl.org/NET/cpan-uri/terms#",
        "pod": "https://project-open-data.cio.gov/v1.1/schema/#",
        "l2sp": "http://www.linked2safety-project.eu/properties/",
        "itm": "http://spi-fm.uca.es/spdef/models/genericTools/itm/1.0#",
        "oils": "http://lemon-model.net/oils#",
        "pattern": "http://www.essepuntato.it/2008/12/pattern#",
        "bgn": "http://bibliograph.net/schemas/",
        "rvl": "http://purl.org/rvl/",
        "shex": "http://www.w3.org/2013/ShEx/ns#",
        "lexicon": "http://www.example.org/lexicon#",
        "estrn": "http://vocab.linkeddata.es/datosabiertos/def/urbanismo-infraestructuras/transporte#",
        "basic": "http://def.seegrid.csiro.au/isotc211/iso19103/2005/basic#",
        "employee": "http://www.employee.com/data#",
        "holding": "http://purl.org/ontology/holding#",
        "gm": "http://def.seegrid.csiro.au/isotc211/iso19107/2003/geometry#",
        "psys": "http://www.ontotext.com/proton/protonsys#",
        "roadmap": "http://mappings.roadmap.org/",
        "sw": "http://linkedwidgets.org/statisticalwidget/ontology/",
        "sao": "http://salt.semanticauthoring.org/ontologies/sao#",
        "topo": "http://data.ign.fr/def/topo#",
        "isocat": "http://www.isocat.org/datcat/",
        "odrs": "http://schema.theodi.org/odrs#",
        "fp3": "http://vocab.fusepool.info/fp3#",
        "limo": "http://www.purl.org/limo-ontology/limo#",
        "whisky": "http://vocab.org/whisky/terms/",
        "lmf": "http://www.lexinfo.net/lmf#",
        "xlime": "http://xlime-project.org/vocab/",
        "scip": "http://lod.taxonconcept.org/ontology/sci_people.owl#",
        "mmf": "http://linkedmultimedia.org/sparql-mm/ns/1.0.0/function#",
        "cart": "http://purl.org/net/cartCoord#",
        "dsn": "http://purl.org/dsnotify/vocab/eventset/",
        "physo": "http://merlin.phys.uni.lodz.pl/onto/physo/physo.owl#",
        "acrt": "http://privatealpha.com/ontology/certification/1#",
        "tac": "http://ns.bergnet.org/tac/0.1/triple-access-control#",
        "wro": "http://purl.org/net/wf4ever/ro#",
        "friends": "http://www.openarchives.org/OAI/2.0/friends/",
        "gts": "http://resource.geosciml.org/ontology/timescale/gts#",
        "lda": "http://purl.org/linked-data/api/vocab#",
        "dpc": "http://hospee.org/ontologies/dpc/",
        "doas": "http://deductions.github.io/doas.owl.ttl#",
        "oplcert": "http://www.openlinksw.com/schemas/cert#",
        "galaksiya": "http://ontoloji.galaksiya.com/vocab/",
        "ccrel": "http://creativecommons.org/ns#",
        "oslo": "http://purl.org/oslo/ns/localgov#",
        "tavprov": "http://ns.taverna.org.uk/2012/tavernaprov/",
        "uri4uri": "http://uri4uri.net/vocab#",
        "shw": "http://paul.staroch.name/thesis/SmartHomeWeather.owl#",
        "ll": "http://lodlaundromat.org/resource/",
        "lio": "http://purl.org/net/lio#",
        "wn31": "http://wordnet-rdf.princeton.edu/wn31/",
        "bbccms": "http://www.bbc.co.uk/ontologies/cms/",
        "hdo": "http://www.samos.gr/ontologies/helpdeskOnto.owl#",
        "origins": "http://origins.link/",
        "estatwrap": "http://ontologycentral.com/2009/01/eurostat/ns#",
        "plo": "http://purl.org/net/po#",
        "pkm": "http://www.ontotext.com/proton/protonkm#",
        "rs": "http://spektrum.ctu.cz/ontologies/radio-spectrum#",
        "ls": "http://linkedspending.aksw.org/instance/",
        "voidext": "http://rdfs.org/ns/void-ext#",
        "h2o": "http://def.seegrid.csiro.au/isotc211/iso19150/-2/2012/basic#",
        "locah": "http://data.archiveshub.ac.uk/def/",
        "llm": "http://lodlaundromat.org/metrics/ontology/",
        "daq": "http://purl.org/eis/vocab/daq#",
        "security": "http://securitytoolbox.appspot.com/securityMain#",
        "trig": "http://www.w3.org/2004/03/trix/rdfg-1/",
        "scoro": "http://purl.org/spar/scoro/",
        "shoah": "http://dati.cdec.it/lod/shoah/",
        "nerd": "http://nerd.eurecom.fr/ontology#",
        "ost": "http://w3id.org/ost/ns#",
        "frame": "http://www.ontologydesignpatterns.org/ont/framenet/abox/frame/",
        "travel": "http://www.co-ode.org/roberts/travel.owl#",
        "esadm": "http://vocab.linkeddata.es/datosabiertos/def/sector-publico/territorio#",
        "oss": "http://opendata.caceres.es/def/ontosemanasanta#",
        "wn30": "http://purl.org/vocabularies/princeton/wn30/",
        "koly": "http://www.ensias.ma/",
        "bbccore": "http://www.bbc.co.uk/ontologies/coreconcepts/",
        "hp": "http://pictogram.tokyo/vocabulary#",
        "lpeu": "http://purl.org/linkedpolitics/vocabulary/eu/plenary/",
        "lindt": "https://w3id.org/lindt/voc#",
        "oplacl": "http://www.openlinksw.com/ontology/acl#",
        "rmo": "http://eatld.et.tu-dresden.de/rmo#",
        "geovoid": "http://purl.org/geovocamp/ontology/geovoid/",
        "ldvm": "http://linked.opendata.cz/ontology/ldvm/",
        "bner": "http://datos.bne.es/resource/",
        "spfood": "http://kmi.open.ac.uk/projects/smartproducts/ontologies/food.owl#",
        "keys": "http://purl.org/NET/c4dm/keys.owl#",
        "lofv": "http://purl.org/legal_form/vocab#",
        "zr": "http://explain.z3950.org/dtd/2.0/",
        "irstea": "http://ontology.irstea.fr/",
        "esequip": "http://vocab.linkeddata.es/datosabiertos/def/urbanismo-infraestructuras/equipamiento#",
        "stories": "http://purl.org/ontology/stories/",
        "kml": "http://www.opengis.net/kml/2.2#",
        "pni": "http://data.press.net/ontology/identifier/",
        "bibrm": "http://vocab.ub.uni-leipzig.de/bibrm/",
        "xapi": "http://purl.org/xapi/ontology#",
        "dcs": "http://ontologi.es/doap-changeset#",
        "voidwh": "http://www.ics.forth.gr/isl/VoIDWarehouse/VoID_Extension_Schema.owl#",
        "escjr": "http://vocab.linkeddata.es/datosabiertos/def/urbanismo-infraestructuras/callejero#",
        "reegle": "http://reegle.info/schema#",
        "xslopm": "http://purl.org/net/opmv/types/xslt#",
        "lden": "http://www.linklion.org/lden/",
        "navm": "https://w3id.org/navigation_menu#",
        "vmm": "http://spi-fm.uca.es/spdef/models/genericTools/vmm/1.0#",
        "loted": "http://loted.eu/ontology#",
        "diag": "http://www.loc.gov/zing/srw/diagnostic/",
        "rvdata": "http://data.rvdata.us/",
        "dbcat": "http://dbpedia.org/resource/Category:",
        "naval": "http://rdf.muninn-project.org/ontologies/naval#",
        "npdv": "http://sws.ifi.uio.no/vocab/npd#",
        "bn": "http://babelnet.org/rdf/",
        "affymetrix": "http://bio2rdf.org/affymetrix_vocabulary:",
        "xcql": "http://docs.oasis-open.org/ns/search-ws/xcql#",
        "metadata": "http://purl.oreilly.com/ns/meta/",
        "d2d": "http://rdfns.org/d2d/",
        "swpm": "http://spi-fm.uca.es/spdef/models/deployment/swpm/1.0#",
        "cpsv": "http://purl.org/vocab/cpsv#",
        "wikimedia": "http://upload.wikimedia.org/wikipedia/commons/f/f6/",
        "rdafr": "http://rdaregistry.info/termList/frequency/",
        "rdag2": "http://rdvocab.info/ElementsGr2/",
        "sor": "http://purl.org/net/soron/",
        "chembl": "http://rdf.ebi.ac.uk/terms/chembl#",
        "emtr": "http://purl.org/NET/ssnext/electricmeters#",
        "bridge": "http://purl.org/vocommons/bridge#",
        "ramon": "http://rdfdata.eionet.europa.eu/ramon/ontology/",
        "esco": "http://data.europa.eu/esco/model#",
        "rdacct": "http://rdaregistry.info/termList/CollTitle/",
        "oplecrm": "http://www.openlinksw.com/ontology/ecrm#",
        "unspsc": "http://ontoview.org/schema/unspsc/1#",
        "olca": "http://www.lingvoj.org/olca#",
        "rdasoi": "http://rdaregistry.info/termList/statIdentification/",
        "ljkl": "http://teste.com/",
        "rdabm": "http://rdaregistry.info/termList/RDABaseMaterial/",
        "rdapo": "http://rdaregistry.info/termList/RDAPolarity/",
        "ilap": "http://data.posccaesar.org/ilap/",
        "ecgl": "http://schema.geolink.org/",
        "rdamt": "http://rdaregistry.info/termList/RDAMediaType/",
        "rdatc": "http://rdaregistry.info/termList/trackConfig/",
        "yo": "http://yovisto.com/",
        "fe": "http://www.ontologydesignpatterns.org/ont/framenet/abox/fe/",
        "sakthi": "http://infotech.nitk.ac.in/research-scholars/sakthi-murugan-r/",
        "opengov": "http://www.w3.org/opengov#",
        "oplmkt": "http://www.openlinksw.com/ontology/market#",
        "glview": "http://schema.geolink.org/dev/view/",
        "rdagw": "http://rdaregistry.info/termList/grooveWidth/",
        "c9d": "http://purl.org/twc/vocab/conversion/",
        "eccrev": "https://vocab.eccenca.com/revision/",
        "gpml": "http://vocabularies.wikipathways.org/gpml#",
        "bgdbp": "http://bg.dbpedia.org/property/",
        "date": "http://contextus.net/ontology/ontomedia/misc/date#",
        "kegg": "http://bio2rdf.org/ns/kegg#",
        "ontosec": "http://www.semanticweb.org/ontologies/2008/11/OntologySecurity.owl#",
        "rdagd": "http://rdaregistry.info/termList/gender/",
        "rdafnm": "http://rdaregistry.info/termList/FormNoteMus/",
        "phdd": "http://rdf-vocabulary.ddialliance.org/phdd#",
        "mtlo": "http://www.ics.forth.gr/isl/MarineTLO/v4/marinetlo.owl#",
        "csvw": "http://www.w3.org/ns/csvw#",
        "oplcb": "http://www.openlinksw.com/schemas/crunchbase#",
        "cbo": "http://comicmeta.org/cbo/",
        "eurostat": "http://wifo5-04.informatik.uni-mannheim.de/eurostat/resource/eurostat/",
        "goog": "http://schema.googleapis.com/",
        "verb": "https://w3id.org/verb/",
        "bnf": "http://www.w3.org/2000/10/swap/grammar/bnf#",
        "xrd": "http://docs.oasis-open.org/ns/xri/xrd-1.0#",
        "rdami": "http://rdaregistry.info/termList/modeIssue/",
        "rdaemm": "http://rdaregistry.info/termList/emulsionMicro/",
        "rdarm": "http://registry.info/termList/recMedium/",
        "clirio": "http://clirio.kaerle.com/clirio.owl#",
        "religion": "http://rdf.muninn-project.org/ontologies/religion#",
        "lcdr": "http://ns.lucid-project.org/revision/",
        "oae": "http://www.ics.forth.gr/isl/oae/core#",
        "rdaftn": "http://rdaregistry.info/termList/TacNotation/",
        "condition": "http://www.kinjal.com/condition:",
        "spcm": "http://spi-fm.uca.es/spdef/models/deployment/spcm/1.0#",
        "wb": "http://data.worldbank.org/",
        "d0": "http://ontologydesignpatterns.org/ont/wikipedia/d0.owl#",
        "rdaco": "http://rdaregistry.info/termList/RDAContentType/",
        "caplibacl": "http://schemas.capita-libraries.co.uk/2015/acl/schema#",
        "insdc": "http://ddbj.nig.ac.jp/ontologies/sequence#",
        "beth": "http://www.google.com/",
        "rdarr": "http://rdaregistry.info/termList/RDAReductionRatio/",
        "lsd": "http://linkedwidgets.org/statisticaldata/ontology/",
        "oml": "http://def.seegrid.csiro.au/ontology/om/om-lite#",
        "foo": "http://filmontology.org/ontology/1.0/",
        "rdact": "http://rdaregistry.info/termList/RDACarrierType/",
        "bgdbr": "http://bg.dbpedia.org/resource/",
        "espresup": "http://vocab.linkeddata.es/datosabiertos/def/hacienda/presupuestos#",
        "lmx": "http://www.w3.org/XML/1998/namespace/",
        "owsom": "https://onlinesocialmeasures.wordpress.com/",
        "lw": "http://linkedwidgets.org/ontologies/",
        "ha": "http://sensormeasurement.appspot.com/ont/home/homeActivity#",
        "omnfed": "http://open-multinet.info/ontology/omn-federation#",
        "ipo": "http://purl.org/ipo/core#",
        "lemonuby": "http://lemon-model.net/lexica/uby/",
        "vidont": "http://vidont.org/",
        "faq": "http://www.openlinksw.com/ontology/faq#",
        "rdagrp": "http://rdaregistry.info/termList/groovePitch/",
        "ubiq": "http://server.ubiqore.com/ubiq/core#",
        "odbc": "http://www.openlinksw.com/ontology/odbc#",
        "rdafmn": "http://rdaregistry.info/termList/MusNotation/",
        "rml": "http://semweb.mmlab.be/ns/rml#",
        "saws": "http://purl.org/saws/ontology#",
        "rdasco": "http://rdaregistry.info/termList/soundCont/",
        "dicera": "http://semweb.mmlab.be/ns/dicera#",
        "rdacc": "http://rdaregistry.info/termList/RDAColourContent/",
        "cwl": "https://w3id.org/cwl/cwl#",
        "luc": "http://www.ontotext.com/owlim/lucene#",
        "kees": "http://linkeddata.center/kees/v1#",
        "td5": "http://td5.org/#",
        "ncit": "http://ncicb.nci.nih.gov/xml/owl/EVS/Thesaurus.owl#",
        "vag": "http://www.essepuntato.it/2013/10/vagueness/",
        "wikibase": "http://wikiba.se/ontology#",
        "figigii": "http://www.omg.org/spec/FIGI/GlobalInstrumentIdentifiers/",
        "fdbp": "http://fr.dbpedia.org/property/",
        "incident": "http://vocab.resc.info/incident#",
        "bfo": "http://www.ifomis.org/bfo/1.1#",
        "vstoi": "http://hadatac.org/ont/vstoi#",
        "mexv": "http://mex.aksw.org/mex-algo#",
        "oxi": "http://omerxi.com/ontologies/core.owl.ttl#",
        "solid": "http://www.w3.org/ns/solid/terms#",
        "ev": "http://www.w3.org/2001/xml-events/",
        "rdapmt": "http://rdaregistry.info/termList/prodTactile/",
        "escom": "http://vocab.linkeddata.es/datosabiertos/def/comercio/tejidoComercial#",
        "tp": "http://tour-pedia.org/download/tp.owl#",
        "decision": "https://decision-ontology.googlecode.com/svn/trunk/decision.owl#",
        "quantity": "http://qudt.org/schema/quantity#",
        "ecglview": "http://schema.geolink.org/view/",
        "tadirah": "http://tadirah.dariah.eu/vocab/",
        "esdir": "http://vocab.linkeddata.es/datosabiertos/def/urbanismo-infraestructuras/direccionPostal#",
        "traffic": "http://www.sensormeasurement.appspot.com/ont/transport/traffic#",
        "lawd": "http://lawd.info/ontology/",
        "rdafs": "http://rdaregistry.info/termList/fontSize/",
        "lsqv": "http://lsq.aksw.org/vocab#",
        "rdabf": "http://rdaregistry.info/termList/bookFormat/",
        "ogc": "http://www.opengis.net/def/",
        "company": "http://intellimind.io/ns/company#",
        "proms": "http://promsns.org/def/proms#",
        "demlab": "http://www.demcare.eu/ontologies/demlab.owl#",
        "merge": "http://jazz.net/ns/lqe/merge/",
        "mv": "http://schema.mobivoc.org/",
        "orges": "http://datos.gob.es/def/sector-publico/organizacion#",
        "rdaz": "http://rdaregistry.info/Elements/z/",
        "scor": "http://purl.org/eis/vocab/scor#",
        "pcdt": "http://purl.org/procurement/public-contracts-datatypes#",
        "samfl": "http://def.seegrid.csiro.au/ontology/om/sam-lite#",
        "rofch": "http://rdaregistry.info/termList/rofch/",
        "uneskos": "http://purl.org/voc/uneskos#",
        "rdafnv": "http://rdaregistry.info/termList/noteForm/",
        "dm2e": "http://onto.dm2e.eu/schemas/dm2e/",
        "vacseen1": "http://www.semanticweb.org/parthasb/ontologies/2014/6/vacseen1/",
        "rofrr": "http://rdaregistry.info/termList/rofrr/",
        "jolux": "http://data.legilux.public.lu/resource/ontology/jolux#",
        "aktivesa": "http://sa.aktivespace.org/ontologies/aktivesa#",
        "rofem": "http://rdaregistry.info/termList/rofem/",
        "um": "http://intelleo.eu/ontologies/user-model/ns/",
        "imind": "http://schema.intellimind.ns/symbology#",
        "moo": "http://www.movieontology.org/2009/11/09/movieontology.owl#",
        "hasneto": "http://hadatac.org/ont/hasneto#",
        "essglobal": "http://purl.org/essglobal/vocab/v1.0/",
        "bsym": "http://bsym.bloomberg.com/sym/",
        "auto": "http://auto.schema.org/",
        "rofit": "http://rdaregistry.info/termList/rofit/",
        "rofer": "http://rdaregistry.info/termList/rofer/",
        "eclap": "http://www.eclap.eu/schema/eclap/",
        "sg": "http://www.springernature.com/scigraph/ontologies/core/",
        "rdb": "http://www.dbs.cs.uni-duesseldorf.de/RDF/relational#",
        "airs": "https://raw.githubusercontent.com/airs-linked-data/lov/latest/src/airs_vocabulary.ttl#",
        "ops": "http://vocabularies.bridgedb.org/ops#",
        "orth": "http://purl.org/net/orth#",
        "mbgd": "http://mbgd.genome.ad.jp/owl/mbgd.owl#",
        "rdatr": "http://rdaregistry.info/termList/typeRec/",
        "ofrd": "http://purl.org/opdm/refrigerator#",
        "dio": "https://w3id.org/dio#",
        "jerm": "http://jermontology.org/ontology/JERMOntology#",
        "lsmap": "http://ontology.cybershare.utep.edu/ELSEWeb/elseweb-data.owl#",
        "newsevents": "http://www.aifb.uni-karlsruhe.de/WBS/uhe/ontologies#",
        "sdshare": "http://www.sdshare.org/2012/extension/",
        "llont": "http://www.linklion.org/ontology#",
        "mexcore": "http://mex.aksw.org/mex-core#",
        "leaks": "http://data.ontotext.com/resource/leak/",
        "uby": "http://purl.org/olia/ubyCat.owl#",
        "latitude": "https://www.w3.org/2006/vcard/ns#latitude#",
        "gont": "https://gont.ch/",
        "gci": "http://ontology.eil.utoronto.ca/GCI/Foundation/GCI-Foundation.owl#",
        "art": "http://w3id.org/art/terms/1.0/",
        "geojson": "http://ld.geojson.org/vocab#",
        "data": "http://data.odw.tw/",
        "dqv": "http://www.w3.org/ns/dqv#",
        "rut": "http://rdfunit.aksw.org/ns/core#",
        "webservice": "http://www.openlinksw.com/ontology/webservices#",
        "esapar": "http://vocab.linkeddata.es/datosabiertos/def/urbanismo-infraestructuras/aparcamiento#",
        "lheo": "http://www.conjecto.com/ontology/2015/lheo#",
        "oplweb": "http://www.openlinksw.com/schemas/oplweb#",
        "cpack": "http://cliopatria.swi-prolog.org/schema/cpack#",
        "ttla": "https://w3id.org/ttla/",
        "ianarel": "http://www.iana.org/assignments/relation/",
        "cff": "http://purl.oclc.org/NET/ssnx/cf/cf-feature#",
        "piero": "http://reactionontology.org/piero/",
        "hto": "http://project-haystack.org/hto#",
        "eccauth": "https://vocab.eccenca.com/auth/",
        "gist": "http://ontologies.semanticarts.com/gist#",
        "fnabox": "http://www.ontologydesignpatterns.org/ont/framenet/abox/",
        "datex": "http://vocab.datex.org/terms#",
        "step": "http://purl.org/net/step#",
        "efrbroo": "http://erlangen-crm.org/efrbroo/",
        "tix": "http://toptix.com/2010/esro/",
        "rofid": "http://rdaregistry.info/termList/rofid/",
        "cwork": "http://www.bbc.co.uk/ontologies/creativework/",
        "cdt": "http://w3id.org/lindt/custom_datatypes#",
        "vocnet": "http://schema.vocnet.org/",
        "fntbox": "http://www.ontologydesignpatterns.org/ont/framenet/tbox/",
        "pv": "http://ns.inria.fr/provoc#",
        "lgdm": "http://linkedgeodata.org/meta/",
        "itcat": "http://th-brandenburg.de/ns/itcat#",
        "ethc": "http://ethoinformatics.org/ethocore/",
        "edgarcik": "http://edgarwrap.ontologycentral.com/cik/",
        "remetca": "http://www.purl.org/net/remetca#",
        "swcomp": "https://github.com/ali1k/ld-reactor/blob/master/vocabulary/index.ttl#",
        "sgg": "http://www.springernature.com/scigraph/graphs/",
        "changeset": "http://purl.org/vocab/changeset/schema#",
        "lib": "http://purl.org/library/",
        "amsl": "http://vocab.ub.uni-leipzig.de/amsl/",
        "hello": "https://www.youtube.com/user/SuperTellAFriend/featured/",
        "rofsm": "http://rdaregistry.info/termList/rofsm/",
        "mdi": "http://w3id.org/multidimensional-interface/ontology#",
        "gs1": "http://gs1.org/voc/",
        "rofrm": "http://rdaregistry.info/termList/rofrm/",
        "pp": "http://peoplesplaces.de/ontology#",
        "mexalgo": "http://mex.aksw.org/mex-algo#",
        "puml": "http://plantuml.com/ontology#",
        "leak": "http://data.ontotext.com/resource/leak/",
        "ruian": "https://data.cssz.cz/ontology/ruian/",
        "door": "http://kannel.open.ac.uk/ontology#",
        "ns1": "http://www.w3.org/1999/xhtml/vocab#",
        "driver": "http://deductions.github.io/drivers.owl.ttl#",
        "fo": "http://www.w3.org/1999/XSL/Format#",
        "eccdi": "https://vocab.eccenca.com/di/",
        "glycan": "http://purl.jp/bio/12/glyco/glycan#",
        "crmdig": "http://www.ics.forth.gr/isl/CRMext/CRMdig.rdfs/",
        "lswpm": "http://ontology.cybershare.utep.edu/ELSEWeb/elseweb-lifemapper-parameters.owl#",
        "bioc": "http://deductions.github.io/biological-collections.owl.ttl#",
        "isbdu": "http://iflastandards.info/ns/isbd/unc/elements/",
        "minim": "http://purl.org/minim/minim#",
        "kbv": "https://id.kb.se/vocab/",
        "nlon": "http://lod.nl.go.kr/ontology/",
        "mod": "http://www.isibang.ac.in/ns/mod#",
        "lsweb": "http://ontology.cybershare.utep.edu/ELSEWeb/elseweb-data.owl#",
        "gns": "http://sws.geonames.org/",
        "regorg": "http://www.w3.org/ns/regorg#",
        "pid": "http://permid.org/ontology/organization/",
        "saref": "https://w3id.org/saref#",
        "dpn": "http://purl.org/dpn#",
        "iana": "http://www.iana.org/assignments/relation/",
        "lslife": "http://ontology.cybershare.utep.edu/ELSEWeb/elseweb-lifemapper.owl#",
        "rgml": "http://purl.org/puninj/2001/05/rgml-schema#",
        "html": "http://izmus.cz/#",
        "wimpo": "http://rdfex.org/withImports?uri=",
        "uom": "http://www.opengis.net/def/uom/OGC/1.0/",
        "lgdt": "http://linkedgeodata.org/triplify/",
        "output": "http://volt-name.space/vocab/output#",
        "efd": "http://data.foodanddrinkeurope.eu/ontology#",
        "opllog": "http://www.openlinksw.com/ontology/logging#",
        "b3kat": "http://lod.b3kat.de/title/",
        "pcit": "http://public-contracts.nexacenter.org/id/propertiesRole/",
        "iiif": "http://iiif.io/api/image/2#",
        "open311": "http://ontology.eil.utoronto.ca/open311#",
        "r4r": "http://guava.iis.sinica.edu.tw/r4r/",
        "text": "http://jena.apache.org/text#",
        "si": "http://sisteminformasi.com/",
        "ou": "http://opendata.unex.es/def/ontouniversidad#",
        "rofet": "http://rdaregistry.info/termList/rofet/",
        "rofim": "http://rdaregistry.info/termList/rofim/",
        "yd": "https://yodata.io/",
        "rofin": "http://rdaregistry.info/termList/rofin/",
        "dcosample": "http://info.deepcarbon.net/sample/schema#",
        "clinic": "http://example.com/clinic#",
        "bb": "http://www.snik.eu/ontology/bb/",
        "owl2xml": "http://www.w3.org/2006/12/owl2-xml#",
        "teamwork": "http://topbraid.org/teamwork#",
        "csdbp": "http://cs.dbpedia.org/",
        "crowd": "http://purl.org/crowd/",
        "rofhf": "http://rdaregistry.info/termList/rofhf/",
        "dcatapit": "http://dati.gov.it/onto/dcatapit#",
        "fluidops": "http://www.fluidops.com/",
        "cue": "http://www.clarin.eu/cmdi/cues/display/1.0#",
        "ipsv": "http://id.esd.org.uk/list/",
        "vf": "https://w3id.org/valueflows/",
        "ali": "http://www.niso.org/schemas/ali/1.0/",
        "lswmo": "http://ontology.cybershare.utep.edu/ELSEWeb/elseweb-modelling.owl#",
        "obeu": "http://data.openbudgets.eu/ontology/",
        "dash": "http://datashapes.org/dash#",
        "rpath": "https://w3id.org/lodsight/rdf-path#",
        "dwciri": "http://rs.tdwg.org/dwc/iri/",
        "duv": "http://www.w3.org/ns/duv#",
        "markus": "http://www.markus.com/",
        "voc": "http://voc.odw.tw/",
        "neotec": "http://neotec.rc.unesp.br/resource/Neotectonics/",
        "tgm": "http://id.loc.gov/vocabulary/graphicMaterials/",
        "datacite": "http://purl.org/spar/datacite/",
        "fire": "http://tldp.org/HOWTO/XML-RPC-HOWTO/xmlrpc-howto-java.html#",
        "rofsf": "http://rdaregistry.info/termList/rofsf/",
        "pm": "http://premon.fbk.eu/resource/",
        "volt": "http://volt-name.space/ontology/",
        "pdf": "http://ns.adobe.com/pdf/1.3/",
        "sx": "http://shex.io/ns/shex#",
        "lsq": "http://lsq.aksw.org/vocab#",
        "rofrt": "http://rdaregistry.info/termList/rofrt/",
        "qms": "http://data.europa.eu/esco/qms#",
        "sct": "http://snomed.info/sct/",
        "rdaar": "http://rdaregistry.info/termList/AspectRatio/",
        "rfd": "http://com.intrinsec//ontology#",
        "mmoon": "http://mmoon.org/mmoon/",
        "ideotalex": "http://www.ideotalex.eu/datos/recurso/",
        "dcodata": "http://info.deepcarbon.net/data/schema#",
        "esair": "http://vocab.linkeddata.es/datosabiertos/def/medio-ambiente/calidad-aire#",
        "juso": "http://rdfs.co/juso/",
        "bblfish": "http://bblfish.net/people/henry/card#",
        "dsv": "http://purl.org/iso25964/DataSet/Versioning#",
        "wde": "http://www.wikidata.org/entity/",
        "pmhb": "http://pmhb.org/",
        "aozora": "http://purl.org/net/aozora/",
        "ws": "http://www.w3.org/ns/pim/space#",
        "biml": "http://schemas.varigence.com/biml.xsd#",
        "pmd": "http://publishmydata.com/def/dataset#",
        "ensembl": "http://rdf.ebi.ac.uk/resource/ensembl/",
        "pmonb": "http://premon.fbk.eu/ontology/nb#",
        "pcdm": "http://pcdm.org/models#",
        "sdt": "http://statisticaldata.linkedwidgets.org/terms/",
        "meat": "http://example.com/",
        "crime": "http://purl.org/vocab/reloc/",
        "literal": "http://www.essepuntato.it/2010/06/literalreification/",
        "rdfp": "https://w3id.org/rdfp/",
        "sorg": "http://schema.org/",
        "mmm": "http://www.mico-project.eu/ns/mmm/2.0/schema#",
        "maet": "http://edg.topbraid.solutions/taxonomy/macroeconomics/",
        "sdterms": "http://statisticaldata.linkedwidgets.org/terms/",
        "sosa": "http://www.w3.org/ns/sosa/",
        "year": "http://www.w3.org/year/",
        "pmo": "http://premon.fbk.eu/ontology/core#",
        "system": "http://www.univalle.edu.co/ontologies/System#",
        "lgt": "http://linkedgadget.com/wiki/Property:",
        "cwrc": "http://sparql.cwrc.ca/ontology/cwrc#",
        "asawoo": "http://liris.cnrs.fr/asawoo/",
        "customer": "http://www.valuelabs.com/",
        "odw": "http://odw.tw/",
        "planet": "http://dbpedia.org/",
        "rdacdt": "http://rdaregistry.info/termList/RDACartoDT/",
        "eccpubsub": "https://vocab.eccenca.com/pubsub/",
        "estrf": "http://vocab.linkeddata.es/datosabiertos/def/transporte/trafico#",
        "organ": "http://www.univalle.edu.co/ontologies/Organ#",
        "wdv": "http://www.wikidata.org/value/",
        "iso37120": "http://ontology.eil.utoronto.ca/ISO37120.owl#",
        "semiot": "http://w3id.org/semiot/ontologies/semiot#",
        "mexperf": "http://mex.aksw.org/mex-perf#",
        "eame": "http://www.semanticweb.org/ontologia_EA#",
        "mls": "http://www.w3.org/ns/mls#",
        "rdaterm": "http://rdaregistry.info/termList/RDATerms/",
        "elod": "http://linkedeconomy.org/ontology#",
        "ctxdesc": "http://www.demcare.eu/ontologies/contextdescriptor.owl#",
        "cd": "http://citydata.wu.ac.at/ns#",
        "pmovn": "http://premon.fbk.eu/ontology/vn#",
        "dcodt": "http://info.deepcarbon.net/datatype/schema#",
        "dcap": "http://purl.org/ws-mmi-dc/terms/",
        "pmofn": "http://premon.fbk.eu/ontology/fn#",
        "eem": "http://purl.org/eem#",
        "spv": "http://completeness.inf.unibz.it/sp-vocab#",
        "json": "https://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf#",
        "rm": "http://jazz.net/ns/rm#",
        "neotecbib": "http://neotec.rc.unesp.br/resource/NeotectonicsBibliography/",
        "lyon": "http://dbpedia.org/resource/Lyon/",
        "rdacarx": "http://rdaregistry.info/termList/RDACarrierEU/",
        "pmopb": "http://premon.fbk.eu/ontology/pb#",
        "meshv": "http://id.nlm.nih.gov/mesh/vocab#",
        "ldq": "http://www.linkeddata.es/ontology/ldq#",
        "scholl": "http://menemeneml.com/school#",
        "alethio": "http://aleth.io/",
        "ncicp": "http://ncicb.nci.nih.gov/xml/owl/EVS/Thesaurus.owl#",
        "rdaft": "http://rdaregistry.info/termList/fileType/",
        "dbfo": "http://dbpedia.org/facts/ontology#",
        "orgesv2": "http://datos.gob.es/sites/default/files/OntologiaDIR3/orges.owl#",
        "fno": "http://w3id.org/function/ontology#",
        "sdmxc": "http://purl.org/linked-data/sdmx/2009/concept#",
        "llr": "http://lodlaundromat.org/resource/",
        "vam": "http://www.metmuseum.org/",
        "gobierno": "http://www.gobierno.es/gobierno/",
        "esproc": "http://vocab.linkeddata.es/datosabiertos/def/sector-publico/procedimientos#",
        "rdacpc": "http://rdaregistry.info/termList/configPlayback/",
        "srx": "http://www.w3.org/2005/sparql-results#",
        "master1": "http://idl.u-grenoble3.fr/",
        "or": "http://openresearch.org/vocab/",
        "pbody": "http://reference.data.gov.uk/def/public-body/",
        "jpost": "http://rdf.jpostdb.org/ontology/jpost.owl#",
        "dataid": "http://dataid.dbpedia.org/ns/core#",
        "prohow": "https://w3id.org/prohow#",
        "isidore": "http://www.rechercheisidore.fr/class/",
        "wsdl": "http://www.w3.org/ns/wsdl-rdf#",
        "eol": "http://purl.org/biodiversity/eol/",
        "tarql": "http://tarql.github.io/tarql#",
        "psv": "http://www.wikidata.org/prop/statement/value/",
        "voidex": "http://www.swi-prolog.org/rdf/library/",
        "vogd": "http://ogd.ifs.tuwien.ac.at/vienna/geo/",
        "dgfr": "http://colin.maudry.com/ontologies/dgfr#",
        "estatgph": "http://estatwrap.ontologycentral.com/id/nama_aux_gph#",
        "smxm": "http://smxm.ga/",
        "ttp": "http://eample.com/test#",
        "provoc": "http://ns.inria.fr/provoc/",
        "rdax": "http://rdaregistry.info/Elements/x/",
        "wail": "http://www.eyrie.org/~zednenem/2002/wail/",
        "rdalay": "http://rdaregistry.info/termList/layout/",
        "frgeo": "http://rdf.insee.fr/geo/",
        "maeco": "http://edg.topbraid.solutions/maeco/",
        "vplan": "http://www.ifs.tuwien.ac.at/~miksa/ontologies/VPlan.owl#",
        "dsfv": "http://sws.ifi.uio.no/vocab/dsf/henriwi/dsf#",
        "rdapf": "http://rdaregistry.info/termList/presFormat/",
        "composer": "http://dbpedia.org/ontology/composer/",
        "rdabs": "http://rdaregistry.info/termList/broadcastStand/",
        "yso": "http://www.yso.fi/onto/yso/",
        "sdm": "http://standard.k-history.kr/resource/",
        "lcsh": "http://id.loc.gov/authorities/subjects/",
        "scco": "http://rdf.ebi.ac.uk/terms/surechembl#",
        "vort": "http://rockets.topbraid.solutions/vort/",
        "tissue": "http://www.univalle.edu.co/ontologies/Tissue#",
        "rdagen": "http://rdaregistry.info/termList/RDAGeneration/",
        "undata": "http://citydata.wu.ac.at/Linked-UNData/data/",
        "km4c": "http://www.disit.org/km4city/schema#",
        "atlas": "http://rdf.ebi.ac.uk/resource/atlas/",
        "doi": "http://dx.doi.org/",
        "apf": "http://jena.apache.org/ARQ/property#",
        "ioto": "http://www.irit.fr/recherches/MELODI/ontologies/IoT-O#",
        "rdapm": "http://rdaregistry.info/termList/RDAproductionMethod/",
        "provinsi": "http://provinsi.com/",
        "sdmxcode": "http://purl.org/linked-data/sdmx/2009/code#",
        "webac": "http://fedora.info/definitions/v4/webac#",
        "huto": "http://ns.inria.fr/huto/",
        "im": "http://imgpedia.dcc.uchile.cl/resource/",
        "shacl": "http://www.w3.org/ns/shacl#",
        "sto": "https://w3id.org/i40/sto#",
        "hva": "http://www.ebusiness-unibw.org/ontologies/hva/ontology#",
        "ifc": "http://ifcowl.openbimstandards.org/IFC2X3_Final#",
        "persee": "http://data.persee.fr/ontology/persee_ontology/",
        "dqc": "http://semwebquality.org/ontologies/dq-constraints#",
        "ecoll": "http://purl.org/ceu/eco/1.0#",
        "sgfn": "http://w3id.org/sparql-generate/fn/",
        "umls": "http://bioportal.bioontology.org/ontologies/umls/",
        "cpov": "http://data.europa.eu/m8g/",
        "rdfsharp": "https://rdfsharp.codeplex.com/",
        "ispra": "http://dati.isprambiente.it/ontology/core#",
        "rdaill": "http://rdaregistry.info/termList/IllusContent/",
        "dsw": "http://purl.org/dsw/",
        "ppr": "http://purl.org/datanode/ppr/ns/",
        "valueflows": "https://w3id.org/valueflows/",
        "soch": "http://kulturarvsdata.se/ksamsok#",
        "ldqm": "http://linkeddata.es/resource/ldqm/",
        "wab": "http://wab.uib.no/cost-a32_philospace/wittgenstein.owl#",
        "rdaspc": "http://rdaregistry.info/termList/specPlayback/",
        "input": "http://volt-name.space/vocab/input#",
        "frappe": "http://streamreasoning.org/ontologies/frappe#",
        "edac": "http://ontology.cybershare.utep.edu/ELSEWeb/elseweb-edac.owl#",
        "sdmxm": "http://purl.org/linked-data/sdmx/2009/measure#",
        "ndnp": "http://chroniclingamerica.loc.gov/terms#",
        "alice": "http://example.org/",
        "sfn": "http://semweb.datasciencelab.be/ns/sfn#",
        "bdc": "http://dbpedia.org/resource/Category:",
        "ecowlim": "http://ecowlim.tfri.gov.tw/lode/resource/",
        "ontop": "https://w3id.org/ontop/",
        "salad": "https://w3id.org/cwl/salad#",
        "rdavf": "http://rdaregistry.info/termList/videoFormat/",
        "rimmf": "http://rimmf.com/vocab/",
        "emergel": "http://purl.org/emergel/core#",
        "mesh": "http://id.nlm.nih.gov/mesh/",
        "sgiter": "http://w3id.org/sparql-generate/iter/",
        "emergelm": "http://purl.org/emergel/modules#",
        "tx": "http://swtmp.gitlab.io/vocabulary/templates.owl#",
        "dpla": "http://dp.la/info/developers/map/",
        "nobel": "http://data.nobelprize.org/terms/",
        "gvoith": "http://assemblee-virtuelle.github.io/grands-voisins-v2/thesaurus.ttl#",
        "rdaad": "http://rdaregistry.info/Elements/a/datatype/",
        "ogdl4m": "https://github.com/martynui/OGDL4M/",
        "studiop": "http://purl.org/resource/pilatesstudio/",
        "qbe": "http://citydata.wu.ac.at/qb-equations#",
        "connard": "https://mail.google.com/mail/u/1/#",
        "geoloc": "http://deductions.github.io/geoloc.owl.ttl#",
        "pato": "http://purl.obolibrary.org/obo/",
        "opa": "https://w3id.org/laas-iot/adream#",
        "owms": "http://standaarden.overheid.nl/owms/terms/",
        "ago": "http://awesemantic-geo.link/ontology/",
        "vsearch": "http://vocab.sti2.at/vsearch#",
        "gvoi": "http://assemblee-virtuelle.github.io/grands-voisins-v2/gv.owl.ttl#",
        "tsn": "http://purl.org/net/tsn#",
        "vehma": "http://deductions.github.io/vehicule-management.owl.ttl#",
        "nkos": "http://w3id.org/nkos#",
        "ondc": "http://www.semanticweb.org/ontologies/2012/1/Ontology1329913965202.owl#",
        "imo": "http://imgpedia.dcc.uchile.cl/ontology#",
        "svcs": "http://rdfs.org/sioc/services#",
        "oplangel": "http://www.openlinksw.com/schemas/angel#",
        "gdc": "https://portal.gdc.cancer.gov/cases/",
        "marcrole": "http://id.loc.gov/vocabulary/relators/",
        "ver": "https://w3id.org/version/ontology#",
        "ncbigene": "http://identifiers.org/ncbigene/",
        "pep": "https://w3id.org/pep/",
        "geor": "http://www.opengis.net/def/rule/geosparql/",
        "nature": "http://deductions.github.io/nature_observation.owl.ttl#",
        "it": "http://www.influencetracker.com/ontology#",
        "orcid": "http://orcid.org/",
        "llalg": "http://www.linklion.org/algorithm/",
        "brk": "http://brk.basisregistraties.overheid.nl/def/brk#",
        "hasco": "http://hadatac.org/ont/hasco/",
        "tosh": "http://topbraid.org/tosh#",
        "dcatnl": "http://standaarden.overheid.nl/dcatnl/terms/",
        "dto": "http://www.datatourisme.fr/ontology/core/1.0#",
        "theme": "http://voc.odw.tw/theme/",
        "oplp": "http://www.openlinksw.com/ontology/purchases#",
        "bot": "https://w3id.org/bot#",
        "rdare": "http://rdaregistry.info/termList/RDARegionalEncoding/",
        "dbkwik": "http://dbkwik.webdatacommons.org/",
        "brt": "http://brt.basisregistraties.overheid.nl/def/top10nl#",
        "fssp": "http://linkeddata.fssprus.ru/resource/",
        "tg": "http://www.turnguard.com/turnguard#",
        "oplstocks": "http://www.openlinksw.com/ontology/stocks#",
        "snac": "http://socialarchive.iath.virginia.edu/",
        "pand": "http://bag.basisregistraties.overheid.nl/bag/id/pand/",
        "eustd": "http://eurostat.linked-statistics.org/data#",
        "seeds": "http://deductions.github.io/seeds.owl.ttl#",
        "globalcube": "http://kalmar32.fzi.de/triples/global-cube.ttl#",
        "clapit": "http://dati.gov.it/onto/clapit/",
        "id": "http://identifiers.org/",
        "doacc": "http://purl.org/net/bel-epa/doacc#",
        "task": "http://deductions.github.io/task-management.owl.ttl#",
        "tsnchange": "http://purl.org/net/tsnchange#",
        "ssno": "http://www.w3.org/ns/ssn/",
        "oplwebsrv": "http://www.openlinksw.com/ontology/webservices#",
        "dk": "http://www.data-knowledge.org/dk/schema/rdf/latest/",
        "tui": "http://data.ifs.tuwien.ac.at/study/resource/",
        "memento": "http://mementoweb.org/ns#",
        "scra": "http://purl.org/net/schemarama#",
        "oplbenefit": "http://www.openlinksw.com/ontology/benefits#",
        "ldn": "https://www.w3.org/TR/ldn/#",
        "aml": "https://w3id.org/i40/aml#",
        "td": "http://www.w3.org/ns/td#",
        "agr": "http://promsns.org/def/agr#",
        "ifcowl": "http://www.buildingsmart-tech.org/ifcOWL/IFC4_ADD2#",
        "nih": "http://ncicb.nci.nih.gov/xml/owl/EVS/Thesaurus.owl#",
        "pmc": "http://identifiers.org/pmc/",
        "ido": "http://purl.obolibrary.org/obo/ido.owl#",
        "assoc": "https://w3id.org/associations/vocab#",
        "ims": "http://www.imsglobal.org/xsd/imsmd_v1p2/",
        "ns2": "http://ogp.me/ns#video:",
        "audit": "http://fedora.info/definitions/v4/audit#",
        "ceterms": "http://purl.org/ctdl/terms/",
        "allot": "https://w3id.org/akn/ontology/allot#",
        "fr": "https://w3id.org/fr/def/core#",
        "bdr": "http://purl.bdrc.io/resource/",
        "d3s": "http://vocbench.solidaridad.cloud/taxonomies#",
        "add": "http://www.datatourisme.fr/ontology/core/1.0#",
        "aprov": "http://purl.org/a-proc#",
        "sciprov": "http://sweetontology.net/reprSciProvenance/",
        "ja": "http://jena.hpl.hp.com/2005/11/Assembler#",
        "its": "http://www.w3.org/2005/11/its/rdf#",
        "ldl": "https://w3id.org/ldpdl/ns#",
        "pair": "http://virtual-assembly.org/pair/PAIR_LOD_V3.owl/",
        "amt": "http://academic-meta-tool.xyz/vocab#",
        "aseonto": "http://requirement.ase.ru/requirements_ontology#",
        "meeting": "http://www.w3.org/2002/07/meeting#",
        "euvoc": "http://publications.europa.eu/ontology/euvoc#",
        "cpi": "http://www.ebusiness-unibw.org/ontologies/cpi/ns#",
        "bdd": "http://purl.bdrc.io/data/",
        "fun": "http://w3id.org/sparql-generate/fn/",
        "cwlgit": "https://w3id.org/cwl/view/git/",
        "fuseki": "http://jena.apache.org/fuseki#",
        "fnml": "http://semweb.mmlab.be/ns/fnml#",
        "iter": "http://w3id.org/sparql-generate/iter/",
        "w3cgeo": "http://www.w3.org/2003/01/geo/wgs84_pos#",
        "osd": "http://a9.com/-/spec/opensearch/1.1/",
        "oplli": "http://www.openlinksw.com/schemas/linkedin#",
        "isaterms": "http://purl.org/isaterms/",
        "bci": "https://w3id.org/BCI-ontology#",
        "fhir": "http://hl7.org/fhir/",
        "halyard": "http://merck.github.io/Halyard/ns#",
        "bdo": "http://purl.bdrc.io/ontology/core/",
        "lmdb": "http://data.linkedmdb.org/movie/",
        "datacron": "http://www.datacron-project.eu/datAcron#",
        "docker": "http://www.w3.org/ns/bde/docker/",
        "bob": "http://good.dad/meaning/bob#",
        "nrv": "http://ns.inria.fr/nrv#",
        "iotlite": "http://purl.oclc.org/NET/UNIS/fiware/iot-lite#",
        "pop": "http://wiki.dbpedia.org/",
        "vehman": "http://deductions.github.io/vehicule-management.owl.ttl#",
        "edg": "http://edg.topbraid.solutions/model/",
        "iab": "https://www.iab.com/guidelines/taxonomy/",
        "ddb": "http://www.deutsche-digitale-bibliothek.de/edm/",
        "ontoneo": "http://purl.obolibrary.org/obo/ontoneo/",
        "loupe": "http://ont-loupe.linkeddata.es/def/core/",
        "s4envi": "https://w3id.org/def/saref4envi#",
        "medred": "http://w3id.org/medred/medred#",
        "ottr": "http://ns.ottr.xyz/templates#",
        "s3n": "http://w3id.org/s3n/",
        "bds": "http://www.bigdata.com/rdf/search#",
        "m3": "http://sensormeasurement.appspot.com/m3#",
        "s4bldg": "https://w3id.org/def/saref4bldg#",
        "linkrel": "https://www.w3.org/ns/iana/link-relations/relation#",
        "crml": "http://semweb.mmlab.be/ns/rml/condition#",
        "literature": "http://purl.org/net/cnyt-literature#",
        "besluit": "http://data.vlaanderen.be/ns/besluit#",
        "gg": "http://www.gemeentegeschiedenis.nl/gg-schema#",
        "decprov": "http://promsns.org/def/decprov#",
        "smartapi": "http://smart-api.io/ontology/1.0/smartapi#",
        "rankrage": "https://rankrage.de/",
        "mdont": "http://ont.matchdeck.com/",
        "shui": "https://vocab.eccenca.com/shui/",
        "pcdmuse": "http://pcdm.org/use#",
        "jpo": "http://rdf.jpostdb.org/ontology/jpost.owl#",
        "imas": "https://sparql.crssnky.xyz/imasrdf/URIs/imas-schema.ttl#",
        "sfd": "http://semantic-forms.cc:9112/ldp/",
        "geo7": "https://www.geo7.ch/",
        "nosql": "http://purl.org/db/nosql#",
        "gdpr": "https://vocab.eccenca.com/gdpr/",
        "mandaat": "http://data.vlaanderen.be/ns/mandaat#",
        "number": "http://km.aifb.kit.edu/projects/numbers/number#",
        "kmgeo": "http://km.aifb.kit.edu/services/geo/ontology#",
        "mmo": "http://purl.org/momayo/mmo/",
        "adr": "https://w3id.org/laas-iot/adream#",
        "cubeont": "http://ontology.cube.global/",
        "led": "http://led.kmi.open.ac.uk/term/",
        "bgt": "http://bgt.basisregistraties.overheid.nl/def/bgt#",
        "seo": "http://sda.tech/SEOontology/SEO/",
        "tikag": "https://www.tikag.com/",
        "mydb": "http://mydb.org/",
        "activity": "http://activitystrea.ms/specs/atom/1.0/",
        "timex": "http://data.wu.ac.at/ns/timex#",
        "uc": "http://ucuenca.edu.ec/ontology#",
        "dead": "http://utpl.edu.ec/sbc/data/",
        "numbers": "http://km.aifb.kit.edu/projects/numbers/",
        "foaffff": "http://gogl.com/",
        "frbroo": "http://iflastandards.info/ns/fr/frbr/frbroo/",
        "antenne": "https://id.milieuinfo.be/ns/zendantenne#",
        "dossier": "https://lod.milieuinfo.be/ns/dossier#",
        "atlasterms": "http://rdf.ebi.ac.uk/terms/atlas/",
        "da": "https://www.wowman.org/index.php?id=1&type=get#",
        "dnbt": "http://d-nb.info/standards/elementset/dnb#",
        "legal": "http://www.w3.org/ns/legal#",
        "az": "https://w3id.org/people/az/",
        "faostat": "http://reference.eionet.europa.eu/faostat/schema/",
        "waarde": "https://lod.milieuinfo.be/ns/waarde#",
        "swrc2": "https://www.cs.vu.nl/~mcaklein/onto/swrc_ext/2005/05#",
        "mml": "http://www.w3.org/1998/Math/MathML/",
        "physics": "http://www.astro.umd.edu/~eshaya/astro-onto/owl/physics.owl#",
        "gbol": "http://gbol.life/0.1#",
        "vartrans": "http://www.w3.org/ns/lemon/vartrans#",
        "vss": "http://automotive.eurecom.fr/vsso#",
        "lido": "http://www.lido-schema.org/",
        "mem": "http://mementoweb.org/ns#",
        "grel": "http://semweb.datasciencelab.be/ns/grel#",
        "goaf": "http://goaf.fr/goaf#",
        "sylld": "http://www.semanticweb.org/syllabus/data/",
        "vsso": "http://automotive.eurecom.fr/vsso#"
    }
}
},{}],17:[function(require,module,exports){
/**
 * Created by pheyvaer on 18.04.17.
 */

let data = require('./data.json')["@context"];

function getPrefixes(){
  return Object.keys(data);
}

function asMap() {
  return data;
}

function getNamespaceViaPrefix(prefix) {
  return data[prefix];
}

function getPrefixViaNamespace(namespace) {
  let prefixes = Object.keys(data);
  let i = 0;

  while (i < prefixes.length && data[prefixes[i]] !== namespace) {
    i ++;
  }

  if (i < prefixes.length) {
    return prefixes[i];
  } else {
    return null;
  }
}

module.exports = {
  getPrefixes: getPrefixes,
  getNamespaceViaPrefix: getNamespaceViaPrefix,
  getPrefixViaNamespace: getPrefixViaNamespace,
  asMap: asMap
};
},{"./data.json":16}],18:[function(require,module,exports){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  for (var i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],19:[function(require,module,exports){

},{}],20:[function(require,module,exports){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

var K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  buf.__proto__ = Buffer.prototype
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species != null &&
    Buffer[Symbol.species] === Buffer) {
  Object.defineProperty(Buffer, Symbol.species, {
    value: null,
    configurable: true,
    enumerable: false,
    writable: false
  })
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayLike(value)
  }

  if (value == null) {
    throw TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  var valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  var b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(
      value[Symbol.toPrimitive]('string'), encodingOrOffset, length
    )
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Buffer.prototype.__proto__ = Uint8Array.prototype
Buffer.__proto__ = Uint8Array

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  buf.__proto__ = Buffer.prototype
  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      buf = Buffer.from(buf)
    }
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  var len = string.length
  var mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  var strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
        : (firstByte > 0xBF) ? 2
          : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  newBuf.__proto__ = Buffer.prototype
  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (var i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    var len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

},{"base64-js":18,"ieee754":23}],21:[function(require,module,exports){
(function (Buffer){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.

function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return objectToString(arg) === '[object Array]';
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = Buffer.isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

}).call(this,{"isBuffer":require("../../is-buffer/index.js")})
},{"../../is-buffer/index.js":25}],22:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var objectCreate = Object.create || objectCreatePolyfill
var objectKeys = Object.keys || objectKeysPolyfill
var bind = Function.prototype.bind || functionBindPolyfill

function EventEmitter() {
  if (!this._events || !Object.prototype.hasOwnProperty.call(this, '_events')) {
    this._events = objectCreate(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

var hasDefineProperty;
try {
  var o = {};
  if (Object.defineProperty) Object.defineProperty(o, 'x', { value: 0 });
  hasDefineProperty = o.x === 0;
} catch (err) { hasDefineProperty = false }
if (hasDefineProperty) {
  Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
    enumerable: true,
    get: function() {
      return defaultMaxListeners;
    },
    set: function(arg) {
      // check whether the input is a positive number (whose value is zero or
      // greater and not a NaN).
      if (typeof arg !== 'number' || arg < 0 || arg !== arg)
        throw new TypeError('"defaultMaxListeners" must be a positive number');
      defaultMaxListeners = arg;
    }
  });
} else {
  EventEmitter.defaultMaxListeners = defaultMaxListeners;
}

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || isNaN(n))
    throw new TypeError('"n" argument must be a positive number');
  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

// These standalone emit* functions are used to optimize calling of event
// handlers for fast cases because emit() itself often has a variable number of
// arguments and can be deoptimized because of that. These functions always have
// the same number of arguments and thus do not get deoptimized, so the code
// inside them can execute faster.
function emitNone(handler, isFn, self) {
  if (isFn)
    handler.call(self);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self);
  }
}
function emitOne(handler, isFn, self, arg1) {
  if (isFn)
    handler.call(self, arg1);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1);
  }
}
function emitTwo(handler, isFn, self, arg1, arg2) {
  if (isFn)
    handler.call(self, arg1, arg2);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2);
  }
}
function emitThree(handler, isFn, self, arg1, arg2, arg3) {
  if (isFn)
    handler.call(self, arg1, arg2, arg3);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2, arg3);
  }
}

function emitMany(handler, isFn, self, args) {
  if (isFn)
    handler.apply(self, args);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].apply(self, args);
  }
}

EventEmitter.prototype.emit = function emit(type) {
  var er, handler, len, args, i, events;
  var doError = (type === 'error');

  events = this._events;
  if (events)
    doError = (doError && events.error == null);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    if (arguments.length > 1)
      er = arguments[1];
    if (er instanceof Error) {
      throw er; // Unhandled 'error' event
    } else {
      // At least give some kind of context to the user
      var err = new Error('Unhandled "error" event. (' + er + ')');
      err.context = er;
      throw err;
    }
    return false;
  }

  handler = events[type];

  if (!handler)
    return false;

  var isFn = typeof handler === 'function';
  len = arguments.length;
  switch (len) {
      // fast cases
    case 1:
      emitNone(handler, isFn, this);
      break;
    case 2:
      emitOne(handler, isFn, this, arguments[1]);
      break;
    case 3:
      emitTwo(handler, isFn, this, arguments[1], arguments[2]);
      break;
    case 4:
      emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
      break;
      // slower
    default:
      args = new Array(len - 1);
      for (i = 1; i < len; i++)
        args[i - 1] = arguments[i];
      emitMany(handler, isFn, this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');

  events = target._events;
  if (!events) {
    events = target._events = objectCreate(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener) {
      target.emit('newListener', type,
          listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (!existing) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
          prepend ? [listener, existing] : [existing, listener];
    } else {
      // If we've already got an array, just append.
      if (prepend) {
        existing.unshift(listener);
      } else {
        existing.push(listener);
      }
    }

    // Check for listener leak
    if (!existing.warned) {
      m = $getMaxListeners(target);
      if (m && m > 0 && existing.length > m) {
        existing.warned = true;
        var w = new Error('Possible EventEmitter memory leak detected. ' +
            existing.length + ' "' + String(type) + '" listeners ' +
            'added. Use emitter.setMaxListeners() to ' +
            'increase limit.');
        w.name = 'MaxListenersExceededWarning';
        w.emitter = target;
        w.type = type;
        w.count = existing.length;
        if (typeof console === 'object' && console.warn) {
          console.warn('%s: %s', w.name, w.message);
        }
      }
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    switch (arguments.length) {
      case 0:
        return this.listener.call(this.target);
      case 1:
        return this.listener.call(this.target, arguments[0]);
      case 2:
        return this.listener.call(this.target, arguments[0], arguments[1]);
      case 3:
        return this.listener.call(this.target, arguments[0], arguments[1],
            arguments[2]);
      default:
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; ++i)
          args[i] = arguments[i];
        this.listener.apply(this.target, args);
    }
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = bind.call(onceWrapper, state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');

      events = this._events;
      if (!events)
        return this;

      list = events[type];
      if (!list)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = objectCreate(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else
          spliceOne(list, position);

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (!events)
        return this;

      // not listening for removeListener, no need to emit
      if (!events.removeListener) {
        if (arguments.length === 0) {
          this._events = objectCreate(null);
          this._eventsCount = 0;
        } else if (events[type]) {
          if (--this._eventsCount === 0)
            this._events = objectCreate(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = objectKeys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = objectCreate(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (!events)
    return [];

  var evlistener = events[type];
  if (!evlistener)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
};

// About 1.5x faster than the two-arg version of Array#splice().
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
    list[i] = list[k];
  list.pop();
}

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function objectCreatePolyfill(proto) {
  var F = function() {};
  F.prototype = proto;
  return new F;
}
function objectKeysPolyfill(obj) {
  var keys = [];
  for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k)) {
    keys.push(k);
  }
  return k;
}
function functionBindPolyfill(context) {
  var fn = this;
  return function () {
    return fn.apply(context, arguments);
  };
}

},{}],23:[function(require,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],24:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],25:[function(require,module,exports){
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}

},{}],26:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],27:[function(require,module,exports){
(function (process){
'use strict';

if (!process.version ||
    process.version.indexOf('v0.') === 0 ||
    process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
  module.exports = { nextTick: nextTick };
} else {
  module.exports = process
}

function nextTick(fn, arg1, arg2, arg3) {
  if (typeof fn !== 'function') {
    throw new TypeError('"callback" argument must be a function');
  }
  var len = arguments.length;
  var args, i;
  switch (len) {
  case 0:
  case 1:
    return process.nextTick(fn);
  case 2:
    return process.nextTick(function afterTickOne() {
      fn.call(null, arg1);
    });
  case 3:
    return process.nextTick(function afterTickTwo() {
      fn.call(null, arg1, arg2);
    });
  case 4:
    return process.nextTick(function afterTickThree() {
      fn.call(null, arg1, arg2, arg3);
    });
  default:
    args = new Array(len - 1);
    i = 0;
    while (i < args.length) {
      args[i++] = arguments[i];
    }
    return process.nextTick(function afterTick() {
      fn.apply(null, args);
    });
  }
}


}).call(this,require('_process'))
},{"_process":28}],28:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],29:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":30}],30:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.

'use strict';

/*<replacement>*/

var pna = require('process-nextick-args');
/*</replacement>*/

/*<replacement>*/
var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }return keys;
};
/*</replacement>*/

module.exports = Duplex;

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

var Readable = require('./_stream_readable');
var Writable = require('./_stream_writable');

util.inherits(Duplex, Readable);

{
  // avoid scope creep, the keys array can then be collected
  var keys = objectKeys(Writable.prototype);
  for (var v = 0; v < keys.length; v++) {
    var method = keys[v];
    if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
  }
}

function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);

  Readable.call(this, options);
  Writable.call(this, options);

  if (options && options.readable === false) this.readable = false;

  if (options && options.writable === false) this.writable = false;

  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

  this.once('end', onend);
}

Object.defineProperty(Duplex.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function () {
    return this._writableState.highWaterMark;
  }
});

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended) return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  pna.nextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

Object.defineProperty(Duplex.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined || this._writableState === undefined) {
      return false;
    }
    return this._readableState.destroyed && this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (this._readableState === undefined || this._writableState === undefined) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
    this._writableState.destroyed = value;
  }
});

Duplex.prototype._destroy = function (err, cb) {
  this.push(null);
  this.end();

  pna.nextTick(cb, err);
};
},{"./_stream_readable":32,"./_stream_writable":34,"core-util-is":21,"inherits":24,"process-nextick-args":27}],31:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.

'use strict';

module.exports = PassThrough;

var Transform = require('./_stream_transform');

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

util.inherits(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);

  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};
},{"./_stream_transform":33,"core-util-is":21,"inherits":24}],32:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

/*<replacement>*/

var pna = require('process-nextick-args');
/*</replacement>*/

module.exports = Readable;

/*<replacement>*/
var isArray = require('isarray');
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;

/*<replacement>*/
var EE = require('events').EventEmitter;

var EElistenerCount = function (emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/
var Stream = require('./internal/streams/stream');
/*</replacement>*/

/*<replacement>*/

var Buffer = require('safe-buffer').Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}

/*</replacement>*/

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

/*<replacement>*/
var debugUtil = require('util');
var debug = void 0;
if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function () {};
}
/*</replacement>*/

var BufferList = require('./internal/streams/BufferList');
var destroyImpl = require('./internal/streams/destroy');
var StringDecoder;

util.inherits(Readable, Stream);

var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') return emitter.prependListener(event, fn);

  // This is a hack to make sure that our error handler is attached before any
  // userland ones.  NEVER DO THIS. This is here only because this code needs
  // to continue to work with older versions of Node.js that do not include
  // the prependListener() method. The goal is to eventually remove this hack.
  if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
}

function ReadableState(options, stream) {
  Duplex = Duplex || require('./_stream_duplex');

  options = options || {};

  // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.
  var isDuplex = stream instanceof Duplex;

  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;

  if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  var hwm = options.highWaterMark;
  var readableHwm = options.readableHighWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;

  if (hwm || hwm === 0) this.highWaterMark = hwm;else if (isDuplex && (readableHwm || readableHwm === 0)) this.highWaterMark = readableHwm;else this.highWaterMark = defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()
  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;

  // a flag to be able to tell if the event 'readable'/'data' is emitted
  // immediately, or on a later tick.  We set this to true at first, because
  // any actions that shouldn't happen until "later" should generally also
  // not happen before the first read call.
  this.sync = true;

  // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;

  // has it been destroyed
  this.destroyed = false;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // the number of writers that are awaiting a drain event in .pipe()s
  this.awaitDrain = 0;

  // if true, a maybeReadMore has been scheduled
  this.readingMore = false;

  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  Duplex = Duplex || require('./_stream_duplex');

  if (!(this instanceof Readable)) return new Readable(options);

  this._readableState = new ReadableState(options, this);

  // legacy
  this.readable = true;

  if (options) {
    if (typeof options.read === 'function') this._read = options.read;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;
  }

  Stream.call(this);
}

Object.defineProperty(Readable.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined) {
      return false;
    }
    return this._readableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._readableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
  }
});

Readable.prototype.destroy = destroyImpl.destroy;
Readable.prototype._undestroy = destroyImpl.undestroy;
Readable.prototype._destroy = function (err, cb) {
  this.push(null);
  cb(err);
};

// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function (chunk, encoding) {
  var state = this._readableState;
  var skipChunkCheck;

  if (!state.objectMode) {
    if (typeof chunk === 'string') {
      encoding = encoding || state.defaultEncoding;
      if (encoding !== state.encoding) {
        chunk = Buffer.from(chunk, encoding);
        encoding = '';
      }
      skipChunkCheck = true;
    }
  } else {
    skipChunkCheck = true;
  }

  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
};

// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function (chunk) {
  return readableAddChunk(this, chunk, null, true, false);
};

function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
  var state = stream._readableState;
  if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else {
    var er;
    if (!skipChunkCheck) er = chunkInvalid(state, chunk);
    if (er) {
      stream.emit('error', er);
    } else if (state.objectMode || chunk && chunk.length > 0) {
      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
        chunk = _uint8ArrayToBuffer(chunk);
      }

      if (addToFront) {
        if (state.endEmitted) stream.emit('error', new Error('stream.unshift() after end event'));else addChunk(stream, state, chunk, true);
      } else if (state.ended) {
        stream.emit('error', new Error('stream.push() after EOF'));
      } else {
        state.reading = false;
        if (state.decoder && !encoding) {
          chunk = state.decoder.write(chunk);
          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);
        } else {
          addChunk(stream, state, chunk, false);
        }
      }
    } else if (!addToFront) {
      state.reading = false;
    }
  }

  return needMoreData(state);
}

function addChunk(stream, state, chunk, addToFront) {
  if (state.flowing && state.length === 0 && !state.sync) {
    stream.emit('data', chunk);
    stream.read(0);
  } else {
    // update the buffer info.
    state.length += state.objectMode ? 1 : chunk.length;
    if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);

    if (state.needReadable) emitReadable(stream);
  }
  maybeReadMore(stream, state);
}

function chunkInvalid(state, chunk) {
  var er;
  if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  return er;
}

// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state) {
  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
}

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
};

// backwards compatibility.
Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
  this._readableState.decoder = new StringDecoder(enc);
  this._readableState.encoding = enc;
  return this;
};

// Don't raise the hwm > 8MB
var MAX_HWM = 0x800000;
function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }
  return n;
}

// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;
  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  }
  // If we're asking for more than the current hwm, then raise the hwm.
  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n;
  // Don't have enough
  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }
  return state.length;
}

// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;

  if (n !== 0) state.emittedReadable = false;

  // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state);

  // if we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  }

  // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.

  // if we need a readable event, then we need to do some reading.
  var doRead = state.needReadable;
  debug('need readable', doRead);

  // if we currently have less than the highWaterMark, then also read some
  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  }

  // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.
  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true;
    // if the length is currently zero, then we *need* a readable event.
    if (state.length === 0) state.needReadable = true;
    // call internal read method
    this._read(state.highWaterMark);
    state.sync = false;
    // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.
    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = true;
    n = 0;
  } else {
    state.length -= n;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true;

    // If we tried to read() past the EOF, then emit end on the next tick.
    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);

  return ret;
};

function onEofChunk(stream, state) {
  if (state.ended) return;
  if (state.decoder) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;

  // emit 'readable' now to make sure it gets picked up.
  emitReadable(stream);
}

// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;
  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    if (state.sync) pna.nextTick(emitReadable_, stream);else emitReadable_(stream);
  }
}

function emitReadable_(stream) {
  debug('emit readable');
  stream.emit('readable');
  flow(stream);
}

// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    pna.nextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  var len = state.length;
  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length)
      // didn't get any data, stop spinning.
      break;else len = state.length;
  }
  state.readingMore = false;
}

// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function (n) {
  this.emit('error', new Error('_read() is not implemented'));
};

Readable.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;
    case 1:
      state.pipes = [state.pipes, dest];
      break;
    default:
      state.pipes.push(dest);
      break;
  }
  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;

  var endFn = doEnd ? onend : unpipe;
  if (state.endEmitted) pna.nextTick(endFn);else src.once('end', endFn);

  dest.on('unpipe', onunpipe);
  function onunpipe(readable, unpipeInfo) {
    debug('onunpipe');
    if (readable === src) {
      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
        unpipeInfo.hasUnpiped = true;
        cleanup();
      }
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  }

  // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.
  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);

  var cleanedUp = false;
  function cleanup() {
    debug('cleanup');
    // cleanup event handlers once the pipe is broken
    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', unpipe);
    src.removeListener('data', ondata);

    cleanedUp = true;

    // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.
    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  // If the user pushes more data while we're writing to dest then we'll end up
  // in ondata again. However, we only want to increase awaitDrain once because
  // dest will only emit one 'drain' event for the multiple writes.
  // => Introduce a guard on increasing awaitDrain.
  var increasedAwaitDrain = false;
  src.on('data', ondata);
  function ondata(chunk) {
    debug('ondata');
    increasedAwaitDrain = false;
    var ret = dest.write(chunk);
    if (false === ret && !increasedAwaitDrain) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', src._readableState.awaitDrain);
        src._readableState.awaitDrain++;
        increasedAwaitDrain = true;
      }
      src.pause();
    }
  }

  // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.
  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);
  }

  // Make sure our error handler is attached before userland ones.
  prependListener(dest, 'error', onerror);

  // Both close and finish should trigger unpipe, but only once.
  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }
  dest.once('close', onclose);
  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }
  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  }

  // tell the dest that it's being piped to
  dest.emit('pipe', src);

  // start the flow if it hasn't been started already.
  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function () {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;
    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}

Readable.prototype.unpipe = function (dest) {
  var state = this._readableState;
  var unpipeInfo = { hasUnpiped: false };

  // if we're not piping anywhere, then do nothing.
  if (state.pipesCount === 0) return this;

  // just one destination.  most common case.
  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;

    if (!dest) dest = state.pipes;

    // got a match.
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this, unpipeInfo);
    return this;
  }

  // slow case. multiple pipe destinations.

  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++) {
      dests[i].emit('unpipe', this, unpipeInfo);
    }return this;
  }

  // try to find the right one.
  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;

  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];

  dest.emit('unpipe', this, unpipeInfo);

  return this;
};

// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function (ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);

  if (ev === 'data') {
    // Start flowing on next tick if stream isn't explicitly paused
    if (this._readableState.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    var state = this._readableState;
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.emittedReadable = false;
      if (!state.reading) {
        pna.nextTick(nReadingNextTick, this);
      } else if (state.length) {
        emitReadable(this);
      }
    }
  }

  return res;
};
Readable.prototype.addListener = Readable.prototype.on;

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
}

// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function () {
  var state = this._readableState;
  if (!state.flowing) {
    debug('resume');
    state.flowing = true;
    resume(this, state);
  }
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    pna.nextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  if (!state.reading) {
    debug('resume read 0');
    stream.read(0);
  }

  state.resumeScheduled = false;
  state.awaitDrain = 0;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);
  if (false !== this._readableState.flowing) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);
  while (state.flowing && stream.read() !== null) {}
}

// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function (stream) {
  var _this = this;

  var state = this._readableState;
  var paused = false;

  stream.on('end', function () {
    debug('wrapped end');
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) _this.push(chunk);
    }

    _this.push(null);
  });

  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk);

    // don't skip over falsy values in objectMode
    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = _this.push(chunk);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });

  // proxy all the other methods.
  // important when wrapping filters and duplexes.
  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function (method) {
        return function () {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  }

  // proxy certain important events.
  for (var n = 0; n < kProxyEvents.length; n++) {
    stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
  }

  // when we try to consume some more bytes, simply unpause the
  // underlying stream.
  this._read = function (n) {
    debug('wrapped _read', n);
    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return this;
};

Object.defineProperty(Readable.prototype, 'readableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function () {
    return this._readableState.highWaterMark;
  }
});

// exposed for testing purposes only.
Readable._fromList = fromList;

// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;

  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = fromListPartial(n, state.buffer, state.decoder);
  }

  return ret;
}

// Extracts only enough buffered data to satisfy the amount requested.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromListPartial(n, list, hasStrings) {
  var ret;
  if (n < list.head.data.length) {
    // slice is the same for buffers and strings
    ret = list.head.data.slice(0, n);
    list.head.data = list.head.data.slice(n);
  } else if (n === list.head.data.length) {
    // first chunk is a perfect match
    ret = list.shift();
  } else {
    // result spans more than one buffer
    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
  }
  return ret;
}

// Copies a specified amount of characters from the list of buffered data
// chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBufferString(n, list) {
  var p = list.head;
  var c = 1;
  var ret = p.data;
  n -= ret.length;
  while (p = p.next) {
    var str = p.data;
    var nb = n > str.length ? str.length : n;
    if (nb === str.length) ret += str;else ret += str.slice(0, n);
    n -= nb;
    if (n === 0) {
      if (nb === str.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = str.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

// Copies a specified amount of bytes from the list of buffered data chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBuffer(n, list) {
  var ret = Buffer.allocUnsafe(n);
  var p = list.head;
  var c = 1;
  p.data.copy(ret);
  n -= p.data.length;
  while (p = p.next) {
    var buf = p.data;
    var nb = n > buf.length ? buf.length : n;
    buf.copy(ret, ret.length - n, 0, nb);
    n -= nb;
    if (n === 0) {
      if (nb === buf.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = buf.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;

  // If we get here before consuming all the bytes, then that is a
  // bug in node.  Should never happen.
  if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

  if (!state.endEmitted) {
    state.ended = true;
    pna.nextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  // Check that we didn't get one last unshift.
  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');
  }
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./_stream_duplex":30,"./internal/streams/BufferList":35,"./internal/streams/destroy":36,"./internal/streams/stream":37,"_process":28,"core-util-is":21,"events":22,"inherits":24,"isarray":26,"process-nextick-args":27,"safe-buffer":42,"string_decoder/":44,"util":19}],33:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.

'use strict';

module.exports = Transform;

var Duplex = require('./_stream_duplex');

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

util.inherits(Transform, Duplex);

function afterTransform(er, data) {
  var ts = this._transformState;
  ts.transforming = false;

  var cb = ts.writecb;

  if (!cb) {
    return this.emit('error', new Error('write callback called multiple times'));
  }

  ts.writechunk = null;
  ts.writecb = null;

  if (data != null) // single equals check for both `null` and `undefined`
    this.push(data);

  cb(er);

  var rs = this._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    this._read(rs.highWaterMark);
  }
}

function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);

  Duplex.call(this, options);

  this._transformState = {
    afterTransform: afterTransform.bind(this),
    needTransform: false,
    transforming: false,
    writecb: null,
    writechunk: null,
    writeencoding: null
  };

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;

    if (typeof options.flush === 'function') this._flush = options.flush;
  }

  // When the writable side finishes, then flush out anything remaining.
  this.on('prefinish', prefinish);
}

function prefinish() {
  var _this = this;

  if (typeof this._flush === 'function') {
    this._flush(function (er, data) {
      done(_this, er, data);
    });
  } else {
    done(this, null, null);
  }
}

Transform.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
};

// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform = function (chunk, encoding, cb) {
  throw new Error('_transform() is not implemented');
};

Transform.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

Transform.prototype._destroy = function (err, cb) {
  var _this2 = this;

  Duplex.prototype._destroy.call(this, err, function (err2) {
    cb(err2);
    _this2.emit('close');
  });
};

function done(stream, er, data) {
  if (er) return stream.emit('error', er);

  if (data != null) // single equals check for both `null` and `undefined`
    stream.push(data);

  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  if (stream._writableState.length) throw new Error('Calling transform done when ws.length != 0');

  if (stream._transformState.transforming) throw new Error('Calling transform done when still transforming');

  return stream.push(null);
}
},{"./_stream_duplex":30,"core-util-is":21,"inherits":24}],34:[function(require,module,exports){
(function (process,global,setImmediate){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.

'use strict';

/*<replacement>*/

var pna = require('process-nextick-args');
/*</replacement>*/

module.exports = Writable;

/* <replacement> */
function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
}

// It seems a linked list but it is not
// there will be only 2 of these for each stream
function CorkedRequest(state) {
  var _this = this;

  this.next = null;
  this.entry = null;
  this.finish = function () {
    onCorkedFinish(_this, state);
  };
}
/* </replacement> */

/*<replacement>*/
var asyncWrite = !process.browser && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : pna.nextTick;
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Writable.WritableState = WritableState;

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

/*<replacement>*/
var internalUtil = {
  deprecate: require('util-deprecate')
};
/*</replacement>*/

/*<replacement>*/
var Stream = require('./internal/streams/stream');
/*</replacement>*/

/*<replacement>*/

var Buffer = require('safe-buffer').Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}

/*</replacement>*/

var destroyImpl = require('./internal/streams/destroy');

util.inherits(Writable, Stream);

function nop() {}

function WritableState(options, stream) {
  Duplex = Duplex || require('./_stream_duplex');

  options = options || {};

  // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.
  var isDuplex = stream instanceof Duplex;

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;

  if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  var hwm = options.highWaterMark;
  var writableHwm = options.writableHighWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;

  if (hwm || hwm === 0) this.highWaterMark = hwm;else if (isDuplex && (writableHwm || writableHwm === 0)) this.highWaterMark = writableHwm;else this.highWaterMark = defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // if _final has been called
  this.finalCalled = false;

  // drain event flag.
  this.needDrain = false;
  // at the start of calling end()
  this.ending = false;
  // when end() has been called, and returned
  this.ended = false;
  // when 'finish' is emitted
  this.finished = false;

  // has it been destroyed
  this.destroyed = false;

  // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.
  this.length = 0;

  // a flag to see when we're in the middle of a write.
  this.writing = false;

  // when true all writes will be buffered until .uncork() call
  this.corked = 0;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.
  this.bufferProcessing = false;

  // the callback that's passed to _write(chunk,cb)
  this.onwrite = function (er) {
    onwrite(stream, er);
  };

  // the callback that the user supplies to write(chunk,encoding,cb)
  this.writecb = null;

  // the amount that is being written when _write is called.
  this.writelen = 0;

  this.bufferedRequest = null;
  this.lastBufferedRequest = null;

  // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted
  this.pendingcb = 0;

  // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams
  this.prefinished = false;

  // True if the error was already emitted and should not be thrown again
  this.errorEmitted = false;

  // count buffered requests
  this.bufferedRequestCount = 0;

  // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two
  this.corkedRequestsFree = new CorkedRequest(this);
}

WritableState.prototype.getBuffer = function getBuffer() {
  var current = this.bufferedRequest;
  var out = [];
  while (current) {
    out.push(current);
    current = current.next;
  }
  return out;
};

(function () {
  try {
    Object.defineProperty(WritableState.prototype, 'buffer', {
      get: internalUtil.deprecate(function () {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
    });
  } catch (_) {}
})();

// Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.
var realHasInstance;
if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function (object) {
      if (realHasInstance.call(this, object)) return true;
      if (this !== Writable) return false;

      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function (object) {
    return object instanceof this;
  };
}

function Writable(options) {
  Duplex = Duplex || require('./_stream_duplex');

  // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.

  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.
  if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
    return new Writable(options);
  }

  this._writableState = new WritableState(options, this);

  // legacy.
  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;

    if (typeof options.writev === 'function') this._writev = options.writev;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;

    if (typeof options.final === 'function') this._final = options.final;
  }

  Stream.call(this);
}

// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function () {
  this.emit('error', new Error('Cannot pipe, not readable'));
};

function writeAfterEnd(stream, cb) {
  var er = new Error('write after end');
  // TODO: defer error events consistently everywhere, not just the cb
  stream.emit('error', er);
  pna.nextTick(cb, er);
}

// Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.
function validChunk(stream, state, chunk, cb) {
  var valid = true;
  var er = false;

  if (chunk === null) {
    er = new TypeError('May not write null values to stream');
  } else if (typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  if (er) {
    stream.emit('error', er);
    pna.nextTick(cb, er);
    valid = false;
  }
  return valid;
}

Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;
  var isBuf = !state.objectMode && _isUint8Array(chunk);

  if (isBuf && !Buffer.isBuffer(chunk)) {
    chunk = _uint8ArrayToBuffer(chunk);
  }

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;

  if (typeof cb !== 'function') cb = nop;

  if (state.ended) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
  }

  return ret;
};

Writable.prototype.cork = function () {
  var state = this._writableState;

  state.corked++;
};

Writable.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;

    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = Buffer.from(chunk, encoding);
  }
  return chunk;
}

Object.defineProperty(Writable.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function () {
    return this._writableState.highWaterMark;
  }
});

// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
  if (!isBuf) {
    var newChunk = decodeChunk(state, chunk, encoding);
    if (chunk !== newChunk) {
      isBuf = true;
      encoding = 'buffer';
      chunk = newChunk;
    }
  }
  var len = state.objectMode ? 1 : chunk.length;

  state.length += len;

  var ret = state.length < state.highWaterMark;
  // we must ensure that previous needDrain will not be reset to false.
  if (!ret) state.needDrain = true;

  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = {
      chunk: chunk,
      encoding: encoding,
      isBuf: isBuf,
      callback: cb,
      next: null
    };
    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }
    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;

  if (sync) {
    // defer the callback if we are being called synchronously
    // to avoid piling up things on the stack
    pna.nextTick(cb, er);
    // this can emit finish, and it will always happen
    // after error
    pna.nextTick(finishMaybe, stream, state);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
  } else {
    // the caller expect this to happen before if
    // it is async
    cb(er);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
    // this can emit finish, but finish must
    // always follow error
    finishMaybe(stream, state);
  }
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;

  onwriteStateUpdate(state);

  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state);

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      /*<replacement>*/
      asyncWrite(afterWrite, stream, state, finished, cb);
      /*</replacement>*/
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
}

// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
}

// if there's something in the buffer waiting, then process it
function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;

  if (stream._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;

    var count = 0;
    var allBuffers = true;
    while (entry) {
      buffer[count] = entry;
      if (!entry.isBuf) allBuffers = false;
      entry = entry.next;
      count += 1;
    }
    buffer.allBuffers = allBuffers;

    doWrite(stream, state, true, state.length, buffer, '', holder.finish);

    // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite
    state.pendingcb++;
    state.lastBufferedRequest = null;
    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }
    state.bufferedRequestCount = 0;
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;

      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      state.bufferedRequestCount--;
      // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.
      if (state.writing) {
        break;
      }
    }

    if (entry === null) state.lastBufferedRequest = null;
  }

  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}

Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new Error('_write() is not implemented'));
};

Writable.prototype._writev = null;

Writable.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

  // .end() fully uncorks
  if (state.corked) {
    state.corked = 1;
    this.uncork();
  }

  // ignore unnecessary end() calls.
  if (!state.ending && !state.finished) endWritable(this, state, cb);
};

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}
function callFinal(stream, state) {
  stream._final(function (err) {
    state.pendingcb--;
    if (err) {
      stream.emit('error', err);
    }
    state.prefinished = true;
    stream.emit('prefinish');
    finishMaybe(stream, state);
  });
}
function prefinish(stream, state) {
  if (!state.prefinished && !state.finalCalled) {
    if (typeof stream._final === 'function') {
      state.pendingcb++;
      state.finalCalled = true;
      pna.nextTick(callFinal, stream, state);
    } else {
      state.prefinished = true;
      stream.emit('prefinish');
    }
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(state);
  if (need) {
    prefinish(stream, state);
    if (state.pendingcb === 0) {
      state.finished = true;
      stream.emit('finish');
    }
  }
  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);
  if (cb) {
    if (state.finished) pna.nextTick(cb);else stream.once('finish', cb);
  }
  state.ended = true;
  stream.writable = false;
}

function onCorkedFinish(corkReq, state, err) {
  var entry = corkReq.entry;
  corkReq.entry = null;
  while (entry) {
    var cb = entry.callback;
    state.pendingcb--;
    cb(err);
    entry = entry.next;
  }
  if (state.corkedRequestsFree) {
    state.corkedRequestsFree.next = corkReq;
  } else {
    state.corkedRequestsFree = corkReq;
  }
}

Object.defineProperty(Writable.prototype, 'destroyed', {
  get: function () {
    if (this._writableState === undefined) {
      return false;
    }
    return this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._writableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._writableState.destroyed = value;
  }
});

Writable.prototype.destroy = destroyImpl.destroy;
Writable.prototype._undestroy = destroyImpl.undestroy;
Writable.prototype._destroy = function (err, cb) {
  this.end();
  cb(err);
};
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("timers").setImmediate)
},{"./_stream_duplex":30,"./internal/streams/destroy":36,"./internal/streams/stream":37,"_process":28,"core-util-is":21,"inherits":24,"process-nextick-args":27,"safe-buffer":42,"timers":45,"util-deprecate":46}],35:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Buffer = require('safe-buffer').Buffer;
var util = require('util');

function copyBuffer(src, target, offset) {
  src.copy(target, offset);
}

module.exports = function () {
  function BufferList() {
    _classCallCheck(this, BufferList);

    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  BufferList.prototype.push = function push(v) {
    var entry = { data: v, next: null };
    if (this.length > 0) this.tail.next = entry;else this.head = entry;
    this.tail = entry;
    ++this.length;
  };

  BufferList.prototype.unshift = function unshift(v) {
    var entry = { data: v, next: this.head };
    if (this.length === 0) this.tail = entry;
    this.head = entry;
    ++this.length;
  };

  BufferList.prototype.shift = function shift() {
    if (this.length === 0) return;
    var ret = this.head.data;
    if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
    --this.length;
    return ret;
  };

  BufferList.prototype.clear = function clear() {
    this.head = this.tail = null;
    this.length = 0;
  };

  BufferList.prototype.join = function join(s) {
    if (this.length === 0) return '';
    var p = this.head;
    var ret = '' + p.data;
    while (p = p.next) {
      ret += s + p.data;
    }return ret;
  };

  BufferList.prototype.concat = function concat(n) {
    if (this.length === 0) return Buffer.alloc(0);
    if (this.length === 1) return this.head.data;
    var ret = Buffer.allocUnsafe(n >>> 0);
    var p = this.head;
    var i = 0;
    while (p) {
      copyBuffer(p.data, ret, i);
      i += p.data.length;
      p = p.next;
    }
    return ret;
  };

  return BufferList;
}();

if (util && util.inspect && util.inspect.custom) {
  module.exports.prototype[util.inspect.custom] = function () {
    var obj = util.inspect({ length: this.length });
    return this.constructor.name + ' ' + obj;
  };
}
},{"safe-buffer":42,"util":19}],36:[function(require,module,exports){
'use strict';

/*<replacement>*/

var pna = require('process-nextick-args');
/*</replacement>*/

// undocumented cb() API, needed for core, not for public API
function destroy(err, cb) {
  var _this = this;

  var readableDestroyed = this._readableState && this._readableState.destroyed;
  var writableDestroyed = this._writableState && this._writableState.destroyed;

  if (readableDestroyed || writableDestroyed) {
    if (cb) {
      cb(err);
    } else if (err && (!this._writableState || !this._writableState.errorEmitted)) {
      pna.nextTick(emitErrorNT, this, err);
    }
    return this;
  }

  // we set destroyed to true before firing error callbacks in order
  // to make it re-entrance safe in case destroy() is called within callbacks

  if (this._readableState) {
    this._readableState.destroyed = true;
  }

  // if this is a duplex stream mark the writable part as destroyed as well
  if (this._writableState) {
    this._writableState.destroyed = true;
  }

  this._destroy(err || null, function (err) {
    if (!cb && err) {
      pna.nextTick(emitErrorNT, _this, err);
      if (_this._writableState) {
        _this._writableState.errorEmitted = true;
      }
    } else if (cb) {
      cb(err);
    }
  });

  return this;
}

function undestroy() {
  if (this._readableState) {
    this._readableState.destroyed = false;
    this._readableState.reading = false;
    this._readableState.ended = false;
    this._readableState.endEmitted = false;
  }

  if (this._writableState) {
    this._writableState.destroyed = false;
    this._writableState.ended = false;
    this._writableState.ending = false;
    this._writableState.finished = false;
    this._writableState.errorEmitted = false;
  }
}

function emitErrorNT(self, err) {
  self.emit('error', err);
}

module.exports = {
  destroy: destroy,
  undestroy: undestroy
};
},{"process-nextick-args":27}],37:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":22}],38:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":39}],39:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":30,"./lib/_stream_passthrough.js":31,"./lib/_stream_readable.js":32,"./lib/_stream_transform.js":33,"./lib/_stream_writable.js":34}],40:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":39}],41:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":34}],42:[function(require,module,exports){
/* eslint-disable node/no-deprecated-api */
var buffer = require('buffer')
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}

},{"buffer":20}],43:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = Stream;

var EE = require('events').EventEmitter;
var inherits = require('inherits');

inherits(Stream, EE);
Stream.Readable = require('readable-stream/readable.js');
Stream.Writable = require('readable-stream/writable.js');
Stream.Duplex = require('readable-stream/duplex.js');
Stream.Transform = require('readable-stream/transform.js');
Stream.PassThrough = require('readable-stream/passthrough.js');

// Backwards-compat with node 0.4.x
Stream.Stream = Stream;



// old-style streams.  Note that the pipe method (the only relevant
// part of this class) is overridden in the Readable class.

function Stream() {
  EE.call(this);
}

Stream.prototype.pipe = function(dest, options) {
  var source = this;

  function ondata(chunk) {
    if (dest.writable) {
      if (false === dest.write(chunk) && source.pause) {
        source.pause();
      }
    }
  }

  source.on('data', ondata);

  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }

  dest.on('drain', ondrain);

  // If the 'end' option is not supplied, dest.end() will be called when
  // source gets the 'end' or 'close' events.  Only dest.end() once.
  if (!dest._isStdio && (!options || options.end !== false)) {
    source.on('end', onend);
    source.on('close', onclose);
  }

  var didOnEnd = false;
  function onend() {
    if (didOnEnd) return;
    didOnEnd = true;

    dest.end();
  }


  function onclose() {
    if (didOnEnd) return;
    didOnEnd = true;

    if (typeof dest.destroy === 'function') dest.destroy();
  }

  // don't leave dangling pipes when there are errors.
  function onerror(er) {
    cleanup();
    if (EE.listenerCount(this, 'error') === 0) {
      throw er; // Unhandled stream error in pipe.
    }
  }

  source.on('error', onerror);
  dest.on('error', onerror);

  // remove all the event listeners that were added.
  function cleanup() {
    source.removeListener('data', ondata);
    dest.removeListener('drain', ondrain);

    source.removeListener('end', onend);
    source.removeListener('close', onclose);

    source.removeListener('error', onerror);
    dest.removeListener('error', onerror);

    source.removeListener('end', cleanup);
    source.removeListener('close', cleanup);

    dest.removeListener('close', cleanup);
  }

  source.on('end', cleanup);
  source.on('close', cleanup);

  dest.on('close', cleanup);

  dest.emit('pipe', source);

  // Allow for unix-like usage: A.pipe(B).pipe(C)
  return dest;
};

},{"events":22,"inherits":24,"readable-stream/duplex.js":29,"readable-stream/passthrough.js":38,"readable-stream/readable.js":39,"readable-stream/transform.js":40,"readable-stream/writable.js":41}],44:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

/*<replacement>*/

var Buffer = require('safe-buffer').Buffer;
/*</replacement>*/

var isEncoding = Buffer.isEncoding || function (encoding) {
  encoding = '' + encoding;
  switch (encoding && encoding.toLowerCase()) {
    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
      return true;
    default:
      return false;
  }
};

function _normalizeEncoding(enc) {
  if (!enc) return 'utf8';
  var retried;
  while (true) {
    switch (enc) {
      case 'utf8':
      case 'utf-8':
        return 'utf8';
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return 'utf16le';
      case 'latin1':
      case 'binary':
        return 'latin1';
      case 'base64':
      case 'ascii':
      case 'hex':
        return enc;
      default:
        if (retried) return; // undefined
        enc = ('' + enc).toLowerCase();
        retried = true;
    }
  }
};

// Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings
function normalizeEncoding(enc) {
  var nenc = _normalizeEncoding(enc);
  if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
  return nenc || enc;
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.
exports.StringDecoder = StringDecoder;
function StringDecoder(encoding) {
  this.encoding = normalizeEncoding(encoding);
  var nb;
  switch (this.encoding) {
    case 'utf16le':
      this.text = utf16Text;
      this.end = utf16End;
      nb = 4;
      break;
    case 'utf8':
      this.fillLast = utf8FillLast;
      nb = 4;
      break;
    case 'base64':
      this.text = base64Text;
      this.end = base64End;
      nb = 3;
      break;
    default:
      this.write = simpleWrite;
      this.end = simpleEnd;
      return;
  }
  this.lastNeed = 0;
  this.lastTotal = 0;
  this.lastChar = Buffer.allocUnsafe(nb);
}

StringDecoder.prototype.write = function (buf) {
  if (buf.length === 0) return '';
  var r;
  var i;
  if (this.lastNeed) {
    r = this.fillLast(buf);
    if (r === undefined) return '';
    i = this.lastNeed;
    this.lastNeed = 0;
  } else {
    i = 0;
  }
  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
  return r || '';
};

StringDecoder.prototype.end = utf8End;

// Returns only complete characters in a Buffer
StringDecoder.prototype.text = utf8Text;

// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
StringDecoder.prototype.fillLast = function (buf) {
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
  this.lastNeed -= buf.length;
};

// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte. If an invalid byte is detected, -2 is returned.
function utf8CheckByte(byte) {
  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
  return byte >> 6 === 0x02 ? -1 : -2;
}

// Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.
function utf8CheckIncomplete(self, buf, i) {
  var j = buf.length - 1;
  if (j < i) return 0;
  var nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 1;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 2;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) {
      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
    }
    return nb;
  }
  return 0;
}

// Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function utf8CheckExtraBytes(self, buf, p) {
  if ((buf[0] & 0xC0) !== 0x80) {
    self.lastNeed = 0;
    return '\ufffd';
  }
  if (self.lastNeed > 1 && buf.length > 1) {
    if ((buf[1] & 0xC0) !== 0x80) {
      self.lastNeed = 1;
      return '\ufffd';
    }
    if (self.lastNeed > 2 && buf.length > 2) {
      if ((buf[2] & 0xC0) !== 0x80) {
        self.lastNeed = 2;
        return '\ufffd';
      }
    }
  }
}

// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
function utf8FillLast(buf) {
  var p = this.lastTotal - this.lastNeed;
  var r = utf8CheckExtraBytes(this, buf, p);
  if (r !== undefined) return r;
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, p, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, p, 0, buf.length);
  this.lastNeed -= buf.length;
}

// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.
function utf8Text(buf, i) {
  var total = utf8CheckIncomplete(this, buf, i);
  if (!this.lastNeed) return buf.toString('utf8', i);
  this.lastTotal = total;
  var end = buf.length - (total - this.lastNeed);
  buf.copy(this.lastChar, 0, end);
  return buf.toString('utf8', i, end);
}

// For UTF-8, a replacement character is added when ending on a partial
// character.
function utf8End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + '\ufffd';
  return r;
}

// UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.
function utf16Text(buf, i) {
  if ((buf.length - i) % 2 === 0) {
    var r = buf.toString('utf16le', i);
    if (r) {
      var c = r.charCodeAt(r.length - 1);
      if (c >= 0xD800 && c <= 0xDBFF) {
        this.lastNeed = 2;
        this.lastTotal = 4;
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
        return r.slice(0, -1);
      }
    }
    return r;
  }
  this.lastNeed = 1;
  this.lastTotal = 2;
  this.lastChar[0] = buf[buf.length - 1];
  return buf.toString('utf16le', i, buf.length - 1);
}

// For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.
function utf16End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) {
    var end = this.lastTotal - this.lastNeed;
    return r + this.lastChar.toString('utf16le', 0, end);
  }
  return r;
}

function base64Text(buf, i) {
  var n = (buf.length - i) % 3;
  if (n === 0) return buf.toString('base64', i);
  this.lastNeed = 3 - n;
  this.lastTotal = 3;
  if (n === 1) {
    this.lastChar[0] = buf[buf.length - 1];
  } else {
    this.lastChar[0] = buf[buf.length - 2];
    this.lastChar[1] = buf[buf.length - 1];
  }
  return buf.toString('base64', i, buf.length - n);
}

function base64End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
  return r;
}

// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
function simpleWrite(buf) {
  return buf.toString(this.encoding);
}

function simpleEnd(buf) {
  return buf && buf.length ? this.write(buf) : '';
}
},{"safe-buffer":42}],45:[function(require,module,exports){
(function (setImmediate,clearImmediate){
var nextTick = require('process/browser.js').nextTick;
var apply = Function.prototype.apply;
var slice = Array.prototype.slice;
var immediateIds = {};
var nextImmediateId = 0;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) { timeout.close(); };

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// That's not how node.js implements it but the exposed api is the same.
exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
  var id = nextImmediateId++;
  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

  immediateIds[id] = true;

  nextTick(function onNextTick() {
    if (immediateIds[id]) {
      // fn.call() is faster so we optimize for the common use-case
      // @see http://jsperf.com/call-apply-segu
      if (args) {
        fn.apply(null, args);
      } else {
        fn.call(null);
      }
      // Prevent ids from leaking
      exports.clearImmediate(id);
    }
  });

  return id;
};

exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
  delete immediateIds[id];
};
}).call(this,require("timers").setImmediate,require("timers").clearImmediate)
},{"process/browser.js":28,"timers":45}],46:[function(require,module,exports){
(function (global){

/**
 * Module exports.
 */

module.exports = deprecate;

/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `console.trace()` instead of `console.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */

function deprecate (fn, msg) {
  if (config('noDeprecation')) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (config('throwDeprecation')) {
        throw new Error(msg);
      } else if (config('traceDeprecation')) {
        console.trace(msg);
      } else {
        console.warn(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
}

/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */

function config (name) {
  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
  try {
    if (!global.localStorage) return false;
  } catch (_) {
    return false;
  }
  var val = global.localStorage[name];
  if (null == val) return false;
  return String(val).toLowerCase() === 'true';
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],47:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],48:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":47,"_process":28,"inherits":24}]},{},[1])(1)
});
