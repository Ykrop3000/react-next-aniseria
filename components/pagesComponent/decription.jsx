import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  description_wrap: {
    marginTop: "16px",
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: 1.5,
  },
  description: {
    margin: "8px",
    overflow: "hidden",
  },
  hidden: {
    maxHeight: "130px",
  },
}));

const Description = ({ des }) => {
  const classes = useStyles();
  const [showDes, setShowDes] = React.useState(false);

  const toggleDes = () => {
    setShowDes(!showDes);
  };

  return (
    <Typography
      className={classes.description_wrap}
      component="h2"
      variant="h5"
      color="inherit"
    >
      <div
        className={`${classes.description} ${showDes ? "" : classes.hidden}`}
      >
        {des}
      </div>
      <Button color="primary" onClick={toggleDes}>
        {showDes ? "Скрыть" : "Раскрыть"}
      </Button>
    </Typography>
  );
};

export default Description;
