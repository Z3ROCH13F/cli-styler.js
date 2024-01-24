// ES6 shorthand
const ln = x =>
  ({
    inline: "\x20",
    nline: "\n"
  })[typeof x === "string" ? x?.toLowerCase() : undefined];

module.exports = { ln };