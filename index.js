const { sc } = require("./lib/select-color"),
  { st } = require("./lib/style-text"),
  { ln } = require("./lib/line"),
  { example } = require("./lib/example");

const Mr = (x) => Math.round(x),
  isArr = (x) => Array.isArray(x),
  rgb = (r, g, b) => `\x1b[38;2;${Mr(r)};${Mr(g)};${Mr(b)}m`, // text color
  br = (r, g, b) => `\x1b[48;2;${Mr(r)};${Mr(g)};${Mr(b)}m`; // background color

global.style = (x = null) => {
  let text_style = "";
  let line = ln(x?.line ?? "inline");
  let fixC = sc(x?.fixC) ?? sc("white");
  let fixBg = sc(x?.fixBg) ?? sc("black");

  let color = rgb(
    ...(isArr(x?.color) && x.color.length === 3
      ? x?.color
      : sc(x?.color) ?? fixC)
  );
  let background = br(
    ...(isArr(x?.background) && x.background.length === 3
      ? x?.background
      : sc(x?.background) ?? fixBg)
  );

  // combination 2 or more text style
  if (isArr(x?.textStyle)) {
    text_style = x.textStyle.map(st).join("");
  } else if (typeof x?.textStyle === "string") text_style = st(x.textStyle);

  let text = isArr(x?.text)
    ? x.text
        .map(
          (t) => (t = `\x1b[0m${background}${color}${text_style}${t}\x1b[0m`)
        )
        .join(line)
    : `\x1b[0m${background}${color}${text_style}${x?.text ?? "LOL"}\x1b[0m`;

  return text;
};

Object.prototype.log = function () {
  console.log(this.valueOf());
}; // ?

module.exports = {
  sc,
  st,
  rgb,
  br,
  style,
  example,
};
