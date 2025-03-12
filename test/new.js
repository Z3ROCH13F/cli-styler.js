const cli = require("../");

// cli.error(true);

cli.global(true);

const test = cli.styleR(
	"<bold color: banana>Masbro <?color: cyan>20<@undo-color>25",
);

console.log(test);

const test2 = cli.style({ text: "helo", st: "inverse", color: "red" });

console.log(test2);

console.log(cli.styleR("<bold color:red&bg:banana>Gg<@reset>"));

console.log(cli.list);
