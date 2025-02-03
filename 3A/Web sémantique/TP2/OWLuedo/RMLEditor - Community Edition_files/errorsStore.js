/**
* Stores errors.
*/
function ErrorsStore() {
  this.errors = [];

  this.types = {};

  /**
  * Bind action handlers to the actions
  */
  this.bindListeners({
    setErrors: errorActions.addErrors,
    setTypes: errorActions.addTypes
  });

  this.exportPublicMethods({
    getHumanReadable: function(code){
      return this.state.types[code];
    },
    getCode: function(readable){
      for (var code in this.state.types) {
        if (this.state.types.hasOwnProperty(code) && this.state.types[code] === readable) {
          return code;
        }
      }
    },
    getErrors: function(){
      return this.state.errors;
    }
  });

}

/**
* Handles adding of errors.
*/
ErrorsStore.prototype.setErrors = function (data) {
  var errors = data.errors;
  var removeOld = data.removeOld;
  if(removeOld) this.errors = errors;

  for(var i = 0; i < this.errors.length; i++){
    this.errors[i].violationType = this.types[this.errors[i].code]
  }
};

// Handles the setting of the violationtypes & their readable versions
ErrorsStore.prototype.setTypes = function(types){
  this.types = types;
};

//set the name of the store
ErrorsStore.displayName = 'ErrorsStore';

//create the store
var errorsStore = alt.createStore(ErrorsStore);