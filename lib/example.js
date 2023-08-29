const example = () => {
  const x = style({
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
  console.log(x)
};

module.exports = { example };
