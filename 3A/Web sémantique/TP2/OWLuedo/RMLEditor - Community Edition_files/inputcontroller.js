function InputController(tabView) {
  var self = this;
  this.tabView = tabView;
  this.sourceCount = 0;
  //this.model = inputmodel;
  this.BASE_ID = "input-";
  this.datatableContextMenu;
  this.latestClickedCell;
  this.currentSource;

  //this.model.subscribe(this);
  inputStore.listen(function () {
    //this.tabView.reconstruct();

    const sources = inputStore.getState().sources;

    if (self.sourceCount !== sources.length) {
      self.sourceCount = sources.length;
      self.tabView.hide();
      //var latestTab;

      self.removeAllTabs();

      //webix.ui(UIBuilder.getInputPanel(), $$(UIBuilder.ids.panels.global.ID), $$(UIBuilder.ids.panels.input.ID));
      //this.tabView = $$(UIBuilder.ids.panels.input.ID);
      //setUpTabView();

      for (var i = 0; i < sources.length; i++) {
        latestTab = self.addTab(sources[i]);
      }

      //self.tabView.setValue(self.BASE_ID + inputStore.getState().displayedSource);

      //var formerWidth = self.tabView.$width;
      //if (formerWidth < 10) {
      //    self.tabView.define("width", 400); // 0 = auto-size
      //    self.tabView.resize();
      //}

      CommandInvoker.getInvoker().execute(new ShowInputPanelCommand());
    }

    if(sources.length <= 0) {
      CommandInvoker.getInvoker().execute(new HideInputPanelCommand());
    }
  });

  //this.modelingModel.subscribe(this);

  function setUpTabView() {
    tabView.getTabbar().attachEvent("onAfterTabClick", function (id, e, node) {
      var sourceID = id.replace(self.BASE_ID, "");
      self.currentSource = inputStore.getSource(sourceID);
      inputActions.setDisplayedSource(self.currentSource);
    });
  }

  setUpTabView();
}

InputController.prototype = {
  getDatatableContextMenu: function () {
    if (!this.datatableContextMenu) {
      this.datatableContextMenu = UIBuilder.getDatatableContextMenu(this);
    }

    return this.datatableContextMenu;
  },

  removeAllTabs: function () {
    var tabs = this.tabView.getTabbar().config.options;

    for (var i = tabs.length - 1; i >= 0; i--) {
      console.log($$(tabs[i].id));
      this.tabView.removeView(tabs[i].id);
    }
  },

  addTab: function (source) {
    var self = this;

    /*for (var i = 0; i < source.headers.length; i++) {
     source.headers[i].fillspace = true;
     }
     ;*/

    var newTab = {};

    newTab.header = "  <span style='color:" + ColorManager.getManager().getSourceColors(source.id).base + "' class='webix_icon fa-circle'></span>" + Util.clipFileName(source.title);
    //newTab.header = '<span class="fa-stack"> <i class="fa fa-circle-o fa-stack-2x fa-inverse"></i> <i style="color:' + ColorManager.getManager().getSourceColors(source.id).base + '" class="fa fa-bookmark fa-stack-1x "></i></span>';
    //newTab.id = this.BASE_ID + source.id;
    //newTab.body = {};
    //var seconds = "_" + new Date().getTime() / 1000;

    /*newTab.body.id = this.BASE_ID + source.id;// + seconds;
     newTab.body.view = "datatable";
     newTab.body.columns = source.headers;
     newTab.body.resizeColumn = true;
     //newTab.body.autowidth = true;
     newTab.body.data = source.data;

     var viewId = newTab.body.id;
     var contextMenu = this.getDatatableContextMenu();

     newTab.body.on = {
     onBeforeContextMenu: function (id, e, node) {
     self.latestClickedCell = id;
     console.log(self.latestClickedCell);
     $$(contextMenu).attachTo($$(viewId));
     }
     };

     this.tabView.addView(newTab);

     return this.BASE_ID + source.id;*/

    // ***************
    // Structure
    // newtab
    //  - Line layout
    //      - Tree view ('tree")
    //      - Resizer
    //      - Raw Data view ('template")
    newTab.body = {
      id: this.BASE_ID + source.id,
      type: "line",
      rows: []
    };
    newTab.width = 400;

    var treeID = this.BASE_ID + source.id + "-tree";
    var treeView = {
      id: treeID,
      view: "tree",
      css: "rmlTree",
      template: function (obj, common) {
        //console.log(obj);
        var v = obj.value;

        if (v.length > 20) {
          v = v.substr(0, 19) + '...';
        }

        var str = common.icon(obj, common) + ' ' + common.folder(obj, common) + ' <span>' + v + '</span>';

        if (obj.$count > 0) {
          str += '<span class="tree-add-custom">+</span>';
        }

        if (obj.custom) {
          str += '<span class="tree-update-custom">U</span>';
          str += '<span class="tree-delete-custom">X</span>';
        }

        return str;
      },
      drag: "source",
      on: {
        // PRevent non-leafs from dragging
        onBeforeDrag: function (context, ev) {
          var item = context.from.getItem(context.source[0]);
          return !(item.sdata);

        }
      },
      onClick: {
        'tree-add-custom': function (e, id) {
          var path = "New Item";

          if (source.type !== 'csv' && $$(treeID).getItem(id).path) {
            var delimiter = source.type === 'xml' ? '/' : '.';
            path = $$(treeID).getItem(id).path + delimiter + path;
          }

          var customData = { value:"New Item", path: path, values: [], custom: true};

          $$(treeID).add(customData, 0, id);
          inputActions.updateTreeData(source.id, $$(treeID).serialize());
        },
        'tree-update-custom': function (e, id) {
          CommandInvoker.getInvoker().execute(new showCustomTreeDataPanelCommand($$(treeID).getItem(id), function(item){
            $$(treeID).updateItem(id, item);
            //update tree data in inputStore
            inputActions.updateTreeData(source.id, $$(treeID).serialize());
          }));
        },
        'tree-delete-custom': function (e, id) {
          $$(treeID).remove(id);
        }
      }
    };

    // Copy the treeData object to the Tree component
    // Without copying, the data property goes missing
    //  and the children are not shown in the tree component
    var newTreeData = JSON.parse(JSON.stringify(source.treeData));
    treeView.data = newTreeData;

    console.log("data:");
    console.dir(treeView.data);

    var resizer = {
      view: "resizer"
    };

    // if type is ... show different type of raw data
    // TODO
    var rawData = {
      id: this.BASE_ID + source.id + "-raw",
      readonly: true,
      height: 150,
      scroll: "y",
    };
    source.getDataDisplay = () => $$(this.BASE_ID + source.id + "-raw")
    switch (source.type) {
      case "csv":
        rawData.view = "datatable";
        rawData.columns = source.headers;
        rawData.resizeColumn = true;
        newTab.autowidth = false;
        rawData.data = source.data;
        rawData.on = {onViewShow: function() {this.refreshColumns()}}

        break
      default:
        rawData.view = "template";
        rawData.css = 'code-preview';
        rawData.template = '<pre>' + hljs.highlight(source.type, source.data, true, false).value + '</pre>';
    }

    newTab.body.rows[0] = treeView;
    newTab.body.rows[1] = resizer;
    newTab.body.rows[2] = rawData;

    this.tabView.addView(newTab);

    // Focus newly added tab
    this.tabView.setValue(this.BASE_ID + source.id);
    //inputActions.setDisplayedSource(source);
    // show the tabview component if it wasnt already visible
    var formerWidth = this.tabView.$width;
    if (formerWidth < 10) {
      this.tabView.define("width", 400); // 0 = auto-size
      this.tabView.resize();
    }

    //hljs.initHighlighting();

    return this.BASE_ID + source.id;
  },

  update: function (data, type) {
    console.log(data);
    if (!data && !type) {
      //this.tabView.reconstruct();
      this.tabView.hide();
      var sources = inputStore.getState().sources;
      var latestTab;

      this.removeAllTabs();

      //webix.ui(UIBuilder.getInputPanel(), $$(UIBuilder.ids.panels.global.ID), $$(UIBuilder.ids.panels.input.ID));
      //this.tabView = $$(UIBuilder.ids.panels.input.ID);
      //setUpTabView();


      for (var i = 0; i < sources.length; i++) {
        latestTab = this.addTab(sources[i]);
      }

      this.tabView.show();
    } else {
      CommandInvoker.getInvoker().execute(new UpdateAllMarkedInputCommand());
    }

    //tabView.getTabbar().setValue(tabView.getTabbar().config.options[0].id);
  },

  updateSources: function () {
    //this.tabView.reconstruct();
    self.tabView.hide();
    var sources = inputStore.getState().sources;
    var latestTab;

    self.removeAllTabs();

    //webix.ui(UIBuilder.getInputPanel(), $$(UIBuilder.ids.panels.global.ID), $$(UIBuilder.ids.panels.input.ID));
    //this.tabView = $$(UIBuilder.ids.panels.input.ID);
    //setUpTabView();

    for (var i = 0; i < sources.length; i++) {
      latestTab = self.addTab(sources[i]);
    }

    self.tabView.show();
  }
};
