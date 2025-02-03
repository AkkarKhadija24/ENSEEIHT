/**
 * author: Pieter Heyvaert (pheyvaer.heyvaert@ugent.be)
 * Ghent University - imec - IDLab
 */

class ValidateMappingCommand {

  constructor() {
    this.validationResultStore = null;
  }

  execute() {
    $$(UIBuilder.ids.bottombar).setHTML("Validating");
    const self = this;

    const preparedSources = Util.prepareSourcesForRMLMapper();
    const rmlWriter = new RMLWriter(preparedSources, graphStore.getState().nodes, graphStore.getState().edges);

    rmlWriter.write((rmlStr, quads) => {
      //put the RML triples in a store for later;
      this.rmlStore = N3.Store();
      this.rmlStore.addQuads(quads);

      $.ajax({
        url: APPLICATION_CONFIG.validator.url + "/api/v1/validate",
        type: 'POST',
        data: {mapping: rmlStr},
        success: success,
        error: error
      });
    });

    function success(data) {
      console.log(data);

      const parser = N3.Parser();
      self.validationResultStore = N3.Store();

      parser.parse(data,  (error, quad, prefixes) => {
        if (quad) {
          self.validationResultStore.addQuad(quad);
        } else {
          self.parseErrors();
        }
      });
    }

    function error(e) {
      $$("validating_mapping_popup")?.close();

      if(e.status === 417) {
        console.warn("Our mapping was empty.")
        return;
      }
      CommandInvoker.getInvoker().execute(new ShowErrorMessageCommand('Validation Failed', 'Something went wrong during the validation.\nPlease try again.'));
    }
  }

  parseErrors() {
    // Find all previous errors & remove them
    this._removePreviousViolationsFromEntities();

    // Find all mismatchcodes.
    // They are stored in the FilterPreferencesStore.
    this._findMismatchCodes();

    const errors = this.validationResultStore.getQuads(null, namedNode(namespaces.rdf + 'type'), namedNode(namespaces.rlog + 'Entry'));
    const errorObjs = [];

    for (let i = 0; i < errors.length; i++) {
      const error = errors[i];
      const errorObj = {graphIds: [], id: error.subject};

      //process messages
      const messages = this.validationResultStore.getQuads(error.subject, namedNode(namespaces.rlog + 'message'), null).map(a => a.object.value);
      if (messages.length > 0) errorObj.expertMessage = messages[0];

      //process templates & get graphids
      const templates = this.validationResultStore.getQuads(error.subject, namedNode('http://www.example.com/template'), null).map(a => a.object.value);

      if (templates.length > 0) {
        const template = templates[0];
        const tokens = this._parseMessageTokens(template);

        errorObj.message = this._parseViolationMessageTemplate(tokens, template, error);
        errorObj.graphIds = this._parseGraphIds(error);
      }

      // Get warning level (....rlog#ERROR or #WARN)
      const errorLevels = this.validationResultStore.getQuads(error.subject, namedNode(namespaces.rlog + 'logLevel'), null).map(a => a.object.value);

      if (errorLevels.length > 0) {
        errorObj.errorLevel = errorLevels[0].replace(namespaces.rlog, '');
      } else {
        errorObj.errorLevel= 'WARN';
      }

      // get the mismatchcode && violationType for this particular violation
      const mismatchCodes = this.validationResultStore.getQuads(error.subject, namedNode(namespaces.rlog + 'hasCode'), null).map(a => a.object.value);
      errorObj.code = mismatchCodes[0].replace(namespaces.nc, '');
      errorObj.violationType = errorsStore.getHumanReadable(errorObj.code);

      //hide the error is needed
      //errorObj.hidden = !filterPreferencesStore.isDisplayed(error);


      // parse the ResultAnnotation to get the possible resolutions for this violation
      errorObj.resolution = this._parseResultAnnotations(error);

      errorObjs.push(errorObj);
    }

    CommandInvoker.getInvoker().execute(new toValidationModeCommand(errorObjs));
    $$(UIBuilder.ids.bottombar).setHTML("Validation successful");
    // Update the results, if necessary
    //this._updateResults();
  }

  _removePreviousViolationsFromEntities() {
    const edgeIDs = graphStore.getAllEdgeIDs();

    for (let i = 0; i < edgeIDs.length; i++) {
      const edge = graphStore.findEdge(edgeIDs[i]);

      edge.errors = [];
      graphActions.updateEdge(edgeIDs[i], edge);
    }

    const nodeIDs = graphStore.getAllNodeIDs();

    for (let i = 0; i < nodeIDs.length; i++) {
      const node = graphStore.findNode(nodeIDs[i]);

      node.errors = [];
      graphActions.updateNode(nodeIDs[i], node);
    }
  }

  _parseMessageTokens(template) {
    const tokens = [];
    let nextCharacterIsToken = false;

    for (let j = 0; j < template.length; j++) {
      if (template[j] === '$') {
        nextCharacterIsToken = true;
      } else if (nextCharacterIsToken) {
        tokens.push(template[j]);
        nextCharacterIsToken = false;
      }
    }

    return tokens;
  }

  _parseViolationMessageTemplate(tokens, template, error) {
    for (let k = 0; k < tokens.length; k++) {
      const tokenValues = this.validationResultStore.getQuads(error.subject, namedNode('http://www.example.com/' + tokens[k]), null);

      if (tokenValues.length > 0) {
        let tokenValue = tokenValues[0].object;
        const replacements = [];

        if (tokenValue.termType === "Blank Node") {
          let keepGoing = true;

          while (keepGoing) {
            const first = this.validationResultStore.getQuads(tokenValue, namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#first'), null)[0].object.value;
            replacements.push('<b>' + Util.collapsePrefix(first) + '</b>');
            const rest = this.validationResultStore.getQuads(tokenValue, namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#rest'), null)[0].object.value;

            if (rest !== "http://www.w3.org/1999/02/22-rdf-syntax-ns#nil") {
              tokenValue = rest;
            } else {
              keepGoing = false;
            }
          }
        } else {
          // check if value is like "subjectmap_x" e.a. and if it is, replace with something readable
          tokenValue = this._readableMessage(tokenValue);
          replacements.push('<b>' + Util.collapsePrefix(tokenValue) + '</b>');
        }

        template = template.replace('$' + tokens[k], replacements.join(', '));
      }
    }

    return template;
  }

  _readableMessage(value) {
    const types = this.rmlStore.getQuads(value, namedNode(namespaces.rdf + 'type')).map(a => a.object.value);
    const id = this.rmlStore.getQuads(value, namedNode(namespaces.dcterms + 'identifier')).map(a => a.object.value)[0];

    if (types.indexOf(namespaces.rr + 'SubjectMap') !== -1) {
      const node = graphStore.findNode(id);

      return Util.getSubjectValue(node);
    } else if (types.indexOf(namespaces.rr + 'PredicateMap') !== -1) {
      const edge = graphStore.findEdge(id);

      return Util.getPredicateValue(edge);
    } else if (types.indexOf(namespaces.rr + 'ObjectMap') !== -1) {
      const node = graphStore.findNode(id);

      return Util.getObjectValue(node);
    } else {
      return value.value;
    }
  }

  _parseGraphIds(error) {
    const resources = this.validationResultStore.getQuads(error.subject, namedNode(namespaces.rlog + 'resource'), null);
    const graphIds = [];

    for (let i = 0; i < resources.length; i++) {
      const resource = resources[i];
      const subjects = this.validationResultStore.getQuads(resource.object, namedNode(namespaces.rdf + 'subject'), null).map(a => a.object);

      for (let j = 0; j < subjects.length; j++) {
        const identifiers = this.rmlStore.getQuads(subjects[j], namedNode(namespaces.dcterms + 'identifier'), null).map(a => a.object);

        identifiers.forEach(id => {
          graphIds.push(id.value);
        });
      }
    }

    return graphIds;
  }

  _parseResultAnnotations(error) {
    const resolutions = [];
    // parse the ResultAnnotations: get all necessary info and all the necessary changes to resolve the violation
    const resultAnnotations = this.validationResultStore.getQuads(error.subject, namedNode("http://rdfunit.aksw.org/ns/core#resultAnnotation"), null);

    for (let i = 0; i < resultAnnotations.length; i++) {
      const resultAnnotation = resultAnnotations[i];
      const resolveObject = {changes: []};

      // Get all messages
      const messages = this._parseMessageOfAnnotation(resultAnnotation);
      const additions = store.getQuads(resultAnnotation.object, namedNode(namespaces.changeset + "addition"), null).map(a => a.object);
      let changes = this._parseAdditionOrDeletion(additions, 'ADD', resultAnnotation);

      if (!changes) {
        resolveObject.changes = resolveObject.changes.concat(changes);
      }

      const deletions = store.getQuads(resultAnnotation.object, namedNode(namespaces.changeset + "removal"), null).map(a => a.object);
      changes = this._parseAdditionOrDeletion(deletions, 'DEL', resultAnnotation);

      if (!changes) {
        resolveObject.changes = changes.concat(resolveObject.changes);
      }

      let count = 0;

      resolveObject.changes.forEach(change => {
        //TODO this is weird
        change.message = this._findMessage(messages, change.obj);
      });

      resolutions.push(resolveObject);
    }

    return resolutions;
  }

  _parseAdditionOrDeletion(elements, type, resultAnnotation) {
    if (elements.length > 0) {
      let allChanges = [];

      for (let j = 0; j < elements.length; j++) {
        const element = elements[j];

        const pre = this.validationResultStore.getQuads(element, namedNode(namespaces.rdf + "predicate"), null)[0].object.value;
        const sub = this.validationResultStore.getQuads(element, namedNode(namespaces.rdf + "subject"), null)[0].object.value;
        const objs = this._parseObjects(element);
        const subjectOfChange = this.validationResultStore.getQuads(resultAnnotation.object, namedNode(namespaces.changeset + "subjectOfChange"), null)[0].object;
        const changes = this._translateToReadable(objs, pre, sub, type);

        for (let changeIndex = 0; changeIndex < changes.length; changeIndex++) {
          // copy resolveObject
          const change = changes[changeIndex];
          change.graphId = this.rmlStore.getQuads(subjectOfChange, namedNode(namespaces.dcterms + 'identifier'))[0].object.value;
          change.fullPred = pre;
        }

        allChanges = allChanges.concat(changes);
      }

      return allChanges;
    } else {
      return null;
    }
  }

  _parseObjects(object) {
    const objs = this.validationResultStore.getQuads(object, namedNode(namespaces.rdf + "object"), null).map(a => a.object);
    const objects = [];

    if (objs.length > 0) {
      let obj = objs[0];

      if (obj.termType === 'Blank Node') {
        let keepGoing = true;

        while (keepGoing) {
          const first = store.getQuads(obj, namedNode(namespaces.rdf + 'first'), null)[0].object.value;
          objects.push(Util.collapsePrefix(first));
          const rest = store.getQuads(obj, namedNode(namespaces.rdf + 'rest'), null)[0].object.value;

          if (rest !== namespaces.rdf + "nil") {
            obj = rest;
          } else {
            keepGoing = false;
          }
        }
      } else {
        objects.push(Util.collapsePrefix(obj.value));
      }
    }

    return objects;
  }

  _parseMessageOfAnnotation(store, resultAnnotation) {
    const raObj = resultAnnotation.object;
    // get message
    const templates = store.getQuads(raObj, namedNode('http://www.example.com/template'), null);
    let all = [];

    if (templates.length > 0) {
      const template = templates[0].object.value;
      all.push(template);
      const placeholders = [];

      // find placeholders
      for (let i = 0; i < template.length; i++) {
        if (template[i] === '$') {
          placeholders.push(template[++i])
        }
      }

      // find actual values
      for (let j = 0; j < placeholders.length; j++) {

        const actualValues = store.getQuads(raObj, namedNode('http://www.example.com/' + placeholders[j]), null);

        if (actualValues.length > 0) {
          let actualValue = actualValues[0].object;

          // substitute
          const replacements = [];

          if (actualValue.termType === 'BlankNode') {
            let keepGoing = true;

            while (keepGoing) {
              const first = store.getQuads(actualValue, namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#first'), null)[0].object.value;
              replacements.push('<b>' + Util.collapsePrefix(first) + '</b>');
              const rest = store.getQuads(actualValue, namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#rest'), null)[0].object.value;
              if (rest !== "http://www.w3.org/1999/02/22-rdf-syntax-ns#nil") {
                actualValue = rest;
              } else {
                keepGoing = false;
              }
            }
          } else {
            actualValue = readableMessage(actualValue.value);
            replacements.push('<b>' + Util.collapsePrefix(actualValue.value) + '</b>');
          }

          const origLength = all.length;

          for (let l = 0; l < origLength; l++) {
            const tmp = [];

            for (let k = 0; k < replacements.length; k++) {
              tmp[k] = all[l].replace('$' + placeholders[j], replacements[k]);
            }

            all[l] = tmp[0];
            tmp.shift();
            all = all.concat(tmp);
          }
        }
      }
    }

    return all;
  }

  _translateToReadable(obj, pred, subj, type) {
    const changes = [];

    for (let i = 0; i < obj.length; i++) {
      const resolution = {};
      resolution.obj = obj[i];
      resolution.pred = Util.collapsePrefix(pred);
      resolution.subj = Util.collapsePrefix(subj);
      resolution.type = type;
      resolution.readable = type + " " + resolution.subj + " " + resolution.pred + " " + resolution.obj;

      changes.push(resolution);
    }

    return changes;
  }

  _findMismatchCodes() {
    const codes = this.validationResultStore.getQuads(null, namedNode(namespaces.rlog + "hasCode"), null);
    const codeHuman = {
      "ERROR": "errors",
      "WARN": "warnings"
    };

    // TODO: Find how they should be remembered
    const codeSort = {};
    const codeShown = {
      "ERROR": true,
      "WARN": true
    };

    // Get the current filter and current sorting
    const filter = filterPreferencesStore.getPreferences();
    const sorting = filterPreferencesStore.getSorting();

    if (filter.hasOwnProperty("WARN")) codeShown["WARN"] = filter["WARN"];
    if (filter.hasOwnProperty("ERROR")) codeShown["ERROR"] = filter["ERROR"];

    for (let i = 0; i < codes.length; i++) {
      const code = codes[i].object;
      const shortCode = code.value.replace(namespaces.nc, '');
      const labels = this.validationResultStore.getQuads(code, namedNode(namespaces.rdfs + "label"), null);

      if (labels.length > 0) {
        codeHuman[shortCode] = labels[0].object.id?.replace(/"/g, "");
      }

      if (filter.hasOwnProperty(shortCode)) {
        codeShown[shortCode] = filter[shortCode];
      } else {
        codeShown[shortCode] = true;
      }

      if (sorting.hasOwnProperty(shortCode)) {
        codeSort[shortCode] = sorting[shortCode];
      } else {
        codeSort[shortCode] = i + 1;
      }
    }

    // Store codeHuman in preferences (errorsstore)
    errorActions.addTypes(codeHuman);
    filterPreferencesActions.changeSorting(codeSort);
    filterPreferencesActions.changePreferences(codeShown);
  }
}