const https = require("https");
const express = require("express");
const addon = express();
const config = require("./config");
const pkg = require("./package");

let MANIFEST = {
	id: pkg.name,
	name: "Titlovi.com Subtitles",
	version: pkg.version,
	description: pkg.description,
	logo: config.LOGO_URL,
	catalogs: [],
	resources: ["subtitles"],
	types: ["movie", "series"],
	idPrefixes: ["tt"],
	behaviorHints: { configurable: true },
};

// Redirect to manifest
addon.get("/", (req, res) => {
	return res.redirect(301, "/manifest.json");
});

// Redirect to config page
addon.get("/:token?/configure", (req, res) => {
	res.redirect(301, `${config.TITLOVI_API_ENDPOINT}/configure`);
});

// Register addon with user config to Stremio
addon.get("/:token?/manifest.json", ({ params: { token } } = req, res) => {
	if (typeof token === "undefined") {
		MANIFEST.behaviorHints.configurationRequired = true;
		respond(res, MANIFEST);
	} else {
		MANIFEST.behaviorHints.configurationRequired = false;
		respond(res, MANIFEST);
	}
});

// Load subtitle to stremio
addon.get(
	"/:token/subtitles/:type/:id/:extra?.json",
	async ({ params: { token, type, id, extra } } = req, res) => {
		console.info("Request for subtitle: " + type + " " + id);

		await subtitle(token, id, type).then((subs) => {
			if (subs.length > 0) {
				console.log(`Subtitles loaded.`);
				respond(res, { subtitles: subs });
			} else {
				console.log("Subtitle not found.");
				respond(res, { subtitles: [] });
			}
		});
	}
);

/**
 * Get subtitles
 * /GET search/token/imdb/type/lang?
 *
 * @param {string} token
 * @param {string} imdb
 * @param {string} type
 */
const subtitle = async (token, imdb, type) => {
	const langs = Object.keys(config.LANG_MAP);
	const res = await httpsGet(
		config.TITLOVI_API_ENDPOINT,
		`/search/${token}/${imdb}/${type}/${langs.join("|")}`
	);

	if (res.status === 200) {
		const remap = res.data.map((sub) => {
			const lang = config.LANG_MAP[sub.lang];
			return {
				id: sub.id,
				url: sub.link_srt,
				lang: `${lang}${config.SUBS_SUFIX}`,
			};
		});
		return remap;
	} else {
		return [];
	}
};

/**
 * Https request wrapper
 *
 * @param {*} host
 * @param {*} query
 */
const httpsGet = (host, query) => {
	return new Promise((resolve, reject) => {
		https.get(`${host}${query}`, (res) => {
			res.setEncoding("utf8");
			res.on("data", (r) => resolve(JSON.parse(r)));
			res.on("error", (e) => reject({ error: e }));
		});
	});
};

/**
 * Response wrapper
 *
 * @param {*} res
 * @param {*} data
 */
const respond = (res, data) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "*");
	res.setHeader("Content-Type", "application/json");
	res.send(data);
};

// Start addon
addon.listen(process.env.PORT || 3050, process.env.HOST || "127.0.0.1", () => {
	console.log(
		`Addon started on http://${process.env.HOST || "127.0.0.1"}:${process.env.PORT || 3050
		}/manifest.json`
	);
});
