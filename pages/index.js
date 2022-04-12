import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import fs from "fs/promises";

import Layout from "components/Layout";
import { useI18N } from "context/i18n";

export default function Home({ latestComics }) {
  const { translations } = useI18N();
  return (
    <>
      <Head>
        <title>xkcd - Comics 💥</title>
        <meta name="description" content="Welcome to comics world" />
      </Head>
      <Layout>
        <h2 className="text-3xl font-bold text-center mb-10">
          {translations("LATEST_COMICS")}
        </h2>
        <section className="grid grid-cols-1 gap-2 max-w-md m-auto sm:grid-cols-2 md:grid-cols-3">
          {latestComics.map((comic) => {
            return (
              <Link key={comic.id} href={`/comic/${comic.id}`}>
                <a className="mb-4 pb-4 m-auto">
                  <h3 className="font-semibold text-sm text-center pb-3">
                    {comic.title}
                  </h3>
                  <Image
                    width={comic.width}
                    height={comic.height}
                    src={comic.img}
                    alt={comic.alt}
                  />
                </a>
              </Link>
            );
          })}
        </section>
      </Layout>
    </>
  );
}

export async function getStaticProps(context) {
  const files = await fs.readdir("./comics");
  const latestComicsFiles = files.slice(-8, files.length);
  const promisesReadFiles = latestComicsFiles.map(async (file) => {
    const filePath = `./comics/${file}`;
    const fileContent = await fs.readFile(filePath, "utf8");
    return JSON.parse(fileContent);
  });
  const latestComics = await Promise.all(promisesReadFiles);
  // console.log(latestComics);
  return {
    props: {
      latestComics,
    },
  };
}
