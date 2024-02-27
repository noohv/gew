"use client"
import React, { useState, useEffect } from 'react'
import Participant from './_components/Participant'
import Circle from './_components/Circle'
import './styles.css'
import emotions from "../emotions.js"

export default function Home() {
  const [page, setPage] = useState(0)
  const [participantId, setParticipantId] = useState()
  const [selectedItems, setSelectedItems] = useState([])
  const [currentItem, setCurrentItem] = useState()
  const [rating, setRating] = useState()
  const [showRating, setShowRating] = useState(false)

  return (
    <>
      {page == 0 &&
        <Participant page={page} setPage={setPage} participantId={participantId} setParticipantId={setParticipantId} />
      }
      {page == 1 &&
        <Circle
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          currentItem={currentItem}
          setCurrentItem={setCurrentItem}
          rating={rating}
          setRating={setRating}
          showRating={showRating}
          setShowRating={setShowRating}
        />

      }
    </>
  )
}
