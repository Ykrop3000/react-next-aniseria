import React from "react";

import { Grid, Typography, NoSsr } from "@material-ui/core";
import dynamic from "next/dynamic";
import Head from "next/head";
import { fetchUpdates, fetchAnimes } from "src/api";

import styles from "assets/css/pages/mainPage/main.module.css";

import SiteBar from "components/views/sitebar";
import ShowMore from "components/buttons/showMore";
import Carousel from "components/views/carousel";
import ListCardSmall from "components/cards/listCards/smallCard";
const ListCardEpisode = dynamic(
  import("components/cards/listCards/episodeCard")
);

export default function Home({ anonses, ongoings, populars, isMobile }) {
  const [episodes, setEpisodes] = React.useState([]);

  const getEpisodes = async () => {
    const { data } = await fetchUpdates({ limit: episodes.length + 10 });
    setEpisodes(data.results);
  };

  React.useEffect(() => {
    getEpisodes();
  }, [setEpisodes]);

  return (
    <>
      <Head>
        <title>AniSeria</title>
        <meta
          key='description'
          name='description'
          content='Смотреть аниме онлайн бесплатно. Большая база лучших аниме с русской озвучкой в хорошем качестве.'
        />
      </Head>
      <div className={styles.carousel}>
        <Carousel full data={ongoings} />
      </div>

      <Grid container spacing={1} className='container' direction='row-reverse'>
        <Grid item xs={12} sm={4}>
          <SiteBar title='Популярное' isMobile={isMobile}>
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
              variant='h5'
              className='sectionTitleBold'>
              Анонсы
            </Typography>
            <Carousel data={anonses} />
          </div>
          <NoSsr>
            <div style={{ margin: "12px" }}>
              <Typography component='h3' variant='h5'>
                Недавние обновления
              </Typography>
            </div>
            {episodes.map((episode) => (
              <ListCardEpisode data={episode} key={episode.id} />
            ))}
            <ShowMore val={false} set={getEpisodes} isMobile={isMobile} />
          </NoSsr>
        </Grid>
      </Grid>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const anonses = await fetchAnimes({
    limit: 20,
    order: "ranked",
    status: "anons",
  });
  const ongoings = await fetchAnimes({
    limit: 20,
    order: "ranked",
    status: "ongoing",
  });
  const populars = await fetchAnimes({
    limit: 10,
    season: new Date().getFullYear(),
    order: "ranked",
  });
  return {
    props: {
      anonses: anonses.data,
      ongoings: ongoings.data,
      populars: populars.data,
    },
  };
}
