import React, { useEffect, useState } from "react";
import Rate from "./Rate";
import OtherEmotionList from "./OtherEmotionList";

export default function OtherEmotions({
  selectedItems,
  setSelectedItems,
  currentItem,
  setCurrentItem,
  handleClick,
  rating,
  setRating,
  handleChange,
}) {
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState();
  const otherEmotions = selectedItems.find(
    (item) => item.id == "other"
  )?.emotions;
  const [showInputs, setShowInputs] = useState(!otherEmotions);
  const MAX_OTHER_COUNT = 10; // Maximum amount of "Other" emotions

  useEffect(() => {
    setShowInputs(!otherEmotions || editMode);
  }, [otherEmotions, editMode]);

  /**
   * Function to delete the selected item.
   * @param {number} index - The index of the item to be deleted.
   */
  const handleItemDelete = (index) => {
    // Create a copy of otherEmotions array
    const updatedItems = [...otherEmotions];
    // Remove item at the specified index
    updatedItems.splice(index, 1);

    // If no items left after deletion, remove "other" from selectedItems and clear currentItem
    if (updatedItems.length === 0) {
      setSelectedItems((current) =>
        current.filter((item) => {
          return item.id != "other";
        })
      );
      setCurrentItem();
    } else {
      // Update otherEmotions and cancel edit mode
      setSelectedItems((prevData) => {
        return prevData.map((emotion) => {
          if (emotion.id === "other") {
            return {
              ...emotion,
              emotions: updatedItems,
            };
          }
          return emotion;
        });
      });
      handleEditCancel();
    }
  };

  /**
   * Function to start editing the selected item.
   * @param {number} index - The index of the item to be edited.
   */
  const handleItemEdit = (index) => {
    // Set edit mode, edit index, current item, rating, and show inputs
    setEditMode(true);
    setEditIndex(index);
    const editData = {
      id: "other",
      name: "Cits",
      value: otherEmotions[index].name,
    };
    setCurrentItem(editData);
    setRating(otherEmotions[index].rating);
    setShowInputs(true);
  };

  /**
   * Function to save the edited item.
   */
  const handleSaveEdit = () => {
    // Update otherEmotions with edited item, update selectedItems, and cancel edit mode
    const updatedItems = otherEmotions.map((c, i) => {
      if (i === editIndex) {
        return { name: currentItem.value, rating: rating };
      } else {
        return c;
      }
    });

    setSelectedItems((prevData) => {
      return prevData.map((emotion) => {
        if (emotion.id === "other") {
          return {
            ...emotion,
            emotions: updatedItems,
          };
        }
        return emotion;
      });
    });
    handleEditCancel();
  };

  /**
   * Function to cancel the edit.
   */
  const handleEditCancel = () => {
    // Reset edit mode, currentItem, rating, and hide inputs
    setEditMode(false);
    setCurrentItem((prev) => ({ id: prev.id, name: prev.name }));
    setRating(undefined);
    setShowInputs(false);
  };

  return (
    <div className="center">
      <div className="participant-container">
        {showInputs ? (
          <>
            <div className="input-name">
              <p>Emocijas nosaukums</p>
            </div>
            <input
              className="text-input"
              type="text"
              name="participantId"
              maxLength={30}
              value={currentItem?.value || ""}
              onChange={(e) =>
                setCurrentItem({ ...currentItem, value: e.target.value })
              }
            />
            <Rate rating={rating} handleChange={handleChange} />

            <div className="rate-buttons">
              {otherEmotions && (
                <button className="btn cancel" onClick={handleEditCancel}>
                  Atcelt
                </button>
              )}
              <button
                className="btn"
                disabled={currentItem?.value && rating ? false : true}
                onClick={editMode ? handleSaveEdit : handleClick}
              >
                {editMode ? "Rediģēt" : "Pievienot"}
              </button>
            </div>
          </>
        ) : (
          otherEmotions.length < MAX_OTHER_COUNT && (
            <button className="btn" onClick={() => setShowInputs(true)}>
              Pievienot vēl
            </button>
          )
        )}
        {otherEmotions && (
          <OtherEmotionList
            emotions={otherEmotions}
            handleDelete={handleItemDelete}
            handleEdit={handleItemEdit}
          />
        )}
      </div>
    </div>
  );
}
