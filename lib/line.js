const ln = (x) => {
  x && typeof x === "string" ? (x = x.toLowerCase()) : "";
  const line = {
    inline: "\x20",
    nline: "\n",
  };
  return line[x] || x;
};

module.exports = {ln}