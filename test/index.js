const { style, styleR, styleP } = require("../");

styleP().cyan.bGlol.bold.ul
  .text("Name:")
  ._10.text("cli-styler.js")
  ._n2.bg("red").text("v0.3.0").end.Log()
styleP().bold.banana.text("Hello world").end.Log()
styleP().bold.color("#e23ad8").text("Hello world ", "2024").end.Log()
styleP().bold.color([200, 200, 0]).bgblue.text("Hello world").end.Log()
styleP().bold.banana.text("Hello")._.green.ul.text("World").end.Log()