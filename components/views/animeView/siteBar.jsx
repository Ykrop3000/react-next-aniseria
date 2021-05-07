import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Link from "next/link";
const useStyles = makeStyles((theme) => ({
  content: {
    margin: "12px 12px 16px",
  },
  item: {
    display: "flex",
    padding: "3px",
    overflow: "hidden",
    position: "relative",
    alignItems: "center",
    borderRadius: "6px",
    marginBottom: "3px",
    paddingRight: "16px",
  },
  image: {
    width: "64px",
    height: "64px",
    minWidth: "64px",
    minHeight: "64px",
    paddingTop: 0,
    borderRadius: "6px",
    backgroundSize: "contain",
    backgroundPosition: "50%",
    backgroundColor: "#fff",
    backgroundRepeat: "no-repeat",
  },
  text: {
    marginLeft: "16px",
  },
  screenshot: {
    width: "100%",
    marginTop: "12px",
    borderRadius: "6px",
  },
  info_wrap: {
    background: "rgba(120, 120, 120, 0.05)",
    borderRadius: "6px",
    "@media (max-width: 600px)": {
      display: "flex",
      marginBottom: "25px",
      overflowX: "auto",
      whiteSpace: "nowrap",
      flexWrap: "nowrap",
    },
  },
  info: {
    paddingRight: "25px",
    padding: "8px 0px 8px 8px",
    alignItems: "baseline",
  },
}));

const Info = ({ data, title }) => {
  if (!data) return <div></div>;
  const classes = useStyles();
  const isArr = Array.isArray(data);
  return (
    <div className={classes.info}>
      <Typography variant="body1">{title}</Typography>
      <Typography variant="subtitle2" color="textSecondary">
        {isArr ? data.join(", ") : data}
      </Typography>
    </div>
  );
};

export default function SiteBar({ info }) {
  const classes = useStyles();

  return (
    <div
      style={{
        position: "sticky",
        top: "42px",
      }}
    >
      <Typography variant="h5" className="sectionTitleBold">
        Издатели
      </Typography>
      <div className={classes.content}>
        {info.studios.map((studio) => (
          <Link href={"/animes/?studio=" + studio.id}>
            <a className={classes.item}>
              <div
                className={classes.image}
                style={{
                  backgroundImage: `url(https://shikimori.one${studio.image})`,
                }}
              ></div>
              <div className={classes.text}>
                <Typography
                  variant="subtitle1"
                  className="sectionTitleBold"
                  style={{ padding: 0 }}
                >
                  {studio.name}
                </Typography>
              </div>
            </a>
          </Link>
        ))}
      </div>
      <div className={`${classes.content} ${classes.info_wrap}`}>
        <Info data={info.fandubbers} title="Перевод:" />
        <Info data={info.duration + " мин."} title="Длительность эпизода:" />
      </div>
      {/* ------------------------------------------------------------------ */}
      {info.screenshots && (
        <>
          <Typography variant="h5" className="sectionTitleBold">
            Кадры
          </Typography>

          <div className={classes.content}>
            {info.screenshots.map((i) => (
              <img
                src={`https://shikimori.one${i.preview}`}
                className={classes.screenshot}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
