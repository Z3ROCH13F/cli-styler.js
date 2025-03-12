/**
 * @param {string} text
 * @return {string}
 * @example
 * const cli = require("cli-styler.js");
 * cli.styleR("<?color: red>Hello World>");
 */
module.exports = function (text) {
	const { utils } = this;

	const regMatchRGB =
		/\(\s*(\d*\.\d*|\d*)\s*,\s*(\d*\.\d*|\d*)\s*,\s*(\d*.\d*|\d*)\s*\)/;

	let list = {
		st: [],
		bg: [],
		color: [],
	};
	text = text.replace(/<\s*(\w+)\s*>/gi, (_, type) => {
		if (this.st(type)) {
			if (this.rs(type)) list[this.rst(type)].push(type);
			return this.st(type);
		} else return _;
	});

	text = text.replace(/<\s*(\?|\w+)\s*(.+?)\s*>/gi, (_, type, sets) => {
		let setup = sets.split("&");
		for (let k = 0; k < setup.length; k++) {
			setup[k] = setup[k].replace(/\s*color\s*:\s*((.+?)+)/gi, (_, color) => {
				let reg = color.match(regMatchRGB);
				color = reg ? [reg[1], reg[2], reg[3]] : color.trim();
				let output = this.pcolor(color, "color");

				list.color.push(output);
				return output;
			});

			setup[k] = setup[k].replace(/\s*bg\s*:\s*((.+?)+)/gi, (_, color) => {
				let reg = color.match(regMatchRGB);
				let output = this.pcolor(color, "bg");

				list.bg.push(output);
				return output;
			});

			setup[k] = setup[k].replace(/\s*line\s*:\s*((.+?)+)/gi, (position) => {
				let reg = position.match(
					/\(\s*(\d*\.\d*|\d*)\s*,\s*(\d*\.\d*|\d*)\s*\)/,
				);
				let x = parseInt(reg[1]);
				let y = parseInt(reg[2]);
				const output = "\x1b[" + y + ";" + x + "H";
				return output;
			});
		}

		if (this.st(type)) {
			list[this.rst(type)].push(type);
			return setup.join("") + this.st(type);
		} else if (type === "?") {
			return setup.join("");
		} else return _;
	});

	text = text.replace(/<\s*@\s*reset\s*>/gi, this.rs("all"));
	text = text.replace(
		/<\s*@\s*reset-(\w+)\s*>/gi,
		(_, type) => this.rs(type) ?? "",
	);
	text = text.replace(/<\s*@\s*undo-(\w+)\s*>/gi, (_, type) => {
		if (this.rst(type)) {
			const i = this.rst(type);
			if (list[i].length > 1) list[i].splice(list[i].lastIndexOf(type), 1);
			return list[i].at(-1);
		} else return "";
	});
	return text;
};
