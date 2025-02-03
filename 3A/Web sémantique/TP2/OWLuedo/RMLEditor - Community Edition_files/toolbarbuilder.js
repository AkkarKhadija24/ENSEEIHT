/**
 * Created by Pieter Heyvaert, Data Science Lab (Ghent University - iMinds) on 26.01.16.
 */

var ToolbarBuilder = (function () {

  var ids = {
    ID: "myToolbar",
    toggle: {
      INPUT_PANEL: "toolbar-toggle_input_panel",
      RESULTS_PANEL: "toolbar-toogle_results_panel",
      ERROR_PANEL: "toolbar-toggle_error_panel",
      RESOLUTION_PANEL: "toolbar-toggle_resolution_panel",
      MODELING_PANEL: "toolbar-toggle_modeling_panel",
      MODELING_PRESET: "toolbar-toggle_modeling_preset",
      RESOLVING_PRESET: "toolbar-toggle_resolving_preset",
      UNDO: "toolbar-toggle_undo"
    },
  };

  var getToolbar = function () {
    var toolbar = {
      view: "toolbar",
      id: ids.ID,
    };

    let communityEditionHtml = '<span class="subtitle">Community Edition</span>';
    let limitStrings = [];
    if (APPLICATION_CONFIG.nodeLimit !== undefined)
      limitStrings.push(' max ' + APPLICATION_CONFIG.nodeLimit + ' nodes');
    if (APPLICATION_CONFIG.fileSizeLimit !== undefined)
      limitStrings.push(' max ' + APPLICATION_CONFIG.fileSizeLimit + ' files' );
    let toolTip = '<span class="tooltip">Community edition limits:' + limitStrings.join(',') + '</span>';
    toolbar.elements = [{
        cols: [
             MenuBuilder.getMenuBar(),
          {
            view: "template",
            template: '<img src="./images/rml.png" /><span class="title">EDITOR</span>'
                + (APPLICATION_CONFIG.communityEdition ? communityEditionHtml : '')
                + (APPLICATION_CONFIG.communityEdition && (APPLICATION_CONFIG.fileSizeLimit !== undefined || APPLICATION_CONFIG.nodeLimit !== undefined) ? toolTip : ''),
            css: "rmlLogo",
            align: "center",
            autowidth: true
          },
          {
            view: "button",
            id: ids.toggle.UNDO,
            tooltip: "Undo automatic resolve not available",
            hidden: !APPLICATION_CONFIG.enableValidation,
            value: "input",
            type: "image",
            image: "./images/18/undo_off.png",
            width: 36,
            align: "right",
            on: {
              onItemClick: function (id, e, node) {
                if ($$(id).config.tooltip === "Undo automatic resolve") {
                  CommandInvoker.getInvoker().undo(new ResolveViolationCommand(null, null));
                }
              }
            }
          },
          {
            width: 30
          },
            { view:"button",
              value:"Modeling",
              hidden: !APPLICATION_CONFIG.enableValidation,
              autowidth: true,
              align: "right",
              on: {
                onItemClick: function (id, e, node) {
                  CommandInvoker.getInvoker().execute(new ShowModelingPreset());
                }
              }
            },
          { view:"button",
            value:"Resolving",
            hidden: !APPLICATION_CONFIG.enableValidation,
            autowidth: true,
            align: "right",
            on: {
              onItemClick: function (id, e, node) {
                CommandInvoker.getInvoker().execute(new ShowResolvingPreset());
              }
            }
          },
            {
              width: 30
            },
            {
                view: "button",
                id: ids.toggle.INPUT_PANEL,
                tooltip: "Show input",
                value: "input",
                type: "image",
                image: "./images/18/source_off.png",
                width: 36,
                align: "right",
                on: {
                    onItemClick: function (id, e, node) {
                    if ($$(id).config.tooltip === "Hide input") {
                        CommandInvoker.getInvoker().execute(new HideInputPanelCommand());
                    } else {
                        CommandInvoker.getInvoker().execute(new ShowInputPanelCommand());
                    }
                    }
                }
          }, {
            view: "button",
            id: ids.toggle.ERROR_PANEL,
            value: "errors",
            tooltip: "Show violations",
            hidden: !APPLICATION_CONFIG.enableValidation,
            type: "image",
            image: "./images/18/error_off.png",
            width: 36,
            align: "right",
            on: {
              onItemClick: function (id, e, node) {
                if ($$(id).config.tooltip === "Hide violations") {
                  CommandInvoker.getInvoker().execute(new HideErrorPanelCommand());
                } else {
                  CommandInvoker.getInvoker().execute(new ShowErrorPanelCommand());
                }
              }
            }
          },
          {
            view: "button",
            id: ids.toggle.RESOLUTION_PANEL,
            value: "resolutions",
            tooltip: "Show resolutions",
            hidden: !APPLICATION_CONFIG.enableValidation,
            type: "image",
            image: "./images/18/resolution_off.png",
            width: 36,
            align: "right",
            on: {
              onItemClick: function (id, e, node) {
                if ($$(id).config.tooltip === "Hide resolutions") {
                  CommandInvoker.getInvoker().execute(new HideResolutionPanelCommand());
                } else {
                  CommandInvoker.getInvoker().execute(new ShowResolutionPanelCommand());
                }
              }
            }
          },
          {
            view: "button",
            id: ids.toggle.MODELING_PANEL,
            value: "model",
            tooltip: "Hide model",
            type: "image",
            image: "./images/18/link.png",
            width: 36,
            align: "right",
            on: {
              onItemClick: function (id, e, node) {
                if ($$(id).config.tooltip === "Hide model") {
                  CommandInvoker.getInvoker().execute(new HideModelingPanelCommand());
                } else {
                  CommandInvoker.getInvoker().execute(new ShowModelingPanelCommand());
                }
              }
            }
          },
          {
            view: "button",
            id: ids.toggle.RESULTS_PANEL,
            value: "results",
            tooltip: "Show results",
            type: "image",
            image: "./images/18/results_off.png",
            width: 36,
            align: "right",
            on: {
              onItemClick: function (id, e, node) {
                if ($$(id).config.tooltip === "Hide results") {
                  CommandInvoker.getInvoker().execute(new HideResultsPanelCommand());
                } else {
                  CommandInvoker.getInvoker().execute(new ShowResultsPanelCommand());
                }
              }
            }
          },
          {
            width: 30
          },
          {
            view: "button",
            value: "Validate Mapping",
            tooltip: "Validate Mapping",
            hidden: !APPLICATION_CONFIG.enableValidation,
            type: "image",
            image: "./images/18/check.png",
            width: 36,
            align: "right",
            popup: ResultsBuilder.ids.WINDOW,
            on: {
              onItemClick: function (id, e, node) {
                CommandInvoker.getInvoker().execute(new ValidateMappingCommand());
              }
            }
          }, {
            view: "button",
            value: "Run Mapping",
            tooltip: "Run Mapping",
            type: "image",
            image: "./images/18/play.png",
            width: 36,
            align: "right",
            popup: ResultsBuilder.ids.WINDOW,
            on: {
              onItemClick: function (id, e, node) {
                CommandInvoker.getInvoker().execute(new RunMappingCommand());
              }
            }
          }
        ]
      }
    ];

    return toolbar;
  };

  return {
    ids: ids,
    getToolbar: getToolbar
  };

})();
