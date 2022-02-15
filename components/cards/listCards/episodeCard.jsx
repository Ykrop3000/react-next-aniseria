import { Typography } from "@mui/material";
import Link from "next/link";
import styles from "../../../assets/css/cards/listCardEpisode.module.css";
import BgImage from '../../imgages/bgImage'

import TimeAgo from "timeago-react"; // var TimeAgo = require('timeago-react');
import ru from "timeago.js/lib/lang/ru";
import * as timeago from "timeago.js";

export default function ListCardEpisode({ data }) {
  if (!data.material_data) return <></>;
  timeago.register("ru", ru);
  return (
    <div className={`${styles.card}`}>
      <Link href={`/animes/${data.shikimori_id}`}>
        <a
          className={styles.card_poster__wrap}
          title={`${data.material_data.title} / ${data.material_data.title_en}`}
        >
          <BgImage
            imgsrc={data.material_data.poster_url}
            imgalt={data.material_data.title_en}
            className={`card_poster ${styles.card_poster}`}
          ></BgImage>
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
            {data.material_data.title}
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
