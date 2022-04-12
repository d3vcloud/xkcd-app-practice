import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useRef } from "react";

const Header = () => {
  const [results, setResults] = useState([]);
  const searchRef = useRef(null);
  const { locale, locales } = useRouter();

  const getValue = () => searchRef.current?.value;

  const handleChange = async () => {
    const q = getValue();
    if (!q) return;

    const response = await fetch(`/api/search?q=${q}`);
    const { results: data } = await response.json();
    setResults(data.results);
  };

  const restOfLocales = locales.filter((l) => l !== locale);

  // const showLocales = () => {
  //   const restOfLocales = locales.filter((l) => l !== locale);
  //   return {
  //     selectedLocale: locale,
  //     restOfLocales,
  //   };
  // };

  return (
    <header className="flex justify-between items-center p-4 max-w-xl m-auto">
      <h1 className="font-bold">
        <Link href="/">
          <a className="text-gray-800">XKCD</a>
        </Link>
      </h1>
      <nav>
        <ul className="flex flex-row gap-4">
          <li>
            <Link href="/" className="text-sm font-semibold">
              Home
            </Link>
          </li>
          {/* <li>
            <Link href="/search" className="text-sm font-semibold">
              Search
            </Link>
          </li> */}
          <li>
            <Link href="/" locale={restOfLocales[0]}>
              {restOfLocales[0]}
            </Link>
          </li>
          <li>
            <input
              type="search"
              className="rounded-3xl border-2 border-gray-300 px-4 py-1 text-xs"
              ref={searchRef}
              placeholder="Comic..."
              onChange={handleChange}
            />
            <div className="relative z-10">
              {Boolean(results.length) && (
                <div className="absolute top-0 left-0 bg-white">
                  <ul className="w-full border border-gray-50 rounded-lg overflow-hidden shadow-sm">
                    <li className="m-0">
                      <Link href={`/search?q=${getValue()}`}>
                        <a className="text-gray-400 block px-2 py-1 text-sm font-semibold hover:bg-slate-200">
                          Ver {results.length} resultados
                        </a>
                      </Link>
                    </li>
                    {results.map((result) => {
                      return (
                        <li className="m-0" key={result.id}>
                          <Link href={`/comic/${result.id}`}>
                            <a className="block px-2 py-1 text-sm font-semibold hover:bg-slate-200">
                              {result.title}
                            </a>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
