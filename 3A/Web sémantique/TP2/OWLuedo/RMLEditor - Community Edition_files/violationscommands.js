/**
 * Commands that have to do with the violations.
 */

var FillResolutionPanelCommand = function(id){
  this.execute = function(){
    var errors = errorsStore.getErrors();
    var violation;
    for(var j = 0; j < errors.length; j++){
      if(errors[j].id === id.row) violation = errors[j];
    }
    var resPanel = $$(ModelingBuilder.ids.RESOLUTION_PANEL);
    if(violation.resolution.length > 0) {
      resPanel.clearAll();
      for (var k = 0; k < violation.resolution.length; k++) {
        resPanel.add(violation.resolution[k]);
      }
    } else{
      resPanel.clearAll();
    }

    CommandInvoker.getInvoker().execute(new ShowResolutionPanelCommand());
  }
};

/**
 * Apply the filter to the violations.
 */
var ApplyFilterCommand = function(){
  this.execute = function(){
    var values = $$(ModelingBuilder.ids.FILTER_FORM).getValues();
    var preferences = {};

    for(var val in values){
      if(values.hasOwnProperty(val)) {
        if (values[val] === 1) preferences[val] = true;
        if (values[val] === 0) preferences[val] = false;
      }
    }

    filterPreferencesActions.changePreferences(preferences);
    // force datatable and the modelingpanel to redraw
    errorActions.addErrors([], false);
    modelingController.start();

    var filterform = $$(UIBuilder.ids.modeling.FILTER_POPUP);
    filterform.close();
  }
};

/**
 * Sorts based on the sorting defined by the user. Is also used in the modelingbuilder.
 */
function customSort(a, b){
  // a and b are the human readable versions of the violation type.
  var a_code = errorsStore.getCode(a);
  var b_code = errorsStore.getCode(b);
  var sort = filterPreferencesStore.getSorting();
  return sort[a_code] - sort[b_code];
}

/**
 * Command that applies a user-defined sorting to the violation panel.
 */
var ApplySortCommand = function(){
  this.execute = function() {
    var values = $$(ModelingBuilder.ids.SORT_FORM).getValues();
    var sort = {};

    for(var val in values){
      if(values.hasOwnProperty(val)) {
        sort[val] = values[val];
      }
    }

    // update the sorting
    filterPreferencesActions.changeSorting(sort);

    var errortable = $$(UIBuilder.ids.modeling.ERRORS_PANEL);
    errortable.sort({
      by:"violationType",
      dir:"asc",
      as:customSort});

    $$(UIBuilder.ids.modeling.SORT_POPUP).close();
  };
};