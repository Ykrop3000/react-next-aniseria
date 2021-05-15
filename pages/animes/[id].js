import React from "react";
import { Grid, Tab, Tabs } from "@material-ui/core";
import Header from "components/views/animeView/header";
import dynamic from "next/dynamic";
import { fetchAnimeLocal, fetchAnimeRelated, fetchAnimeSimilar } from "src/api";
import Head from "next/head";

import classes from "assets/css/pages/animePage/content.module.css";
import Overview from "components/views/animeView/overview";

const SiteBar = dynamic(import("components/views/animeView/siteBar"), {
  ssr: false,
});
const Episodes = dynamic(import("components/views/animeView/episodes"), {
  ssr: false,
});
const Error = dynamic(import("next/error"));

export default function Anime({
  data = {},
  err = false,
  id,
  isMobile = false,
}) {
  const [anime, setAnime] = React.useState(data);
  const [related, setRelated] = React.useState([]);
  const [similar, setSimilar] = React.useState([]);

  const [page, setPage] = React.useState(0);
  const [width, setWidth] = React.useState(1040);

  const getRelated = async () => {
    const { data } = await fetchAnimeRelated(id);
    setRelated(data);
  };
  const getSimilar = async () => {
    const { data } = await fetchAnimeSimilar(id);
    setSimilar(data);
  };

  React.useEffect(() => {
    setAnime(data);
    getRelated();
    getSimilar();
    setWidth(window.innerWidth);
  }, [id]);

  const handleChange = (event, newValue) => {
    setPage(newValue);
  };
  const hookWatch = () => {
    setPage(1);
  };

  if (err) return <Error statusCode={err} />;

  return (
    <>
      <Head>
        <title>{`${anime.russian} / ${anime.name}  | AniSeria`}</title>
      </Head>

      <Header data={anime} hookWatch={hookWatch} isMobile={isMobile} />

      <div className={classes.content_wrap}>
        <Grid className={classes.content} container spacing={2}>
          <Grid item xs={12} sm={4} md={3} style={{ padding: 0 }}></Grid>
          <Grid item xs={12} sm={8} md={6}>
            <Tabs
              indicatorColor="primary"
              textColor="primary"
              value={page}
              className="tabs"
              onChange={handleChange}
              aria-label="disabled tabs example"
              centered={!isMobile ? false : true}
            >
              <Tab className="tab" label="описание" />
              {anime.status !== "anons" && (
                <Tab
                  className="tab"
                  label={`серии (${
                    anime.episodes !== 0 ? anime.episodes : anime.episodes_aired
                  })`}
                />
              )}
            </Tabs>

            {/* ------------------ */}

            {page === 0 && <Overview data={anime} isMobile={isMobile} />}
            {page === 1 && <Episodes data={anime} isMobile={isMobile} />}

            {/* ------------------ */}
          </Grid>

          <Grid item xs={12} sm={12} md={3}>
            {(page === 0 || !isMobile) && (
              <SiteBar
                info={anime}
                similar={similar}
                related={related}
                isMobile={isMobile}
              />
            )}
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const id = ctx.params.id;
  const resp = await fetchAnimeLocal(id);

  if (resp.data.code) return { props: { err: resp.data.code } };
  let anime = resp.data;

  let isMobileView = (ctx.req
    ? ctx.req.headers["user-agent"]
    : navigator.userAgent
  ).match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i);

  return { props: { data: anime, id, isMobile: isMobileView } };
}
