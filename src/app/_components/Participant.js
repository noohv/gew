import React from 'react'

export default function Participant({ setPage, participantId, setParticipantId }) {
  function handleClick(e) {
    e.preventDefault()

    const regex = /^[a-zA-Z]{2}\d{4}$/;

    if (participantId) {
      setPage(prev => prev + 1)
    }
  }

  return (
    <div className='main'>
      <div className='participant-container'>
        <p>Ievadiet savu identifikatoru</p>
        <input
          type='text'
          id='participantId'
          name='participantId'
          maxLength={30}
          onChange={(e) => setParticipantId(e.target.value)} />
        <button className='btn' onClick={handleClick}>Tālāk</button>
      </div>
    </div>
  )
}
