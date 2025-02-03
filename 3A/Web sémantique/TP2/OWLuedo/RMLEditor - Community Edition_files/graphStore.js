/**
 * Created by Pieter Heyvaert, Data Science Lab (Ghent University - iMinds) on 5/2/16.
 */
"use strict";

/**
 * Created by Pieter Heyvaert, Data Science Lab (Ghent University - iMinds) on 5/2/16.
 */
"use strict";

function GraphStore() {
  this.nodes = [];
  this.edges = [];
  this.latestID = 0;
  this.latestUpdates = [];

  var self = this;

  this.bindListeners({
    addNode: graphActions.addNode,
    addEdge: graphActions.addEdge,
    clear: graphActions.clear,
    removeNode: graphActions.removeNode,
    removeEdge: graphActions.removeEdge,
    updateEdge: graphActions.updateEdge,
    updateNode: graphActions.updateNode,
    addError: graphActions.addError,
    reverseEdge: graphActions.reverseEdge,
    removeSource: graphActions.removeSource
  });

  this.exportPublicMethods({
    getAllNodeIDs: function() {
      var ids = [];
      var nodes = this.getState().nodes;

      for (var i = 0; i < nodes.length; i++) {
        ids.push(nodes[i].id);
      }

      return ids;
    },
    countNodes: function() {
      return this.getState().nodes.length;
    },
    getAllEdgeIDs: function () {
      var ids = [];
      var edges = this.getState().edges;

      for (var i = 0; i < edges.length; i++) {
        ids.push(edges[i].id);
      }

      return ids;
    },
    hasEdgeWithNodeAsTarget: function (id) {
      var i = 0;
      var edges = this.getState().edges;

      while (i < edges.length && edges[i].targetID !== id) {
        i++;
      }

      return i < edges.length;
    },

    getEdgeWithNodeAsTarget: function (id) {
      var i = 0;
      var edges = this.getState().edges;

      while (i < edges.length && edges[i].targetID !== id) {
        i++;
      }

      if (i < edges.length) {
        return {
          edge: edges[i],
          sourceNode: this.findNode(edges[i].sourceID)
        }
      }

      return null;
    },

    getEdgesWithNodesAsSource: function (id) {
      var results = [];
      var edges = this.getState().edges;

      for (var i = 0; i < edges.length; i++) {
        if (edges[i].sourceID === id) {
          results.push({
            edge: edges[i],
            targetNode: this.findNode(edges[i].targetID)
          });
        }
      }

      return results;
    },

    /*
     Get all the nodes that are the target of an edge with the given node (@id) as source node of the edge.
     */
    getAllTargetNodes: function (id) {
      var targetNodes = [];
      var edges = this.getState().edges;

      for (var i = 0; i < edges.length; i++) {
        if (edges[i].sourceID === id) {
          targetNodes.push(this.findNode(edges[i].targetID));
        }
      }

      return targetNodes;
    },

    /*
     Get all the resource nodes.
     */
    getAllResourceNodesFromSource: function (sourceID) {
      var resources = [];
      var nodes = this.getState().nodes;

      for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].type === 'resource' && nodes[i].source && nodes[i].source.id === sourceID) {
          resources.push(nodes[i]);
        }
      }

      return resources;
    },

    equals: function (node1, node2) {
      return node1.id && node2.id && node1.id === node2.id;
    },

    toString: function () {
      var string = "";
      var nodes = this.getState().nodes;
      var edges = this.getState().edges;

      function helper(n) {
        if (n.source) {
          string += ("\tsource=" + n.source.id + "\n");
        }

        if (n.valueType) {
          string += ("\tvalueType=" + n.valueType + "\n");
          string += ("\tvalue=" + n.constant + '-' + n.reference + '-' + n.template + "\n");
        }
      }

      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];

        string += (n.type + " id=" + n.id + "\n");

        if (n.type === "resource" && n.className) {
          string += ("\tclassName=" + n.className + "\n");
        } else if (n.datatype) {
          string += ("\tdatatype=" + n.datatype + "\n");
        }

        helper(n);
      }

      for (var i = 0; i < edges.length; i++) {
        var e = edges[i];

        string += ("edge id=" + e.id + "\n");

        string += ("\tsourceID=" + e.sourceID + "\n");
        string += ("\ttargetID=" + e.targetID + "\n");

        helper(e);
      }

      return string;
    },

    getNewID: function() {
      return self.getNewID();
    },
    findNode: function(id) {
      return self.findNode(id);
    },
    findEdge: function(id) {
      return self.findEdge(id);
    },
    removeSource: function(id) {
      return self.removeSource(id)
    } 
  });
}

GraphStore.prototype.setLatestID = function (id) {
  this.latestID = id;
};

GraphStore.prototype.getNewID = function () {
  var r = this.latestID;
  this.latestID++;

  return r;
};

GraphStore.prototype.addNode = function (data, clearLatestUpdates) {
  var node = data.node;
  clearLatestUpdates = clearLatestUpdates === undefined ? true : clearLatestUpdates;

  if (node.id === undefined) {
    node.id = this.getNewID();
  } else if (parseInt(node.id) >= this.latestID) {
    this.latestID = parseInt(node.id) + 1;
  }

  var valueType = ValueTypes.TEMPLATE;

  var newNode = $.extend({
    valueType: valueType,
    reference: null,
    template: '',
    constant: null,
    type: "resource",
    className: null,
    datatype: null,
    verification : false,
    completion: false,
    errors: [],
    language: null,
    expanded: true,
    scale: 1,
    functions: []
  }, node);

  if (clearLatestUpdates) {
    this.latestUpdates = [];
  }

  this.latestUpdates.push({type: GraphUpdateTypes.NODE_ADDED, id: node.id});
  this.nodes.push(newNode);
};

GraphStore.prototype.addEdge = function (data, clearLatestUpdates) {
  var edge = data.edge;
  clearLatestUpdates = clearLatestUpdates === undefined ? true : clearLatestUpdates;

  if (edge.id === undefined) {
    edge.id = this.getNewID();
  } else if (parseInt(edge.id) >= this.latestID) {
    this.latestID = parseInt(edge.id) + 1;
  }

  var newEdge = $.extend({
    id: this.getNewID(),
    valueType: ValueTypes.TEMPLATE,
    reference: null,
    template: null,
    constant: null,
    sourceID: null,
    edgeID: null,
    errors: [],
    conditions: {
      join: {
        all: true
      }
    },
    functions: []
  }, edge);

  newEdge.sourceData = this.findNode(newEdge.sourceID).source
  newEdge.selector = this.findNode(newEdge.sourceID).iterator
  if (clearLatestUpdates) {
    this.latestUpdates = [];
  }

  this.latestUpdates.push({type: GraphUpdateTypes.EDGE_ADDED, id: edge.id});

  this.edges.push(newEdge);
};

GraphStore.prototype.clear = function () {
  this.latestUpdates = [];

  for (var i = 0; i < this.nodes.length; i ++) {
    this.latestUpdates.push({type: GraphUpdateTypes.NODE_DELETED, id: this.nodes[i].id});
  }

  this.nodes = [];

  for (var i = 0; i < this.edges.length; i ++) {
    this.latestUpdates.push({type: GraphUpdateTypes.EDGE_DELETED, id: this.edges[i].id});
  }

  this.edges = [];
};

GraphStore.prototype.load = function (nodes, edges) {
  this.clear();

  for (var i = 0; i < nodes.length; i++) {
    this.addNode(nodes[i], false);
  }

  for (var i = 0; i < edges.length; i++) {
    this.addEdge(edges[i], false);
  }
};

GraphStore.prototype.findEdge = function (id) {
  var i = 0;

  while (i < this.edges.length && this.edges[i].id != id) {
    i++;
  }

  if (i < this.edges.length) {
    return this.edges[i];
  }

  return null;
};

GraphStore.prototype.updateEdge = function (data, clearLatestUpdates=true) {
  var id = data.id;
  var edge = data.edge;
  var old = this.findEdge(id);

  if (!old)
    return null;

  if (clearLatestUpdates) {
    console.log("reset")
    this.latestUpdates = [{type: GraphUpdateTypes.EDGE_UPDATED, id: id}];
  } else {
    this.latestUpdates.push({type: GraphUpdateTypes.EDGE_UPDATED, id: id});
  }
  console.log(edge)
  return $.extend(old, edge);
};

GraphStore.prototype.updateNode = function (data, clearLatestUpdates) {
  clearLatestUpdates = clearLatestUpdates === undefined ? true : clearLatestUpdates;
  var id = data.id;
  var node = data.node;
  var old = this.findNode(id);

  if (!old)
    return null;

  if (clearLatestUpdates) {
    this.latestUpdates = [{type: GraphUpdateTypes.NODE_UPDATED, id: id}];
  } else {
    this.latestUpdates.push({type: GraphUpdateTypes.NODE_UPDATED, id: id});
  }

  const newNode = $.extend(old, node);
  const edges = graphStore.getEdgesWithNodesAsSource(id)
  edges.forEach(edge => this.updateEdge({id: edge.edge.id, edge: {sourceData: newNode.source, selector: newNode.iterator}}))
  return newNode;
};

GraphStore.prototype.findNode = function (id) {
  var i = 0;

  while (i < this.nodes.length && this.nodes[i].id != id) {
    i++;
  }

  if (i < this.nodes.length) {
    return this.nodes[i];
  }

  return null;
};

GraphStore.prototype.removeNode = function (id, clearLatestUpdates) {
  clearLatestUpdates = clearLatestUpdates === undefined ? true : clearLatestUpdates;

  var i = 0;
  while (i < this.nodes.length && this.nodes[i].id !== id) {
    i++;
  }

  if (i < this.nodes.length) {
    this.nodes.splice(i, 1);
    if (clearLatestUpdates) {
      this.latestUpdates = [];
    }
    this.latestUpdates.push({type: GraphUpdateTypes.NODE_DELETED, id: id});

    var toRemoveEdges = [];

    for (var j = 0; j < this.edges.length; j++) {
      if (this.edges[j].sourceID === id || this.edges[j].targetID === id) {
        toRemoveEdges.push(this.edges[j].id);
      }
    }

    for (var j = 0; j < toRemoveEdges.length; j++) {
      this.removeEdge(toRemoveEdges[j], false, false);
    }
  }
};

GraphStore.prototype.removeEdge = function (id, removeNodes, clearLatestUpdates) {
  clearLatestUpdates = clearLatestUpdates === undefined ? true : clearLatestUpdates;

  var i = 0;
  while (i < this.edges.length && this.edges[i].id !== id) {
    i++;
  }

  if (i < this.edges.length) {
    var edge = this.edges.splice(i, 1);
    if (clearLatestUpdates) {
      this.latestUpdates = [];
    }
    this.latestUpdates.push({type: GraphUpdateTypes.EDGE_DELETED, id: id});
    if (removeNodes) {
      this.removeNode(edge.sourceID);
      this.removeNode(edge.targetID);
      this.latestUpdates.push({type: GraphUpdateTypes.NODE_DELETED, id: edge.sourceID});
      this.latestUpdates.push({type: GraphUpdateTypes.NODE_DELETED, id: edge.targetID});
    }
  }
};

GraphStore.prototype.addError = function(error, clearLatestUpdates) {

  clearLatestUpdates = clearLatestUpdates === undefined ? true : clearLatestUpdates;

  if (clearLatestUpdates) {
    this.latestUpdates = [];
  }

  for (var i = 0; i < error.graphIds.length; i ++) {
    var element = this.findNode(error.graphIds[i]);
    var update = GraphUpdateTypes.NODE_UPDATED;

    if (element === undefined) {
      element = this.findEdge(error.graphIds[i]);
      update = GraphUpdateTypes.EDGE_UPDATED;
    }

    element.errors.push(error);
    this.latestUpdates.push({type: update, id: element.id});
  }
};

GraphStore.prototype.addErrors = function(data) {

  console.log("Errors!")
  var errors = data.errors;
  var removeOld = data.removeOld === undefined ? false : data.removeOld;

  this.latestUpdates = [];
  var self = this;

  function processElement(element, update) {
    if (element.errors.length === 0) {
      var foundErrors = getErrors(element.id);

      if (foundErrors.length !== 0) {
        element.errors = foundErrors;
        self.latestUpdates.push({type: update, id: element.id});
      }
    } else {
      element.errors = getErrors(element.id);
      self.latestUpdates.push({type: update, id: element.id});
    }
  }

  function getErrors(id) {
    var found = [];

    for (var i = 0; i < errors.length; i ++) {
      if (errors[i].graphIds.indexOf('' + id) !== -1) {
        found.push(errors[i]);
      }
    }

    return found;
  }

  if (removeOld) {
    for (var i = 0; i < this.nodes.length; i ++) {
      processElement(this.nodes[i], GraphUpdateTypes.NODE_UPDATED);
    }

    for (var i = 0; i < this.edges.length; i ++) {
      processElement(this.edges[i], GraphUpdateTypes.EDGE_UPDATED);
    }
  } else {
    for (var i = 0; i < errors.length; i++) {
      this.addError(errors[i], false);
    }
  }
};

GraphStore.prototype.reverseEdge = function(id, clearLatestUpdates) {

  clearLatestUpdates = clearLatestUpdates === undefined ? true : clearLatestUpdates;

  if (clearLatestUpdates) {
    this.latestUpdates = [];
  }

  var edge = this.findEdge(id);
  var newEdge = $.extend({}, edge);
  newEdge.sourceID = edge.targetID;
  newEdge.targetID = edge.sourceID;
  newEdge.id = this.getNewID();

  this.removeEdge(id, false, false);
  this.addEdge(newEdge, false);
  //this.latestUpdates.push({type: GraphUpdateTypes.EDGE_DELETED, id: id});
  //this.latestUpdates.push({type: GraphUpdateTypes.EDGE_ADDED, id: edge.id});
};

GraphStore.prototype.addError = function(error, clearLatestUpdates, keepOldErrors) {

  clearLatestUpdates = clearLatestUpdates === undefined ? true : clearLatestUpdates;

  if (clearLatestUpdates) {
    this.latestUpdates = [];
  }

  for (let i = 0; i < error.graphIds.length; i ++) {
    let element = this.findNode(error.graphIds[i]);
    let update = GraphUpdateTypes.NODE_UPDATED;

    if (!element) {
      element = this.findEdge(error.graphIds[i]);
      update = GraphUpdateTypes.EDGE_UPDATED;
    }

    if (!keepOldErrors) {
      element.errors = [];
    }

    element.errors.push(error);
    this.latestUpdates.push({type: update, id: element.id});
  }
};

GraphStore.prototype.removeSource = function(sourceId) {
  this.nodes.forEach(node => {
    if(node.source?.id === sourceId) {
      node.source = undefined;
      this.latestUpdates.push({type: GraphUpdateTypes.NODE_UPDATED, id: node.id});
    }
  })

  this.edges.forEach(edge => {
    if(edge.sourceData?.id === sourceId) {
      edge.sourceData = undefined;
      this.latestUpdates.push({type: GraphUpdateTypes.EDGE_UPDATED, id: edge.id});
    }
  })
}

GraphStore.prototype.addErrors = function(data) {
  const removeOld = data.removeOld === undefined ? false : data.removeOld;

  this.latestUpdates = [];

  data.errors.forEach(error => {
    this.addError(error, false, removeOld);
  });

  // if (removeOld) {
  //   for (let i = 0; i < this.nodes.length; i ++) {
  //     processElement(this.nodes[i], GraphUpdateTypes.NODE_UPDATED);
  //   }
  //
  //   for (let i = 0; i < this.edges.length; i ++) {
  //     processElement(this.edges[i], GraphUpdateTypes.EDGE_UPDATED);
  //   }
  // } else {
  //   for (let i = 0; i < errors.length; i++) {
  //     this.addError(errors[i], false);
  //   }
  // }
  //
  // function processElement(element, update) {
  //   if (element.errors.length === 0) {
  //     const foundErrors = getErrors(element.id);
  //
  //     if (foundErrors.length !== 0) {
  //       element.errors = foundErrors;
  //       self.latestUpdates.push({type: update, id: element.id});
  //     }
  //   } else {
  //     element.errors = getErrors(element.id);
  //     self.latestUpdates.push({type: update, id: element.id});
  //   }
  // }
  //
  // function getErrors(id) {
  //   const found = [];
  //
  //   for (let i = 0; i < errors.length; i ++) {
  //     if (errors[i].graphIds.indexOf('' + id) !== -1) {
  //       found.push(errors[i]);
  //     }
  //   }
  //
  //   return found;
  // }
};

//set the name of the store
GraphStore.displayName = 'GraphStore';

//create the store
var graphStore = alt.createStore(GraphStore);