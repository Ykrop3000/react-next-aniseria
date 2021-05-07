const Router = require("express");
const router = new Router();
const controller = require("../controllers/user.controller");

router.get("/addfavorite", controller.addFavorite);
router.get("/removefavorite", controller.removeFavorite);

module.exports = router;
