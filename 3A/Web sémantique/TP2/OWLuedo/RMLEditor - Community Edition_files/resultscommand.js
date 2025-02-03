/**
 * Created by Pieter Heyvaert, Data Science Lab (Ghent University - iMinds) on 27.01.16.
 */

var SetResultsCommand = function (results, rdfjson) {

  this.execute = function () {
    //CommandInvoker.getInvoker().execute(new ShowResultsPanelCommand());
    resultsActions.setResults({default: results, json: rdfjson});
    webix.message("Triples updated");
  };
};
