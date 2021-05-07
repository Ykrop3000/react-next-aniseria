const Router = require("express");
const router = new Router();

let authenticationController = require("../controllers/auth.controller");

/**
 * (POST Method)
 */
// SignUp
router.post("/signup", authenticationController.signup);

//SignIn
router.post("/signin", authenticationController.signin);

router.get("/me", authenticationController.getMe);
module.exports = router;
