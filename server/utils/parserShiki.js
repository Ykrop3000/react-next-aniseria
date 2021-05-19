const Shiki = require("../models/Anime");
const axios = require("axios");
const mongoose = require("mongoose");
var colors = require("colors");

const sleepRequest = (milliseconds, originalRequest) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(axios(originalRequest)), milliseconds);
  });
};

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const {
      config,
      response: { status },
    } = error;
    const originalRequest = config;

    if (status === 429) {
      return sleepRequest(1000, originalRequest);
    } else {
      return Promise.reject(error);
    }
  }
);

async function getPage(url, _params = {}) {
  const params = {
    limit: 50,
    order: "id",
    ..._params,
  };
  const resp = await axios.get(url, { params });
  resp.data.forEach(async (data) => {
    const params = {
      token: "b7cc4293ed475c4ad1fd599d114f4435",
      shikimori_id: data.id,
      with_episodes: true,
    };
    const kodik = await axios.get("https://kodikapi.com/search", { params });

    const anime = await axios.get(
      "https://shikimori.one/api/animes/" + data.id
    );
    let result = {};

    if (kodik.data.results[0]) {
      const kodik_data = kodik.data.results[0];

      result = Object.assign(anime.data, {
        kp_id: kodik_data.kinopoisk_id,
        imdb_id: kodik_data.imdb_id,
        worldart_id: kodik_data.worldart_link,
      });
    } else {
      result = anime.data;
    }
    try {
      const an = new Shiki(result);
      await an.save();
      console.log(colors.green("[+] : " + data.name));
    } catch (error) {
      console.log(colors.red("[-----] : " + data.name));
    }
  });

  return resp.data.length == 0 ? false : true;
}

const main = async () => {
  await mongoose.connect(
    "mongodb+srv://root:jx8lmu23@animes.f5ujx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );

  console.log(colors.bgGreen("[!!!] : Started"));

  let next = true;
  let page = 1;
  while (next) {
    next = await getPage("https://shikimori.one/api/animes", { page });
    page += 1;
  }

  console.log(colors.bgGreen("[!!!] : End"));
};

if (!module.parent) {
  try {
    main();
  } catch (err) {
    console.log(err);
  }
}

async function parse(id) {
  const resp = await axios.get("https://shikimori.one/api/animes/" + id);

  try {
    const an = new Shiki(resp.data);
    await an.save();
    console.log(colors.green("[+] : " + resp.data.name));
    return resp.data;
  } catch (error) {
    console.log(colors.red("[-----] : " + resp.data.name));
    return false;
  }
}

module.exports = parse;
