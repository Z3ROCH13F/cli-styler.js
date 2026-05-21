/**
 * @param {string} select
 * @param {string} [type="color"]
 * @returns {(string|undefined)}
 */
module.exports = function (select, type = "color") {
	if (typeof select !== "string") return undefined;
	return this.colors[type]?.[select.toLowerCase()];
};
