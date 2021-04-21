import { Grid, Typography } from "@material-ui/core";
import Link from "next/link";
import styles from "../../../assets/css/cards/listCardEpisode.module.css";

import TimeAgo from "timeago-react"; // var TimeAgo = require('timeago-react');
import ru from "timeago.js/lib/lang/ru";
import * as timeago from "timeago.js";

export default function ListCardEpisode({ data }) {
  const getYear = (date) => {
    if (!date) return "";
    return date.split("-")[0];
  };
  timeago.register("ru", ru);
  return (
    <div className={`${styles.card}`}>
      <Link href={`/animes/${data.shikimori_id}`}>
        <a
          className={styles.card_poster__wrap}
          title={`${data.title} / ${data.title_orig}`}
        >
          <div
            className={`card_poster ${styles.card_poster}`}
            style={{ backgroundImage: `url(${data.material_data.poster_url})` }}
          ></div>
        </a>
      </Link>
      <div className={styles.card_content}>
        <Link href={`/animes/${data.shikimori_id}`}>
          <Typography
            title={`${data.russian} / ${data.name}`}
            gutterBottom
            component="a"
            className={styles.card_content__title}
          >
            {data.title}
          </Typography>
        </Link>
        <Link href="#">
          <Typography
            title={`${data.title} / ${data.title_orig}`}
            component="a"
            className={styles.card_content__episode}
          >
            {`${data.last_episode} серия`}
            <small className={styles.year}>{data.translation.title}</small>
          </Typography>
        </Link>
        <div className={styles.card_content__time}>
          <TimeAgo datetime={data.updated_at} locale="ru" />
        </div>
      </div>
    </div>
  );
}
