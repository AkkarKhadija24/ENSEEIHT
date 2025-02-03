/**
 * Created by Pieter Heyvaert, Data Science Lab (Ghent University - iMinds) on 5/2/16.
 */

function PreferencesStore() {

  this.askToSetBaseURI = true;

  this.bindListeners({
    setAskToSetBaseURI: preferenceActions.setAskToSetBaseURI,
    load: preferenceActions.load
  });

  this.exportPublicMethods({

    dump: function(iri) {
      var dump = {};

      dump.askToSetBaseURI = this.getState().askToSetBaseURI;

      return dump;
    }
  });
}

PreferencesStore.prototype.setAskToSetBaseURI = function (value) {
  if (this.askToSetBaseURI != value) {
    this.askToSetBaseURI = value;

    return true;
  }

  return false;
};


PreferencesStore.prototype.load = function (pref) {
  this.askToSetBaseURI = pref.askToSetBaseURI;
};

//set the name of the store
PreferencesStore.displayName = 'PreferencesStore';

//create the store
var preferencesStore = alt.createStore(PreferencesStore);