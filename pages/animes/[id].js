import React from "react";
import { Grid, Tab, Tabs } from "@material-ui/core";
import Header from "components/views/animeView/header";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { fetchAnime } from "src/api";
import Head from "next/head";

import classes from "assets/css/pages/animePage/content.module.css";
import Overview from "components/views/animeView/overview";
import SiteBar from "components/views/animeView/siteBar";

const Episodes = dynamic(import("components/views/animeView/episodes"));
const Error = dynamic(import("next/error"));

export default function Anime({ data = {}, err = false, id }) {
  const [anime, setAnime] = React.useState(data);
  const [page, setPage] = React.useState(0);
  const [width, setWidth] = React.useState(1040);
  const user = useSelector((state) => state.user.user);

  React.useEffect(async () => {
    setWidth(window.innerWidth);
    const resp = await fetchAnime(id);
    setAnime(resp.data);
  }, [user]);

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

      <Header data={anime} hookWatch={hookWatch} />

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
              centered={width >= 600 ? false : true}
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

            {page === 0 && <Overview data={anime} />}
            {page === 1 && <Episodes data={anime} />}

            {/* ------------------ */}
          </Grid>

          <Grid item xs={12} sm={12} md={3}>
            {(page === 0 || width > 600) && <SiteBar info={anime} />}
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
  const id = ctx.params.id;
  const resp = await fetchAnime(id);
  if (resp.data.code) return { props: { err: resp.data.code } };
  let anime = resp.data;

  return { props: { data: anime, id } };
}
