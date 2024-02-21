"use client"
import React, { useState, useEffect } from 'react'
import Rate from './_components/Rate'
import './styles.css'
import emotions from "../emotions.js"

export default function Home() {

  const [selectedItem, setSelectedItem] = useState([])
  const [currentItem, setCurrentItem] = useState()
  const [showRating, setShowRating] = useState(false)
  const [rating, setRating] = useState()

  const handleChange = (e) => {
    setRating(e.currentTarget.value)
  }

  function handleItemClick(emotion) {
    

    if(emotion === "none" || emotion === "other") {
      setSelectedItem([emotion])
    }
    else if (selectedItem[0] === "none" || selectedItem[0] === "other") {
      setSelectedItem([emotion])
    } else {
      setCurrentItem(emotion)
      setShowRating(true)
      // setSelectedItem(prev => [...prev, emotion])

    }

  }
  console.log(selectedItem)

  const wheelItems = emotions.map((emotion, index) => {
    // Angles for emotion circles
    const startAngle = (-100 * Math.PI) / 180 // R
    const angle = startAngle + (index / emotions.length) * 2 * Math.PI
      
    // X and Y coordinates for emotion circles
    const cx = (50 + 40 * Math.cos(angle)).toPrecision(12)
    const cy = (50 + 40 * Math.sin(angle)).toPrecision(12)
  

    return (
      <g key={emotion.id} onClick={() => handleItemClick(emotion)}>
        <circle
          className={`circle ${selectedItem.find(a => a.name === emotion.name) || currentItem?.name === emotion.name ? 'selected' : ''}`}
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
  <>
    <div className="circle-box">
      <svg className="circle-container" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1000 1000">
        <g onClick={() => handleItemClick("none")}>
          <circle
            className={`circle ${selectedItem.find(a => a  === "none") ? 'selected' : ''}`}
            cx="40%"
            cy="50%"
            r="50" // Radius of emotion circles
            stroke="currentColor"
            strokeWidth="6"
            fill="currentColor"
          />
          <text
            x="40%"
            y="50%" // Y position for circle text
            textAnchor="middle"
            fill="black"
            fontSize="16"
          >
            Neviens
          </text>
        </g>
        <g onClick={() => handleItemClick("other")}>
          <circle
            className={`circle ${selectedItem.find(a => a  === "other") ? 'selected' : ''}`}
            cx="60%"
            cy="50%"
            r="50" // Radius of emotion circles
            stroke="currentColor"
            strokeWidth="6"
            fill="currentColor"
          />
          <text
            x="60%"
            y="50%" // Y position for circle text
            textAnchor="middle"
            fill="black"
            fontSize="16"
          >
            Cits
          </text>
        </g>
        {wheelItems}
      </svg>
    </div>
    {showRating && 
      <Rate 
        numOptions={5}
        rating={rating} 
        setRating={setRating} 
        handleChange={handleChange}
      />
    }
  </>
  )
}
