const { sc } = require("./lib/select-color"),
  { st } = require("./lib/style-text"),
  { warning } = require("./lib/func");

const Mf = (x) => Math.floor(x),
  isArr = (x) => Array.isArray(x),
  rgb = (r, g, b) => `\x1b[38;2;${Mf(r)};${Mf(g)};${Mf(b)}m`, // text color
  br = (r, g, b) => `\x1b[48;2;${Mf(r)};${Mf(g)};${Mf(b)}m`; // background color

global.style = (x) => {
  let text_style = "";
  let text = isArr(x.text) ? x.text.join("\x20") : x.text || "";
  let color = rgb(
    ...(x.color && isArr(x.color) && x.color.length === 3
      ? x.color
      : sc(x.color) || [255, 255, 255])
  );
  let background = br(
    ...(x.background && isArr(x.background) && x.background.length === 3
      ? x.background
      : sc(x.background) || [0, 0, 0])
  );

  if (x.textStyle) {
    // combination 2 or more text style ( BAD ENGLISH )
    if (isArr(x.textStyle)) {
      text_style = x.textStyle.map(st).join("");
    } else if (typeof x.textStyle === "string") text_style = st(x.textStyle);
  }

  return `${background}${color}${text_style}${text}\x1b[0m`;
};

const e = style({
  text: `
example:
const x = style({text: "hello world", color: [0,255,255], textStyle: "underline"})
console.log(x)

output: ${style({
    text: "hello world",
    color: [0, 255, 255], // output color
    textStyle: "underline",
  })}
`,
  color: [200, 200, 0], // example color
});

module.exports = {
  style,
  warning,
  example: () => {
    console.log(e);
  },
};
