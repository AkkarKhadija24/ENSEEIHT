function SettingsPanelModelingPanelController(viewID) {
  this.viewID = viewID;
}

SettingsPanelModelingPanelController.prototype.update = function (type, data) {
  if (type === GraphUpdateTypes.BASE_IRI_UPDATED) {
    $$("spmpBaseIRI").setValue(data.iri);
    $$("spmpPrefix").setValue(data.prefix);
    $$("spmpBaseIRI").refresh();
  }
};
