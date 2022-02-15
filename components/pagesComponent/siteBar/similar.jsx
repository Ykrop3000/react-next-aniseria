import React from "react";
import dynamic from "next/dynamic";

import { Typography } from "@mui/material";

const ListCardSmall = dynamic(import("components/cards/listCards/smallCard"));
const Carousel = dynamic(import("components/views/carousel"));
const RelatedWrap = dynamic(import("components/views/sitebar"));

export default function SiteBar({ similar, isMobile }) {
  return (
    <>
      {!isMobile && (
        <RelatedWrap title="Похожее">
          {similar.map((data) => (
            <ListCardSmall data={data} />
          ))}
        </RelatedWrap>
      )}
      {isMobile && (
        <>
          <Typography variant="h5" className="sectionTitleBold">
            Похожее
          </Typography>
          <Carousel data={similar} />
        </>
      )}
    </>
  );
}
