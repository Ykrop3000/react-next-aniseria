import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import Section from "components/pagesComponent/siteBar/section";
import Info from "components/pagesComponent/siteBar/info";
import Studios from "components/pagesComponent/siteBar/studios";
import Screenshot from "components/pagesComponent/siteBar/screenshot";
import SiteBarWrap from "components/views/siteBarWrap";
import Similar from "components/pagesComponent/siteBar/similar";

const useStyles = makeStyles(() => ({
  info_wrap: {
    background: "rgba(120, 120, 120, 0.05)",
    borderRadius: "6px",
    "@media (max-width: 600px)": {
      display: "flex",
      marginBottom: "25px",
      overflowX: "auto",
      whiteSpace: "nowrap",
      flexWrap: "nowrap",
    },
  },
}));

export default function SiteBar({ info, related, similar, isMobile }) {
  const classes = useStyles();

  return (
    <SiteBarWrap>
      {/* ------------------------------------------------------------------ */}

      <Section title="Издатели">
        <Studios studios={info.studios} />
      </Section>

      <Section title="" cls={classes.info_wrap}>
        <Info data={info.fandubbers} title="Перевод:" />
        <Info data={info.duration + " мин."} title="Длительность эпизода:" />
      </Section>

      {/* ------------------------------------------------------------------ */}

      {info.screenshots && (
        <Section title="Кадры">
          {info.screenshots.map((i) => (
            <Screenshot src={i.preview} />
          ))}
        </Section>
      )}

      <Similar similar={similar} isMobile={isMobile} />
    </SiteBarWrap>
  );
}