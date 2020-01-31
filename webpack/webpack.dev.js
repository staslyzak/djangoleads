const webpackBase = require("./webpack.base");

module.exports = {
  mode: "development",
  performance: {
    hints: "warning"
  },
  ...webpackBase
};
