const path = require("path");

module.exports = {
  entry: "./frontend/src/index.js",
  output: {
    path: path.resolve(__dirname, "../frontend/static"),
    filename: "main.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "../frontend/src/components/"),
      "@containers": path.resolve(__dirname, "../frontend/src/containers/"),
      "@redux": path.resolve(__dirname, "../frontend/src/redux/"),
      "@actions": path.resolve(__dirname, "../frontend/src/redux/actions/"),
      "@utils": path.resolve(__dirname, "../frontend/src/utils/"),
      "@api": path.resolve(__dirname, "../frontend/src/api/")
    }
  }
};
