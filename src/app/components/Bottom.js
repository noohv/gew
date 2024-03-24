import React from "react";
import OtherEmotions from "./OtherEmotions";
import Rate from "./Rate";

export default function Bottom({
  rating,
  setRating,
  showRating,
  selectedItems,
  setSelectedItems,
  currentItem,
  setCurrentItem,
  resetData,
}) {
  /**
   * Function to handle click event.
   * If "other" category is selected, adds emotion to it. Otherwise, adds emotion to selectedItems.
   * Resets data after handling.
   */
  const handleClick = () => {
    if (selectedItems.find((a) => a.id === "other")) {
      addEmotionToOther();
    } else {
      setSelectedItems((prev) => [
        ...prev,
        {
          id: currentItem.id,
          name: currentItem.name,
          emotions: [{ name: currentItem?.value, rating: rating }],
        },
      ]);
    }
    resetData();
  };

  /**
   * Function to handle saving the rating.
   * Updates rating for existing items or adds a new item to selectedItems.
   * Resets data after handling.
   * @param {Object} e - The event object.
   */
  const handleRatingSave = (e) => {
    if (currentItem && rating) {
      // Logic to update rating
      if (selectedItems.find((a) => a.id === currentItem.id)) {
        const updatedItems = selectedItems.map((obj) => {
          if (obj.id == currentItem.id) {
            return { ...obj, rating: rating };
          }
          return obj;
        });

        setSelectedItems(updatedItems);
      } else
        setSelectedItems((prev) => [
          ...prev,
          { ...currentItem, rating: rating },
        ]);
      resetData();
    }
  };

  /**
   * Function to add emotion to "other" category.
   * Updates selectedItems with the new emotion.
   */
  const addEmotionToOther = () => {
    setSelectedItems((prevData) => {
      return prevData.map((emotion) => {
        if (emotion.id === "other") {
          return {
            ...emotion,
            emotions: [
              ...emotion.emotions,
              { name: currentItem?.value, rating: rating },
            ],
          };
        }
        return emotion;
      });
    });
  };

  /**
   * Function to handle deselecting an emotion.
   * Removes the emotion from selectedItems.
   * Resets data after handling.
   */
  const handleDeselect = () => {
    setSelectedItems((current) =>
      current.filter((item) => {
        return item.id != currentItem.id;
      })
    );
    resetData();
  };

  return (
    <div className="container-bottom">
      {showRating && (
        <div className="center">
          <div className="participant-container">
            <Rate
              rating={rating}
              handleChange={(e) => setRating(e.currentTarget.value)}
            />
            <div className="rate-buttons">
              {selectedItems.find((a) => a.id == currentItem.id) ? (
                <>
                  <button
                    className="btn delete select-none"
                    onClick={handleDeselect}
                  >
                    Noņemt
                  </button>
                  <button
                    className="btn add select-none"
                    onClick={handleRatingSave}
                  >
                    Rediģēt
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn add select-none"
                    disabled={!rating}
                    onClick={handleRatingSave}
                  >
                    Pievienot
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {currentItem?.id == "other" && (
        <OtherEmotions
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          currentItem={currentItem}
          setCurrentItem={setCurrentItem}
          handleClick={handleClick}
          rating={rating}
          setRating={setRating}
          handleChange={(e) => setRating(e.currentTarget.value)}
        />
      )}
    </div>
  );
}
