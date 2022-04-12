import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { readFile, readdir, stat } from "fs/promises";
import { basename } from "path";

import Layout from "components/Layout";

export default function Comic({
  img,
  alt,
  title,
  width,
  height,
  hasPrevious,
  hasNext,
  prevId,
  nextId,
}) {
  return (
    <>
      <Head>
        <title>xkcd - Comics 💥</title>
        <meta name="description" content="The most funniest comics here" />
      </Head>
      <Layout>
        <section className="max-w-lg m-auto">
          <h1 className="font-bold text-xl text-center mb-5">{title}</h1>
          <div className="max-w-sm m-auto mb-6">
            <Image
              layout="responsive"
              alt={alt}
              src={img}
              width={width}
              height={height}
            />
          </div>
          <p>{alt}</p>
          <div className="flex justify-between mt-4 font-bold">
            {hasPrevious && (
              <Link href={`/comic/${prevId}`}>
                <a className="text-gray-500">⬅️ Previous</a>
              </Link>
            )}
            {hasNext && (
              <Link href={`/comic/${nextId}`}>
                <a className="text-gray-500">Next ➡️</a>
              </Link>
            )}
          </div>
        </section>
      </Layout>
    </>
  );
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const filePath = `./comics/${id}.json`;
  const fileContent = await readFile(filePath, "utf8");
  const comic = JSON.parse(fileContent);

  const idNumber = +id;
  const prevId = idNumber - 1;
  const nextId = idNumber + 1;

  const [prevResult, nextResult] = await Promise.allSettled([
    stat(`./comics/${prevId}.json`),
    stat(`./comics/${nextId}.json`),
  ]);

  const hasPrevious = prevResult.status === "fulfilled";
  const hasNext = nextResult.status === "fulfilled";

  return {
    props: {
      ...comic,
      hasPrevious,
      hasNext,
      prevId,
      nextId,
    },
  };
}

export async function getStaticPaths({ locales }) {
  const files = await readdir("./comics");
  let paths = [];

  //locales -> ['es', 'en']
  locales.forEach((locale) => {
    paths = paths.concat(
      files.map((file) => {
        const id = basename(file, ".json");
        return {
          params: { id },
          locale,
        };
      })
    );
  });

  return {
    paths,
    fallback: false,
  };
}
