import React from "react";
import PropTypes from "prop-types";

import style from "./Cocktail.css";

const { Fragment } = React; // rollup could not find it exported

export const Cocktail = ({ cocktail, errorMessage }) => {
  if (!cocktail) return "";

  return (
    <div className={style.wrapper}>
      {!errorMessage ? (
        <Fragment>
          <img className={style.image} src={cocktail.imageUrl} />
          <div className={style.details}>
            <h2 className={style.name}>{cocktail.name}</h2>
            <div className={style.ingredients}>
              {cocktail.ingredients.map((ingredient) => (
                <div className={style.ingredient} key={ingredient.name}>
                  {ingredient.name}{" "}
                  {ingredient.measure ? `(${ingredient.measure})` : ""}
                </div>
              ))}
            </div>
            <div className={style.instructions}>{cocktail.instructions}</div>
          </div>
        </Fragment>
      ) : (
        <div className={style.error}>{errorMessage}</div>
      )}
    </div>
  );
};

Cocktail.propTypes = {
  cocktail: PropTypes.exact({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    instructions: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(
      PropTypes.exact({
        name: PropTypes.string.isRequired,
        measure: PropTypes.string.isRequired,
      })
    ).isRequired,
  }),
  errorMessage: PropTypes.string,
};
