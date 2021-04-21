import { Grid, Typography } from "@material-ui/core";
import Link from "next/link";
import styles from "../../../assets/css/cards/listCardSmall.module.css";

export default function ListCardSmall({ data }) {
  const getYear = (date) => {
    if (!date) return "";
    return date.split("-")[0];
  };

  return (
    <Link href="#">
      <a title={`${data.russian} / ${data.name}`} className={`${styles.card}`}>
        <div
          className={`card_poster ${styles.card_poster}`}
          style={{ backgroundImage: `url(${data.image.preview})` }}
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
            {data.kind}
            <small>{getYear(data.aried_on)}</small>
          </Typography>
        </div>
      </a>
    </Link>
  );
}
