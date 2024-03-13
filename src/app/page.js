"use client"
import React, { useState } from 'react'
import Participant from './pages/Participant'
import EmotionWheelPage from './pages/EmotionWheelPage'
import FinalPage from './pages/FinalPage'
import './styles.css'

export default function Home() {
  const [page, setPage] = useState(1)
  const [participantId, setParticipantId] = useState()
  const [selectedItems, setSelectedItems] = useState([])

  const conditionalComponent = () => {
    switch (page) {
      case 0:
        return <Participant setPage={setPage} participantId={participantId} setParticipantId={setParticipantId} />
      case 1:
        return <EmotionWheelPage
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          participantId={participantId}
          setPage={setPage}
        />
      case 2:
        return <FinalPage />
      default:
        return <Participant setPage={setPage} participantId={participantId} setParticipantId={setParticipantId} />
    }
  };

  return (
    conditionalComponent()
  )
}
