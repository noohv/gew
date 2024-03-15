import React, { useState } from "react";
import clsx from "clsx";
import Rate from "./Rate";
import Rate2 from "./Rate2";
import Input from "./Input";
import EmotionCircle from "./EmotionCircle";
import emotions from "../utils/emotions.js";
import "../styles.css";
import OtherEmotions from "./OtherEmotions";

export default function Wheel({ selectedItems, setSelectedItems }) {
  const [currentItem, setCurrentItem] = useState();
  const [rating, setRating] = useState();
  const [showRating, setShowRating] = useState(false);

  // Reset states
  const resetData = () => {
    setCurrentItem();
    setRating();
    setShowRating(false);
  };

  // Handle the rating save
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
      }

      // else if (selectedItems[0]?.id === "other") setSelectedItems([{ ...currentItem, rating: rating }])
      else
        setSelectedItems((prev) => [
          ...prev,
          { ...currentItem, rating: rating },
        ]);
      resetData();
    }
  };

  // Delete selected emotion
  const handleDelete = () => {
    setSelectedItems((current) =>
      current.filter((item) => {
        return item.id != currentItem.id;
      })
    );
    resetData();
  };

  const handleItemClick = (emotion) => {
    setCurrentItem(emotion);

    if (emotion.id === "none") {
      setShowRating(false);
      setSelectedItems([emotion]);
    } else if (emotion.id === "other") {
      if (selectedItems[0]?.id === "other") setCurrentItem(selectedItems[0]);
      if (selectedItems[0]?.id === "none") setSelectedItems([]);
      setShowRating(false);
    } else {
      if (selectedItems[0]?.id === "none") setSelectedItems([]);
      setShowRating(true);
      const obj = selectedItems.find((a) => a.id === emotion.id);
      setRating(obj ? obj.rating : undefined);
    }
  };

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

  //
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

  const wheelItems = emotions.map((emotion, index) => {
    const startAngle = (-100 * Math.PI) / 180;
    const angle = startAngle + (index / emotions.length) * 2 * Math.PI;
    const cx = (50 + 40 * Math.cos(angle)).toPrecision(12);
    const cy = (50 + 40 * Math.sin(angle)).toPrecision(12);

    return (
      <EmotionCircle
        key={emotion.id}
        className={clsx({
          ["selected-current"]:
            selectedItems.find((a) => a.id === currentItem?.id) &&
            currentItem?.id === emotion.id,
          ["selected"]:
            selectedItems.find((a) => a.id === emotion.id) &&
            currentItem?.id != emotion.id,
          ["current"]: currentItem?.id === emotion.id,
        })}
        item={emotion}
        cx={cx}
        cy={cy}
        isSelected={selectedItems.find((a) => a.id === currentItem?.id)}
        handleItemClick={handleItemClick}
        currentItem={currentItem}
      />
    );
  });
  console.log(selectedItems);

  return (
    <div className="emotion-wheel-container">
      <div className="container-top">
        <div className="wheel-container">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
            <EmotionCircle
              className={clsx({
                ["selected current"]: selectedItems.find(
                  (a) => a.id === "none"
                ),
              })}
              item={{ id: "none", name: "Neviens" }}
              cx={40}
              cy={50}
              isSelected={selectedItems.find((a) => a.id === currentItem?.id)}
              handleItemClick={handleItemClick}
              currentItem={currentItem}
            />
            <EmotionCircle
              className={clsx({
                ["selected-current"]:
                  selectedItems.find((a) => a.id === currentItem?.id) &&
                  currentItem?.id === "other",
                ["selected"]:
                  selectedItems.find((a) => a.id === "other") &&
                  currentItem?.id != "other",
                ["current"]: currentItem?.id === "other",
              })}
              item={{ id: "other", name: "Cits" }}
              cx={60}
              cy={50}
              isSelected={selectedItems.find((a) => a.id === currentItem?.id)}
              handleItemClick={handleItemClick}
              currentItem={currentItem}
            />
            {wheelItems}
            <use xlinkHref={`#${currentItem?.id}`} />
          </svg>
        </div>
      </div>
      <div className="container-bottom">
        {showRating && (
          <div className="center">
            <div className="participant-container">
              <Rate2
                rating={rating}
                handleChange={(e) => setRating(e.currentTarget.value)}
              />
              <div className="rate-buttons">
                {selectedItems.find((a) => a.id == currentItem.id) ? (
                  <>
                    <button
                      className="btn delete select-none"
                      onClick={handleDelete}
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
            currentItem={currentItem}
            setCurrentItem={setCurrentItem}
            handleClick={handleClick}
            rating={rating}
            handleChange={(e) => setRating(e.currentTarget.value)}
          />
        )}
      </div>
    </div>
  );
}
