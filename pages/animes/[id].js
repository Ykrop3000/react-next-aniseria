import React from "react";
import { Grid, Tab, Tabs, Typography } from "@material-ui/core";
import Header from "components/views/animeView/header";
import dynamic from "next/dynamic";
import { fetchAnimeLocal, fetchAnimeRelated, fetchAnimeSimilar } from "src/api";
import Head from "next/head";

import classes from "assets/css/pages/animePage/content.module.css";
import Overview from "components/views/animeView/overview";

const SiteBar = dynamic(import("components/views/animeView/siteBar"));
const Episodes = dynamic(import("components/views/animeView/episodes"), {
  ssr: false,
});
const Comments = dynamic(import("components/views/animeView/comments"), {
  ssr: false,
});
const Error = dynamic(import("next/error"));

export default function Anime({
  data = {},
  err = false,
  id,
  width,
  isMobile = false,
}) {
  const [anime, setAnime] = React.useState(data);
  const [related, setRelated] = React.useState([]);
  const [similar, setSimilar] = React.useState([]);

  const [page, setPage] = React.useState("overview");

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
  }, [id]);

  const handleChange = (event, newValue) => {
    setPage(newValue);
  };
  const hookWatch = () => {
    setPage("watch");
  };

  if (err) return <Error statusCode={err} />;

  return (
    <>
      <Head>
        <title>{`${anime.russian} / ${anime.name}  | AniSeria`}</title>
        <meta
          key="description"
          name="description"
          content={
            anime.description
              ? anime.description.replace(/\[(\w+)[^\]]*](.*?)\[\/\1]/g, "")
              : ""
          }
        />
        <link rel="canonical" href={"https://aniseria.ru/" + anime.id}></link>
        <meta
          property="og:description"
          content={
            anime.description
              ? anime.description.replace(/\[(\w+)[^\]]*](.*?)\[\/\1]/g, "")
              : ""
          }
        />
        <meta
          property="og:title"
          content={`${anime.russian} / ${anime.name}  | AniSeria`}
        />
        <meta
          property="og:image"
          content={`https://shikimori.one${data.image.original}`}
        />
      </Head>
      <div
        itemScope
        itemType="http://schema.org/Movie"
        style={{ display: "contents" }}
      >
        <meta itemType="duration" content={anime.duration} />
        <meta itemType="datePublished" content={anime.released_on} />
        <meta itemType="dateCreated" content={anime.aired_on} />
        <meta itemType="inLanguage" content="jp" />
        <meta
          itemProp="productionCompany"
          content={anime.studios.map((e) => e.name).join(", ")}
        ></meta>

        <Header
          data={anime}
          hookWatch={hookWatch}
          isMobile={isMobile}
          width={width}
        />

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
                <Tab className="tab" value="overview" label="описание" />

                {anime.status !== "anons" && (
                  <Tab
                    className="tab"
                    value="watch"
                    label={`серии (${
                      anime.episodes !== 0
                        ? anime.episodes
                        : anime.episodes_aired
                    })`}
                  />
                )}
                {isMobile && (
                  <Tab className="tab" label="комментарии" value="comments" />
                )}
              </Tabs>

              {/* ------------------ */}

              {(page === "overview" || !page) && (
                <Overview data={anime} isMobile={isMobile} />
              )}
              {page === "watch" && (
                <Episodes data={anime} isMobile={isMobile} />
              )}
              {((!isMobile && (page === "overview" || !page)) ||
                page === "comments") && (
                <>
                  <Typography
                    component="h4"
                    variant="h5"
                    style={{ fontWeight: 600, margin: "24px 0" }}
                  >
                    Комментарии
                  </Typography>
                  <Comments topic_id={anime.topic_id} />
                </>
              )}

              {/* ------------------ */}
            </Grid>

            <Grid item xs={12} sm={12} md={3}>
              {(page === "overview" || !page || !isMobile) && (
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
      </div>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const id = ctx.params.id;
  const resp = await fetchAnimeLocal(id);

  if (resp.data.code) return { props: { err: resp.data.code } };
  let anime = resp.data;

  return { props: { data: anime, id } };
}
