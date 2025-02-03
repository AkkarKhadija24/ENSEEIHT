/**
 * Created by Pieter Heyvaert, Data Science Lab (Ghent University - iMinds) on 27.01.16.
 */

var DeleteNodeCommand = function (id, callback) {

  this.execute = function () {
    graphActions.removeNode(id);

    if(callback) CommandInvoker.getInvoker().execute(callback);

    //todo hide details menu
  };
};

var DeleteEdgeCommand = function (id, callback) {

  this.execute = function () {
    graphActions.removeEdge(id);

    if(callback) CommandInvoker.getInvoker().execute(callback);

    //todo hide details menu
  };
};

var ChangeNodeTypeCommand = function (id) {

  this.execute = function () {
    GraphModel.getModel().changeNodeType(id);
  };
};

var AddNewResourceNodeCommand = function (node, callback) {

  this.execute = function () {
    if (APPLICATION_CONFIG.nodeLimit !== undefined && graphStore.countNodes() >= APPLICATION_CONFIG.nodeLimit) {
      CommandInvoker.getInvoker().execute(new ShowErrorMessageCommand("Node could not be added.",
          "Node limit (" + APPLICATION_CONFIG.nodeLimit + ") reached"));
      return;
    }

    if (!node) {
      node = {};
    }

    node.type = "resource";

    if (node.id === undefined) {
      node.id = graphStore.getNewID();
    }

    if (APPLICATION_CONFIG.enableDataAnalysis) {
      Util.resizeOtherResourceNodes(node);
    }

    graphActions.addNode(node);
    graphActions.selectOne(node.id);

    if (callback) callback(node.id);
  };
};

var AddNewBlankNodeCommand = function (node, callback) {

  this.execute = function () {
    if (APPLICATION_CONFIG.nodeLimit !== undefined && graphStore.countNodes() >= APPLICATION_CONFIG.nodeLimit) {
      CommandInvoker.getInvoker().execute(new ShowErrorMessageCommand("Node could not be added.",
          "Node limit (" + APPLICATION_CONFIG.nodeLimit + ") reached"));
      return;
    }

    if (!node) {
      node = {};
    }

    node.type = "blank";

    if (!node.id) {
      node.id = graphStore.getNewID();
    }

    graphActions.addNode(node);
    graphActions.selectOne(node.id);

    if (callback) callback(node.id);
  };
};

var DuplicateNodeCommand = function (id, node) {
  node.selected = true;
  node.id = id;

  this.execute = function () {
    switch (node.type) {
      case "resource":
        CommandInvoker.getInvoker().execute(new AddNewResourceNodeCommand(node));
        break;
      case "literal":
        CommandInvoker.getInvoker().execute(new AddNewLiteralNodeCommand(node));
        break;u
      default:
        CommandInvoker.getInvoker().execute(new AddNewBlankNodeCommand(node));
    }
  };
};

var AddNewLiteralNodeCommand = function (node, callback) {

  this.execute = function () {
    if (APPLICATION_CONFIG.nodeLimit !== undefined && graphStore.countNodes() >= APPLICATION_CONFIG.nodeLimit) {
      CommandInvoker.getInvoker().execute(new ShowErrorMessageCommand("Node could not be added.",
          "Node limit (" + APPLICATION_CONFIG.nodeLimit + ") reached"));
      return;
    }

    if (!node) {
      node = {};
    }

    node.type = "literal";

    if (!node.id) {
      node.id = graphStore.getNewID();
    }

    graphActions.addNode(node);
    graphActions.selectOne(node.id);

    if (callback) callback(node.id);
  };
};

var CheckSameSourceNodesCommand = function (sourceID, targetID, callback) {

  this.execute = function () {
    var sourceNode = graphStore.findNode(sourceID);
    var targetNode = graphStore.findNode(targetID);

    callback(!(sourceNode.source && targetNode.source && sourceNode.source.id !== targetNode.source.id));
  };
};

var AddNewEdgeCommand = function (edge, callback) {

  this.execute = function () {
    if (!edge) {
      edge = {};
    }

    if (edge.id === undefined) {
      edge.id = graphStore.getNewID();
    }

    graphActions.addEdge(edge);
    graphActions.selectOne(edge.id);

    if (APPLICATION_CONFIG.enableDataAnalysis) {
      Util.resizeNodesOfEdge(edge);
    }

    CommandInvoker.getInvoker().execute(new HideDetailsCommand());

    if (callback) {
      callback(edge.id);
    }
  };
};

var ClearGraphCommand = function () {

  this.execute = function () {
    graphActions.clear();
  }
};

var ReverseEdgeCommand = function (id) {

  this.execute = function () {
    graphActions.reverseEdge(id);
  }
};

var SetDetailLevelCommand = function (level) {

  this.execute = function () {
    graphActions.setDetailLevel(level);
    graphActions.buildGraph(true);
  };
};

var SelectNodeCommand = function (id) {

  this.execute = function () {

    var nodes = graphStore.getState().nodes;

    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      n.selected = (n.id === id);

      graphActions.updateNode(n.id, n);
    }
  };
};

var SelectEdgeCommand = function (id) {

  this.execute = function () {

    var edges = graphStore.getState().edges;

    for (var i = 0; i < edges.length; i++) {
      var e = edges[i];
      e.selected = (e.id === id);

      graphActions.updateEdge(e.id, e);
    }
  };
};

var UnselectAllNodesCommand = function () {

  this.execute = function () {

    var nodes = graphStore.getState().nodes;

    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      n.selected = false;

      graphActions.updateNode(n.id, n);
    }
  };
};

var UnselectAllEdgesCommand = function () {

  this.execute = function () {

    var edges = graphStore.getState().edges;

    for (var i = 0; i < edges.length; i++) {
      var e = edges[i];
      e.selected = false;

      graphActions.updateEdge(e.id, e);
    }
  };
};

var UnselectCompleteGraphCommand = function () {

  this.execute = function () {
    graphActions.unselectAll();
  };
};

var UpdateEdgeCommand = function(id, edge) {
  this.execute = function() {
    graphActions.updateEdge(id, edge);
  }
}

var UpdateNodeCommand = function(id, node, callback) {

  this.execute = function() {
    var currentNode = graphStore.findNode(id);
    var doResize = false;

    if (currentNode.self_edge || currentNode.type === 'resource' || currentNode.type === 'literal') {
      if (node.valueType !== undefined && currentNode.valueType !== node.valueType) {
        doResize = true;
      } else {
        switch(currentNode.valueType) {
          case ValueTypes.REFERENCE:
            doResize = currentNode.reference !== node.reference;
            break;
          case ValueTypes.CONSTANT:
            doResize = currentNode.constant !== node.constant;
            break;
          case ValueTypes.TEMPLATE:
            doResize = currentNode.template !== node.template;
            break;
        }
      }
    }

    if(node.template) {
      // If there are no references, simply become undefined.
      node.reference = Util.getReferencesOfTemplate(node.template)[0]
    }

    const updatedNode = graphActions.updateNode(id, node);

    if (doResize) {
      if (currentNode.type === 'resource') {
        if (APPLICATION_CONFIG.enableDataAnalysis) {
          Util.resizeOtherResourceNodes(graphStore.findNode(id));
        }
      } else {
        let edgeDetails = graphStore.getEdgeWithNodeAsTarget(id);

        if (edgeDetails && APPLICATION_CONFIG.enableDataAnalysis) {
          Util.resizeNodesOfEdge(edgeDetails.edge);
        }
      }
    }

    CommandInvoker.getInvoker().execute(new HighlightInputCommand(updatedNode.node.source, updatedNode.node.reference))
    if(callback != null) CommandInvoker.getInvoker().execute(callback);
  }
};
