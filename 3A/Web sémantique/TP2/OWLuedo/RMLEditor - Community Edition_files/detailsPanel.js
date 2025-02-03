/**
 * Created by Pieter Heyvaert, Data Science Lab (Ghent University - iMinds) on 5/4/16.
 */

"use strict";

class DetailsPanel {

  constructor() {
    this.ids = {
      ID: 'modelingPanel',
      D3: 'modelingPanelD3',
      settings: {
        ID: 'settingsPanelModelingPanel',
        baseIRI: 'spmpBaseIRI',
        prefix: 'spmpPrefix'
      },
      details: {
        WINDOW: 'detailsWindow',
        ID: 'detailsPanel',
        constantContainer: 'dpmpConstantContainer',
        templateContainer: 'dpmpTemplateContainer',
        reference: 'dpmpReference',
        className: 'dpmpClass',
        template: 'dpmpTemplate',
        templateError: 'dpmpTemplateError',
        constant: 'dpmpConstant',
        isConstant: 'dpmpIsConstant',
        datatypeContainer: 'dpmpDatatypeContainer',
        datatype: 'dpmpDatatype',
        sourceContainer: 'dpmpSourceContainer',
        iterator: 'dpmpIterator',
        source: 'dpmpSource',
        useBaseIRI: 'dpmpUseBaseIRI',
        resultIRI: 'dpmpResultIRI',
        predicate: 'dpmpPredicate',
        language: 'dpmpLanguage',
        isTemplated: 'dpmpIsTemplated',
        valueType: 'dpmpValueType',
        searchLOV: 'dpmpSearchLOV',
        completion: 'dpmpCompletion',
        verification: 'dpmpVerification',
        conditions: {
          join: {
            all: 'dpmpJoinConditionAll',
            child: 'dpmpJoinConditionChild',
            parent: 'dmpmJoinConditionParent'
          }
        }
      }
    };
    this.sources = null;
    this.sourceOptions = null;
    let self = this;

    this.onChangeSelection = function (newv, oldv) {
      self.onChangeSelectionFn.call(self, newv, oldv);
    };

    this.onChangeSource = function (newv, oldv) {
      self.onChangeSourceFn.call(self, newv, oldv);
      self.onTimeKeyPressTextFieldFn.call(self);
    };

    this.onChangeValue = function (newv, oldv) {
      self.onChangeValueFn.call(self, newv, oldv);
    };

    this.onTimeKeyPressTextField = function() {
      self.onTimeKeyPressTextFieldFn.call(self);
    };

    this.processLevel = Util.processLevel;
    this.fillSelection = Util.fillSelection;
  }

  fillReferences(data, path) {
    let references = [];

    this.processLevel(data || [], function (item) {
      references.push({
        id: item.path.replace(path || '', ''),
        value: item.path.replace(path || '', '')
      });
    });

    return references;
  }

  onTimeKeyPressTextFieldFn() {
    const template = $$(this.ids.details.template)?.getValue();

    if (Util.validateTemplate(template)) {
      const references = Util.getReferencesOfTemplate(template);

      if (references.length === 0) {
        $$(this.ids.details.source).disable();
      } else {
        $$(this.ids.details.source).enable();
      }
      const selectedSource = inputStore.getSource($$(this.ids.details.source).getValue());

      if ($$(this.ids.details.source).isEnabled() && $$(this.ids.details.source).getValue() !== -1 && selectedSource) {
        const iteratorOptions = this.fillSelection(selectedSource.treeData[0].data, selectedSource.type);
        let referenceOptions = [];
        switch (selectedSource.type) {
          case 'csv':
            referenceOptions = iteratorOptions; // for tabular formats, iterator and reference are equal
            break;
          default:
            const separator = selectedSource.type === 'xml' ? '/' : '.';
            const selection = $$(this.ids.details.iterator).getValue();

            let i = 0;

            while (i < iteratorOptions.length && iteratorOptions[i].value !== selection) {
              i ++;
            }

            if (i < iteratorOptions.length) {
              referenceOptions = iteratorOptions.length > 0 ? this.fillReferences(iteratorOptions[i].item.data, iteratorOptions[i].item.path + separator) : [];
            } else {
              console.error(`This should not happen: selection ${selection} is not found in the iterator options.`);
            }
        }


        let i = 0;
        let errorFound = false;

        while(i < references.length && !errorFound) {
          let j = 0;

          while (j < referenceOptions.length && referenceOptions[j].value !== references[i]) {
            j ++;
          }

          errorFound = j === referenceOptions.length;

          if (!errorFound) {
            i++;
          }
        }

        if(selectedSource.type === "json") {
          errorFound = false
          const selection = $$(this.ids.details.iterator).getValue();
          for(let reference of references) {
            const result = JSONPath.JSONPath({path: `${selection}.${reference}`, json: JSON.parse(selectedSource.data)})
            if(!errorFound)
              errorFound = result.length <= 0
              i = references.indexOf(reference)
          }
        }

        if (errorFound) {
          //console.log(`${references[i]} was not found in the references.`);
          $$(this.ids.details.templateError).setValue(`'${references[i]}' is not found in the selected source.`);
          $$(this.ids.details.templateError).show();
        } else {
          $$(this.ids.details.templateError).hide();
        }
      }
    } else {
      $$(this.ids.details.templateError)?.setValue(`Template has invalid format.`);
      $$(this.ids.details.templateError)?.show();
    }
  };

  onChangeSelectionFn(newv, oldv) {
    var selectedSource = inputStore.getSource($$(this.ids.details.source).getValue()),
      path = newv,
      item;

    var iteratorOptions = this.fillSelection(selectedSource.treeData[0].data, selectedSource.type);
    for (var i = 0; i < iteratorOptions.length; i++) {
      if (iteratorOptions[i].value === newv) {
        item = iteratorOptions[i].item;
        break;
      }
    }

    var referenceOptions = [];

    if (item) {
      referenceOptions = this.fillReferences(item.data, path);
    }

    var referenceValue = referenceOptions.length > 0 ? '' + referenceOptions[0].id : '';

    var ref = {
      view: selectedSource.type === 'csv' ? 'combo' : 'text',
      id: this.ids.details.reference,
      labelWidth: 100,
      label: selectedSource.type === 'csv' ? 'Column' : 'Reference',
      value: referenceValue,
      yCount: '' + referenceOptions.length,
      options: referenceOptions,
      suggest: referenceOptions,
      disabled: $$(this.ids.details.reference) ? !$$(this.ids.details.reference).isEnabled():false
    };

    // webix.ui(ref, $$(this.ids.details.ID), $$(this.ids.details.reference));
  };

  onChangeSourceFn(newv, oldv) {
    if (newv !== -1 && newv !== '') {
      var selectedSource = inputStore.getSource(newv);

      var iteratorOptions = this.fillSelection(selectedSource.treeData[0].data, selectedSource.type),
        referenceOptions = [],
        iteratorValue = '',
        referenceValue = '';

      let hide = true;
      switch (selectedSource.type) {
        case 'csv':
          referenceOptions = iteratorOptions; // for tabular formats, iterator and reference are equal
          referenceValue = iteratorOptions[0].item.path || '';
          hide = true
          break;
        default:
          var separator = selectedSource.type === 'xml' ? '/' : '.';
          referenceOptions = iteratorOptions.length > 0 ? this.fillReferences(iteratorOptions[0].item.data, iteratorOptions[0].item.path + separator) : [];
          iteratorValue = iteratorOptions[0].item.path || '';
          referenceValue = referenceOptions.length  > 0 ? '' + referenceOptions[0].id : '';
          hide = false
      }

      // If you replace a selection that's hidden, you can never make it visible again
      $$(this.ids.details.iterator).show();
      var refSelection = {
        view: 'text',
        id: this.ids.details.iterator,
        labelWidth: 100,
        label: 'Selection',
        value: iteratorValue,
        //yCount: '' + iteratorOptions.length,
        suggest: iteratorOptions,
        on: {
          onChange: this.onChangeSelection
        },
      };

      //ref.disabled = !$$(this.ids.details.iterator).isEnabled();
      webix.ui(refSelection, $$(this.ids.details.ID), $$(this.ids.details.iterator));
      if(hide)
        $$(this.ids.details.iterator).hide();
    } else {
      $$(this.ids.details.iterator).hide();
    }
  };

  onChangeValueFn(newv, oldv) {
    //copy from source
    switch (newv) {
      case 1: //REFERENCE
        $$(this.ids.details.reference).show();
        $$(this.ids.details.template).hide();
        if ($$(this.ids.details.sourceContainer)) {
          $$(this.ids.details.sourceContainer).show();
        }
        $$(this.ids.details.constantContainer).hide();
        //template
        break;
      case 2: //TEMPLATE
        $$(this.ids.details.reference).hide();
        $$(this.ids.details.template).show();
        if ($$(this.ids.details.sourceContainer)) {
          $$(this.ids.details.sourceContainer).show();
        }
        $$(this.ids.details.constantContainer).hide();
        break;
      default: //CONSTANT
        $$(this.ids.details.reference).hide();
        $$(this.ids.details.template).hide();
        if ($$(this.ids.details.sourceContainer)) {
          $$(this.ids.details.sourceContainer).hide();
        }
        $$(this.ids.details.constantContainer).show();
    }
  }

  getItem(values, key) {
    for (var i = 0; i < values.length; i++) {
      if (values[i].value === key)
        return values[i];
    }
    return null;
  }
}

class NodeDetailsPanel extends DetailsPanel {

  constructor(node) {
    super();
    this.node = node;
  }

  onChangeValueFn(newv, oldv) {
    super.onChangeValueFn(newv, oldv);
    //copy from source
    switch (newv) {
      case 1: //REFERENCE
        if (this.node.source && this.node.source.type !== "csv") $$(this.ids.details.iterator).show();
        //template
        break;
      case 2: //TEMPLATE
        if (this.node.source && this.node.source.type !== "csv") $$(this.ids.details.iterator).show();
        break;
      default: //CONSTANT
        if (this.node.source && this.node.source.type !== "csv") $$(this.ids.details.iterator).hide();
    }
  }


  getWebixConfig() {
    this.sources = inputStore.getState().sources,
      this.sourceOptions = [];

    this.selectedSourceID = !this.node.source ? -1 : this.node.source.id;

    this.sourceOptions.push({
      id: -1,
      value: ''
    });

    for (var i = 0; i < this.sources.length; i++) {
      this.sourceOptions.push({
        id: this.sources[i].id,
        value: this.sources[i].title
      });
    }

    this.iteratorOptions = [],
      this.referenceOptions = [],
      this.iteratorValue = '',
      this.referenceValue = '';

    if (this.node.source) {
      this.iteratorOptions = this.fillSelection(this.node.source.treeData[0].data, this.node.source.type); //get root node, which is not the filename itself

      switch (this.node.source.type) {
        case 'csv':
          this.referenceOptions = this.iteratorOptions; // for tabular formats, iterator and reference are equal
          this.referenceValue = this.node.reference || '';
          break;
        default:
          var separator = this.node.source.type === 'xml' ? '/' : '.';
          var getItem = this.getItem(this.iteratorOptions, this.node.iterator);

          if (getItem) {
            var item = getItem.item;
            this.referenceOptions = this.fillReferences(item.data, this.node.iterator + separator);
          }

          this.iteratorValue = this.node.iterator || '';
          this.referenceValue = this.referenceOptions.length > 0 ? (this.node.reference ? this.node.reference : '' + this.referenceOptions[0].id) : this.node.reference;
      }
    }

    var self = this;

    var panel = {
      view: 'form',
      id: this.ids.details.ID,
      //scroll: 'xy',
      on: {
        onValidationError: function (key, obj) {
          //$$(self.ids.details.templateError).setValue('Template is invalid.');
          $$(self.ids.details.templateError).show();
        },
        onValidationSuccess: function (key, obj) {
          //$$(self.ids.details.templateError).setValue('');
          $$(self.ids.details.templateError).hide();
        }
      }
    };

    if (!this.node.valueType) {
      this.node.valueType = (this.node.type === 'resource') ? ValueTypes.TEMPLATE : ValueTypes.REFERENCE;
    }

    return panel;
  }
}

class ResourceNodeDetailsPanel extends NodeDetailsPanel {

  constructor(node, closeFn) {
    super(node);
    this.closeFn = closeFn;
  }

  getWebixConfig() {
    let panel = super.getWebixConfig();

    let references = Util.getReferencesOfTemplate(this.node.template);
    let enableSource = references !== null && references.length !== 0;

    let hideSelection = !(this.node.source && (this.node.source.type === 'json' || this.node.source.type === 'xml'));
    let self = this;

    panel.elements = [{
      cols: [{
        view: 'text',
        id: self.ids.details.className,
        labelWidth: 100,
        label: 'Entity type',
        value: self.node.className
      }, {
        view: 'button',
        //todo: add id
        type: 'icon',
        icon: 'search',
        width: 30,
        on: {
          onItemClick: function () {
            CommandInvoker.getInvoker().execute(new ShowLOVPanelCommmand(function (c) {
              $$(self.ids.details.className).setValue(c);
            }, 'class'));
          }
        }
      }]
    },{
      view: 'text',
      id: self.ids.details.template,
      labelWidth: 100,
      label: 'IRI',
      value: self.node.template || '',
      name: 'test',
      validate: Util.validateTemplate,
      validateEvent: 'key',
      on: {
        onTimedKeyPress: self.onTimeKeyPressTextField
      }
    },{
      view: 'label',
      label: 'Template is invalid.',
      id: self.ids.details.templateError,
      labelWidth: 100,
      hidden: Util.validateTemplate(self.node.template || ''),
      css: 'errorMessage'
    },
      {
      id: this.ids.details.sourceContainer,
      cols: [{
        view: 'combo',
        id: self.ids.details.source,
        disabled: !enableSource,
        labelWidth: 100,
        label: 'Source',
        value: '' + this.selectedSourceID,
        yCount: '' + this.sourceOptions.length,
        options: self.sourceOptions,
        on: {
          onChange: self.onChangeSource
        }
      }]
    }, {
      view: 'text',
      id: self.ids.details.iterator,
      labelWidth: 100,
      label: 'Selection',
      value: self.iteratorValue,
      hidden: hideSelection,
      suggest: self.iteratorOptions,
      //yCount: '' + self.iteratorOptions.length,
      on: {
        onChange: self.onChangeSelection
      }
    }, {
      margin: 5,
      cols: [{
        view: 'button',
        value: 'Save',
        type: 'form',
        on: {
          onItemClick: function () {
            let source = inputStore.getSource($$(self.ids.details.source).data.value);
            let targetNodes = visibleGraphStore.getAllTargetNodes(self.node.id);
            const temp = [];

            for (let i = 0; i < targetNodes.length; i++) {
              if (targetNodes[i].type === 'literal') {
                temp.push(targetNodes[i]);
              }
            }

            targetNodes = temp;

            const cb = function (result = "0") {

              if (result === "0") {
                //fix source literals
                for (let j = 0; j < targetNodes.length; j++) {
                  const tn = targetNodes[j];

                  if (!tn.source || tn.source.id !== source.id) {
                    let cmd = null;

                    if (APPLICATION_CONFIG.enableValidation) {
                      cmd = new ValidateMappingCommand();
                    }

                    CommandInvoker.getInvoker().execute(new UpdateNodeCommand(tn.id, tn, cmd));
                  }
                }
              } else {
                //use original source
                source = self.node.source;
              }

              let cmd = null;

              if (APPLICATION_CONFIG.enableValidation) {
                cmd = new ValidateMappingCommand();
              }

              CommandInvoker.getInvoker().execute(new UpdateNodeCommand(self.node.id, {
                valueType: ValueTypes.TEMPLATE,
                selected: self.node.selected,
                source: source,
                className: $$(self.ids.details.className).getValue(),
                iterator: $$(self.ids.details.iterator).getValue(),
                template: $$(self.ids.details.template).getValue()
              }, cmd));
            };

            let i = 0;

            while (i < targetNodes.length && targetNodes[i].source && targetNodes[i].source.id === source.id) {
              i++;
            }

            if (i < targetNodes.length) {
              CommandInvoker.getInvoker().execute(new ShowUpdateSourceOfTargetNodesDialogCommand(cb));
            } else {
              cb();
            }


            if (self.closeFn) self.closeFn();
          }
        }
      }, {
        view: 'button',
        value: 'Delete',
        on: {
          onItemClick: function () {
            if (self.closeFn) self.closeFn();

            let cmd = null;

            if (APPLICATION_CONFIG.enableValidation) {
              cmd = new ValidateMappingCommand();
            }

            CommandInvoker.getInvoker().execute(new DeleteNodeCommand(self.node.id, cmd));
            CommandInvoker.getInvoker().execute(new HideDetailsCommand());
          }
        }
      }]
    }];

    return panel;
  }
}

class LiteralNodeDetailsPanel extends NodeDetailsPanel {

  constructor(node, edge, sourceNode, closeFn) {
    super(node);
    this.closeFn = closeFn;
    this.edge = edge;
    this.sourceNode = sourceNode;
  }

  getWebixConfig() {
    var panel = super.getWebixConfig();

    var xsdDatatypes = [{
      id: 1,
      value: 'xsd:string'
    }, {
      id: 2,
      value: 'xsd:boolean'
    }, {
      id: 3,
      value: 'xsd:float'
    }, {
      id: 4,
      value: 'xsd:double'
    }, {
      id: 5,
      value: 'xsd:decimal'
    }, {
      id: 6,
      value: 'xsd:dateTime'
    }, {
      id: 7,
      value: 'xsd:duration'
    }, {
      id: 8,
      value: 'xsd:hexBinary'
    }, {
      id: 9,
      value: 'xsd:base64Binary'
    }, {
      id: 10,
      value: 'xsd:anyURI'
    }, {
      id: 11,
      value: 'xsd:ID'
    }, {
      id: 12,
      value: 'xsd:IDREF'
    }, {
      id: 13,
      value: 'xsd:ENTITY'
    }, {
      id: 14,
      value: 'xsd:NOTATION'
    }, {
      id: 15,
      value: 'xsd:normalizedString'
    }, {
      id: 16,
      value: 'xsd:token'
    }, {
      id: 17,
      value: 'xsd:language'
    }, {
      id: 18,
      value: 'xsd:IDREFS'
    }, {
      id: 19,
      value: 'xsd:ENTITIES'
    }, {
      id: 20,
      value: 'xsd:NMTOKEN'
    }, {
      id: 21,
      value: 'xsd:NMTOKENS'
    }, {
      id: 22,
      value: 'xsd:Name'
    }, {
      id: 23,
      value: 'xsd:QName'
    }, {
      id: 24,
      value: 'xsd:NCName'
    }, {
      id: 25,
      value: 'xsd:integer'
    }, {
      id: 26,
      value: 'xsd:nonNegativeInteger'
    }, {
      id: 27,
      value: 'xsd:positiveInteger'
    }, {
      id: 28,
      value: 'xsd:nonPositiveInteger'
    }, {
      id: 29,
      value: 'xsd:negativeInteger'
    }, {
      id: 30,
      value: 'xsd:byte'
    }, {
      id: 31,
      value: 'xsd:int'
    }, {
      id: 32,
      value: 'xsd:long'
    }, {
      id: 33,
      value: 'xsd:short'
    }, {
      id: 34,
      value: 'xsd:unsignedByte'
    }, {
      id: 35,
      value: 'xsd:unsignedInt'
    }, {
      id: 36,
      value: 'xsd:unsignedLong'
    }, {
      id: 37,
      value: 'xsd:unsignedShort'
    }, {
      id: 38,
      value: 'xsd:date'
    }, {
      id: 39,
      value: 'xsd:time'
    }, {
      id: 40,
      value: 'xsd:gYearMonth'
    }, {
      id: 41,
      value: 'xsd:gYear'
    }, {
      id: 42,
      value: 'xsd:gMonthDay'
    }, {
      id: 43,
      value: 'xsd:gDay'
    }, {
      id: 44,
      value: 'xsd:gMonth'
    }];

    var disableSource = (this.edge && this.sourceNode.source);

    var hideSelection = !((this.node.valueType !== ValueTypes.CONSTANT) && this.node.source && (this.node.source.type == 'json' || this.node.source.type == 'xml'));
    var hideColumn = !((this.node.valueType !== ValueTypes.CONSTANT) && this.node.source && this.node.source.type == 'csv');
    var self = this;

    panel.elements = [{
      id: this.ids.details.datatypeContainer,
      cols: [{
        view: 'text',
        id: this.ids.details.datatype,
        labelWidth: 115,
        label: 'Attribute type',
        value: this.node.datatype,
        suggest: xsdDatatypes
      }, {
        view: 'button',
        type: 'icon',
        icon: 'search',
        width: 30,
        on: {
          onItemClick: function () {
            CommandInvoker.getInvoker().execute(new ShowLOVPanelCommmand(function (c) {
              $$(self.ids.details.datatype).setValue(c);
            }, 'datatype'));
          }
        }
      }]
    }, {
      view: 'text',
      id: this.ids.details.template,
      labelWidth: 115,
      label: 'Value',
      value: this.node.template || '',
      name: 'test2',
      validate: Util.validateTemplate,
      validateEvent: 'key',
      on: {
        onTimedKeyPress: self.onTimeKeyPressTextField
      }
    }, {
      view: 'label',
      label: 'Template is invalid.',
      id: self.ids.details.templateError,
      labelWidth: 100,
      hidden: Util.validateTemplate(self.node.template || ''),
      css: 'errorMessage'
    }, {
      id: this.ids.details.sourceContainer,
      margin: 5,
      cols: [{
        view: 'combo',
        id: this.ids.details.source,
        disabled: disableSource,
        labelWidth: 115,
        label: 'Source',
        value: '' + this.selectedSourceID,
        yCount: '' + this.sourceOptions.length,
        options: this.sourceOptions,
        on: {
          onChange: this.onChangeSource
        }
      }, {
        view: 'icon',
        icon: 'question-circle',
        hidden: !disableSource,
        width: 20,
        tooltip: 'The data source of a literal can\'t be different from it\'s connected resource.'
      }]
    }, {
      view: 'text',
      id: this.ids.details.iterator,
      labelWidth: 100,
      label: 'Selection',
      value: this.iteratorValue,
      hidden: hideSelection,
      suggest: this.iteratorOptions,
      //yCount: '' + this.iteratorOptions.length,
      on: {
        onChange: this.onChangeSelection
      }
    }, {
      view: 'text',
      id: this.ids.details.language,
      labelWidth: 115,
      label: 'Language',
      value: this.node.language
    }, {
      view: 'checkbox',
      id: this.ids.details.verification,
      labelWidth: 115,
      label: 'Verification',
      value: this.node.verification,
      hidden: !APPLICATION_CONFIG.enableVerification
    }, {
      view: 'checkbox',
      id: this.ids.details.completion,
      labelWidth: 115,
      label: 'Completion',
      value: this.node.completion,
      hidden: !APPLICATION_CONFIG.enableCompletion
    }, {
      margin: 5,
      cols: [{
        view: 'button',
        value: 'Save',
        type: 'form',
        on: {
          onItemClick: function () {
            let source = inputStore.getSource($$(self.ids.details.source).data.value);

            //console.log($$(ids.details.reference).getInputNode().value);
            let cmd = null;

            if (APPLICATION_CONFIG.enableValidation) {
              cmd = new ValidateMappingCommand();
            }

            CommandInvoker.getInvoker().execute(new UpdateNodeCommand(self.node.id, {
              valueType: ValueTypes.TEMPLATE,
              selected: self.node.selected,
              source: source,
              iterator: $$(self.ids.details.iterator) ? $$(self.ids.details.iterator).getValue() : "",
              template: $$(self.ids.details.template).getValue(),
              language: $$(self.ids.details.language).getValue(),
              datatype: $$(self.ids.details.datatype).getValue(),
              completion: $$(self.ids.details.completion).getValue(),
              verification: $$(self.ids.details.verification).getValue()
            }, cmd));

            if (self.closeFn) self.closeFn();
          }
        }
      }, {
        view: 'button',
        value: 'Delete',
        on: {
          onItemClick: function () {
            if (self.closeFn) self.closeFn();

            let cmd = null;

            if (APPLICATION_CONFIG.enableValidation) {
              cmd = new ValidateMappingCommand();
            }

            CommandInvoker.getInvoker().execute(new DeleteNodeCommand(self.node.id), cmd);
            CommandInvoker.getInvoker().execute(new HideDetailsCommand());
          }
        }
      }]
    }];

    return panel;
  }
}

class BlankNodeDetailsPanel extends NodeDetailsPanel {

  constructor(node, closeFn) {
    super(node);
    this.closeFn = closeFn;
  }

  getWebixConfig() {
    var panel = super.getWebixConfig();
    var self = this;
    const hideSelection = !(this.node.source && (this.node.source.type === 'json' || this.node.source.type === 'xml'));


    panel.elements = [{
      cols: [{
        view: 'text',
        id: this.ids.details.className,
        labelWidth: 100,
        label: 'Entity type',
        value: this.node.className
      }, {
        view: 'button',
        //todo: add id
        type: 'icon',
        icon: 'search',
        width: 30,
        on: {
          onItemClick: function () {
            CommandInvoker.getInvoker().execute(new ShowLOVPanelCommmand(function (c) {
              $$(self.ids.details.className).setValue(c);
            }, 'class'));
          }
        }
      }]
    },{
      id: this.ids.details.sourceContainer,
      cols: [{
        view: 'combo',
        id: self.ids.details.source,
        labelWidth: 100,
        label: 'Source',
        value: '' + this.selectedSourceID,
        yCount: '' + this.sourceOptions.length,
        options: self.sourceOptions,
        on: {
          onChange: self.onChangeSource
        }
      }]
    }, {
      view: 'text',
      id: self.ids.details.iterator,
      labelWidth: 100,
      label: 'Selection',
      value: self.iteratorValue,
      hidden: hideSelection,
      suggest: self.iteratorOptions,
      //yCount: '' + self.iteratorOptions.length,
      on: {
        onChange: self.onChangeSelection
      }
    }, {
      margin: 5,
      cols: [{
        view: 'button',
        value: 'Save',
        type: 'form',
        on: {
          onItemClick: function () {
            let cmd = null;

            if (APPLICATION_CONFIG.enableValidation) {
              cmd = new ValidateMappingCommand();
            }

            CommandInvoker.getInvoker().execute(new UpdateNodeCommand(self.node.id, {
              className: $$(self.ids.details.className).data.value,
              source: inputStore.getSource($$(self.ids.details.source).data.value),
              iterator: $$(self.ids.details.iterator).getValue(),
              selected: self.node.selected
            }), cmd);
            if (self.closeFn) self.closeFn();
          }
        }
      }, {
        view: 'button',
        value: 'Delete',
        on: {
          onItemClick: function () {
            if (self.closeFn) self.closeFn();

            let cmd = null;

            if (APPLICATION_CONFIG.enableValidation) {
              cmd = new ValidateMappingCommand();
            }

            CommandInvoker.getInvoker().execute(new DeleteNodeCommand(self.node.id), cmd);
            CommandInvoker.getInvoker().execute(new HideDetailsCommand());
          }
        }
      }]
    }];

    return panel;
  }
}

class EdgeDetailsPanel extends DetailsPanel {

  constructor(edge, closeFn) {
    super();
    this.edge = edge;
    this.closeFn = closeFn;
  }

  getWebixConfig() {
    this.sources = inputStore.getState().sources;
    this.sourceOptions = [];
    this.selectedSourceID = !this.edge.sourceData ? -1 : this.edge.sourceData.id;

    this.sourceOptions.push({
      id: -1,
      value: ''
    });

    for (let i = 0; i < this.sources.length; i++) {
      this.sourceOptions.push({
        id: this.sources[i].id,
        value: this.sources[i].title
      });
    }

    let references = Util.getReferencesOfTemplate(this.edge.template);
    let enableSource = references !== null && references.length !== 0;

    let hideSelection = !((this.edge.valueType !== ValueTypes.CONSTANT) && this.edge.sourceData && (this.edge.sourceData.type === 'json' || this.edge.sourceData.type === 'xml'));

    const source = this.edge.source ? this.edge.source.source : null;
    let self = this;

    this.iteratorOptions = [],
      this.referenceOptions = [],
      this.iteratorValue = this.edge.selector,
      this.referenceValue = '';

    if (source) {
      this.iteratorOptions = this.fillSelection(source.treeData[0].data, source.types); //get root node, which is not the filename itself

      switch (source.type) {
        case 'csv':
          this.referenceOptions = this.iteratorOptions; // for tabular formats, iterator and reference are equal
          this.referenceValue = this.edge.reference || '';
          break;
        default:
          let separator = source.type === 'xml' ? '/' : '.';
          let getItem = this.getItem(this.iteratorOptions, this.edge.source.iterator);

          if (getItem) {
            let item = getItem.item;
            this.referenceOptions = this.fillReferences(item.sdata, this.edge.source.iterator + separator);
            this.referenceValue = this.referenceOptions.length > 0 ? (source.reference ? this.edge.source.iterator + separator + this.edge.reference : '' + this.referenceOptions[0].id) : '';
          }
      }
    }

    let panel = {
      view: 'form',
      id: this.ids.details.ID,
      //scroll: 'xy'
      minHeight: 300,
      autoheight: true,
      on: {
        onValidationError: function (key, obj) {
          //$$(self.ids.details.templateError).setValue('Template is invalid.');
          $$(self.ids.details.templateError).show();
        },
        onValidationSuccess: function (key, obj) {
          //$$(self.ids.details.templateError).setValue('');
          $$(self.ids.details.templateError).hide();
        }
      }
    };

    if (!this.edge.valueType) {
      this.edge.valueType = ValueTypes.CONSTANT;
    }

    panel.elements = [{
      id: this.ids.details.templateContainer,
      cols: [{
        view: 'text',
        id: this.ids.details.template,
        labelWidth: 100,
        label: 'Predicate',
        value: this.edge.template || '',
        name: 'template-edge',
        validate: Util.validateTemplate,
        validateEvent: 'key',
        on: {
          onTimedKeyPress: self.onTimeKeyPressTextField
        }
      }, {
        view: 'button',
        type: 'icon',
        icon: 'search',
        id: this.ids.details.searchLOV,
        width: 30,
        on: {
          onItemClick: function () {
            CommandInvoker.getInvoker().execute(new ShowLOVPanelCommmand(function (c) {
              $$(self.ids.details.template).setValue(c);
            }, 'property'));
          }
        }
      }]
    }, {
      view: 'label',
      label: 'Template is invalid.',
      id: self.ids.details.templateError,
      labelWidth: 100,
      hidden: Util.validateTemplate(self.edge.template || ''),
      css: 'errorMessage'
    }, {
      view: 'combo',
      id: this.ids.details.source,
      disabled: true,
      labelWidth: 115,
      label: 'Source',
      value: '' + this.selectedSourceID,
      yCount: '' + this.sourceOptions.length,
      options: this.sourceOptions,
      on: {
        onChange: this.onChangeSource
      }
    }, {
      view: 'text',
      id: this.ids.details.iterator,
      labelWidth: 100,
      label: 'Selection',
      value: this.iteratorValue,
      hidden: hideSelection,
      suggest: this.iteratorOptions,
      disabled: true,
      //yCount: '' + this.iteratorOptions.length,
      on: {
        onChange: this.onChangeSelection
      }
    }];

    if (this.edge.source && this.edge.target && (this.edge.source.type === 'resource' || this.edge.source.type === 'blank') && (this.edge.target.type === 'resource' || this.edge.target.type === "blank")) {
      var referenceOptionsSourceNode = [];
      var referenceOptionsTargetNode = [];

      if (this.edge.source.source && this.edge.target.source) {
        var iteratorOptions = this.fillSelection(this.edge.source.source.treeData[0].data, this.edge.source.source.type);

        switch (this.edge.source.source.type) {
          case 'csv':
            referenceOptionsSourceNode = this.iteratorOptions; // for tabular formats, iterator and reference are equal
            break;
          default:
            var item = this.getItem(this.iteratorOptions, this.edge.source.iterator).item;
            var separator = this.edge.source.source.type === 'xml' ? '/' : '.';
            referenceOptionsSourceNode = this.fillReferences(item.data, this.edge.source.iterator + separator);
        }

        this.iteratorOptions = this.fillSelection(this.edge.target.source.treeData[0].data, this.edge.target.source.type);

        switch (this.edge.target.source.type) {

          case 'csv':
            referenceOptionsTargetNode = this.iteratorOptions; // for tabular formats, iterator and reference are equal
            break;
          default:
            var item = this.getItem(this.iteratorOptions, this.edge.target.iterator).item;
            var separator = this.edge.target.source.type === 'xml' ? '/' : '.';
            referenceOptionsTargetNode = this.fillReferences(item.data, this.edge.target.iterator + separator);
        }
      }

      panel.elements.push({
        cols: [{
          view: 'checkbox',
          width: 30,
          id: this.ids.details.conditions.join.all,
          value: !this.edge.conditions.join.all,
          on: {
            onChange: function (newv, oldv) {
              if (!newv) {
                $$(self.ids.details.conditions.join.child).disable();
                $$(self.ids.details.conditions.join.parent).disable();
              } else {
                $$(self.ids.details.conditions.join.child).enable();
                $$(self.ids.details.conditions.join.parent).enable();
              }
            }
          }
        }, {
          view: 'combo',
          id: this.ids.details.conditions.join.child,
          disabled: this.edge.conditions.join.all,
          label: 'If',
          labelWidth: 40,
          yCount: referenceOptionsSourceNode.length,
          options: referenceOptionsSourceNode,
          value: this.edge.conditions.join.child
        }]
      });
      panel.elements.push({
        view: 'combo',
        id: this.ids.details.conditions.join.parent,
        disabled: this.edge.conditions.join.all,
        labelWidth: 70,
        label: 'matches',
        yCount: referenceOptionsTargetNode.length,
        options: referenceOptionsTargetNode,
        value: this.edge.conditions.join.parent
      });
    }

    panel.elements.push({
      margin: 5,
      cols: [{
        view: 'button',
        value: 'Save',
        type: 'form',
        on: {
          onItemClick: function () {
            //var source = InputModel.getModel().getSource($$(ids.details.source).getValue());

            var conditions = self.edge.conditions;

            if ((self.edge.source.type === 'resource' || self.edge.source.type === 'blank') && (self.edge.target.type === 'resource' || self.edge.target.type === 'blank')) {
              conditions.join.all = !$$(self.ids.details.conditions.join.all).getValue();
            }

            if (!conditions.join.all) {
              conditions.join.child = $$(self.ids.details.conditions.join.child).getValue();
              CommandInvoker.getInvoker().execute(new HighlightInputCommand(self.edge.source.source, conditions.join.child))

              //conditions.join.child = "dog";
              conditions.join.parent = $$(self.ids.details.conditions.join.parent).getValue();
              CommandInvoker.getInvoker().execute(new HighlightInputCommand(self.edge.target.source, conditions.join.parent, false))
            }

            //CommandInvoker.getInvoker().execute(new UpdateEdgeCommand(edge.id, reference, $$(ids.details.template).data.value, $$(ids.details.useBaseIRI).getValue(), s, $$(ids.details.isConstant).getValue(), $$(ids.details.constant).getValue(), conditions, $$(ids.details.isTemplated).getValue()));
            
              graphActions.updateEdge(self.edge.id, {
                valueType: ValueTypes.TEMPLATE,
                //source: source,
                conditions: conditions,
                template: $$(self.ids.details.template).getValue(),
                sourceData: inputStore.getSource($$(self.ids.details.source).data.value)
              });
            
            // Highlight the appropriate source column. If there are joining conditions, don't wipe the previous selection; this is the joining selection.
            CommandInvoker.getInvoker().execute(new HighlightInputCommand(self.edge.sourceData,  (Util.getReferencesOfTemplate(self.edge.template) || [])[0], conditions.join.all))

            if (self.closeFn) self.closeFn();
            if (APPLICATION_CONFIG.enableValidation) {
              CommandInvoker.getInvoker().execute(new ValidateMappingCommand());
            }
          }
        }
      }, {
        view: 'button',
        value: 'Delete',
        on: {
          onItemClick: function () {
            if (self.closeFn) self.closeFn();

            let cmd = null;

            if (APPLICATION_CONFIG.enableValidation) {
              cmd = new ValidateMappingCommand();
            }

            CommandInvoker.getInvoker().execute(new DeleteEdgeCommand(self.edge.id), cmd);
            CommandInvoker.getInvoker().execute(new HideDetailsCommand());
          }
        }
      }]
    });

    return panel;
  }
}