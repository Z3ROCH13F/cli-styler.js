// ES6 shorthand
module.exports = x =>
  ({
    inline: "\x20",
    nline: "\n"
  })[typeof x === "string" ? x?.toLowerCase() : undefined];