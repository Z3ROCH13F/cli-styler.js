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
	else throw new Error('Undefined "arg0-value": ' + types.at(1));
	let output;
	switch (types.at(0)) {
		case "string":
			output = rgb(...this.sc(color));
			if (this.g) this.list[types.at(1)].push(output);
			return output;
		case "array":
			output = rgb(...color);
			if (this.g) this.list[types.at(1)].push(output);
			return output;
		case "hex":
			output = rgb(...utils.HexToRgb(color));
			if (this.g) this.list[types.at(1)].push(output);
			return output;
		default:
			throw new Error('Can\'t handle "arg0-key": ' + types.at(0));
	}
};
