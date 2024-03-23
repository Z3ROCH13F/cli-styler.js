module.exports = x =>
  ({
    color: "\x1b[39m",
    background: "\x1b[49m",
    bg: "\x1b[49m",
    styleText: "\x1b[22m",
    st: "\x1b[22m"
  })[typeof x === "string" ? x?.toLowerCase() : undefined];