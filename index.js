"use strict";

/**
 * @typedef {Object} main
 * @property {function(string): string} styleR - Main function.
 * @property {function(Object): string} style - Main function.
 */

/**
 * @type {main}
 */
const exported = {};

exported.g = false;

// Type string lowercase or undefined
exported.tslou = function (list, check) {
	return list[typeof check === "string" ? check?.toLowerCase() : undefined];
};

// Type of this.g
exported.global = function (value) {
	this.g = value;
	return value;
};

exported.list = {
	st: [],
	bg: [],
	color: [],
};

// Defines
const def = [
	// Libs & Utils
	["utils", "./utils"],
	["colors", "./lib/colors.json"],
	["sc", "./lib/select-color"],
	["rs", "./lib/reset"],
	["rst", "./lib/reset-type"],
	["st", "./lib/style-text"],
	["ttc", "./lib/type-to-color"],
	["pcolor", "./lib/parse-color"],
	// Main Functions
	["style", "./lib/style"],
	["styleP", "./lib/styleP"],
	["styleR", "./lib/styleR"],
];

def.forEach((select) => {
	try {
		exported[select[0]] = require(select[1]);
	} catch (err) {
		throw new Error(err);
	}
});

// Autoload
module.exports = exported;
