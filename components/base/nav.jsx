import styles from "assets/css/header.module.css";
import { List, ListItem, ListItemText, ListItemIcon } from "@material-ui/core";
import AppsIcon from "@material-ui/icons/Apps";
import CasinoIcon from "@material-ui/icons/Casino";

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
      <Link href="/animes?order=random">
        <ListItem className={styles.navigation_button} button component="a">
          <ListItemText
            primary="Случайное аниме"
            className={styles.navigation_text2}
          />
          <CasinoIcon
            color="secondary"
            style={{
              display: "flex",
            }}
            className={styles.navigation_icon}
          />
        </ListItem>
      </Link>
    </List>
  );
}
