/**
 * @param {string} select
 * @returns {(string|undefined)}
 */
const ln = (select) =>
  ({ inline: "\x20", nline: "\n" })[
    typeof select === "string" ? select?.toLowerCase() : undefined
  ];

/**
 * @param {Object} cs - custom style
 * @returns {string}
 */
module.exports = function (cs = {}) {
  const { utils, rs } = this;

  /**
   * @param {string} bg
   * @param {string} color
   * @param {string} st
   * @param {string} text
   * @returns {string}
   */
  const result = (bg, color, st, text) =>
    rs("all") + (bg ?? "") + (color ?? "") + (st ?? "") + text + rs("all");

  const space = {};
  cs.bg = cs.bg ?? cs.background;
  cs.bg = cs.bg ?? cs.background;
  cs.st = cs.st ?? cs.styleText;
  cs.ln = ln(cs.ln ?? cs.line) ?? cs.ln ?? cs.line ?? "";
  if (!cs.text) cs.text = "";

  const colorNotFound = (select) =>
    this.ttc("string:color", "red") +
    `Color [ ${select ? cs.color : cs.bg} ] is not found!` +
    rs("all");

  if (cs.color) {
    if (utils.ArrayIsArray(3, cs.color)) {
      space.color = this.ttc("array:color", cs.color);
    } else if (typeof cs.color === "string") {
      if (utils.IsHex(cs.color)) {
        space.color = this.ttc("hex:color", cs.color);
      } else if (this.sc(cs.color)) {
        space.color = this.ttc("string:color", cs.color);
      } else return new Error(colorNotFound(true));
    }
  }

  if (cs.bg) {
    if (utils.ArrayIsArray(3, cs.bg)) {
      space.background = this.ttc("array:color", cs.bg);
    } else if (typeof cs.bg === "string") {
      if (utils.IsHex(cs.bg)) {
        space.background = this.ttc("hex:bg", cs.bg);
      } else if (this.sc(cs.bg)) {
        space.background = this.ttc("string:bg", cs.bg);
      } else return new Error(colorNotFound(false));
    }
  }

  if (Array.isArray(cs.st)) space.st = cs.st.map(this.st).join("");
  else if (typeof cs.st === "string") space.st = this.st(cs.st) ?? "";

  return Array.isArray(cs.text)
    ? cs.text
        .map((t) => result(space.background, space.color, space.st, t))
        .join(cs.ln)
    : result(space.background, space.color, space.st, cs.text);
};
