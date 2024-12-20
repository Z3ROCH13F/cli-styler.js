/**
 * @typedef {Object} main
 * @property {function(string): string} styleR - Main function.
 * @property {function(Object): string} style - Main function.
 */

/**
 * @type {main}
 */
const exported = {};

// Define
const def = [
  // Libs and Utils
  ["utils", "./utils"],
  ["colors", "./lib/colors.json"],
  ["sc", "./lib/select-color"],
  ["rs", "./lib/reset"],
  ["rst", "./lib/reset-type"],
  ["st", "./lib/style-text"],
  ["ttc", "./lib/type-to-color"],
  // Main Functions
  ["style", "./lib/style"],
  ["styleP", "./lib/styleP"],
  ["styleR", "./lib/styleR"],
];

def.forEach((select) => {
  exported[select[0]] = require(select[1]);
});

Object.prototype.Log = function () {
  console.log(this.valueOf());
};

// Autoload
module.exports = exported;
