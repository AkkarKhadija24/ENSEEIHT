/**
 * Created by Pieter Heyvaert, Data Science Lab (Ghent University - iMinds) on 27.01.16.
 */

const { DataFactory } = N3;
const { namedNode, literal, defaultGraph, quad } = DataFactory;

/**
 * General command that Loads a file and invokes a datacommand according to the estimated filetype
 */
const LoadFileCommand = function () {

  this.execute = function () {
    const fileSelector = $('<input type="file" multiple/>');

    console.log(fileSelector)
    fileSelector.on('click', function () {

      fileSelector.on("change", function (evt) {
        const files = evt.target.files;

        let limitReached = false;
        for (let i = 0; i < files.length; i++) {
          // if a file size limit is set and file is too large, do not load it
          if (APPLICATION_CONFIG.fileSizeLimit !== undefined && files[i].size > Util.getBytesFromString(APPLICATION_CONFIG.fileSizeLimit)) {
            limitReached = true;
          } else {
            files[i].text().then(text => {
              const fileType = detectFiletype(files[i].name, text);
              let cmd;

              switch (fileType) {
                case "csv":
                  cmd = LoadCSVDataCommand;
                  break;
                case "json":
                  cmd = LoadJSONDataCommand;
                  break;
                case "xml":
                  cmd = LoadXMLDataCommand;
                  break;
                default:
                  // If we can't recognize the format, try csv
                  cmd = LoadCSVDataCommand
                  break;
              }
                  

              const on_error = () => CommandInvoker.getInvoker().execute(new ShowErrorMessageCommand("File format not recognized", "Your file format was not recognized. Make sure your extension is correct (.csv, .json, .xml) and your file is not empty."));
              CommandInvoker.getInvoker().execute(new cmd(files[i], files[i].name, on_error));
            })
        }
        }

        // if at least one file was too large, show appropriate message to user
        if (limitReached) {
          CommandInvoker.getInvoker().execute(new ShowErrorMessageCommand("File was not loaded.",
              "File size limit (" + APPLICATION_CONFIG.fileSizeLimit + ") reached"));
        }

        //parse(files[0]);
      });
    });

    fileSelector.click();
  };
};

/**
 * Function that tries to guess the filetype of a file given name and contents using a couple of heuristics.
 * @param {*} filename The file's name. Useful for extentions.
 * @param {*} text The file's contents.
 */
const detectFiletype = (filename, text) => {
  if(filename.endsWith(".csv")) {
    return "csv"
  } else if(filename.endsWith(".xml") || text.startsWith("<")) {
    return "xml"
  } else  if(filename.endsWith(".json") || text.startsWith("{")) {
    return "json"
  } else {
    return undefined
  }
}

 /** General command that Loads a file from github and invokes a datacommand according to the given fileType (csv|json|xml).
 * @param fileType Type of the file that will be loaded.
 */
const LoadFileFromGithubCommand = function() {

  this.execute = function() {
    CommandInvoker.getInvoker().execute(new showGithubLoadFileChooserPanelCommand(async (filepaths) => { 
      await filepaths.forEach(async filepath => {
        try {
          const file_data = await GithubAPI.getContents(filepath.name, filepath.user, filepath.branch, filepath.path);
          if(!file_data.content) {
            CommandInvoker.getInvoker().execute(new ShowErrorMessageCommand("File was not loaded.",
            "File is invalid."));
            return;
          }

          let cmd;
          const fileType = detectFiletype(file_data.name, atob(file_data.content))

          switch (fileType) {
            case "csv":
              cmd = LoadCSVDataCommand;
              break;
            case "json":
              cmd = LoadJSONDataCommand;
              break;
            case "xml":
              cmd = LoadXMLDataCommand;
              break;
            default:
              // If we can't recognize the format, try csv
              cmd = LoadCSVDataCommand
              break;

          }

          if (APPLICATION_CONFIG.fileSizeLimit !== undefined && file_data.size > APPLICATION_CONFIG.fileSizeLimit) {
            CommandInvoker.getInvoker().execute(new ShowErrorMessageCommand("File was not loaded.",
                  "File size limit (" + APPLICATION_CONFIG.fileSizeLimit + " bytes) reached"));
          } else {
            const on_error = () => CommandInvoker.getInvoker().execute(new ShowErrorMessageCommand("File format not recognized", "Your file format was not recognized. Make sure your extension is correct (.csv, .json, .xml) and your file is not empty."));
            CommandInvoker.getInvoker().execute(new cmd(atob(file_data.content), file_data.name, on_error));
          }  
        } catch(e) {
          CommandInvoker.getInvoker().execute(new ShowErrorMessageCommand("File was not loaded.",
          "File is not found."));
        } 
    })   
    }));
  };
};

/*
 * Parses an XML file and adds it as a source
 */
const LoadXMLDataCommand = function (data, title) {

  function parse(file) {
    //console.log(title, file);
    const reader = new FileReader();
    //console.log("reader instantiated");
    // Closure to capture the file information.
    reader.onload = (function (e) {
      //console.log("reader onload",e);

      // transform to json
      const x2js = new X2JS();
      const result = x2js.xml_str2json(e.target.result); // parse
      console.log(result);
      // clean data to keys only
      const keysOnly = gatherKeys(result);
      console.log(keysOnly);
      // change to treeview data
      const treeData = [{value: title, open: true, data: generateTree(keysOnly, null, 1)}];
      console.log(treeData[0]);
      // add as a new source
      const source = {
        id: inputStore.getNewID(),
        type: "xml",
        title: title,
        headers: [],
        data: e.target.result,
        treeData: treeData
      };

      console.dir(source.treeData.data);

      if (APPLICATION_CONFIG.enableDataAnalysis) {
        CommandInvoker.getInvoker().execute(new AnalyseDataCommand(e.target.result, function (output, error) {
          source.analysis = output;
          CommandInvoker.getInvoker().execute(new AddSourceCommand(source));
        }));
      } else {
        CommandInvoker.getInvoker().execute(new AddSourceCommand(source));
      }
    });

    reader.readAsText(file);
  }

  this.execute = function () {
    parse(data);
  };

  // keep the keys (=properties) from a data file
  function gatherKeys(data) {
    if (!_.isObjectLike(data))
      return '';

    if (_.isArray(data)) {
      console.log(_.defaultsDeep.apply(_, data))
      return {
        '[*]': gatherKeys(_.defaultsDeep.apply(_, data))
      };
      //return { '[*]' : build(_.assign.apply(_, data)) };
    }

    const n = _.mapValues(data, function (value) {
      return gatherKeys(value);
    });

    return n;
  }

  function generateTree(keyData, path, id) {
    return _.map(keyData, function (val, key, col) {
      key = key.replace('_', '@');

      const currentPath = (path || '') + '/' + (key === "[*]" ? "*" : key);

      if (!_.isObjectLike(val)) {
        return {id: '' + id + key + Util.getRandomNumber(), value: key, path: currentPath};
      } else {
        if (val.hasOwnProperty("[*]")) {
          return {
            id: '' + id + key + Util.getRandomNumber(),
            value: key + " []",
            open: true,
            sdata: generateTree(val["[*]"], currentPath, id + 1),
            data: generateTree(val["[*]"], currentPath, id + 1),
            path: currentPath
          };
        }
      }
      return {
        id: '' + id + key + Util.getRandomNumber(),
        value: key,
        open: true,
        sdata: generateTree(val, currentPath, id + 1),
        data: generateTree(val, currentPath, id + 1),
        path: currentPath
      };
    });
  }
};

/*
 * Parses an JSON file and adds it as a source
 */
const LoadJSONDataCommand = function (data, title) {
  function parse(file) {
    const reader = new FileReader();
    reader.onload = (function (e) {
      //console.log("reader onload",e);
      const jsonData = JSON.parse(e.target.result);
      //console.log(jsonData);
      // clean data to keys only
      const keysOnly = gatherKeys(jsonData);
      //console.log(keysOnly);
      // change to treeview data
      const treeData = [{value: title, open: true, data: generateTree(keysOnly, '$', 1)}];

      console.log(treeData);
      // add as a new source
      const source = {
        id: inputStore.getNewID(),
        type: "json",
        title: title,
        headers: [],
        data: e.target.result,
        treeData: treeData
      };
      //console.log(source.treeData.data)

      CommandInvoker.getInvoker().execute(new AddSourceCommand(source));
    });
    reader.readAsText(file);
  }

  function loaded(evt) {
    const fileString = evt.target.result;
    const reader = new GraphMLReader();

    reader.read(fileString);

    CommandInvoker.getInvoker().execute(new HideDetailsCommand());
  }

  this.execute = function () {
    parse(data);
  };

  // keep the keys (=properties) from a data file
  function gatherKeys(data) {
    if (!_.isObjectLike(data))
      return '';

    if (_.isArray(data)) {
      return {
        '[*]': gatherKeys(_.defaultsDeep.apply(_, data))
      };
      //return { '[*]' : build(_.assign.apply(_, data)) };
    }

    const n = _.mapValues(data, function (value) {
      return gatherKeys(value);
    });
    return n;
  }

  function generateTree(keyData, path, id) {
    return _.map(keyData, function (val, key, col) {
      const currentPath = path + '.' + key;

      if (!_.isObjectLike(val)) {
        return {value: key, path: currentPath, id: '' + id + '-' + (new Date()).getTime() + '-' + key};
      } else {
        if (val.hasOwnProperty("[*]")) {
          return {
            id: '' + id + '-' + (new Date()).getTime() + '-' + key,
            value: key + ".[*]",
            open: true,
            data: generateTree(val["[*]"], currentPath + ".[*]", (id + 1)),
            path: currentPath + ".[*]"
          };
        }
      }

      return {id: '' + (id + 1), value: key, open: true, data: generateTree(val, currentPath, id++), path: currentPath};
    });
  }
};

const LoadCSVDataCommand = function (data, title, on_error, originalLocation ) {

  let specialID = false;

  function parseHeaders(csvHeaders) {
    const headers = [];

    for (let i in csvHeaders) {
      if (csvHeaders[i] === "id") {
        csvHeaders[i] = "_id";
        specialID = true;
      }

      headers.push({id: csvHeaders[i], header: csvHeaders[i]});
    }

    return headers;
  }

  function generateHeaderTree(headers) {
    let id = 1;
    const treeData = {
      id: '' + id,
      value: title,
      open: true,
      data: []
    };

    id++;

    headers.forEach(function (value) {
      treeData.data.push({
        id: '' + id,
        value: value.header,
        path: value.id
      });
      id++;
    });

    return treeData;
  }

  function parse(file) {
    //console.log(file);
    Papa.parse(file, {
      header: true,
      complete: function (results) {
        // We decide to return an error when we can't automatically detect a delimiter. It's a fair guess this file is invalid. It's certainly not useful.
        if(results.errors.find(err =>err.code === "UndetectableDelimiter")) {
          on_error(results.errors.find(err =>err.code === "UndetectableDelimiter"))
          return;
        }

        const headers = parseHeaders(results.meta.fields);
        const treeData = generateHeaderTree(headers);

        const source = {
          id: inputStore.getNewID(),
          title: title,
          headers: headers,
          data: results.data,
          type: "csv",
          treeData: [treeData],
          usedSpecialID: specialID,
          originalLocation: originalLocation
        };

        for (let i in source.data) {
          if (specialID) {
            source.data[i]._id = source.data[i].id;
          }

          source.data[i].id = (parseInt(i) + 1);
        }

        CommandInvoker.getInvoker().execute(new AddSourceCommand(source));
      }
    });
  }

  function loaded(evt) {
    const fileString = evt.target.result;
    const reader = new GraphMLReader(GraphModel.getModel(), InputModel.getModel());
    try {
      reader.read(fileString);
    } catch(e) {
      CommandInvoker.getInvoker().execute(new ShowErrorMessageCommand(
        "Invalid file", 
        "Your GraphML file could not be parsed. Please validate your GraphML."));
    }
    CommandInvoker.getInvoker().execute(new HideDetailsCommand());
  }

  this.execute = function () {
    parse(data);
  };

};

window.LoadCSVDataCommand = LoadCSVDataCommand;

/**
 * Command for loading a GraphMLDoc from github.
 */
class LoadGraphMLDocFromGithubCommand {
  execute() {
    CommandInvoker.getInvoker().execute(new showGithubLoadFileChooserPanelCommand(async (filepaths) => {
      await filepaths.forEach(async filepath => {
        const file_data = await GithubAPI.getContents(filepath.name, filepath.user, filepath.branch, filepath.path);
        const reader = new GraphMLReader();

        reader.read(atob(file_data.content));

        CommandInvoker.getInvoker().execute(new HideDetailsCommand());

    })
  }))
  }
}

/**
 * Command for loading a GraphML doc from your computer.
 */
const LoadGraphMLDocCommand = function () {

  function getAsText(readFile) {
    const reader = new FileReader();
    reader.readAsText(readFile, "UTF-8");
    reader.onload = loaded;
  }

  function loaded(evt) {
    const fileString = evt.target.result;
    //console.log(fileString);
    const reader = new GraphMLReader();

    try {
      reader.read(fileString);
    } catch(e) {
      CommandInvoker.getInvoker().execute(new ShowErrorMessageCommand(
        "Invalid file", 
        "Your GraphML file could not be parsed. Please validate your GraphML."));
    }

    CommandInvoker.getInvoker().execute(new HideDetailsCommand());
  }

  this.execute = function () {
    const fileSelector = $('<input type="file" />');

    fileSelector.on("change", function (evt) {
      const files = evt.target.files;
      getAsText(files[0]);
    });

    fileSelector.click();
  };
};
/**
 * Command for loading an RML doc from github.
 */
class LoadRMLFromGithubCommand {
  execute() {
    CommandInvoker.getInvoker().execute(new showGithubLoadFileChooserPanelCommand(async (filepaths) => {
      await filepaths.forEach(async filepath => {
        const file_data = await GithubAPI.getContents(filepath.name, filepath.user, filepath.branch, filepath.path);
        CommandInvoker.getInvoker().execute(new LoadRMLStringCommand(atob(file_data.content)));
      })
    }))
  }
}

/**
 * Command for loading an RML doc from your computer.
 */
const LoadRMLCommand = function () {

  function getAsText(readFile) {
    const reader = new FileReader();
    reader.readAsText(readFile, "UTF-8");
    reader.onload = loaded;
  }

  function loaded(evt) {
    CommandInvoker.getInvoker().execute(new LoadRMLStringCommand(evt.target.result));
  }

  this.execute = function () {
    const fileSelector = $('<input type="file" />');

    fileSelector.on("change", function (evt) {
      const files = evt.target.files;
      getAsText(files[0]);
    });

    fileSelector.click();
  };
};

/**
 * Command for parsing an RML string and loading it into the editor.
 */
const LoadRMLStringCommand = function(fileString) {

  console.log(fileString);

  this.execute = function () {
    const parser = N3.Parser();
    const quads = [];

    parser.parse(fileString, (err, quad, prefixes) => {
      if (quad) {
        quads.push(quad);
      } else if (err) {
        CommandInvoker.getInvoker().execute(new ShowErrorMessageCommand(
          "Invalid file", 
          "Your RML file could not be parsed. Please validate your RML."));
      } else {
        const store = N3.Store();
        store.addQuads(quads);
        const rmlreader = new RMLReader(store);

        rmlreader.read();
        CommandInvoker.getInvoker().execute(new HideDetailsCommand());
      }
    });

  }
};
window.LoadRMLStringCommand = LoadRMLStringCommand

const LoadRMLWithoutGraphMLCommand = function(rmlStore) {

  this.execute = function () {
    const reader = new RMLReader(rmlStore);
    reader.read();
  }
};


const LoadOntologyCommand = function (callback) {

  function getAsText(readFile) {
    const reader = new FileReader();
    reader.readAsText(readFile, "UTF-8");
    reader.onload = loaded;
  }

  function loaded(evt) {
    const parser = N3.Parser();
    const store = N3.Store();

    parser.parse(evt.target.result, (err, quad) => {
      if (quad) {
        store.addQuad(quad);
      } else {
        callback(store);
      }
    });
  }

  this.execute = function () {
    const fileSelector = $('<input type="file" />');

    fileSelector.on("change", function (evt) {
      const files = evt.target.files;
      getAsText(files[0]);
    });

    fileSelector.click();
  };
};

/**
 * Function that generates a command.
 * Returns a function that will gather the graphml data and export it via the function given as argument
 * @param {*} exporter Function that receives graphML data for export.
 */
const getGraphMLExecute = (exporter) =>
 function() {
  const cb = function (fixForRunning) {
    const callback = function (sourcesPaths) {
      CommandInvoker.getInvoker().execute(new ConvertGraphToGraphMLCommand(sourcesPaths, fixForRunning, true, function (graphml) {
        exporter(graphml, 'mapping.xml')
      }));
    };

    CommandInvoker.getInvoker().execute(new ShowDefineSourcesPathPanelCommand(callback));
  };

  CommandInvoker.getInvoker().execute(new ShowFixForRunningDialogCommand(cb));

}

const SaveGraphMLDocCommand = function () {
  this.execute = getGraphMLExecute(download)
};

const SaveGraphMLDocToGithubCommand = function () {
  this.execute = getGraphMLExecute(toGithub)
};

const SaveOriginalResultsCommand = function (serialization="nquads", extension="ttl") {
  this.execute = () => executeRules((data) => download(data.output, `results.${extension}`), serialization)
};

const SaveOriginalResultsToGithubCommand = function (serialization="nquads", extension="ttl") {
  this.execute = () => executeRules((data) => toGithub(data.output, `results.${extension}`), serialization)
};

/**
 * Calls API to execute the RML mapping on the given sources
 * @param {*} callback Function that will get called with the resulting data
 * @param {*} serialization Encoding of the resulting data
 */
const executeRules = function (callback, serialization="nquads") {

  const popup = webix.ui({
    id: "runmapping_popup_execute",
    view: "popup",
    height: 75,
    width: 250,
    minWidth: 250,
    position: "center",
    head: "My Window",
    body: UIBuilder.getNoButtonModal("Mapping is running, please wait..."),
    modal: true
  });

  popup.show();

  CommandInvoker.getInvoker().execute(new PrepareSourcesForRMLMapperCommand(preparedSources => {
    const rmlWriter = new RMLWriter(preparedSources, graphStore.getState().nodes, graphStore.getState().edges);

    rmlWriter.write(rmlStr => {
      $.ajax({
        type: "POST",
        url: APPLICATION_CONFIG.rmlprocessor.url + "/execute",
        data: JSON.stringify({
          rml: rmlStr,
          sources: preparedSources,
          generateMetadata: false,
          asQuads: false,
          serialization
        }),
        contentType: 'application/json; charset=utf-8',
        success: (data) => { $$("runmapping_popup_execute").close(); callback(data)},

        error: function (jqXHR, error) {
          $$("runmapping_popup_execute").close();

          let message = 'We could not execute the mapping with the remote RMLMapper.';

          if (jqXHR.status === 0 ) {
            message = 'We could not find the remote RMLMapper. Is the server online?';
          } else if (jqXHR.status === 500) {
            message = 'Internal server when executing the remote RMLMapper.';
          }

          CommandInvoker.getInvoker().execute(new ShowErrorMessageCommand("Problem with RMLMapper", message));
        }
      })

    });
  }));
}

window.executeRules = executeRules
console.log(executeRules)
/**
 * Exporter function used to download data to your PC.
 * @param {*} data 
 * @param {*} filename 
 */
const download = (data, filename) => {
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
  element.setAttribute('download', filename);
  element.click();
}

/**
 * Function to write data + sources to the exporter
 * @param {*} preparedSources sources decided by user 
 * @param {*} exporter exporting function that receives written data 
 */
const writeRML = (preparedSources, exporter) => {
  const rmlWriter = new RMLWriter(preparedSources, graphStore.getState().nodes, graphStore.getState().edges);

      rmlWriter.write(rmlStr => {
        Util.getPrettyRML(rmlStr, function (err, result) {
          console.log(result);

          exporter(result, "mapping.rml.ttl");
        });
      });
}

/**
 * Function that generates a command.
 * Returns a function that will gather the RML data and export it via the function given as argument
 * @param {*} exporter Function that receives RML data for export.
 */
const SaveRMLDocCommand = function (exporter=download) {

  this.execute = function () {
    CommandInvoker.getInvoker().execute(new ShowDefineSourcesPathPanelCommand(preparedSources => {
      console.log(preparedSources)
        writeRML(preparedSources, exporter)
    }));
  };
};

window.writeRML = writeRML

/**
 * Exporter function used to upload data to Github
 * @param {*} data 
 * @param {*} default_filename 
 */
const toGithub = (data, default_filename) => {
  CommandInvoker.getInvoker().execute(new showGithubSaveFileChooserPanelCommand(async (file_paths) => {
    const file_path = file_paths[0];
    await GithubAPI.postFile(file_path.name, file_path.user, file_path.branch, file_path.path, data)
  }, default_filename));
}



const LoadLocalPreferencesCommand = function () {

  this.execute = function () {
    if (typeof(Storage) !== "undefined") {
      const pref = localStorage.getItem("preferences");

      if (pref) {
        preferenceActions.load(pref);
      } else {
        console.log("No previous preferences found.");
      }
    } else {
      console.warn('LocalStorage is not available in your browser.')
    }
  };
};

const LoadLocalNamespacesCommand = function () {

  this.execute = function () {
    if (typeof(Storage) !== "undefined") {
      const ns = localStorage.getItem("namespaces");

      if (ns) {
        namespacesActions.addNamespaces(JSON.parse(ns));
      } else {
        console.log("No previous namespaces found.");
      }
    } else {
      console.warn('LocalStorage is not available in your browser.')
    }
  };
};

const LoadFunctionsCommand = function () {

  this.execute = function () {
    const functions = [];

    $.ajax({
      type: "GET",
      url: APPLICATION_CONFIG.functions.url,
      success: function (data) {
        const parser = N3.Parser();
        const store = N3.Store();

        parser.parse(data,
          function (error, quad, prefixes) {
            if (quad)
              store.addQuad(quad);
            else {
              const fns = store.getQuads(null, namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'), namedNode('http://semweb.datasciencelab.be/ns/function#Function'));

              for (let i = 0; i < fns.length; i++) {
                const fn = fns[i];
                const names = store.getQuads(fn.subject, namedNode('http://www.w3.org/2000/01/rdf-schema#label'), null);
                let name;

                if (names.length > 0) {
                  name = names[0].object.value;
                } else {
                  name = fn.subject.value;
                }

                const funct = {
                  id: fn.subject.value,
                  name,
                  parameters: getParameters(store, fn.subject.value)
                };

                functions.push(funct);
              }

              console.log(functions);
              functionsActions.setFunctions(functions);
            }
          });
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.alert('functions.tll not found on the server.');
        // var message =  "The server with the RMLProcessor was not found. Mapping couldn't be loaded.";
        // var title = "Processor Not Found";
        //
        // if (XMLHttpRequest && XMLHttpRequest.status == 400) {
        //   message = XMLHttpRequest.responseText;
        //   title = 'Error While Importing Mapping';
        // }
        //
        // CommandInvoker.getInvoker().execute(new ShowErrorMessageCommand(title, message));
      }
    });
  };

  function getParameters(store, subject) {
    const parameters = [];
    let keepGoing = true;

    const expects = store.getQuads(namedNode(subject), namedNode("http://semweb.datasciencelab.be/ns/function#expects"), null)[0];

    if (expects.object.value !== "http://www.w3.org/1999/02/22-rdf-syntax-ns#nil") {
      let first = store.getQuads(expects.object, namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#first"), null)[0];

      while (keepGoing) {
        if (store.getQuads(first.object, namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'), namedNode("http://semweb.datasciencelab.be/ns/function#Parameter")).length > 0) {
          const param = {label: store.getQuads(first.object, namedNode("http://www.w3.org/2000/01/rdf-schema#label"), null)[0].object.value};
          const predicate = store.getQuads(first.object, namedNode('http://semweb.datasciencelab.be/ns/function#predicate'), null);

          if (predicate.length > 0) {
            param.id = predicate[0].object.value;
            const types = store.getQuads(predicate[0].object, namedNode("http://semweb.datasciencelab.be/ns/function#type"), null);

            if (types.length > 0) {
              param.type = types[0].object.value
            }
          }

          parameters.push(param);
        }

        const rest = store.getQuads(first.subject, namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#rest"), null)[0];

        if (rest.object.value !== "http://www.w3.org/1999/02/22-rdf-syntax-ns#nil") {
          first = store.getQuads(rest.object, namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#first"), null)[0];
        } else {
          keepGoing = false;
        }
      }
    }

    return parameters;
  }
};
