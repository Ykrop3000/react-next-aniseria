import React from "react";

import { AppBar, Toolbar, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Link from "next/link";
import styles from "../../assets/css/header.module.css";
import Nav from "./nav";
import Menu from "./menu";
import { DriveEtaSharp } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  toolBar: {
    [theme.breakpoints.down("sm")]: {
      maxWidth: "700px",
    },
    [theme.breakpoints.down("md")]: {
      maxWidth: "990px",
    },
    [theme.breakpoints.down("lg")]: {
      maxWidth: "1040px",
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: "1340px",
    },
  },
}));

function Header({ absolute, transparent }) {
  const classes = useStyles();
  const [width, setWidth] = React.useState(1040); // default width, detect on server.

  React.useEffect(() => {
    setWidth(window.innerWidth);
  });

  return (
    <AppBar
      className={`${styles.header} ${transparent ? styles.transparent : ""}`}
      position={absolute ? "absolute" : "relative"}
      color="inherit"
    >
      <Toolbar className={(classes.toolBar, styles.toolBar)}>
        <div className={styles.block}>
          <Link href="/">
            <IconButton component="a" className={styles.home}>
              <MenuIcon />
            </IconButton>
          </Link>

          {width >= 600 && <Nav />}
        </div>
        <Menu />
      </Toolbar>
    </AppBar>
  );
}
const mapStateToProps = (state) => ({
  absolute: state.constant.header.absolute,
  transparent: state.constant.header.transparent,
});

export default connect(mapStateToProps)(Header);
