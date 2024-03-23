const { style, styleR } = require("../");

console.clear();
styleR("<?color: red&bg: banana>Test1<@reset>").Log();
styleR("<?bg: #A8FDE0><inverse>Test2<@reset-bg>lol").Log();
style({ text: "helo", styleText: ["ul", "b"] }).Log();
