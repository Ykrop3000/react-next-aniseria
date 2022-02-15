import React from "react";

import makeStyles from '@mui/styles/makeStyles';

import Section from "components/pagesComponent/siteBar/section";
import Info from "components/pagesComponent/siteBar/info";

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

export default function SiteBar({ info }) {
  const classes = useStyles();

  return (
    <Section title="" cls={classes.info_wrap}>
      <Info data={info.fandubbers} title="Перевод:" />
      <Info data={info.duration + " мин."} title="Длительность эпизода:" />
    </Section>
  );
}
