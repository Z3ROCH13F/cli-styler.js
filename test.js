const styler = require("./");

const x = style({
  text: [
    "Hello world!",
    "Hello dunia",
    style({
      text: ["lol1", "lol2"],
      color: "green",
      textStyle: ["italic", "bold"],
    }),
    "masbro",
  ],
  color: "tomato",
  line: "nline",
  textStyle: "underline", // bug underline text = lol1
});

console.log(x);
