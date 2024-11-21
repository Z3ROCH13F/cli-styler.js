const colors = require(__dirname + "/colors.json");

module.exports = function (select) {
  return colors[select] ?? undefined;
};
