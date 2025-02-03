/**
 * author: Pieter Heyvaert (pheyvaer.heyvaert@ugent.be)
 * Ghent University - imec - IDLab
 */

const namespaces = {
  rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
  rr: 'http://www.w3.org/ns/r2rml#',
  rml: 'http://semweb.mmlab.be/ns/rml#',
  ql: 'http://semweb.mmlab.be/ns/ql#',
  fno: 'http://w3id.org/function/ontology#',
  fnml: 'http://semweb.mmlab.be/ns/fnml#',
  dcterms: 'http://purl.org/dc/terms/',
  rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
  rlog: 'http://persistence.uni-leipzig.org/nlp2rdf/ontologies/rlog#',
  changeset: 'http://vocab.org/changeset/schema#',
  nc: 'http://www.ournicecode.org#'
};

class RMLReader {

  constructor(rmlStore, mappingSources) {
    this.rmlStore = rmlStore;
    this.mappingSources = mappingSources;
    this.uniqueID = 0;
    this.triplesMapIDMap = {};
    this.delayedParentTriplesMaps = [];
  }

  read() {
    // The number of nodes can be calculated as:
    // # subject maps + # object maps - # object maps which are a subject map (i.e. referencing object maps)
    let numTriplesMaps = this.rmlStore.countQuads(null, namedNode(namespaces.rdf + 'type'), namedNode(namespaces.rr + 'TriplesMap'), null);
    let numPredicateObjectMaps = this.rmlStore.countQuads(null, namedNode(namespaces.rr + 'predicateObjectMap'), null, null);
    let numReferencingObjectMaps = this.rmlStore.countQuads(null, namedNode(namespaces.rr + 'parentTriplesMap'), null, null);
    let numNodes = numTriplesMaps + numPredicateObjectMaps - numReferencingObjectMaps;

    if (APPLICATION_CONFIG.nodeLimit !== undefined && numNodes > APPLICATION_CONFIG.nodeLimit) {
      CommandInvoker.getInvoker().execute(new ShowErrorMessageCommand("Could not load file.",
          "Contains more nodes than limit (" + APPLICATION_CONFIG.nodeLimit + ")"));
      return;
    }

    graphActions.clear();

    const triplesMaps = this.rmlStore.getQuads(null, namedNode(namespaces.rdf + 'type'), namedNode(namespaces.rr + 'TriplesMap')).map(a => a.subject);

    triplesMaps.forEach(triplesMap => {
      const tmID = this._getUniqueID();
      const tmNode = {id: tmID};
      const edges = [];
      let localSource = null;

      this.triplesMapIDMap[triplesMap.value] = tmID;

      //process Logical Source
      const logicalSources = this.rmlStore.getQuads(triplesMap, namedNode(namespaces.rml + 'logicalSource'), null).map(a => a.object);

      if (logicalSources.length > 0) {
        const sources = this.rmlStore.getQuads(logicalSources[0], namedNode(namespaces.rml + 'source'), null).map(a => a.object.value);
        const referenceFormulations = this.rmlStore.getQuads(logicalSources[0], namedNode(namespaces.rml + 'referenceFormulation'), null).map(a => a.object.value);
        const iterators = this.rmlStore.getQuads(logicalSources[0], namedNode(namespaces.rml + 'iterator'), null).map(a => a.object.value);

        if (sources.length > 0 && referenceFormulations.length > 0) {
          const source = sources[0];
          const referenceFormulation = referenceFormulations[0];

          const s = inputStore.getSourceByTitle(source);

          if (s) {
            localSource = {
              source: s,
              referenceFormulation,
            };

            if (iterators.length > 0) {
              localSource.iterator = iterators[0];
              tmNode.iterator = iterators[0];
            }

            tmNode.source = localSource.source;
          }
        }
      }

      //process Subject Maps
      const subjectMaps = this.rmlStore.getQuads(triplesMap, namedNode(namespaces.rr + 'subjectMap'), null).map(a => a.object);

      if (subjectMaps.length > 0) {
        const termTypes = this.rmlStore.getQuads(subjectMaps[0], namedNode(namespaces.rr + 'termType'), null).map(a => a.object.value);
        const classes = this.rmlStore.getQuads(subjectMaps[0], namedNode(namespaces.rr + 'class'), null).map(a => a.object.value);
        const comments = this.rmlStore.getQuads(subjectMaps[0], namedNode(namespaces.rdfs + 'comment'), null).map(a => a.object.value);
        const descriptions = this.rmlStore.getQuads(subjectMaps[0], namedNode(namespaces.dcterms + 'description'), null).map(a => a.object.value);

        if (termTypes.length > 0 && termTypes[0] === namespaces.rr + 'BlankNode') {
          tmNode.type = 'blank';
        } else {
          tmNode.type = 'resource';
        }

        const subject = this._getTemplateOfTermMap(subjectMaps[0]);

        if (subject) {
          tmNode.template = Util.collapsePrefix(subject);
        }
        
        if (classes.length > 0) {
          tmNode.className = Util.collapsePrefix(classes[0]);
        }
        if(comments.length > 0) {
          tmNode.comment = comments[0];
        }

        if(descriptions.length > 0) {
          tmNode.description = descriptions[0];
        }
      }


      //process Predicate Object Maps
      const predicateObjectMaps = this.rmlStore.getQuads(triplesMap, namedNode(namespaces.rr + 'predicateObjectMap'), null).map(a => a.object);

      // decision tree below can be summarised as follows (python-style indentation for scopes):
      // for all predicate object maps (po-maps):
      //   for all its predicate maps:
      //     if there are no object maps for this po-map:
      //       add a literal object node with object id to graph (don't really understand why) (and save edge)
      //     else:
      //       for all object maps of this po-map:
      //         if it's a template-valued object:
      //           add template object node to graph (and save edge)
      //         elif it's a referencing object map:
      //           save the reference to add the edge later
      //         else: (this means it's a literal-valued object map)
      //           add literal object node to graph (and save edge)
      //     add saved edges to graph
      // add saved references to graph

      predicateObjectMaps.forEach(predicateObjectMap => {
        const predicates = this.rmlStore.getQuads(predicateObjectMap, namedNode(namespaces.rr + 'predicate'), null).map(a => a.object.value);
        const predicateMaps = this.rmlStore.getQuads(predicateObjectMap, namedNode(namespaces.rr + 'predicateMap'), null).map(a => a.object);
        const objectMaps = this.rmlStore.getQuads(predicateObjectMap, namedNode(namespaces.rr + 'objectMap'), null).map(a => a.object);

        
        [...predicateMaps, ...predicates].forEach(predicateMap => {
          const objectNodeIDs = [];
          let predicate = predicateMap;
          let predicate_comments = [];
          let predicate_descriptions = []
          if(predicateMap.id) {
            predicate = this._getTemplateOfTermMap(predicateMap);
            predicate_comments = this.rmlStore.getQuads(predicateMap, namedNode(namespaces.rdfs + "comment"), null).map(a => a.object.value)
            predicate_descriptions = this.rmlStore.getQuads(predicateMap, namedNode(namespaces.dcterms + "description"), null).map(a => a.object.value)
          }
          console.log(predicate_descriptions)
          if (objectMaps.length === 0) {
            const id =  this._getUniqueID();
            const objectNode = {
              id,
              type: 'literal'
            };

            objectNodeIDs.push(id);
            graphActions.addNode(objectNode, true);
          } else {
            objectMaps.forEach(objectMap => {
              const id =  this._getUniqueID();
              const object = this._getTemplateOfTermMap(objectMap);
              const parentTriplesMaps = this.rmlStore.getQuads(objectMap, namedNode(namespaces.rr + 'parentTriplesMap')).map(a => a.object);
              const datatypes = this.rmlStore.getQuads(objectMap, namedNode(namespaces.rr + 'datatype')).map(a => a.object.value);
              const comments = this.rmlStore.getQuads(objectMap, namedNode(namespaces.rdfs + 'comment')).map(a => a.object.value);
              const descriptions = this.rmlStore.getQuads(objectMap, namedNode(namespaces.dcterms + 'description')).map(a => a.object.value);

              if (object) {
                const objectNode = {
                  id,
                  type: 'literal',
                  valueType: ValueTypes.TEMPLATE,
                  template: Util.collapsePrefix(object)
                };

                if (datatypes.length > 0) {
                  objectNode.datatype = Util.collapsePrefix(datatypes[0]);
                }

                if (localSource) {
                  objectNode.source = localSource.source;

                  if (localSource.iterator) {
                    objectNode.iterator = localSource.iterator;
                  }
                }
                if(comments.length > 0) {
                  objectNode.comment = comments[0];
                }
                if(descriptions.length > 0) {
                  objectNode.description = descriptions[0];
                }

                objectNodeIDs.push(id);
                graphActions.addNode(objectNode, true);
              } else if (parentTriplesMaps.length > 0) {
                //dealing with a Referencing Object Map
                const parentTriplesMap = parentTriplesMaps[0];
                const joinConditions = this.rmlStore.getQuads(objectMap, namedNode(namespaces.rr + 'joinCondition')).map(a => a.object);

                if (this.triplesMapIDMap[parentTriplesMap.value]) {
                  objectNodeIDs.push(this.triplesMapIDMap[parentTriplesMap.value]);
                } else {
                  const edge = {
                    sourceID: tmNode.id,
                    id: this._getUniqueID(),
                    valueType: ValueTypes.TEMPLATE,
                    template: Util.collapsePrefix(predicate),
                    comment: predicate_comments.length > 0 ? predicate_comments[0]:"",
                    description: predicate_descriptions.length > 0 ? predicate_descriptions[0]:""
                  };

                  if (joinConditions.length > 0) {
                    const joinCondition = joinConditions[0];
                    const childs = this.rmlStore.getQuads(joinCondition, namedNode(namespaces.rr + 'child')).map(a => a.object.value);
                    const parents = this.rmlStore.getQuads(joinCondition, namedNode(namespaces.rr + 'parent')).map(a => a.object.value);

                    if (childs.length > 0 && parents.length > 0) {
                      edge.conditions = {
                        join: {
                          all: false,
                          child: childs[0],
                          parent: parents[0]
                        }
                      };
                    }
                  }

                  this.delayedParentTriplesMaps.push({
                    parentTriplesMap: parentTriplesMap.value,
                    edge
                  });
                }

                console.log(parentTriplesMap);
              } else {
                const objectNode = {
                  id,
                  type: 'literal'
                };

                if (datatypes.length > 0) {
                  objectNode.datatype = datatypes[0];
                }

                objectNodeIDs.push(id);
                graphActions.addNode(objectNode, true);
              }
            });
          }

          objectNodeIDs.forEach(targetID => {
            const edge = {
              sourceID: tmNode.id,
              targetID,
              id: this._getUniqueID(),
              valueType: ValueTypes.TEMPLATE,
              template: Util.collapsePrefix(predicate),
              comment: predicate_comments.length > 0 ? predicate_comments[0]:"",
              description: predicate_descriptions.length > 0 ? predicate_descriptions[0]:""
      };

            edges.push(edge);
          });
        });
      });


      console.log(tmNode);
      console.log(edges);

      if(!tmNode.marked) {
        graphActions.addNode(tmNode, true);
      }
      edges.forEach(edge => {
        if (edge.template === "rdf:type" && !graphStore.findNode(edge.sourceID).className) {
          const sourceNode = graphStore.findNode(edge.sourceID);
          const targetNode = graphStore.findNode(edge.targetID);

          graphActions.updateNode(sourceNode.id, {className:targetNode.template});
          graphActions.removeNode(targetNode.id);
        } else {
          graphActions.addEdge(edge, true);
        }
      });
    });

    this.delayedParentTriplesMaps.forEach(delayed => {
      delayed.edge.targetID = this.triplesMapIDMap[delayed.parentTriplesMap];
      graphActions.addEdge(delayed.edge, true);
    });

    graphActions.buildGraph(false);
  }

  _getUniqueID() {
    const temp = this.uniqueID;
    this.uniqueID ++;

    return temp;
  }

  _getTemplateOfTermMap(termMapNode) {
    const constants = this.rmlStore.getQuads(termMapNode, namedNode(namespaces.rr + 'constant')).map(a => a.object.value);
    const templates = this.rmlStore.getQuads(termMapNode, namedNode(namespaces.rr + 'template')).map(a => a.object.value);
    const references = this.rmlStore.getQuads(termMapNode, namedNode(namespaces.rml + 'reference')).map(a => a.object.value);

    if (constants.length > 0) {
      return Util.collapsePrefix(constants[0]);
    } else if (templates.length > 0) {
      return Util.collapsePrefix(templates[0]);
    } else if (references.length > 0) {
      return `{${references[0]}}`;
    } else {
      return null;
    }
  }
}