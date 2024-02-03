const sc = require("./select-color.min");
const st = require("./style-text");

const ln = x =>
  ({ inline: "\x20", nline: "\n" })[
  typeof x === "string" ? x?.toLowerCase() : undefined
  ];

const {
  ArrayIsArray,
  RgbToColorAnsi,
  RgbToBackgroundColorAnsi,
  IsHex,
  HexToRgb
} = require("../utils");

function style(customStyle = {}) {
  let space = {};
  let color = customStyle.color;
  let bgColor = customStyle.bg ?? customStyle.background;
  let textStyle = customStyle.ts ?? customStyle.textStyle;
  let line = ln(customStyle.line ?? customStyle.ln) ?? "";

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
        space.background = RgbToBackgroundColorAnsi(
          ...HexToRgb(bgColor)
        );
      } else if (sc(bgColor)) {
        space.background = RgbToBackgroundColorAnsi(...sc(bgColor));
      } else space.background = "";
    }
  }

  if (ArrayIsArray(3, textStyle)) {
    space.textStyle = textStyle.map(st).join("");
  } else if (typeof textStyle === "string") {
    space.textStyle = st(textStyle) || "";
  }
  space.text = ArrayIsArray(customStyle.text.length, customStyle.text)
    ? customStyle.text
      .map(
        t =>
        (t = `\x1b[0m${space.background ?? ""}${space.color ?? ""
          }${space.textStyle ?? ""}${t ?? "2024"}\x1b[0m`)
      )
      .join(line)
    : `\x1b[0m${space.background ?? ""}${space.color ?? ""}${space.textStyle ?? ""
    }${customStyle.text ?? ""}\x1b[0m`;

  return space.text;
}

module.exports = style;