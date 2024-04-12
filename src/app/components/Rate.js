import React from "react";
import { useTranslations } from "next-intl";

/**
 * Rating component.
 * @param {number} numOptions - Number of options for rating. Default - 5
 * @param {number} rating - Current rating.
 * @param {function} handleChange - Function which handles rating change.
 * @returns {React.JSX.Element} - JSX component.
 */
export default function Rate({ numOptions = 5, rating, handleChange }) {
  const t = useTranslations("Index");

  const options = Array.from({ length: numOptions }, (_, index) => (
    <button
      key={index}
      type="button"
      className={`rating-element select-none ${
        index + 1 == rating ? "checked" : ""
      }`}
      onClick={handleChange}
      value={index + 1}
    >
      {index + 1}
    </button>
  ));

  return (
    <div className="rating-section">
      <div className="input-name">
        <p>{t("emotion-intensity")}</p>
      </div>
      <div className="rating-bar-container">{options}</div>
      <div className="rating-intensity">
        <p>{t("low")}</p>
        <p>{t("high")}</p>
      </div>
    </div>
  );
}
