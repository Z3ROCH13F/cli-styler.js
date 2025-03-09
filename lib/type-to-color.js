/**
 * @param {string} type - (string|array|hex):color
 * @param {string} color - type:(color|bg)
 * @returns {string}
 */
module.exports = function (type, color) {
	const { utils } = this;
	const types = type.trim().split(":");
	if (!(types.length === 2)) throw new Error('"type" need 2 arguments!');
	let rgb;
	if (types.at(1) === "bg") rgb = utils.RgbToBackgroundColorAnsi;
	else if (types.at(1) === "color") rgb = utils.RgbToColorAnsi;
	else throw new Error('Undefined "type": ', types.at(1));
	switch (types.at(0)) {
		case "string":
			return rgb(...this.sc(color));
		case "array":
			return rgb(...color);
		case "hex":
			return rgb(...utils.HexToRgb(color));
		default:
			throw new Error("Can't handle type: " + types.at(0));
	}
};
