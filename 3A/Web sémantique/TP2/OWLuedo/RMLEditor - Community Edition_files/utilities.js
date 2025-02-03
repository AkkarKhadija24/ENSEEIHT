/**
 * Created by pieter on 06.01.16.
 */

"use strict";

function validateTemplate(template) {
  return getReferencesOfTemplate(template) !== null;
}

function getReferencesOfTemplate(template) {
  let openingBracket = false;
  let escapeCharacter = false;
  let currentReference = '';
  let allReferences = [];

  if (_.isNil(template) || template.length === 0) {
    return null;
  }

  for (let i = 0; i < template.length; i++) {
    let c = template[i];

    if (c === '\\') {
      escapeCharacter = !escapeCharacter;
    } else if (c === '{') {
      if (!escapeCharacter) {
        if (openingBracket) {
          return false;
        } else {
          openingBracket = true;
        }
      }

      escapeCharacter = false;
    } else if (c === '}') {
      if (!escapeCharacter) {
        if (openingBracket) {
          openingBracket = false;
          allReferences.push(currentReference);
          currentReference = '';
        } else {
          return null;
        }
      }

      escapeCharacter = false;
    } else if (openingBracket) {
      currentReference += c;
    }
  }

  if (openingBracket) {
    return null;
  } else {
    return allReferences;
  }
}

function processLevel(data, callback) {
  for (var i = 0; i < data.length; i++) {
    callback(data[i]);

    if (data[i].data && data[i].data.length !== 0)
      processLevel(data[i].data, callback);
  }
}

function fillSelection(data) {
  var selections = [];
  processLevel(data || [], function (item) {
    selections.push({
      id: item.path,
      item: item,
      value: item.path
    });
  });

  return selections;
}

function collapsePrefix(str) {
  const nss = namespacesStore.getState().namespaces;
  let i = 0;

  while (i < nss.length && str.indexOf(nss[i].iri) !== 0) {
    i++;
  }

  if (i < nss.length) {
    return str.replace(nss[i].iri, nss[i].prefix + ':');
  } else {
    return str;
  }
}

function getPrettyRML(rml, callback) {
  const parser = N3.Parser();
  const writer = N3.Writer({
    prefixes: {
      tm: 'http://ex.com/triplesMap/',
      pom: 'http://ex.com/preObjMap/',
      ls: 'http://ex.com/logicalSource/',
      pm: 'http://ex.com/predicateMap/',
      om: 'http://ex.com/objectMap/',
      sm: 'http://ex.com/subjectMap/',
      rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
      rml: 'http://semweb.mmlab.be/ns/rml#',
      ql: 'http://semweb.mmlab.be/ns/ql#',
      rr: 'http://www.w3.org/ns/r2rml#'}});

  const quads = [];

  parser.parse(rml,
    function (error, quad, prefixes) {
      if (quad)
        quads.push(quad);
        //writer.addTriple(triple.subject, triple.predicate, triple.object);
      else {
        quads.sort(function(a, b){
          if(a.subject.value < b.subject.value) return -1;

          if(a.subject.value > b.subject.value) return 1;

          if(a.predicate.value < b.predicate.value) return -1;

          if(a.predicate.value > b.predicate.value) return 1;

          if(a.object.value < b.object.value) return -1;

          if(a.object.value > b.object.value) return 1;

          return 0;
        });

        writer.addQuads(quads);
        writer.end(callback);
      }
    });
}


function mergeIteratorAndReference(iterator, reference, source) {
  if (!source || source.type === 'csv' || source.type === 'xml') {
    return reference;
  } else {
    var delimiter = source.type === 'xml' ? '/' : '.';

    return iterator + delimiter + reference;
  }
}

function getTreeDataOfReference(source, reference) {

  function recursive(data) {
    var i = 0;
    var found = undefined;

    while(i < data.length && !found) {
      if (data[i].path === reference || data[i].value === reference) {
        found = data[i];
      } else if (data[i].data) {
        found = recursive(data[i].data);
      }

      i ++;
    }

    return found;
  }

  if (source.type === 'xml') {
    return recursive(source.treeData[0].data);
  } else {
    return recursive(source.treeData);
  }
}

function getReferencesFromTemplate(template) {
  var references = [];
  var currentReference = '';
  var currentlyProcessingElement = false;

  for (var i = 0; i < template.length; i ++) {
    var char = template[i];

    if (char === '{') {
      currentlyProcessingElement = true;
    } else if (char === '}') {
      references.push(currentReference);
      currentReference = '';
    } else if (currentlyProcessingElement) {
      currentReference += char;
    }
  }

  return references;
}

function getCountForNode(node, structure) {
  var delimiter = node.source.type === 'xml' ? '/' : '.';
  var nodePath = node.iterator;

  switch (node.valueType) {
    case ValueTypes.CONSTANT:
      return null;
      break;

    case ValueTypes.REFERENCE:
      nodePath += delimiter + node.reference;
      break;

    case ValueTypes.TEMPLATE:
      var references = getReferencesOfTemplate(node.template);
      nodePath += delimiter + references[0];
      break;
  }

  var parts = nodePath.split(delimiter);
  parts.shift();

  for (var i = 0; i < parts.length; i ++) {
    var part = parts[i];

    if (part.startsWith('@')) {
      var j = 0;

      while (j < structure.attributes.length && structure.attributes[j].attribute !== part) {
        j ++;
      }

      if (j < structure.attributes.length) {
        return structure.attributes[j].count;
      } else {
        return 0;
      }
    } else {
      var k = 0;

      while (k < structure.children.length && structure.children[k].path !== part) {
        k ++;
      }

      if (i === parts.length - 1) {
        return structure.children[k].count;
      } else if (k < structure.children.length) {
        structure = structure.children[k];
      }
    }
  }
}

function applyScale(value, scale) {
  return value * (0.7 + 0.3 * scale);
}

function getRandomNumber() {
  return Math.random() * 20;
}

function resizeOtherResourceNodes(node) {
  if (node.type === 'resource') {
    var source = node.source;

    if (source && source.type === 'xml') {
      var structure = source.analysis.structure;

      var newNodeCount = Util.getCountForNode(node, structure);
      var existingNodes = graphStore.getAllResourceNodesFromSource(source.id);
      var maxCount = newNodeCount;

      for (var i = 0; i < existingNodes.length; i++) {
        existingNodes[i].count = Util.getCountForNode(existingNodes[i], structure);

        if (existingNodes[i].count > maxCount) {
          maxCount = existingNodes[i].count;
        }
      }

      for (var i = 0; i < existingNodes.length; i++) {
        var scale = existingNodes[i].count / maxCount;

        if (existingNodes[i].scale !== scale) {
          graphActions.updateNode(existingNodes[i].id, {scale: scale});
        }
      }

      node.scale = newNodeCount / maxCount;
    }
  }
}

function resizeNodesOfEdge(edge) {
  if (edge.sourceID !== undefined && edge.targetID !== undefined) {
    var sourceNode = graphStore.findNode(edge.sourceID);
    var targetNode = graphStore.findNode(edge.targetID);

    if (sourceNode.type === 'resource' && targetNode.type === 'literal') {
      var source = sourceNode.source;

      if (source && source.type === 'xml') {
        var structure = source.analysis.structure;

        var total = Util.getCountForNode(sourceNode, structure);
        var targetNodeCount = Util.getCountForNode(targetNode, structure);

        graphActions.updateNode(targetNode.id, {scale: targetNodeCount / total});
      }
    }
  }
}

function expandPrefix(str) {
  if (str) {
    let col = str.indexOf(':');

    if (str.indexOf("http://") >= 0 || str.indexOf("https://") >= 0) {
      col = -1;
    }

    if (col >= 0) {
      const prefix = str.substr(0, col);
      const value = str.substr(col + 1);

      if (namespacesStore.getIRI(prefix)) {
        return namespacesStore.getIRI(prefix) + value;
      } else {
        console.warn("Prefix not found!");
        return undefined;
      }
    } else {
      return str;
    }
  } else {
    return "";
  }
}

function getTurtleFromQuads(quads, callback) {
  const writer = N3.Writer();
  writer.addQuads(quads);
  writer.end((error, result) => callback(result));
}

function getSubjectValue(node) {
  if (node.className !== null && node.className !== "") return node.className;
  if (node.reference !== null && node.reference !== "") return node.reference;
  if (node.template !== null && node.template !== "") return node.template;
  if (node.constant !== null && node.constant !== "") return node.constant;
  if (node.datatype !== null && node.datatype !== "") return node.datatype;
}

function getPredicateValue(edge) {
  if (edge.constant !== null && edge.constant !== "") return edge.constant;
  if (edge.reference !== null && edge.reference !== "") return edge.reference;
  if (edge.template !== null && edge.template !== "") return edge.template;
}

function getObjectValue(node) {
  if (node.reference !== null && node.reference !== "") return node.reference;
  if (node.template !== null && node.template !== "") return node.template;
  if (node.className !== null && node.className !== "") return node.className;
  if (node.constant !== null && node.constant !== "") return node.constant;
  if (node.datatype !== null && node.datatype !== "") return node.datatype;
}

function prepareSourcesForRMLMapper() {
  const preparedSources = {};
  const sources = inputStore.getState().sources;

  for (let i in sources) {
    const source = sources[i];
    const data = source.data;

    for (let j in data) {
      delete data[j].id;
    }

    let preparedSourceData;

    if (source.type === "csv") {
      preparedSourceData = Papa.unparse(data, {delimiter: ","});
    } else if (source.type === "xml") {
      //const x2js = new X2JS();
      //preparedSourceData = x2js.json2xml_str(data); // parse
      preparedSourceData = data;
    } else if (source.type === "json") {
      preparedSourceData = data;
    }

    preparedSources[source.id] = preparedSourceData;
  }

  return preparedSources;
}

/**
Takes as input a string like "100 KB" or "0.5 MB" and outputs the number of bytes the string represents.

@param str string parameter of the format '<number> <unit>' with some leniency.
@return parsed value of parameter 'str'. Either number parsed to float (if no/invalid unit) or value represented by the string.
 */
function getBytesFromString(str) {
  // object/map of supported units and their size modifier (no unit is treated as bytes)
  let unitMap = {'': 1, 'byte': 1, 'bytes': 1, 'kb': 1024, 'mb': 1024 * 1024, 'gb': 1024 * 1024 * 1024};

  // regExp matches the concatenation of: number, optional space, optional unit
  let regExp = /([0-9.]+) ?([a-zA-Z]*)/;
  let result = regExp.exec(str);

  // if either regExp does not match or an invalid unit is given, give a warning and return parameter parsed as float
  if (result === null || !unitMap.hasOwnProperty(result[2].toLowerCase())) {
    console.warn("WARNING Byte size string '" + str + "' has unknown unit, returning parseFloat(str)");
    return parseFloat(str);
  }

  // else return number multiplied by unit modifier
  let number = parseFloat(result[1]);
  let unit = result[2].toLowerCase();
  return number * unitMap[unit];
}

const validatePath = (text) => {
  if(text.includes("/")) {
    return "Path cannot contain slashes!"
  }
}

const clipFileName = (filename, amount=20) => {
  let fileNameWEx = filename.split(".")
  const fileExtension = fileNameWEx.pop()

  fileNameWEx = fileNameWEx.join(".");
  if(fileNameWEx.length > amount) {
    fileNameWEx = fileNameWEx.slice(0, amount) + "..."
  }
  return fileNameWEx + "." + fileExtension
}

const githubActive = () => !_.isNil(APPLICATION_CONFIG.githubAPI?.url)

var Util = {
  validateTemplate: validateTemplate,
  fillSelection: fillSelection,
  processLevel: processLevel,
  collapsePrefix: collapsePrefix,
  getPrettyRML: getPrettyRML,
  mergeIteratorAndReference: mergeIteratorAndReference,
  getTreeDataOfReference: getTreeDataOfReference,
  getCountForNode: getCountForNode,
  applyScale: applyScale,
  getRandomNumber: getRandomNumber,
  resizeOtherResourceNodes: resizeOtherResourceNodes,
  resizeNodesOfEdge: resizeNodesOfEdge,
  getReferencesOfTemplate: getReferencesOfTemplate,
  getTurtleFromQuads: getTurtleFromQuads,
  expandPrefix: expandPrefix,
  getSubjectValue,
  getPredicateValue,
  getObjectValue,
  prepareSourcesForRMLMapper,
  getBytesFromString,
  validatePath,
  clipFileName,
  githubActive
};