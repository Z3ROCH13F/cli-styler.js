/**
 * @param {Object} cs - custom style
 * @returns {string}
 */
module.exports = function (cs = {}) {
	const { utils } = this;

	/**
	 * @param {string} select
	 * @returns {(string|undefined)}
	 */
	const ln = (select) => {
		const list = { inline: "\x20", nline: "\n" };
		return this.tslou(list, select) ?? select;
	};

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

	const space = {};
	cs.bg ??= cs.background;
	cs.st ??= cs.styleText;
	cs.ln ??= cs.line;
	cs.ln = ln(cs.ln) ?? "";
	if (!cs.text) cs.text = "";

	if (cs.color) space.color = this.pcolor(cs.color, "color");

	if (cs.bg) space.background = this.pcolor(cs.bg, "bg");

	if (Array.isArray(cs.st)) space.st = cs.st.map((s) => this.st(s)).join("");
	else if (typeof cs.st === "string") space.st = this.st(cs.st) ?? "";

	return Array.isArray(cs.text)
		? cs.text
				.map((t) => result(space.background, space.color, space.st, t))
				.join(cs.ln) + this.rs("all")
		: result(space.background, space.color, space.st, cs.text) + this.rs("all");
};
