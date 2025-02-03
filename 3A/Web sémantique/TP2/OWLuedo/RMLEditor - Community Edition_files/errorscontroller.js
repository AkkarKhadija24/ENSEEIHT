/*
* Controller, listens to changes to the ErrorsStore.
* */
function ErrorsController() {

  errorsStore.listen(function () {
    // Gets the current errors
    var errors = errorsStore.getState().errors;
    console.log(errors)
    // Gets the errorpanel & clears current errors.
    var errorTable = $$(ModelingBuilder.ids.ERRORS_PANEL);
    errorTable.clearAll();

    // Add all errors to the table
    for (var i = 0; i < errors.length; i++) {
      // only show according to preferences of the user
      if(filterPreferencesStore.isDisplayed(errors[i])) {
        errors[i].id = i
        errorTable.add(errors[i]);
      }
    }

    // Show the error panel
    //CommandInvoker.getInvoker().execute(new ShowErrorPanelCommand());
  });
}