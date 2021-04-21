import React from "react";
import Genres from "components/pagesComponent/genres";
import Description from "components/pagesComponent/decription";
// const Filter = dynamic(import("../filter/filter"));

export default function Overview({ data }) {
  return (
    <>
      <Genres genres={data.material_data.anime_genres} />

      {data.material_data.description && (
        <Description des={data.material_data.description} />
      )}
    </>
  );
}
