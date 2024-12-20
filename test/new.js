const cli = require("../");

console.log(
  cli.style({
    text: ["List main function in cli-styler.js", "style", "styleP", "styleR"],
    ln: "\n\t• ",
    st: ["b", "i"],
    color: "green",
  }),
);

// console.log(cli.styleR("<bold color:red>styleR work!"));

console.log(cli.styleP().color("red").i.text("lol"));
console.log(cli.styleR("<inverse color:red>styleR work!<@reset>"));

console.log(
  cli.style({
    text: "Hello, world 2024",
    color: "cyan",
  }),
);
