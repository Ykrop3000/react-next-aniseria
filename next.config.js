const path = require("path");

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
