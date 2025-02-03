/**
 * Created by pieter on 26.01.16.
 */

var InputBuilder = (function () {

  var ids = {
    ID: "inputPanel"
  };

  var getDatatableContextMenu = function (controller) {
    var datatableContextMenu = webix.ui({view: "contextmenu"});
    var data = ["New Entity", "New Attribute"];
    $$(datatableContextMenu).clearAll();
    $$(datatableContextMenu).parse(data);

    $$(datatableContextMenu).attachEvent("onItemClick", function (id, e, node) {
      if (this.getItem(id).value === "New Entity") {
        var template = "{" + controller.latestClickedCell.column + "}";

        if (namespacesStore.getBaseURIPrefix()) {
          template = namespacesStore.getBaseURIPrefix() + ":" + template;
        }

        var n = {
          valueType: ValueTypes.TEMPLATE,
          template: template,
          source: controller.currentSource
        };

        CommandInvoker.getInvoker().execute(new AddNewResourceNodeCommand(undefined, n));
        //CommandInvoker.getInvoker().execute(new AddNewResourceNodeCommand(undefined, ValueTypes.TEMPLATE, template, controller.currentSource, null));
      } else {
        CommandInvoker.getInvoker().execute(new AddNewLiteralNodeCommand(ValueTypes.REFERENCE, controller.latestClickedCell.column, controller.currentSource, null));
      }
    });

    return datatableContextMenu;
  };

  var getInputPanel = function () {
    return {
      id: ids.ID,
      width:1,
      /* hidden: true, 
      tabbar: {
          tabMinWidth:120,
          tabMoreWidth:60
      },*/
      view: "tabview",
      responsive: true,
      minWidth:5,
      maxWidth:500,
      css: "webix_view webix_layout_line",
      tabbar: {
        close: true,
        tabMinWidth:360, 
        tabMoreWidth:40,
        moreTemplate:"<span class='webix_icon fa-caret-square-o-down' style='color:#0D79C1'></span>",
        popupWidth:360,
        on: {
          onBeforeTabClose: function (id, e) {
            console.log('Want to close source (id=' + id + ')');
            console.log($$(id));
            CommandInvoker.getInvoker().execute(new ShowCloseSourceDialogCommand(id.replace("input-", "")));

            return false;
          }
        }
      },
      //hidden: true,
      cells: [
        {
          header: "Input Files",
          body: {
            type: "line",
            rows: [
            {
                view:"template",
                template: "..."
            }
            ]
          }
        }
      ]
    };
  };

  return {
    ids: ids,
    getInputPanel: getInputPanel,
    getDatatableContextMenu: getDatatableContextMenu
  };

})();
