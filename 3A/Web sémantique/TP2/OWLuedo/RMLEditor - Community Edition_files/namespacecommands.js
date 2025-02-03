/**
 * Created by Pieter Heyvaert, Data Science Lab (Ghent University - iMinds) on 27.01.16.
 */

var AddNamespaceCommand = function (prefix, iri, callback) {

  this.execute = function () {

    var currentPrefix = namespacesStore.getPrefix(iri);

    if (!currentPrefix) {
      namespacesActions.addNamespace({prefix: prefix, iri: iri});
      currentPrefix = prefix;
    }

    if (callback) {
      callback(currentPrefix);
    }
  }
};

var RemoveNamespaceCommand = function (prefix) {

  this.execute = function () {
    namespacesActions.removeNamespace(prefix);
  };
};