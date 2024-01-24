module.exports = {
  ArrayIsArray: function (len, inputArray) {
    let boolOut = false;
    if (len && inputArray) {
      if (typeof len === "number" && len === inputArray.length) {
        Array.isArray(inputArray) ? (boolOut = true) : boolOut;
      }
    }
    return boolOut;
  },
  // this r|0 will convert any number into int
  RgbToColorAnsi: (r, g, b) => `\x1b[38;2;${r | 0};${g | 0};${b | 0}m`,

  RgbToBackgroundColorAnsi: (r, g, b) =>
    `\x1b[48;2;${r | 0};${g | 0};${b | 0}m`,

  IsHex: str => /^#/.test(str),

  HexToRgb: function (hex) {
    hex = hex.replace(/^#/, "");
    hex = parseInt(hex, 16);
    return [(hex >> 16) & 255, (hex >> 8) & 255, hex & 255];
  }
};
