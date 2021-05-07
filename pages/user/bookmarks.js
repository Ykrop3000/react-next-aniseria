import React from "react";

import { connect } from "react-redux";
import { getFavorites } from "src/api";
import dynamic from "next/dynamic";
import { Grid } from "@material-ui/core";

import List from "components/views/list";
import GridCard from "components/cards/gridCard";

const Error = dynamic(import("next/error"));

function Bookmarks({ user, isLogged, stats }) {
  const [animes, setAnimes] = React.useState([]);
  const [tab, setTab] = React.useState(0);

  const handleTabs = (event, newValue) => {
    setTab(newValue);
  };

  const getAnimes = async () => {
    if (!user.id) return;
    const resp = await getFavorites(user.id);
    setAnimes(resp.data);
  };

  React.useEffect(() => {
    getAnimes();
  }, [user.id]);

  return (
    <List
      title="Закладки"
      useSecondaryFilter={false}
      useTabs
      tabs={Object.values(stats)}
      tab={tab}
      handleTabs={handleTabs}
      useFilter={false}
    >
      {animes
        .filter((i) => i.status === Object.keys(stats)[tab])
        .map(({ anime }) => (
          <Grid key={anime.id} item xs={4} sm={3} md={2}>
            <GridCard key={anime.id} data={anime} />
          </Grid>
        ))}
    </List>
  );
}

const mapStateToProps = (state) => ({
  stats: state.constant.stats,
  user: state.user.user,
  isLogged: state.user.isLogged,
});
// const mapDispatchToProps = (dispatch) => {
//   return {
//     increment: () => dispatch({ type: 'INCREMENT' }),
//   }
// }

export default connect(mapStateToProps)(Bookmarks);
