var ColorManager = (function () {
  var instance;

  colors = {
    default: {base: "lightgrey", highlight: "darkgrey", error: "#cc0000"},
    error: "#cc0000",
    schemas: [
      {base: "#6d9eeb", highlight: "#1155cc"},
      {base: "#f6b26b", highlight: "#E68722"},
      {base: "#72D061", highlight: "#29B310"},
      {base: "#DC6BA3", highlight: "#B72D71"},
      {base: "#6DCFD4", highlight: "#2AC6CE"},
      {base: "#D66060", highlight: "#B52B2B"},
      {base: "#8A6DD4", highlight: "#5537A2"},
      {base: "#D43805", highlight: "#AD2A00"},
      {base: "#FF7F57", highlight: "#F65A28"},
      {base: "#EAEA30", highlight: "#C5C511"},
      {base: "#EAAC30", highlight: "#C58911"},
      {base: "#E83035", highlight: "#C41116"}
    ],
    stroke: "#222"
  };

  function createInstance() {

    function getNodeStrokeColor(node) {
      return colors.stroke;
    }

    function removeSourceColors(id) {
      var i = 0;

      while (i < colors.schemas.length && colors.schemas[i].sourceID !== id) {
        i++;
      }

      if (i < colors.schemas.length) {
        colors.schemas[i].sourceID = undefined;
        console.log("color schema removed");
      }
    }

    function getSourceColors(id) {
      var i = 0;

      while (i < colors.schemas.length && colors.schemas[i].sourceID !== id) {
        i++;
      }

      var c;

      if (i < colors.schemas.length) {
        var c = colors.schemas[i];
      } else {
        i = 0;

        while (i < colors.schemas.length && colors.schemas[i].sourceID) {
          i++;
        }

        if (i < colors.schemas.length) {
          colors.schemas[i].sourceID = id;
          var c = colors.schemas[i];
        } else {
          console.warn("No more color schemas available!");
        }
      }

      if (c && !c.error) {
        c.error = colors.error;
      }

      return c;
    }

    function getNodeColor(node) {
      var c;

      if (node.source && !node.self_edge) {
        c = getSourceColors(node.source.id);
      } else if(node.self_edge && node.sourceData) {
        c = getSourceColors(node.sourceData.id)
      } else {
        c = colors.default;
      }

      if (node.selected) {
        return c.highlight;
      } else {
        return c.base;
      }
    }

    function getEdgeColor(edge) {
      var c;

      if (edge.sourceData) {
        c = getSourceColors(edge.sourceData.id);
      } else {
        c = colors.default;
      }

      if (edge.selected) {
        return c.highlight;
      } else {
        return c.base;
      }
    }

    return {
      getNodeColor: getNodeColor,
      getEdgeColor: getEdgeColor,
      getSourceColors: getSourceColors,
      removeSourceColors: removeSourceColors,
      getNodeStrokeColor: getNodeStrokeColor
    };
  }

  return {
    getManager: function () {
      if (!instance) {
        instance = createInstance();
      }

      return instance;
    }
  };
})();
