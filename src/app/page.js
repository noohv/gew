"use client"
import React, { useState, useEffect } from 'react'
import Rate from './_components/Rate'
import './styles.css'
import emotions from "../emotions.js"

export default function Home() {

  const [selectedItems, setSelectedItems] = useState([])
  const [currentItem, setCurrentItem] = useState()
  const [rating, setRating] = useState()
  const [showRating, setShowRating] = useState(false)

  const handleChange = (e) => {
    setRating(e.currentTarget.value)
  }

  const handleSave = (e) => {
    if(currentItem && rating) {
      if(selectedItems.find(a => a.name === currentItem.name)) {
        // Logic to update rating
      }
      else {
        setSelectedItems(prev => [...prev, {...currentItem, rating: rating}])
        setCurrentItem()
        setRating()
        setShowRating(false)
      }
    }
  }

  function handleItemClick(emotion) {
    setCurrentItem(emotion)

    if(emotion === "none" || emotion === "other") {
      setShowRating(false)
      setSelectedItems([emotion])
    }
    else {
      if(selectedItems[0] === "none" || selectedItems[0] === "other") {
        setSelectedItems([])
      }
        setShowRating(true)
        const obj = selectedItems.find(a => a.name === emotion.name)
        if(obj) {
          setRating(obj.rating)
        }
        else {
          setRating()
        }
    } 
  }

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
          className={`circle ${selectedItems.find(a => a.name === emotion.name) || currentItem?.name === emotion.name ? 'selected' : ''}`}
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
            className={`circle ${selectedItems.find(a => a  === "none") ? 'selected' : ''}`}
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
            className={`circle ${selectedItems.find(a => a  === "other") ? 'selected' : ''}`}
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
        handleSave={handleSave}
      />
    }
  </>
  )
}
