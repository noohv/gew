"use client"
import React, { useState } from 'react'
import Participant from './pages/Participant'
import Wheel from './_components/Wheel'
import EmotionWheelPage from './pages/EmotionWheelPage'
import './styles.css'

export default function Home() {
  const [page, setPage] = useState(1)
  const [participantId, setParticipantId] = useState()
  const [selectedItems, setSelectedItems] = useState([])

  const conditionalComponent = () => {
    switch (page) {
      case 0:
        return <Participant page={page} setPage={setPage} participantId={participantId} setParticipantId={setParticipantId} />
      case 1:
        return <EmotionWheelPage
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems} />
      default:
        return <Participant page={page} setPage={setPage} participantId={participantId} setParticipantId={setParticipantId} />
    }
  };

  return (
    conditionalComponent()
  )
}
