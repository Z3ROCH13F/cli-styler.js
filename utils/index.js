module.exports = {
  ArrayIsArray: function (len, isArr) {
    if (len && isArr && typeof len === "number" && len === isArr.length)
      if (Array.isArray(isArr)) return true;
    return false;
  },
  RgbToColorAnsi: (r, g, b) => `\x1b[38;2;${r | 0};${g | 0};${b | 0}m`,
  RgbToBackgroundColorAnsi: (r, g, b) => `\x1b[48;2;${r | 0};${g | 0};${b | 0}m`,

  IsHex: str => /^#/.test(str),
  HexToRgb: function (hex) {
    hex = parseInt(hex.replace(/^#/, ""), 16);
    return [(hex >> 16) & 255, (hex >> 8) & 255, hex & 255];
  }
};