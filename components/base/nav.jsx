import styles from "assets/css/header.module.css";
import { List, ListItem, ListItemText, ListItemIcon } from "@material-ui/core";
import AppsIcon from "@material-ui/icons/Apps";
import Link from "next/link";

export default function Nav() {
  return (
    <List className={styles.navigation} role="navigation">
      <Link href="/animes">
        <ListItem className={styles.navigation_button} button component="a">
          <ListItemText primary="Каталог" className={styles.navigation_text} />

          <AppsIcon color="secondary" className={styles.navigation_icon} />
        </ListItem>
      </Link>
    </List>
  );
}
