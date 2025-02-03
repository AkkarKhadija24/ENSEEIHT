window.onload = function() {
  CommandInvoker.getInvoker().execute(new showSetBaseURIPanelCommand());
};

if(APPLICATION_CONFIG.communityEdition) 
  document.title = "RMLEditor - Community Edition"
else
  document.title = "RMLEditor"

var modelingController = new ModelingController(UIBuilder.ids.modeling.D3);
var start_config = UIBuilder.getGlobalPanel(modelingController);

webix.codebase = "./";
webix.ui(start_config);
webix.ui({
  view:"popup",
  id: UIBuilder.ids.modeling.details.WINDOW,
  autofit: true,
  body: {
    view:"tabview",
    id: UIBuilder.ids.modeling.details.ID,
    cells:[
      {
        header:"General",
        body:{
          template:"Form Content"
        }
      }
    ]
  }
});

var inputController = new InputController($$(UIBuilder.ids.input.ID));
var resultsController = new ResultsController();
var settingsPanelModelingPanelController = new SettingsPanelModelingPanelController(UIBuilder.ids.modeling.settings.ID);
var errorsController = new ErrorsController();

//CommandInvoker.getInvoker().execute(new StartPeriodicAutoSaveCommand());
CommandInvoker.getInvoker().execute(new LoadLocalPreferencesCommand());
CommandInvoker.getInvoker().execute(new LoadLocalNamespacesCommand());
CommandInvoker.getInvoker().execute(new LoadFunctionsCommand());


window.onbeforeunload = function () {
  return "All unsaved mappings and results will be lost when the page is reloaded.";
};