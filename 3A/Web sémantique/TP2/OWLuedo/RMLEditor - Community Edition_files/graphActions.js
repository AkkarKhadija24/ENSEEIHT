/**
 * Created by Pieter Heyvaert, Data Science Lab (Ghent University - iMinds) on 5/2/16.
 */

var graphActions = alt.createActions({
  addNode: function (node, readingGraphML) {
    return {node: node, readingGraphML: readingGraphML};
  },
  addEdge: function (edge, readingGraphML) {
    return {edge: edge, readingGraphML: readingGraphML};
  },
  clear: function () {
    return true;
  },
  removeNode: function (id) {
    return id;
  },
  removeEdge: function (id) {
    return id;
  },
  updateEdge: function (id, edge) {
    return {id: id, edge: edge};
  },
  updateNode: function (id, node) {
    return {id: id, node: node};
  },
  buildGraph: function() {
    return true;
  },
  setDetailLevel: function (level) {
    return level;
  },
  unselectAll: function() {
    return true;
  },
  selectOne: function(id) {
    return id;
  },
  addError: function(error) {
    return error;
  },
  addErrors: function(errors, removeOld) {
    return {errors: errors, removeOld: removeOld};
  },
  removeErrors: function() {
    return true;
  },
  reverseEdge: function(id) {
    return id;
  },
  removeSource: function(id) {
    return id;
  }
});
