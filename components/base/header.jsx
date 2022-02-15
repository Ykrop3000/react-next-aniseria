import React from "react";
import dynamic from "next/dynamic";

import { AppBar, Toolbar, IconButton } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { connect } from "react-redux";
import Link from "next/link";
import Logo from "components/imgages/logo";
import styles from "assets/css/header.module.css";

import Nav from "./nav";
import Menu from "./menu";

const SearchField = dynamic(import("components/fields/searchField"), {
  ssr: false,
});

const useStyles = makeStyles((theme) => ({
  toolBar: {
    [theme.breakpoints.down('md')]: {
      maxWidth: "700px",
    },
    [theme.breakpoints.down('lg')]: {
      maxWidth: "990px",
    },
    [theme.breakpoints.down('xl')]: {
      maxWidth: "1040px",
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: "1340px",
    },
  },
}));

function Header({ absolute, transparent, isMobile }) {
  const classes = useStyles();

  return (
    <AppBar
      className={`${styles.header} ${transparent ? styles.transparent : ""}`}
      position={absolute ? "absolute" : "relative"}
      color="inherit"
    >
      <Toolbar className={(classes.toolBar, styles.toolBar)}>
        <div className={styles.block}>
          <Link href="/">
            <IconButton component="a" className={styles.home} size="large">
              <Logo />
            </IconButton>
          </Link>

          {!transparent && isMobile && <SearchField />}
          {!isMobile && <Nav />}
        </div>
        {transparent && !isMobile && <SearchField />}
        {!transparent && !isMobile && <SearchField />}
        <Menu isMobile={isMobile} />
      </Toolbar>
    </AppBar>
  );
}

const mapStateToProps = (state) => ({
  absolute: state.constant.header.absolute,
  transparent: state.constant.header.transparent,
});
export default connect(mapStateToProps)(Header);
