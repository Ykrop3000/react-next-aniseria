import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import ShowMore from "components/buttons/showMore";

const useStyles = makeStyles((theme) => ({
  content: {
    padding: " 8px 12px",
  },
}));

export default function SiteBar({ children, title = "Каталог" }) {
  const classes = useStyles();
  const [full, setfull] = useState(false);

  return (
    <div
      style={{
        position: "sticky",
        top: "42px",
      }}
    >
      <Typography variant="h5" className="sectionTitleBold">
        {title}
      </Typography>
      <div className={classes.content}>
        {!full && children.slice(0, 4)}
        {full && children}
        <ShowMore val={full} set={setfull} />
      </div>
    </div>
  );
}
