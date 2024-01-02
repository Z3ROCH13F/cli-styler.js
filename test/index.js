require("../"); // cli-styler.js

let r = styleR(
    `<bold color: cyan><ul>2023<@mid>
<bold color: red>2024<@mid>`,
    "[<bold color: red>Notifikasi<@mid>][<bold>Type: <ul color:green>Testing<@mid>]: <bold color: (120,100  ,200)& bg: lol><italic>2024<@mid>",
    "<bold>Hello <ul color:red>World<@end>"
);

let x = styleR(
    "<bold>Hello <ul color:red>World<@end>",
    "<bold color: banana&bg: (200,0,0)>New <ul bg: purple&color:blue>2024<@end>"
);

x.forEach(y => console.log(y));
r.forEach(x => console.log(x));
