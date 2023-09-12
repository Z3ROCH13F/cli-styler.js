# CLI Styler

CLI Styler is a Node.js library that provides functions for styling text and background colors in the terminal.

## Installation

You can install CLI Styler using npm:

```bash
npm install cli-styler.js
```

```js

const styler = require("cli-styler.js");

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
x.log();

style({ color: "butter", text: 0 }).log();
// green typo but auto fix white or fixC
style({ color: "gree", text: "end", background: "lol", fixC: "blue" }).log();

styler
  .style({
    text: "Power cli-styler.js",
    color: [Math.random() * 255, Math.random() * 255, Math.random() * 255],
    textStyle: ["bold", "inverse"],
  })
  .log();

"Hello world".log();

[0, 1, 2, 3].log();

```

## style function
- text
```js
style({text: "Hello world"}) // Hello world
style({text: ["Hello world", "Hello dunia"]}) // Hello world Hello dunia
```
- textStyle
```js
style({text: "Power", textStyle: "bold"})
style({text: "Power", textStyle: ["bold", "underline"]})
/*
List textStyle:
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
- background
```js
style({text: 2023, background: [0, 255, 50]})
style({text: 2024, background: "banana"})
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

[**List all color**](/lib/select-color.js)

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.
