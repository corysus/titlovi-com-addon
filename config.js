module.exports = {
    LOGO_URL: 'https://titlovi-stremio-server.onrender.com/logo.png',

    // Subtitle server endpoint
    TITLOVI_API_ENDPOINT: 'https://titlovi-stremio-server.onrender.com/',

    // ISO 639-2 language map for all available subtitle languages from titlovi.com
    // wiki: https://en.wikipedia.org/wiki/List_of_ISO_639-2_codes
    LANG_MAP: {
        "Bosanski": "bos",
        "Hrvatski": "hrv",
        "Srpski": "srb",
        "Cirilica": "cpb",
        "English": "eng",
        "Makedonski": "mkd",
        "Slovenski": "slo"
    },
    SUBS_SUFIX: '' // leave empty to use ISO 639-2
}
