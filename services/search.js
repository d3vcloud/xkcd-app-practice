import algoliasearch from "algoliasearch/lite";

const APP_ID = process.env.APP_ID;
const API_KEY = process.env.API_KEY;
const INDEX_ALGOLIA = process.env.INDEX_ALGOLIA;

const client = algoliasearch(APP_ID, API_KEY);
const index = client.initIndex(INDEX_ALGOLIA);

export const search = async ({ q }) => {
  const { hits } = await index.search(q, {
    attributesToRetrieve: ["id", "title", "img", "alt"],
    hitsPerPage: 10,
  });
  return { results: hits };
};
