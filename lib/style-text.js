/**
 * @param {string} select
 * @returns {(string|undefined)}
 */
module.exports = function (select) {
  const list = {
    bold: "\x1b[1m",
    b: "\x1b[1m",
    dim: "\x1b[2m",
    italic: "\x1b[3m",
    i: "\x1b[3m",
    underline: "\x1b[4m",
    ul: "\x1b[4m",
    blink: "\x1b[5m",
    inverse: "\x1b[7m",
    hide: "\x1b[8m",
    strike: "\x1b[9m",
  };
  return list[typeof select === "string" ? select?.toLowerCase() : undefined];
};
