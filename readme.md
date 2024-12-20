# cli-styler.js

cli-styler.js is a Node.js library that provides functions for styling text and background colors in the terminal.

## Installation

You can install cli-styler.js using npm:

```bash
npm i cli-styler.js
```

```js
const cli = require("cli-styler.js");

/*
Use Object.Log() or console.log() to print it out
*/

cli.style({ color: "butter", text: "Hello Dunia!" }).Log();
cli.styleR("<bold color: #ba22b1>Hello masbro!").Log();
cli.styleP().bold.ul.green.text("Hello ... World").Log();
```

## styleR function

```js
/*
// Explanation and Example

// set style text
<bold> or <b>           // set style text to bold
<blink>                 // set style text to blink
<underline> or <ul>     // set style text to underline
<italic> or <i>         // set style text to italic
<inverse>               // set style text to inverse
<dim>                   // set style text to dim
<strike>                // set style text to strikethrough

// set color, background color, and line without style text
<?color: red>               // set color to red
<?color: red&bg: banana>    // set color to red and set background color to banana
<?bg: banana&color: red>    // set background color to banana and set color to red
<?bg: (0,200,200)>          // set background color with (r, g, b)
<?bg: #90278a>              // set background color with hexadecimal
<?color: (200,200,0)>       // set color with (r, g, b)
<?color: #d105c1>           // set color with hexadecimal
<?line: (1, 10)>            // set position line to (x = 1, y = 10) or (columns = 1, rows = 10)

// set style text, color, background color, and line
<bold color: cyan>          // set style text to bold and set color to cyan

// reset
<@reset>                              // reset all style to default
<@reset-color>                        // reset color to default
<@reset-background> or <@reset-bg>    // reset background color to default
<@reset-styleText> or <@reset-st>     // reset style text bold, underline, blink, dim, inverse, hide, strikethrough

<@reset-bold> or <@reset-b>           // reset style text bold
<@reset-underline> or <@reset-ul>     // reset style text underline
<@reset-italic> or <@reset-i>         // reset style text italic
<@reset-blink>                        // reset style text blink
<@reset-inverse>                      // reset style text inverse
<@reset-hide>                         // reset style text hide
<@reset-strike>                       // reset style text strikethrough

// NOTE: <@reset-dim> and <@reset-b> will reset that same things (dim, bold)
<@reset-dim>                          // reset style text dim and bold
<@reset-dimb>                         // reset style text dim and set style text to bold

// undo style text, color, background color
<@undo-color>                       // undo color - 1 into previous color that you set
<@undo-bg>                          // undo background color - 1 into previous color that you set
<@undo-st>                          // undo style text - 1 into previous color that you set
*/

const cli = require("cli-styler.js");

// Example
cli.styleR("<bold color: green><inverse>Hello, World!<@reset>").Log();
```

## styleP function

```js
const cli = require("cli-styler.js");

cli.styleP().bold.banana.text("Hello world").Log();
cli.styleP().bold.banana.text("Hello world", "2024").Log();
cli.styleP().bold.banana.bgGreen.text("Hello world").Log();
cli.styleP().textR("<inverse color:red>lol").Log();
```

## style function

```js
const cli = require("cli-styler.js");

/*
// Explanation and Example

// set text
cli.style({text: "hello, world"})  // set text to "hello, world"
cli.style({text: ["foo", "bar"]})  // set text to "foo bar"

// set style text
cli.style({text: "foo", st: "ul"})               // set text to "foo" and style text to underline
cli.style({text: "foo", st: ["ul", "b"]})        // set text to "foo" and style text to underline and bold
cli.style({text: "foo", styleText: "ul"})        // set text to "foo" and style text to underline
cli.style({text: "foo", styleText: ["ul", "b"]}) // set text to "foo" and style text to underline and bold

// set color
cli.style({text: "foo", color: "red"})         // set text to "foo" and color to red
cli.style({text: "foo", color: [0, 200, 200]}) // set text to "foo" and color to (r, g, b)
cli.style({text: "foo", color: "#13d105"})     // set text to "foo" and color to "hexadecimal"

// set background color
// bg or background
cli.style({text: "foo", bg: "red"})         // set text to "foo" and background color to red
cli.style({text: "foo", bg: [250, 0, 200]}) // set text to "foo" and background color to (r, g, b)
cli.style({text: "foo", bg: "#d10505"})     // set text to "foo" and background color to "hexadecimal"

// set line if text is Array
// line or ln
cli.style({text: ["foo", "bar"], line: "inline"}) // set text to "foo" "bar" and "foo bar" 
cli.style({text: ["foo", "bar"], line: "nline"})  // set text to "foo" "bar" and "foo\nbar"
*/
```

## See all [color](https://z3roch13f.github.io/cli-styler.js/public/?path=colors) can you chose.

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.
