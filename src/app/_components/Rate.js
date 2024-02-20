"use client"
import {useState, useEffect} from 'react'
import '../styles.css'


export default function Rate({ numOptions }) {
    const options = Array.from({ length: numOptions }, (_, index) => (
        <div key={index + 1} className='rate-option-container'>
            <label className={"test"}
                    htmlFor={index + 1}>{index + 1}</label>
            <input className='input-field' type='radio' name='rate' id={index + 1} value={index + 1} />
        </div>
      ));


  return (
    <div className='rate'>
        {options}
    </div>
  )
}
