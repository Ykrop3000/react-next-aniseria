import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    color: "#4e6baf",
    margin: "8px 0",
  },
}));

export default function ShowMore({ val, set }) {
  const classes = useStyles();

  const toggleFull = () => {
    set(!val);
  };

  return (
    <Button onClick={toggleFull} className={classes.button}>
      {val ? "Скрыть" : "Показать еще"}
    </Button>
  );
}
