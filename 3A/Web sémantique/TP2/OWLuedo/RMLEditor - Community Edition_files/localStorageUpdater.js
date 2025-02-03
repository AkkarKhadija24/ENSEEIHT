/**
 * Created by Pieter Heyvaert, Data Science Lab (Ghent University - iMinds) on 5/9/16.
 */

var LocalStorageUpdater = function() {

  if (typeof(Storage) === "undefined") {
    console.warn('LocalStorage is not available in your browser.')
  } else {
    preferencesStore.listen(function () {
      localStorage.setItem("preferences", JSON.stringify(preferencesStore.dump()));
    });

    namespacesStore.listen(function() {
      localStorage.setItem("namespaces", JSON.stringify(namespacesStore.getNonDefaultNamespaces()));
    });
  }
};

LocalStorageUpdater();