const { style, styleR } = require("../");

console.clear();

styleR("<bold color:cyan><dim>Hello<@reset-dimb>, World! 🍉<@reset>").Log();
styleR("<bold color:cyan><i>Hello<@reset-i>, World! 🍉<@reset>").Log();
styleR(
    "<b color: orange><inverse>Hello,<@reset-inverse> World! 🍉<@reset>"
).Log();
