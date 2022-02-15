import { useRouter } from "next/router";

import React from "react";
import styles from "assets/css/pages/animePage/episodes.module.css";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Modal,
} from "@mui/material";
import { getEpisodes } from "src/api";

const Episode = ({ season, title, translation, link }) => {
  return (
    <div className={styles.episode}>
      <div className={styles.season}>{season}</div>
      <div className={styles.title_wrap}>
        <Typography variant="subtitle1" component="h6" className={styles.title}>
          {title}
        </Typography>
        <div className={styles.translation}>
          <span>{translation}</span>
        </div>
      </div>
    </div>
  );
};
const Translator = ({ name, episodes }) => {
  return (
    <ListItem button className={styles.translator}>
      <ListItemText
        primary={
          <Typography component="span" variant="body1">
            {name}
          </Typography>
        }
        secondary={
          <Typography component="p" variant="body2" color="textSecondary">
            {`${episodes} серий`}
          </Typography>
        }
      />
    </ListItem>
  );
};

export default function Episodes({ data }) {
  const router = useRouter();
  const [translations, setTranslations] = React.useState([]);
  const [selectedTranslator, setSelectedTranslator] = React.useState();
  const [kodikOpen, setkodikOpen] = React.useState(
    router.query.player === "kodik" ? true : false
  );

  const fetchData = async () => {
    const resp = await getEpisodes(data.id);
    setTranslations(resp.data.results);
  };

  const handleCloseKodik = () => {
    setkodikOpen(false);
  };
  const handleOpenKodik = () => {
    setkodikOpen(true);
  };

  const setTranslator = (e) => {};

  React.useEffect(() => {
    setkodikOpen(router.query.player === "kodik" ? true : false);
  }, [router.query]);

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.episodes}>
      <Typography style={{ marginBottom: "4px" }} variant="h6">
        Плеер
      </Typography>
      <List>
        <ListItem
          onClick={handleOpenKodik}
          button
          className={styles.translator}
        >
          <ListItemText
            primary={
              <Typography component="span" variant="body1">
                Kodik
              </Typography>
            }
          />
        </ListItem>
      </List>

      {/* {translations.forEach((translation) =>
        translation.seasons.map((i, season) =>
          season.map((j, epis) => (
            <Episode
              season={season}
              title={epis}
              translation={translation.translation.title}
            />
          ))
        )
      )} */}

      <Modal
        className={styles.player_modal}
        open={kodikOpen}
        onClose={handleCloseKodik}
        BackdropProps={{
          style: {
            backdropFilter: "blur(3px)",
          },
        }}
      >
        <div className={styles.player_wrap}>
          <iframe
            src={translations[0] ? translations[0].link : NaN}
            width="640"
            height="460"
            className={styles.player}
          ></iframe>
        </div>
      </Modal>
    </div>
  );
}
