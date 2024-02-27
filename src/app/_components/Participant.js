"use client"
import React from 'react'

export default function Participant({ page, setPage, participantId, setParticipantId }) {
    function handleClick(e) {
        e.preventDefault()

        const regex = /^[a-zA-Z]{2}\d{4}$/;

        if (participantId) {
            setPage(prev => prev + 1)
        }
    }

    return (
        <div className='center'>
            <input type='text' id='participantId' name='participantId' onChange={(e) => setParticipantId(e.target.value)} />
            <button onClick={handleClick}>Tālāk</button>
        </div>
    )
}
