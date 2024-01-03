const { sc } = require("./lib/select-color");
const { st } = require("./lib/style-text");
const { ln } = require("./lib/line");

const Mr = x => Math.round(x);
const isArr = x => Array.isArray(x);
const rgb = (r, g, b) => `\x1b[38;2;${Mr(r)};${Mr(g)};${Mr(b)}m`;
const br = (r, g, b) => `\x1b[48;2;${Mr(r)};${Mr(g)};${Mr(b)}m`;

global.style = (x = null) => {
    let text_style = "";
    let bg = x?.bg ?? x?.background ?? "";
    let ts = x?.ts ?? x?.textStyle;
    let line = ln(x?.line ?? "inline");
    let fixC = sc(x?.fixC) ?? sc("white");
    let fixBg = sc(x?.fixBg) ?? sc("black");

    let color = rgb(
        ...(isArr(x?.color) && x.color.length === 3
            ? x?.color
            : sc(x?.color) ?? fixC)
    );
    let background = br(
        ...(isArr(bg) && bg.length === 3 ? bg : sc(bg) ?? fixBg)
    );

    if (isArr(ts)) {
        text_style = ts.map(st).join("");
    } else if (typeof ts === "string") text_style = st(ts);

    let text = isArr(x?.text)
        ? x.text
              .map(
                  t =>
                      (t = `\x1b[0m${background}${color}${text_style}${t}\x1b[0m`)
              )
              .join(line)
        : `\x1b[0m${background}${color}${text_style}${
              x?.text ?? "2024"
          }\x1b[0m`;

    return text;
};

global.styleR = function (...arr) {
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
                                    ? [
                                          parseInt(reg[1]),
                                          parseInt(reg[2]),
                                          parseInt(reg[3])
                                      ]
                                    : color;

                                return rgb(
                                    ...(isArr(color)
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
                                    ? [
                                          parseInt(reg[1]),
                                          parseInt(reg[2]),
                                          parseInt(reg[3])
                                      ]
                                    : color;
                                return br(
                                    ...(isArr(color)
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
                                let xy = [parseInt(reg[1]), parseInt(reg[2])];
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
};

Object.prototype.Log = function () {
    console.log(this.valueOf());
};

module.exports = {
    sc,
    st,
    rgb,
    br,
    style,
    styleR
};
