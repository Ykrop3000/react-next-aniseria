import { Typography } from "@material-ui/core";
import Link from "next/link";
import styles from "assets/css/cards/listCardSmall.module.css";

export default function ListCardSearch({ data }) {
  return (
    <Link href={data.url}>
      <a
        title={`${data.russian} / ${data.name}`}
        className={styles.card}
        style={{ background: "transparent" }}
      >
        <div
          className={`card_poster ${styles.card_poster}`}
          style={{
            width: "16px",
            height: "24px",
            minWidth: "16px",
            minHeight: "24px",
          }}
          style={{
            backgroundImage: `url(https://shikimori.one${data.image.preview})`,
          }}
        ></div>

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
