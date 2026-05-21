# 🎨 cli-styler.js

A high-performance, lightweight Node.js library for terminal text styling. Supports Named Colors, Hex codes, RGB arrays, nested tags, and a fluent Proxy API.

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)
[![NPM Version](https://img.shields.io/npm/v/cli-styler.js.svg)](https://www.npmjs.com/package/cli-styler.js)

## 🚀 Installation

```bash
npm install cli-styler.js
```

## 🛠️ Usage Styles

`cli-styler.js` offers three distinct ways to style your terminal output, catering to different preferences and performance needs.

### 1. Fluent API (`styleP`)
The most readable way to style text using method chaining.
```javascript
const cli = require("cli-styler.js");

console.log(cli.styleP().bold.red.bgBlue.text("Hello World"));
```

### 2. Template Tags (`styleR`)
Perfect for rich, complex strings with nested styles or templates.
```javascript
console.log(cli.styleR("<bold color: #FF0000>Red Alert!</bold> <italic>Please stay calm.></italic>"));
```

### 3. Object-Based (`style`)
Ideal for programmatically generating styles or when working with dynamic data.
```javascript
console.log(cli.style({
    text: "Success!",
    color: [0, 255, 0], // RGB
    st: "bold",
    bg: "black"
}));
```

---

## 📖 API Reference

### `cli.styleP()` (Proxy-based)
Returns a proxy that accumulates styles and resets automatically after `.text()` is called.

| Property | Description | Example |
| :--- | :--- | :--- |
| `.colorName` | Sets foreground color | `.red`, `.banana`, `.cyan` |
| `.bgBackgroundName` | Sets background color | `.bgRed`, `.bgBlue` |
| `.styleName` | Sets text decoration | `.bold`, `.italic`, `.underline`, `.strike` |
| `.color(val)` | Set custom color (Hex/RGB) | `.color("#FF0")`, `.color([0, 255, 0])` |
| `.bg(val)` | Set custom background | `.bg("#333")`, `.bg([20, 20, 20])` |
| `.text(str)` | Returns the styled string | `.text("Output")` |
| `.textR(tagStr)`| Parses template tags | `.textR("<bold>Templated Text>")` |

### `cli.styleR(templateString)`
Parses a string containing custom XML-like tags.

**Basic Tags:**
- `<bold>`, `<b>`, `<italic>`, `<i>`, `<underline>`, `<ul>`, `<blink>`, `<inverse>`, `<dim>`, `<strike>`

**Complex Tags:**
- `<?color: red&bg: #000>`: Set multiple properties without text decoration.
- `<bold color: (255, 255, 0)>`: Set decoration and color at once.
- `<?line: (x, y)>`: Move cursor position to specific coordinates.

**State Management:**
- `<@reset>`: Reset all styles.
- `<@undo-color>`: Revert to previous color in the stack.
- `<@undo-bg>`: Revert to previous background in the stack.
- `<@undo-st>`: Revert to previous text decoration.

### `cli.style(options)`
**Options Object:**
- `text`: `string` or `string[]`
- `color`: `string` (Named/Hex) or `number[]` (RGB)
- `bg`: `string` (Named/Hex) or `number[]` (RGB)
- `st`: `string` or `string[]` (e.g., `"bold"`, `["bold", "italic"]`)
- `line` / `ln`: `"inline"` (space) or `"nline"` (newline) - *Used when `text` is an array.*

---

## 🎨 Color Support

- **Named Colors**: Supports 140+ standard CSS colors (e.g., `butter`, `banana`, `red`).
- **Hex Codes**: `#RRGGBB` or `#RGB` (e.g., `#FF5733`, `#F00`).
- **RGB Arrays**: `[R, G, B]` (e.g., `[255, 0, 0]`).

## ⚡ Performance
- **`style`**: ~0.016ms per call (High Performance)
- **`styleP`**: ~0.022ms per call (Readable & Fast)
- **`styleR`**: ~0.050ms per call (Template Power)

## 📄 License
ISC License. See [LICENSE](LICENSE) for more details.

---

*For a full list of supported color names, visit the [Documentation Site](https://z3roch13f.github.io/cli-styler.js/public/?path=colors).*
