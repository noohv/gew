"use client"
import React, { useState, useEffect, useRef } from 'react';
import './styles.css';
import emotions from "../emotions.js"

export default function Home() {
  const wheelItems = emotions.map(emotion => 
      <div key={emotion.id} className='circle'>
        {emotion.name}
      </div>
    )
    
    const graph = useRef(null);


    useEffect(() => {
      const ciclegraph = graph.current;
      const circleElements = ciclegraph.childNodes;
  
      let angle = 360 - 90;
      let dangle = 360 / circleElements.length;
  
      for (let i = 0; i < circleElements.length; i++) {
        let circle = circleElements[i];
        angle += dangle;
        circle.style.transform = `rotate(${angle}deg) translate(${ciclegraph.clientWidth /
          2}px) rotate(-${angle}deg)`;
      }
    }, []);
  
    return (
      <div className="circlegraph" ref={graph}>
        {wheelItems}
      </div>
    );
}
