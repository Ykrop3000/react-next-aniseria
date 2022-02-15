import { Grid, Typography } from "@mui/material";
import Link from "next/link";
import styles from "../../../assets/css/cards/listCardFull.module.css";
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSelector } from "react-redux";
import BgImage from '../../imgages/bgImage'

export default function ListCardSmall({ data }) {
  const kind = useSelector((state) => state.constant.kind);


  return (
    <Grid item xs={12} sm={6}>
      <Link href={"animes/" + data.url}>
        <a
          title={`${data.material_data.title} / ${data.material_data.title_en}`}
          className={`${styles.card}`}
        >
          <BgImage
            imgsrc={data.material_data.poster_url}
            imgalt={data.material_data.title_en}
            className={`card_poster ${styles.card_poster}`}
          ></BgImage>

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
