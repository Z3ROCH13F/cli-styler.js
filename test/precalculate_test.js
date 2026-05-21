const assert = require("node:assert");
const { test } = require("node:test");
const fs = require("fs");
const path = require("path");

test("Pre-calculated colors validation", () => {
    const jsPath = path.join(__dirname, "../lib/colors.js");
    assert.ok(fs.existsSync(jsPath), "colors.js should exist");

    const colors = require(jsPath);
    assert.ok(colors.color, "Should have color property");
    assert.ok(colors.bg, "Should have bg property");

    // Test a specific known color
    // red in colors.json is [255, 0, 0]
    // ANSI color should be \x1b[38;2;255;0;0m
    assert.strictEqual(colors.color.red, "\x1b[38;2;255;0;0m");
    assert.strictEqual(colors.bg.red, "\x1b[48;2;255;0;0m");

    // Test case insensitivity (the keys in colors.js are already lowercase)
    assert.ok(colors.color.banana, "Should have banana");
});

test("Performance comparison (Simulated)", () => {
    const utils = require("../utils/index.js");
    const colorsJson = require("../lib/colors.json");
    const colorsJs = require("../lib/colors.js");
    
    const iterations = 100000;
    const colorName = "red";
    const rgb = colorsJson[colorName];

    console.time("Runtime Calculation (RGB -> ANSI)");
    for(let i=0; i<iterations; i++) {
        utils.RgbToColorAnsi(...rgb);
    }
    console.timeEnd("Runtime Calculation (RGB -> ANSI)");

    console.time("Pre-calculated Lookup");
    for(let i=0; i<iterations; i++) {
        const val = colorsJs.color[colorName];
    }
    console.timeEnd("Pre-calculated Lookup");
});
