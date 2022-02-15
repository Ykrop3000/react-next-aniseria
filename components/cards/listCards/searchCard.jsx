import { Typography } from "@mui/material";
import Link from "next/link";
import styles from "assets/css/cards/listCardSmall.module.css";
import BgImage from '../../imgages/bgImage'

export default function ListCardSearch({ data }) {
  return (
    <Link href={data.url}>
      <a
        title={`${data.russian} / ${data.name}`}
        className={styles.card}
        style={{ background: "transparent" }}
      >
        <BgImage
            style={{
              width: "16px",
              height: "24px",
              minWidth: "16px",
              minHeight: "24px",
            }}
            imgsrc={`https://shikimori.one${data.image.preview}`}
            imgalt={data.name}
            className={`card_poster ${styles.card_poster}`}
        ></BgImage>

        <div className={styles.card_content}>
          <Typography
            gutterBottom
            component="h4"
            variant="subtitle1"
            className={styles.card_content__title}
          >
            {data.russian}
          </Typography>
          <Typography
            color="textSecondary"
            component="h6"
            variant="subtitle2"
            className={styles.card_content__title}
          >
            <small>{data.name}</small>
          </Typography>
        </div>
      </a>
    </Link>
  );
}
