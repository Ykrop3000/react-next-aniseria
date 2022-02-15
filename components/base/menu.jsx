import React from "react";
import { Avatar, Button, Popover, IconButton } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { connect } from "react-redux";
import dynamic from "next/dynamic";
import Link from "next/link";

import { USER } from "store/actions/types";

const Drawer = dynamic(import("@mui/material/Drawer"), { ssr: false });
const Nav = dynamic(import("./nav"), { ssr: false });
const UserInfo = dynamic(import("components/base/userInfo"), { ssr: false });
const AuthDilog = dynamic(import("components/views/auth"), { ssr: false });
const BookmarkIcon = dynamic(import("@mui/icons-material/Bookmark"), {
  ssr: false,
});

import PopoverMenu from "components/base/popoverMenu";

import { signOut } from "src/api";

import styles from "assets/css/header.module.css";

const drawerWidth = 220;

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
}));

function Menu({ user, isLogged, logout_, isMobile }) {
  const classes = useStyles();
  const [isOpen, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(false);
  const [isOpenAuthDilog, setOpenAuthDilog] = React.useState(false);
  const [width, setWidth] = React.useState(1040);
  const isOpenPopover = Boolean(anchorEl);
  const id = isOpenPopover ? "avatar-popover" : undefined;

  React.useEffect(() => {
    setWidth(window.innerWidth);
  });

  const logout = () => {
    logout_();
    signOut();
  };

  const openPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const closePopover = () => {
    setAnchorEl(null);
  };

  const openAuthDilog = () => {
    setOpenAuthDilog(true);
  };
  const closeAuthDilog = () => {
    setOpenAuthDilog(false);
  };

  const open = (event) => {
    if (width <= 600) setOpen(true);
    if (width > 600 && !isLogged) openAuthDilog();
    if (width > 600 && isLogged) openPopover(event);
  };
  const close = () => {
    setOpen(false);
    if (width > 600 && !isLogged) closeAuthDilog();
    if (width > 600 && isLogged) closePopover();
  };

  return <>
    {isLogged && (
      <Popover
        id={id}
        open={isOpenPopover}
        anchorEl={anchorEl}
        onClose={closePopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <PopoverMenu handleLogout={logout} user={user} />
      </Popover>
    )}

    <AuthDilog open={isOpenAuthDilog} onClose={closeAuthDilog} />
    {isLogged && width > 600 && (
      <Link href="/user/bookmarks">
        <IconButton component="a" className="awatar_wrap" size="large">
          <BookmarkIcon />
        </IconButton>
      </Link>
    )}
    <Button className="awatar_wrap">
      <Avatar
        src={user.avatar}
        color="inherit"
        className="avatar"
        onClick={open}
        aria-describedby={id}
      />
    </Button>

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
          {/* User Section */}
          {isLogged && (
            <div className={styles.drawer_wrap}>
              <UserInfo />
            </div>
          )}
          {!isLogged && (
            <Button
              onClick={openAuthDilog}
              variant="contained"
              color="primary"
              style={{
                margin: "16px 14px 8px",
                padding: "12px 30px",
              }}
            >
              Войти в аккаунт
            </Button>
          )}
          {/* ----------------------------- */}
          <div className={styles.drawer_wrap}>
            <Nav />
          </div>

          {isLogged && (
            <Button className="user_item" onClick={logout}>
              Выйти
            </Button>
          )}
        </div>
      </Drawer>
    )}
  </>;
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  isLogged: state.user.isLogged,
});
const mapDispatchToProps = (dispatch) => {
  return {
    logout_: () => dispatch({ type: USER, payload: {} }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
