const User = require("../models/Auth/User");
const Kodik = require("../models/AnimeKodik");
const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.addFavorite = async (req, res) => {
  const id = req.query.id;
  let token = req.headers["authorization"].split(" ")[1];
  let userId = undefined;

  if (!token) {
    return res
      .status(403)
      .send({ success: false, message: "No token provided!" });
  }
  if (!id) {
    return res.status(403).send({ success: false, message: "No id provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ success: false, message: "Unauthorized!" });
    }
    userId = decoded._id;
  });

  await User.updateOne({ _id: userId }, { $addToSet: { favorites: id } });

  res.status(200).send({ success: true, message: "add" });
};

exports.removeFavorite = async (req, res) => {
  const id = req.query.id;
  let token = req.headers["authorization"].split(" ")[1];
  let userId = undefined;

  if (!token) {
    return res
      .status(403)
      .send({ success: false, message: "No token provided!" });
  }
  if (!id) {
    return res.status(403).send({ success: false, message: "No id provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ success: false, message: "Unauthorized!" });
    }
    userId = decoded._id;
  });

  await User.updateOne({ _id: userId }, { $pull: { favorites: id } });

  res.status(200).send({ success: true, message: "removed" });
};
