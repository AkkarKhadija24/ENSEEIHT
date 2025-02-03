/**
 * Created by Pieter Heyvaert, Data Science Lab (Ghent University - iMinds) on 27.01.16.
 */

"use strict";

const SendContactMailCommand = function () {

  this.execute = function () {
    const onbeforeunload = window.onbeforeunload;
    window.onbeforeunload = null;

    parent.location = "mailto:editor@rml.io";

    setTimeout(function () {
      window.onbeforeunload = onbeforeunload;
    }, 500);

  }
};

const OpenGithubCommand = function () {

  this.execute = function () {
    // window.open will open github in new tab
    // (technically could also be a new window depending on user settings, but I don't think modern browsers do this)
    window.open(APPLICATION_CONFIG.github);
  }
};

const QueryLOVCommand = function (query, type, callback) {

  this.execute = function () {
    $.ajax({
      type: 'GET',
      url: `https://lov.linkeddata.es/dataset/lov/api/v2/term/search?q=${query}&type=${type}`,
      success: (data, status) => {
        callback(data.results, status);
      },
      error: () => {
        CommandInvoker.getInvoker().execute(new ShowErrorMessageCommand('Could not use LOV', 'LOV results could not be provided because ...'));
      }
    });
  };
};

const QueryPrefixCCCommand = function (prefix, callback) {

  this.execute = function () {

    $.ajax({
      url: "http://prefix.cc/" + prefix + ".file.json",
      data: {},
      type: 'get',
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        callback(null, errorThrown);
      },
      success: function (data) {
        callback(data[prefix], null);
      }
    });
  }
};

const LoadCSVURICommand = function (uri) {

  this.execute = function () {

    function success(data) {
      const filename = uri.substring(uri.lastIndexOf('/') + 1);
      CommandInvoker.getInvoker().execute(new LoadCSVDataCommand(data, filename, ()=>{}, uri));
    }

    function error() {
      CommandInvoker.getInvoker().execute(new ShowErrorMessageCommand('Input Data Source Not Found', 'The input data source ' +
        'could not be found please check the URI.'));
    }

    $.ajax({
      url: APPLICATION_CONFIG.rmlprocessor.url + "/downloadfile",
      type: 'GET',
      data: {uri: uri},
      success: success,
      error: error
    });
  };
};

const AnalyseDataCommand = function (data, callback) {

  this.execute = function () {
    console.log(data);

    $.ajax({
      url: APPLICATION_CONFIG.rmlprocessor.url + "/analyse",
      data: JSON.stringify({data: data}),
      contentType: 'application/json; charset=utf-8',
      type: 'post',
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        callback(null, errorThrown);
      },
      success: function (data) {
        callback(data, null);
      }
    });
  }
};

const Example2RMLCommand = function (triples, iterator, callback) {
  const mappingSources = [];

  this.execute = function () {
    const dataSources = getDataSources();
    console.log(dataSources);
    console.log(triples);


    $.ajax({
      url: APPLICATION_CONFIG.rmlprocessor.url + "/example2graphml",
      data: JSON.stringify({dataSources: dataSources, triples: triples}),
      contentType: 'application/json; charset=utf-8',
      type: 'post',
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log(JSON.parse(XMLHttpRequest.responseText).name);
        callback(null, null, JSON.parse(XMLHttpRequest.responseText));
      },
      success: function (data) {
        console.log(data);
        callback(data, mappingSources);
      }
    });
  };

  const getDataSources = function () {
    const sources = inputStore.getState().sources;
    const dataSources = [];

    sources.forEach(function (source) {
      const dataSource = {
        sourceDescription: {
          type: source.type,
          source: source.title
        }
      };

      if (source.type === 'csv') {
        let row = [];
        let originalRow = source.data[0];

        for (let i = 0; i < Object.keys(originalRow).length; i++) {
          if (Object.keys(originalRow)[i] !== 'id') {
            row.push({
              column: Object.keys(originalRow)[i],
              value: originalRow[Object.keys(originalRow)[i]]
            });
          }
        }

        dataSource.row = row;
      } else if (source.type === 'json') {
        dataSource.object = JSON.parse(source.data);

        if (iterator && iterator !== '') {
          console.log('using user-provided iterator: ' + iterator);
          dataSource.sourceDescription.iterator = iterator;
        }
      }

      dataSources.push(dataSource);
      mappingSources.push({
        name: source.title,
        source: source.title
      });
    });

    return dataSources;
  }
};