var valueParser = require('postcss-value-parser');

/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = (opts = {}) => {
  const { format } = Object(opts);

  return {
    postcssPlugin: 'postcss-remove-font-face-format',
    AtRule: {
      "font-face"(rule) {
        rule.walkDecls("src", (node) => {
          // If no format is defined we don't need to do anything
          if (!node.value.includes("format(")) {
            return; 
          }

          // Split individual font-face sources
          var sources = node.value.split(",");
          // Filter to sources we want to keep
          var filteredSources = sources.filter(source => {
            const values = valueParser(source);

            var remove = false;
            values.walk((value) => {
              // We are only interested in the format value
              if (value.type !== "function" || value.value !== "format") 
              {
                return;
              }            
  
              value.nodes.forEach((child) => {
                // Remove woff2 format
                if (child.type == "string" && child.value == format)
                {
                  remove = true;
                }
              });  
            });

            return !remove;
          });

          // Write filtered sources back to node
          node.value = filteredSources.join(', ');
        });
      }
    }
  }
}

module.exports.postcss = true
