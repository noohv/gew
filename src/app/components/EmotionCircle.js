import React from "react";

export default function EmotionCircle({
  item,
  handleItemClick,
  currentItem,
  ...rest
}) {
  return (
    <g id={item.id} onClick={() => handleItemClick(item)}>
      <circle
        className={`circle ${rest.className}`}
        cx={`${rest.cx}%`}
        cy={`${rest.cy}%`}
        r={currentItem?.id == item.id ? "70" : "60"} // Radius of emotion circles
        stroke="currentColor"
        fill="currentColor"
      />
    </g>
  );
}
