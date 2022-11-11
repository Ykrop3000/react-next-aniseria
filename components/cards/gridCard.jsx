import { Typography } from "@mui/material";
import Link from "next/link";
import { useSelector } from "react-redux";
import styles from "../../assets/css/cards/gridCard.module.css";
import BgImage from '../imgages/bgImage'


export default function gridCard({ data, status = true, rate = true, lazy=true }) {
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
        <BgImage
          imgsrc={`https://shikimori.one${data.image.preview}`}
          imgalt={data.name}
          lazy={lazy}
          // style={{
          //   backgroundImage: `url(https://shikimori.one${data.image.preview})`,
          // }}
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
        </BgImage>
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
