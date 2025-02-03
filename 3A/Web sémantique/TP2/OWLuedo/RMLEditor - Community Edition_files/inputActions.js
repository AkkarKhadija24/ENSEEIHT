/**
 * Created by Pieter Heyvaert, Data Science Lab (Ghent University - iMinds) on 5/2/16.
 */

var inputActions = alt.createActions({
  addSource: function (source, isDisplayedSource) {
    return {source: source, isDisplayedSource: isDisplayedSource};
  },
  removeSource: function(id) {
    return id;
  },
  setDisplayedSource: function(source) {
    return source;
  },
  updateSource: function (id, source) {
    return {id: id, source: source};
  },
  updateTreeData: function(id, treeData) {
    return {id: id, treeData: treeData};
  }
});
