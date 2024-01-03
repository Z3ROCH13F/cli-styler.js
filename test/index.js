require("../"); // cli-styler.js global function style and styleR

let r = styleR(
    `<bold color: cyan><ul>2023<@mid>
<bold color: red>2024<@mid>`,
    "[<bold color: red>Notifikasi<@mid>][<bold>Type: <ul color:green>Testing<@mid>]: <bold color: (120,100  ,200)& bg: lol><italic>2024<@mid>",
    "<bold>Hello <ul color:red>World<@end>"
);

let x = styleR(
    "<bold color: banana&bg: (200,0,0)>New <ul bg: purple&color:blue>2024<@end>",
    `<bold><ul color: banana>lol<@end>`,
    `<UL color: green><bold><blink>lol 2<@end>`
);

console.log(r);
console.log(x);

style({ text: "update: v0.1.7", color: "cyan", ts: ["bold", "dim"] }).Log();
