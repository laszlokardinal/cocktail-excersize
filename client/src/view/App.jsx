import React from "react";
import axios from "axios";

import { Cocktail, Footer } from "./components";

import style from "./App.css";

// rollup can't find the hooks exported from react
const { useState, useCallback, useEffect } = React;

export const App = () => {
  const [cocktail, setCocktail] = useState(null);
  const [keywords, setKeywords] = useState("");

  const loadRandomCocktail = useCallback(async () => {
    const { data } = await axios.get(`${process.env.FE_API_BASE_URL}/cocktail`);

    setCocktail(data.data[0]);
  });

  const searchCocktail = useCallback(async () => {
    const { data } = await axios.get(
      `${process.env.FE_API_BASE_URL}/cocktail?keywords=${keywords}`
    );

    setCocktail(data.data[0]);
  }, [keywords]);

  // load random cocktail only after the initial render
  useEffect(loadRandomCocktail, [true]);

  return (
    <div className={style.wrapper}>
      <Cocktail cocktail={cocktail} />
      <Footer
        keywords={keywords}
        onKeywordChange={setKeywords}
        onSearchClick={searchCocktail}
        onRandomClick={loadRandomCocktail}
      />
    </div>
  );
};
