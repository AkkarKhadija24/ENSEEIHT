/**
 * Created by Pieter Heyvaert, Data Science Lab (Ghent University - iMinds) on 27.01.16.
 */

var CloseSourceCommand = function (sourceID) {

  this.execute = function () {
    inputActions.removeSource(sourceID);
    graphActions.removeSource(sourceID);
    ColorManager.getManager().removeSourceColors(sourceID);
  };
};

var AddSourceCommand = function (source) {

  this.execute = function () {
    inputActions.addSource(source, true);
    //inputActions.setDisplayedSource(source);
  };
};

/**
 * Command to highlight the input column a reference comes from, if the type is CSV.
 * 
 * If called with null source or reference, it will clear the highlight.
 * @param {*} source Datasource that's being referenced
 * @param {*} reference Reference within this datasource. If invalid, highlight will be cleared.
 * @param {*} replace Replace clears the previous highlight when true. Default: true.
 */
var HighlightInputCommand = function (source, reference, replace=true) {

  this.execute = function () {
    // We only update the datatables; that is, the sources with type csv.
    const sources = inputStore.getState().sources.filter(s => s.type === "csv");

    console.log(source, reference)
    // Function to clear all highlighting from a source.
    const clear = (source) => {
      const dataDisplay = source.getDataDisplay ? source.getDataDisplay():null;
      
      dataDisplay.eachColumn(columnID => {
        const colConfig = dataDisplay.getColumnConfig(columnID)
        colConfig.css = (colConfig.css ? colConfig.css:"").replace("column-highlight", "");
      });
      
      if(dataDisplay.isVisible())
        dataDisplay.refreshColumns();
    }

    // Clear everything
    if(replace)
      sources.forEach(clear)

    // If a source and a reference are defined, highlight appropriate column.
    if(source && reference && source.type === "csv") {
      const dataDisplay = source.getDataDisplay ? source.getDataDisplay():null;

      if(dataDisplay) {
        dataDisplay.eachColumn(columnID => {
          if(columnID === reference) {
            const colConfig = dataDisplay.getColumnConfig(columnID)
            colConfig.css = (colConfig.css ? colConfig.css:"") + " column-highlight";
          }
        })
        
        if(dataDisplay.isVisible())
          dataDisplay.refreshColumns()
      }
    }
    
  };
};

var MarkInputCommand = function (source, reference) {

  this.execute = function () {
    var sources = inputStore.getState().sources;

    /*if (source && reference) {
      for (var i = 0; i < sources.length; i++) {
        var s = sources[i];

        if (s.id === source.id) {
          $$("input-" + s.id).eachColumn(function (columnID) {
            if (reference === columnID) {
              $$("input-" + s.id).getColumnConfig(columnID).css = $$("input-" + s.id).getColumnConfig(columnID).css + " column-used";
            }
          });

          $$("input-" + s.id).refreshColumns();
        }
      }
      ;
    }*/
  };
};

var UnmarkInputCommand = function () {

  this.execute = function () {
    var sources = inputStore.getState().sources;

    for (var i = 0; i < sources.length; i++) {
      var s = sources[i];

      /*$$("input-" + s.id).eachColumn(function (columnID) {
        if (!$$("input-" + s.id).getColumnConfig(columnID).css) {
          $$("input-" + s.id).getColumnConfig(columnID).css = "";
        }

        $$("input-" + s.id).getColumnConfig(columnID).css = $$("input-" + s.id).getColumnConfig(columnID).css.replace("column-used", "");
      });

      $$("input-" + s.id).refreshColumns();*/
    }
  };
};

var UpdateAllMarkedInputCommand = function () {

  this.execute = function () {
    CommandInvoker.getInvoker().execute(new UnmarkInputCommand());

    var nodes = visibleGraphStore.getState().nodes;

    for (var i = 0; i < nodes.length; i++) {
      if (!nodes[i].isTemplated) {
        CommandInvoker.getInvoker().execute(new MarkInputCommand(nodes[i].source, nodes[i].reference));
      }
    }
    ;
  };
};