const { style, styleP, styleR } = require("../");

style({ text: ["test1", "test2"], textStyle: ["b", "ul"],ln:"nline" }).Log();
styleP.red.bold.bglol.text("yooo").e.Log();
styleR("<bold color: (27,200,100)&bg:red><ul>hello dunia<@reset> lol").Log();
