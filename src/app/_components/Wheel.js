import { useState } from 'react'
import clsx from 'clsx'
import Rate from './Rate'
import Input from './Input'
import emotions from '../../emotions.js'
import '../styles.css'

export default function Wheel({ selectedItems, setSelectedItems }) {
  const [currentItem, setCurrentItem] = useState()
  const [rating, setRating] = useState()
  const [showRating, setShowRating] = useState(false)

  // Break words into two lines if too long
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

  // Reset states
  const resetData = () => {
    setCurrentItem()
    setRating()
    setShowRating(false)
  }

  // Handle the rating save
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

      else if (selectedItems[0]?.name === "other") setSelectedItems([{ ...currentItem, rating: rating }])
      else setSelectedItems(prev => [...prev, { ...currentItem, rating: rating }])
      resetData()
    }
  }

  // Delete selected emotion
  const handleDelete = () => {
    setSelectedItems(current => current.filter(item => {
      return item.id != currentItem.id
    }))
    resetData()
  }

  const handleItemClick = (emotion) => {
    setCurrentItem(emotion)

    if (emotion.name === "none") {
      setShowRating(false)
      setSelectedItems([emotion])
    }
    else if (emotion.name === "other") {
      if (selectedItems[0]?.name === "other") setCurrentItem(selectedItems[0])
      if (selectedItems[0]?.name === "none") setSelectedItems([])
      setShowRating(false)
    }
    else {
      if (selectedItems[0]?.name === "none") setSelectedItems([])
      setShowRating(true)
      const obj = selectedItems.find(a => a.name === emotion.name)
      setRating(obj ? obj.rating : undefined)
    }
  }

  // 
  const handleClick = () => {
    resetData()
    setSelectedItems([currentItem])
  }

  console.log(currentItem)
  console.log(selectedItems)

  const wheelItems = emotions.map((emotion, index) => {
    // Angles for emotion circles
    const startAngle = (-100 * Math.PI) / 180 // Angle for the first element
    const angle = startAngle + (index / emotions.length) * 2 * Math.PI // Calculate angle for each element in list

    // X and Y coordinates for emotion circles
    const cx = (50 + 40 * Math.cos(angle)).toPrecision(12)
    const cy = (50 + 40 * Math.sin(angle)).toPrecision(12)

    return (
      <g id={emotion.id} key={emotion.id} onClick={() => handleItemClick(emotion)}>
        <circle
          className={clsx("circle", {
            ["selected-current"]: selectedItems.find(a => a.id === currentItem?.id) && currentItem?.id === emotion.id,
            ["selected"]: selectedItems.find(a => a.id === emotion.id) && currentItem?.id != emotion.id,
            ["current"]: currentItem?.name === emotion.name
          })}
          cx={`${cx}%`}
          cy={`${cy}%`}
          r={currentItem?.name == emotion.name ? '70' : '60'} // Radius of emotion circles
          stroke="currentColor"
          fill="currentColor"
        />
        <text
          x={`${cx}%`}
          y={`${cy}%`}
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
    <div className='container'>
      <div className='container-top'>
        <div className="wheel-container">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
            <g id='none' onClick={() => handleItemClick({ id: "none", name: "none" })}>
              <circle
                className={clsx("circle", {
                  ["selected current"]: selectedItems.find(a => a.id === "none"),
                })}
                cx="40%"
                cy="50%"
                r={currentItem?.name == "none" ? '70' : '60'} // Radius of emotion circles
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
            <g id='other' onClick={() => handleItemClick({ id: "other", name: "other", value: "" })}>
              <circle
                className={clsx("circle", {
                  ["selected-current"]: selectedItems.find(a => a.id === currentItem?.id) && currentItem?.id === "other",
                  ["selected"]: selectedItems.find(a => a.id === "other") && currentItem?.id != "other",
                  ["current"]: currentItem?.name === "other"
                })}
                cx="60%"
                cy="50%"
                r={currentItem?.name == "other" ? '70' : '60'} // Radius of emotion circles
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
            <use xlinkHref={`#${currentItem?.id}`} />
          </svg>
        </div>
      </div>
      <div className='container-bottom'>
        {showRating &&
          <Rate
            numOptions={5}
            rating={rating}
            isSelected={selectedItems.find(a => a.name == currentItem.name)}
            setRating={setRating}
            handleChange={(e) => setRating(e.currentTarget.value)}
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
                value={currentItem?.value}
                onChange={(e) => setCurrentItem({ ...currentItem, value: e.target.value })}
              />
              <button className='btn' onClick={handleClick}>Pievienot</button>
            </div>
          </div>
        }
        <div className='save'>
          <button className='btn' disabled={true}>Saglabāt</button>
        </div>
      </div>
    </div>
  )
}
