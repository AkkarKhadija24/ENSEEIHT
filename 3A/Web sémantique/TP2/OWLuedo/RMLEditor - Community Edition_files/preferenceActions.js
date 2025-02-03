/**
 * Created by Pieter Heyvaert, Data Science Lab (Ghent University - iMinds) on 5/2/16.
 */

var preferenceActions = alt.createActions({
  setAskToSetBaseURI: function (ask) {
    return ask;
  },
  load: function (preferences) {
    return preferences;
  }
});
