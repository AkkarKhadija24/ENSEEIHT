function ResultsController() {

  resultsStore.listen(function () {
    var results = resultsStore.getState().results;

    var datatable = $$(UIBuilder.ids.results.datatable.ID);
    datatable.clearAll();

    for (var i = 0; i < results.length; i++) {
      if(results[i] != null) datatable.add(results[i]);
    }

    datatable.markSorting("subject", "asc");

    if(results.length > 0) CommandInvoker.getInvoker().execute(new ShowResultsPanelCommand());
  });
}
