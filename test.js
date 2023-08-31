const styler = require("./");

const x = style({
  text: [
    "Hello world!",
    "Hello dunia",
    style({ text: "lol", color: "green", textStyle: "italic" }),
    "masbro",
  ],
  color: "tomato",
  textStyle: "underline", // bug underline text = lol
});

console.log(x);