const { style, styleP, styleR } = require("../");

console.clear();

styleR("<bold color:cyan><dim>Hello<@reset-dimb>, World! 🍉<@reset>").Log();
styleR("<bold color:cyan><i>Hello<@reset-i>, World! 🍉<@reset>").Log();
styleR(
    "<b color: orange><inverse>Hello,<@reset-inverse> World! 🍉<@reset>"
).Log();

styleR("<?color: cyan& bg:lol><inverse>lol<@reset>").Log();

styleR("<?color: green><bold>STYLE <?color: red>R<@reset>").Log();

style({text: "STYLE", color: "ruby", st: "ul"}).Log();

styleP.banana.bglol.text("STYLE P").e.Log();
