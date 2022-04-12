import { useRouter } from "next/router";
import { createContext, useCallback, useContext } from "react";
import es from "translations/es.json";
import en from "translations/en.json";

const I18NContext = createContext();
const lenguages = { es, en };

export const I18nProvider = ({ children }) => {
  const { locale } = useRouter();
  const translations = useCallback(
    (key, ...args) => {
      //We can pass options parameter to plural o singular
      // const { count } = options;
      let translation = lenguages[locale][key];
      if (args.length === 0) return translation;
      // console.log(args);
      args.forEach((value, index) => {
        translation = translation.replace(`\${${index + 1}}`, value);
      });

      return translation;
    },
    [locale]
  );

  return (
    <I18NContext.Provider value={{ translations }}>
      {children}
    </I18NContext.Provider>
  );
};

export const useI18N = () => {
  const context = useContext(I18NContext);
  if (context === undefined) {
    throw new Error("useI18N must be used within a I18NProvider");
  }

  return context;
};
