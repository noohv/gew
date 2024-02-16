"use client"
import React, { useState, useEffect } from 'react'
import './styles.css'
import emotions from "../emotions.js"

export default function Home() {

  const [selectedItem, setSelectedItem] = useState(null)


  const wheelItems = emotions.map((emotion, index) => {
    // Angles for emotion circles
    const startAngle = (-90 * Math.PI) / 180 // R
    const angle = startAngle + (index / emotions.length) * 2 * Math.PI
      
    // X and Y coordinates for emotion circles
    const cx = (50 + 40 * Math.cos(angle)).toPrecision(12)
    const cy = (50 + 40 * Math.sin(angle)).toPrecision(12)
  
    const handleItemClick = (emotion) => {
      console.log(emotion)
      setSelectedItem(emotion);
    }

    return (
      <g key={emotion.id} onClick={() => handleItemClick(emotion)}>
        <circle
          className={`circle ${selectedItem?.name === emotion.name ? 'selected' : ''}`}
          cx={`${cx}%`}
          cy={`${cy}%`}
          r="50" // Radius of emotion circles
          stroke="currentColor"
          strokeWidth="6"
          fill="currentColor"
        />
        <text
          x={`${cx}%`}
          y={`${cy}%`} // Y position for circle text
          textAnchor="middle"
          fill="black"
          fontSize="16"
        >
          {emotion.name}
        </text>
      </g>
    )
  })
      
  return (
    <div className="circle-box">
      <svg className="circle-container" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1000 1000">
        {wheelItems}
      </svg>
    </div>
  )
}
