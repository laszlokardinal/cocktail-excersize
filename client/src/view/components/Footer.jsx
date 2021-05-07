import React from "react";
import PropTypes from "prop-types";

import style from "./Footer.css";

export const Footer = ({
  keywords,
  onKeywordChange,
  onSearchClick,
  onRandomClick,
}) => {
  return (
    <div className={style.wrapper}>
      <input
        type="text"
        value={keywords}
        onChange={(e) => onKeywordChange(e.target.value)}
      />
      <button onClick={onSearchClick}>search</button>
      <button onClick={onRandomClick}>random</button>
    </div>
  );
};

Footer.propTypes = {
  keywords: PropTypes.string.isRequired,
  onKeywordChange: PropTypes.func.isRequired,
  onSearchClick: PropTypes.func.isRequired,
  onRandomClick: PropTypes.func.isRequired,
};
