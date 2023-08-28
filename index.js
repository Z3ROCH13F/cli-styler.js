const { sc } = require("./lib/select-color");
const { st } = require("./lib/style-text");
const { warning } = require("./lib/func");

const Mf = (x) => Math.floor(x);
const isArr = (x) => Array.isArray(x);
const rgb = (r, g, b) => `\x1b[38;2;${Mf(r)};${Mf(g)};${Mf(b)}m`; // text color
const br = (r, g, b) => `\x1b[48;2;${Mf(r)};${Mf(g)};${Mf(b)}m`; // background color

global.style = (x) => {
  let text_style = "";
  let text = Array.isArray(x.text) ? x.text.join("\x20") : x.text || "";
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

  if (x.textStyle !== undefined) {
    // combination 2 or more text style ( BAD ENGLISH )
    if (Array.isArray(x.textStyle)) {
      text_style = x.textStyle.map(st).join("");
    } else {
      if (typeof x.textStyle === "string") text_style = st(x.textStyle);
    }
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
