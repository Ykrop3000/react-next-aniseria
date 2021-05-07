import { Typography } from "@material-ui/core";
import Link from "next/link";
import { useSelector } from "react-redux";
import styles from "../../assets/css/cards/gridCard.module.css";

export default function gridCard({ data, status = true, rate = true }) {
  const kind = useSelector((state) => state.constant.kind);
  const statusAnime = useSelector((state) => state.constant.statusAnime);

  const getYear = (date) => {
    if (!date) return "";
    return date.split("-")[0];
  };
  const url = data.url || data.shikimori_id;
  return (
    <Link href={url} className={styles.card}>
      <a title={`${data.russian} / ${data.name}`}>
        <div
          style={{
            backgroundImage: `url(https://shikimori.one${data.image.original})`,
          }}
          className={`card_poster ${styles.card_poster}`}
        >
          {status && data.status == "anons" && (
            <Typography component="p" className={styles.card_poster__status}>
              {statusAnime[data.status]}
            </Typography>
          )}
          {rate && data.score !== "0.0" && (
            <div className={styles.card_poster__score}>{data.score}</div>
          )}
        </div>
        <Typography variant="h6" className={styles.card_title}>
          {data.russian}
        </Typography>
        <Typography className={styles.card_misc}>
          {`${kind[data.kind]} ${getYear(data.aired_on)}`}
        </Typography>
      </a>
    </Link>
  );
}
