var errorActions = alt.createActions({
  addErrors: function (errors, removeOld) {
    return {errors: errors, removeOld: removeOld}
  },
  addTypes: function(types){
    return types;
  }
});