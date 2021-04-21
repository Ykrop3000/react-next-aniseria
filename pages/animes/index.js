import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { connect } from "react-redux";
import { fetchAnimes } from "../../src/api";
import dynamic from "next/dynamic";
import { Grid } from "@material-ui/core";

import List from "components/views/list";
import GridCard from "components/cards/gridCard";
const ListCard = dynamic(import("components/cards/listCards/fullCard"));

function Animes({ mode, data = {} }) {
  const router = useRouter();
  const isFirstRun = React.useRef(true);
  const [animes, setAnimes] = React.useState(data);

  const getAnimes = async () => {
    const resp = await fetchAnimes({
      limit: 30,
      order: "popularity",
      ...router.query,
    });
    setAnimes(resp.data);
  };

  React.useEffect(() => {
    if (isFirstRun.current && animes.length !== 0) {
      isFirstRun.current = false;
      return;
    }
    getAnimes();
  }, [router.query]);

  return (
    <List title="Каталог аниме" pages={animes.totalPages}>
      {animes.docs.map((anime) =>
        mode === "grid" ? (
          <Grid key={anime.id} item xs={4} sm={3} md={2}>
            <GridCard key={anime.id} data={anime} />
          </Grid>
        ) : (
          <ListCard key={anime.id} data={anime} />
        )
      )}
    </List>
  );
}
export async function getStaticProps({ query }) {
  const resp = await fetchAnimes({
    limit: 30,
    order: "popularity",
    query,
  });
  return { props: { data: resp.data } };
}
// Animes.getInitialProps = async ({ query }) => {
//   const resp = await getAnimesApi({
//     limit: 30,
//     order: "popularity",
//     query,
//   });
//   return { data: resp.data };
// };

const mapStateToProps = (state) => ({
  mode: state.list.viewMode,
});
// const mapDispatchToProps = (dispatch) => {
//   return {
//     increment: () => dispatch({ type: 'INCREMENT' }),
//   }
// }

export default connect(mapStateToProps)(Animes);
