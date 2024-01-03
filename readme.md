# CLI Styler

CLI Styler is a Node.js library that provides functions for styling text and background colors in the terminal.

## Installation

You can install CLI Styler using npm:

```bash
npm install cli-styler.js
```

```js
const styler = require("cli-styler.js");

/*
style() Or styler.style()

Use Object.Log() or console.log() to print it out

Example:
let y = style({text: "Hello world", color: "cyan"}) // global
console.log(y) || y.Log() // Hello world
*/

const x = style({
  text: [
    "Hello world!",
    "Hello dunia",
    style({
      text: ["lol1", "lol2"],
      color: "banana",
      textStyle: ["italic", "bold", "strike"],
    }),
    "masbro",
  ],
  color: "tomato",
  line: "nline",
  textStyle: "underline",
});

console.log(styler.style()); // text = LOL
console.log(style({ text: 2023.9, color: "aqua" }));

console.log(x);
// or
x.Log();

style({ color: "butter", text: 0 }).Log();
// green typo but auto fix white or fixC
style({ color: "gree", text: "end", background: "lol", fixC: "blue" }).Log();

styler
  .style({
    text: "Power cli-styler.js",
    color: [Math.random() * 255, Math.random() * 255, Math.random() * 255],
    textStyle: ["bold", "inverse"],
  })
  .Log();

"Hello world".Log();

```
## styleR function
```js
let x = styleR(
    "<bold>Hello <ul color:red>World<@end>",
    "<bold color: banana&bg: (200,0,0)>New <ul bg: purple&color:blue>2024<@end>"
); // global

console.log(x)

This is for style text <bold> and if typo or not found in lib/style-text.js then that will be empty ""

/*
In text style have 3 choices:
1. color // for text color and you can also use (r,g,b) // (255,0,0)
2. bg // for background color and (r,g,b)
3. line // for set position x and y using (x, y)

This 2 function just \x1b[0m but have two name
1. <@mid>
2. <@end>

List tag style-text use <name-tag-style>:
1. bold
2. ul // or underline
3. dim
4. italic
5. blink // my terminal does not support that(blink), and idk that will work for you or not (-_-)
6. inverse
7. strike
*/
```

## style function
- text
```js
style({text: "Hello world"}) // Hello world
style({text: ["Hello world", "Hello dunia"]}) // Hello world Hello dunia
```
- textStyle || ts
```js
// textStyle
style({text: "Power", textStyle: "bold"})
style({text: "Power", textStyle: ["bold", "underline"]})

// ts
style({text: "my style", ts: ["bold", "inverse", "underline"]})

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
style({text: 2023, color: [0, 200, 200]})
style({text: 2024, color: "green"})
```
- background || bg
```js
// background
style({text: 2023, background: [0, 255, 50]})
style({text: 2024, background: "banana"})

// bg
style({text: "my background", bg: "banana"})
```
- line
```js
/*
List line:
1. inline // normal
2. nline
*/

/*
Output:
arr1 arr2
*/
style({text: ["arr1", "arr2"], line: "inline"})


/*
Output:
arr1 arr2
*/
style({text: ["arr1", "arr2"]})

/*
Output:
arr1
arr2
*/
style({text: ["arr1", "arr2"], line: "nline"})

/*
Typo line
Output:
arr1$arr2
*/
style({text: ["arr1", "arr2"], line: "$"})

```
- fixC
- fixBg

[List all color](/lib/select-color.js)

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.
