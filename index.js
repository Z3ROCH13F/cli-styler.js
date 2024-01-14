const { sc } = require("./lib/select-color");
const { st } = require("./lib/style-text");
const { ln } = require("./lib/line");

const {
    ArrayIsArray,
    RgbToColorAnsi,
    RgbToBackgroundColorAnsi
} = require("./utils");

function style(customStyle = null) {
    var space = {};
    let textColor = customStyle.color;
    let backgroundColor = customStyle.bg ?? customStyle.background;
    let textStyle = customStyle.ts ?? customStyle.textStyle;
    let line = ln(customStyle.line);

    if (textColor) {
        if (ArrayIsArray(textColor)) {
            space.color = RgbToColorAnsi(...textColor);
        } else if (typeof textColor === "string") {
            if (sc(textColor)) {
                space.color = RgbToColorAnsi(...sc(textColor));
            } else space.color = "";
        }
    } else space.color = "";

    if (backgroundColor) {
        if (ArrayIsArray(backgroundColor)) {
            space.background = RgbToBackgroundColorAnsi(...backgroundColor);
        } else if (typeof backgroundColor === "string") {
            if (sc(backgroundColor)) {
                space.background = RgbToBackgroundColorAnsi(
                    ...sc(backgroundColor)
                );
            } else space.background = "";
        }
    } else space.background = "";

    if (ArrayIsArray(textStyle)) {
        space.textStyle = textStyle.map(st).join("");
    } else if (typeof textStyle === "string") {
        space.textStyle = st(textStyle) || "";
    } else space.textStyle = "";

    space.text = ArrayIsArray(customStyle.text)
        ? customStyle.text
              .map(
                  t =>
                      (t = `\x1b[0m${space.background}${space.color}${space.textStyle}${t}\x1b[0m`)
              )
              .join(line)
        : `\x1b[0m${space.background}${space.color}${space.textStyle}${
              customStyle.text ?? "2024"
          }\x1b[0m`;
    return space.text;
}

function styleR(...arr) {
    const regMatchRGB = /\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/;
    let out = [];
    for (let i of arr) {
        var text = i.split(/\r?\n/);

        for (let j = 0; j < text.length; j++) {
            text[j] = text[j].replace(/<([a-z]+)>/gi, (_, type) => {
                return st(type) || _;
            });
            text[j] = text[j].replace(
                /<([a-z]+)\s(.+?)>/gi,
                (_, type, sett) => {
                    var setup = sett.split("&");
                    for (let k = 0; k < setup.length; k++) {
                        setup[k] = setup[k].replace(
                            /\s*color\s*:\s*((.+?)+)/gi,
                            (_, color) => {
                                let reg = color.match(regMatchRGB);
                                color = reg
                                    ? [reg[1] | 0, reg[2] | 0, reg[3] | 0]
                                    : color;

                                return RgbToColorAnsi(
                                    ...(ArrayIsArray(color)
                                        ? color
                                        : sc(color) || sc("white"))
                                );
                            }
                        );
                    }
                    for (let k = 0; k < setup.length; k++) {
                        setup[k] = setup[k].replace(
                            /\s*bg\s*:\s*((.+?)+)/gi,
                            (_, color) => {
                                let reg = color.match(regMatchRGB);
                                color = reg
                                    ? [reg[1] | 0, reg[2] | 0, reg[3] | 0]
                                    : color;
                                return RgbToBackgroundColorAnsi(
                                    ...(ArrayIsArray(color)
                                        ? color
                                        : sc(color) || sc("black"))
                                );
                            }
                        );
                    }

                    for (let k = 0; k < setup.length; k++) {
                        setup[k] = setup[k].replace(
                            /\s*line\s*:\s*((.+?)+)/gi,
                            pos => {
                                let reg = pos.match(
                                    /\(\s*(\d+)\s*,\s*(\d+)\s*\)/
                                );
                                let xy = [reg[1] | 0, reg[2] | 0];
                                return "\x1b[" + xy[0] + ";" + xy[1] + "H";
                            }
                        );
                    }
                    return st(type) ? setup.join("") + st(type) : _;
                }
            );
            text[j] = text[j].replace(/<@mid>/gi, "\x1b[0m");
            text[j] = text[j].replace(/<@end>/g, "\x1b[0m");
        }
        out.push(text.join("\n"));
    }
    return out.join("\n");
}

Object.prototype.Log = function () {
    console.log(this.valueOf());
};

module.exports = {
    sc,
    st,
    style,
    styleR
};
