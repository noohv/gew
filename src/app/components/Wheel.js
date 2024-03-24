import React, { useState } from "react";
import Bottom from "./Bottom";
import WheelComponent from "./WheelComponent";

export default function Wheel({ selectedItems, setSelectedItems }) {
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

  return (
    <div className="emotion-wheel-container">
      <div className="container-top">
        <div className="wheel-container">
          <WheelComponent
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            currentItem={currentItem}
            setCurrentItem={setCurrentItem}
            setRating={setRating}
            setShowRating={setShowRating}
          />
        </div>
      </div>
      <Bottom
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
  );
}
