import React, { useState } from "react";
import clsx from "clsx";
import EmotionActions from "../components/EmotionActions";
import EmotionWheel from "../components/EmotionWheel";
import { saveData } from "../actions/actions";

export default function EmotionWheelPage({
  setPage,
  participantId,
  selectedItems,
  setSelectedItems,
  surveyData,
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
   * Function to handle save action.
   * Hides save prompt and saves data if selectedItems is not empty.
   */
  const handleSave = () => {
    // Hide save prompt
    setShowSave(false);
    // Check if selectedItems is not empty
    if (!isEmpty()) {
      // Asynchronously save data
      const postData = async () => {
        const result = await saveData(participantId, surveyData, selectedItems);
        return result; // Return the result if successful
      };
      // Invoke postData and update state after saving
      postData().then((result) => {
        setShowSave(false);
        if (result.success) {
          // Clear selectedItems and increment page number after saving
          setSelectedItems([{}]);
          setPage((prev) => prev + 1);
        } else {
          alert("Neizdevās saglabāt!");
          setShowSave(true);
        }
      });
    }
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
      <h3 className="page-title">
        Lūdzu, atzīmē šā brīža emocijas un to intensitāti skalā no 1 (vāja) līdz
        5 (stipra)!
      </h3>
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
        <button className="btn" disabled={isEmpty()} onClick={handleSave}>
          Iesniegt
        </button>
      </div>
    </div>
  );
}
