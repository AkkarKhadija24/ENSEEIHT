var GraphMLReader = function () {
  var reader = this;

  function getSource(mappingSources, mappingSource) {
    console.log(mappingSources);
    let i = 0;

    while (i < mappingSources.length && mappingSources[i].name !== mappingSource) {
      i++;
    }

    if (i < mappingSources.length) {
      console.log(inputStore.getSourceByTitle(mappingSources[i].source));
      return inputStore.getSourceByTitle(mappingSources[i].source);
    }
  }

  function readSources($nodes, callback) {
    var mappingSources = [];
    var counter = 1;

    for (var i = 0; i < $nodes.length; i++) {
      var $node = $nodes[i];
      var node = {id: $node.attributes.id.nodeValue};
      var $datas = $($.parseXML($node.outerHTML)).find("data");

      var j = 0;

      while (j < $datas.length && $datas[j].attributes.key.nodeValue !== "d7") {
        j++;
      }

      if (j < $datas.length) {
        var k = 0;

        while (k < mappingSources.length && mappingSources[k].name !== $datas[j].innerHTML) {
          k++;
        }

        if (k >= mappingSources.length) {
          mappingSources.push({id: counter, name: $datas[j].innerHTML});
          counter++;
        }
      }
    }

    console.log(mappingSources);

    CommandInvoker.getInvoker().execute(new ShowConnectSourcesPanelCommand(mappingSources, callback));
  }

  this.read = function (graphml, mappingSources) {
   graphActions.clear();

    var xmlDoc = $.parseXML(graphml);
    var $xml = $(xmlDoc);
    var $nodes = $xml.find("node");
    var $edges = $xml.find("edge");
    var customCounter = 0;

    var callback = function (mappingSources) {

      for (var i = 0; i < $nodes.length; i++) {
        var $node = $nodes[i];
        var node = {id: $node.attributes.id.nodeValue};
        var $datas = $($.parseXML($node.outerHTML)).find("data");

        for (var j = 0; j < $datas.length; j++) {
          var $data = $datas[j];
          var key = $data.attributes.key.nodeValue;

          if (key === "d0") {
            node.type = $data.innerHTML;
          } else if (key === "d1") {
            CommandInvoker.getInvoker().execute(new CollapsePrefixCommand($data.innerHTML, function (r) {
              node.className = r;
            }));
          } else if (key === "d2") {
            node.valueType = ValueTypes.TEMPLATE;
            node.template = `{${$data.innerHTML}}`;

          } else if (key === "d4") {
            node.valueType = ValueTypes.TEMPLATE;
            CommandInvoker.getInvoker().execute(new CollapsePrefixCommand($data.innerHTML, function (r) {
              node.template = r;
            }));
          } else if (key === "d5") {
            node.valueType = ValueTypes.TEMPLATE;

            CommandInvoker.getInvoker().execute(new CollapsePrefixCommand($data.innerHTML, function (r) {
              node.template = r;
            }));
          } else if (key === "d6") {
            CommandInvoker.getInvoker().execute(new CollapsePrefixCommand($data.innerHTML, function (r) {
              node.datatype = r;
            }));
          } else if (key === "d7") {
            node.source = getSource(mappingSources, $data.innerHTML);
          } else if (key === "d8") {
            node.language = $data.innerHTML;
          } else if (key === "d13") {
            node.iterator = $data.innerHTML;
          } else if (key === "d16") {
            node.custom = true;
            node.reference = 'custom_' + customCounter;
            customCounter ++;

            if (node.source.type === 'csv') {
              var treeData = node.source.treeData;
              var customData = { value:node.reference, path: node.reference, values: [], custom: true, function: $($.parseXML($data.outerHTML)).find("function")[0].innerHTML};

              var $values = $($.parseXML($data.outerHTML)).find("values")[0];

              function addValues(data, valueType){
                for (var k = 0; k < data.length; k++) {
                  var d = data[k];

                  customData.values.push({valueType: valueType, theValue: d.innerHTML, parameter: functionsStore.getParameterIndexByID(customData.function, d.attributes.parameter.nodeValue) + 1});
                }
              }

              //process references
              var $references = $($.parseXML($values.outerHTML)).find("reference");
              addValues($references, ValueTypes.REFERENCE);

              //process templates
              var $templates = $($.parseXML($values.outerHTML)).find("template");
              addValues($templates, ValueTypes.TEMPLATE);

              //process constants
              var $constants = $($.parseXML($values.outerHTML)).find("constant");
              addValues($constants, ValueTypes.CONSTANT);


              treeData[0].data.unshift(customData);
              inputActions.updateTreeData(node.source.id, treeData);

              $$('input-' + node.source.id + '-tree').add(customData, 0, "1");
            }
          } else if (key == "d17") {
            node.comment = $data.innerHTML;
          }else if (key == "d18") {
            node.description = $data.innerHTML;
          }
        }

        if (node.source)  {
          if (node.source.type === 'csv') {
            if (node.valueType === ValueTypes.TEMPLATE) {
              node.template = node.template.replace(/\{id\}/g, "{_id}");
            } else if (node.valueType === ValueTypes.REFERENCE && node.reference === "id") {
              node.reference = "_id";
            }
          } else if (node.source.type === 'json' && node.iterator) {
            node.iterator = node.iterator.replace(/([^.])\[\*\]/g, "$1.[*]");
          }
        }

        graphActions.addNode(node, true);
      }

      for (var i = 0; i < $edges.length; i++) {
        var $edge = $edges[i];
        var edge = {
          id: $edge.attributes.id.nodeValue,
          sourceID: $edge.attributes.source.nodeValue,
          targetID: $edge.attributes.target.nodeValue,
          conditions: {
            join: {
              all: true
            }
          }
        };

        var $datas = $($.parseXML($edge.outerHTML)).find("data");

        for (var j = 0; j < $datas.length; j++) {
          var $data = $datas[j];

          var key = $data.attributes.key.nodeValue;

          //deprecated
          if (key === "d3") {
            edge.predicate = $data.innerHTML;
          } else if (key === "d2") {
            edge.valueType = ValueTypes.TEMPLATE;
            edge.template = `{${$data.innerHTML}}`;
          } else if (key === "d4") {
            edge.valueType = ValueTypes.TEMPLATE;

            CommandInvoker.getInvoker().execute(new CollapsePrefixCommand($data.innerHTML, function (r) {
              edge.template = r;
            }));
          } else if (key === "d5") {
            edge.valueType = ValueTypes.TEMPLATE;

            CommandInvoker.getInvoker().execute(new CollapsePrefixCommand($data.innerHTML, function (r) {
              edge.template = r;
            }));
          } else if (key === "d7") {
            edge.source = getSource(mappingSources, $data.innerHTML);
          } else if (key === "d9") {
            edge.conditions.join.child = $data.innerHTML;
            edge.conditions.join.all = false;
          } else if (key === "d10") {
            edge.conditions.join.parent = $data.innerHTML;
            edge.conditions.join.all = false;
          } else if (key === "d13") {
            node.iterator = $data.innerHTML;
          } else if (key == "d17") {
            edge.comment = $data.innerHTML;
          }else if (key == "d18") {
            edge.description = $data.innerHTML;
          }
        }

        if (edge.source && edge.source.type === 'csv')  {
          if (edge.valueType === ValueTypes.TEMPLATE) {
            edge.template = edge.template.replace(/\{id\}/g, "{_id}");
          } else if (edge.valueType === ValueTypes.REFERENCE && edge.reference === "id") {
            edge.reference = "_id";
          }
        }

        if (edge.conditions.join.child) {
          var node = graphStore.findNode(edge.sourceID);

          if (node.source && node.source.type !== 'csv') {
            var separator = node.source.type === 'xml' ? '/' : '.';
            edge.conditions.join.child = node.iterator + separator + edge.conditions.join.child;
          }
        }

        if (edge.conditions.join.parent) {
          var node = graphStore.findNode(edge.targetID);

          if (node.source && node.source.type !== 'csv') {
            var separator = node.source.type === 'xml' ? '/' : '.';
            edge.conditions.join.parent = node.iterator + separator + edge.conditions.join.parent;
          }
        }

        // The template has been collapsed previously.
        if (edge.template === "rdf:type" && !graphStore.findNode(edge.sourceID).className) {
          const n = graphStore.findNode(edge.sourceID);
          CommandInvoker.getInvoker().execute(new CollapsePrefixCommand(graphStore.findNode(edge.targetID).template, function (r) {
            graphActions.updateNode(n.id, {className:r});
            graphActions.removeNode(edge.targetID);
          }));

        } else {
          graphActions.addEdge(edge, true);
        }
      }

      // update attributes' iterators
      var allNodes = graphStore.getState().nodes;

      for (var i = 0; i < allNodes.length; i ++) {
        var n = allNodes[i];

        if (n.type === 'literal' && n.source && n.source.type !== 'csv') {
          var iterator = graphStore.getEdgeWithNodeAsTarget(n.id).sourceNode.iterator;

          graphActions.updateNode(n.id, {iterator: iterator});
        }
      }

      if (allNodes.length >= APPLICATION_CONFIG.graph.detailLevels.LOW) {
        graphActions.setDetailLevel(GraphDetailLevels.LOW);
        $$(UIBuilder.ids.modeling.DETAIL_LEVELS).setValue(2);
      }

      graphActions.buildGraph(false);
    };

    if (mappingSources) {
      callback(mappingSources);
    } else {
      readSources($nodes, callback);
    }
  };
};