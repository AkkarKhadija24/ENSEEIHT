var UIBuilder = (function () {

  var ids = {
    global: {
      ID: "globalPanel"
    },
    resizer: {
      INPUT: "inputResizer",
      RESULTS: "resultsResizer",
      ERRORS: "errorsResizer",
      NODES: "nodeResizer",
      RESOLUTION: "resolutionResizer"
    },
    ERROR_NODES_COMBO: "error_nodes_combo",

    menu: MenuBuilder.ids,
    modeling: ModelingBuilder.ids,
    dialog: DialogBuilder.ids,
    results: ResultsBuilder.ids,
    input: InputBuilder.ids,
    toolbar: ToolbarBuilder.ids,
    bottombar: "bottomBar"
  };

  var getGlobalPanel = function (modelingController) {
    return {
      id: ids.global.ID,
      rows: [
        {
        cols: [
            ToolbarBuilder.getToolbar()
          ]
        },
        {
          autoheight: true,
        cols: [
          InputBuilder.getInputPanel(),
          {
            view: "resizer",
            id: ids.resizer.INPUT,
            hidden: true
          },
          ModelingBuilder.getErrorsPanel(),
          {
            view: "resizer",
            id: ids.resizer.ERRORS,
            hidden: true
          },
          ModelingBuilder.getResolutionPanel(),
          {
            view: "resizer",
            id: ids.resizer.RESOLUTION,
            hidden: true
          },
          ModelingBuilder.getModelingPanel(modelingController),
          { view: "resizer",
            id: ids.resizer.RESULTS,
            hidden: true
          },
          ResultsBuilder.getResultsPanel()
        ]
        },
        {
          view: "template",
          id:ids.bottombar,
          template: "Ready",
          height: 35
        }
      ]
    };
  };

  return {
    ids: ids,
    getGlobalPanel: getGlobalPanel,
    getNodeDetailsPanel: ModelingBuilder.getNodeDetailsPanel,
    getEdgeDetailsPanel: ModelingBuilder.getEdgeDetailsPanel,
    getEdgeContextMenu: ModelingBuilder.getEdgeContextMenu,
    getNodeContextMenu: ModelingBuilder.getNodeContextMenu,
    getBackgroundContextMenu: ModelingBuilder.getBackgroundContextMenu,
    getNamespacesPanel: DialogBuilder.getNamespacesPanel,
    getDefineSourcesPathsPanel: DialogBuilder.getDefineSourcesPathsPanel,
    getConnectSourcesPanel: DialogBuilder.getConnectSourcesPanel,
    showCloseSourceDialog: DialogBuilder.showCloseSourceDialog,
    showFixForRunningDialog: DialogBuilder.showFixForRunningDialog,
    showBeforeRunMappingDialog: DialogBuilder.showBeforeRunMappingDialog,
    getAutoSavesPanel: DialogBuilder.getAutoSavesPanel,
    getLOVPanel: DialogBuilder.getLOVPanel,
    getDownloadFileFromURIPanel: DialogBuilder.getDownloadFileFromURIPanel,
    getDatatableContextMenu: InputBuilder.getDatatableContextMenu,
    getSetBaseURIPanel: DialogBuilder.getSetBaseURIPanel,
    getNoButtonModal: DialogBuilder.getNoButtonModal,
    getCustomTreeDataPanel: DialogBuilder.getCustomTreeDataPanel,
    getExample2RMLPanel: DialogBuilder.getExample2RMLPanel,
    getGithubRepoPanel: DialogBuilder.getGithubRepoPanel,
    getGithubFilePanel: DialogBuilder.getGithubFilePanel,
    getGithubAuthenticationPanel: DialogBuilder.getGithubAuthenticationPanel
  };
})();
