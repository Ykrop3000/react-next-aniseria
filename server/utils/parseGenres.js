const Genres = require("../models/Genres");
const axios = require("axios");
const mongoose = require("mongoose");
const slugify = require("slugify");

async function getGenres() {
  const resp = await axios.get("https://shikimori.one/api/genres");

  resp.data.forEach((data) => {
    try {
      const an = new Genres(data);
      an.save();
      console.log("[+] : ", data.russian);
    } catch (error) {
      console.log("[-----] : ", data.russian);
    }
  });
}

const main = async () => {
  await mongoose.connect(
    "mongodb+srv://root:jx8lmu23@animes.f5ujx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );

  console.log("[!!!] : Started");

  getGenres();

  console.log("[!!!] : End");
};

if (!module.parent) {
  try {
    main();
  } catch (err) {
    console.log(err);
  }
}
