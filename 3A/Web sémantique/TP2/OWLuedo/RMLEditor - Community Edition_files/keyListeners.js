/**
 * Created by Pieter Heyvaert, Data Science Lab (Ghent University - iMinds) on 5/19/16.
 */

window.onkeyup = function(e) {

  if(e.keyCode == 46 && (!$$(ModelingBuilder.ids.details.ID) || !$$(ModelingBuilder.ids.details.ID).isVisible())) {
    var selected = visibleGraphStore.getSelected();
    
    if (selected.nodes) {
      graphActions.removeNode(selected.nodes[0].id);
    } else if (selected.edges) {
      graphActions.removeEdge(selected.edges[0].id);
    }
  }
};