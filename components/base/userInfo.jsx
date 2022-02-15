import { ButtonBase, Avatar } from "@mui/material";
import { List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import makeStyles from '@mui/styles/makeStyles';
import { useSelector } from "react-redux";
import Link from "next/link";
import styles from "assets/css/header.module.css";

const useStyles = makeStyles((theme) => ({
  user: {
    width: "calc(100% - 48px)",
    fontSize: "12px",
    textTransform: "none",
  },
  userName: {
    width: "100%",
    overflow: "hidden",
    fontSize: "16px",
    marginLeft: "4px",
    textOverflow: "ellipsis",
  },
}));

export default function Nav() {
  const classes = useStyles();
  const user = useSelector((state) => state.user.user);

  return (
    <>
      <ButtonBase className={`user_item ${classes.user}`}>
        <Avatar
          src={user.avatar}
          color="inherit"
          className="avatar"
          style={{ marginRight: "8px" }}
        ></Avatar>
        <span className={classes.userName}>{user.nickname}</span>
      </ButtonBase>

      <List className={styles.navigation} role="navigation">
        <Link href="/user/bookmarks">
          <ListItem className={styles.navigation_button} button component="a">
            <ListItemText primary="Закладки" className={classes.text} />

            <BookmarkIcon
              color="secondary"
              className={styles.navigation_icon}
            />
          </ListItem>
        </Link>
      </List>
    </>
  );
}
