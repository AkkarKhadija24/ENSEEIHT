/**
 * Created by Pieter Heyvaert, Data Science Lab (Ghent University - iMinds) on 5/2/16.
 */

function NamespacesStore() {
  //holds all the namespaces in the store
  this.namespaces = [];

  this.bindListeners({
    addNamespace: namespacesActions.addNamespace,
    addNamespaces: namespacesActions.addNamespaces,
    removeNamespace: namespacesActions.removeNamespace
  });

  this.exportPublicMethods({
    //get the prefix of namespace using the iri
    getPrefix: function(iri) {
      //check if iri is defined
      iri = iri ? iri : "";
      var namespaces = this.getState().namespaces;
      var i = 0;

      while (i < namespaces.length && namespaces[i].iri !== iri) {
        i++;
      }

      if (i < namespaces.length) {
        return namespaces[i].prefix;
      } else {
        //no prefix is found
        return null;
      }
    },

    //get iri of namespace using the prefix
    getIRI: function (prefix) {
      var namespaces = this.getState().namespaces;
      //check if prefix is defined
      prefix = prefix ? prefix : "";
      var i = 0;

      while (i < namespaces.length && namespaces[i].prefix !== prefix) {
        i++;
      }

      if (i < namespaces.length) {
        return namespaces[i].iri;
      } else {
        //no iri is found
        return null;
      }
    },

    getBaseURIPrefix: function () {
      var namespaces = this.getState().namespaces;
      var i = 0;

      while (i < namespaces.length && !namespaces[i].isBaseURI) {
        i ++;
      }

      if (i < namespaces.length) {
        return namespaces[i].prefix;
      } else {
        return null;
      }
    },

    getNonDefaultNamespaces: function() {
      var ns = [];
      var namespaces = this.getState().namespaces;

      for (var i = 0; i < namespaces.length; i ++) {
        if (!namespaces[i].default) {
          ns.push(namespaces[i]);
        }
      }

      return ns;
    }
  });
}

/*
  Add namespace to store (deep copy).
 */
NamespacesStore.prototype.addNamespace = function (namespace) {
  //make a deep copy
  this.namespaces.push({prefix: namespace.prefix, iri: namespace.iri, default: namespace.default});
};

/*
  Add array of namespaces to store (deep copy)
 */
NamespacesStore.prototype.addNamespaces = function (namespaces) {
  for (var i = 0; i < namespaces.length; i ++) {
    this.addNamespace(namespaces[i]);
  }
};

/*
  Remove namespace based on the prefix.
  If prefix is not found, nothing will change.
 */
NamespacesStore.prototype.removeNamespace = function (prefix) {
  var i = 0;

  while (i < this.namespaces.length && this.namespaces[i].prefix !== prefix) {
    i++;
  }

  if (i < this.namespaces.length) {
    this.namespaces.splice(i, 1);
  }
};

//set the name of the store
NamespacesStore.displayName = 'NamespacesStore';

//create the store
var namespacesStore = alt.createStore(NamespacesStore);

//initial namespaces
namespacesActions.addNamespaces([{prefix: "rdfs", iri: "http://www.w3.org/2000/01/rdf-schema#", default: true},
  {prefix: "ex", iri: "http://www.example.com/", default: true},
  {prefix: "tourism", iri: "http://lddemo.mmlab.be/tourism/", default: true},
  {prefix: "skos", iri: "http://www.w3.org/2004/02/skos/core#", default: true},
  {prefix: "foaf", iri: "http://xmlns.com/foaf/0.1/", default: true},
  {prefix: "xsd", iri: "http://www.w3.org/2001/XMLSchema#", default: true},
  {prefix: "schema", iri: "http://schema.org/", default: true},
  {prefix: "ost", iri: "http://w3id.org/ost/ns#", default: true},
  {prefix: "org", iri: "http://www.w3.org/ns/org#", default: true},
  {prefix: "regorg", iri: "http://www.w3.org/ns/regorg#", default: true},
  {prefix: "person", iri: "http://www.w3.org/ns/person#", default: true},
  {prefix: "locn", iri: "http://www.w3.org/ns/locn#", default: true},
  {prefix: "dcterms", iri: "http://purl.org/dc/terms/", default: true},
  {prefix: "vcard", iri: "http://www.w3.org/2006/vcard/ns#", default: true},
  {prefix: "adms", iri: "http://www.w3.org/ns/adms#", default: true},
  {prefix: "oh", iri: "http://semweb.mmlab.be/ns/oh#", default: true},
  {prefix: "time", iri: "http://www.w3.org/2006/time#", default: true},
  {prefix: "prov", iri: "http://www.w3.org/ns/prov#", default: true},
  {prefix: "csvw", iri: "http://www.w3.org/ns/csvw#", default: true},
  {prefix: "gr", iri: "http://purl.org/goodrelations/v1#", default: true},
  {prefix: "muto", iri: "http://purl.org/muto/core#", default: true},
  {prefix: "acco", iri: "http://purl.org/acco/ns#", default: true},
  {prefix: "combust", iri: "http://combust.iminds.be/", default: true},
  {prefix: "oslo", iri: "http://purl.org/oslo/ns/localgov/", default: true},
  {prefix: "tio", iri: "http://purl.org/tio/ns#", default: true},
  {prefix: "adms", iri: "http://www.w3.org/ns/adms#", default: true},
  {prefix: "dbpedia-owl", iri: "http://dbpedia.org/ontology/", default: true},
  {prefix: "rdf", iri: "http://www.w3.org/1999/02/22-rdf-syntax-ns#", default: true}
]);