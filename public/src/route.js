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
		let routes = Object.keys(this.request);
		console.log("%c> Starting route ...", "color: green");
		if (this.request[this.path]) {
			console.log(`%c> Handling request [ ${this.path} ]`, "color: yellow");
			this.request[this.path](new Response());
			console.log("%c> Ended route!!!", "color: red");
		} else {
			console.log("%c> Not found route!!!", "color: red");
			new Response().send(
				`<h1>CLIENT-RESPONSE: 404</h1></br>query ?${this.search}=${this.path} is not found!</br><h3>List Routes</h3>`,
			);
			for (let i = 0; i < routes.length; i++) {
				new Response().send(`
        <li><a href="${window.location.origin}/cli-styler.js/public/?${this.search}=${routes[i]}">${routes[i]}</a></li>
        `);
			}
		}
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
