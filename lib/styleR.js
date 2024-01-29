const sc = require("./select-color.min");
const st = require("./style-text");

const {
  ArrayIsArray,
  RgbToColorAnsi,
  RgbToBackgroundColorAnsi,
  IsHex,
  HexToRgb
} = require("../utils");

function styleR(...arr) {
  const regMatchRGB = /\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/;
  let out = [];
  for (let i of arr) {
    let text = i.split(/\r?\n/);

    for (let j = 0; j < text.length; j++) {
      text[j] = text[j].replace(/<([a-z]+)>/gi, (_, type) => {
        return st(type) || _;
      });
      text[j] = text[j].replace(
        /<([a-z]+)\s(.+?)>/gi,
        (_, type, sett) => {
          let setup = sett.split("&");
          for (let k = 0; k < setup.length; k++) {
            setup[k] = setup[k].replace(
              /^color\s*:\s*((.+?)+)/gi,
              (_, color) => {
                let reg = color.match(regMatchRGB);
                color = reg
                  ? [reg[1] | 0, reg[2] | 0, reg[3] | 0]
                  : color.trim();
                return RgbToColorAnsi(
                  ...(ArrayIsArray(3, color)
                    ? color
                    : IsHex(color)
                      ? HexToRgb(color)
                      : sc(color) || sc("white"))
                );
              }
            );
          }
          for (let k = 0; k < setup.length; k++) {
            setup[k] = setup[k].replace(
              /^bg\s*:\s*((.+?)+)/gi,
              (_, color) => {
                let reg = color.match(regMatchRGB);
                color = reg
                  ? [reg[1] | 0, reg[2] | 0, reg[3] | 0]
                  : color.trim();
                return RgbToBackgroundColorAnsi(
                  ...(ArrayIsArray(3, color)
                    ? color
                    : IsHex(color)
                      ? HexToRgb(color)
                      : sc(color) || sc("black"))
                );
              }
            );
          }
          for (let k = 0; k < setup.length; k++) {
            setup[k] = setup[k].replace(
              /^line\s*:\s*((.+?)+)/g,
              position => {
                let reg = position.match(
                  /\(\s*(\d+)\s*,\s*(\d+)\s*\)/
                );
                let xy = [reg[1] | 0, reg[2] | 0];
                return "\x1b[" + xy[0] + ";" + xy[1] + "H";
              }
            );
          }
          return st(type) ? setup.join("") + st(type) : _;
        }
      );
      text[j] = text[j].replace(/<@mid>/gi, "\x1b[0m");
      text[j] = text[j].replace(/<@end>/gi, "\x1b[0m");
    }
    out.push(text.join("\n"));
  }
  return out.join("\n");
}

module.exports = { styleR };