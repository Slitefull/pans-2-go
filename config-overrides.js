const path = require("path");
const { override, addWebpackAlias } = require("customize-cra");
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

// simple configuration
module.exports = override(
  addWebpackAlias({
    "@components": path.resolve(__dirname, "src/common/components"),
    "@utils": path.resolve(__dirname, "src/utils"),
    "@": path.resolve(__dirname, "src"),
  })
);

// configuration with plugins

// module.exports = function override(config, env) {
//   console.log('run override');
//   config.plugins  = config.plugins.map(plugin => {
//     console.log('plugin name: ', plugin.constructor.name);
//     return plugin
//   })
//   return addWebpackAlias({
//     "@components": path.resolve(__dirname, "src/common/components"),
//     "@utils": path.resolve(__dirname, "src/utils"),
//     "@": path.resolve(__dirname, "src"),
//   })(config);
// }
