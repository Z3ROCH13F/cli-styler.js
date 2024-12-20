module.exports = {
  /**
   * @param {number} len
   * @param {number[]} inp
   * @returns {boolean}
   */
  ArrayIsArray(len, inp) {
    if (
      len &&
      inp &&
      typeof len === "number" &&
      len === inp.length &&
      Array.isArray(inp)
    )
      return true;
    return false;
  },
  RgbToColorAnsi(r, g, b) {
    return `\x1b[38;2;${r | 0};${g | 0};${b | 0}m`;
  },
  RgbToBackgroundColorAnsi(r, g, b) {
    return `\x1b[48;2;${r | 0};${g | 0};${b | 0}m`;
  },
  IsHex(str) {
    return /^#/.test(str);
  },
  HexToRgb(hex) {
    hex = parseInt(hex.replace(/^#/, ""), 16);
    return [(hex >> 16) & 255, (hex >> 8) & 255, hex & 255];
  },
};
