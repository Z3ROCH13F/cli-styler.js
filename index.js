const { style } = require("./lib/style");
const { styleR } = require("./lib/styleR");
const { styleP } = require("./lib/styleP");

Object.prototype.Log = function () {
  console.log(this.valueOf());
};

module.exports = {
  style,
  styleR,
  styleP
};