const { sc } = require("./select-color");
const { st } = require("./style-text");
const { styleR } = require("./styleR");

const {
  ArrayIsArray,
  RgbToColorAnsi,
  RgbToBackgroundColorAnsi,
  RgbArray,
  IsHex,
  HexToRgb
} = require("../utils");

const regBgRgb = /^bg(\w+)/g;

const space = {
  output: ``
};

const styleP = new Proxy(space, {
  get: function (target, prop, rec) {
    // prop = property
    if (prop === "end") {
      let x = target.output;
      target.output = "";
      return x + "\x1b[0m";
    }

    if (sc(prop)) {
      target.output += RgbToColorAnsi(...sc(prop));
    } else if (regBgRgb.test(prop)) {
      prop.replace(regBgRgb, (_, color) => {
        target.output += RgbToBackgroundColorAnsi(...sc(color));
      });
    } else if (st(prop)) target.output += st(prop);
    if (/^_(\d+)/.test(prop)) {
      prop.replace(/^_(\d+)/, (_, d) => {
        target.output += " ".repeat(d);
      });
    }
    if (/^_n(\d+)/.test(prop)) {
      prop.replace(/^_n(\d+)/, (_, d) => {
        target.output += "\n".repeat(d);
      });
    }

    if (prop === "bg" || prop === "background") {
      return function (color) {
        if (ArrayIsArray(3, color)) {
          target.output += RgbToBackgroundColorAnsi(...color);
        } else if (typeof color === "string") {
          if (IsHex(color)) {
            target.output += RgbToBackgroundColorAnsi(
              ...HexToRgb(color)
            );
          } else if (sc(color)) {
            target.output += RgbToBackgroundColorAnsi(...sc(color));
          }
        }
        return rec;
      };
    }

    if (prop === "color") {
      return function (color) {
        if (ArrayIsArray(3, color)) {
          target.output += RgbToColorAnsi(...color);
        } else if (IsHex(color)) {
          target.output += RgbToColorAnsi(...HexToRgb(color));
        } else if (sc(color)) {
          target.output += RgbToColorAnsi(...sc(color));
        }
        return rec;
      };
    }

    if (prop === "text") {
      return function (...text) {
        for (let i of text) {
          target.output += i;
        }
        return rec;
      };
    }

    if (prop === "textr") {
      return function (...textr) {
        for (let i of textr) {
          target.output += styleR(i);
        }
        return rec;
      };
    }
    return rec;
  }
});

module.exports = { styleP };
