const urlParams = new URLSearchParams(window.location.search);
const path = urlParams.get("path");

const route = new Route(urlParams, "path");

route.get("colors", async function (res) {
  let flip = true;
  // stupid error while i using "../../lib/colors.json"
  let response = await fetch(
    "https://z3roch13f.github.io/cli-styler.js/lib/colors.json",
  );
  let text = await response.text();

  let colors = JSON.parse(text);

  var bg_color;

  res.event("click", function () {
    flip = !flip;
    const bg = document.querySelector("body");

    if (flip) {
      bg_color = "white";
    } else bg_color = "black";

    const name = document.querySelectorAll("#name");

    name.forEach((i) => {
      if (!flip) {
        i.style.color = "white";
      } else i.style.color = "black";

      bg.style.backgroundColor = bg_color;
    });
  });

  res.send(`<span id="name"><h1>CLICK SCREEN</h1></span></br>`);

  for (let i of Object.keys(colors)) {
    res.send(
      `<span id="name">${i}: </span><span id="value" style="color: rgb(${colors[i].toString()});"></span></br>`,
    );
  }

  const value = document.querySelectorAll("#value");

  value.forEach((i) => {
    i.innerText = "Hello, World!";
  });
});

route.listen();
