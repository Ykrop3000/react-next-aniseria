import React from "react";

import { connect } from "react-redux";
import { getFavorites } from "src/api";
import dynamic from "next/dynamic";
import Head from "next/head";
import { Grid, Tab, Tabs } from "@mui/material";

import List from "components/views/list";
import GridCard from "components/cards/gridCard";

const Error = dynamic(import("next/error"));

const MyTabs = ({ tabs, tab, handleTabs, width }) => {
  return (
    <Tabs
      variant={width <= 750 ? "scrollable" : NaN}
      indicatorColor="primary"
      textColor="primary"
      value={tab}
      className="tabs"
      style={{
        margin: 0,
      }}
      onChange={handleTabs}
      aria-label="disabled tabs example"
      centered={true}
    >
      {tabs.map((tabName) => (
        <Tab label={tabName} className="tab" />
      ))}
    </Tabs>
  );
};

function Bookmarks({ user, isLogged, stats }) {
  const [animes, setAnimes] = React.useState([]);
  const [tab, setTab] = React.useState(0);
  const [width, setWidth] = React.useState(1040); // default width, detect on server.

  React.useEffect(() => {
    setWidth(window.innerWidth);
  });

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
    <>
      <Head>
        <title key="title">{`Закладки аниме | AniSeria`}</title>
      </Head>
      <List
        title="Закладки"
        useSecondaryFilter={false}
        useFilter={false}
        secondaryChildren={
          <MyTabs
            width={width}
            tabs={Object.values(stats)}
            tab={tab}
            handleTabs={handleTabs}
          />
        }
      >
        {animes
          .filter((i) => i.status === Object.keys(stats)[tab])
          .map(({ anime }) => (
            <Grid key={anime.id} item xs={4} sm={3} md={2}>
              <GridCard key={anime.id} data={anime} />
            </Grid>
          ))}
      </List>
    </>
  );
}

const mapStateToProps = (state) => ({
  stats: state.constant.stats,
  user: state.user.user,
  isLogged: state.user.isLogged,
});

export default connect(mapStateToProps)(Bookmarks);
