/**
 * Created by pieter on 08.01.16.
 */

var AutoSaveModel = (function() {
  var instance;

  function createInstance() {
    var saves = [];
    var latestID = 1;

    function save(graph) {
      saves.push({
        graph: graph,
        time: new Date(),
        id: latestID
      });

      latestID ++;
    };

    function getLatestSave() {
      return saves[saves.length - 1];
    };

    function getSave(id) {
      var i = 0;

      while (i < saves.length && saves[i].id != id) {
        i ++;
      }

      if (i < saves.length) {
        return saves[i];
      } else {
        return null;
      }
    };

    function getLatestSaves(amount) {
      var result = [];
      var i = saves.length - 1;

      while (i >= 0 && amount > 0) {
        result.push(saves[i]);
        amount --;
        i --;
      }

      return result;
    };

    function clear() {
      saves = [];
    }

    return {
      save: save,
      getLatestSave: getLatestSave,
      getLatestSaves: getLatestSaves,
      clear: clear,
      getSave: getSave
    }
  };

  return {
    getModel: function() {
      if (!instance) {
        instance = createInstance();
      }

      return instance;
    }
  }
})();