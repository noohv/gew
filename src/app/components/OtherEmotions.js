import React from 'react'
import clsx from 'clsx'
import Input from './Input'
import Rate2 from './Rate2'

export default function OtherEmotions({ selectedItems, currentItem, setCurrentItem, handleClick, rating, handleChange }) {
	
	const otherItems = selectedItems.find(item => item.id == "other")?.emotions.map((emotion, index) => (
		<li key={index} >{emotion.name} - {emotion.rating}</li>
	))

	return (
		<div className='center'>
			<div className='participant-container'>
				<p>Ievadiet emociju</p>
				<Input
					type='text'
					name='participantId'
						maxLength={30}
						value={currentItem?.value || ''}
						onChange={(e) => setCurrentItem({ ...currentItem, value: e.target.value })}
				/>
				<Rate2 
					rating={rating}
					handleChange={handleChange}
				/>

				<button className='btn' disabled={currentItem?.value && rating ? false : true} onClick={handleClick}>Pievienot</button>
				{otherItems}
			</div>
		</div>
	)
}
