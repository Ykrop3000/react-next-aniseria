import styles from "assets/css/popoverMenu.module.css";

export default function PopoverMenu({ handleLogout, user }) {
  return (
    <ul role="menu" className={styles.menu}>
      <li className={styles.item}>
        <span className={`${styles.text} ${styles.username}`}>
          {user.nickname}
        </span>
      </li>
      <li onClick={handleLogout} className={styles.item}>
        <span className={styles.text}>Выйти</span>
      </li>
    </ul>
  );
}
