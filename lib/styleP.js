const regBgRgb = /^bg(\w+)/;

const handler = {
	get: function (target, prop, rec) {
		const { self } = target;

		// prop = property
		if (typeof prop !== "string") return rec;
		const lprop = prop.toLowerCase();

		if (self.sc(lprop)) {
			target.output += self.ttc("string:color", lprop);
		} else if (regBgRgb.test(lprop)) {
			lprop.replace(regBgRgb, (_, color) => {
				target.output += self.ttc("string:bg", color);
			});
		}

		if (self.st(lprop)) target.output += self.st(lprop);

		if (lprop === "bg") {
			if (!target._bg) {
				target._bg = function (color) {
					target.output += self.pcolor(color, "bg") ?? "";
					return rec;
				};
			}
			return target._bg;
		}

		if (lprop === "color") {
			if (!target._color) {
				target._color = function (color) {
					target.output += self.pcolor(color, "color") ?? "";
					return rec;
				};
			}
			return target._color;
		}

		if (lprop === "text") {
			if (!target._text) {
				target._text = function (text) {
					target.output += text;
					return target.output + self.rs("all");
				};
			}
			return target._text;
		}

		if (lprop === "textr") {
			if (!target._textr) {
				target._textr = function (text) {
					target.output += self.styleR(text);
					return target.output + self.rs("all");
				};
			}
			return target._textr;
		}
		return rec;
	},
};

module.exports = function () {
	return new Proxy({ output: ``, self: this }, handler);
};
