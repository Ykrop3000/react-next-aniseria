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
}) {
  const classes = useStyles();
  const [width, setWidth] = React.useState(1040); // default width, detect on server.

  React.useEffect(() => {
    setWidth(window.innerWidth);
  });

  const toggleFull = () => {
    set(!val);
  };

  return (
    <Button
      fullWidth={width < 600 ? true : false}
      color="primary"
      variant={width < 600 ? "outlined" : "text"}
      onClick={toggleFull}
      className={classes.button}
    >
      {val ? showText : closeText}
    </Button>
  );
}
