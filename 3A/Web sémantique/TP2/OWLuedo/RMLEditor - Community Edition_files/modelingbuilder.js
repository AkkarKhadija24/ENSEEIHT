/**
 * Created by Pieter Heyvaert on 26.01.16.
 */

var ModelingBuilder = (function () {

  var ids = {
    ID: 'modelingPanel',
    D3: 'modelingPanelD3',
    placeholder: "modelingPanelPlaceholder",
    DETAIL_LEVELS: 'modelingpanel-detaillevels',
    ERRORS_PANEL: 'errorpanel-datatable',
    NODE_PANEL: 'node-panel',
    RESOLUTION_PANEL: 'resolution-panel',
    FILTER_FORM: 'filter-form',
    FILTER_POPUP: 'filter-popup',
    SORT_FORM: 'sort-form',
    SORT_POPUP: 'sort-popup',
    settings: {
      ID: 'settingsPanelModelingPanel',
      baseIRI: 'spmpBaseIRI',
      prefix: 'spmpPrefix'
    },
    details: {
      WINDOW: 'detailsWindow',
      ID: 'detailsPanel',
      constantContainer: 'dpmpConstantContainer',
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
      conditions: {
        join: {
          all: 'dpmpJoinConditionAll',
          child: 'dpmpJoinConditionChild',
          parent: 'dmpmJoinConditionParent'
        }
      }
    }
  };

  var getModelingPanel = function (modelingController) {
    return {
      id: ids.ID,
      type: 'line',
      resize: true,
      rows: [
        {
          id: ids.placeholder,
          hidden: true,
          height: 0
        },
        {
        id: ids.DETAIL_LEVELS,
        view: 'radio',
        label: 'Detail',
        css: 'detailLevel',
        value: visibleGraphStore.getState().currentDetailLevel + 1,
        align: 'right',
        //width: 768,
        options: [{
          id: 1,
          value: 'Lowest'
        }, //the initially selected item
          {
            id: 2,
            value: 'Low'
          }, {
            id: 3,
            value: 'Moderate'
          }, {
            id: 4,
            value: 'High'
          }, {
            id: 5,
            value: 'Highest'
          }
        ],
        on: {
          onChange: function (newv, oldv) {
            switch (newv) {
              case '1':
                CommandInvoker.getInvoker().execute(new SetDetailLevelCommand(visibleGraphStore.getState().detailLevels.LOW));
                break;
              case '2':
                CommandInvoker.getInvoker().execute(new SetDetailLevelCommand(GraphDetailLevels.MODERATE_LOW));
                break;
              case '3':
                CommandInvoker.getInvoker().execute(new SetDetailLevelCommand(GraphDetailLevels.MODERATE));
                break;
              case '4':
                CommandInvoker.getInvoker().execute(new SetDetailLevelCommand(GraphDetailLevels.MODERATE_HIGH));
                break;
              case '5':
                CommandInvoker.getInvoker().execute(new SetDetailLevelCommand(GraphDetailLevels.HIGH));
                break;
            }
          }
        }
      },
        //getSettingsPanelModelingPanel(),
        {
          id: ids.D3,
          view: 'd3-chart',
          resize: true,
          url: './js/ui/dummy_data_d3.json',
          ready: function () {
            if(!Number.isNaN(this.$width)){
              modelingController.setUp(this);
              modelingController.start();
            }
            webix.DragControl.addDrop($$(ids.D3)._contentobj, {
              $drop: function (source, target, event) {
                console.log("drop shit")
                // get the source of the drag and drop
                var dnd = webix.DragControl.getContext();
                console.log(dnd.from.getItem(dnd.source[0]));
                console.log(event);
                var currentSource = inputStore.getState().displayedSource;
                console.log(currentSource);

                var item = dnd.from.getItem(dnd.source[0]);
                var iteratorOptions = Util.fillSelection(currentSource.treeData[0].data, currentSource.type);

                var closeFn = function (id, e, node) {
                  $$('my_popup').close();
                  //self.backgroundClicked = false;
                };

                var callback = function (nodeID) {
                  graphActions.selectOne(nodeID);
                  //CommandInvoker.getInvoker().execute(new UnselectAllEdgesCommand());
                  //CommandInvoker.getInvoker().execute(new ShowDetailsNodeCommand(graphStore.findNode(nodeID)));
                };

                var literalFn = function (id, e, node) {
                  var reference = '';
                  var iterator = '';

                  if (currentSource.type === "csv") {
                    reference = item.path;
                  } else if (currentSource.type === "xml") {
                    var parts = item.path.split("/");
                    reference = parts[parts.length - 1];
                    iterator = item.path.substr(0, item.path.lastIndexOf('/'));
                  } else if (currentSource.type === "json") {
                    var parts = item.path.split(".");
                    reference = parts[parts.length - 1];
                    iterator = item.path.substr(0, item.path.lastIndexOf('/'));
                  }


                  CommandInvoker.getInvoker().execute(new AddNewLiteralNodeCommand({
                    valueType: ValueTypes.TEMPLATE,
                    selected: true,
                    source: currentSource,
                    className: null,
                    iterator: iterator,
                    template: `{${reference}}`,
                    language: null,
                    datatype: null
                  }, callback));
                  closeFn();
                };

                const getReferenceAndIterator = (currentSource, item) => {
                  let reference = '';
                  var iterator = '';
                  console.log(item.path)
                  if (currentSource.type === "csv") {
                    reference = item.path;
                  } else if (currentSource.type === "xml") {
                    var parts = item.path.split("/");
                    reference = parts[parts.length - 1];
                    iterator = item.path.substr(0, item.path.lastIndexOf('/'));
                  } else if (currentSource.type === "json") {
                    var parts = item.path.split(".");
                    reference = parts[parts.length - 1];
                    iterator = item.path.substr(0, item.path.lastIndexOf('.'));
                  }
                  return [reference, iterator]
                }
                var resourceFn = function (id, e, node) {
                  
                  const [reference, iterator] = getReferenceAndIterator(currentSource, item)
                  var template = "{" + reference + "}";

                  if (namespacesStore.getBaseURIPrefix()) {
                    template = namespacesStore.getBaseURIPrefix() + ":" + template;
                  }

                  CommandInvoker.getInvoker().execute(new AddNewResourceNodeCommand({
                    valueType: ValueTypes.TEMPLATE,
                    selected: true,
                    source: currentSource,
                    className: null,
                    iterator: iterator,
                    reference: reference,
                    template: template,
                    constant: null,
                    language: null,
                    datatype: null
                  }, callback));
                  closeFn();
                };

                var blankFn = function (id, e, node) {
                  const [reference, iterator] = getReferenceAndIterator(currentSource, item)

                  CommandInvoker.getInvoker().execute(new AddNewBlankNodeCommand({
                    className: null,
                    selected: true,
                    source: currentSource,
                    iterator: iterator,
                    reference
                  }, callback));
                  closeFn();
                };

                var deselectFn = function (id, e, node) {
                  graphActions.unselectAll();
                  CommandInvoker.getInvoker().execute(new HighlightInputCommand());
                  CommandInvoker.getInvoker().execute(new HideDetailsCommand());
                  closeFn();
                };

                console.log("background")
                //var popUp = getDropContextMenu(event.y,event.x,literalFn,closeFn,resourceFn);
                //top, left, resourceFn, literalFn, deselectFn, closeFn, blankFn
                var popUp = getBackgroundContextMenu(event.y, event.x, resourceFn, literalFn, deselectFn, closeFn, blankFn);
                popUp.show();
              }
            });
          }
        }
      ]
    };
  };

  var getDropContextMenu = function (top, left, literalFn, closeFn, resourceFn) {
    var popUp = webix.ui({
      view: 'popup',
      id: 'drop_popup',
      head: 'My Window',
      height: 100,
      left: left,
      top: top,
      modal: false,
      body: {
        rows: [{
          view: 'button',
          id: 'btnLN',
          label: 'New Resource',
          on: {
            onItemClick: resourceFn
          }
        }, {
          view: 'button',
          id: 'btnRN',
          label: 'New Literal',
          on: {
            onItemClick: literalFn
          }
        }]
      },
      on: {
        onKeyPress: function (code, e) {
          if (code === 27) {
            closeFn();
          }
        },
        onHide: function () {
          closeFn();
        }
      }
    });

    return popUp;
  };

  var getEdgeContextMenu = function (top, left, deleteFn, closeFn, reverseFn) {
    var popUp = webix.ui({
      view: 'popup',
      id: 'my_popup',
      head: 'My Window',
      height: 100,
      left: left,
      top: top,
      modal: false,
      body: {
        rows: [{
          view: 'button',
          id: 'btnRN',
          label: 'Reverse',
          on: {
            onItemClick: reverseFn
          }
        }]
      },
      on: {
        onKeyPress: function (code, e) {
          if (code === 27) {
            closeFn();
          }
        },
        onHide: function () {
          closeFn();
        }
      }
    });

    return popUp;
  };
  //top, left, literalFn, closeFn, resourceFn
  var getNodeContextMenu = function (top, left, changeTypeFn, duplicateFn, deleteFn, addEdgeFn, closeFn) {
    var c = {
      view: 'popup',
      id: 'my_popup',
      head: 'My Window',
      height: 180,
      left: left,
      top: top,
      modal: false,
      body: {
        rows: [
          //{
          //  view: 'button',
          //  id: 'btnCT',
          //  label: 'Change Type',
          //  on: {
          //    onItemClick: changeTypeFn
          //  }
          //},
          {
            view: 'button',
            id: 'btnRN',
            label: 'Duplicate',
            on: {
              onItemClick: duplicateFn
            }
          }
        ]
      },
      on: {
        onKeyPress: function (code, e) {
          if (code === 27) {
            closeFn();
          }
        },
        onHide: function () {
          closeFn();
        }
      }
    };

    //if (addEdgeFn) {
    //  c.body.rows.push({
    //    view: 'button',
    //    id: 'btnAE',
    //    label: 'Add Relation',
    //    on: {
    //      onItemClick: addEdgeFn
    //    }
    //  });
    //}

    var popUp = webix.ui(c);

    return popUp;
  };

  var getBackgroundContextMenu = function (top, left, resourceFn, literalFn, deselectFn, closeFn, blankFn) {
    var popUp = webix.ui({
      view: 'popup',
      id: 'my_popup',
      head: 'My Window',
      height: 165,
      left: left,
      top: top,
      modal: false,
      body: {
        rows: [{
          view: 'button',
          id: 'btnRN',
          label: 'New Entity',
          on: {
            onItemClick: function(){
              resourceFn();

              if (APPLICATION_CONFIG.enableValidation) {
                CommandInvoker.getInvoker().execute(new ValidateMappingCommand());
              }
            }
          }
        }, {
          view: 'button',
          id: 'btnBN',
          label: 'New Blank Node',
          on: {
            onItemClick: function(){
              blankFn();
              if (APPLICATION_CONFIG.enableValidation) {
                CommandInvoker.getInvoker().execute(new ValidateMappingCommand());
              }
            }
          }
        }, {
          view: 'button',
          id: 'btnLN',
          label: 'New Attribute',
          on: {
            onItemClick: function(){
              literalFn();

              if (APPLICATION_CONFIG.enableValidation) {
                CommandInvoker.getInvoker().execute(new ValidateMappingCommand());
              }
            }
          }
        }, {
          view: 'button',
          id: 'btnDA',
          label: 'Deselect All',
          on: {
            onItemClick: deselectFn
          }
        }]
      },
      on: {
        onKeyPress: function (code, e) {
          if (code === 27) {
            closeFn();
          }
        },
        onHide: function () {
          closeFn();
        }
      }
    });

    return popUp;
  };

  var getErrorPanel = function (errors) {
    var messages = '';

    for (var i = 0; i < errors.length; i ++) {
      messages += "" + (i  +1) + ". " + errors[i].message + "\n";
    }

    var panel = {
      view: "template",
      id: ModelingBuilder.ids.details.ID,
      template: messages
    };

    return panel;
  };

  /**
   * Sort based on the violationlevel of the violation.
   */
  function sortByLevel(a,b){
    a = a.errorLevel;
    b = b.errorLevel;
    if(a === "ERROR" && b === "WARN") return 1;
    if(a === "WARN" && b === "ERROR") return -1;
    return 0;
  }

  /**
  * Returns a datatable, containing 3 columns, populated with errormessages and an image representing
  * the severity of the violation.
  * When one of the rows is clicked, the graph elements relating to the error are alternately shown (if there are
  * multiple related elements).
  */
  var getErrorsPanel = function(){
    var panel = {
      view: "datatable",
      id: ModelingBuilder.ids.ERRORS_PANEL,
      // When first created, the errorpanel is not shown
      hidden: true,
      scrollX:false,
      fixedRowHeight: false,
      columns: [
        {
          id: "message",
          header: "Violations <img src='./images/filter.png' class='filter_button'/> <img src='./images/sort.png' class='sort_button'/>",
          template: function(obj){
            for(var i = 0; i < obj.graphIds.length; i++){
              var value = "";
              var entity = graphStore.findEdge(obj.graphIds[i]);
              if(entity === null) {
                entity = graphStore.findNode(obj.graphIds[i]);
                if(entity != null) value = Util.getSubjectValue(entity);
              } else{
                value = Util.getPredicateValue(entity);
              }
              var nodes = `<div class = 'error_message node_table'>${obj.message} (${value})</div>`;
            }
            nodes += "<p></p>";
            return nodes
          },
          // Takes up the rest of the width
          fillspace: true
        },
        {
          id: "image",
          header: "Level",
          template: function (obj) {
            if (obj.errorLevel === "ERROR") return "<img src='/images/error.png' " + " class='errorG'" + "/>";
            if (obj.errorLevel === "WARN") return "<img src='/images/error.png' " + " class='warnG'" + "/>";
          },
          sort: sortByLevel
        },
        {
          id: "violationType",
          header: "Type",
          sort: customSort
        },
        {
          hidden:true,
          id: "id"
        }
      ],
      on: {
        // onItemClick handler
        "onItemClick": function(id, e, trg){
          CommandInvoker.getInvoker().execute(new FillResolutionPanelCommand(id));
          CommandInvoker.getInvoker().execute(new ShowResolutionPanelCommand());
        },
        onAfterLoad:function(){
          webix.delay(function(){
            this.adjustRowHeight("message", true);
            this.render();
          }, this);
        },
        onResize: function() {
          webix.delay(function () {
            this.adjustRowHeight("message", true);
            this.render();
          }, this);
        },
        onAfterAdd:function(){
          this.adjustRowHeight("message", true);
          this.render();
        }
      },
      onClick: {
        "filter_button": function (e, id, trg) {
          CommandInvoker.getInvoker().execute(new ShowFilterFormCommand());
        },
        "sort_button": function (e, id, trg) {
          CommandInvoker.getInvoker().execute(new ShowSortFormCommand());
        },
        "node_table": function(e, id, trg){
          var entity = $$(ModelingBuilder.ids.ERRORS_PANEL).getItem(id);

          // vind de node responsible
          var content = e.srcElement.innerText;
          for(var i = 0; i < entity.graphIds.length; i++){
            // check of de content in de entity zit
            var pe = modelingController.findEdge(entity.graphIds[i]);
            if(pe == null){
              pe = modelingController.findNode(entity.graphIds[i]);
              if(pe.className === content || pe.reference === content || pe.template === content || pe.constant === content ||
                  pe.datatype === content){
                // show deze entity
                graphActions.selectOne(pe.id);
                CommandInvoker.getInvoker().execute(new ShowDetailsNodeCommand(pe));
              }
            } else{
              if(pe.constant === content || pe.reference === content || pe.template === content){
                // show deze entity
                graphActions.selectOne(pe.id);
                CommandInvoker.getInvoker().execute(new ShowDetailsEdgeCommand(pe));
              }
            }

          }
          // get details

        }
      }};
    return panel;
  };

  var getResolutionPanel = function(){
    var panel = {
      view: "datatable",
      id: ModelingBuilder.ids.RESOLUTION_PANEL,
      hidden: true,
      columns: [
        {
          id: "message",
          header: "Resolution",
          fillspace: true
        },
        {
          id: "id",
          hidden: true
        }
      ],
      on:{
        "onItemClick": function(id, e, trg){
          var curViol = this.getItem(id);
          CommandInvoker.getInvoker().execute(new ResolveViolationCommand(curViol))
        }
      }
      };
    return panel;
  };

  var getFilterForm = function(){
    var panel = {view: 'window',
    head: 'Filter',
    modal: true,
    position: 'center',
    id: ModelingBuilder.ids.FILTER_POPUP,
    body: {
    view: 'form',
      id: ModelingBuilder.ids.FILTER_FORM,
      width:400,
      elementsConfig:{
        labelWidth: 300
      },
      elements: createFilterForm()
    }
  };
    console.log(panel);
  return panel;
  };

  var getSortForm = function(){
    return {view: 'window',
      head: 'Sort',
      modal: true,
      position: 'center',
      id: ModelingBuilder.ids.SORT_POPUP,
      body: {
        view: 'form',
        id: ModelingBuilder.ids.SORT_FORM,
        width:400,
        elementsConfig:{
          labelWidth: 300
        },
        elements: createSortForm()
      }
    }};

  return {
    ids: ids,
    getModelingPanel: getModelingPanel,
    getEdgeContextMenu: getEdgeContextMenu,
    getNodeContextMenu: getNodeContextMenu,
    getBackgroundContextMenu: getBackgroundContextMenu,
    getErrorPanel: getErrorPanel,
    getErrorsPanel: getErrorsPanel,
    getFilterForm: getFilterForm,
    getSortForm: getSortForm,
    getResolutionPanel: getResolutionPanel
  };

})();