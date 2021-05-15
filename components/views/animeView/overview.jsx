import React from "react";
import Genres from "components/pagesComponent/genres";
import Description from "components/pagesComponent/decription";
// const Filter = dynamic(import("../filter/filter"));

export default function Overview({ data, isMobile }) {
  return (
    <>
      {data.genres && !isMobile && <Genres genres={data.genres} />}
      {data.description && <Description des={data.description_html} />}
      {data.genres && isMobile && <Genres genres={data.genres} />}
    </>
  );
}
