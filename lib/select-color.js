/**
 * @param {string} select
 * @returns {(number[]|undefined)}
 */
module.exports = function (select) {
  return this.colors[select] ?? undefined;
};
