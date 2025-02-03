/**
 * Created by Pieter Heyvaert, Data Science Lab (Ghent University - iMinds) on 27.01.16.
 */

const ShowInputPanelCommand = function () {

  this.execute = function () {
    if(inputStore.getState().sources.length > 0) {
      var toolbarInputPanelId = UIBuilder.ids.toolbar.toggle.INPUT_PANEL;
      var menuInputPanelId = UIBuilder.ids.menu.toggle.INPUT_PANEL;
      var m = $$(UIBuilder.ids.menu.ID).getMenu(menuInputPanelId);

      //hide panel
      $$(UIBuilder.ids.input.ID).show();
      //$$(UIBuilder.ids.resizer.INPUT).show();
      var resizer = $$(UIBuilder.ids.resizer.INPUT);
      resizer.show();

      // // Refresh datatables on show.
      // const sources = inputStore.getState().sources.filter(s => s.type === "csv");
      // sources.forEach(source => {
      //   const dataDisplay = source.getDataDisplay ? source.getDataDisplay():null;
      //   if(dataDisplay)
      //     dataDisplay.refreshColumns();
      // })

      //update toolbar
      $$(toolbarInputPanelId).define('tooltip', "Hide input");
      $$(toolbarInputPanelId).define('image', "./images/18/source.png");
      $$(toolbarInputPanelId).refresh();

      //update menu
      m.updateItem(menuInputPanelId, {id: menuInputPanelId, value: "Hide Input Panel"});
      m.refresh();

      //checkPresets();
    } else {
      console.warn("Trying to open the input panel, but no sources. Blocked.")
    }
  }
};

const HideInputPanelCommand = function () {

  this.execute = function () {
    var toolbarInputPanelId = UIBuilder.ids.toolbar.toggle.INPUT_PANEL;
    var menuInputPanelId = UIBuilder.ids.menu.toggle.INPUT_PANEL;
    var m = $$(UIBuilder.ids.menu.ID).getMenu(menuInputPanelId);

    //hide panel
    $$(UIBuilder.ids.input.ID).hide();
    //$$(UIBuilder.ids.resizer.INPUT).hide();
    var resizer = $$(UIBuilder.ids.resizer.INPUT);
    resizer.hide();

    //update toolbar
    $$(toolbarInputPanelId).define('tooltip', "Show input");
    $$(toolbarInputPanelId).define('image', "./images/18/source_off.png");
    $$(toolbarInputPanelId).refresh();

    //update menu
    m.updateItem(menuInputPanelId, {id: menuInputPanelId, value: "Show Input Panel"});
    m.refresh();

    //checkPresets();
  };
};

const ShowResultsPanelCommand = function () {

  this.execute = function () {
    var toolbarResultsPanelId = UIBuilder.ids.toolbar.toggle.RESULTS_PANEL;
    var menuResultsPanelId = UIBuilder.ids.menu.toggle.RESULTS_PANEL;
    var m = $$(UIBuilder.ids.menu.ID).getMenu(menuResultsPanelId);

    //hide panel
    //$$(UIBuilder.ids.results.ID).show();
    //$$(UIBuilder.ids.resizer.RESULTS).show();
    var datatable = $$(UIBuilder.ids.results.datatable.ID);
    datatable.show();
    var resultsResizer = $$(UIBuilder.ids.resizer.RESULTS);
    resultsResizer.show();

    //update toolbar
    $$(toolbarResultsPanelId).define('tooltip', "Hide results");
    $$(toolbarResultsPanelId).define('image', "./images/18/results.png");
    $$(toolbarResultsPanelId).refresh();

    //update menu
    m.updateItem(menuResultsPanelId, {id: menuResultsPanelId, value: "Hide Results Panel"});
    m.refresh();

    //checkPresets();
  };
};

const HideResultsPanelCommand = function () {

  this.execute = function () {
    var toolbarResultsPanelId = UIBuilder.ids.toolbar.toggle.RESULTS_PANEL;
    var menuResultsPanelId = UIBuilder.ids.menu.toggle.RESULTS_PANEL;
    var m = $$(UIBuilder.ids.menu.ID).getMenu(menuResultsPanelId);

    //hide panel
    //$$(UIBuilder.ids.results.ID).hide();
    var datatable = $$(UIBuilder.ids.results.datatable.ID);
    datatable.hide();
    //$$(UIBuilder.ids.resizer.RESULTS).hide();
    var resultsResizer = $$(UIBuilder.ids.resizer.RESULTS);
    resultsResizer.hide();

    //update toolbar
    $$(toolbarResultsPanelId).define('tooltip', "Show results");
    $$(toolbarResultsPanelId).define('image', "./images/18/results_off.png");
    $$(toolbarResultsPanelId).refresh();

    //update menu
    m.updateItem(menuResultsPanelId, {id: menuResultsPanelId, value: "Show Results Panel"});
    m.refresh();

    //checkPresets();
  };
};

const ShowExitDialogCommand = function () {

  this.execute = function () {
    webix.confirm({
      title: "Exit",
      ok: "Yes",
      cancel: "No",
      type: "confirm-error",
      text: "Are you sure you want to exit the RMLEditor?",
      callback: function (result) { //setting callback

      }
    });
  };
};

const ShowCloseSourceDialogCommand = function (sourceID) {

  this.execute = function () {
    CommandInvoker.getInvoker().execute(new CloseSourceCommand(sourceID));


    // This displays a warning before a source is closed instead.
    // UIBuilder.showCloseSourceDialog(function (result) {
    //   if (result) {
          // CommandInvoker.getInvoker().execute(new CloseSourceCommand(sourceID));
    //   }
    // });
  };
};

const ShowFixForRunningDialogCommand = function (callback) {

  this.execute = function () {
    UIBuilder.showFixForRunningDialog(callback);
  };
};

const ShowBeforeRunMappingDialogCommand = function (callback) {

  this.execute = function () {
    UIBuilder.showBeforeRunMappingDialog(callback);
  };
};

const ShowErrorsCommand = function (element) {

  this.execute = function () {
    webix.ui(ModelingBuilder.getErrorPanel(element.errors), /*$$(UIBuilder.ids.results.ID),*/ $$(UIBuilder.ids.modeling.details.ID));

    if (element.type == undefined) {
      var nodeX = (element.source.x + element.target.x) / 2,
        nodeY = (element.source.y + element.target.y) / 2;

      var x = $$(UIBuilder.ids.modeling.ID).$view.offsetLeft + nodeX,
        y = $$(UIBuilder.ids.modeling.ID).$view.offsetTop + nodeY;
      $$(ModelingBuilder.ids.details.ID).show({x: x, y: y + 70});
    } else {
      var x = $$(UIBuilder.ids.modeling.ID).$view.offsetLeft + element.x,
        y = $$(UIBuilder.ids.modeling.ID).$view.offsetTop + element.y;
      $$(ModelingBuilder.ids.details.ID).show({x: x, y: y + 90});
    }
  };
};

const ShowDetailsEdgeCommand = function (edge) {

  this.execute = function () {
    var panel = new EdgeDetailsPanel(edge, function () {
      $$(ModelingBuilder.ids.details.ID).hide()
    });
    webix.ui(panel.getWebixConfig(), /*$$(UIBuilder.ids.results.ID),*/ $$(UIBuilder.ids.modeling.details.ID));

    var nodeX = (edge.source?.x + edge.target?.x) / 2,
      nodeY =  (edge.source?.y + edge.target?.y) / 2;

    var x = edge.x || $$(UIBuilder.ids.modeling.ID).$view.offsetLeft + nodeX,
      y = edge.y || $$(UIBuilder.ids.modeling.ID).$view.offsetTop + nodeY;

    $$(ModelingBuilder.ids.details.ID).show({x: x, y: y + 70});
  };
};

const ShowDetailsNodeCommand = function (node) {

  this.execute = function () {
    var panel;

    if (node.type == "literal") {
      var result = visibleGraphStore.getEdgeWithNodeAsTarget(node.id);

      if (!result) {
        result = {
          edge: null,
          sourceNode: null
        }
      }

      panel = new LiteralNodeDetailsPanel(node, result.edge, result.sourceNode, function () {
        $$(ModelingBuilder.ids.details.ID).hide()
      });
      //webix.ui(UIBuilder.getNodeDetailsPanel(node, result.edge, result.sourceNode, function() {$$(ModelingBuilder.ids.details.ID).hide(); console.log('test')}), /*$$(UIBuilder.ids.results.ID), */$$(UIBuilder.ids.modeling.details.ID));

    } else if (node.type == "resource") {
      //webix.ui(UIBuilder.getNodeDetailsPanel(node, false, false, function() {$$(ModelingBuilder.ids.details.ID).hide()}), /*$$(UIBuilder.ids.results.ID),*/ $$(UIBuilder.ids.modeling.details.ID));
      panel = new ResourceNodeDetailsPanel(node, function () {
        $$(ModelingBuilder.ids.details.ID).hide()
      });
    } else {
      panel = new BlankNodeDetailsPanel(node, function () {
        $$(ModelingBuilder.ids.details.ID).hide()
      });
    }

    webix.ui(panel.getWebixConfig(), /*$$(UIBuilder.ids.results.ID),*/ $$(UIBuilder.ids.modeling.details.ID));

    var x = $$(UIBuilder.ids.modeling.ID).$view.offsetLeft + node.x,
      y = $$(UIBuilder.ids.modeling.ID).$view.offsetTop + node.y;

    //setTimeout(function(){
    $$(ModelingBuilder.ids.details.ID).show({x: x, y: y + 90});
    //}, 0);
  };
};

/**
 * This is the config for the double comment-description panel.
 * 
 * @param {*} save Function called on save
 * @param {*} close Function called on cancel
 * @param {*} comment Previous comment
 * @param {*} description Previous description
 */
const double_panel = (save, close, comment, description) => ({
  id: ModelingBuilder.ids.details.ID,
  view:"tabview",
  type: "clean",
  tabbar: {
    type: "clean"
  },
  cells: [
    attribute_panel(save, close, "Comment", "Add a comment to the term map.", comment),
    attribute_panel(save, close, "Description","Add a description for the used term.", description)
  ]
})

/**
 * This is the config for one tab of an attributes panel. 
 * This is a template for a generic textual attribute, and can be used for both descriptions and comments.
 * @param {*} save Function that gets called on save.
 * @param {*} close Function that gets called on cancel.
 * @param {*} tag Tag that's used for describing the attribute.
 * @param {*} previous Previous value of this attribute 
 */
const attribute_panel = (save, close, tag, label, previous) => ({
  view: 'form',
  id:  `panel-${tag.toLowerCase()}`,
  header: `${tag}`,
  elements: [{
    view:"label",
    label
  },
  {
    view:"textarea",
    label: `${tag}:`,
    height:200,
    labelPosition: "top",
    id:  `panel-comments-${tag.toLowerCase()}`,
    value: previous
  },
  {
    margin: 5,
    cols: [{
      id: `panel-comments-${tag.toLowerCase()}-save`,
      view: 'button',
      value: 'Save',
      type: 'form',
      on: {onItemClick : () => save()}
      },
      {
        id: `panel-comments-${tag.toLowerCase()}-cancel`,
        view: 'button',
        value: 'Cancel',
        type: 'form',
        on: {onItemClick : () => close()}
      }]
    }
  ]
});

/**
 * Command to show the comments panel for edges.
 * @param {*} edge The edge for which to show the panel
 */
const ShowCommentsEdgeCommand = function(edge){
  this.execute = function() {
    const close = () => $$(ModelingBuilder.ids.details.ID).hide();
    const save = () => {
      const comment_value = $$("panel-comments-comment").getValue();
      const description_value = $$("panel-comments-description").getValue();

      CommandInvoker.getInvoker().execute(new UpdateEdgeCommand(edge.id, {comment: comment_value, description: description_value}))
      close()
    }

    // We'll be reusing the details panel.
    webix.ui(double_panel(save, close, edge.comment, edge.description), $$(UIBuilder.ids.modeling.details.ID));
    const x = $$(UIBuilder.ids.modeling.ID).$view.offsetLeft + (edge.source.x + edge.target.x)/2,
      y = $$(UIBuilder.ids.modeling.ID).$view.offsetTop + (edge.source.y + edge.target.y)/2;

      $$(ModelingBuilder.ids.details.ID).show({x: x, y: y + 90});
    }
}

/**
 * Command to show the comments panel for nodes.
 * @param {*} node The node for which to show the panel
 */
const ShowCommentsNodeCommand = function(node) {
  this.execute = function() {
    const close = () => $$(ModelingBuilder.ids.details.ID).hide();
    const save = () => {
      const comment_value = $$("panel-comments-comment").getValue();
      const description_value = $$("panel-comments-description").getValue();
      CommandInvoker.getInvoker().execute(new UpdateNodeCommand(node.id, {comment: comment_value, description: description_value}))
      close()
    }

    // We'll be reusing the details panel.
    webix.ui(double_panel(save, close, node.comment, node.description), $$(UIBuilder.ids.modeling.details.ID));
    const x = $$(UIBuilder.ids.modeling.ID).$view.offsetLeft + node.x,
      y = $$(UIBuilder.ids.modeling.ID).$view.offsetTop + node.y;

      $$(ModelingBuilder.ids.details.ID).show({x: x, y: y + 90});
    }
}

const HideDetailsCommand = function () {

  this.execute = function () {
    //webix.ui(UIBuilder.getNodeDetailsPanel(undefined), /*$$(UIBuilder.ids.results.ID),*/ $$(UIBuilder.ids.modeling.details.ID));
  }
};

const ShowDefineSourcesPathPanelCommand = function (callback) {

  this.execute = function () {
    var closeFn = function () {
      $$("definesourcespath_popup").close();
    };

    var popup = webix.ui({
      id: "definesourcespath_popup",
      view: "popup",
      height: 425,
      width: 600,
      minWidth: 600,
      position: "center",
      head: "My Window",
      body: UIBuilder.getDefineSourcesPathsPanel(closeFn, callback),
      modal: true,
      on: {
        onKeyPress: function (code, e) {
          if (code === 27) {
            closeFn();
          }
        }
      }
    });

    //popup.show(); doesn't work. The code below does, but don't ask me why ...
    setTimeout(function () {
      popup.show()
    }, 0);
  };
};

const ShowNamespacesPanelCommand = function () {

  this.execute = function () {
    var closeFn = function () {
      $$("namespace_popup").close();
    };

    var popup = webix.ui({
      id: "namespace_popup",
      view: "popup",
      height: 425,
      width: 600,
      minWidth: 600,
      position: "center",
      head: "My Window",
      body: UIBuilder.getNamespacesPanel(closeFn),
      modal: true,
      on: {
        onKeyPress: function (code, e) {
          if (code === 27) {
            closeFn();
          }
        },
        onShow: function () {
          $$(UIBuilder.ids.dialog.namespaces.prefix).focus();
        }
      }
    });

    //popup.show(); doesn't work. The code below does, but don't ask me why ...
    setTimeout(function () {
      popup.show()
    }, 0);
  };
};

const ShowLOVPanelCommmand = function (callback, type) {
  this.callback = callback;
  this.type = type;

  this.execute = function () {
    var closeFn = function () {
      $$("another_damn_popup").close();
      popupShown = false;
    };

    var popup = webix.ui({
      id: "another_damn_popup",
      view: "popup",
      height: 425,
      width: 600,
      minWidth: 600,
      position: "center",
      body: UIBuilder.getLOVPanel(this.callback, closeFn, this.type),
      modal: true,
      on: {
        onKeyPress: function (code, e) {
          if (code === 27) {
            this.close();
          }
        },
        onShow: function () {
          $$(UIBuilder.ids.dialog.lov.SEARCH).focus();
        }
      }
    });

    //popup.show(); doesn't work. The code below does, but don't ask me why ...
    setTimeout(function () {
      popup.show();
      popupShown = true;
    }, 0);
  };
};

const ShowErrorMessageCommand = function (title, message) {

  this.execute = function () {
    webix.alert({
      title: title,
      ok: "OK",
      type: "alert-error",
      text: message
    });
  }
};

const ShowUpdateSourceOfTargetNodesDialogCommand = function (callback) {

  this.execute = function () {
    webix.modalbox({
      title: "Update Source?",
      buttons: ["Yes", "No"],
      width: 200,
      text: "The source of the literal(s) is not the same as the (new) source of the resource. Do you want to update the source of the literal(s)? Clicking \'No\' will leave the source of the resource unchanged.",
      callback: callback
    });
  };
};

const ShowDownloadFromURIPanelCommand = function (callback) {

  this.execute = function () {
    var closeFn = function () {
      $$("another_damn_popup").close();
      popupShown = false;
    };

    var popup = webix.ui({
      id: "another_damn_popup",
      view: "popup",
      height: 425,
      width: 600,
      minWidth: 600,
      position: "center",
      body: UIBuilder.getDownloadFileFromURIPanel(callback, closeFn),
      modal: true,
      on: {
        onKeyPress: function (code, e) {
          if (code === 27) {
            closeFn();
          }
        },
        onShow: function () {
          $$(UIBuilder.ids.dialog.downloadFileFromURI.URI).focus();
        }
      }
    });

    //popup.show(); doesn't work. The code below does, but don't ask me why ...
    setTimeout(function () {
      popup.show();
      popupShown = true;
    }, 0);
  };
};

const ShowUpdateSourceDialogCommand = function (callback) {

  this.execute = function () {
    webix.modalbox({
      title: "Update Source?",
      buttons: ["Resource", "Literal", "Cancel"],
      width: 350,
      text: "The source of the literal is not the same as the source of the resource. Do you want to update the source of the literal or the resource?",
      callback: callback
    });
  };
};

const ShowConnectSourcesPanelCommand = function (mappingSources, callback) {

  this.execute = function () {
    var closeFn = function () {
      $$("connectsources_popup").close();
    };

    var popup = webix.ui({
      id: "connectsources_popup",
      view: "popup",
      height: 425,
      width: 600,
      minWidth: 600,
      position: "center",
      head: "My Window",
      body: UIBuilder.getConnectSourcesPanel(mappingSources, closeFn, callback),
      modal: true,
      on: {
        onKeyPress: function (code, e) {
          if (code === 27) {
            closeFn();
          }
        }
      }
    });

    //popup.show(); doesn't work. The code below does, but don't ask me why ...
    setTimeout(function () {
      popup.show()
    }, 0);
  };
};

var LoadCSVFileCommand = function () {

  this.execute = function () {
    var fileSelector = $('<input type="file" multiple/>');

    fileSelector.on("change", function (evt) {
      var files = evt.target.files;

      for (var i = 0; i < files.length; i++) {
        CommandInvoker.getInvoker().execute(new LoadCSVDataCommand(files[i], files[i].name));
      }
    });

    fileSelector.click();
  };
};

var ShowAutoSavesPanelCommand = function (callback) {

  this.execute = function () {
    var closeFn = function () {
      $$("autosave_popup").close();
    };

    var latestSaves = AutoSaveModel.getModel().getLatestSaves(10);

    var popup = webix.ui({
      id: "autosave_popup",
      view: "popup",
      height: 425,
      width: 450,
      minWidth: 450,
      position: "center",
      head: "My Window",
      body: UIBuilder.getAutoSavesPanel(latestSaves, closeFn, callback),
      modal: true,
      on: {
        onKeyPress: function (code, e) {
          if (code === 27) {
            closeFn();
          }
        }
      }
    });

    //popup.show(); doesn't work. The code below does, but don't ask me why ...
    setTimeout(function () {
      popup.show()
    }, 0);
  };
};

var showSetBaseURIPanelCommand = function () {

  this.execute = function () {
    if (preferencesStore.getState().askToSetBaseURI) {
      var closeFn = function () {
        $$("setbaseuri_popup").close();
      };

      var callback = function (set, DontAskAgain) {
        if (set) {
          CommandInvoker.getInvoker().execute(new ShowNamespacesPanelCommand());
        }

        if (DontAskAgain) {
          preferenceActions.setAskToSetBaseURI(false);
        }
      };

      var popup = webix.ui({
        id: "setbaseuri_popup",
        view: "popup",
        height: 425,
        width: 450,
        minWidth: 450,
        position: "center",
        head: "My Window",
        body: UIBuilder.getSetBaseURIPanel(closeFn, callback),
        modal: true,
        on: {
          onKeyPress: function (code, e) {
            if (code === 27) {
              closeFn();
            }
          }
        }
      });

      popup.show();
    }
  };
};

/**
 * Command for showing the file path chooser for github integration. Calls the callback argument with the picked file path.
 * No guarantee is made this callback is called.
 * 
 * @param {*} cb Callback argument. This function receives the file_path data.
 * @param {*} default_filename Adds a default filename to the path picker for convenience.
 */
var makeGithubFileChooserCommand = (config) => function(cb, default_filename) {

  this.execute = async function () {
    const popups = [
      (next, close, data) => new UIBuilder.getGithubAuthenticationPanel(next, close).get_form_config(),
      (next, close, data) => UIBuilder.getGithubRepoPanel(next, close, data),
      (next, close, data) => new UIBuilder.getGithubFilePanel(next, close, data, {...config, default_filename}).get_form_config()
    ]
    new WizardManager(popups, cb).show();
  }
};

var showGithubLoadFileChooserPanelCommand = makeGithubFileChooserCommand(UIBuilder.getGithubFilePanel.load_file_config)
var showGithubSaveFileChooserPanelCommand = makeGithubFileChooserCommand(UIBuilder.getGithubFilePanel.save_file_config)


var showCustomTreeDataPanelCommand = function (data, callback) {
  this.execute = function () {
    var closeFn = function () {
      $$("customTreeDataPopup").close();
    };

    var popup = webix.ui({
      id: "customTreeDataPopup",
      view: "popup",
      height: 425,
      width: 600,
      minWidth: 600,
      position: "center",
      head: "My Window",
      body: UIBuilder.getCustomTreeDataPanel(data, closeFn, callback),
      modal: true,
      on: {
        onKeyPress: function (code, e) {
          if (code === 27) {
            closeFn();
          }
        }
      }
    });

    //popup.show(); doesn't work. The code below does, but don't ask me why ...
    setTimeout(function () {
      popup.show();
    }, 0);
  };
};

let showExample2RMLCommand = function (callback) {
  this.execute = function () {
    let id = "example2rmlPopup";
    let closeFn = function () {
      $$(id).close();
    };

    let popup = webix.ui({
      id: id,
      view: "popup",
      height: 650,
      width: 700,
      minWidth: 700,
      position: "center",
      head: "My Window",
      body: UIBuilder.getExample2RMLPanel(callback, closeFn),
      modal: true,
      on: {
        onKeyPress: function (code, e) {
          if (code === 27) {
            closeFn();
          }
        }
      }
    });

    //popup.show(); doesn't work. The code below does, but don't ask me why ...
    setTimeout(function () {
      popup.show();
    }, 0);
  };
};

/*
* Shows the ErrorPanel.
* Toggles the value in the menu to "Hide Error Panel"
* */
var ShowErrorPanelCommand = function () {
  this.execute = function () {
    // Get menu
    var menuErrorsPanelId = UIBuilder.ids.menu.toggle.ERROR_PANEL;
    var m = $$(UIBuilder.ids.menu.ID).getMenu(menuErrorsPanelId);

    // Get the errorpanel
    var errortable = $$(UIBuilder.ids.modeling.ERRORS_PANEL);
    errortable.show();
    var resizer = $$(UIBuilder.ids.resizer.ERRORS);
    resizer.show();

    // update toolbar
    var toolbar = UIBuilder.ids.toolbar.toggle.ERROR_PANEL;
    $$(toolbar).define('tooltip', "Hide violations");
    $$(toolbar).define('image', "./images/18/error.png");
    $$(toolbar).refresh();

    // Update the menuitem
    m.updateItem(menuErrorsPanelId, {id: menuErrorsPanelId, value: "Hide Violations"});
    m.refresh();
  }
};


/**
* Hides the ErrorPanel.
* Toggles the menuitem to "Show Error Panel"
*/
var HideErrorPanelCommand = function () {
  this.execute = function () {
    // Get menu
    var menuErrorsPanelId = UIBuilder.ids.menu.toggle.ERROR_PANEL;
    var m = $$(UIBuilder.ids.menu.ID).getMenu(menuErrorsPanelId);

    // Get datatable, the errorpanel
    var errortable = $$(UIBuilder.ids.modeling.ERRORS_PANEL);
    errortable.hide();
    var resizer = $$(UIBuilder.ids.resizer.ERRORS);
    resizer.hide();

    var toolbar = UIBuilder.ids.toolbar.toggle.ERROR_PANEL;
    $$(toolbar).define('tooltip', "Show violations");
    $$(toolbar).define('image', "./images/18/error_off.png");
    $$(toolbar).refresh();

    // Update the Menuitem
    m.updateItem(menuErrorsPanelId, {id: menuErrorsPanelId, value: "Show Violations"});
    m.refresh();
  }
};

/**
 * Show the modal window with the form used to filter.
 */
var ShowFilterFormCommand = function () {
  this.execute = function () {
    // Get the errorpanel
    var filterform = $$(UIBuilder.ids.modeling.FILTER_POPUP);
    if(filterform === undefined){
      webix.ui(ModelingBuilder.getFilterForm()).show();
    } else {
      filterform.show();
    }
  }
};

/**
 * Show the modal window with the form used to sort.
 */
var ShowSortFormCommand = function () {
  this.execute = function () {
    var sortForm = $$(UIBuilder.ids.modeling.SORT_POPUP);
    if(sortForm === undefined){
      webix.ui(ModelingBuilder.getSortForm()).show();
    } else {
      sortForm.show();
    }
  }
};

var ShowResolutionPanelCommand = function(){
  this.execute = function() {
    var menuResolutionPanelId = UIBuilder.ids.menu.toggle.RESOLUTION_PANEL;
    var menu = $$(UIBuilder.ids.menu.ID).getMenu(menuResolutionPanelId);
    $$(UIBuilder.ids.modeling.RESOLUTION_PANEL).show();
    var resizer = $$(UIBuilder.ids.resizer.RESOLUTION);
    resizer.show();

    var toolbar = UIBuilder.ids.toolbar.toggle.RESOLUTION_PANEL;
    $$(toolbar).define('tooltip', "Hide resolutions");
    $$(toolbar).define('image', "./images/18/resolution.png");
    $$(toolbar).refresh();

    menu.updateItem(menuResolutionPanelId, {id: menuResolutionPanelId, value: "Show Resolution Panel"});
    menu.refresh();

    //checkPresets();
  }
};

var HideResolutionPanelCommand = function(){
  this.execute = function(){
    var menuResolutionPanelId = UIBuilder.ids.menu.toggle.RESOLUTION_PANEL;
    var menu = $$(UIBuilder.ids.menu.ID).getMenu(menuResolutionPanelId);
    $$(UIBuilder.ids.modeling.RESOLUTION_PANEL).hide();
    var resizer = $$(UIBuilder.ids.resizer.RESOLUTION);
    resizer.hide();

    var toolbar = UIBuilder.ids.toolbar.toggle.RESOLUTION_PANEL;
    $$(toolbar).define('tooltip', "Show resolutions");
    $$(toolbar).define('image', "./images/18/resolution_off.png");
    $$(toolbar).refresh();

    menu.updateItem(menuResolutionPanelId, {id: menuResolutionPanelId, value: "Hide Resolution Panel"});
    menu.refresh();
  }
};

var ShowModelingPanelCommand = function(){
  this.execute = function(){
    // toolbarInputPanelId = UIBuilder.ids.toolbar.toggle.INPUT_PANEL;
    var menuModelingPanelId = UIBuilder.ids.menu.toggle.MODELING_PANEL;
    var m = $$(UIBuilder.ids.menu.ID).getMenu(menuModelingPanelId);

    $$(UIBuilder.ids.modeling.D3).show();
    $$(UIBuilder.ids.modeling.placeholder).hide();

    $$(UIBuilder.ids.modeling.DETAIL_LEVELS).show();
    //$$(UIBuilder.ids.resizer.INPUT).show();

    var toolbar = UIBuilder.ids.toolbar.toggle.MODELING_PANEL;
    $$(toolbar).define('tooltip', "Hide model");
    $$(toolbar).define('image', "./images/18/link.png");
    $$(toolbar).refresh();

    //update menu
    m.updateItem(menuModelingPanelId, {id: menuModelingPanelId, value: "Hide Modeling Panel"});
    m.refresh();
  }
};

var HideModelingPanelCommand = function(){
  this.execute = function(){
    var menuModelingPanelId = UIBuilder.ids.menu.toggle.MODELING_PANEL;
    var menu = $$(UIBuilder.ids.menu.ID).getMenu(menuModelingPanelId);
    $$(UIBuilder.ids.modeling.D3).hide();
    $$(UIBuilder.ids.modeling.placeholder).show();

    $$(UIBuilder.ids.modeling.DETAIL_LEVELS).hide();

    var toolbar = UIBuilder.ids.toolbar.toggle.MODELING_PANEL;
    $$(toolbar).define('tooltip', "Show model");
    $$(toolbar).define('image', "./images/18/link_off.png");
    $$(toolbar).refresh();

    menu.updateItem(menuModelingPanelId, {id: menuModelingPanelId, value: "Show Modeling Panel"});
    menu.refresh();
  }
};

var ShowModelingPreset = function(){
  this.execute = function(){
    CommandInvoker.getInvoker().execute(new HideErrorPanelCommand());
    CommandInvoker.getInvoker().execute(new HideResolutionPanelCommand());
    // show input panel
    CommandInvoker.getInvoker().execute(new ShowInputPanelCommand());
    // show modeling panel
    CommandInvoker.getInvoker().execute(new ShowModelingPanelCommand());
    // show results panel
    CommandInvoker.getInvoker().execute(new ShowResultsPanelCommand());
  }
};

var ShowResolvingPreset = function(){
  this.execute = function(){
    // hide input
    CommandInvoker.getInvoker().execute(new HideInputPanelCommand());
    // hide results
    CommandInvoker.getInvoker().execute(new HideResultsPanelCommand());
    // show error panel
    CommandInvoker.getInvoker().execute(new ShowErrorPanelCommand());
    // show resolving panel
    CommandInvoker.getInvoker().execute(new ShowResolutionPanelCommand());
    // show modeling panel
    CommandInvoker.getInvoker().execute(new ShowModelingPanelCommand());
  }
};

var createFilterForm = function(){
  var showing = filterPreferencesStore.getPreferences();
  var all = [];
  for(var code in showing){
    if(showing.hasOwnProperty(code)){
      var show = 1;
      if(!showing[code]) show = 0;
      all.push({
        view: 'checkbox',
        id: code,
        label: "Show " + errorsStore.getHumanReadable(code),
        name: code,
        value: show
      })
    }
  }
  all.push({
    view: 'button', value: 'Save',
    click: function () {
      CommandInvoker.getInvoker().execute(new ApplyFilterCommand());
      this.getTopParentView().hide();
    }
  });
  return all;
};

var createSortForm = function(){
  var sort = filterPreferencesStore.getSorting();
  var all = [];

  // Generate options
  var options = [];
  var number = Object.keys(sort).length;
  for(var i = 1; i <= number; i++){
    var option = {
      id: i,
      value: i
    };
    options.push(option)
  }

  // generate the different rows in the form, based on the existing sorting
  for(var code in sort){
    if(sort.hasOwnProperty(code)){
      var row = {
        view: "select",
        id: code,
        label: errorsStore.getHumanReadable(code),
        name: code,
        value: sort[code],
        options: options
      };
      all.push(row);
    }
  }
  all.push({
    view: 'button', value: 'Save',
    click: function () {
      //webix.alert(JSON.stringify($$(ModelingBuilder.ids.FILTER_FORM).getValues()));
      CommandInvoker.getInvoker().execute(new ApplySortCommand());
      this.getTopParentView().hide();
    }
  });

  return all;
};

const toValidationModeCommand = function(errorObjs){
  this.execute = function(){
    graphActions.addErrors(errorObjs, true);
    errorActions.addErrors(errorObjs, true);
    // clear resolution screen
    var respanel = $$(UIBuilder.ids.modeling.RESOLUTION_PANEL);
    respanel.clearAll();
    //CommandInvoker.getInvoker().execute(new ShowResolvingPreset());
  }
};
