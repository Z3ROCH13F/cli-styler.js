const regMatchRGB = /\(\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\s*\)/;
const regTagsSimple = /<\s*(\w+)\s*>/gi;
const regTagsComplex = /<\s*(\?|\w+)\s*(.+?)\s*>/gi;
const regColor = /\s*color\s*:\s*([^&>]+)/gi;
const regBg = /\s*bg\s*:\s*([^&>]+)/gi;
const regLine = /\s*line\s*:\s*([^&>]+)/gi;
const regLinePos = /\(\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\s*\)/;
const regResetAll = /<\s*@\s*reset\s*>/gi;
const regResetType = /<\s*@\s*reset-(\w+)\s*>/gi;
const regUndo = /<\s*@\s*undo-(\w+)\s*>/gi;

/**
 * @param {string} text
 * @return {string}
 * @example
 * const cli = require("cli-styler.js");
 * cli.styleR("<?color: red>Hello World>");
 */
module.exports = function (text) {
	const { utils } = this;

	let list = null; // Lazy init

	const getList = () => {
		if (!list) list = { st: [], bg: [], color: [] };
		return list;
	};

	text = text.replace(regTagsSimple, (_, type) => {
		if (this.st(type)) {
			const rType = this.rst(type);
			if (rType) getList()[rType].push(type);
			return this.st(type);
		} else return _;
	});

	text = text.replace(regTagsComplex, (_, type, sets) => {
		let setup = sets.split("&");
		for (let k = 0; k < setup.length; k++) {
			setup[k] = setup[k].replace(regColor, (_, color) => {
				let reg = color.match(regMatchRGB);
				color = reg ? [reg[1], reg[2], reg[3]] : color.trim();
				let output = this.pcolor(color, "color");

				getList().color.push(output);
				return output ?? "";
			});

			setup[k] = setup[k].replace(regBg, (_, color) => {
				let reg = color.match(regMatchRGB);
				color = reg ? [reg[1], reg[2], reg[3]] : color.trim();
				let output = this.pcolor(color, "bg");

				getList().bg.push(output);
				return output ?? "";
			});

			setup[k] = setup[k].replace(regLine, (position) => {
				let reg = position.match(regLinePos);
				if (!reg) return position;
				let x = parseInt(reg[1]);
				let y = parseInt(reg[2]);
				return "\x1b[" + y + ";" + x + "H";
			});
		}

		if (this.st(type)) {
			getList()[this.rst(type)].push(type);
			return setup.join("") + this.st(type);
		} else if (type === "?") {
			return setup.join("");
		} else return _;
	});

	text = text.replace(regResetAll, this.rs("all"));
	text = text.replace(regResetType, (_, type) => this.rs(type) ?? "");
	text = text.replace(regUndo, (_, type) => {
		const i = this.rst(type);
		if (list && i && list[i].length > 0) {
			const last = list[i].pop();
			if (i === "st") {
				return (this.rs(last) ?? "") + (this.st(list[i].at(-1)) ?? "");
			}
			return list[i].at(-1) ?? this.rs(i);
		} else return "";
	});
	return text;
};
