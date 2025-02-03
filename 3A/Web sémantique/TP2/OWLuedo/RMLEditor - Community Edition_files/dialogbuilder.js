/**
 * Created by Pieter Heyvaert on 26.01.16.
 */
var DialogBuilder = (function () {

  var ids = {
    connectsources: {
      ID: "connectSourcesPanel",
      datatable: {
        ID: "connectSourcesPanel-datatable"
      },
      savebutton: "connectSourcesPanel-button"
    },
    namespaces: {
      ID: "namespacesPanel",
      prefix: "nsp-prefix",
      iri: "nsp-iri",
      datatable: {
        id: "namespacesPanel-datatable"
      }
    },
    lov: {
      ID: "lovPanel",
      SEARCH: "lovPanel-search",
      datatable: {
        ID: "lovPanel-datatable"
      }
    },
    autosaves: {
      ID: "autosavesPanel",
      datatable: {
        ID: "autosavesPanel-datatable"
      }
    },
    downloadFileFromURI: {
      ID: "downloadFileFromURI-panel",
      URI: "downloadFileFromUri-uri"
    },
    definesourcespaths: {
      ID: "definesourcepaths-panel",
      datatable: {
        ID: "definesourcepaths-datatable"
      }
    },
    setbaseURI: {
      ID: "setbaseURI-panel",
      ASKAGAIN: "setabseURI-askagain"
    },
    github: {
      ID: "github-panel"
    },
    mappingIsRunning: {
      ID: "mappingisrunning-panel"
    }
  };

  var showCloseSourceDialog = function (callback) {
    webix.confirm({
      title: "Close Source?",
      ok: "Yes",
      cancel: "No",
      type: "confirm-error",
      text: "Are you sure you want to close the data source? This might result in unexpected behaviour when the source is used in any of the mappings.",
      callback: callback
    });
  };

  var showFixForRunningDialog = function (callback) {
    webix.confirm({
      title: "Dummy Data",
      ok: "Yes",
      cancel: "No",
      type: "confirm-error",
      text: "If your mapping is not complete, do you want us to fill in dummy data so you can run it?",
      callback: callback
    });
  };

  var showBeforeRunMappingDialog = function (callback) {
    webix.confirm({
      title: "Dummy Data",
      ok: "Yes",
      cancel: "No",
      type: "confirm-error",
      text: "If your mapping is not complete, do you want us to fill in dummy data so you can at least run it? If you select 'No' you will not be able to run the mapping.",
      callback: callback
    });
  };

  var getDefineSourcesPathsPanel = function (closeFn, callback) {
    var sources = inputStore.getState().sources;
    var tempSources = [];

    for (var i = 0; i < sources.length; i++) {
      var t = {id: (i + 1), title: sources[i].title};

      if (sources[i].originalLocation) {
        t.path = sources[i].originalLocation;
      } else {
        t.path = sources[i].title;
      }

      tempSources.push(t);
    }

    uibldr = this;

    return {
      id: ids.definesourcespaths.ID,
      type: "line",
      rows: [
        {
          view: "datatable",
          id: ids.definesourcespaths.datatable.ID,
          columns: [{id: "title", header: "Source", width: 150}, {
            id: "path",
            header: "Local Path",
            editor: "text",
            width: 415
          }],
          resizeColumn: true,
          autowidth: true,
          editable: true,
          editaction: "dblclick",
          width: 600,
          minWidth: 600,
          data: tempSources
        },
        {
          view: "form",
          elements: [
            {
              margin: 5, cols: [
              {
                view: "button", value: "Export", type: "form", on: {
                onItemClick: function () {
                  var sourcesPaths = {};

                  for (var i = 1; i <= sources.length; i++) {
                    var s = $$(ids.definesourcespaths.datatable.ID).getItem(i);
                    sourcesPaths[s.title] = s.path;
                  }

                  callback(sourcesPaths);
                  closeFn();
                }
              }
              },
              {
                view: "button", value: "Close", on: {
                onItemClick: function () {
                  closeFn();
                }
              }
              }
            ]
            }
          ]
        }
      ]
    }
  };

  var getConnectSourcesPanel = function (mappingSources, closeFn, callback) {
    var sources = inputStore.getState().sources;
    var suggestData = [];

    for (var i = 0; i < sources.length; i++) {
      suggestData.push({id: (i + 1), value: sources[i].title});
    }

    uibldr = this;

    return {
      id: ids.connectsources.ID,
      type: "line",
      rows: [
        {
          view: "datatable",
          id: ids.connectsources.datatable.ID,
          columns: [{id: "name", header: "Mapping Source", width: 150}, {
            id: "source",
            header: "Input Source",
            editor: "select",
            width: 415,
            options: suggestData
          }],
          resizeColumn: true,
          autowidth: true,
          editable: true,
          editaction: "click",
          width: 600,
          minWidth: 600,
          data: mappingSources
        },
        {
          view: "form",
          elements: [
            {
              margin: 5, cols: [
              {
                id: ids.connectsources.savebutton, view: "button", value: "Save", type: "form", on: {
                onItemClick: function () {
                  console.log(ids.connectsources.datatable.ID);
                  $$(ids.connectsources.savebutton).focus()
                  $$(ids.connectsources.datatable.ID).editStop();

                  for (var i = 0; i < mappingSources.length; i++) {
                    if (sources[parseInt(mappingSources[i].source) - 1]) {
                      inputActions.updateSource(sources[parseInt(mappingSources[i].source) - 1].id, {originalLocation: mappingSources[i].name});
                      mappingSources[i].source = sources[parseInt(mappingSources[i].source) - 1].title;
                    }
                  }

                  console.log(mappingSources);
                  callback(mappingSources);
                  closeFn();
                }
              }
              },
              {
                view: "button", value: "Close", on: {
                onItemClick: function () {
                  closeFn();
                }
              }
              }
            ]
            }
          ]
        }
      ]
    }
  };

  var getNamespacesPanel = function (closeFn) {
      //var nss = NamespacesModel.getModel().getNamespaces();
      var nss = namespacesStore.getState().namespaces;

      for (var i = 0; i < nss.length; i++) {
        nss[i].id = i + 1;
      }

      return {
        id: ids.namespaces.ID,
        type: "line",
        rows: [
          {
            view: "datatable",
            id: ids.namespaces.datatable.id,
            columns: [{id: "isBaseURI", header: "Base URI", template: "{common.radio()}"},
              {id: "prefix", header: "Prefix", editor: "text", width: 150}, {
                id: "iri",
                header: "URI",
                editor: "text",
                width: 415
              }],
            scrollX: true,
            resizeColumn: true,
            //autowidth: true,
            editable: true,
            editaction: "dblclick",
            width: 600,
            minWidth: 600,
            data: nss,
            ready: function () {
              this.eachRow(function (id) {
                var i = 0;

                while (nss[i].id != id) {
                  i++;
                }

                this.getItem(id).isBaseURI = nss[i].isBaseURI;
              });
              this.refresh();
            },
            on: {
              onBeforeContextMenu: function (id, e, node) {
                latestClickedCell = id;
                var ctxtMenu = webix.ui({view: "contextmenu"});
                var data = ["Delete"];
                $$(ctxtMenu).clearAll();
                $$(ctxtMenu).parse(data);

                $$(ctxtMenu).attachEvent("onItemClick", function (id, e, node) {
                  CommandInvoker.getInvoker().execute(new RemoveNamespaceCommand($$(ids.namespaces.datatable.id).getItem(latestClickedCell).prefix));
                  $$(ids.namespaces.datatable.id).remove(latestClickedCell);
                });

                $$(ctxtMenu).attachTo($$(ids.namespaces.datatable.id));
              },
              onCheck: function (row, column, state) {
                this.updateItem(row, {isBaseURI: true});

                for (var i = 1; i <= this.count(); i++) {
                  if (i != row) {
                    this.updateItem(i, {isBaseURI: false});
                  }
                }
              }

            }
          },
          {
            view: "form",
            elements: [
              {
                cols: [
                  {view: "text", id: ids.namespaces.prefix, value: '', label: "Prefix"},
                  {
                    view: "button",
                    type: "icon",
                    icon: "search",
                    width: 30,
                    on: {
                      onItemClick: function () {
                        var p = $$(ids.namespaces.prefix).getValue();

                        var cb = function (iri, error) {
                          $$(ids.namespaces.iri).show();

                          if (!error) {
                            $$(ids.namespaces.iri).setValue(iri);
                          } else {
                            CommandInvoker.getInvoker().execute(new ShowErrorMessageCommand("Prefix Not Found", "There was no matching URI found for the given prefix \'" + p + "\'. You can add it manually."));
                          }
                        };

                        CommandInvoker.getInvoker().execute(new QueryPrefixCCCommand(p, cb));
                      }
                    }
                  }
                ]
              },
              {
                view: "text",
                id: ids.namespaces.iri,
                hidden: true,
                value: '',
                placeholder: "URI of the namespace",
                label: "URI"
              },
              {
                margin: 5, cols: [
                {
                  view: "button", value: "Add", type: "form", on: {
                  onItemClick: function () {
                    var p = $$(ids.namespaces.prefix).getValue();
                    var i = $$(ids.namespaces.iri).getValue();

                    if (p.length > 0 && i.length > 0) {

                      var iri = namespacesStore.getIRI(p);

                      if (!iri) {
                        var prefix = namespacesStore.getPrefix(i);

                        if (!prefix) {
                          $$(ids.namespaces.datatable.id).add({id: nss.length + 1, prefix: p, iri: i}, nss.length);
                          CommandInvoker.getInvoker().execute(new AddNamespaceCommand(p, i));
                        } else {
                          CommandInvoker.getInvoker().execute(new ShowErrorMessageCommand("URI Already Used", "The URI \'" + i + "\' is already used."));
                        }
                      } else {
                        CommandInvoker.getInvoker().execute(new ShowErrorMessageCommand("Prefix Already Used", "The prefix \'" + p + "\' is already used."));
                      }

                    } else {
                      CommandInvoker.getInvoker().execute(new ShowErrorMessageCommand("Invalid Prefix and/or URI", "Please provide a valid prefix and URI."));
                    }
                  }
                }
                },
                {
                  view: "button", value: "Close", on: {
                  onItemClick: function () {
                    closeFn();
                  }
                }
                }
              ]
              }
            ]
          }
        ]
      }
    }
  ;

  var getAutoSavesPanel = function (saves, closeFn, callback) {
    var tempSaves = [];

    for (var i = 0; i < saves.length; i++) {
      tempSaves.push({id: saves[i].id, title: saves[i].time});
    }
    ;

    uibldr = this;

    return {
      id: ids.autosaves.ID,
      type: "line",
      rows: [
        {
          view: "datatable",
          id: ids.autosaves.datatable.ID,
          columns: [{id: "title", header: "Time", width: 300}],
          resizeColumn: true,
          autowidth: true,
          editable: false,
          select: "row",
          width: 450,
          minWidth: 450,
          data: tempSaves
        },
        {
          view: "form",
          elements: [
            {
              margin: 5, cols: [
              {
                view: "button", value: "Load", type: "form", on: {
                onItemClick: function () {
                  var id = $$(ids.autosaves.datatable.ID).getSelectedId().id;
                  //console.log(selectedSave.graph.getNodes());
                  callback(id);
                  closeFn();
                }
              }
              },
              {
                view: "button", value: "Close", on: {
                onItemClick: function () {
                  closeFn();
                }
              }
              }
            ]
            }
          ]
        }
      ]
    }
  };

  var getLOVPanel = function (callback, closeFn, type) {
    var search = function () {
      CommandInvoker.getInvoker().execute(new QueryLOVCommand($$(ids.lov.SEARCH).getValue(), type, function (data, status) {
        $$(ids.lov.datatable.ID).clearAll();

        for (var i = 0; i < data.length; i++) {
          $$(ids.lov.datatable.ID).add(data[i]);
        }

      }));
    };

    return {
      type: "line",
      id: ids.lov.ID,
      rows: [
        {
          view: "form",
          elements: [
            {
              view: "text", id: ids.lov.SEARCH, value: '', label: "Search",
              on: {
                onKeyPress: function (code, e) {
                  if (code == 13) {
                    search();
                  }
                }
              }
            },
            {
              view: "button", value: "Search", type: "form", on: {
              onItemClick: search
            }
            }
          ]
        },
        {
          id: ids.lov.datatable.ID,
          view: "datatable",
          select: "row",
          columns: [
            {id: "prefixedName", header: "Prefixed Name", width: 125},
            {id: "uri", header: "URI", template: "<a href='#uri#' target='_blank'>#uri#</a>", width: 400}
          ],
          resizeColumn: true,
          data: []
        },
        {
          margin: 5, cols: [
          {
            view: "button", value: "Use", type: "form", on: {
            onItemClick: function () {
              if ($$(ids.lov.datatable.ID).getSelectedItem()) {
                var item = $$(ids.lov.datatable.ID).getSelectedItem();

                CommandInvoker.getInvoker().execute(new GetNamespaceIRILOVCommand(item["vocabulary.prefix"][0], item.prefixedName[0], item.uri[0], function (ns) {
                  CommandInvoker.getInvoker().execute(new AddNamespaceCommand(item["vocabulary.prefix"][0], ns, function (prefix) {
                    //item.prefixedName[0] = item.prefixedName[0].replace(item["vocabulary.prefix"][0] + ":", prefix + ":");
                    var result = item.prefixedName[0].replace(item["vocabulary.prefix"][0] + ":", prefix + ":");
                    callback(result);
                  }));
                }));

                closeFn();
              }
            }
          }
          },
          {
            view: "button", value: "Cancel", on: {
            onItemClick: function () {
              closeFn();
            }
          }
          }
        ]
        }
      ]
    }
  };

  var getDownloadFileFromURIPanel = function (callback, closeFn) {
    function load() {
      callback($$(ids.downloadFileFromURI.URI).getValue());
      closeFn();
    }

    return {
      type: "line",
      id: ids.downloadFileFromURI.ID,
      view: "form",
      elements: [
        {
          view: "text", id: ids.downloadFileFromURI.URI, value: '', label: "URI",
          on: {
            onKeyPress: function (code, e) {
              if (code == 13) {
                load();
              }
            }
          }
        },
        {
          margin: 5,
          cols: [
            {
              view: "button", value: "Open", type: "form", on: {
              onItemClick: function () {
                load();
              }
            }
            },
            {
              view: "button", value: "Cancel", type: "form", on: {
              onItemClick: function () {
                closeFn();
              }
            }
            }
          ]
        }
      ]
    }
  };

  var getSetBaseURIPanel = function (closeFn, callback) {

    return {
      id: ids.setbaseURI.ID,
      view: "form",
      elements: [{view: "label", label: "Do you want to set the base URI?"},
        {id: ids.setbaseURI.ASKAGAIN, view: "checkbox", labelRight: "Do not ask again.", value: 0, labelWidth: 0},
        {
          margin: 5, cols: [
          {
            view: "button", value: "Yes", type: "form", on: {
            onItemClick: function () {
              var askAgain = $$(ids.setbaseURI.ASKAGAIN).getValue();
              closeFn();
              callback(true, askAgain);
            }
          }
          },
          {
            view: "button", value: "No", type: "form", on: {
            onItemClick: function () {
              var askAgain = $$(ids.setbaseURI.ASKAGAIN).getValue();
              closeFn();
              callback(false, askAgain);
            }
          }
          }
        ]
        }
      ]
    }
  };

  var getCustomTreeDataPanel = function (data, closeFn, callback) {
    var functionOptions = [];
    var functions = functionsStore.getState().functions;

    for (var i = 0; i < functions.length; i++) {
      functionOptions.push({id: functions[i].id, value: functions[i].name});
    }

    function getDataTableConfig() {
      return {
        view: "datatable",
        id: 'customTreeData-datatable',
        editable: true,
        columns: [
          {
            id: "valueType",
            header: "Value Type",
            editor: 'combo',
            options: [{id: ValueTypes.REFERENCE, value: 'Data Extract'}, {
              id: ValueTypes.TEMPLATE,
              value: 'Template'
            }, {id: ValueTypes.CONSTANT, value: 'Constant'}],
            width: 100
          },
          {id: "theValue", header: "Value", editor: 'text', width: 150},
          {id: "parameter", header: "Parameter", editor: 'combo', width: 200},
          {id: "delete", header: "", width: 30, template: '<img src=\'./images/18/delete.png\'>'}
        ],
        on: {
          "onItemClick": function (id, e, trg) {
            console.log(id.column);
            if (id.column == 'delete') {
              $$('customTreeData-datatable').remove(id);
            }
            return false;
          }
        }
      };
    }

    var defaultDataTable = getDataTableConfig();

    if (data.function) {
      var fn = functionsStore.getFunctionByID(data.function);
      var comboOptions = [{id: -1, value: ''}];

      for (var j = 0; j < fn.parameters.length; j++) {
        comboOptions.push({id: j + 1, value: fn.parameters[j].label});
      }

      defaultDataTable.columns[2].options = comboOptions;
    } else {
      defaultDataTable.columns[2].options = [{id: -1, value: 'select a function'}];
    }

    defaultDataTable.data = data.values;

    return {
      type: 'line',
      rows: [
        {
          id: 'titleText',
          view: "text",
          value: data.value,
          label: "Title"
        },
        {
          view: "combo",
          label: 'Function',
          id: "functionCombo",
          value: data.function,
          options: functionOptions,
          on: {
            onChange: function (newv, oldv) {
              console.log($$('customTreeData-datatable').serialize());
              var fn = functionsStore.getFunctionByID(newv);
              var comboOptions = [{id: -1, value: ''}];
              var currentData = $$('customTreeData-datatable').serialize();
              var newDataTable = getDataTableConfig();

              for (var k = 0; k < fn.parameters.length; k++) {
                comboOptions.push({id: k + 1, value: fn.parameters[k].label});
              }

              for (var l = 0; l < currentData.length; l++) {
                currentData[l].parameter = -1;
              }

              newDataTable.columns[2].options = comboOptions;
              newDataTable.data = currentData;

              webix.ui(newDataTable, $$('customTreeData-datatable'));
            }
          }
        },
        defaultDataTable,
        {
          cols: [
            {
              view: "button",
              id: "my_button220",
              value: "Add",
              type: "form",
              inputWidth: 100,
              on: {
                onItemClick: function () {
                  $$('customTreeData-datatable').add({valueType: ValueTypes.REFERENCE, theValue: "", parameter: -1})
                }
              }
            }
          ]
        },
        {
          cols: [
            {
              view: "button",
              id: "my_button222",
              value: "Save",
              type: "form",
              inputWidth: 100,
              on: {
                onItemClick: function () {
                  var item = {};

                  $.extend(item, data);
                  item.path = item.path.replace(new RegExp(item.value + '$'), $$('titleText').getValue());
                  item.value = $$('titleText').getValue();
                  item.values = $$('customTreeData-datatable').serialize();
                  item.function = $$('functionCombo').getValue();

                  callback(item);
                  closeFn();
                }
              }
            },
            {
              view: "button",
              id: "my_button223",
              value: "Cancel",
              type: "form",
              inputWidth: 100,
              on: {
                onItemClick: function () {
                  closeFn();
                }
              }
            }
          ]
        }
      ]
    };
  };

  var getNoButtonModal = function (text) {

    return {
      id: ids.mappingIsRunning.ID,
      type: "line",
      rows: [
        {
          view: "label",
          label: text
        }
      ]
    }
  };

  let getExample2RMLPanel = function (callback, closeFn) {
    let form1 = [
      {id: 'example2rml-textarea', view: "textarea", width: 650, height: 515, label: "RDF", labelPosition: "top"},
      {id: 'example2rml-iterator', view: "text", width: 650, label: "iterator", labelPosition: "left"},
      {
        view: "button", value: "Generate Mapping", width: 200, align: "left", on: {
        onItemClick: function () {
          let triplesText = $$('example2rml-textarea').getValue();
          let iterator = $$('example2rml-iterator').getValue();

          let parser = N3.Parser();
          let triples = [];
          parser.parse(triplesText, function(error, triple, prefixes){
            if (error) {
              console.log(error);
            } else if (triple) {
              triples.push(triple);
            } else {
              callback(triples, iterator);
              closeFn();
            }
          });
        }
      }
      }
    ];

    return {
      margin: 30, cols: [
        {
          margin: 30, rows: [
          {view: "form", scroll: false, height: 700, width: 700, elements: form1}
        ]
        }

      ]
    }

  };

  /**
   * Returns the webix configuration for a component listing all github repositories, allowing you to select one.
   * 
   * @param next Success function. This function gets called with the resulting selected repository (form {name, user}).
   * @param close Error/cancel function. This function gets called when the process is canceled.
   * @param data Array of {name, owner} pairs containing all repositories to be displayed.
   * @returns webix configuration
   */
  var getGithubRepoPanel = function (next, close, data) {

    const datatable =  {
      id: "github-repos",
      view: "datatable",
      columns: [
        {id:"name", "header":"Name", fillspace: 5},
        {id:"user", "header":"Owner", fillspace: 5}
      ],
      data: data,
      on: {
        onItemClick: function(id, e) {
          const {name, user} = this.getItem(id)
          const repository_data = {name, user}
          setTimeout(() => next(repository_data), 50);
          e.preventDefault();
          return false;
        }
      }
    }
    const unlink = () => {
      GithubAPI.unlink();
      close({reset: true});
    }

    const github_username = localStorage.getItem("gh-username")
    return {
      id: ids.github.ID,
      view: "form",
      elements: [
        {margin:5, cols: [{view: "label", label: "Pick a Github Repository"}]},
        datatable,
        {
          margin: 5, cols: [
            {view: "label", label: `Logged in as ${github_username}. <u>Use another account</u>`, css: "lines", on: {onItemClick: unlink}},
          {
            view: "button", value: "Cancel", type: "form", on: {
            onItemClick: close
            }
          },
        ]
        }
      ]
    }
  };

  /**
   * Class that manages the state of the File Panel. Also returns the webix configuration of the File Panel using get_form_config()
   * 
   * @param next Success function. Returns the selected repository_name, repository_owner, branch, file_path.
   * @param close Error/Cancel function. Gets called if the process of selecting a file path is interrupted.
   * @param repo_data The name and owner of the repository we are evaluating.
   * @param default_filename Optional. Default filename to add to the starting path.
   */
  class getGithubFilePanel { 
    
    static load_file_config = {
      allow_new: false
    }

    static save_file_config = {
      allow_new: true,
      select_amount: 1,
    }

    constructor(next, close, repo_data, config=getGithubFilePanel.load_file_config) {
      this.close = close;
      this.next = next;
      this.repo_data = repo_data;
      this.current_path = ""
      this.config = config;
      this.selected = [];
      this.virtual_paths = [];

      this.datatable_config =  {
        id: "github-content",
        view: "datatable",
        scheme: { $change: item => {if(this.selected.find(ai => ai.path === item.path) >= 0) item.$css = "selected"}},
        columns: [
          {id:"type", "header":"Type", width: 50, template: this.get_type_template},
          {id:"name", "header":"Name", fillspace: 5},
        ],
        data:[],
        on: {
          onItemClick: this.select()
        }
      }

      // initialize state
      this.update_by_path();
      this.get_branches();
    }

    // setter for changed path. Updates UI.
    update_path(path) {
      this.current_path = path
      if(this.virtual_paths.find(i => i.path === this.current_path)) {
        // If it's a virtual path, we're not adding any server data.
        this.update_datatable_content([]);
      } else {
        this.update_by_path();
      }
    }

    path_up() {
      const up_array = this.current_path.split("/").slice(0, -1)
      this.update_path(up_array.join("/"))
    }

    // Fetches the new directory contents from the API, and updates the UI.
    async update_by_path() {
      const data = await GithubAPI.getContents(this.repo_data.name, this.repo_data.user, this.get_current_selected_branch().name, this.current_path)
      this.update_datatable_content(data)
    }

    // Fetches available branches from the API, and fills them into the select UI.
    async get_branches() {
      const branches = await GithubAPI.getBranches(this.repo_data.name, this.repo_data.user);
      $$("github-select-branch").define("options", branches.map((branch, id) => ({value: branch.name, id})));
      $$("github-select-branch").refresh();
      this.branches = branches;
    }

    // Returns the currently selected branch. If none, returns master.
    get_current_selected_branch() {
      return $$("github-select-branch") && this.branches ? this.branches[$$("github-select-branch").getValue()]:{name: "master"}
    }

    // Utility function to help update UI.
    update_datatable_content(data) {
      $$("github-file-path").setValue(this.get_path_displaystring())

      const dataview = $$("github-content")
      dataview.clearAll();
      data.forEach(input => dataview.add(input))
      this.add_virtual_paths_to_datatable();
      this.highlight_selected();
    }

    add_virtual_paths_to_datatable() {
      const dataview = $$("github-content")

      // Add every path in virtual_paths that is in this current directory.
      this.virtual_paths.filter(item => _.isEqual(item.path.split("/").slice(0,-1).join("/"), this.current_path)).forEach(input => dataview.add(input))
    }

    // Called when a cell has been clicked.
    // If the cell is a file, we select the file (by calling this.next())
    // If the cell is a directory, open and load the directory.
    select() {
      const filePanel = this
      return function(cell) {
        const item = this.getItem(cell)
        if(item.type == "dir") {
          filePanel.update_path(`${item.path}`)
        } else {

          const selection = {path: item.path, ...filePanel.repo_data, branch: filePanel.get_current_selected_branch().name}
          // If the item is selected, remove it from selection. If it is not, select it.
          const index = filePanel.selected.findIndex(v => _.isEqual(v, selection))
          if(index === -1) {
            filePanel.selected.push(selection)
          } else {
            filePanel.selected.splice(index, 1)
          }
        }

        if(filePanel.config.select_amount && -filePanel.config.select_amount < 0) {
          // Clipping the select amount appropriately.
          filePanel.selected = filePanel.selected.slice(-filePanel.config.select_amount);
        }

        filePanel.highlight_selected();


        if(filePanel.selected.length > 0) {
          $$("github-file-confirm").enable()
        } else {
          $$("github-file-confirm").disable()
        }
      }
    }

    highlight_selected() {
      const datatable = $$("github-content")
      datatable.eachRow(row => {
        const item = datatable.getItem(row)
        if(this.selected.find(ai => item.path === ai.path)) {
          datatable.addRowCss(row, "selected");
        } else {
          datatable.removeRowCss(row, "selected");
        }
      })
    }

    // Transform the path to a more approachable form for display.
    get_path_displaystring() {
      return '/' + this.current_path
    }

    // Gets the correct folder/file template
    get_type_template(obj) {
      return obj.type == "dir" ?  "<img src='/images/folder.png'/>": "<img src='/images/file.png'/>"
    }

    // Returns the webix config.
    get_form_config() {
      const menuFunction = (id) => {
        if(id === "github-filepicker-menu-up") {
          this.path_up()

          // else: new folder or file.
        } else if(id == "github-filepicker-menu-new-folder" || id == "github-filepicker-menu-new-file") {
          const type = (id === "github-filepicker-menu-new-folder") ? "dir":"file"
          const next = (filename) => {
            const path = this.current_path ? `${this.current_path}/${filename.name}`:filename.name
            if(filename.name.length < 1) {
              return;
            }
            this.virtual_paths.push({type, name: filename.name, path: path});
            this.add_virtual_paths_to_datatable();
          }
          // We need a timeout for some reason...
          setTimeout(() => webix.ui(getFileNamePickerPanel(next, ()=>{}, type =='file' ? (this.config.default_filename || ""):"")).show(), 10);
        }
      }


      const submenu_path = {id: "github-filepicker-menu", view:"menu", on: {onMenuItemClick: menuFunction}, data: [
        {id: "github-filepicker-menu-up", value: "Up"}]
         , width: 110}

      if(this.config.allow_new) {
        submenu_path.data.push({id:"github-filepicker-menu-new", hidden: !this.config.allow_new, value: "New...", submenu: [{id: "github-filepicker-menu-new-folder", value: "Folder"}, {id: "github-filepicker-menu-new-file", value: "File"}]})
      }

      const back = () => this.close({back: true})
    
      return {
      id: ids.github.ID,
      view: "form",
      elements: [
        {margin:5, cols: [{view: "label", label: `Repository: ${this.repo_data.name} <u>(back)</u>`, css: {cursor: "pointer"}, on: {onItemClick: back}}, 
                            {id: "github-select-branch", view: "select", label:"branch", value:1, options: [{id: 0, value: "master"}], on: {onChange: () => this.update_by_path()}}]},
        {margin: 5, cols: [
          {id: "github-file-path", view:"text", value: this.get_path_displaystring(), label:"Path", inputAlign:"left", labelAlign:"left", attributes:{"readonly":true}},
          submenu_path
        ]},
        this.datatable_config,
        {
          margin: 5, cols: [
          {
            view: "button", value: "Cancel", type: "form", on: {
            onItemClick: () => this.close()
            }
          },
          {
            view: "button", id: "github-file-confirm", value: this.config.select_amount == 1? "Use selected file":"Use selected file(s)", type: "form", disabled: true,
            on: {
              onItemClick: () => this.next(this.selected),
            }
          },
        ]
        }
      ]
    }
  }
}

/**
 * Class for managing the state of the authentication panel.
 * 
 * @param next Success function. Gets called when authentication successfully completes. Contains list of repositories of the authenticated user.
 * @param close Error/cancel function. Gets called when authentication is interrupted. No assumptions of authentication/non-authentication can be made after.
 */
class getGithubAuthenticationPanel {
  constructor(next, close) {
    this.next = next;
    this.close = close;
    this.check_if_authenticated();
  }

  // Performs repository call to the API. If it is not rejected, assume authenticated.
  async check_if_authenticated() {
      try {
        const data = await GithubAPI.getRepos();
        this.next(data);
      } catch(e) {
        if(e.status && e.status === 401) {
          this.set_unauthenticated();
        } else {
          CommandInvoker.getInvoker().execute(new HandleServerErrorCommand(e))
          this.close();
        }
      }
  }

  // Update UI to reflect we are not authenticated. Displays 'Authenticate' button.
  set_unauthenticated() {
    $$("github-auth-label").hide();
    $$("github-auth-button").show();
    this.set_auth_check();
  }

  async check_if_auth_happened() {
    const code = localStorage.getItem("gh-authcode");
    console.log(code)
    if(!code) {
      this.set_unauthenticated();
      return;
    }
    // Empty the code for next time.
    localStorage.setItem("gh-authcode", "");
    await GithubAPI.authenticate(code);

    this.cleanup();
    const data = await GithubAPI.getRepos();
    this.next(data);
  }

  // Sets the polling interval to see if the authentication process has been completed.
  set_auth_check() {
    if(!this.interval){
      this.interval = setInterval(() => this.check_if_auth_happened(), 500);
    }
  }

  // Opens a new tab which redirects to Github for authentication. Gets automatically closed after authentication process is done.
  openAuthWindow() {
    this.window = window.open(GithubAPI.getGithubAuthLink());
  }

  // Cancels the authentication action
  cancel() {
    this.close();
    this.cleanup();
  }
  //Cleans up dependents
  cleanup() {
    if(this.window && !this.window.closed)
      this.window.close()
    if(this.interval)
      clearInterval(this.interval)
  }

  // Returns the Webix config.
  get_form_config() {
    return {
      id: "github-auth",
      view: "form",
      elements: [
        {view: "label", label: "Authenticate to github"},
        {id: "github-auth-label", view: "label", label: "Checking if authenticated, please wait..."},
        {margin: 5, cols: [
          {id: "github-auth-button", view: "button", value: "Authenticate", hidden: true, on: {onItemClick: () => this.openAuthWindow()}},
          {
            view: "button", value: "Cancel", type: "form", on: {
            onItemClick: () => this.cancel()
            }
          },
        ]}
      ]
    }
  }
}

/**
 * Command to handle server errors and display them well.
 * @param {*} error The error object from the server
 */
const HandleServerErrorCommand = function(error) {
  this.execute = function() {
    if(!error.status) {
      CommandInvoker.getInvoker().execute(new ShowErrorMessageCommand("Unreachable", "The server is unreachable. Is your network active?"))
    } else if (error.status == 500){
      CommandInvoker.getInvoker().execute(new ShowErrorMessageCommand("Internal server error", "The server responded with internal error. Please retry."))
    } else {
      CommandInvoker.getInvoker().execute(new ShowErrorMessageCommand("Client error", "Something went wrong. Please retry."))
    }
  }
}

const getFileNamePickerPanel = function(next, close, default_filename="") {

  const close_button = () => {
    close();
    $$("github-filenamepicker").close();
  }

  const next_button = () => {
    const path = $$("github-filenamepicker-text").getValue();
    const path_error = Util.validatePath(path);
    if(path_error) {
      $$("github-filenamepicker-error").setValue(path_error);
      $$("github-filenamepicker-error").show()
      return;
    }
    next({name: path})
    close_button();
  }

  const config = {
    view:"popup",
    id:"github-filenamepicker",
    height: 250,
    width: 500,
    minWidth: 450,
    position: "center",
    head: "My Window",
    modal: true,
    body: {
      view: "form",
      elements: [{view: "label", label:"Pick a filename"},
      {id: "github-filenamepicker-text", view: "text", value: default_filename},
      {id: "github-filenamepicker-error", view: "label", label:"Pick a filename", css: {color: "red"}, hidden: true},
      {margin: 5, cols: [{view: "button", label: "Cancel", on: {onItemClick: close_button}}, {id: "github-filenamepicker-save", view: "button", label: "Save", on: {onItemClick: next_button}}]}
    ]
    }
  }
  return config
}

  return {
    ids: ids,
    showCloseSourceDialog: showCloseSourceDialog,
    showFixForRunningDialog: showFixForRunningDialog,
    showBeforeRunMappingDialog: showBeforeRunMappingDialog,
    getDefineSourcesPathsPanel: getDefineSourcesPathsPanel,
    getConnectSourcesPanel: getConnectSourcesPanel,
    getNamespacesPanel: getNamespacesPanel,
    getAutoSavesPanel: getAutoSavesPanel,
    getLOVPanel: getLOVPanel,
    getDownloadFileFromURIPanel: getDownloadFileFromURIPanel,
    getSetBaseURIPanel: getSetBaseURIPanel,
    getGithubRepoPanel: getGithubRepoPanel,
    getGithubFilePanel: getGithubFilePanel,
    getGithubAuthenticationPanel: getGithubAuthenticationPanel,
    getNoButtonModal: getNoButtonModal,
    getCustomTreeDataPanel: getCustomTreeDataPanel,
    getExample2RMLPanel: getExample2RMLPanel
  };

})();