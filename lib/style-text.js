const st = (x) => {
  const styleTEXT = {
    bold: "\x1b[1m",
    dim: "\x1b[2m",
    italic: "\x1b[3m",
    underline: "\x1b[4m",
    ul: "\x1b[4m",
    blink: "\x1b[5m",
    inverse: "\x1b[7m",
    strike: "\x1b[9m",
  };
  return styleTEXT[x?.toLowerCase()] || "";
};

module.exports = { st };
