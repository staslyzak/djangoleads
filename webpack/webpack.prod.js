const webpackBase = require("./webpack.base");

module.exports = {
  mode: "production",
  performance: {
    hints: false
  },
  ...webpackBase
};
