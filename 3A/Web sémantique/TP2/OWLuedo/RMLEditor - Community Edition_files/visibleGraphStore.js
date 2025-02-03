/**
 * Created by Pieter Heyvaert, Data Science Lab (Ghent University - iMinds) on 5/2/16.
 */


function VisibleGraphStore() {
  this.nodes = [];
  this.edges = [];
  this.latestID = 0;
  this.detailLevels = {
    LOW: 0,
    MODERATE_LOW: 1,
    MODERATE: 2,
    MODERATE_HIGH: 3,
    HIGH: 4
  };
  this.currentDetailLevel = this.detailLevels.HIGH;
  this.latestUpdates = [];

  var self = this;

  this.bindListeners({
    addNode: graphActions.addNode,
    addEdge: graphActions.addEdge,
    clear: graphActions.clear,
    removeNodeV: graphActions.removeNode,
    removeEdgeV: graphActions.removeEdge,
    updateEdge: graphActions.updateEdge,
    updateNode: graphActions.updateNode,
    buildGraph: graphActions.buildGraph,
    setDetailLevel: graphActions.setDetailLevel,
    unselectAll: graphActions.unselectAll,
    selectOne: graphActions.selectOne,
    addError: graphActions.addError,
    addErrors: graphActions.addErrors,
    reverseEdge: graphActions.reverseEdge,
    removeSource: graphActions.removeSource
  });

  this.exportPublicMethods({
    getAllNodeIDs: function () {
      var ids = [];
      var nodes = this.getState().nodes;

      for (var i = 0; i < nodes.length; i++) {
        ids.push(nodes[i].id);
      }

      return ids;
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
        if (edges[i].sourceID == id) {
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
        if (edges[i].sourceID == id) {
          targetNodes.push(this.findNode(edges[i].targetID));
        }
      }

      return targetNodes;
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

        if (n.type == "resource" && n.className) {
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

    getNewID: function () {
      return self.getNewID();
    },
    findNode: function (id) {
      return self.findNode(id);
    },
    findEdge: function (id) {
      return self.findEdge(id);
    },

    getSelected: function () {
      var nodes = this.getState().nodes;
      var edges = this.getState().edges;

      for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].selected) {
          return {nodes: [nodes[i]]};
        }
      }

      for (var i = 0; i < edges.length; i++) {
        if (edges[i].selected) {
          return {edges: [edges[i]]};
        }
      }

      return {};
    },
    removeSource: function(id) {
      return self.removeSource(id)  
    }
  });
}

VisibleGraphStore.prototype.setLatestID = GraphStore.prototype.setLatestID;
VisibleGraphStore.prototype.getNewID = GraphStore.prototype.getNewID;
//VisibleGraphStore.prototype.addNode = GraphStore.prototype.addNode;
//VisibleGraphStore.prototype.addEdge = GraphStore.prototype.addEdge;
VisibleGraphStore.prototype.clear = GraphStore.prototype.clear;
VisibleGraphStore.prototype.load = GraphStore.prototype.load;
VisibleGraphStore.prototype.findEdge = GraphStore.prototype.findEdge;
VisibleGraphStore.prototype.updateEdge = GraphStore.prototype.updateEdge;
//VisibleGraphStore.prototype.updateNode = GraphStore.prototype.updateNode;
VisibleGraphStore.prototype.removeSource = GraphStore.prototype.removeSource
VisibleGraphStore.prototype.findNode = GraphStore.prototype.findNode;
VisibleGraphStore.prototype.removeNode = GraphStore.prototype.removeNode;
VisibleGraphStore.prototype.removeEdge = GraphStore.prototype.removeEdge;
VisibleGraphStore.prototype.addError = GraphStore.prototype.addError;
VisibleGraphStore.prototype.addErrors = GraphStore.prototype.addErrors;
VisibleGraphStore.prototype.reverseEdge = GraphStore.prototype.reverseEdge;
VisibleGraphStore.prototype.superAddNode = GraphStore.prototype.addNode;
VisibleGraphStore.prototype.superAddEdge = GraphStore.prototype.addEdge;
VisibleGraphStore.prototype.superUpdateNode = GraphStore.prototype.updateNode;

VisibleGraphStore.prototype.addNode = function (data, clearLatestUpdates) {

  if (!data.readingGraphML) {
    this.superAddNode(data, clearLatestUpdates);
    return true;
  }

  return false;
};

VisibleGraphStore.prototype.addEdge = function (data, clearLatestUpdates) {

  if (!data.readingGraphML) {
    this.superAddEdge(data, clearLatestUpdates);

    return true;
  }

  return false;
};

VisibleGraphStore.prototype.updateNode = function (data, clearLatestUpdates, doExpansion) {
  clearLatestUpdates = clearLatestUpdates === undefined ? true : clearLatestUpdates;
  doExpansion = doExpansion === undefined ? true : doExpansion;

  if (clearLatestUpdates) {
    this.latestUpdates = [];
  }

  if (doExpansion && data.node.expanded !== undefined) {
    var results = graphStore.getEdgesWithNodesAsSource(data.id);

    for (var i = 0; i < results.length; i++) {
      var targetNode = results[i].targetNode;
      var edge = results[i].edge;

      if (targetNode.type === "literal") {
        if (data.node.expanded) {
          if (!this.findNode(targetNode.id)) {
            this.addNode({node: targetNode}, false);
            this.addEdge({edge: edge}, false);
          }
        } else {
          this.removeNode(targetNode.id, false);
        }
      }
    }
  }

  this.superUpdateNode(data, false);
};

VisibleGraphStore.prototype.showEdge = function (edge) {
  var targetNode = graphStore.findNode(edge.targetID);
  var sourceNode = graphStore.findNode(edge.sourceID);

  return !((this.currentDetailLevel <= this.detailLevels.MODERATE_LOW && targetNode.type === "literal") ||
  (this.currentDetailLevel === this.detailLevels.LOW && (targetNode.type === "blank" || sourceNode.type === "blank")));// ||
  //(targetNode.type === "literal" && !sourceNode.expanded));
};

VisibleGraphStore.prototype.showNode = function (node) {
  return node.type === "resource" || (node.type === "blank" && this.currentDetailLevel > this.detailLevels.LOW) || (node.type === "literal" && (this.currentDetailLevel >= this.detailLevels.MODERATE));
};

VisibleGraphStore.prototype.addEdgeV = function (edge, clearLatestUpdates) {
  if (this.showEdge(edge)) {
    this.addEdge({edge: edge}, clearLatestUpdates);
  }
};

VisibleGraphStore.prototype.addNodeV = function (node, clearLatestUpdates) {
  if (this.showNode(node)) {
    this.addNode({node: node}, clearLatestUpdates);
  } else {
    if (node.type === "literal") {
      var temp = graphStore.getEdgeWithNodeAsTarget(node.id);

      if (temp) {
        var sourceNode = temp.sourceNode;

        if (sourceNode.expanded) {
          this.updateNode({id: sourceNode.id, node: {expanded: false}}, clearLatestUpdates, false);
        }
      }
    }
  }
};

VisibleGraphStore.prototype.removeNodeV = function (id) {
  if (this.findNode(id)) {
    this.removeNode(id);
  }
};

VisibleGraphStore.prototype.removeEdgeV = function (id) {
  if (this.findEdge(id)) {
    this.removeEdge(id);
  }
};

VisibleGraphStore.prototype.buildGraph = function (clear) {
  clear = (clear == undefined || clear);

  if (clear) {
    this.clear();
  }

  var nodes = graphStore.getState().nodes;
  var edges = graphStore.getState().edges;

  //this.latestUpdates = [];

  for (var i = 0; i < nodes.length; i++) {
    this.addNodeV(nodes[i], false);
  }

  for (var i = 0; i < edges.length; i++) {
    this.addEdgeV(edges[i], false);
  }
};

VisibleGraphStore.prototype.setDetailLevel = function (level) {
  if (this.currentDetailLevel != level) {
    this.currentDetailLevel = level;
    this.latestUpdates = [];
  } else {
    return false;
  }
};

VisibleGraphStore.prototype.unselectAll = function () {
  this.latestUpdates = [];

  for (var i = 0; i < this.nodes.length; i++) {
    if (this.nodes[i].selected) {
      this.updateNode({id: this.nodes[i].id, node: {selected: false}, clearLatestUpdates: false});
    }
  }

  for (var i = 0; i < this.edges.length; i++) {
    if (this.edges[i].selected) {
      this.updateEdge({id: this.edges[i].id, edge: {selected: false}, clearLatestUpdates: false});
    }
  }
};

VisibleGraphStore.prototype.selectOne = function (id) {
  this.latestUpdates = [];

  for (var i = 0; i < this.nodes.length; i++) {
    if (this.nodes[i].selected && this.nodes[i].id != id) {
      this.updateNode({id: this.nodes[i].id, node: {selected: false}, clearLatestUpdates: false});
    } else if (this.nodes[i].id == id && !this.nodes[i].selected) {
      this.updateNode({id: this.nodes[i].id, node: {selected: true}, clearLatestUpdates: false});
    }
  }

  for (var i = 0; i < this.edges.length; i++) {
    if (this.edges[i].selected && this.edges[i].id != id) {
      this.updateEdge({id: this.edges[i].id, edge: {selected: false}, clearLatestUpdates: false});
    } else if (this.edges[i].id == id && !this.edges[i].selected) {
      this.updateEdge({id: this.edges[i].id, edge: {selected: true}, clearLatestUpdates: false});
    }
  }
};

//set the name of the store
VisibleGraphStore.displayName = 'VisibleGraphStore';

//create the store
var visibleGraphStore = alt.createStore(VisibleGraphStore);