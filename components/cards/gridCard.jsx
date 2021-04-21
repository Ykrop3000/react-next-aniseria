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
    <Link href={"animes/" + url} className={styles.card}>
      <a title={`${data.material_data.title} / ${data.material_data.title_en}`}>
        <div
          style={{ backgroundImage: `url(${data.material_data.poster_url})` }}
          className={`card_poster ${styles.card_poster}`}
        >
          {status && (
            <Typography component="p" className={styles.card_poster__status}>
              {statusAnime[data.material_data.anime_status]}
            </Typography>
          )}
          {rate && (
            <div className={styles.card_poster__score}>
              {data.material_data.shikimori_rating}
            </div>
          )}
        </div>
        <Typography variant="h6" className={styles.card_title}>
          {data.title}
        </Typography>
        <Typography className={styles.card_misc}>
          {`${kind[data.material_data.anime_kind]} ${getYear(
            data.material_data.aired_at
          )}`}
        </Typography>
      </a>
    </Link>
  );
}
