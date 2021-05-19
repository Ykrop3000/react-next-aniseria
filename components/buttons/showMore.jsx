import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    color: "#4e6baf",
    margin: "8px 0",
  },
}));

export default function ShowMore({
  val,
  set,
  showText = "Скрыть",
  closeText = "Показать еще",
  isMobile = false,
}) {
  const classes = useStyles();

  const toggleFull = () => {
    set(!val);
  };

  return (
    <Button
      fullWidth={isMobile ? true : false}
      color="primary"
      variant={isMobile ? "outlined" : "text"}
      onClick={toggleFull}
      className={classes.button}
    >
      {val ? showText : closeText}
    </Button>
  );
}
