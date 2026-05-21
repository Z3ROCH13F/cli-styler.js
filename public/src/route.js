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
		
		if (this.path && this.request[this.path]) {
			console.log(`%c> Handling request [ ${this.path} ]`, "color: yellow");
			this.request[this.path](new Response());
		} else {
			console.log("%c> Not found route!!!", "color: red");
			const res = new Response();
			res.clear();
			res.send(`
				<div style="padding: 2rem; text-align: center;">
					<h1>404</h1>
					<p>The path <code>${this.path || 'home'}</code> was not found.</p>
					<hr style="border: 0; border-top: 1px solid var(--border); margin: 2rem 0;">
					<h3>Available Routes</h3>
					<ul style="list-style: none; padding: 0;">
						${routes.map(r => `<li><a href="?${this.search}=${r}">${r}</a></li>`).join('')}
					</ul>
				</div>
			`);
		}
		console.log("%c> Route execution finished.", "color: green");
	}
}

class Response {
	constructor() {
		this.dom = document.getElementById("app") || document.body;
	}

	send(chunk = "") {
		this.dom.innerHTML += chunk;
	}

	clear() {
		this.dom.innerHTML = "";
	}

	event(type, callback) {
		document.body.addEventListener(type, callback);
	}
}
