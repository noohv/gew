"use client"
import React, { useState, useEffect } from 'react'
import Participant from './_components/Participant'
import Wheel from './_components/Wheel'
import './styles.css'

export default function Home() {
  const [page, setPage] = useState(0)
  const [participantId, setParticipantId] = useState()
  const [selectedItems, setSelectedItems] = useState([])

  const conditionalComponent = () => {
    switch (page) {
      case 0:
        return <Participant page={page} setPage={setPage} participantId={participantId} setParticipantId={setParticipantId} />
      case 1:
        return <Wheel
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
