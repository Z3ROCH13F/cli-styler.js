const styler = require("./");

const x = style({
  text: "Hello world!",
  color: "tomato",
  textStyle: ["inverse", "bold", "underline"],
});

console.log(x);

/*

style ->
 text -> "hello1" || Array("hello1","hello2") || ["hell1","hello2"],
 background -> 3 rgb Array || name color example "red",
 color,
 textStyle,
 line

*/
