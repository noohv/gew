import { useState } from 'react'
import Rate from './Rate'
import Input from './Input'
import emotions from '../../emotions.js'
import '../styles.css'

export default function Wheel({ selectedItems, setSelectedItems }) {
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
          <tspan x={`${cx}%`} dy="-0.6em">{firstHalf}</tspan>
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
        if (selectedItems[0]?.name === "other") {
          setSelectedItems([{ ...currentItem, rating: rating }])
        } else {
          setSelectedItems(prev => [...prev, { ...currentItem, rating: rating }])
        }
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

  const handleItemClick = (emotion) => {
    setCurrentItem(emotion)

    if (emotion === "none") {
      setShowRating(false)
      setSelectedItems([emotion])
    } else if (emotion.name == 'other') {
      setShowRating(false)
    }
    else {
      if (selectedItems[0] === "none") {
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

  const handleClick = (e) => {
    resetData()
    setSelectedItems([currentItem])
  }

  console.log(currentItem)
  console.log(selectedItems)

  const wheelItems = emotions.map((emotion, index) => {
    // Angles for emotion circles
    const startAngle = (-100 * Math.PI) / 180 // R
    const angle = startAngle + (index / emotions.length) * 2 * Math.PI

    // X and Y coordinates for emotion circles
    const cx = (50 + 40 * Math.cos(angle)).toPrecision(12)
    const cy = (50 + 40 * Math.sin(angle)).toPrecision(12)


    return (
      <g id={emotion.id} key={emotion.id} onClick={() => handleItemClick(emotion)}>
        <circle
          className={`circle ${selectedItems.find(a => a.name === emotion.name) ? 'selected' : currentItem?.name === emotion.name ? 'current' : ''}`}
          cx={`${cx}%`}
          cy={`${cy}%`}
          r={currentItem?.name == emotion.name ? '70' : '60'} // Radius of emotion circles
          stroke="currentColor"
          fill="currentColor"
        />
        <text
          x={`${cx}%`}
          y={`${cy}%`} // Y position for circle text
          textAnchor="middle"
          dominantBaseline='middle'
          fill="black"
          fontSize="18"
        >
          {breakWord(emotion.name, cx)}
        </text>
      </g >
    )
  })
  return (
    <div>
      <div className='test'>
        <div className="wheel-box">
          <svg className="wheel-container" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
            <g id='none' onClick={() => handleItemClick("none")}>
              <circle
                className={`circle ${selectedItems.find(a => a === "none") ? 'selected' : ''}`}
                cx="40%"
                cy="50%"
                r={currentItem == "none" ? '70' : '58'} // Radius of emotion circles
                stroke="currentColor"
                fill="currentColor"
              />
              <text
                x="40%"
                y="50%" // Y position for circle text
                textAnchor="middle"
                dominantBaseline='middle'
                fill="black"
                fontSize="18"
              >
                Neviens
              </text>
            </g>
            <g id='other' onClick={() => handleItemClick({ name: "other" })}>
              <circle
                className={`circle ${selectedItems.find(a => a?.name === "other") ? 'selected' : ''}`}
                cx="60%"
                cy="50%"
                r={currentItem?.name == "other" ? '70' : '58'} // Radius of emotion circles
                stroke="currentColor"
                fill="currentColor"
              />
              <text
                x="60%"
                y="50%" // Y position for circle text
                textAnchor="middle"
                dominantBaseline='middle'
                fill="black"
                fontSize="18"
              >
                Cits
              </text>

            </g>
            {wheelItems}
            <use xlinkHref={`#${currentItem?.id || currentItem}`} />
          </svg>
        </div>
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

      {currentItem?.name == "other" &&
        <div className='center'>
          <div className='participant-container'>
            <p>Ievadiet emociju</p>
            <Input
              type='text'
              name='participantId'
              maxLength={30}
              onChange={(e) => setCurrentItem({ ...currentItem, value: e.target.value })}
            />
            {/* setSelectedItems(prev => [...prev, { ...currentItem, rating: rating }]) */}
            <button className='btn' onClick={handleClick}>Pievienot</button>
          </div>
        </div>
      }
    </div>
  )
}
