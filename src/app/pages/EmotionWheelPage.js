import React, { useState } from "react";
import clsx from "clsx";
import EmotionActions from "../components/EmotionActions";
import EmotionWheel from "../components/EmotionWheel";

export default function EmotionWheelPage({
  setPage,
  selectedItems,
  setSelectedItems,
}) {
  const [showSave, setShowSave] = useState(true);
  const [currentItem, setCurrentItem] = useState();
  const [rating, setRating] = useState();
  const [showRating, setShowRating] = useState(false);

  /**
   * Function to reset component states.
   * Clears currentItem, rating, and hides rating UI.
   */
  const resetData = () => {
    // Clear currentItem, rating, and hide rating UI
    setCurrentItem();
    setRating();
    setShowRating(false);
  };

  /**
   * Function to check if selectedItems is empty.
   * @returns {boolean} - True if selectedItems is empty, otherwise false.
   */
  const isEmpty = () => {
    return selectedItems.length > 0 ? false : true;
  };

  return (
    <div className="container">
      <h3 className="page-title">Lūdzu, atzīmē šī brīža emocijas!</h3>
      <div className="emotion-wheel-container">
        <div className="container-top">
          <div className="wheel-container">
            <EmotionWheel
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              currentItem={currentItem}
              setCurrentItem={setCurrentItem}
              setRating={setRating}
              setShowRating={setShowRating}
            />
          </div>
        </div>
        <EmotionActions
          resetData={resetData}
          rating={rating}
          setRating={setRating}
          showRating={showRating}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          currentItem={currentItem}
          setCurrentItem={setCurrentItem}
        />
      </div>

      <div
        className={clsx("save", {
          ["show"]: !isEmpty() && showSave,
        })}
      >
        <button
          className="btn"
          disabled={isEmpty()}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Iesniegt
        </button>
      </div>
    </div>
  );
}
