const Genres = require("../models/Genres");
const Anime = require("../models/Anime");
const parse = require("../utils/parserShiki");
const axios = require("axios");

// Configs
const filterConfig = require("../config/filter.config");
const animesConfig = require("../config/animes.config");

function isNumeric(value) {
  return /^-?\d+$/.test(value);
}

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
    const search = req.query.search;
    const status = req.query.status;
    const kind = req.query.kind;
    const studio = req.query.studio;
    const genresAnd = req.query.genre_and;
    const genresOr = req.query.genre_or;
    const ids = req.query.ids;
    const season = req.query.season;

    const orders = filterConfig.orders;
    const statuses = filterConfig.statuses;
    const kindes = filterConfig.kindes;

    const answer = animesConfig.listFields;

    let sortParams = {};

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

    if (
      season &&
      filterConfig.seasons.filter((e) => e.name == season).length !== 0
    ) {
      sortParams = Object.assign({}, sortParams, {
        $expr: {
          $in: [
            { $month: "$aired_on" },
            filterConfig.seasons.filter((e) => e.name == season)[0].path,
          ],
        },
      });
    }
    if (season && Number(season)) {
      sortParams = Object.assign({}, sortParams, {
        $expr: {
          $eq: [{ $year: "$aired_on" }, Number(season)],
        },
      });
    }
    if (search) {
      sortParams = Object.assign({}, sortParams, {
        [filterConfig.paths.title]: { $regex: search, $options: "$i" },
      });
    }
    if (status && statuses.includes(status))
      sortParams = Object.assign({}, sortParams, {
        [filterConfig.paths.status]: status,
      });
    if (studio)
      sortParams = Object.assign({}, sortParams, {
        [filterConfig.paths.studios]: {
          $elemMatch: { id: { $in: studio.split(",") } },
        },
      });
    if (kind && kindes.includes(kind))
      sortParams = Object.assign({}, sortParams, {
        [filterConfig.paths.kind]: kind,
      });
    if (ids)
      sortParams = Object.assign({}, sortParams, {
        [filterConfig.paths.id]: { $in: ids.split(",") },
      });
    if (genresOr)
      sortParams = Object.assign({}, sortParams, {
        [filterConfig.paths.genres]: {
          $elemMatch: { id: { $in: genresOr.split(",") } },
        },
        // db.users.find({ 'emails':{ $elemMatch: {'address': 'user@gmail.com'}}})
      });
    if (genresAnd)
      sortParams = Object.assign({}, sortParams, {
        [filterConfig.paths.genres]: { $all: genresAnd.split(",") },
      });
    const options = {
      page,
      limit,
      sort: getOrder(order),
      select: answer,
    };

    Anime.paginate(sortParams, options, function(err, result) {
      res.json(result);
    });
  }
  async getOne(req, res) {
    const filter = isNumeric(req.params.id)
      ? { id: req.params.id }
      : { url: "/animes/" + req.params.id };

    Anime.findOne(filter).then(async (resp) => {
      if (resp) {
        res.json(resp);
        // await Kodik.updateOne({ _id: resp._id }, { visits: resp.visits + 1 });
      } else {
        const data = await parse(req.params.id);

        if (data) {
          res.json(data);
        } else {
          res.status(404).json({ err: "notFound" });
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
