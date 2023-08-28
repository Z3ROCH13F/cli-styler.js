# CLI Styler

CLI Styler is a Node.js library that provides functions for styling text and background colors in the terminal.

## Installation

You can install CLI Styler using npm:

```bash
npm install cli-styler.js
```

```js

require("cli-styler.js"); // global

const styledText = style({
  text: "Hello, world!",
  color: [255, 0, 0], // Red color
  background: [0, 0, 255], // Blue background
  textStyle: "bold", // Bold text style or ["bold", "underline", "italic"] to add more text style
});

console.log(styledText);

console.log(style({text: "Hello Dunia!", textStyle: ["bold", "underline"]}));
```

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.
