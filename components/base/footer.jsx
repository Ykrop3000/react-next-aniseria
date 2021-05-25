import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import VkIcon from "components/imgages/vkIcon";
// const Filter = dynamic(import("../filter/filter"));
const useStyles = makeStyles((theme) => ({
  wrap: {
    display: "flex",
    zIndex: 2,
    position: "relative",
    maxWidth: "100vw",
    borderTop: "1px solid rgba(255,255,255, 0.06)",
    backgroundColor: "#171717",
  },
  footer: {
    textAlign: "left",
  },
  icon: {
    margin: "12px 10px 0",
  },
}));

function Footer({}) {
  const classes = useStyles();

  return (
    <footer className={classes.wrap}>
      <div className="container">
        <div className={classes.footer}>
          <Grid container>
            <Grid item xs={12} sm={4} md={3}>
              <h3>Контакты / Contacts</h3>
              <a
                title="BK aniseria"
                href="https://vk.com/aniseria"
                target="_blank"
                rel="noreferrer"
              >
                <div className={classes.icon}>
                  <VkIcon />
                </div>
              </a>
            </Grid>
          </Grid>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
