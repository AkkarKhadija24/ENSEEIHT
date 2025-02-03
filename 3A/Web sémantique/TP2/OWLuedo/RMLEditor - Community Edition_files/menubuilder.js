/**
 * Created by Pieter Heyvaert, Data Science Lab (Ghent University - iMinds) on 26.01.16.
 */

var MenuBuilder = (function () {

  var ids = {
    ID: "menu",
    toggle: {
      INPUT_PANEL: "menu-toggle_input_panel",
      RESULTS_PANEL: "menu-toggle_results_panel",
      ERROR_PANEL: "menu-toggle_error_panel",
      RESOLUTION_PANEL: "menu-toggle_resolution_panel",
      MODELING_PANEL: "menu-toggle_modeling_panel"
    },
    open: {
      ID: "menu-open",
      MAPPING: "menu-open-mapping",
      MAPPING_PC: "menu-open-pc-mapping",
      GITHUB_MAPPING: "menu-open-github-mapping",
      GRAPH: "menu-open-graph",
      GITHUB_GRAPH: "menu-open-github-graph",
      DATA_SOURCE: "menu-open-data-source",
      GITHUB: "menu-open-github",
      GITHUB_DATA: "menu-open-github-data",
      FILE: "menu-open-file",
      URI: "menu-open-uri"
    },
    export: {
      ID: "menu-export",
      GRAPHML: "menu-export-graphml",
      GITHUB_GRAPHML: "menu-export-github-graphml",
      RML: "menu-export-rml",
      GITHUB_RML: "menu-export-github-rml",
      RESULTS: "menu-export-results",
      TURTLE: "menu-export-results-turtle",
      NQUADS: "menu-export-results-nquads",
      TRIG:"menu-export-results-trig",
      JSONLD: "menu-export-results-jsonld",
      HDT: "menu-export-results-hdt",
      TRIX: "menu-export-results-trix",
      GITHUB_TURTLE: "menu-export-github-results-turtle",
      GITHUB_NQUADS: "menu-export-github-results-nquads",
      GITHUB_TRIG:"menu-export-github-results-trig",
      GITHUB_JSONLD: "menu-export-github-results-jsonld",
      GITHUB_HDT: "menu-export-github-results-hdt",
      GITHUB_TRIX: "menu-export-github-results-trix",
    },
    help: {
      CONTACT: "menu-contact",
      GITHUB: "menu-github"
    },
    SAVE: "menu-save",
    NEW: "menu-new",
    SAVE_AS: "menu-save_as",
    PREFERENCES: "menu-preferences",
    QUIT: "menu-quit",
    UNDO: "menu-undo",
    REDO: "menu-redo",
    RUN: "menu-run",
    VALIDATE: "menu-validate",
    NAMESPACES: "menu-namespaces",
    EXAMPLE2RML: "menu-example2rml",
    ONTOLOGY2RML: "menu-ontology2rml",
    DOCUMENTATION: "menu-documentation",
    ABOUT: "menu-about",
    GRAPHML: "menu-graphml",
    NEW_RESOURCE_NODE: "menu-new_resource_node",
    NEW_LITERAL_NODE: "menu-new_literal_node",
    DELETE_ALL: "menu-delete_all",
    AUTOSAVED_MAPPINGS: "menu-autosaved-mappings",
    TRIGGER_AUTOSAVE: "meny-trigger-autosave",
  };

  function getMappingSubMenu() {
    const submenu = [
      {id: ids.RUN, value: "Run"}
    ];

    if (APPLICATION_CONFIG.enableValidation) {
      submenu.push({id: ids.VALIDATE, value: "Validate"});
    }

    submenu.push({id: ids.NAMESPACES, value: "Namespaces..."});

    if (APPLICATION_CONFIG.enableExampleDriven) {
      submenu.push({id: ids.EXAMPLE2RML, value: "Generate from example..."});
    }

    submenu.push({id: ids.ONTOLOGY2RML, value: "Generate from ontology..."});

    return submenu;
  }

  function getViewSubMenu() {
    const menu = [
      {id: ids.toggle.INPUT_PANEL, value: "Show Input"},
      {id: ids.toggle.MODELING_PANEL, value: "Hide Model"},
      {id: ids.toggle.RESULTS_PANEL, value: "Show Results"}
    ];

    if (APPLICATION_CONFIG.enableValidation) {
      menu.splice(1, 0, {id: ids.toggle.ERROR_PANEL, value: "Show Violations"});
      menu.splice(2, 0, {id: ids.toggle.RESOLUTION_PANEL, value: "Show Resolutions"});
    }

    return menu;
  }

  var getMenuBar = function () {
    const openDatasource = [{id: ids.open.FILE, value: "Computer..."}, {id: ids.open.URI, value: "URI"}]
    const openMapping = [{id: ids.open.MAPPING_PC, value: "Computer..."}]
    const openGraph = [{id: ids.open.GRAPH, value: "Computer..."}]
    const exportMapping = [{id: ids.export.RML, value: "Computer"}]
    const exportGraph = [{id: ids.export.GRAPHML, value: "Computer"}]
    const exportResults = [{id: ids.export.RESULTS, value: "Computer", submenu: [
      {id: ids.export.TURTLE, value: "Turtle"},
      {id: ids.export.NQUADS, value: "NQuads"},
      {id: ids.export.TRIG, value: "TriG"},
      {id: ids.export.JSONLD, value: "jsonLD"},
      {id: ids.export.HDT, value: "hdt"},
      {id: ids.export.TRIX, value: "TriX"}
    ]}]

    if(Util.githubActive()) {
      openDatasource.push({id: ids.open.GITHUB_DATA, value: "Github..."})
      openMapping.push({id: ids.open.GITHUB_MAPPING, value: "Github..."})
      openGraph.push({id: ids.open.GITHUB_GRAPH, value: "Github..."})
      exportMapping.push({id: ids.export.GITHUB_RML, value: "Github..."})
      exportGraph.push({id: ids.export.GITHUB_GRAPHML, value: "Github..."})
      exportResults.push({id: ids.export.GITHUB_GRAPHML, value: "Github", submenu: [
        {id: ids.export.GITHUB_TURTLE, value: "Turtle..."},
        {id: ids.export.GITHUB_NQUADS, value: "NQuads..."},
        {id: ids.export.GITHUB_TRIG, value: "TriG..."},
        {id: ids.export.GITHUB_JSONLD, value: "jsonLD..."},
        {id: ids.export.GITHUB_HDT, value: "hdt..."},
        {id: ids.export.GITHUB_TRIX, value: "TriX..."}
      ]})
    } 


    return {
      view: "menu",
      id: ids.ID,
      subMenuPos: "bottom",
      layout: "x",
      align: 'left',
      autowidth: true,
      data: [ //menu data
        {
          value: "File", submenu: [
          {id: ids.NEW, value: "New"},
          {
            id: ids.open.ID, value: "Open", submenu: [
            {id: ids.open.DATA_SOURCE, value: "Data Source", submenu: openDatasource},
            {id: ids.open.MAPPING, value: "Mapping", submenu: openMapping},
            {value: "Graph", submenu: openGraph},
          ]
          },
          {
            id: ids.export.ID, value: "Export", submenu: [
              {id: ids.export.RML, value: "Mapping", submenu: exportMapping},
              {id: ids.export.GRAPHML, value: "Graph", submenu: exportGraph},
              {id: ids.export.RESULTS, value: "Results", submenu: exportResults }
          ]
          },
        ]
        },
        {
          value: "Edit", submenu: [
          {id: ids.NEW_RESOURCE_NODE, value: "New Entity"},
          {id: ids.NEW_LITERAL_NODE, value: "New Attribute"},
          {$template: "Separator"},
          {id: ids.DELETE_ALL, value: "Delete All"},
          {$template: "Separator"},
          {id: ids.AUTOSAVED_MAPPINGS, value: "Auto Saves..."},
          {id: ids.TRIGGER_AUTOSAVE, value: "Save"}
        ]
        },
        {
          value: "Mapping", submenu: getMappingSubMenu()
        },
        {
          value: "View", submenu: getViewSubMenu()
        },
        {
          value: "Help", submenu: [
          //{id:ids.menu.DOCUMENTATION, value: "Documentation"},
          {id: ids.help.CONTACT, value: "Contact (email)"},
          {id: ids.help.GITHUB, value: "Github"}
        ]
        }
      ],
      submenuConfig: {
        //subsign:true
        width: 130
      },
      on: {
        onMenuItemClick: function (id) {
          switch (id) {

          case ids.toggle.INPUT_PANEL:
            if (this.getMenuItem(id).value.lastIndexOf("Hide", 0) === 0) {
              CommandInvoker.getInvoker().execute(new HideInputPanelCommand());
            } else {
              CommandInvoker.getInvoker().execute(new ShowInputPanelCommand());
            }
            break;

          case ids.toggle.RESULTS_PANEL:
            if (this.getMenuItem(id).value.lastIndexOf("Hide", 0) === 0) {
              CommandInvoker.getInvoker().execute(new HideResultsPanelCommand());
            } else {
              CommandInvoker.getInvoker().execute(new ShowResultsPanelCommand());
            }
            break;
          // Hides or shows the errorpanel, depending on the value of the menuitem
          case ids.toggle.ERROR_PANEL:
            if (this.getMenuItem(id).value.lastIndexOf("Hide", 0) === 0) {
              CommandInvoker.getInvoker().execute(new HideErrorPanelCommand());
            } else {
              CommandInvoker.getInvoker().execute(new ShowErrorPanelCommand());
            }
          break;

          case ids.toggle.RESOLUTION_PANEL:
            if (this.getMenuItem(id).value.lastIndexOf("Hide", 0) === 0) {
              CommandInvoker.getInvoker().execute(new HideResolutionPanelCommand());
            } else {
              CommandInvoker.getInvoker().execute(new ShowResolutionPanelCommand());
            }
            break;

          case ids.toggle.MODELING_PANEL:
            if (this.getMenuItem(id).value.lastIndexOf("Hide", 0) === 0) {
              CommandInvoker.getInvoker().execute(new HideModelingPanelCommand());
            } else {
              CommandInvoker.getInvoker().execute(new ShowModelingPanelCommand());
            }
          break;

          case ids.NAMESPACES:
            CommandInvoker.getInvoker().execute(new ShowNamespacesPanelCommand());
          break;

          case ids.GRAPHML:
            CommandInvoker.getInvoker().execute(new ConvertGraphToGraphMLCommand(GraphModel.getModel().getGraph()));
            break;

          case ids.NEW_RESOURCE_NODE:
            CommandInvoker.getInvoker().execute(new AddNewResourceNodeCommand());
            break;

          case ids.NEW_LITERAL_NODE:
            CommandInvoker.getInvoker().execute(new AddNewLiteralNodeCommand());
            break;

          case ids.RUN:
            CommandInvoker.getInvoker().execute(new RunMappingCommand());
            break;

            case ids.VALIDATE:
              CommandInvoker.getInvoker().execute(new ValidateMappingCommand());
              break;

            case ids.open.GRAPH:
              CommandInvoker.getInvoker().execute(new LoadGraphMLDocCommand());
              break;

            case ids.open.GITHUB_GRAPH:
              CommandInvoker.getInvoker().execute(new LoadGraphMLDocFromGithubCommand());
              break;

            case ids.open.FILE:
              CommandInvoker.getInvoker().execute(new LoadFileCommand());
              break;
            case ids.open.GITHUB_DATA:
              CommandInvoker.getInvoker().execute(new LoadFileFromGithubCommand());
              break;

            case ids.open.MAPPING_PC:
              CommandInvoker.getInvoker().execute(new LoadRMLCommand());
              break;

            case ids.open.GITHUB_MAPPING:
              CommandInvoker.getInvoker().execute(new LoadRMLFromGithubCommand());
              break;

            case ids.export.GRAPHML:
              CommandInvoker.getInvoker().execute(new SaveGraphMLDocCommand());
              break;

            case ids.export.GITHUB_GRAPHML:
              CommandInvoker.getInvoker().execute(new SaveGraphMLDocToGithubCommand());
              break;

            case ids.export.RML:
              CommandInvoker.getInvoker().execute(new SaveRMLDocCommand());
              break;

            case ids.export.GITHUB_RML:
              CommandInvoker.getInvoker().execute(new SaveRMLDocCommand(toGithub));
              break;

            case ids.export.TURTLE:
              CommandInvoker.getInvoker().execute(new SaveOriginalResultsCommand(serialization='turtle', extension="ttl"));
              break;
            case ids.export.NQUADS:
              CommandInvoker.getInvoker().execute(new SaveOriginalResultsCommand(serialization="nquads", extension="nq"));
              break;
            case ids.export.JSONLD:
              CommandInvoker.getInvoker().execute(new SaveOriginalResultsCommand(serialization="jsonld", extension="json"));
              break;
            case ids.export.HDT:
              CommandInvoker.getInvoker().execute(new SaveOriginalResultsCommand(serialization="hdt", extension="hdt"));
              break;
            case ids.export.TRIG:
              CommandInvoker.getInvoker().execute(new SaveOriginalResultsCommand(serialization="trig", extension="trig"));
              break;
            case ids.export.TRIX:
              CommandInvoker.getInvoker().execute(new SaveOriginalResultsCommand(serialization="trix", extension="xml"));
              break;

              case ids.export.GITHUB_TURTLE:
                CommandInvoker.getInvoker().execute(new SaveOriginalResultsToGithubCommand(serialization='turtle', extension="ttl"));
                break;
              case ids.export.GITHUB_NQUADS:
                CommandInvoker.getInvoker().execute(new SaveOriginalResultsToGithubCommand(serialization="nquads", extension="nq"));
                break;
              case ids.export.GITHUB_JSONLD:
                CommandInvoker.getInvoker().execute(new SaveOriginalResultsToGithubCommand(serialization="jsonld", extension="json"));
                break;
              case ids.export.GITHUB_HDT:
                CommandInvoker.getInvoker().execute(new SaveOriginalResultsToGithubCommand(serialization="hdt", extension="hdt"));
                break;
              case ids.export.GITHUB_TRIG:
                CommandInvoker.getInvoker().execute(new SaveOriginalResultsToGithubCommand(serialization="trig", extension="trig"));
                break;
              case ids.export.GITHUB_TRIX:
                CommandInvoker.getInvoker().execute(new SaveOriginalResultsToGithubCommand(serialization="trix", extension="xml"));
                break;
            case ids.DELETE_ALL:
              CommandInvoker.getInvoker().execute(new ClearGraphCommand());
              break;

            case ids.AUTOSAVED_MAPPINGS:
              let callback = function (autoSave) {
                CommandInvoker.getInvoker().execute(new RestoreAutoSaveCommand(autoSave))
              };

              CommandInvoker.getInvoker().execute(new ShowAutoSavesPanelCommand(callback));
              break;

            case ids.TRIGGER_AUTOSAVE:
              CommandInvoker.getInvoker().execute(new AutoSaveCommand());
              break;

            case ids.help.CONTACT:
              CommandInvoker.getInvoker().execute(new SendContactMailCommand());
              break;

            case ids.help.GITHUB:
              CommandInvoker.getInvoker().execute(new OpenGithubCommand());
              break;

            case ids.ONTOLOGY2RML:
              CommandInvoker.getInvoker().execute(new LoadOntologyCommand(ontologyStore => {
                CommandInvoker.getInvoker().execute(new GenerateRMLFromOntology(ontologyStore, rmlQuads => {
                  const store = N3.Store();
                  store.addQuads(rmlQuads);
                  CommandInvoker.getInvoker().execute(new LoadRMLWithoutGraphMLCommand(store));
                }));
              }));
              break;

            case ids.EXAMPLE2RML:
              CommandInvoker.getInvoker().execute(new showExample2RMLCommand(function(triples, iterator){
                CommandInvoker.getInvoker().execute(new Example2RMLCommand(triples, iterator, function(graphml, mappingSources, error){
                  if (error) {
                    //console.log('We didn\'t update the mapping because of an error.');
                    CommandInvoker.getInvoker().execute(new ShowErrorMessageCommand(error.name, error.message));
                  } else {
                    new GraphMLReader().read(graphml, mappingSources);
                  }
                }));
              }));
              break;

            case ids.open.URI:
              let callback2 = function (uri) {
                CommandInvoker.getInvoker().execute(new LoadCSVURICommand(uri));
              };

              CommandInvoker.getInvoker().execute(new ShowDownloadFromURIPanelCommand(callback2));
              break;
          }
        }
      }
    }
  };

  return {
    ids: ids,
    getMenuBar: getMenuBar
  };

})();
