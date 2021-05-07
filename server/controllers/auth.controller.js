var exports = (module.exports = {});

const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");
const User = require("../models/Auth/User");

exports.getMe = function(req, res) {
  let token = req.headers["authorization"].split(" ")[1];

  if (!token) {
    return res
      .status(403)
      .send({ success: false, message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ success: false, message: "Unauthorized!" });
    }

    User.findOne({ _id: decoded._id }).then(async (resp) => {
      delete resp._doc.password;
      res.json({ success: true, ...resp._doc });
    });
  });
};

exports.signup = function(req, res) {
  if (!req.body.username || !req.body.password) {
    res.json({ success: false, msg: "Please pass username and password." });
  } else {
    let newUser = new User({
      username: req.body.username,
      password: req.body.password,
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({ success: false, msg: "Username already exists." });
      }
      res.json({ success: true, msg: "Successful created new user." });
    });
  }
};

exports.signin = function(req, res) {
  User.findOne(
    {
      username: req.body.username,
    },
    function(err, user) {
      if (err) throw err;

      if (!user) {
        res.status(401).send({
          success: false,
          msg: "Authentication failed. User not found.",
        });
      } else {
        // check if password matches
        user.comparePassword(req.body.password, function(err, isMatch) {
          if (isMatch && !err) {
            // if user is found and password is right create a token
            let token = jwt.sign(user.toJSON(), config.secret);
            // return the information including token as JSON
            res.json({
              success: true,
              token: "JWT " + token,
              username: user.username,
              avatar: user.avatar,
            });
          } else {
            res.status(401).send({
              success: false,
              msg: "Authentication failed. Wrong password.",
            });
          }
        });
      }
    }
  );
};
