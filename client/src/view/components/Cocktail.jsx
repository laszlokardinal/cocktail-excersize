import React from "react";
import PropTypes from "prop-types";

import style from "./Cocktail.css";

export const Cocktail = ({ cocktail }) => {
  return (
    <div className={style.wrapper}>
      <pre>{JSON.stringify(cocktail, 0, 2)}</pre>
    </div>
  );
};

Cocktail.propTypes = {};
