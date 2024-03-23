const sc = require("./select-color.min");
const st = require("./style-text");
const rs = require("./reset");

const {
  ArrayIsArray,
  RgbToColorAnsi,
  RgbToBackgroundColorAnsi,
  IsHex,
  HexToRgb
} = require("../utils");

module.exports = function styleR(...texts) {
  const regMatchRGB = /\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/;
  let out = [];
  for (let text of texts) {
    text = text.replace(/<\s*(\w+)\s*>/gi, (_, type) => st(type) || _);

    text = text.replace(/<\s*(\w+)\s*(.+?)\s*>/gi, (_, type, sett) => {
      let setup = sett.split("&");
      for (let k = 0; k < setup.length; k++) {
        setup[k] = setup[k].replace(
          /^color\s*:\s*((.+?)+)/gi,
          (_, color) => {
            let reg = color.match(regMatchRGB);
            color = reg ? [reg[1], reg[2], reg[3]] : color.trim();
            return RgbToColorAnsi(
              ...(ArrayIsArray(3, color)
                ? color
                : IsHex(color)
                  ? HexToRgb(color)
                  : sc(color) || sc("white"))
            );
          }
        );

        setup[k] = setup[k].replace(
          /^bg\s*:\s*((.+?)+)/gi,
          (_, color) => {
            let reg = color.match(regMatchRGB);
            color = reg ? [reg[1], reg[2], reg[3]] : color.trim();
            return RgbToBackgroundColorAnsi(
              ...(ArrayIsArray(3, color)
                ? color
                : IsHex(color)
                  ? HexToRgb(color)
                  : sc(color) || sc("black"))
            );
          }
        );

        setup[k] = setup[k].replace(
          /^line\s*:\s*((.+?)+)/gi,
          position => {
            let reg = position.match(/\(\s*(\d+)\s*,\s*(\d+)\s*\)/);
            return "\x1b[" + reg[2] + ";" + reg[1] + "H";
          }
        );
      }

      return st(type) ? setup.join("") + st(type) : _;
    });

    text = text.replace(/<\s*\?(.+?)\s*>/gi, (_, sett) => {
      let setup = sett.split("&");
      for (let k = 0; k < setup.length; k++) {
        setup[k] = setup[k].replace(
          /^color\s*:\s*((.+?)+)/gi,
          (_, color) => {
            let reg = color.match(regMatchRGB);
            color = reg ? [reg[1], reg[2], reg[3]] : color.trim();
            return RgbToColorAnsi(
              ...(ArrayIsArray(3, color)
                ? color
                : IsHex(color)
                  ? HexToRgb(color)
                  : sc(color) || sc("white"))
            );
          }
        );

        setup[k] = setup[k].replace(
          /^bg\s*:\s*((.+?)+)/gi,
          (_, color) => {
            let reg = color.match(regMatchRGB);
            color = reg ? [reg[1], reg[2], reg[3]] : color.trim();
            return RgbToBackgroundColorAnsi(
              ...(ArrayIsArray(3, color)
                ? color
                : IsHex(color)
                  ? HexToRgb(color)
                  : sc(color) || sc("black"))
            );
          }
        );

        setup[k] = setup[k].replace(
          /^line\s*:\s*((.+?)+)/gi,
          position => {
            let reg = position.match(/\(\s*(\d+)\s*,\s*(\d+)\s*\)/);
            return "\x1b[" + reg[2] + ";" + reg[1] + "H";
          }
        );
      }
      return setup.join("");
    });

    text = text.replace(/<\s*@\s*(reset|mid|end)\s*>/gi, "\x1b[0m");
    text = text.replace(/<\s*@\s*reset-(\w+)\s*>/gi, (_, type) => {
      return rs(type) ? rs(type) : "";
    });

    out.push(text);
  }
  return out.join("\n");
};