import React from "react";

import { Grid, Typography, NoSsr } from "@material-ui/core";
import dynamic from "next/dynamic";

import { fetchUpdates, fetchAnimes, fetchAnimesLocal } from "src/api";

import styles from "assets/css/pages/mainPage/main.module.css";

import SiteBar from "components/views/sitebar";
import ShowMore from "components/buttons/showMore";
import Carousel from "components/views/carousel";
import ListCardSmall from "components/cards/listCards/smallCard";
const ListCardEpisode = dynamic(
  import("components/cards/listCards/episodeCard")
);

export default function Home({ anonses, ongoings, populars }) {
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
          <SiteBar title="Популярное">
            {populars.map((data) => (
              <ListCardSmall data={data} />
            ))}
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
          <NoSsr>
            <div style={{ margin: "12px" }}>
              <Typography component="h3" variant="h5">
                Недавние обновления
              </Typography>
            </div>
            {episodes.map((episode) => (
              <ListCardEpisode data={episode} key={episode.id} />
            ))}
            <ShowMore val={false} set={getEpisodes} />
          </NoSsr>
        </Grid>
      </Grid>
    </>
  );
}

export async function getStaticProps() {
  const anonses = await fetchAnimesLocal({
    limit: 20,
    order: "ranked",
    status: "anons",
  });
  const ongoings = await fetchAnimesLocal({
    limit: 20,
    order: "ranked",
    status: "ongoing",
  });
  const populars = await fetchAnimesLocal({
    limit: 10,
    season: new Date().getFullYear(),
    order: "popularity",
  });
  return {
    props: {
      anonses: anonses.data.docs,
      ongoings: ongoings.data.docs,
      populars: populars.data.docs,
    },
  };
}
