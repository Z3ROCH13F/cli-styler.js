const styler = require("./");

const x = style({
  text: "Hello world!",
  color: "lochmara",
  textStyle: ["inverse", "bold", "underline"],
});

console.log(x);

/*

style ->
 text,
 background,
 color,
 textStyle,
 line

*/
