/**
 * Created by pieter on 26.01.16.
 */

var ResultsBuilder = (function () {

  var ids = {
    ID: "resultsPanel",
    datatable: {
      ID: "resultsPanel-datatable"
    },
    resizer: {
      ID: "inResultsPanelResizer"
    }
  };

  var getResultsPanel = function () {
    return {
      id: ids.datatable.ID,
      view: "datatable",
      hidden:true,
      columns: [{
        id: "violationLevel",
        header: "Level",
        template: function (obj) {
          // check if all types are hidden
          var filter = filterPreferencesStore.getPreferences();

          if (obj.tmap) {
            var nrTypesShown = obj.tmap.violationTypes.length;

            for (var i = 0; i < obj.tmap.violationTypes.length; i++) {
              if (!filter[obj.tmap.violationTypes[i]]) nrTypesShown--;
            }

            if (obj.tmap.violationLevels.indexOf("ERROR") >= 0 && filter["ERROR"] && nrTypesShown > 0) return "<img src='/images/error.png' " + " class='errorG'" + "/>";
            if (obj.tmap.violationLevels.indexOf("WARN") >= 0 && filter["WARN"] && nrTypesShown > 0) return "<img src='/images/error.png' " + " class='warnG'" + "/>";

            return "";
          } else {
            return "";
          }
        }
      }, {
        id: "subject",
        header: "Subject",
        sort:"string",
        fillspace: 1
      }, {
        id: "predicate",
        header: "Predicate",
        sort:"string",
        fillspace: 1
      }, {
        id: "object",
        header: "Object",
        sort:"string",
        fillspace: 1
      }],
      resizeColumn: true,
      data: [{
        id: 1,
        subject: "empty",
        predicate: "empty",
        object: "empty",
        tmap: {
          violationTypes: [],
          violationLevels: []
        }
      }]
    };
  };

  return {
    ids: ids,
    getResultsPanel: getResultsPanel
  };

})();
