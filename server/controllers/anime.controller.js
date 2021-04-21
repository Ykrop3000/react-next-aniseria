const Genres = require("../models/Genres");
const Kodik = require("../models/AnimeKodik");
const parse = require("../utils/parseKodik");
const axios = require("axios");

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

class animeController {
  async getList(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 24;
    const order = req.query.order || "id";
    const status = req.query.status;
    const kind = req.query.kind;

    // order id | score | episodes | aired_on
    const orders = [
      {
        name: "id",
        path: "shikimori_id",
      },
      {
        name: "score",
        path: "material_data.shikimori_rating",
      },
      {
        name: "episodes",
        path: "episodes_count",
      },
      {
        name: "aired_on",
        path: "material_data.aired_at",
      },
    ];

    const getOrder = (order) => {
      let reverce = "-";
      if (order[0] === "-") {
        reverce = "";
      }
      try {
        return (
          reverce +
          orders.filter((e) => e.name === order.replace("-", ""))[0].path
        );
      } catch {
        return undefined;
      }
    };

    const statuses = ["anons", "ongoing", "released"];
    const kindes = [
      "tv",
      "movie",
      "ova",
      "ona",
      "special",
      "music",
      "tv_13",
      "tv_24",
      "tv_48",
    ];
    const answer =
      "title material_data.title material_data.title_en material_data.poster_url url material_data.anime_kind material_data.shikimori_rating material_data.anime_status material_data.aired_at material_data.anime_genres material_data.shikimori_votes";

    let sortParams = {};

    if (status && statuses.includes(status))
      sortParams = Object.assign({}, sortParams, {
        "material_data.anime_status": status,
      });
    if (kind && kindes.includes(kind))
      sortParams = Object.assign({}, sortParams, {
        "material_data.anime_kind": kind,
      });

    const options = {
      page,
      limit,
      sort: getOrder(order),
      select: answer,
    };

    Kodik.paginate(sortParams, options, function(err, result) {
      res.json(result);
    });
  }
  async getOne(req, res) {
    const url = req.params.id;
    Kodik.findOne({ url }).then(async (resp) => {
      if (resp) {
        res.json(resp);
      } else {
        const data = await parse("https://kodikapi.com/search", {
          shikimori_id: url.split("-")[0],
        });

        if (data) {
          res.json(data);
        } else {
          res.json({ err: "notFound" });
        }
      }
    });
  }
  async getGenres(req, res) {
    const data = await Genres.find({});
    res.json(data);
  }
}

module.exports = new animeController();
