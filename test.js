const styler = require("./"); // global

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

console.log(style({ text: 2023, color: "aqua" }));
console.log(x);
