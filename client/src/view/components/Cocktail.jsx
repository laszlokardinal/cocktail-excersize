import React from "react";
import PropTypes from "prop-types";

import style from "./Cocktail.css";

export const Cocktail = ({ cocktail }) => {
  if (!cocktail) return "";

  return (
    <div className={style.wrapper}>
      <img className={style.image} src={cocktail.imageUrl} />
      <div className={style.details}>
        <h2 className={style.name}>{cocktail.name}</h2>
        <div className={style.ingredients}>
          {cocktail.ingredients.map((ingredient) => (
            <div className={style.ingredient} key={ingredient.name}>
              {ingredient.name}
              {" "}
              {ingredient.measure ? `(${ingredient.measure})` : ""}
            </div>
          ))}
        </div>
        <div className={style.instructions}>{cocktail.instructions}</div>
      </div>
    </div>
  );
};

Cocktail.propTypes = {};
