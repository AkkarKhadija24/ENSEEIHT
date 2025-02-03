/**
 * Created by Pieter Heyvaert, Data Science Lab (Ghent University - iMinds) on 5/2/16.
 */

function InputStore() {
  this.sources = [];
  this.displayedSource = null;
  let latestIDCounter = 0;
  const self = this;

  this.bindListeners({
    addSource: inputActions.addSource,
    removeSource: inputActions.removeSource,
    setDisplayedSource: inputActions.setDisplayedSource,
    updateSource: inputActions.updateSource,
    updateTreeData: inputActions.updateTreeData
  });

  this.exportPublicMethods({
    getSourceByTitle: function (title) {
      const sources = this.getState().sources;
      let i = 0;

      while (i < sources.length && sources[i].title !== title) {
        i++;
      }

      if (i < sources.length) {
        return sources[i];
      } else {
        return null;
      }
    },
    getNewID: function () {
      latestIDCounter++;

      return "input_source_" + latestIDCounter;
    },
    getSource: function (id) {
      return self.getSource(id);
    }
  });
}

InputStore.prototype.getSource = function (id) {
  let i = 0;

  while (i < this.sources.length && this.sources[i].id !== id) {
    i++;
  }

  if (i < this.sources.length) {
    return this.sources[i];
  } else {
    return null;
  }
};

InputStore.prototype.removeSource = function (id) {
  let i = 0;

  while (i < this.sources.length && this.sources[i].id !== id) {
    i++;
  }

  if (i < this.sources.length) {
    this.sources.splice(i, 1);
  }
};

InputStore.prototype.setDisplayedSource = function (source) {
  this.displayedSource = source;
};

InputStore.prototype.addSource = function (data) {
  this.sources.push(data.source);

  if (data.isDisplayedSource) {
    this.setDisplayedSource(data.source);
  }
};

InputStore.prototype.removeSource = function (id) {
  let i = 0;

  while (i < this.sources.length && this.sources[i].id !== id) {
    i++;
  }

  if (i < this.sources.length) {
    this.sources.splice(i, 1);
  }
};


InputStore.prototype.updateSource = function (data) {
  const source = this.getSource(data.id);

  $.extend(source, data.source);
};

InputStore.prototype.updateTreeData = function (data) {
  const source = this.getSource(data.id);

  $.extend(source.treeData, data.treeData);
};

//set the name of the store
InputStore.displayName = 'InputStore';

//create the store
const inputStore = alt.createStore(InputStore);