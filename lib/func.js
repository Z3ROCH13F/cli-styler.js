global.warning = (msg) => {
  return style({
    text: msg,
    textStyle: Array("bold"),
    color: "red",
  });
};

module.exports = { warning };
