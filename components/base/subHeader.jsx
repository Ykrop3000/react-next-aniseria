import { Typography } from "@material-ui/core";
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
  },
}));

export default function Filter({ title = "Каталог", children = "" }) {
  const classes = useStyles();

  return (
    <div className={classes.subHeader}>
      <div className={classes.wrap}>
        <Typography variant="h4" component="h1">
          {title}
        </Typography>

        <div className={classes.slot}>{children}</div>
      </div>
    </div>
  );
}
