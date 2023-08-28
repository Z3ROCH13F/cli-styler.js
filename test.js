const styler = require("./").example();

let i = 0,
  n = 255;

while (i < 10) {
  i++;
  const x = style({
    text: "Hello World",
    color: [Math.random() * n, Math.random() * n, Math.random() * n],
    background: [Math.random() * n, Math.random() * n, Math.random() * n],
    textStyle: ["bold", "underline"],
  });

  console.log(x);
}

console.log(
  style({
    text: Array("hello dunia", "Power!"),
    color: "red",
    textStyle: Array("inverse", "blink", "strike"),
  })
);

console.log(warning("Warning!"));