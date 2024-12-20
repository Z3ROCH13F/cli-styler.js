// simple - query - route

class Route {
  constructor(urlParams, search = null) {
    this.urlParams = urlParams;
    this.search = search ?? "path";
    this.path = this.urlParams.get(this.search);
    this.request = {};
  }

  get(path, callback) {
    this.request[path] = callback;
  }

  listen() {
    console.log("%cStarting route ...", "color: green");
    if (this.request[this.path]) {
      console.log(`%c> Handling request [ ${this.path} ]`, "color: yellow");
      this.request[this.path](new Response());
      console.log("%c> Ended route!!!", "color: red");
    } else
      new Response().send(
        `<h1>CLIENT: 404</h1></br>query ?${this.search}=${this.path} is not found!`,
      );
  }
}

class Response {
  constructor() {
    this.dom = document.body;
  }

  send(chunk = "") {
    this.dom.innerHTML += chunk;
  }

  event(type, callback) {
    this.dom.addEventListener(type, callback);
  }
}
