import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import dynamic from "next/dynamic";
import StarIcon from "@material-ui/icons/Star";
import styles from "assets/css/pages/animePage/header.module.css";

// const Filter = dynamic(import("../filter/filter"));
const useStylesRate = makeStyles((theme) => ({
  raiting: {
    display: "flex",
    padding: "12px",
    fontSize: "16px",
    lineHeight: "24px",
    flexDirection: "row",
    verticalAlign: "middle",
    "@media (max-width: 959.95px)": {
      paddingLeft: 0,
      fontSize: "14px",
    },
  },
  raiting_wrap: {
    width: "fit-content",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  raiting_star: {
    color: " #ffb400",
  },
}));

const useStyles = makeStyles((theme) => ({
  img: {
    width: "100%",
    height: "auto",
    maxWidth: "100%",
    borderRadius: "6px",
  },
  img_wrap: {
    padding: "0 12px",
    "@media (min-width: 600px)": {
      padding: "12px",
      background: "#171717",
      borderRadius: "6px",
    },
  },
  title: {
    margin: " 4px 0px 16px",
    fontWeight: 600,
    fontSize: "28px",
    display: "flex",
    alignItems: "center",
  },
  mobileTitle_wrap: {
    color: "#fff",
    width: "100%",
    bottom: "20px",
    padding: "16px 20px",
    position: "absolute",
  },
  mobileTitle: {
    margin: 0,
    fontSize: " 1.3625rem",
    fontWeight: 600,
  },
  mobileTitle_subTitle: {
    color: "rgba(255,255,255,.85)",
  },
  subTitle: {
    margin: "16px 0px 0px",
    fontWeight: 500,
    fontSize: "20px",
  },
  status: {
    color: "rgba(255,255,255,.5)",
    fontSize: "75%",
    fontWeight: 500,
    marginLeft: "8px",
  },
  stats: {
    marginTop: "-12px",
    marginLeft: "-12px",
  },
  stat: {
    display: "flex",
    padding: "12px",
    fontSize: "16px",
    lineHeight: "24px",
    flexDirection: "row",
    verticalAlign: "middle",
    "@media (min-width: 1280px)": {
      padding: "16px",
    },
  },

  info: {
    "@media (max-width: 599px)": {
      color: "#fff",
      width: "100%",
      bottom: "20px",
      left: 0,
      padding: "16px 20px",
      position: "absolute",
    },
  },
}));

const Rate = ({ raiting, votes }) => {
  const classes = useStylesRate();

  return (
    <Grid item xs={12} md="auto">
      <div className={classes.raiting}>
        <div className={classes.raiting_wrap}>
          <StarIcon className={classes.raiting_star} />
          <span style={{ "margin-left": "4px" }}>
            {`${raiting} (голосов: ${votes})`}
          </span>
        </div>
      </div>
    </Grid>
  );
};

export default function Header({ data }) {
  const [width, setWidth] = React.useState(1040); // default width, detect on server.
  const classes = useStyles();

  React.useEffect(() => {
    setWidth(window.innerWidth);
  });

  return (
    <Grid container className={`${styles.header} container`} spacing={2}>
      <Grid
        item
        xs={12}
        sm={4}
        md={3}
        className={`poster_full ${styles.poster_wrap}`}
      >
        <div className={styles.poster}>
          <div className={classes.img_wrap}>
            <img
              className={classes.img}
              src={data.material_data.poster_url}
              alt="poster"
            />
          </div>
          <div className={classes.poster_buttons}></div>
        </div>
      </Grid>
      <Grid item xs={12} sm={8} md={9} className={classes.info}>
        {width >= 600 && (
          <>
            <Typography
              component="h2"
              variant="h5"
              color="inherit"
              className={classes.subTitle}
            >
              {data.title_orig + " / " + data.other_title}
            </Typography>
            <Typography
              component="h1"
              variant="h4"
              color="inherit"
              className={classes.title}
            >
              {data.material_data.title}
              <div className={classes.status}>
                {data.material_data.anime_kind}
              </div>
            </Typography>

            <Grid className={classes.stats} container>
              <Rate
                raiting={data.material_data.shikimori_rating}
                votes={data.material_data.shikimori_votes}
              />
              <Grid item className={classes.stat}></Grid>
            </Grid>
          </>
        )}

        {width < 600 && (
          <div className={classes.mobileTitle_wrap}>
            <Typography
              component="h2"
              variant="body2"
              className={classes.mobileTitle_subTitle}
            >
              {data.title_orig}
            </Typography>
            <div className={classes.mobileTitle}>
              {data.material_data.title}
            </div>
            <Typography
              component="h2"
              variant="body2"
              className={classes.mobileTitle_subTitle}
            ></Typography>

            <Rate
              raiting={data.material_data.shikimori_rating}
              votes={data.material_data.shikimori_votes}
            />
          </div>
        )}
      </Grid>

      <style global jsx>
        {`
          @media (max-width: 599px) {
            .poster_full {
              background-image: url(${data.material_data.poster_url});
            }
            .poster_full:before {
              top: 0;
              left: 0;
              width: 100%;
              bottom: 0;
              content: "";
              position: absolute;
              background-image: linear-gradient(
                -180deg,
                rgba(0, 0, 0, 0) 30%,
                rgba(0, 0, 0, 0.9) 90%
              );
            }
          }
        `}
      </style>
    </Grid>
  );
}
