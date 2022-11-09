import Head from "next/head";
import Link from "next/link";

import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";

const name = "Atsu";
export const siteTitle = "Atsuポートフォリオ";

function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            {/* <img
              src="/images/profile.png"
              className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
              alt={name}
            /> */}
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              {/* <img
                src="/images/profile.png"
                alt=""
                className={`${styles.headerImage} ${utilStyles.borderCircle}`}
              /> */}
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/" className={utilStyles.colorInherit}>{name}</Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div>
          <Link href="/">← ホームへ戻る</Link>
        </div>
      )}
    </div>
  );
}

export default Layout;