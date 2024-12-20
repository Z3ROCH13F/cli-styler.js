/**
 * @param {string} select
 * @returns {(string|undefined)}
 */
module.exports = function (select) {
  let list = {
    bold: "\x1b[22m",
    b: "\x1b[22m",
    italic: "\x1b[23m",
    i: "\x1b[23m",
    underline: "\x1b[24m",
    ul: "\x1b[24m",
    blink: "\x1b[25m",
    color: "\x1b[39m",
    background: "\x1b[49m",
    bg: "\x1b[49m",
    dim: "\x1b[22m",
    dimb: "\x1b[22;1m",
    inverse: "\x1b[27m",
    hide: "\x1b[28m",
    strike: "\x1b[29m",
    styleText: "\x1b[22;23;24;25;27;28;29m",
    st: "\x1b[22;23;24;25;27;28;29m",
    all: "\x1b[0m",
  };
  return list[typeof select === "string" ? select?.toLowerCase() : undefined];
};
