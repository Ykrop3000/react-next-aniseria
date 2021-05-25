// 404.js
import Link from "next/link";
import styles from "assets/css/404.module.css";
import Head from "next/head";
export default function FourOhFour() {
  return (
    <>
      <Head>
        <title>404 | AniSeria</title>
        <meta
          key="description"
          name="description"
          content="404 | страница не найдена"
        />
      </Head>
      <div className={styles.wrap}>
        <h1>404 | страница не найдена</h1>
        <Link href="/">
          <a>Домой</a>
        </Link>
      </div>
    </>
  );
}
