import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import style from "./Footer.css";

export const Footer = ({
  keywords,
  excludeAlcoholic,
  onKeywordChange,
  onExcludeAlcoholicChange,
  onSearchClick,
  onRandomClick,
}) => {
  return (
    <div className={style.wrapper}>
      <input
        className={style.input}
        type="text"
        value={keywords}
        placeholder="Search cocktails"
        onChange={(e) => onKeywordChange(e.target.value)}
      />
      <div className={style.checkboxWrapper}>
        <button
          className={classNames(style.checkbox)}
          onClick={() => onExcludeAlcoholicChange(!excludeAlcoholic)}
        >
          {excludeAlcoholic ? "✖" : ""}
        </button>
        Exclude alcoholic drinks from search
      </div>
      <div className={style.buttons}>
        <button
          className={classNames(style.button, style.searchButton)}
          onClick={onSearchClick}
        >
          Search
        </button>
        <button
          className={classNames(style.button, style.randomButton)}
          onClick={onRandomClick}
        >
          I'm Feeling Lucky
        </button>
      </div>
    </div>
  );
};

Footer.propTypes = {
  keywords: PropTypes.string.isRequired,
  excludeAlcoholic: PropTypes.bool.isRequired,
  onKeywordChange: PropTypes.func.isRequired,
  onExcludeAlcoholicChange: PropTypes.func.isRequired,
  onSearchClick: PropTypes.func.isRequired,
  onRandomClick: PropTypes.func.isRequired,
};
