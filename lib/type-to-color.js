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
			output = this.sc(color, types.at(1));
			if (!output) return "";
			if (this.g) this.list[types.at(1)].push(output);
			return output;
		case "array":
			if (!color) return "";
			output = rgb(...color);
			if (this.g) this.list[types.at(1)].push(output);
			return output;
		case "hex":
			const hex = utils.HexToRgb(color);
			if (!hex) return "";
			output = rgb(...hex);
			if (this.g) this.list[types.at(1)].push(output);
			return output;
		default:
			return "";
	}
};
