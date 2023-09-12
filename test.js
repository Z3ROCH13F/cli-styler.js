const styler = require("./");

const x = style({
  text: [
    "Hello world!",
    "Hello dunia",
    style({
      text: ["lol1", "lol2"],
      color: "banana",
      textStyle: ["italic", "bold", "strike"],
    }),
    "masbro",
  ],
  color: "tomato",
  line: "nline",
  textStyle: "underline",
});

console.log(styler.style()); // if x.text === undefined ? text = LOL
console.log(style({ text: 2023.9, color: "aqua" }));

console.log(x);
// or
x.log();

style({ color: "butter", text: 0 }).log();

style({ color: "green", text: "end", background: "lol", fixC: "blue" }).log();

styler
  .style({
    text: "Power cli-styler.js",
    color: [Math.random() * 255, Math.random() * 255, Math.random() * 255],
    textStyle: ["bold", "inverse"],
  })
  .log();

"Hello world".log();

[0, 1, 2, 3].log();

style({ text: [1, 2], line: "$" }).log();
