const urlParams = new URLSearchParams(window.location.search);
const path = urlParams.get("path");

const route = new Route(urlParams, "path");

route.get("colors", async function (res) {
	try {
		// Use relative path to avoid CORS issues
		const response = await fetch("../lib/colors.json");
		if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
		const colors = await response.json();

		let html = `
			<button class="toggle-btn" id="dark-toggle">Toggle Dark Mode</button>
			<h1>🎨 Color Reference</h1>
			<p>A list of all supported named colors in <code>cli-styler.js</code>.</p>
			<div class="color-grid">
		`;

		for (let [name, rgb] of Object.entries(colors)) {
			const rgbStr = `rgb(${rgb.join(",")})`;
			const isColorDark = isDark(rgb);
			html += `
				<div class="color-card">
					<div class="color-preview" style="background-color: ${rgbStr}; color: ${isColorDark ? 'white' : 'black'}">
						${name}
					</div>
					<div class="mono" style="font-size: 0.75rem; color: #64748b; margin-top: 0.5rem;">
						${rgbStr}
					</div>
				</div>
			`;
		}

		html += `</div>`;
		res.clear();
		res.send(html);

		const toggle = document.getElementById("dark-toggle");
		if (toggle) {
			toggle.addEventListener("click", () => {
				document.body.classList.toggle("dark");
			});
		}

	} catch (err) {
		console.error("Fetch error:", err);
		res.clear();
		res.send(`<h1>Error</h1><p>Could not load colors: ${err.message}</p><p>Check console for details.</p>`);
	}
});

function isDark(rgb) {
	// HSP color model brightness formula
	const hsp = Math.sqrt(
		0.299 * (rgb[0] * rgb[0]) +
		0.587 * (rgb[1] * rgb[1]) +
		0.114 * (rgb[2] * rgb[2])
	);
	return hsp < 127.5;
}

route.listen();
