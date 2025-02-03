/**
 * Created by Pieter Heyvaert, Data Science Lab (Ghent University - iMinds) on 5/2/16.
 */

function ResultsStore() {
  this.results = [];
  this.resultsInJson = null;

  this.bindListeners({
    setResults: resultsActions.setResults,
    addResult: resultsActions.addResult
  });

  this.exportPublicMethods({
    getResults: function(){
      return this.state.results;
    }
  });

}

/*
 Set results
 */
ResultsStore.prototype.setResults = function (results) {
  this.results = results.default;
  this.resultsInJson = results.json;
};

ResultsStore.prototype.addResult = function(result){
  this.results.concat(result);
};

//set the name of the store
ResultsStore.displayName = 'ResultsStore';

//create the store
var resultsStore = alt.createStore(ResultsStore);