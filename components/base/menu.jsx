import { Avatar } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import { makeStyles } from "@material-ui/core/styles";

import dynamic from "next/dynamic";

const Drawer = dynamic(import("@material-ui/core/Drawer"));
const Nav = dynamic(import("./nav"));

import React from "react";

import styles from "../../assets/css/header.module.css";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  avatar: {
    color: theme.palette.secondary.main,
    width: "36px",
    height: "36px",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Menu() {
  const classes = useStyles();
  const [isOpen, setOpen] = React.useState(false);
  const [width, setWidth] = React.useState(1040); // default width, detect on server.

  React.useEffect(() => {
    setWidth(window.innerWidth);
  });

  const open = () => {
    if (width <= 600) setOpen(true);
  };
  const close = () => {
    setOpen(false);
  };

  return (
    <>
      <Avatar color="inherit" className={classes.avatar} onClick={open}>
        <PersonIcon />
      </Avatar>

      {width < 600 && (
        <Drawer
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor={"right"}
          open={isOpen}
          onClose={close}
          onClick={close}
        >
          <div className={styles.list}>
            <div className={styles.list_user}></div>
            <div className={styles.list_menu}>
              <Nav />
            </div>
          </div>
        </Drawer>
      )}
    </>
  );
}
