/**
 * @param {string} text
 * @return {string}
 * @example
 * const cli = require("cli-styler.js");
 * cli.styleR("<?color: red>Hello World>").Log();
 */
module.exports = function (text) {
  const { utils, rs, rst } = this;
  const regMatchRGB =
    /\(\s*(\d*\.\d*|\d*)\s*,\s*(\d*\.\d*|\d*)\s*,\s*(\d*.\d*|\d*)\s*\)/;

  let list = { st: [rs("all")], bg: [rs("all")], color: [rs("all")] };
  text = text.replace(/<\s*(\w+)\s*>/gi, (_, type) => {
    if (this.st(type)) {
      if (rs(type)) list[rst(type)].push(type);
      return this.st(type);
    } else return _;
  });

  text = text.replace(/<\s*(\?|\w+)\s+\s*(.+?)\s*>/gi, (_, type, sett) => {
    let setup = sett.split("&");
    for (let k = 0; k < setup.length; k++) {
      setup[k] = setup[k].replace(/\s*color\s*:\s*((.+?)+)/gi, (_, color) => {
        let reg = color.match(regMatchRGB);
        color = reg ? [reg[1], reg[2], reg[3]] : color.trim();
        const output = utils.RgbToColorAnsi(
          ...(utils.ArrayIsArray(3, color)
            ? color
            : utils.IsHex(color)
              ? utils.HexToRgb(color)
              : this.sc(color) || this.sc("white")),
        );
        list.color.push(output);
        return output;
      });

      setup[k] = setup[k].replace(/\s*bg\s*:\s*((.+?)+)/gi, (_, color) => {
        let reg = color.match(regMatchRGB);
        color = reg ? [reg[1], reg[2], reg[3]] : color.trim();
        const output = utils.RgbToBackgroundColorAnsi(
          ...(utils.ArrayIsArray(3, color)
            ? color
            : utils.IsHex(color)
              ? utils.HexToRgb(color)
              : this.sc(color) || this.sc("black")),
        );
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
      list[rst(type)].push(type);
      return setup.join("") + this.st(type);
    } else if (type === "?") {
      return setup.join("");
    } else return _;
  });

  text = text.replace(/<\s*@\s*reset\s*>/gi, rs("all"));
  text = text.replace(/<\s*@\s*reset-(\w+)\s*>/gi, (_, type) =>
    rs(type) ? rs(type) : "",
  );
  text = text.replace(/<\s*@\s*undo-(\w+)\s*>/gi, (_, type) => {
    if (rst(type)) {
      const res = rst(type);
      if (list[res].length > 1)
        list[res].splice(list[res].lastIndexOf(type), 1);
      return rs(res);
    } else return "";
  });
  return text;
};
