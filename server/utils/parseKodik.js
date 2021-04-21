const Kodik = require("../models/AnimeKodik");
const axios = require("axios");
const mongoose = require("mongoose");
const slugify = require("slugify");

async function getPage(url, _params = {}) {
  const params = {
    token: "b7cc4293ed475c4ad1fd599d114f4435",
    types: "anime-serial",
    limit: 100,
    with_material_data: true,
    sort: "created_at",
    ..._params,
  };
  const resp = await axios.get(url, { params });

  resp.data.results.forEach(async (data) => {
    data.url = `${data.shikimori_id || 0}-${slugify(
      data.material_data.title_en,
      { lower: true }
    )}`;

    try {
      const an = new Kodik(data);
      await an.save();
      console.log("[+] : ", data.title);
    } catch (error) {
      console.log("[-----] : ", data.title);
    }
  });

  return resp.data.next_page || resp.data.results[0];
}

const main = async () => {
  await mongoose.connect(
    "mongodb+srv://root:jx8lmu23@animes.f5ujx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );

  console.log("[!!!] : Started");
  let next = "http://kodikapi.com/list";

  while (next) {
    next = await getPage(next);
  }

  console.log("[!!!] : End");
};

if (!module.parent) {
  try {
    main();
  } catch (err) {
    console.log(err);
  }
}

module.exports = getPage;
