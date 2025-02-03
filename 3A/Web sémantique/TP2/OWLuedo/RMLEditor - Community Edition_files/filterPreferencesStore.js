/**
 * Created by louise_dck on 05/07/17.
 */

function FilterPreferencesStore() {
  this.preferences = {};

  this.sort = {};

  /*
   * Bind action handlers to the actions
   * */
  this.bindListeners({
    changePreferences: filterPreferencesActions.changePreferences,
    changeSorting: filterPreferencesActions.changeSorting
  });

  this.exportPublicMethods({
    isDisplayed: function(error){
      return !!((this.state.preferences[error.errorLevel]) && (this.state.preferences[error.code]));
    },
    getSorting: function(){
      return this.state.sort;
    },
    getPreferences: function(){
      return this.state.preferences;
    }
  });
}

/*
 * Handles changing of preferences. (Action handler)
 * */
FilterPreferencesStore.prototype.changePreferences = function (preferences) {
  this.preferences = preferences;
};

// Handles changing the sorting
FilterPreferencesStore.prototype.changeSorting = function(sort){
  this.sort = sort;
};
//set the name of the store
FilterPreferencesStore.displayName = 'FilterPreferencesStore';

//create the store
var filterPreferencesStore = alt.createStore(FilterPreferencesStore);