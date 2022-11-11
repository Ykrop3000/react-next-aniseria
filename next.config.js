const path = require("path");
const withCss = require("@zeit/next-css");
const withPurgeCss = require("next-purgecss");

module.exports = {
	webpack: (config) => {
		config.resolve.modules.push(path.resolve("./"));

		return config;
	},
	// future: {
	//   webpack5: true,
	// },
	images: {
		domains: ["st.kp.yandex.net", "shikimori.one"],
	},
};

// module.exports = withCss(withPurgeCss());
