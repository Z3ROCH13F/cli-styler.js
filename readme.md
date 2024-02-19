# cli-styler.js

cli-styler.js is a Node.js library that provides functions for styling text and background colors in the terminal.

## Installation

You can install cli-styler.js using npm:

```bash
npm i cli-styler.js
```

```js
const styler = require("cli-styler.js");

/*
Use Object.Log() or console.log() to print it out

Example:
let y = styler.style({text: "Hello world", color: "cyan"})
console.log(y) || y.Log() // Hello world
*/

styler.style({ color: "butter", text: "Hello Dunia!" }).Log();
styler.styleR("<bold color: #ba22b1>Hello masbro!").Log();
styler.styleP.bold.ul.green.text("Hello ...").text("World").end.Log()
```
## styleR function
```js
let x = styleR(
    "<bold>Hello <ul color:red>World<@end>",
    "<bold color: banana&bg: (200,0,0)>New <ul bg: purple&color:blue>2024<@end>"
);

console.log(x)

/*
In text style have 3 choices:
1. color // for text color and you can also use (r,g,b) // (255,0,0) or hex
2. bg // for background color and (r,g,b) or hex Example: #fb3600
3. line // for set position x and y using (x, y)

This 2 function just \x1b[0m but have two different name
1. <@mid>
2. <@end>

List tag style-text use <name-tag-style>:
1. bold
2. ul // or underline
3. dim
4. italic
5. blink // my terminal does not support that(blink), and idk that will work for you (-_-)
6. inverse
7. strike
*/
```
## styleP function
```js
const { styleP } = require("cli-styler.js");

styleP.bold.banana.text("Hello world").end.Log()
styleP.bold.banana.text("Hello world", "2024").end.Log()
styleP.bold.banana.bgGreen.text("Hello world").end.Log()
styleP.bold.ul.banana.text("Hello")._.green.ul.text("World").end.Log()
styleP.textR("<inverse color:red>lol") // textR function = styleR function
```
## style function
- text
```js
const styler = require("cli-styler.js")
styler.style({text: "Hello world"}) // Hello world
styler.style({text: ["Hello world", "Hello dunia"]}) // Hello world Hello dunia
```
- textStyle || ts
```js
const styler = require("cli-styler.js")
// textStyle or ts
styler.style({text: "Power", textStyle: "bold"})
styler.style({text: "Power", textStyle: ["bold", "underline"]})
styler.style({text: "my style", ts: ["bold", "inverse", "underline"]})

/*
List textStyle and ts:
1. bold
2. dim
3. italic
4. underline
5. blink
6. inverse
7. strike
*/
```
- color
```js
const styler = require("cli-styler.js")

styler.style({text: 2023, color: [0, 200, 200]})
styler.style({text: 2024, color: "green"})
styler.style({text: 2024, color: "#fb3600"})
```
- background || bg
```js
const styler = require("cli-styler.js")
// background or bg
styler.style({text: 2023, background: [0, 255, 50]})
styler.style({text: 2024, background: "banana"})
styler.style({text: 2024, background: "#fb3600"})
styler.style({text: "my background", bg: "banana"})
```
- line
```js
const styler = require("cli-styler.js")

/*
List line:
1. inline // " "
2. nline // "\n"
*/

styler.style({text: ["arr1", "arr2"], line: "inline"})
styler.style({text: ["arr1", "arr2"], line: "nline"})
```
## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.