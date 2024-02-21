"use client"
import {useState, useEffect} from 'react'
import '../styles.css'


export default function Rate({ numOptions, handleChange, rating }) {

    console.log(rating)
    const options = Array.from({ length: numOptions }, (_, index) => (
            <label key={index + 1} className={`rate-btn ${index + 1 == rating ? "checked": ""}`} htmlFor={index + 1}>
              <input 
                className="input-field" 
                type='radio' 
                name='rate' 
                id={index + 1} 
                value={index + 1} 
                onChange={handleChange}
                checked={index + 1 == rating} 
              />
              <p>{index + 1}</p>
            </label>
      ));


  return (
    <div className='rate'>
        {options}
    </div>
  )
}
