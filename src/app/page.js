"use client"
import React, { useState, useEffect } from 'react'
import Participant from './_components/Participant'
import Circle from './_components/Circle'
import './styles.css'

export default function Home() {
  const [page, setPage] = useState(0)
  const [participantId, setParticipantId] = useState()
  const [selectedItems, setSelectedItems] = useState([])


  return (
    <>
      {/* {page == 0 &&
        <Participant page={page} setPage={setPage} participantId={participantId} setParticipantId={setParticipantId} />
      } */}
      {page == 0 &&
        <Circle
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />

      }
    </>
  )
}
