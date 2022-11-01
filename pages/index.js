import Head from "next/head";
import Image from "next/image";

import Layout ,{ siteTitle } from "../components/layout";

import styles from "../styles/Home.module.css";
import utilStyles from "../styles/utils.module.css";

import { getSortedPostsData } from "../lib/posts";

import Link from "next/link";
import Date from "../components/date";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData, 
    },
  };
}

export default function Home({ allPostsData }) {
  return (
      <Layout home className={utilStyles.home}>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <section className={utilStyles.headingMd}>
          <p>
            Webエンジニア
          </p>
        </section>

        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingLg}>React個人開発ブログ</h2>
          <div className={`${styles.grid}`}>
            {allPostsData.map(({ id, date, title, thumbnail }) => (
              <article key={id}>
                <Link href={`/posts/${id}`}>
                  <img
                    src={`${thumbnail}`}
                    className={`${styles.thumbnailImage}`}
                  />
                </Link>
                {/* <Link href={`/posts/${id}`} className={utilStyles.boldText} >{title}</Link> */}
                {title}
                <br />
                {id}
                <br />
                {date}
                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small>
              </article>
            ))}
          </div>
      </section> 
    </Layout>
  );
}
