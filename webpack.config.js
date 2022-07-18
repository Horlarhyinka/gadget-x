const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {
    // Other rules...
    plugins: [
        new NodePolyfillPlugin()
    ]
}
module.exports = {
  resolve: {
      alias: {
          path: require.resolve("path-browserify")
      }
  }
};