/**
 * Created by Pieter Heyvaert, Data Science Lab (Ghent University - iMinds) on 27.01.16.
 */

var ExpandPrefixCommand = function (str, callback) {

  this.execute = function () {

    callback(Util.expandPrefix(str));
  };
};

const CollapsePrefixCommand = function (str, callback) {

  this.execute = function () {
    callback(Util.collapsePrefix(str));
  };
};

var GetNamespaceIRILOVCommand = function (prefix, prefixedName, iri, callback) {
  this.prefix = prefix;
  this.prefixedName = prefixedName;
  this.iri = iri;
  this.callback = callback;

  this.execute = function () {
    var secondPart = this.prefixedName.substr(this.prefixedName.indexOf(":") + 1);
    var ns = iri.substr(0, iri.length - secondPart.length);

    this.callback(ns);
  };
};

var ConvertGraphToGraphMLCommand = function (sourcesPaths, fixForRunning, fixSpecialID, callback) {

  this.execute = function () {
    var gw = new GraphMLWriter(sourcesPaths);
    var r = gw.write(fixForRunning, fixSpecialID);

    if (callback) {
      callback(r);
    }
  };
};

var ParseTemplateCommand = function (template, callback) {

  this.execute = function () {
    var references = [];
    var openingBracket = false;
    var escapeCharacter = false;
    var tempReference = "";

    for (var i = 0, len = template.length; i < len; i++) {
      var c = template[i];

      if (c === '\\') {
        escapeCharacter = !escapeCharacter;
      } else if (c === '{') {
        escapeCharacter = false;

        if (!escapeCharacter) {
          if (openingBracket) {
            callback(null, "ERR: opening brackets twice");
          } else {
            openingBracket = true;
          }
        }
      } else if (c === '}') {
        escapeCharacter = false;

        if (!escapeCharacter) {

          if (openingBracket) {
            openingBracket = false;
            references.push(tempReference);
            tempReference = "";
          } else {
            callback(null, "ERR: closing bracket without opening bracket");
          }
        }
      } else {
        tempReference += c;
      }
    }

    callback(references, null);
  }
};

const GenerateRMLFromOntology = function(ontologyStore, callback) {

  this.execute = function() {
    const rml = ontology2rml(ontologyStore).rml;
    callback(rml);
  }
};