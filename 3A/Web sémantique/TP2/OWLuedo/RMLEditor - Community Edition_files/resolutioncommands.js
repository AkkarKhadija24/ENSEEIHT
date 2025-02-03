/**
 * Created by louise_dck on 24/07/17.
 */
// Object containing the predicate and the associated function necessary to change the node accordingly
var resolveViolation = {
  "http://www.w3.org/ns/r2rml#datatype": resolveDataType,
  "http://www.w3.org/ns/r2rml#predicate": resolvePredicate,
  "http://www.w3.org/ns/r2rml#class": resolveClass
};

var actions = [];

var ResolveViolationCommand = function(resolution){

  this.execute = function(){
    var changedActions = [];
    for (var i = 0; i < resolution.changes.length; i++) {
      // find node & indicate type
      var entity = visibleGraphStore.findEdge(resolution.changes[i].graphId);
      if (entity === undefined || entity === null) {
        entity = visibleGraphStore.findNode(resolution.changes[i].graphId);
        entity.isNode = true;
      } else {
        entity.isNode = false;
      }
      console.log(entity);
      // save changing state somewhere
      changedActions.push({entity: JSON.parse(JSON.stringify(entity)), resolution: resolution.changes[i]});
      // execute function
      resolveViolation[resolution.changes[i].fullPred](resolution.changes[i], entity);
    }
    actions.push(changedActions);
    var toolbar = $$(ToolbarBuilder.ids.toggle.UNDO);
    $$(toolbar).define('tooltip', "Undo automatic resolve");
    $$(toolbar).define('image', "./images/18/undo.png");
    $$(toolbar).refresh();
    
    $$(ModelingBuilder.ids.RESOLUTION_PANEL).clearAll();
    CommandInvoker.getInvoker().execute(new ValidateMappingCommand());
  };

  // Undo the resolving of a violation
  this.undo = function(){
    // check whether or not it is even possible to undo
    if(actions.length > 0) {
      // Go through the changed list in reverse order (because order can be important (first ADD then DEL can give problems))
      var changedNodes = actions.pop();
      for (var i = changedNodes.length - 1; i >= 0; i--) {
        var entity = changedNodes[i].entity;
        var resolution = changedNodes[i].resolution;
        // If something was added, it now needs to be deleted and vice versa
        if(resolution.type === "ADD") resolution.type = "DEL";
        if(resolution.type === "DEL") resolution.type = "ADD";

        // Do exactly the same (but reversed because of the reversal of "ADD" and "DEL"
        resolveViolation[resolution.fullPred](resolution, entity);
      }
    }
    if(actions.length <= 0) {
      // Change the tooltip if this was the last possible undo
      var toolbar = $$(ToolbarBuilder.ids.toggle.UNDO);
      $$(toolbar).define('tooltip', "Undo automatic resolve not available");
      $$(toolbar).define('image', "./images/18/undo_off.png");
      $$(toolbar).refresh();
    }

    // Validate again, clear the resolution panel
    $$(ModelingBuilder.ids.RESOLUTION_PANEL).clearAll();
    CommandInvoker.getInvoker().execute(new ValidateMappingCommand());
  };
};

function resolveDataType(resolution, entity){
  if(resolution.type === 'ADD') entity.datatype = resolution.obj;
  if(resolution.type === 'DEL') entity.datatype = null;
  if(entity.isNode) graphActions.updateNode(entity.id, entity);
  if(!entity.isNode) graphActions.updateEdge(entity.id, entity);
}

function resolvePredicate(resolution, entity){
  if(resolution.type === 'DEL'){
    if(entity.isNode) graphActions.removeNode(entity.id);
    if(! entity.isNode) graphActions.removeEdge(entity.id);
  }
  if(resolution.type === 'ADD'){
    if(entity.isNode) graphActions.addNode(entity.id, false);
    if(! entity.isNode) graphActions.addEdge(entity.id, false);
  }
}

function resolveClass(resolution, entity){
  if(resolution.type === 'ADD'){
    entity.className = resolution.obj;
  }
  if(resolution.type === 'DEL'){
    entity.className = null;
  }
}