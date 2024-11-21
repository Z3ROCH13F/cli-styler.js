const sc = require("./select-color");
const st = require("./style-text");

const ln = (x) =>
  ({ inline: "\x20", nline: "\n" })[
    typeof x === "string" ? x?.toLowerCase() : undefined
  ];

const {
  ArrayIsArray,
  RgbToColorAnsi,
  RgbToBackgroundColorAnsi,
  IsHex,
  HexToRgb,
} = require("../utils");

module.exports = function style(customStyle = {}) {
  let space = {};
  let color = customStyle.color;
  let bgColor = customStyle.bg ?? customStyle.background;
  let styleText = customStyle.st ?? customStyle.styleText;
  let line = ln(customStyle.line ?? customStyle.ln) ?? "";
  if (!customStyle.text) customStyle.text = "";

  if (color) {
    if (ArrayIsArray(3, color)) {
      space.color = RgbToColorAnsi(...color);
    } else if (typeof color === "string") {
      if (IsHex(color)) {
        space.color = RgbToColorAnsi(...HexToRgb(color));
      } else if (sc(color)) {
        space.color = RgbToColorAnsi(...sc(color));
      } else space.color = "";
    }
  }

  if (bgColor) {
    if (ArrayIsArray(3, bgColor)) {
      space.background = RgbToBackgroundColorAnsi(...bgColor);
    } else if (typeof bgColor === "string") {
      if (IsHex(bgColor)) {
        space.background = RgbToBackgroundColorAnsi(...HexToRgb(bgColor));
      } else if (sc(bgColor)) {
        space.background = RgbToBackgroundColorAnsi(...sc(bgColor));
      } else space.background = "";
    }
  }

  if (Array.isArray(styleText)) {
    space.styleText = styleText.map(st).join("");
  } else if (typeof styleText === "string")
    space.styleText = st(styleText) || "";

  space.text = Array.isArray(customStyle.text)
    ? customStyle.text
        .map(
          (t) =>
            (t = `\x1b[0m${space.background ?? ""}${
              space.color ?? ""
            }${space.styleText ?? ""}${t}\x1b[0m`),
        )
        .join(line)
    : `\x1b[0m${space.background ?? ""}${space.color ?? ""}${
        space.styleText ?? ""
      }${customStyle.text}\x1b[0m`;

  return space.text;
};
