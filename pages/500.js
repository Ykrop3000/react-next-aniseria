import Link from "next/link";
import styles from "assets/css/404.module.css";
import Head from "next/head";

export default function FourOhFour() {
  return (
    <>
      <Head>
        <title>500 | AniSeria</title>
        <meta
          key="description"
          name="description"
          content="500 | Internal Server Error"
        />
      </Head>
      <div className={styles.wrap}>
        <h1>500 | Internal Server Error </h1>
        <Link href="/">
          <a>Домой</a>
        </Link>
      </div>
    </>
  );
}
