module.exports = function (color, s) {
	const { utils } = this;
	if (utils.ArrayIsArray(3, color)) {
		return this.ttc("array:" + s, color);
	} else if (typeof color === "string") {
		if (utils.IsHex(color)) {
			return this.ttc("hex:" + s, color);
		} else if (this.sc(color)) {
			return this.ttc("string:" + s, color);
		}
	}
};
