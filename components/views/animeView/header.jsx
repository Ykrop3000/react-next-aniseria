import React from "react";
import { Grid, Typography, Button, MenuItem, Select } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { connect } from "react-redux";
import dynamic from "next/dynamic";
import StarIcon from "@mui/icons-material/Star";
import styles from "assets/css/pages/animePage/header.module.css";
import BgImage from '../../imgages/bgImage'

import { addFavorite, removeFavorite } from "src/api";
const Menu = dynamic(import("@mui/material/Menu"));

const BookmarkBorderIcon = dynamic(import("@mui/icons-material/BookmarkBorder"));
const BookmarkIcon = dynamic(import("@mui/icons-material/Bookmark"));

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
      padding: "4px",
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
  title: {
    margin: "4px 0px 16px",
    fontWeight: 600,
    fontSize: "28px",
    display: "flex",
    alignItems: "center",
  },
  mobileTitle_wrap: {
    color: "#fff",
    width: "100%",
    padding: "16px 20px",
    position: "absolute",
    bottom: 0,
    left: 0,
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

const Actions = ({
  hookWatch,
  user,
  anime,
  isfavorite,
  mobile = false,
  stats,
}) => {
  const [stat, setStat] = React.useState(false);
  const [open, setOpen] = React.useState(null);

  const handleChange = (event) => {
    setStat(event.target.value);
    if (event.target.value === "delete") {
      removeFavorite(anime.id);
    } else {
      addFavorite({
        user_id: user.id,
        target_id: anime.id,
        status: event.target.value,
      });
    }
  };
  const handleClick = (event) => {
    setOpen(event.currentTarget);
  };
  const handleClose = () => {
    setOpen(null);
  };
  return (
    <div className={`${styles.actions}`}>
      <Button
        onClick={hookWatch}
        fullWidth={!mobile}
        variant="contained"
        color="primary"
        className={styles.action}
      >
        Смотреть
      </Button>

      {/* variant={!mobile ? "outlined" : "contained"} */}
      {/* disabled={isLogged ? false : true} */}

      {mobile && (
        <>
          <Button
            disabled={!user.id}
            onClick={handleClick}
            variant="contained"
            color="primary"
            className={styles.action}
          >
            {!isfavorite ? <BookmarkBorderIcon /> : <BookmarkIcon />}
          </Button>
          <Menu
            id="stats-menu"
            anchorEl={open}
            keepMounted
            open={Boolean(open)}
            onClose={handleClose}
          >
            {Object.keys(stats).map((key, id) => (
              <MenuItem
                key={id}
                value={key}
                onClick={() => handleChange({ target: { value: key } })}
              >
                {stats[key]}
              </MenuItem>
            ))}
          </Menu>
        </>
      )}

      {!mobile && (
        <Select
          fullWidth
          disabled={!user.id}
          value={stat}
          variant="outlined"
          onChange={handleChange}
          renderValue={(select) =>
            !select
              ? !isfavorite
                ? "Добавить закладки"
                : "Удалить из закладок"
              : stats[select]
          }
        >
          {isfavorite && (
            <MenuItem value="delete">Удалить из закладок</MenuItem>
          )}
          {Object.keys(stats).map((key, id) => (
            <MenuItem key={id} value={key}>
              {stats[key]}
            </MenuItem>
          ))}
        </Select>
      )}
    </div>
  );
};

const Rate = ({ raiting, votes }) => {
  const classes = useStylesRate();

  return (
    <Grid item xs={12} md="auto">
      <div className={classes.raiting}>
        <div className={classes.raiting_wrap}>
          <StarIcon className={classes.raiting_star} />
          <span
            style={{ marginLeft: "4px" }}
            itemProp="aggregateRating"
            itemScope
            itemType="https://schema.org/AggregateRating"
          >
            <meta itemProp="bestRating" content="10" />
            <span itemProp="ratingValue" style={{ marginRight: "8px" }}>
              {raiting}
            </span>
            (голосов:
            <span itemProp="reviewCount" style={{ margin: "0 4px" }}>
              {votes
                .map((e) => e.value)
                .reduce(function(previousValue, currentValue, index, array) {
                  return Number(previousValue) + Number(currentValue);
                })}
            </span>
            )
          </span>
        </div>
      </div>
    </Grid>
  );
};

function Header({
  data,
  hookWatch,
  isMobile,
  user,
  isLogged,
  kinds,
  stats,
  width = 1040,
  statusAnime,
}) {
  const classes = useStyles();

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
          <div
            className={styles.img_wrap}
            itemScope
            itemType="http://schema.org/ImageObject"
          >
            <BgImage
              itemProp="contentUrl"
               className={`card_poster ${styles.card_poster}`}
              imgsrc={`https://shikimori.one${data.image.original}`}
              imgalt="poster"
            />
          </div>

          <Actions
            hookWatch={hookWatch}
            anime={data}
            isLogged={isLogged}
            isfavorite={data.favoured}
            stats={stats}
            user={user}
            mobile={width < 600}
          />

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
              {data.english[0] + " / " + data.japanese[0]}
            </Typography>
            <Typography
              component="h1"
              variant="h4"
              color="inherit"
              className={classes.title}
              itemProp="name"
            >
              {data.russian}
              <div className={classes.status}>{kinds[data.kind]}</div>
            </Typography>

            <Grid className={classes.stats} container>
              <Rate raiting={data.score} votes={data.rates_scores_stats} />
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
              {data.name}
            </Typography>
            <div  itemProp="name" className={classes.mobileTitle}>{data.russian}</div>
            <Typography
              component="h2"
              variant="body2"
              className={classes.mobileTitle_subTitle}
            ></Typography>
            <Typography
              component="h2"
              variant="body2"
              className={classes.mobileTitle_subTitle}
            >
              {`${kinds[data.kind]} ${data.aired_on.split("-")[0]} ${
                statusAnime[data.status]
              }`}
            </Typography>
            <Rate raiting={data.score} votes={data.rates_scores_stats} />

            <Actions
              hookWatch={hookWatch}
              anime={data}
              isfavorite={data.favoured}
              stats={stats}
              user={user}
              mobile={width < 600}
            />
          </div>
        )}
      </Grid>

      <style global jsx>
        {`
          @media (max-width: 599px) {
            .poster_full {
              background-image: url(${data.kp_id
                ? `https://st.kp.yandex.net/images/film_big/${data.kp_id}.jpg`
                : "https://shikimori.one" + data.image.original});
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

const mapStateToProps = (state) => ({
  statusAnime: state.constant.statusAnime,
  stats: state.constant.stats,
  kinds: state.constant.kind,
  user: state.user.user,
  isLogged: state.user.isLogged,
});
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
