function Graph() {
  this.nodes = [];
  this.edges = [];
  this.latestID = 0;
}

Graph.prototype = {
  copy: function () {
    var g = new Graph();

    function duplicateEdge(edge) {
      return $.extend({}, edge);;
    }

    function duplicateNode(node) {
      newNode = $.extend({}, node);
      return $.extend({}, node);
    };

    for (var i = 0; i < this.nodes.length; i++) {
      g.addNode(duplicateNode(this.nodes[i]));
    }

    for (var i = 0; i < this.edges.length; i++) {
      g.addCompleteEdge(duplicateEdge(this.edges[i]));
    }

    g.setLatestID(this.latestID);

    return g;
  },

  setLatestID: function (id) {
    this.latestID = id;
  },

  getNodes: function () {
    return this.nodes;
  },

  getEdges: function () {
    return this.edges;
  },

  addNode: function (node) {
    if (node.id >= this.latestID) {
      this.latestID = node.id + 1;
    }

    this.nodes.push(node);
  },

  getAllNodeIDs: function () {
    var ids = [];

    for (var i = 0; i < this.nodes.length; i++) {
      ids.push(this.nodes[i].id);
    }

    return ids;
  },

  getAllEdgeIDs: function () {
    var ids = [];

    for (var i = 0; i < this.edges.length; i++) {
      ids.push(this.edges[i].id);
    }

    return ids;
  },

  clear: function () {
    this.nodes = [];
    this.edges = [];
  },

  load: function (nodes, edges) {
    this.clear();

    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].id > this.latestID) {
        this.latestID = nodes[i].id + 1;
      }

      this.nodes.push(nodes[i]);
    }

    for (var i = 0; i < edges.length; i++) {
      if (edges[i].id > this.latestID) {
        this.latestID = edges[i].id + 1;
      }

      this.edges.push(edges[i]);
    }
  },

  changeNodeType: function (id) {
    var node = this.findNode(id);

    node.type = (node.type === "resource") ? "literal" : "resource";

    return node;
  },

  updateEdge: function (id, edge) {
    var old = this.findEdge(id);

    if (!old)
      return null;

    return $.extend(old, edge);
  },

  updateNode: function (id, node) {
    var old = this.findNode(id);

    if (!old)
      return null;

    return $.extend(old, node);
  },

  findNode: function (id) {
    var i = 0;

    while (i < this.nodes.length && this.nodes[i].id !== id) {
      i++;
    }

    if (i < this.nodes.length) {
      return this.nodes[i];
    }

    return null;
  },

  findEdge: function (id) {
    var i = 0;

    while (i < this.edges.length && this.edges[i].id !== id) {
      i++;
    }

    if (i < this.edges.length) {
      return this.edges[i];
    }

    return null;
  },

  hasEdgeWithNodeAsTarget: function (id) {
    var i = 0;

    while (i < this.edges.length && this.edges[i].targetID !== id) {
      i++;
    }

    return i < this.edges.length;
  },

  getEdgeWithNodeAsTarget: function (id) {
    var i = 0;

    while (i < this.edges.length && this.edges[i].targetID !== id) {
      i++;
    }

    if (i < this.edges.length) {
      return {
        edge: this.edges[i],
        sourceNode: this.findNode(this.edges[i].sourceID)
      }
    }

    return null;
  },

  getEdgesWithNodesAsSource: function (id) {
    var results = [];


    for (var i = 0; i < this.edges.length; i++) {
      if (this.edges[i].sourceID == id) {
        results.push({
          edge: this.edges[i],
          targetNode: this.findNode(this.edges[i].targetID)
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

    for (var i = 0; i < this.edges.length; i++) {
      if (this.edges[i].sourceID == id) {
        targetNodes.push(this.findNode(this.edges[i].targetID));
      }
    }

    return targetNodes;
  },

  addCompleteEdge: function (edge) {
    if (!edge.conditions) {
      edge.conditions = {
        join: {
          all: true
        }
      };
    }

    if (edge.id >= this.latestID) {
      this.latestID = edge.id + 1;
    }

    this.edges.push(edge);

    return edge;
  },

  addEdge: function (edge) {
    var newEdge = $.extend({
      id: this.getNewID(),
      valueType: ValueTypes.CONSTANT,
      reference: null,
      template: null,
      constant: null,
      conditions: {
        join: {
          all: true
        }
      }
    }, edge);

    this.edges.push(newEdge);

    return newEdge;
  },

  removeNode: function (id) {
    var i = 0;
    while (i < this.nodes.length && this.nodes[i].id !== id) {
      i++;
    }

    if (i < this.nodes.length) {
      this.nodes.splice(i, 1);

      var toRemoveEdges = [];

      for (var j = 0; j < this.edges.length; j++) {
        if (this.edges[j].sourceID == id || this.edges[j].targetID == id) {
          toRemoveEdges.push(this.edges[j].id);
        }
      }

      for (var j = 0; j < toRemoveEdges.length; j++) {
        this.removeEdge(toRemoveEdges[j], false);
      }
    }
  },

  removeEdge: function (id, removeNodes) {
    var i = 0;
    while (i < this.edges.length && this.edges[i].id !== id) {
      i++;
    }

    if (i < this.edges.length) {
      var edge = this.edges.splice(i, 1);
      if (removeNodes) {
        this.removeNode(edge.sourceID);
        this.removeNode(edge.targetID);
      }
    }
  },

  getNewID: function () {
    var r = this.latestID;
    this.latestID++;

    return r;
  },

  equals: function (node1, node2) {
    return node1.id && node2.id && node1.id === node2.id;
  },

  toString: function () {

    var string = "";

    function helper(n) {
      if (n.source) {
        string += ("\tsource=" + n.source.id + "\n");
      }

      if (n.valueType) {
        string += ("\tvalueType=" + n.valueType + "\n");
        string += ("\tvalue=" + n.value + "\n");
      }
    };

    for (var i = 0; i < this.nodes.length; i++) {
      var n = this.nodes[i];

      string += (n.type + " id=" + n.id + "\n");

      if (n.type == "resource" && n.className) {
        string += ("\tclassName=" + n.className + "\n");
      } else if (n.datatype) {
        string += ("\tdatatype=" + n.datatype + "\n");
      }

      helper(n);
    }

    for (var i = 0; i < this.edges.length; i++) {
      var e = this.edges[i];

      string += ("edge id=" + e.id + "\n");

      string += ("\tsourceID=" + e.sourceID + "\n");
      string += ("\ttargetID=" + e.targetID + "\n");

      helper(e);
    }

    return string;
  }
};
