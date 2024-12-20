module.exports = function () {
  const regBgRgb = /^bg(\w+)/g;
  return new Proxy(
    { output: ``, self: this },
    {
      get: function (target, prop, rec) {
        const { self } = target;
        const { utils } = self;
        // prop = property
        prop = prop.toLowerCase();

        if (self.sc(prop)) {
          target.output += self.ttc("string:color", prop);
        } else if (regBgRgb.test(prop)) {
          prop.replace(regBgRgb, (_, color) => {
            target.output += self.ttc("string:bg", color);
          });
        }

        if (self.st(prop)) target.output += self.st(prop);

        if (prop === "bg") {
          return function (color) {
            if (utils.ArrayIsArray(3, color)) {
              target.output += self.ttc("array:bg", color);
            } else if (typeof color === "string") {
              if (utils.IsHex(color)) {
                target.output += self.ttc("hex:bg", color);
              } else if (self.sc(color)) {
                target.output += self.ttc("string:bg", color);
              }
            }
            return rec;
          };
        }

        if (prop === "color") {
          return function (color) {
            if (utils.ArrayIsArray(3, color)) {
              target.output += self.ttc("array:color", color);
            } else if (typeof color === "string") {
              if (utils.IsHex(color)) {
                target.output += self.ttc("hex:color", color);
              } else if (self.sc(color)) {
                target.output += self.ttc("string:color", color);
              }
            }
            return rec;
          };
        }

        if (prop === "text") {
          return function (text) {
            target.output += text;
            return target.output + self.rs("all");
          };
        }

        if (prop === "textr") {
          return function (text) {
            target.output += self.styleR(text);
            return target.output + self.rs("all");
          };
        }
        return rec;
      },
    },
  );
};
