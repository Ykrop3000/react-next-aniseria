import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  bars_wrap: {
    width: "100%",
  },
  bars: {},
  bar: {
    borderRadius: "6px",
    height: "100%",
    backgroundColor: theme.palette.primary.main,
  },
  line: {
    borderRadius: "6px",
    display: "flex",
    height: "15px",
    paddingRight: "5px",
    marginBottom: "8px",
    background: "rgba(120, 120, 120, 0.05)",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {},
}));

const Bars = ({ data }) => {
  const classes = useStyles();

  const getWidth = (val) => {
    const sum = data.map((e) => Number(e.value)).reduce((a, b) => a + b, 0);
    const opePercent = sum / 100;
    return val / opePercent;
  };

  return (
    <div className={classes.bars_wrap}>
      <div className={classes.bars}>
        {data.map((bar) => (
          <div key={bar.name} className={classes.line}>
            <div
              className={classes.bar}
              style={{
                width: getWidth(Number(bar.value)) + "%",
              }}
            ></div>
            <Typography variant="body1">{bar.name}</Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bars;
