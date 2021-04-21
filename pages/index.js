import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import React from "react";

import { fetchUpdates, fetchAnimes } from "../src/api";

import styles from "assets/css/pages/mainPage/main.module.css";

import SiteBar from "../components/views/sitebar";
import ShowMore from "components/buttons/showMore";
import Carousel from "components/views/carousel";
import ListCardSmall from "../components/cards/listCards/smallCard";
import ListCardEpisode from "../components/cards/listCards/episodeCard";

export default function Home({ anonses, ongoings }) {
  const [episodes, setEpisodes] = React.useState([]);

  const getEpisodes = async () => {
    const { data } = await fetchUpdates({ limit: episodes.length + 10 });
    setEpisodes(data.results);
  };

  React.useEffect(() => {
    getEpisodes();
  }, []);

  return (
    <>
      <div className={styles.carousel}>
        <Carousel full data={ongoings} />
      </div>

      <Grid container spacing={1} className="container" direction="row-reverse">
        <Grid item xs={12} sm={4}>
          <SiteBar title="Популярно сегодня">
            <ListCardSmall
              data={{
                image: {
                  preview:
                    "https://api.remanga.org/media/titles/star_martial_god_technique/80a78e6bc91363353786d84cd7056735.jpg",
                },
                russian: "Пик боевых искусств",
                aried_on: "2020-01-01",
                kind: "movie",
              }}
            />
          </SiteBar>
        </Grid>

        {/* --------------------------------------- */}

        <Grid item xs={12} sm={8}>
          <div style={{ padding: "2px" }}>
            <Typography
              style={{ marginBottom: "4px" }}
              variant="h5"
              className="sectionTitleBold"
            >
              Анонсы
            </Typography>
            <Carousel data={anonses} />
          </div>
          <div style={{ margin: "12px" }}>
            <Typography component="h3" variant="h5">
              Недавние обновления
            </Typography>
          </div>
          {episodes.map((episode) => (
            <ListCardEpisode data={episode} key={episode.id} />
          ))}
          <ShowMore val={false} set={getEpisodes} />
        </Grid>
      </Grid>
    </>
  );
}

export async function getStaticProps() {
  const anonses = await fetchAnimes({
    limit: 20,
    order: "aired_on",
    status: "anons",
  });
  const ongoings = await fetchAnimes({
    limit: 20,
    order: "aired_on",
    status: "ongoing",
  });

  return {
    props: { anonses: anonses.data.docs, ongoings: ongoings.data.docs },
  };
}
