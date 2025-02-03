var popupShown = false;

function ModelingController(viewID) {
  var self = this;
  this.viewID = viewID;
  this.backgroundClicked = false;
  this.forceStopped = false;

  visibleGraphStore.listen(function () {
    function update(type, id) {

      if (id !== undefined) {
        switch (type) {
          case GraphUpdateTypes.NODE_ADDED:
            self.addNode(visibleGraphStore.findNode(id));
            //CommandInvoker.getInvoker().execute(new ValidateMappingCommand());
            break;
          case GraphUpdateTypes.EDGE_ADDED:
            self.addEdge(visibleGraphStore.findEdge(id));
            //CommandInvoker.getInvoker().execute(new ValidateMappingCommand());
            break;
          case GraphUpdateTypes.NODE_DELETED:
            self.removeNode(id);
            //CommandInvoker.getInvoker().execute(new ValidateMappingCommand());
            break;
          case GraphUpdateTypes.NODE_UPDATED:
            self.updateNode(visibleGraphStore.findNode(id));
            break;
          case GraphUpdateTypes.EDGE_UPDATED:
            self.updateEdge(visibleGraphStore.findEdge(id));
            break;
          case GraphUpdateTypes.EDGE_DELETED:
            self.removeEdge(id);
            //CommandInvoker.getInvoker().execute(new ValidateMappingCommand());
            break;
          default:
          //console.log("type '" + type + "' is not supported.");
        }
      }
    }

    var updates = visibleGraphStore.getState().latestUpdates;
    for (var i = 0; i < updates.length; i++) {
      update(updates[i].type, updates[i].id);
    }
  });

  this.radius = 45;
  this.nodes = [];
  this.links = [];

  this.mousedown_node = null;
  this.zoomData = {translate: [0,0], scale: 1}

}

ModelingController.prototype = {
  setUp: function (parent) {
    var self = this;

    view = parent.$view;
    width = parent.$width;
    height = parent.$height;

    var color = d3.scale.category10();

    var svg = d3.select(view).append("svg")
      .attr("width", width)
      .attr("height", height);

    this.svg = svg;
    this.$view = view;

    this.svgWOG = svg;
    this.svg = this.svg.append("g");

    this.dragline = this.svgWOG.append("g").append('svg:path')
      .attr('class', 'link dragline')
      .attr('d', 'M0,0L0,0')
      .style('marker-end', 'url(#mark-end-arrow)');

    var s = this.svg;
    // initial zoom
    s.attr("transform", "translate(" + this.zoomData.translate + ")scale(" + this.zoomData.scale + ")");


    var zoom = d3.behavior.zoom()
      .scaleExtent([.1, 10])

      this.zoom = zoom
      zoom.scale(this.zoomData.scale)
      zoom.translate(this.zoomData.translate)
    this.startZoomPan();
    function mousedown() {

      if (!self.mousedown_node) {
      }

      event.preventDefault();
    }

    function mouseup() {
      // self.svgWOG.call(zoom).on("dblclick.zoom", null);
      self.svg.selectAll('.node').call(self.drag);

      //console.log(d3.select(this));

      if (self.clickedAddLink && self.mouseup_node) {
        console.log(self.mouseup_node)
        if (self.mousedown_node !== self.mouseup_node && !self.mouseup_node.self_edge && self.mouseup_node.type !== "edge") {
          console.log(self.mousedown_node);
          CommandInvoker.getInvoker().execute(new AddNewEdgeCommand({
            sourceID: self.mousedown_node.id,
            targetID: self.mouseup_node.id,
            selected: true
          }));
        }
      }

      self.clickedAddLink = false;
      self.mousedown_node = null;
      self.dragline.classed('hidden', true);
    }

    function mousemove() {
      if (self.clickedAddLink) {
        var x, y;

        if (self.mousedown_node.x.type === 'literal') {
          x = 63;
          y = -25;
        } else {
          x = 45;
          y = -15;
        }

        var pt = d3.mouse(this);
        self.dragline.attr('d', 'M' + pt[0] + ',' + pt[1] + 'L' + (self.mousedown_node.x + x) + ',' + (self.mousedown_node.y + y));
        event.preventDefault();
      }
      event.preventDefault();
    }

    this.svgWOG.on("mousedown", mousedown);
    this.svgWOG.on("mouseup", mouseup);
    this.svgWOG.on("mousemove", mousemove);

    function pan(offsetX, offsetY) {
      var x = zoom.translate()[0] + offsetX;
      var y = zoom.translate()[1] + offsetY;
      var s = zoom.scale();

      self.zoomData = {translate: [x,y], scale: s}
      self.svg.attr("transform", "translate(" + x + " " + y + ") scale(" + s + ")");
      zoom.translate([x, y]);
    }
    this.pan = pan
    //create pan buttons
    var btnUp = svg.append("g");
    btnUp.append("rect")
      .attr("fill", "blue")
      .attr("x", 20)
      .attr("y", 1)
      .attr("rx", 5)
      .attr("ry", 5)
      .attr("width", 20)
      .attr("height", 20);
    btnUp.append("text")
      .attr("fill", "white")
      .attr("x", 30)
      .attr("y", 20)
      .style("text-anchor", "middle")
      .style("font-weight", "bold")
      .attr("width", 20)
      .attr("height", 20)
      .text("^");

    btnUp.on("mouseup", function () {
      pan(0, -50);
    });

    var btnDown = svg.append("g");
    btnDown.append("rect")
      .attr("fill", "blue")
      .attr("x", 20)
      .attr("y", 40)
      .attr("rx", 5)
      .attr("ry", 5)
      .attr("width", 20)
      .attr("height", 20);
    btnDown.append("text")
      .attr("fill", "white")
      .attr("x", 30)
      .attr("y", 55)
      .style("text-anchor", "middle")
      .style("font-weight", "bold")
      .attr("width", 20)
      .attr("height", 20)
      .text("v");

    btnDown.on("mouseup", function () {
      pan(0, 50);
    });

    var btnLeft = svg.append("g");
    btnLeft.append("rect")
      .attr("fill", "blue")
      .attr("x", 1)
      .attr("y", 20)
      .attr("rx", 5)
      .attr("ry", 5)
      .attr("width", 20)
      .attr("height", 20);
    btnLeft.append("text")
      .attr("fill", "white")
      .attr("x", 10)
      .attr("y", 35)
      .style("text-anchor", "middle")
      .style("font-weight", "bold")
      .attr("width", 20)
      .attr("height", 20)
      .text("<");

    btnLeft.on("mouseup", function () {
      pan(-50, 0);
    });

    var btnRight = svg.append("g");
    btnRight.append("rect")
      .attr("fill", "blue")
      .attr("x", 40)
      .attr("y", 20)
      .attr("rx", 5)
      .attr("ry", 5)
      .attr("width", 20)
      .attr("height", 20);
    btnRight.append("text")
      .attr("fill", "white")
      .attr("x", 50)
      .attr("y", 35)
      .style("text-anchor", "middle")
      .style("font-weight", "bold")
      .attr("width", 20)
      .attr("height", 20)
      .text(">");

    btnRight.on("mouseup", function () {
      pan(50, 0);
    });

    svg.append('svg:defs').append('svg:marker')
      .attr('id', 'end-arrow')
      //.attr('viewBox', '0 -5 10 10')
      .attr('refX', 9)
      .attr('refY', 6)
      .attr('markerWidth', 20)
      .attr('markerHeight', 20)
      .attr('orient', 'auto')
      .append('svg:path')
      .attr('d', 'M0,0 L0,12 L18,6 z')
      .attr('fill', '#000');

    svg.append('svg:defs').append('svg:marker')
      .attr('id', 'start-arrow')
      //.attr('viewBox', '0 -5 10 10')
      .attr('refX', 9)
      .attr('refY', 6)
      .attr('markerWidth', 20)
      .attr('markerHeight', 20)
      .attr('orient', 'auto')
      .append('svg:path')
      .attr('d', 'M0,0 L0,12 L18,6 z')
      .attr('fill', '#000');

    svg.on("contextmenu", function () {
      var mouseX = d3.mouse(this)[0];
      var mouseY = d3.mouse(this)[1];

      if (!self.backgroundClicked) {
        //myNodes.on('mousedown.drag', draggable ? null : dragCallback);
        self.backgroundClicked = true;

        var closeFn = function (id, e, node) {
          $$("my_popup").close();
          self.backgroundClicked = false;
        };

        var callback = function (nodeID) {
          //CommandInvoker.getInvoker().execute(new SelectNodeCommand(nodeID));
          //CommandInvoker.getInvoker().execute(new UnselectAllEdgesCommand());
          //CommandInvoker.getInvoker().execute(new ShowDetailsNodeCommand(graphStore.findNode(nodeID)));
        };

        var literalFn = function (id, e, node) {
          CommandInvoker.getInvoker().execute(new AddNewLiteralNodeCommand({selected: true}, callback));
          closeFn();
        };

        var resourceFn = function (id, e, node) {
          CommandInvoker.getInvoker().execute(new AddNewResourceNodeCommand({selected: true}, callback));
          closeFn();
        };

        var blankFn = function (id, e, node) {
          CommandInvoker.getInvoker().execute(new AddNewBlankNodeCommand({selected: true}, callback));
          closeFn();
        };

        var deselectFn = function (id, e, node) {
          CommandInvoker.getInvoker().execute(new UnselectCompleteGraphCommand());
          CommandInvoker.getInvoker().execute(new HighlightInputCommand());
          CommandInvoker.getInvoker().execute(new HideDetailsCommand());
          closeFn();
        };

        var popUp = UIBuilder.getBackgroundContextMenu($$(self.viewID).$view.offsetTop + mouseY,
          $$(self.viewID).$view.offsetLeft + mouseX,
          resourceFn,
          literalFn,
          deselectFn,
          closeFn,
          blankFn);

        self.force.stop();

        popUp.show();
      }

      d3.event.preventDefault();
    });

    this.node = this.svg.selectAll(".node");
    this.link = this.svg.selectAll(".link");

    var tick = function () {

      self.node.selectAll(".node").each(e => {
        // This sometimes happens, and I do not know why. We reset this to prevent cascading failure.
        if(_.isNaN(e.x)) {
          e.x = 0
          console.warn("The x coordinate became NaN. Reset to 0.")
        }
        if(_.isNaN(e.y)) {
          e.y = 0
          console.warn("The y coordinate became NaN. Reset to 0.")
        }
      })

      self.link.selectAll(".edge").attr("x1", function (d) {
        return d.source.x;
      })
        .attr("y1", function (d) {
          return d.source.y;
        })
        .attr("x2", function (d) {
          return d.target.x;
        })
        .attr("y2", function (d) {
          return d.target.y;
        });

        self.link.selectAll(".singleedge-to")
          .attr("points", d => {
            // We want to spread the two edges equidistantly along the perpendicular line. This is the slope of the perpendicular line.
            const slope =  -(d.target.x - d.source.x) / (d.target.y - d.source.y) 
            const distance = 20
            let x_diff = Math.sqrt((distance * distance) / (1 + slope*slope))
            let y_diff = slope * x_diff
            
            // Eliminate switching behavior when y1 - y2 approx 0
            if(d.target.y > d.source.y) {
              x_diff *= -1
              y_diff *= -1
            }

            const middle_x = (d.source.x + x_diff + d.target.x + x_diff) / 2
            const middle_y = (d.source.y + y_diff + d.target.y + y_diff) / 2
            return `${d.source.x+x_diff},${d.source.y+y_diff} ${middle_x},${middle_y} ${d.target.x+x_diff},${d.target.y+y_diff}`
          })

        self.link.selectAll(".singleedge-from").attr("points", d => {
          // We want to spread the two edges equidistantly along the perpendicular line. This is the slope of the perpendicular line.
          const slope =  -(d.target.x - d.source.x) / (d.target.y - d.source.y) 
          const distance = 20
          let x_diff = Math.sqrt((distance * distance) / (1 + slope*slope))
          let y_diff = slope * x_diff

          // Eliminate switching behavior when y1 - y2 approx 0
          if(d.target.y > d.source.y) {
            x_diff *= -1
            y_diff *= -1
          }

          const middle_x = (d.source.x - x_diff + d.target.x - x_diff) / 2
          const middle_y = (d.source.y - y_diff + d.target.y - y_diff) / 2
          return `${d.target.x-x_diff},${d.target.y-y_diff} ${middle_x},${middle_y} ${d.source.x-x_diff},${d.source.y-y_diff}`
        })
      
      self.link.selectAll(".edge-arrow").attr("x1", function (d) {
        var a = (d.source.x + d.target.x) / 2;
        return (a + d.source.x) / 2;
      })
        .attr("y1", function (d) {
          var a = (d.source.y + d.target.y) / 2;
          return (a + d.source.y) / 2;
        })
        .attr("x2", function (d) {
          var a = (d.source.x + d.target.x) / 2;
          return (a + d.target.x) / 2;
        })
        .attr("y2", function (d) {
          var a = (d.source.y + d.target.y) / 2;
          return (a + d.target.y) / 2;
        });
      self.link.selectAll("text").attr('x', function (d) {
        return (d.source.x + d.target.x) / 2;
      })
        .attr('y', function (d) {
          return (d.source.y + d.target.y) / 2 + 5;
        });
      self.link.selectAll("rect").attr('x', function (d) {
        return ((d.source.x + d.target.x) / 2) - 75;
      })
        .attr('y', function (d) {
          // if(d.source.id === d.target.id) {
          //   return d.source.y - 140
          // }
          return (d.source.y + d.target.y) / 2 - 25;
        });
      self.link.selectAll(".deleteG").attr('transform', function (d) {
        return 'translate(' + (((d.source.x + d.target.x) / 2) - 75 + 130) + ',' + ((d.source.y + d.target.y) / 2 - 25) + ')';
      });

      self.link.selectAll(".detailsG").attr('transform', function (d) {
        return 'translate(' + (((d.source.x + d.target.x) / 2) - 75 + 108) + ',' + ((d.source.y + d.target.y) / 2 - 25) + ')';
      });

      self.link.selectAll(".addCommentG").attr('transform', function (d) {
        return 'translate(' + (((d.source.x + d.target.x) / 2) - 75 + 86) + ',' + ((d.source.y + d.target.y) / 2 - 25) + ')';
      });

      // Color grey if no comment
      self.link.selectAll(".addComment").attr('fill', function (circle) {
        const node = d3.select(this.parentNode).datum();
        return !node.comment && !node.description ? "grey":"black";
      });

      self.link.selectAll(".errorG").attr('transform', function (d) {
        return 'translate(' + (((d.source.x + d.target.x) / 2) - 75 + 64) + ',' + ((d.source.y + d.target.y) / 2 - 25) + ')';
      });

      self.node.attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
      });
      // Color grey if no comment
      self.node.selectAll(".addComment").attr('fill', function (circle) {
        const node = d3.select(this.parentNode).datum();
        return !node.comment && !node.description ? "grey":"black";
      });
    };

    this.force = d3.layout.force()
      .nodes(this.nodes)
      .links(this.links)
      .charge(-500)
      .linkDistance((e) => {
        if(e.type === "edgeto") {
          return 175
        } else {
          return 350
        }
      })
      .size([width, height])
      .on("tick", tick);

    function dragstart(d) {
      //console.log('dragstart');
      d3.select(this).classed("fixed", d.fixed = true);

    }

    function dragstop(d) {
      //console.log('dragstop');
      self.clickedAddLink = false;
      //console.log(self.svg.selectAll(".node"));
      self.containerNode.call(self.drag);
    }

    this.drag = this.force.drag();
    this.drag.on("dragstart", dragstart);
    this.drag.on("dragend", dragstop);
  },

  stopZoomPan: function () {
    this.zoom.on("zoom", null)
    this.svgWOG.call(this.zoom);
    $("body").off("keydown.zoom")

  },

  startZoomPan: function () {
    const self = this

    // Reset zoom to known values (d3 might have changed internal state since stopZoomPan())
    self.zoom.translate(self.zoomData.translate)
    self.zoom.scale(self.zoomData.scale)

    this.zoom.on("zoom", function () {
      if(!_.isNull(d3.event.sourceEvent)) {
        self.zoomData = {translate: d3.event.translate, scale: d3.event.scale}
        self.svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
      } else {
        // Sometimes there's a glitch, and no source event is present. This is a false zoom, so we return to the saved position.
        self.zoom.translate(self.zoomData.translate)
        self.zoom.scale(self.zoomData.scale)
      }
    })
    this.svgWOG.call(this.zoom);

    $("body").on("keydown.zoom", (a) => {
      if(a.key === "ArrowRight") {
        this.pan(50, 0);
      } else if(a.key === "ArrowLeft") {
        this.pan(-50, 0);
      } else if (a.key === "ArrowUp") {
        this.pan(0, -50);
      } else if (a.key === "ArrowDown") {
        this.pan(0, 50);
      }
    })
  },

  addNode: function (node) {
    this.nodes.push(node);
    this.start();
  },

  removeNode: function (id) {
    console.log(id);
    var i = 0;

    while (i < this.nodes.length && this.nodes[i].id !== id) {
      i++;
    }

    if (i < this.nodes.length) {
      this.nodes.splice(i, 1);
      this.removeAllEdges(id);
    }

    this.start();
  },

  findNode: function (id) {
    for (var i in this.nodes) {
      if (this.nodes[i].id == id) return this.nodes[i];
    }
  },

  findEdge: function (id) {
    for (var i in this.links) {
      if (this.links[i].id == id) return this.links[i];
    }
  },

  getSelectedNode: function () {
    for (var i in this.nodes) {
      if (this.nodes[i].selected) return this.nodes[i];
    }
  },

  removeEdge: function (id) {
    var i = 0;

    while (i < this.links.length && this.links[i].id !== id) {
      i++;
    }

    if (i < this.links.length) {
      this.links.splice(i, 1);
    }


    _.remove(this.links, a => a.id == "to-" + id)
    _.remove(this.nodes, a => a.id == id)
    this.start();
  },

  removeAllEdges: function (id) {
    for (var i = this.links.length - 1; i >= 0; i--) {
      var link = this.links[i];

      if (link.source.id == id || link.target.id === id) {
        this.links.splice(i, 1);
      }
    }
  },

  updateNode: function (node) {
    const forceNode = this.findNode(node.id);

    console.log(_.cloneDeep(this.nodes))

    $.extend(forceNode, node);

    if (node.type === "resource" || node.type === "blank") {
      forceNode.className = node.className;
    } else {
      forceNode.datatype = node.datatype;
    }

    this.start();
  },

  updateEdge: function (edge) {
    var forceEdge = this.findEdge(edge.id);

    $.extend(forceEdge, edge);
    // this only happens in the event of a single-noded edge.
    const forceNode = this.findNode(edge.id);
    $.extend(forceNode, edge);


    this.start();

    // this.removeEdge(edge.id);

    // this.addEdge(edge);
  },

  addEdge: function (edge) {
    if(edge.sourceID === edge.targetID) {
      const node = this.findNode(edge.sourceID)

      this.nodes.push($.extend({}, edge, {type: "literal", self_edge:true, source: node, target: node}))

      this.links.push({id: "to-" + edge.id, type: "edgeto", source: node, target: this.findNode(edge.id), errors: []})
    } else {
      const link = $.extend({}, edge, {
        source: this.findNode(edge.sourceID),
        target: this.findNode(edge.targetID),
        type:"edge"
      });
  
      this.links.push(link);
    }
    this.start();
  },

  start: function () {

    // DRAW LINKS
    console.log(this.links)
    this.link = this.link.data(this.force.links(), function (d) {
      return d.source ? (d.source.id + "-" + d.target.id) : d.edge.id;
    });

    const containerLink = this.link.enter().insert("g", ".node").attr("class", "link").attr("id", (d) => `edgeid${d.source.id}-${d.target.id}`);

    containerLink.append("line").filter(c => c.type === "edge").attr("class", "edge");
    containerLink.append("line").filter(c => c.type === "edge").attr("class", "edge-arrow")
      .attr('marker-end', 'url(#end-arrow)')
      .attr('marker-start', 'url(#start-arrow)');
    containerLink.insert("line", ".edge").filter(c => c.type === "edge").attr("class", "edge click");

    containerLink.append("polyline").filter(c => c.type === "edgeto").attr("class", "singleedge-to").attr('marker-mid', 'url(#start-arrow)')
    containerLink.append("polyline").filter(c => c.type === "edgeto").attr("class", "singleedge-from").attr('marker-mid', 'url(#start-arrow)');

    if (visibleGraphStore.getState().currentDetailLevel > GraphDetailLevels.MODERATE) {
      var rect = containerLink.append("rect").filter(c => c.type === "edge").attr("height", 50)
        .attr("width", 150)
        .style("fill", "white")
        .style("stroke", "black")
        .style("stroke-width", "4px");

      var detailsCircle = containerLink.append('g').filter(c => c.type === "edge")
        .attr("class", "detailsG hidden")
        .attr('transform', function (d) {
          //return "translate(108, 0)";
        })
        .on("click", function (d) {
          graphActions.selectOne(d.id);
          //CommandInvoker.getInvoker().execute(new UnselectAllNodesCommand());
          CommandInvoker.getInvoker().execute(new ShowDetailsEdgeCommand(d));
          CommandInvoker.getInvoker().execute(new HighlightInputCommand());
        });

      detailsCircle
        .append("circle")
        .attr("class", "details");


      detailsCircle.append("image")
        .attr("href", "./images/menu.png")
        .attr("x", -8)
        .attr("y", -8)
        .attr("width", 16)
        .attr("height", 16);

      
        var addCommentCircle = containerLink.append("g").filter(c => c.type === "edge")
        .attr("class", "addCommentG hidden")
        .attr('transform', function (d) {
          
        }).on("click", function (d) {
          console.log('click comment');
          graphActions.selectOne(d.id);
          CommandInvoker.getInvoker().execute(new ShowCommentsEdgeCommand(d));
        });

        addCommentCircle.append("circle")
          .attr("class", "addComment");


        addCommentCircle.append("image")
        .attr("href", "./images/comment.png")
        .attr("x", -8)
        .attr("y", -8)
        .attr("width", 16)
        .attr("height", 16);

      var deleteCircle = containerLink.append("g").filter(c => c.type === "edge")
        .attr("class", "deleteG hidden")
        .attr('transform', function (d) {
          //return "translate(130, 0)";
        }).on("mouseup", function (d) {
          graphActions.removeEdge(d.id);
          if (APPLICATION_CONFIG.enableValidation) {
            CommandInvoker.getInvoker().execute(new ValidateMappingCommand());
          }
        });

      deleteCircle.append("circle")
        .attr("class", "delete");


      deleteCircle.append("image")
        .attr("href", "./images/delete.png")
        .attr("x", -8)
        .attr("y", -8)
        .attr("width", 16)
        .attr("height", 16);

      var warningCircle = containerLink.append("g").filter(c => c.type === "edge")
        .attr("class", "warnG hidden")
        .attr('transform', function (d) {
          //return "translate(12, -25)";
        }).on("click", function (d) {
          console.log('Warning found:');
          for (var i = 0; i < d.errors.length; i++) {
            console.log('\t' + d.errors[i].message);
            CommandInvoker.getInvoker().execute(new ShowErrorsCommand(d));
          }
        });

      warningCircle.append("circle")
        .attr("class", "delete");

      warningCircle.append("image")
        .attr("xlink:href", "./images/error.png")
        .attr("x", -8)
        .attr("y", -8)
        .attr("width", 16)
        .attr("height", 16);

      var errorCircle = containerLink.append("g").filter(c => c.type === "edge")
        .attr("class", "errorG hidden")
        .attr('transform', function (d) {
          //return "translate(12, -25)";
        }).on("click", function (d) {
          console.log('Error found:');

          for (var i = 0; i < d.errors.length; i++) {
            console.log('\t' + d.errors[i].message);
            CommandInvoker.getInvoker().execute(new ShowErrorsCommand(d));
          }
        });

      errorCircle.append("circle")
        .attr("class", "delete");

      errorCircle.append("image")
        .attr("href", "./images/error.png")
        .attr("x", -8)
        .attr("y", -8)
        .attr("width", 16)
        .attr("height", 16);

      containerLink.on('mouseover', function (d) {
        d3.select(this).select('.deleteG').classed('hidden', false);
        d3.select(this).select('.detailsG').classed('hidden', false);
        d3.select(this).select('.addCommentG').classed('hidden', false);
      });

      containerLink.on('mouseout', function (d) {
        self.mouseup_node = d;
        d3.select(this).select('.deleteG').classed('hidden', true);
        d3.select(this).select('.detailsG').classed('hidden', true);
        d3.select(this).select('.addCommentG').classed('hidden', true);
      });


      this.link.selectAll(".details, .delete, .error, .addComment").transition().attr("r", function (d) {
        //if (d.type === "resource" || d.type === "blank") {
        return 10;
        //}
      });

      function showTextLink(d) {
        var edgeText;
        switch (d.valueType) {
          case ValueTypes.CONSTANT:
            edgeText = d.constant;
            break;
          default:
            edgeText = d.iterator || d.reference || d.template || '';
            break;
        }

        if (edgeText && edgeText.length > 15) {
          edgeText = edgeText.substr(0, 15) + "...";
        }

        return edgeText;
      }

      // separate sellectAll is needed in order to update the edges when the data changes
      this.link.selectAll('text').text(showTextLink);

      containerLink.append("text").style("text-anchor", "middle")
        .attr("fill", "black")
        .attr('y', 5)
        .text(showTextLink)
        .each(function (d) {
          d.width = this.getBBox().width;
          d.height = this.getBBox().height;
        });
    }

    //linkEnter = this.link.enter().insert("line", ".node").attr("class", "link");
    this.link.exit().remove();

    //DRAW NODES
    this.node = this.node.data(this.force.nodes(), function (d) {
      return d.id;
    });

    const containerNode = this.node.enter().append("g").attr("class", "node").attr("id", (d) => "nodeid"+d.id).call(this.drag);
    this.containerNode = containerNode;

    containerNode.on("click", function (d) {
      graphActions.selectOne(d.id);
      //CommandInvoker.getInvoker().execute(new UnselectAllEdgesCommand());
      if (!d3.event.defaultPrevented) {
        //CommandInvoker.getInvoker().execute(new ShowDetailsNodeCommand(d));
      }
      const source = d.self_edge ? d.sourceData:d.source
      if(d.self_edge) {
        CommandInvoker.getInvoker().execute(new HighlightInputCommand(d.source.source, d.conditions.join.child));
        CommandInvoker.getInvoker().execute(new HighlightInputCommand(d.target.source, d.conditions.join.parent, false));
        CommandInvoker.getInvoker().execute(new HighlightInputCommand(d.sourceData, (Util.getReferencesOfTemplate(d.template) || [])[0], false));  
      } else {
        CommandInvoker.getInvoker().execute(new HighlightInputCommand(source, (Util.getReferencesOfTemplate(d.template) || [])[0]));
      }
    });


    var self = this;

    containerNode.on("mousedown",
      function (d) {
        // disable zoom
        self.mousedown_node = d;
        self.stopZoomPan();
      });

    containerNode.on("mouseup", d => self.startZoomPan())
    

    containerLink.on("click", function (d) {
      graphActions.selectOne(d.id);
      console.log(d);
      CommandInvoker.getInvoker().execute(new HighlightInputCommand(d.source.source, d.conditions.join.child));
      CommandInvoker.getInvoker().execute(new HighlightInputCommand(d.target.source, d.conditions.join.parent, false));
      CommandInvoker.getInvoker().execute(new HighlightInputCommand(d.sourceData, (Util.getReferencesOfTemplate(d.template) || [])[0], false));
    });

    containerNode.append("circle")
      .attr("class", function (d) {
        return "node " + d.id;
      });

    containerNode.append("rect")
      .attr("class", function (d) {
        return "node " + d.id;
      });

    // The text should be appended first: the buttons should be stacked on top of it to be clickable.
    containerNode.append("text").attr('class', 'upper-text')
    .style("text-anchor", "middle")
    .attr('fill', "#ccc")
    .attr('y', -12);

    containerNode.append("text").attr('class', 'middle-text')
      .style("text-anchor", "middle")
      .attr("fill", "#fff")
      .attr('y', 8);

    containerNode.append("text").attr('class', 'lower-text')
      .style("text-anchor", "middle")
      .attr("fill", "#000")
      .attr('y', 21);

    containerNode.on('mouseover', function (d) {
      self.mouseup_node = d;
      d3.select(this).select('.deleteG').classed('hidden', false);
      d3.select(this).select('.detailsG').classed('hidden', false);
      d3.select(this).select('.addCommentG').classed('hidden', false);
      if (d.type !== 'literal') {
        d3.select(this).select('.addEdgeG').classed('hidden', false);
        d3.select(this).select('.expandG').classed('hidden', false);
      }
    });

    containerNode.on('mouseout', function (d) {
      self.mouseup_node = d;
      d3.select(this).select('.deleteG').classed('hidden', true);
      d3.select(this).select('.detailsG').classed('hidden', true);
      d3.select(this).select('.addEdgeG').classed('hidden', true);
      d3.select(this).select('.expandG').classed('hidden', true);
      d3.select(this).select('.addCommentG').classed('hidden', true);
    });

    var detailsCircle = containerNode.append("g")
      .attr("class", "detailsG hidden")
      .attr('transform', function (d) {
        if (d.type === "literal") {
          var scale = d.scale;

          if (scale === undefined) {
            scale = 1;
          }

          return "translate(" + Util.applyScale(37, scale) + ", " + Util.applyScale(-25, scale) + ")";
        } else {
          return "translate(25, -35)";
        }
      }).on("click", function (d) {
        console.log('click details');
        graphActions.selectOne(d.id);
        //CommandInvoker.getInvoker().execute(new UnselectAllEdgesCommand());
        //if (!d3.event.defaultPrevented) {
        if(d.self_edge) {
          CommandInvoker.getInvoker().execute(new ShowDetailsEdgeCommand(d));
        } else {
          CommandInvoker.getInvoker().execute(new ShowDetailsNodeCommand(d));
        }
        //}
        CommandInvoker.getInvoker().execute(new HighlightInputCommand(d.source, (Util.getReferencesOfTemplate(d.template) || [])[0]));
      });

    detailsCircle.append("circle")
      .attr("class", "details");


    detailsCircle.append("image")
      .attr("href", "./images/menu.png")
      .attr("x", -8)
      .attr("y", -8)
      .attr("width", 16)
      .attr("height", 16);

    var addEdgeCircle = containerNode.append("g")
      .attr("class", "addEdgeG hidden")
      .attr('transform', function (d) {
        return "translate(45, -15)";
      }).on("mousedown", function (d) {
        var x, y;

        if (d.type === 'literal') {
          x = 63;
          y = -25;
        } else {
          x = 45;
          y = -15;
        }
        self.clickedAddLink = true;
        self.svg.selectAll('.node').on('.drag', null);
        self.dragline.classed('hidden', false)
          .attr('d', 'M' + (d.x + x) + ',' + (d.y + y) + 'L' + (d.x + x) + ',' + (d.y + y));
        self.mousedown_node = d;
        // event.preventDefault();
      }).on("dblclick", (d) => {
        CommandInvoker.getInvoker().execute(new AddNewEdgeCommand({
          sourceID: d.id,
          targetID: d.id
        }))
      })

    addEdgeCircle.append("circle")
      .attr("class", "addEdge");


    addEdgeCircle.append("image")
      .attr("href", "./images/link.png")
      .attr("x", -8)
      .attr("y", -8)
      .attr("width", 16)
      .attr("height", 16);

    var addCommentCircle = containerNode.append("g")
    .attr("class", "addCommentG hidden")
    .attr('transform', function (d) {
      if (d.type === "literal") {
        var scale = d.scale;

        if (scale === undefined) {
          scale = 1;
        }

        return "translate(" + Util.applyScale(11, scale) + ", " + Util.applyScale(-25, scale) + ")";
      } else {
      return "translate(43, 10)";
      }
    }).on("click", function (d) {
      console.log('click comment');
      graphActions.selectOne(d.id);
      if(d.self_edge) {
        CommandInvoker.getInvoker().execute(new ShowCommentsEdgeCommand(d));

      } else {
        CommandInvoker.getInvoker().execute(new ShowCommentsNodeCommand(d));
      }
    });

    addCommentCircle.append("circle")
      .attr("class", "addComment");


    addCommentCircle.append("image")
    .attr("href", "./images/comment.png")
    .attr("x", -8)
    .attr("y", -8)
    .attr("width", 16)
    .attr("height", 16);

    var deleteCircle = containerNode.append("g")
      .attr("class", "deleteG hidden")
      .attr('transform', function (d) {
        if (d.type === "literal") {
          var scale = d.scale;

          if (scale === undefined) {
            scale = 1;
          }

          return "translate(" + Util.applyScale(63, scale) + ", " + Util.applyScale(-25, scale) + ")";
        } else {
          return "translate(25, 35)";
        }
      }).on("mouseup", function (d) {
        if(d.self_edge) {
          graphActions.removeEdge(d.id)
        } else {
          graphActions.removeNode(d.id);
        } 
        
        if (APPLICATION_CONFIG.enableValidation) {
          CommandInvoker.getInvoker().execute(new ValidateMappingCommand());
        }
      });

    deleteCircle.append("circle")
      .attr("class", "delete");


    deleteCircle.append("image")
      .attr("href", "./images/delete.png")
      .attr("x", -8)
      .attr("y", -8)
      .attr("width", 16)
      .attr("height", 16);

    var warningCircle = containerNode.append("g")
      .attr('class', "warnG")
      .attr('transform', function (d) {
        if (d.type === "literal") {
          return "translate(12, -25)";
        } else {
          return "translate(0, 45)";
        }
      }).on("click", function (d) {
        console.log('Error found:');

        for (let i = 0; i < d.errors.length; i++) {
          console.log('\t' + d.errors[i].message);
          CommandInvoker.getInvoker().execute(new ShowErrorsCommand(d));
        }
      });

    warningCircle.append("circle")
      .attr("class", "delete");


    warningCircle.append("image")
      .attr("xlink:href", "./images/error.png")
      .attr("x", -8)
      .attr("y", -8)
      .attr("width", 16)
      .attr("height", 16);

    this.svg.selectAll('.warnG').attr("class", function (d) {
      var c = "warnG";

      var todisplay = false;
      for(var i = 0; i < d.errors.length; i++){
        if(d.errors[i].errorLevel === "WARN" && filterPreferencesStore.isDisplayed(d.errors[i])){
          todisplay = true;
        }
      }

      if (!d.errors || d.errors.length === 0 || !todisplay) c += " hidden";
      return c;
    });

    var errorCircle = containerNode.append("g")
      .attr('class', "errorG")
      .attr('transform', function (d) {
        if (d.type === "literal") {
          return "translate(12, -25)";
        } else {
          return "translate(30, 30)";
        }
      }).on("click", function (d) {
        console.log('Error found:');

        for (var i = 0; i < d.errors.length; i++) {
          console.log('\t' + d.errors[i].message);
          CommandInvoker.getInvoker().execute(new ShowErrorsCommand(d));
        }
      });

    errorCircle.append("circle")
      .attr("class", "delete");


    errorCircle.append("image")
      .attr("href", "./images/error.png")
      .attr("x", -8)
      .attr("y", -8)
      .attr("width", 16)
      .attr("height", 16);

    this.svg.selectAll('.errorG').attr("class", function (d) {
      var c = "errorG";

      var todisplay = false;
      for(var i = 0; i < d.errors.length; i++){
        if(d.errors[i].errorLevel === "ERROR" && filterPreferencesStore.isDisplayed(d.errors[i])){
          todisplay = true;
        }
      }

      if (!d.errors || d.errors.length === 0 || !todisplay) c += " hidden";
      return c;
    });

    var expandCircle = containerNode.append("g")
      .attr('class', "expandG hidden")
      .attr('transform', function (d) {
        return "translate(0, -45)";
      }).on("click", function (d) {
        CommandInvoker.getInvoker().execute(new UpdateNodeCommand(d.id, {expanded: !d.expanded}));
      });

    expandCircle.append("circle")
      .attr("class", "expand");
    expandCircle.append("image")
      .attr("y", -7)
      .attr("width", 14)
      .attr("height", 14);

    this.svg.selectAll('.expandG > image')
      .attr("href", function (d) {
        if (d.expanded) {
          return "./images/collapse.png";
        } else {
          return "./images/expand.png";
        }
      }).attr("x", function (d) {
      if (d.expanded) {
        return -8
      } else {
        return -6;
      }
    });


    this.node.selectAll(".details, .delete, .errors, .addEdge, .expand, .addComment").transition().attr("r", function (d) {
      //if (d.type === "resource" || d.type === "blank") {
      return 10;
      //}
    });

    

    this.node.selectAll(".node").transition().attr("r", function (d) {
      if (d.type === "resource" || d.type === "blank") {
        var scale = d.scale;

        if (scale === undefined) {
          scale = 1;
        }

        return Util.applyScale(self.radius, scale);
      }
    })
      .style("stroke-dasharray", function (d) {
        if (d.type === "blank") {
          return "10,10";
        } else {
          return "";
        }
      })
      .style("fill", ColorManager.getManager().getNodeColor)
      .style("stroke", ColorManager.getManager().getNodeStrokeColor)
      .style("stroke-width", function (d) {
        if (d.type === "blank" && !d.selected) {
          return "1px";
        //} else if (d.selected) {
          //return "2px";
        } else {
          return "0px";
        }
      });

    this.node.selectAll("rect").transition().attr("height", function (d) {
      if (d.type === "literal") {
        var scale = d.scale;

        if (scale === undefined) {
          scale = 1;
        }

        return Util.applyScale(50, scale);
      }
    })
      .attr("width", function (d) {
        if (d.type === "literal") {
          var scale = d.scale;

          if (scale === undefined) {
            scale = 1;
          }

          return Util.applyScale(150, scale);
        }
      })
      .attr('x', function(d){
        var scale = d.scale;

        if (scale === undefined) {
          scale = 1;
        }

        return Util.applyScale(-75, scale);
      })
      .attr('y', function(d){
        var scale = d.scale;

        if (scale === undefined) {
          scale = 1;
        }

        return Util.applyScale(-25, scale);
      })
      .style("fill", ColorManager.getManager().getNodeColor)
      .style("stroke", ColorManager.getManager().getNodeStrokeColor)
      .style("stroke-width", function (d) {
        //if (d.selected) {
        //  return "2px";
        //} else {
          return "0px";
        //}
      });

    this.node.selectAll(".upper-text").text(function (d) {
      return (d.type === 'resource' || d.type === "blank") ? d.iterator || '' : '';
    });

    this.node.selectAll(".lower-text").text(function (d) {
      var currentDL = visibleGraphStore.getState().currentDetailLevel;

      if ((d.type === "resource" || d.type === "blank") && d.className && (currentDL >= visibleGraphStore.getState().detailLevels.MODERATE)) {
        if (d.className.length > 14) {
          return '...' + d.className.substr(d.className.length - 11, 11);
        }

        return d.className
      } else if (d.type === "literal" && currentDL === GraphDetailLevels.HIGH) {
        if (d.datatype) {
          if (d.datatype.length > 25) {
            return '...' + d.datatype.substr(d.datatype.length - 22, 22);
          }

          return d.datatype;
        } else if (d.language) {
          return '@' + d.language.replace(/"/g, "");
        }
      }

      return '';
    });

    this.node.selectAll(".middle-text").text(function (d) {

      if (d.valueType === ValueTypes.CONSTANT) {

        if (d.constant.length > 10) {
          return d.constant.substr(0, 7);
        }

        return d.constant;
      } else if (d.valueType === ValueTypes.REFERENCE) {
        var value = d.reference ? d.reference : '';

        if (d.source) {
          if (d.source.type !== 'csv') {
            var separator = d.source.type === 'xml' ? '/' : '.';
            var splits = value.split(separator);
            value = splits[splits.length - 1];
          }
        }

        if (value.length > 10) {
          return value.substr(0, 7) + '...';
        }

        return value;
      } else if (d.valueType === ValueTypes.TEMPLATE) {
        if (d.template?.length > 10) {
          return '...' + d.template.substr(d.template.length - 7);
        }

        return d.template;
      }

      return '';
    });

    //TODO: Add class using a small circle

    this.link.selectAll("rect").transition()
      .style("fill", ColorManager.getManager().getEdgeColor)
      .style("stroke-width", function (d) {
        //if (d.selected) {
        //  return "2px";
        //} else {
          return "0px";
        //}
      });

    this.node.exit().remove();
    this.force.start();
    //this.force.tick();
  }
};
