const styler = require("../");

styler
    .style({
        text: "Hello world",
        line: "nline",
        color: "cyan",
        ts: ["bold", "ul"],
        background: [200, 20, 50]
    })
    .Log();

styler
    .styleR("<bold color: (0,200,200)&bg: orange><ul>hello dunia<@end>")
    .Log();

styler
    .style({
        text: "Power cli-styler.js",
        color: [Math.random() * 255, Math.random() * 255, Math.random() * 255],
        textStyle: ["bold", "inverse"]
    })
    .Log();
