import { useState } from 'react'
import Rate from './Rate'
import emotions from '../../emotions.js'
import '../styles.css'

export default function Circle({ selectedItems, setSelectedItems }) {
  const [currentItem, setCurrentItem] = useState()
  const [rating, setRating] = useState()
  const [showRating, setShowRating] = useState(false)

  const breakWord = (word, cx) => {
    const length = word.length
    const halfLength = Math.ceil(length / 2)
    const firstHalf = word.substring(0, halfLength)
    const secondHalf = word.substring(halfLength)
    if (length >= 10) {
      return (
        <>
          <tspan x={`${cx}%`} dy="-0.3em">{firstHalf}</tspan>
          <tspan x={`${cx}%`} dy="1.2em">{secondHalf}</tspan>
        </>
      )
    }
    else return word
  }

  const resetData = () => {
    setCurrentItem()
    setRating()
    setShowRating(false)
  }

  const handleSave = (e) => {
    if (currentItem && rating) {
      // Logic to update rating
      if (selectedItems.find(a => a.name === currentItem.name)) {
        const updatedItems = selectedItems.map(obj => {
          if (obj.id == currentItem.id) {
            return { ...obj, rating: rating }
          }
          return obj
        })

        setSelectedItems(updatedItems)

      }
      else {
        setSelectedItems(prev => [...prev, { ...currentItem, rating: rating }])
      }
      resetData()
    }
  }

  const handleDelete = (e) => {
    setSelectedItems(current => current.filter(item => {
      return item.id != currentItem.id
    }))
    resetData()
  }

  const handleChange = (e) => {
    setRating(e.currentTarget.value)
  }

  function handleItemClick(emotion) {
    setCurrentItem(emotion)

    if (emotion === "none" || emotion === "other") {
      setShowRating(false)
      setSelectedItems([emotion])
    }
    else {
      if (selectedItems[0] === "none" || selectedItems[0] === "other") {
        setSelectedItems([])
      }
      setShowRating(true)
      const obj = selectedItems.find(a => a.name === emotion.name)
      if (obj) {
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
          alignmentBaseline='middle'
          fill="black"
          fontSize="18"
        >
          {breakWord(emotion.name, cx)}
        </text>
      </g >
    )
  })
  return (
    <>
      <div className="circle-box">
        <svg className="circle-container" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1000 1000">
          <g onClick={() => handleItemClick("none")}>
            <circle
              className={`circle ${selectedItems.find(a => a === "none") ? 'selected' : ''}`}
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
              alignmentBaseline='middle'
              fill="black"
              fontSize="18"
            >
              Neviens
            </text>
          </g>
          <g onClick={() => handleItemClick("other")}>
            <circle
              className={`circle ${selectedItems.find(a => a === "other") ? 'selected' : ''}`}
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
              alignmentBaseline='middle'
              fill="black"
              fontSize="18"
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
          isSelected={selectedItems.find(a => a.name == currentItem.name)}
          setRating={setRating}
          handleChange={handleChange}
          handleSave={handleSave}
          handleDelete={handleDelete}
        />
      }
    </>
  )
}
