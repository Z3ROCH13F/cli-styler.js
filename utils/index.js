module.exports = {
	/**
	 * @param {number} len
	 * @param {number[]} inp
	 * @returns {boolean}
	 */
	ArrayIsArray(len, inp) {
		if (
			len &&
			inp &&
			typeof len === "number" &&
			len === inp.length &&
			Array.isArray(inp)
		)
			return true;
		return false;
	},
	RgbToColorAnsi(r, g, b) {
		return `\x1b[38;2;${r | 0};${g | 0};${b | 0}m`;
	},
	RgbToBackgroundColorAnsi(r, g, b) {
		return `\x1b[48;2;${r | 0};${g | 0};${b | 0}m`;
	},
	IsHex(str) {
		return /^#([0-9A-F]{3}){1,2}$/i.test(str);
	},
	HexToRgb(hex) {
		hex = hex.replace(/^#/, "");
		if (hex.length === 3) {
			hex = hex
				.split("")
				.map((char) => char + char)
				.join("");
		}
		const num = parseInt(hex, 16);
		if (isNaN(num)) return null;
		return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
	},
};
