import React from "react";
import axios from "axios";

import { Cocktail, Footer } from "./components";

import style from "./App.css";

// rollup can't find the hooks exported from react
const { useState, useCallback, useEffect } = React;

export const App = () => {
  const [cocktail, setCocktail] = useState(null);
  const [keywords, setKeywords] = useState("");
  const [excludeAlcoholic, setExcludeAlcoholic] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const loadRandomCocktail = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${process.env.FE_API_BASE_URL}/cocktail`
      );

      setCocktail(data.data[0]);
      setErrorMessage(null);
    } catch (e) {
      setErrorMessage("Something went wrong! Try refreshing the page.");
    }
  });

  const searchCocktail = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${process.env.FE_API_BASE_URL}/cocktail?keywords=${keywords}&excludeAlcoholic=${excludeAlcoholic}`
      );

      if (data.data.length > 0) {
        setCocktail(data.data[0]);
        setErrorMessage(null);
      } else {
        setErrorMessage("We couldn't find any matching cocktail.");
      }
    } catch (e) {
      setErrorMessage("Something went wrong! Try refreshing the page.");
    }
  }, [keywords, excludeAlcoholic]);

  // load random cocktail only after the initial render
  useEffect(loadRandomCocktail, [true]);

  return (
    <div className={style.wrapper}>
      <Cocktail cocktail={cocktail} errorMessage={errorMessage} />
      <Footer
        keywords={keywords}
        excludeAlcoholic={excludeAlcoholic}
        onKeywordChange={setKeywords}
        onExcludeAlcoholicChange={setExcludeAlcoholic}
        onSearchClick={searchCocktail}
        onRandomClick={loadRandomCocktail}
      />
    </div>
  );
};
