const fs = require('fs');
const path = require('path');
const utils = require('./index.js');

const jsonPath = path.join(__dirname, '../lib/colors.json');
const jsPath = path.join(__dirname, '../lib/colors.js');

const colors = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const output = {
    color: {},
    bg: {}
};

for (const [name, rgb] of Object.entries(colors)) {
    output.color[name.toLowerCase()] = utils.RgbToColorAnsi(...rgb);
    output.bg[name.toLowerCase()] = utils.RgbToBackgroundColorAnsi(...rgb);
}

const content = `// Pre-calculated ANSI sequences for maximum performance
// Generated from colors.json
module.exports = ${JSON.stringify(output, null, '\t')};
`;

fs.writeFileSync(jsPath, content);
console.log('Successfully generated lib/colors.js');
