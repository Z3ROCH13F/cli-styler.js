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
*/

styler.style({ color: "butter", text: "Hello Dunia!" }).Log();
styler.styleR("<bold color: #ba22b1>Hello masbro!").Log();
styler.styleP.bold.ul.green.text("Hello ...").text("World").end.Log()
```
## styleR function
```js
/*
// Explanation and Example

// set style text
<bold> or <b>         // set style text to bold
<blink>               // set style text to blink
<underline> or <ul>   // set style text to underline
<italic> or <i>       // set style text to italic
<inverse>             // set style text to inverse
<dim>                 // set style text to dim
<strike>              // set style text to strikethrough

// set style without style text
<?color: red>                  // set color to red
<?color: red&bg: banana>       // set color to red and set background color to banana
<?bg: banana&color: red>       // set background color to banana and set color to red
<?bg: (0,200,200)>             // set background color with (r, g, b)
<?bg: #90278a>                 // set background color with hexadecimal
<?color: (200,200,0)>          // set color with (r, g, b)
<?color: #d105c1>              // set color with hexadecimal
<?line: (1, 10)>               // set position line to x = 1 and y = 20

// set style text, color, background color, and line
<bold color: cyan>             // set style text to bold and set color to cyan

// reset
<@reset>                              // reset all style to default
<@reset-color>                        // reset color to default
<@reset-background> or <@reset-bg>    // reset background color to default
<@reset-styleText> or <@reset-st>     // reset style text to default
*/

const { styleR } = require("cli-styler.js");

// Example
styleR("<bold color: green><inverse>Hello, World!<@reset>").Log();

```
## styleP function
```js
const { styleP } = require("cli-styler.js");

styleP.bold.banana.text("Hello world").end.Log()
styleP.bold.banana.text("Hello world", "2024").end.Log()
styleP.bold.banana.bgGreen.text("Hello world").end.Log()
styleP.bold.ul.banana.text("Hello")._.green.ul.text("World").end.Log()
styleP.textR("<inverse color:red>lol")
```
## style function
```js
const { style } = require("cli-styler.js")

/*
// Explanation and Example

// set text
style({text: "hello, world"})  // set text to "hello, world"
style({text: ["foo", "bar"]})  // set text to "foo bar"

// set style text
style({text: "foo", st: "ul"})               // set text to "foo" and style text to underline
style({text: "foo", st: ["ul", "b"]})        // set text to "foo" and style text to underline and bold
style({text: "foo", styleText: "ul"})        // set text to "foo" and style text to underline
style({text: "foo", styleText: ["ul", "b"]}) // set text to "foo" and style text to underline and bold

// set color
style({text: "foo", color: "red"})         // set text to "foo" and color to red
style({text: "foo", color: [0, 200, 200]}) // set text to "foo" and color to (r, g, b)
style({text: "foo", color: #13d105})       // set text to "foo" and color to hexadecimal

// set background color
// note use bg or background
style({text: "foo", bg: "red"})         // set text to "foo" and background color to red
style({text: "foo", bg: [250, 0, 200]}) // set text to "foo" and background color to (r, g, b)
style({text: "foo", bg: #d10505})       // set text to "foo" and background color to hexadecimal

// set line if text is Array
// note use line or ln
styler.style({text: ["foo", "bar"], line: "inline"}) // set text to "foo" "bar" and "foo bar" 
styler.style({text: ["foo", "bar"], line: "nline"})  // set text to "foo" "bar" and "foo\nbar"
*/

```
## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.