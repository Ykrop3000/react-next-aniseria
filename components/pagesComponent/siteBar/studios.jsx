import React from "react";

import makeStyles from '@mui/styles/makeStyles';
import { Typography } from "@mui/material";
import Link from "next/link";
import BgImage from '../../imgages/bgImage'

const useStyles = makeStyles((theme) => ({
  item: {
    display: "flex",
    padding: "3px",
    overflow: "hidden",
    position: "relative",
    alignItems: "center",
    borderRadius: "6px",
    marginBottom: "3px",
    paddingRight: "16px",
  },
  image: {
    width: "64px",
    height: "64px",
    minWidth: "64px",
    minHeight: "64px",
    paddingTop: 0,
    borderRadius: "6px",
    backgroundSize: "contain",
    backgroundPosition: "50%",
    backgroundColor: "#fff",
    backgroundRepeat: "no-repeat",
  },
  text: {
    marginLeft: "16px",
  },
}));

export default function Studios({ studios }) {
  const classes = useStyles();

  return (
    <>
      {studios.map((studio) => (
        <Link href={"/animes/?studio=" + studio.id} key={studio.id}>
          <a className={classes.item}>
            {studio.image && 
              <BgImage
                className={classes.image}
                imgsrc={`https://shikimori.one${studio.image}`}
                imgalt="studio"
              />
            }
           
            <div className={classes.text}>
              <Typography
                variant="subtitle1"
                className="sectionTitleBold"
                style={{ padding: 0 }}
              >
                {studio.name}
              </Typography>
            </div>
          </a>
        </Link>
      ))}
    </>
  );
}
