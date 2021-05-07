import { Typography } from "@material-ui/core";
import Link from "next/link";
import styles from "assets/css/cards/listCardSmall.module.css";
import { useSelector } from "react-redux";

export default function ListCardSmall({ data }) {
  const kind = useSelector((state) => state.constant.kind);
  const getYear = (date) => {
    if (!date) return "";
    return date.split("-")[0];
  };

  return (
    <Link href={data.url}>
      <a title={`${data.russian} / ${data.name}`} className={styles.card}>
        <div
          className={`card_poster ${styles.card_poster}`}
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
            {kind[data.kind]}
            <small>{getYear(data.aired_on)}</small>
          </Typography>
        </div>
      </a>
    </Link>
  );
}
