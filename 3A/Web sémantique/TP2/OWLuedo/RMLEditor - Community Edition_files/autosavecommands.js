var AutoSaveCommand = function () {

  this.execute = function() {
    AutoSaveModel.getModel().save(GraphModel.getModel().getGraph().copy());
    //webix.message("Automatically saved mapping");
    console.log("Automatically saved mapping");
  };
};

var StartPeriodicAutoSaveCommand = function (seconds) {
  if (!seconds) {
    seconds = 60;
  }

  this.execute = function () {
    function fn() {
      CommandInvoker.getInvoker().execute(new AutoSaveCommand());
    };


    setInterval(fn, seconds * 1000);

    console.log('Auto save initialized');
  };
};

var GetLatestAutoSavesCommand = function (amount, callback) {

  this.execute = function () {
    callback(AutoSaveModel.getModel().getLatestSaves(amount));
  };
};

var RestoreAutoSaveCommand = function (id) {

  this.execute = function() {
    GraphModel.getModel().setGraph(AutoSaveModel.getModel().getSave(id).graph);
  };
};