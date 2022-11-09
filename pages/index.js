import Head from "next/head";
import Image from "next/image";
import Layout ,{ siteTitle } from "../components/layout";
import styles from "../styles/Home.module.css";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import { FaGithub, FaBookOpen } from "react-icons/fa"
// import Date from "../components/date";

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
      <Layout home className={`${styles.home}` }>
        <Head className={`${styles.head}`}>
          <title className={`${styles.head} ${styles.head}`}>{siteTitle}</title>
        </Head>
        <section className={utilStyles.headingMd}>
          {/* <p>
            Webエンジニア
          </p> */}
        </section>

        <section className={`${styles.head} ${utilStyles.padding1px}`}>
          <h2 className={`${utilStyles.headingMd} ${styles.head}`}>ポートフォリオ</h2>
          <div className={`${styles.grid}`}>
            {allPostsData.map(({ id,title,subtitle,  url, github, thumbnail }) => (
              <article key={id}>
                <Link href={url} >
                  <img
                    src={`${thumbnail}`}
                    className={`${styles.thumbnailImage}`}
                  />
                </Link>
                <div className={`${styles.link}`}>
                <div className={`${styles.title}`}>{title}</div>
                <Link className={`${styles.linka}`} href={`posts/${id}`} ><FaBookOpen  size={30} color={'#ccc'}/></Link>
                <Link className={`${styles.linkb}`}href={github}><FaGithub size={30} color={'#ccc'} /></Link>
                </div>

                <div className={`${styles.subtitle}`}>{subtitle}</div>

                <small className={utilStyles.lightText}>
                  {/* <Date dateString={date} /> */}
                </small>
              </article>
            ))}
          </div>
      </section> 
    </Layout>
  );
}
