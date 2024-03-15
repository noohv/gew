import React from "react";

export default function EmotionCircle({
  item,
  handleItemClick,
  currentItem,
  ...rest
}) {
  // Break words into two lines if too long
  const breakWord = (word, cx) => {
    const length = word.length;
    const halfLength = Math.ceil(length / 2);
    const firstHalf = word.substring(0, halfLength);
    const secondHalf = word.substring(halfLength);
    if (length >= 10) {
      return (
        <>
          <tspan x={`${cx}%`} dy="-0.6em">
            {firstHalf}
          </tspan>
          <tspan x={`${cx}%`} dy="1.2em">
            {secondHalf}
          </tspan>
        </>
      );
    } else return word;
  };

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
      <text
        x={`${rest.cx}%`}
        y={`${rest.cy}%`}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="black"
        fontSize="18"
      >
        {breakWord(item.name, rest.cx)}
      </text>
    </g>
  );
}
