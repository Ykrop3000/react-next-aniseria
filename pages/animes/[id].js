import React from "react";
import { Grid, Tab, Tabs } from "@material-ui/core";
import Header from "components/views/animeView/header";
import dynamic from "next/dynamic";

import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";

import classes from "assets/css/pages/animePage/content.module.css";
import Overview from "components/views/animeView/overview";

const Episodes = dynamic(import("components/views/animeView/episodes"));
const Error = dynamic(import("next/error"));

export default function Anime({ anime = {}, err = false }) {
  const router = useRouter();

  const [page, setPage] = React.useState(0);
  const [width, setWidth] = React.useState(1040); // default width, detect on server.

  React.useEffect(() => {
    setWidth(window.innerWidth);
  });

  const handleChange = (event, newValue) => {
    setPage(newValue);
  };

  //   getAnime();
  if (err) return <Error statusCode={404} />;

  return (
    <>
      <Head>
        <title>{`${anime.material_data.title} / ${anime.material_data.title_en}  | AniSeria`}</title>
      </Head>

      <Header data={anime} />

      <div className={classes.content_wrap}>
        <Grid className={classes.content} container spacing={2}>
          <Grid item xs={12} sm={4} md={3} style={{ padding: 0 }}></Grid>
          <Grid item xs={12} sm={8} md={6}>
            <Tabs
              indicatorColor="primary"
              textColor="primary"
              value={page}
              className={classes.tabs}
              onChange={handleChange}
              aria-label="disabled tabs example"
              centered={width >= 600 ? false : true}
            >
              <Tab className={classes.tab} label="описание" />
              {anime.material_data.anime_status !== "anons" && (
                <Tab
                  className={classes.tab}
                  label={`серии (${anime.episodes_count})`}
                />
              )}
            </Tabs>

            {/* ------------------ */}

            {page === 0 && <Overview data={anime} />}
            {page === 1 && <Episodes data={anime} />}

            {/* ------------------ */}
          </Grid>
        </Grid>
      </div>
    </>
  );
}
// Anime.getInitialProps = async ({ query }) => {
//     const resp = await axios.get('http://localhost:8080/api/animes/' + query.id)
//     return { data: resp.data }
// }
// export const getStaticPaths = async (cx) => {
//   const resp = await getAnimesApi({
//     limit: 30,
//     order: "popularity",
//     query: {},
//   });

//   const paths = resp.data.docs.map((i) => {
//     return {
//       params: { id: i.url },
//     };
//   });

//   return {
//     paths,
//     fallback: true, // fallback is set to false because we already know the slugs ahead of time
//   };
// };
export async function getServerSideProps(ctx) {
  const resp = await axios.get(
    "http://localhost:8080/api/animes/" + ctx.params.id
  );
  if (resp.data.err) return { props: { err: true } };
  return { props: { anime: resp.data } };
}
