import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { search } from "services/search";

import Layout from "components/Layout";
import { useI18N } from "context/i18n";

const Search = ({ query, results }) => {
  const { translations } = useI18N();
  return (
    <>
      <Head>
        <title>Busca resultados para {query}</title>
        <meta name="description" content={`Search results for ${query}`} />
      </Head>
      <Layout>
        <h1>{translations("SEARCH_RESULTS_TITLE", results.length, query)}</h1>
        {results.map((result) => {
          return (
            <Link href={`/comic/${result.id}`} key={result.id}>
              <a className="flex flex-row justify-start bg-slate-300 hover:bg-slate-50 content-center">
                <Image
                  src={result.img}
                  alt={result.alt}
                  width="50"
                  height="50"
                  className="rounded-full"
                />
                <div>
                  <h2>{result.title}</h2>
                </div>
              </a>
            </Link>
          );
        })}
      </Layout>
    </>
  );
};

export async function getServerSideProps(context) {
  /* Dentro de esta función al hacer fetch solo debemos usar rutas absolutas */
  const { query } = context;
  const { q = "" } = query;
  const { results } = await search({ q });
  return {
    props: {
      query: q,
      results: results,
    },
  };
}

export default Search;
