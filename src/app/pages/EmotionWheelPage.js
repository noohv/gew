import React, { useState } from "react";
import clsx from "clsx";
import Wheel from "../components/Wheel";
import { saveData } from "../actions/actions";

export default function EmotionWheelPage({
  setPage,
  participantId,
  selectedItems,
  setSelectedItems,
}) {
  const [showSave, setShowSave] = useState(true);

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
        await saveData(participantId, selectedItems);
      };
      // Invoke postData and update state after saving
      postData().then(() => {
        // Clear selectedItems and increment page number after saving
        setSelectedItems([{}]);
        setPage((prev) => prev + 1);
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
      <Wheel
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />

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
