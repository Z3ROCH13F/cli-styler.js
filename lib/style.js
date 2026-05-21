const lnList = { inline: "\x20", nline: "\n" };

/**
 * @param {string} bg
 * @param {string} color
 * @param {string} st
 * @param {string} text
 * @returns {string}
 */
const result = (bg, color, st, text) => {
	return (bg ?? "") + (color ?? "") + (st ?? "") + text;
};

/**
 * @param {Object} cs - custom style
 * @returns {string}
 */
module.exports = function (cs = {}) {
	const { utils } = this;

	let ln = cs.line ?? cs.ln;
	ln = lnList[typeof ln === "string" ? ln.toLowerCase() : undefined] ?? ln ?? "";

	const space = {
		background: "",
		color: "",
		st: ""
	};
	
	const bg = cs.bg ?? cs.background;
	const st = cs.st ?? cs.styleText;
	const text = cs.text ?? "";

	if (cs.color) space.color = this.pcolor(cs.color, "color");
	if (bg) space.background = this.pcolor(bg, "bg");

	if (Array.isArray(st)) space.st = st.map((s) => this.st(s)).join("");
	else if (typeof st === "string") space.st = this.st(st) ?? "";

	if (Array.isArray(text)) {
		return text
				.map((t) => result(space.background, space.color, space.st, t))
				.join(ln) + this.rs("all");
	}

	return result(space.background, space.color, space.st, text) + this.rs("all");
};
