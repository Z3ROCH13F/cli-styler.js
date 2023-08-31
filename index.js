const { sc } = require("./lib/select-color"),
  { st } = require("./lib/style-text"),
  { ln } = require("./lib/line"),
  { example } = require("./lib/example");

const Mf = (x) => Math.floor(x),
  isArr = (x) => Array.isArray(x),
  rgb = (r, g, b) => `\x1b[38;2;${Mf(r)};${Mf(g)};${Mf(b)}m`, // text color
  br = (r, g, b) => `\x1b[48;2;${Mf(r)};${Mf(g)};${Mf(b)}m`; // background color

global.style = (x) => {
  let text_style = "";
  let line = ln(x.line) || ln("inline");

  let color = rgb(
    ...(x.color && isArr(x.color) && x.color.length === 3
      ? x.color
      : sc(x.color) || sc("white"))
  );
  let background = br(
    ...(x.background && isArr(x.background) && x.background.length === 3
      ? x.background
      : sc(x.background) || sc("black"))
  );

  if (x.textStyle) {
    // combination 2 or more text style
    if (isArr(x.textStyle)) {
      text_style = x.textStyle.map(st).join("");
    } else if (typeof x.textStyle === "string") text_style = st(x.textStyle);
  }
  let text = isArr(x.text)
    ? x.text.join(`\x1b[0m${line}${background}${color}${text_style}`)
    : x.text || "";

  return `${background}${color}${text_style}${text}\x1b[0m`;
};

module.exports = {
  sc,
  st,
  rgb,
  br,
  style,
  example,
};
