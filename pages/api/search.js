import { search } from "services/search";

export default async function handler(req, res) {
  // console.log(req.query);
  const q = req.query.q;
  const hits = await search({ q });
  return res.status(200).json({ results: hits });
}
