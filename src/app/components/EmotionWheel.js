import React from "react";
import clsx from "clsx";
import EmotionCircle from "./EmotionCircle";
import emotions from "../utils/emotions.js";
import { useTranslations } from "next-intl";

export default function EmotionWheel({
  selectedItems,
  setSelectedItems,
  currentItem,
  setCurrentItem,
  setRating,
  setShowRating,
}) {
  const t = useTranslations("Index");

  /**
   * Function to handle click events on wheel elements.
   * @param {Object} emotion - The emotion object corresponding to the clicked wheel element.
   */
  const handleItemClick = (emotion) => {
    // Set the currently selected item
    setCurrentItem(emotion);

    // Check if the clicked emotion is "none"
    if (emotion.id === "none") {
      // Hide the rating UI and select the "none" item
      setShowRating(false);
      setSelectedItems([emotion]);
    }
    // Check if the clicked emotion is "other"
    else if (emotion.id === "other") {
      // Clear selected items if "none" is selected
      if (selectedItems[0]?.id === "none") setSelectedItems([]);
      // Hide the rating UI and reset the rating value
      setShowRating(false);
      setRating(undefined);
    }
    // For other emotions
    else {
      // Clear selected items if "none" is selected
      if (selectedItems[0]?.id === "none") setSelectedItems([]);
      // Show the rating UI
      setShowRating(true);
      // Set the rating value based on the selected emotion
      const obj = selectedItems.find((a) => a.id === emotion.id);
      setRating(obj ? obj.rating : undefined);
    }
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

  // Generate circles representing emotions on the wheel
  const wheelItems = emotions.map((emotion, index) => {
    // Calculate coordinates for each emotion circle

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

  // Generate texts for each emotion on the wheel
  const wheelText = emotions.map((emotion, index) => {
    // Calculate coordinates and angle for text positioning
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
        {t(emotion.id)}
      </text>
    );
  });

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
      <EmotionCircle
        className={clsx({
          ["selected current"]: selectedItems.find((a) => a.id === "none"),
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
        {t("none")}
      </text>

      <text
        textAnchor="middle"
        dominantBaseline="middle"
        fill="black"
        fontSize="18"
        x="60%"
        y="60%"
      >
        {`${t("count")} ${
          selectedItems.find((a) => a.id === "other")?.emotions.length || 0
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
        {t("other")}
      </text>

      <g id="wheel-circles">{wheelItems}</g>
      <g id="wheel-text">{wheelText}</g>
      <use xlinkHref={`#${currentItem?.id}`} />
      <use xlinkHref={`#${currentItem?.id}-text`} />
    </svg>
  );
}
