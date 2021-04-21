const Router = require("express");
const router = new Router();
const controller = require("../controllers/anime.controller");

router.get("/animes/:id", controller.getOne);
router.get("/animes", controller.getList);
router.get("/genres", controller.getGenres);

module.exports = router;
