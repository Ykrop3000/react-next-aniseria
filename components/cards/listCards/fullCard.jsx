import { Grid, Typography } from "@material-ui/core";
import Link from "next/link";
import styles from "../../../assets/css/cards/listCardFull.module.css";
import StarIcon from "@material-ui/icons/Star";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useSelector } from "react-redux";

export default function ListCardSmall({ data }) {
  const kind = useSelector((state) => state.constant.kind);

  const getYear = (date) => {
    if (!date) return "";
    return date.split("-")[0];
  };

  return (
    <Grid item xs={12} sm={6}>
      <Link href={"animes/" + data.url}>
        <a
          title={`${data.material_data.title} / ${data.material_data.title_en}`}
          className={`${styles.card}`}
        >
          <div
            className={`card_poster ${styles.card_poster}`}
            style={{ backgroundImage: `url(${data.material_data.poster_url})` }}
          ></div>

          <div className={styles.card_content}>
            <Typography
              color="textSecondary"
              variant="overline"
              component="span"
              className={styles.card_content__subtiele}
            >
              {kind[data.material_data.anime_kind]}
            </Typography>
            <Typography
              gutterBottom
              component="h4"
              variant="h6"
              className={styles.card_content__title}
            >
              {data.title}
            </Typography>
            <Typography
              color="textSecondary"
              variant="body2"
              component="p"
              className={styles.card_content__subtiele}
            >
              {data.material_data.anime_genres
                ? data.material_data.anime_genres.join(", ")
                : ""}
            </Typography>
            <div className={styles.misc}>
              <Typography
                variant="body2"
                component="p"
                className={styles.card_content__misc__item}
              >
                <StarIcon className={styles.icon} />{" "}
                {data.material_data.shikimori_rating}
              </Typography>
              <Typography
                variant="body2"
                component="p"
                className={styles.card_content__misc__item}
              >
                <FavoriteIcon className={styles.icon} />{" "}
                {data.material_data.shikimori_votes}
              </Typography>
              <Typography
                variant="body2"
                component="p"
                className={styles.card_content__misc__item}
              ></Typography>
            </div>
          </div>
        </a>
      </Link>
    </Grid>
  );
}
