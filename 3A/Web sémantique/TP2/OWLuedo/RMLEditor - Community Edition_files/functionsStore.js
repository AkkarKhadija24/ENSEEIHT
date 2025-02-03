/**
 * Created by Pieter Heyvaert, Data Science Lab (Ghent University - iMinds) on 5/2/16.
 */

function FunctionsStore() {
  this.functions = [];

  this.bindListeners({
    setFunctions: functionsActions.setFunctions
  });

  this.exportPublicMethods({
    getFunctionByID: function (id) {
      var functions = this.getState().functions;
      var i = 0;

      while (i < functions.length && functions[i].id !== id) {
        i ++;
      }

      if (i < functions.length) {
        return functions[i];
      } else {
        return null;
      }
    },
    getParameterIndexByID: function(fnID, paramID) {
      var fn = this.getFunctionByID(fnID);

      var i = 0;

      while (i < fn.parameters.length && fn.parameters[i].id != paramID) {
        i ++;
      }

      if (i < fn.parameters.length) {
        return i;
      } else {
        return -1;
      }
    }
  });
}

/*
 Set results
 */
FunctionsStore.prototype.setFunctions = function (functions) {
  this.functions = functions;
};

//set the name of the store
FunctionsStore.displayName = 'FunctionsStore';

//create the store
var functionsStore = alt.createStore(FunctionsStore);