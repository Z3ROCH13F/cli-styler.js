//style text
const st = (x) => {
  x = x.toLowerCase();
  const styleTEXT = {
    bold: "\x1b[1m",
    underline: "\x1b[4m",
    italic: "\x1b[3m",
    strike: "\x1b[9m",
    blink: "\x1b[5m",
    inverse: "\x1b[7m",
  };
  return styleTEXT[x] || "";
};

module.exports = { st };
