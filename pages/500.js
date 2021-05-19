// 404.js
import Link from "next/link";
import styles from "assets/css/404.module.css";

export default function FourOhFour() {
  return (
    <div className={styles.wrap}>
      <h1>500 | Internal Server Error </h1>
      <Link href="/">
        <a>Домой</a>
      </Link>
    </div>
  );
}
