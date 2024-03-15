import "../styles.css";

export default function Rate2({ numOptions = 5, rating, handleChange }) {
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
        <p>Emocijas intensitāte</p>
      </div>
      <div className="rating-bar-container">{options}</div>
      <div className="rating-intensity">
        <p>Vāja</p>
        <p>Stipra</p>
      </div>
    </div>
  );
}
