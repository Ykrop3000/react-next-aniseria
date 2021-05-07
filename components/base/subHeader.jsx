import React from "react";
import { Typography, Tab, Tabs, NoSsr } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  subHeader: {
    padding: "84px 8px 16px",
    background: theme.palette.background.paper,
    textAlign: "center",
    borderBottom: "1px solid rgba(255,255,255, 0.06)",
  },
  wrap: {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  slot: {
    display: "flex",
    paddingTop: "18px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
}));

export default function Filter({
  title = "Каталог",
  children = "",
  useTabs = false,
  tabs = [],
  tab,
  handleTabs,
}) {
  const classes = useStyles();
  const [width, setWidth] = React.useState(1040); // default width, detect on server.

  React.useEffect(() => {
    setWidth(window.innerWidth);
  });

  return (
    <div
      className={classes.subHeader}
      style={
        useTabs
          ? {
              paddingBottom: "0",
            }
          : {}
      }
    >
      <div className={classes.wrap}>
        <Typography variant="h4" component="h1">
          {title}
        </Typography>
        <NoSsr>
          <div className={classes.slot}>{children}</div>
        </NoSsr>
        <NoSsr>
          {useTabs && (
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
          )}
        </NoSsr>
      </div>
    </div>
  );
}
