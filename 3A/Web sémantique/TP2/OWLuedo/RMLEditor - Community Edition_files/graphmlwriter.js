const exrml = "http://semweb.mmlab.be/ns/exrml#";

const GraphMLWriter = function (sourcesPaths) {
  let paramCounter = 0;

  function validate(parameter, value) {
    if (value === null) {
      console.log(parameter + " is null. This is not good...");
    }
  }

  function writeKeys(xw) {
    xw.writeStartElement('key');
    xw.writeAttributeString('id', 'd0');
    xw.writeAttributeString('for', 'node');
    xw.writeAttributeString('attr.name', 'type');
    xw.writeAttributeString('attr.type', 'string');
    xw.writeStartElement('default');
    xw.writeString('resource');
    xw.writeEndElement();
    xw.writeEndElement();

    xw.writeStartElement('key');
    xw.writeAttributeString('id', 'd1');
    xw.writeAttributeString('for', 'node');
    xw.writeAttributeString('attr.name', 'class');
    xw.writeAttributeString('attr.type', 'string');
    xw.writeStartElement('default');
    xw.writeString('');
    xw.writeEndElement();
    xw.writeEndElement();

    xw.writeStartElement('key');
    xw.writeAttributeString('id', 'd2');
    xw.writeAttributeString('for', 'all');
    xw.writeAttributeString('attr.name', 'reference');
    xw.writeAttributeString('attr.type', 'string');
    xw.writeStartElement('default');
    xw.writeString('');
    xw.writeEndElement();
    xw.writeEndElement();

    //deprecated
    xw.writeStartElement('key');
    xw.writeAttributeString('id', 'd3');
    xw.writeAttributeString('for', 'edge');
    xw.writeAttributeString('attr.name', 'predicate');
    xw.writeAttributeString('attr.type', 'string');
    xw.writeStartElement('default');
    xw.writeString('');
    xw.writeEndElement();
    xw.writeEndElement();

    xw.writeStartElement('key');
    xw.writeAttributeString('id', 'd4');
    xw.writeAttributeString('for', 'all');
    xw.writeAttributeString('attr.name', 'template');
    xw.writeAttributeString('attr.type', 'string');
    xw.writeStartElement('default');
    xw.writeString('');
    xw.writeEndElement();
    xw.writeEndElement();

    xw.writeStartElement('key');
    xw.writeAttributeString('id', 'd5');
    xw.writeAttributeString('for', 'all');
    xw.writeAttributeString('attr.name', 'constant');
    xw.writeAttributeString('attr.type', 'string');
    xw.writeStartElement('default');
    xw.writeString('');
    xw.writeEndElement();
    xw.writeEndElement();

    xw.writeStartElement('key');
    xw.writeAttributeString('id', 'd6');
    xw.writeAttributeString('for', 'node');
    xw.writeAttributeString('attr.name', 'datatype');
    xw.writeAttributeString('attr.type', 'string');
    xw.writeStartElement('default');
    xw.writeString('');
    xw.writeEndElement();
    xw.writeEndElement();

    xw.writeStartElement('key');
    xw.writeAttributeString('id', 'd7');
    xw.writeAttributeString('for', 'all');
    xw.writeAttributeString('attr.name', 'source');
    xw.writeAttributeString('attr.type', 'string');
    xw.writeEndElement();

    xw.writeStartElement('key');
    xw.writeAttributeString('id', 'd8');
    xw.writeAttributeString('for', 'node');
    xw.writeAttributeString('attr.name', 'language');
    xw.writeAttributeString('attr.type', 'string');
    xw.writeEndElement();

    xw.writeStartElement('key');
    xw.writeAttributeString('id', 'd9');
    xw.writeAttributeString('for', 'edge');
    xw.writeAttributeString('attr.name', 'child');
    xw.writeAttributeString('attr.type', 'string');
    xw.writeEndElement();

    xw.writeStartElement('key');
    xw.writeAttributeString('id', 'd10');
    xw.writeAttributeString('for', 'edge');
    xw.writeAttributeString('attr.name', 'parent');
    xw.writeAttributeString('attr.type', 'string');
    xw.writeEndElement();

    xw.writeStartElement('key');
    xw.writeAttributeString('id', 'd11');
    xw.writeAttributeString('for', 'graph');
    xw.writeAttributeString('attr.name', 'time-created');
    xw.writeAttributeString('attr.type', 'string');
    xw.writeEndElement();

    //csv, json, xml
    xw.writeStartElement('key');
    xw.writeAttributeString('id', 'd12');
    xw.writeAttributeString('for', 'node');
    xw.writeAttributeString('attr.name', 'source-format');
    xw.writeAttributeString('attr.type', 'string');
    xw.writeEndElement();

    //applicable for json, xml
    xw.writeStartElement('key');
    xw.writeAttributeString('id', 'd13');
    xw.writeAttributeString('for', 'node');
    xw.writeAttributeString('attr.name', 'iterator');
    xw.writeAttributeString('attr.type', 'string');
    xw.writeEndElement();

    xw.writeStartElement('key');
    xw.writeAttributeString('id', 'd14');
    xw.writeAttributeString('for', 'node');
    xw.writeAttributeString('attr.name', 'completion');
    xw.writeAttributeString('attr.type', 'boolean');
    xw.writeEndElement();

    xw.writeStartElement('key');
    xw.writeAttributeString('id', 'd15');
    xw.writeAttributeString('for', 'node');
    xw.writeAttributeString('attr.name', 'verification');
    xw.writeAttributeString('attr.type', 'boolean');
    xw.writeEndElement();

    xw.writeStartElement('key');
    xw.writeAttributeString('id', 'd16');
    xw.writeAttributeString('for', 'node');
    xw.writeAttributeString('attr.name', 'function');
    xw.writeEndElement();

    
    xw.writeStartElement('key');
    xw.writeAttributeString('id', 'd17');
    xw.writeAttributeString('for', 'all');
    xw.writeAttributeString('attr.name', 'comment');
    xw.writeAttributeString('attr.type', 'string');
    xw.writeEndElement();

    xw.writeStartElement('key');
    xw.writeAttributeString('id', 'd18');
    xw.writeAttributeString('for', 'all');
    xw.writeAttributeString('attr.name', 'description');
    xw.writeAttributeString('attr.type', 'string');
    xw.writeEndElement();
  }

  const classes = [];

  function writeNodes(xw, fixForRunning, fixSpecialID) {
    const nodes = graphStore.getState().nodes;

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];

      console.log(node);

      xw.writeStartElement("node");

      validate('id', node.id);
      xw.writeAttributeString('id', node.id);

      xw.writeStartElement('data');
      xw.writeAttributeString('key', "d0");
      validate('node.type', node.type);
      xw.writeString(node.type);
      xw.writeEndElement();

      //class
      if ((node.type === "resource" || node.type === "blank") && node.className) {
        CommandInvoker.getInvoker().execute(new ExpandPrefixCommand(node.className, function (r) {
          classes.push({id: node.id, className: r});
        }));
      }

      //datatype
      if (node.type === "literal") {
        if (node.datatype) {
          CommandInvoker.getInvoker().execute(new ExpandPrefixCommand(node.datatype, function (r) {
            xw.writeStartElement('data');
            xw.writeAttributeString('key', "d6");
            validate('node.datatype', r);
            xw.writeString(r);
            xw.writeEndElement();
          }));
        }

        if (node.language) {
          xw.writeStartElement('data');
          xw.writeAttributeString('key', "d8");
          validate('node.language', node.language);
          xw.writeString(node.language);
          xw.writeEndElement();
        }

        xw.writeStartElement('data');
        xw.writeAttributeString('key', "14");
        validate('node.completion', node.completion);
        xw.writeString(node.completion ? "true" : "false");
        xw.writeEndElement();

        xw.writeStartElement('data');
        xw.writeAttributeString('key', "15");
        validate('node.completion', node.verification);
        xw.writeString(node.verification ? "true" : "false");
        xw.writeEndElement();

      }

      if(node.comment) {
        xw.writeStartElement('data');
        xw.writeAttributeString('key', "d17");
        xw.writeString(node.comment);
        xw.writeEndElement();
      } 
      if(node.description) {
        xw.writeStartElement('data');
        xw.writeAttributeString('key', "d18");
        xw.writeString(node.description);
        xw.writeEndElement();
      } 
      if (node.type !== "blank") {
        if (node.valueType === ValueTypes.CONSTANT) {
          xw.writeStartElement('data');
          xw.writeAttributeString('key', "d5");
          validate('node.constant', node.constant);
          xw.writeString(node.constant === undefined ? "" : node.constant);
          xw.writeEndElement();
        } else if (node.source) {
          xw.writeStartElement('data');
          xw.writeAttributeString('key', "d7");
          //xw.writeString(convertSourceID2Path(node.source.id));
          //xw.writeString(node.source.id);
          if (sourcesPaths && sourcesPaths[node.source.title]) {
            validate('node.source', sourcesPaths[node.source.title]);
            xw.writeString(sourcesPaths[node.source.title]);
          } else {
            validate('node.source', node.source.id);
            xw.writeString(node.source.id);
          }
          xw.writeEndElement();

          if (node.source.type) {
            xw.writeStartElement('data');
            xw.writeAttributeString('key', "d12");
            //xw.writeString(node.source.type);
            switch (node.source.type) {
              case 'csv':
                xw.writeString("CSV");
                break;
              case 'json':
                xw.writeString("JSONPath");
                break;
              case 'xml':
                xw.writeString("XPath");
                break;
            }
            xw.writeEndElement();
          }

          if (node.type === "resource" && node.iterator) {
            xw.writeStartElement('data');
            xw.writeAttributeString('key', "d13");
            xw.writeString(node.iterator);
            xw.writeEndElement();
          }
        }

        if (node.valueType === ValueTypes.TEMPLATE) {
          let temp = node.template;
          temp = temp.replace('{', '');
          temp = temp.replace('}', '');

          const open = node.template.indexOf("{");
          const close = node.template.indexOf("}");

          let treeData;

          if (node.source) {
            treeData = Util.getTreeDataOfReference(node.source, temp);
          }

          if (treeData && open === 0 && close === node.template.length - 1 && treeData && treeData.custom) {

            xw.writeStartElement('data');
            xw.writeAttributeString('key', "d16");

            console.log(treeData);

            //xw.writeStartElement('functionExecution');

            xw.writeStartElement('function');
            xw.writeString(treeData.function);
            xw.writeEndElement();

            xw.writeStartElement('values');

            for (let j = 0; j < treeData.values.length; j++) {
              switch (treeData.values[j].valueType) {
                case ValueTypes.TEMPLATE:
                  xw.writeStartElement('template');
                  break;
                case ValueTypes.CONSTANT:
                  xw.writeStartElement('constant');
                  break;
                case ValueTypes.REFERENCE:
                  xw.writeStartElement('reference');
                  break;
              }

              const fnParameters = functionsStore.getFunctionByID(treeData.function).parameters;
              const param = fnParameters[treeData.values[j].parameter - 1].id;


              xw.writeAttributeString('parameter', param);
              xw.writeAttributeString('id', paramCounter);
              paramCounter++;
              xw.writeString(treeData.values[j].theValue);
              xw.writeEndElement();
            }

            xw.writeEndElement();

            xw.writeEndElement();
          } else {

            CommandInvoker.getInvoker().execute(new ExpandPrefixCommand(node.template, function (r) {
              xw.writeStartElement('data');
              xw.writeAttributeString('key', 'd4');
              validate('node.template', r);

              if (fixSpecialID && node.source?.usedSpecialID) {
                xw.writeString(r.replace(/_id/g, "id"));
              } else {
                xw.writeString(r);
              }
              xw.writeEndElement();
            }));
          }

        } else {
          const treeData = Util.getTreeDataOfReference(node.source, node.reference);

          if (treeData.custom) {


            //xw.writeEndElement();
          } else {
            xw.writeStartElement('data');
            xw.writeAttributeString('key', "d2");
            validate('node.reference', node.reference);

            let v = node.reference;

            if (fixSpecialID && node.source?.usedSpecialID && node.reference === "_id") {
              v = "id";
            }

            if (node.source?.type !== 'csv' && node.type === 'literal') {
              const resource = graphStore.getEdgeWithNodeAsTarget(node.id).sourceNode;
              const temp = v.replace(resource.iterator, '');

              if (temp !== v) {
                v = v.substring(1);
              }
            }

            xw.writeString(v);
            xw.writeEndElement();
          }
        }
      } else {
        const literal = graphStore.getEdgesWithNodesAsSource(node.id)[0].targetNode;
        const s = literal.source;

        xw.writeStartElement('data');
        xw.writeAttributeString('key', "d7");

        if (sourcesPaths && sourcesPaths[s.title]) {
          validate('node.source', sourcesPaths[s.title]);
          xw.writeString(sourcesPaths[s.title]);
        } else {
          validate('node.source', s.id);
          xw.writeString(s.id);
        }

        xw.writeEndElement();

        if (s.type) {
          xw.writeStartElement('data');
          xw.writeAttributeString('key', "d12");
          //xw.writeString(node.source.type);
          switch (s.type) {
            case 'csv':
              xw.writeString("CSV");
              break;
            case 'json':
              xw.writeString("JSONPath");
              break;
            case 'xml':
              xw.writeString("XPath");
              break;
          }
          xw.writeEndElement();
        }
      }

      xw.writeEndElement();
    }
  }

  writeEdges = function (xw, fixForRunning, fixSpecialID) {
    const edges = graphStore.getState().edges;

    for (let i = 0; i < edges.length; i++) {
      const edge = edges[i];
      const source = graphStore.findNode(edge.sourceID);
      const target = graphStore.findNode(edge.targetID);

      xw.writeStartElement("edge");
      validate('edge.id', edge.id);
      xw.writeAttributeString('id', edge.id);
      validate('edge.sourceID', edge.sourceID);
      xw.writeAttributeString('source', edge.sourceID);
      validate('edge.targetID', edge.targetID);
      xw.writeAttributeString('target', edge.targetID);

      if (edge.sourceData) {
        xw.writeStartElement('data');
        xw.writeAttributeString('key', "d7");
        if (sourcesPaths && sourcesPaths[edge.sourceData.title]) {
          validate('edge.sourceData', sourcesPaths[edge.sourceData.title]);
          xw.writeString(sourcesPaths[edge.sourceData.title]);
        } else {
          validate('edge.sourceData', edge.sourceData.id);
          xw.writeString(edge.sourceData.id);
        }

        xw.writeEndElement();

        if (edge.sourceData.type) {
          xw.writeStartElement('data');
          xw.writeAttributeString('key', "d12");
          xw.writeString(edge.source.type);
          xw.writeEndElement();
        }

        if (edge.iterator) {
          xw.writeStartElement('data');
          xw.writeAttributeString('key', "d13");
          xw.writeString(edge.iterator);
          xw.writeEndElement();
        }
      }

      CommandInvoker.getInvoker().execute(new ExpandPrefixCommand(edge.template, function (r) {
        xw.writeStartElement('data');

        if (Util.getReferencesOfTemplate(edge.template).length > 0) {
          xw.writeAttributeString('key', 'd4');
        } else {
          xw.writeAttributeString('key', 'd5');
        }

        validate('edge.template', r);

        if (fixSpecialID && source.usedSpecialID) {
          xw.writeString(r.replace(/_id/g, "id"));
        } else {
          xw.writeString(r);
        }

        xw.writeEndElement();
      }));

      //join condition
      if (source && target && source.type === "resource" && target.type === "resource" && !edge.conditions.join.all) {
        xw.writeStartElement('data');
        xw.writeAttributeString('key', "d9");
        validate('edge.conditions.join.child', edge.conditions.join.child);

        if (source.source?.type !== "csv") {
          xw.writeString(edge.conditions.join.child.replace(source.iterator, "").substring(1));
        } else {
          xw.writeString(edge.conditions.join.child);
        }

        xw.writeEndElement();

        xw.writeStartElement('data');
        xw.writeAttributeString('key', "d10");
        validate('edge.conditions.join.parent', edge.conditions.join.parent);

        if (target.source?.type !== "csv") {
          console.log(edge.conditions.join.parent.replace(target.iterator, ""));
          xw.writeString(edge.conditions.join.parent.replace(target.iterator, "").substring(1));
        } else {
          xw.writeString(edge.conditions.join.parent);
        }

        //xw.writeString(edge.conditions.join.parent);
        xw.writeEndElement();
      }

      if(edge.comment) {
        xw.writeStartElement('data');
        xw.writeAttributeString('key', "d17");
        xw.writeString(edge.comment);
        xw.writeEndElement();
      } 
      if(edge.description) {
        xw.writeStartElement('data');
        xw.writeAttributeString('key', "d18");
        xw.writeString(edge.description);
        xw.writeEndElement();
      } 

      xw.writeEndElement();
    }
  };

  this.write = function (fixForRunning, fixSpecialID) {
    const xw = new XMLWriter('UTF-8');
    xw.formatting = 'indented';//add indentation and newlines
    xw.indentChar = ' ';//indent with spaces
    xw.indentation = 2;//add 2 spaces per level

    xw.writeStartDocument();
    //xw.writeDocType('"items.dtd"');
    xw.writeStartElement('graphml');
    //TODO:need to enable it later!
    //xw.writeAttributeString( 'xmlns', 'http://graphml.graphdrawing.org/xmlns');
    //xw.writeAttributeString( 'xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance');
    //xw.writeAttributeString( 'xsi:schemaLocation', 'http://graphml.graphdrawing.org/xmlns http://graphml.graphdrawing.org/xmlns/1.0/graphml.xsd');

    writeKeys(xw);

    xw.writeStartElement('graph');
    const now = new Date();
    xw.writeStartElement('data');
    xw.writeAttributeString('key', "d11");
    xw.writeString(now.toISOString());
    xw.writeEndElement();

    writeNodes(xw, fixForRunning, fixSpecialID);
    writeEdges(xw, fixForRunning, fixSpecialID);

    for (let i = 0; i < classes.length; i++) {
      const c = classes[i];

      xw.writeStartElement("node");
      xw.writeAttributeString('id', "cn_" + c.id);

      xw.writeStartElement('data');
      xw.writeAttributeString('key', "d0");
      xw.writeString("resource");
      xw.writeEndElement();

      xw.writeStartElement('data');
      xw.writeAttributeString('key', "d5");
      validate('c.className', c.className);
      xw.writeString(c.className);
      xw.writeEndElement();
      xw.writeEndElement();

      xw.writeStartElement("edge");
      xw.writeAttributeString('id', "ce_" + c.id);
      xw.writeAttributeString('source', c.id);
      xw.writeAttributeString('target', "cn_" + c.id);

      xw.writeStartElement('data');
      xw.writeAttributeString('key', "d5");
      xw.writeString("http://www.w3.org/1999/02/22-rdf-syntax-ns#type");
      xw.writeEndElement();
      xw.writeEndElement();
    }

    xw.writeEndElement();

    xw.writeEndElement();
    xw.writeEndDocument();

    const r = xw.flush();

    console.log(r);

    return r;
  };
};
