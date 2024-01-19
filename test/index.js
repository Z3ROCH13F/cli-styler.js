const styler = require("../");
const utils = require("../utils/");

let hex = "#f5366e";
console.log(utils.RgbToColorAnsi(...utils.HexToRgb(hex)) + "lol");

styler.style({ text: "Hello Dunia!", color: "banana", bg: "#1466bc" }).Log();

styler.styleR("<bold color: red &bg: cyan>Hello Dunia 2024<@end>").Log();
