import React, { useState } from "react";
import clsx from "clsx";
import Rate from "./Rate";
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
      } else
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
      if (selectedItems[0]?.id === "none") setSelectedItems([]);
      setShowRating(false);
      setRating(undefined);
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

  /**
   * Calculates the X position for rendering text based on the provided parameters.
   * @param {number} cx - Center X coordinate.
   * @param {object} emotion - Emotion object containing information such as ID and name.
   * @param {number} angle - Angle to determine text position.
   * @returns {number} - Calculated X position.
   */
  const textPositionX = (cx, emotion, angle) => {
    let x = cx;

    // Adjust X position based on angle range
    if (angle > -1.4 && angle < 1.5) {
      // Fine-tune X position for the current item's emotion
      x = currentItem?.id === emotion.id ? x - 6 : x - 5;
    }
    if (angle > 1.5 || angle < -1.4) {
      // Fine-tune X position for the current item's emotion
      x =
        currentItem?.id === emotion.id
          ? Number(x) + Number(6)
          : Number(x) + Number(5);
    }
    // Additional adjustment for specific emotion
    if (emotion.name === "Apmierinātība") {
      // Fine-tune X position for the current item's emotion
      x =
        currentItem?.id === emotion.id
          ? Number(x) + Number(15)
          : Number(x) + Number(13);
    }

    return x;
  };

  /**
   * Calculates the coordinates (cx, cy) and angle for a given index within a circular layout.
   * @param {number} index - Index of the element within the circular layout.
   * @returns {Object} - Object containing calculated coordinates (cx, cy) and angle.
   */
  const calculateCoordinates = (index) => {
    // Define the starting angle of the circular layout
    const startAngle = (-80 * Math.PI) / 180;

    // Calculate the angle based on the index and total number of elements
    const angle = startAngle + (index / emotions.length) * 2 * Math.PI;

    // Calculate the X coordinate (cx) using trigonometric functions
    const cx = (50 + 40 * Math.cos(angle)).toPrecision(12);

    // Calculate the Y coordinate (cy) using trigonometric functions
    const cy = (50 + 40 * Math.sin(angle)).toPrecision(12);

    return { cx, cy, angle };
  };

  const wheelItems = emotions.map((emotion, index) => {
    const { cx, cy } = calculateCoordinates(index);

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

  const wheelText = emotions.map((emotion, index) => {
    const { cx, cy, angle } = calculateCoordinates(index);

    return (
      <text
        key={`${emotion.id}-text`}
        id={`${emotion.id}-text`}
        className={`${currentItem?.id === emotion.id ? "current" : ""}`}
        pointerEvents="none"
        x={`${textPositionX(cx, emotion, angle)}%`}
        y={`${cy}%`}
        textAnchor={clsx({
          ["start"]:
            angle > -1.4 && angle < 1.5 && emotion.name != "Apmierinātība",
          ["end"]:
            angle > 1.5 || angle < -1.4 || emotion.name == "Apmierinātība",
        })}
        dominantBaseline="middle"
        fill="black"
        fontSize="18"
      >
        {emotion.name}
      </text>
    );
  });

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
            <text
              id="none-text"
              className={clsx({
                ["current"]: currentItem?.id === "none",
              })}
              pointerEvents="none"
              x="40%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="black"
              fontSize="18"
            >
              Neviens
            </text>

            <text
              textAnchor="middle"
              dominantBaseline="middle"
              fill="black"
              fontSize="18"
              x="60%"
              y="60%"
            >
              {`Skaits: ${
                selectedItems.find((a) => a.id === "other")?.emotions.length ||
                0
              }`}
            </text>
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

            <text
              id="other-text"
              className={`${currentItem?.id === "other" ? "current" : ""}`}
              pointerEvents="none"
              x="60%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="black"
              fontSize="18"
            >
              Cits
            </text>

            {wheelItems}
            {wheelText}
            <use xlinkHref={`#${currentItem?.id}`} />
            <use xlinkHref={`#${currentItem?.id}-text`} />
          </svg>
        </div>
      </div>
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
    </div>
  );
}
