/**
 * Created by Pieter Heyvaert on 15.01.16.
 */

APPLICATION_CONFIG = {
  rmlprocessor: {
    url: "https://rml.io/api/rmlmapper"
  },
  validator: {
    url: "http://dia.test.iminds.be:8988"
  },
  functions: {
    url: "https://app.rml.io/rmleditor/functions.ttl"
  },
  enableValidation: false,
  enableVerification: false,
  enableCompletion: false,
  enableDataAnalysis: false,
  enableExampleDriven: true,
  graph: {
    detailLevels: {
      LOW: 10
    }
  },
  communityEdition: true,
  nodeLimit: 20,
  fileSizeLimit: '2 MB',
  github: "https://github.com/RMLio/rmleditor-ce",
  sampleSize: 10
};
