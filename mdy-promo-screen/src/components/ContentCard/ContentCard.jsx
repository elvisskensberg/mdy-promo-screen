import React, { useState, useEffect, useRef } from 'react';
import './ContentCard.css';

/**
 * ContentCard - Simplified static overlay with auto-scroll
 */
const ContentCard = ({ items }) => {
  const [zmanimData, setZmanimData] = useState(null);
  const leftScrollRef = useRef(null);
  const rightScrollRef = useRef(null);

  // Load today's zmanim data
  useEffect(() => {
    const loadTodayZmanim = async () => {
      try {
        const today = new Date();
        const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        const response = await fetch(`/assets/zmanim/${dateStr}.json`);
        if (response.ok) {
          setZmanimData(await response.json());
        }
      } catch (err) {
        console.error('Error loading zmanim:', err);
      }
    };
    loadTodayZmanim();
  }, []);

  // Auto-scroll for left column
  useEffect(() => {
    const element = leftScrollRef.current;
    if (!element) return;
    let position = 0;
    const intervalId = setInterval(() => {
      position += 0.5;
      if (position >= element.scrollHeight - element.clientHeight) position = 0;
      element.scrollTop = position;
    }, 30);
    return () => clearInterval(intervalId);
  }, [items]);

  // Auto-scroll for right column
  useEffect(() => {
    const element = rightScrollRef.current;
    if (!element || !zmanimData) return;
    let position = 0;
    const intervalId = setInterval(() => {
      position += 0.3;
      if (position >= element.scrollHeight - element.clientHeight) position = 0;
      element.scrollTop = position;
    }, 30);
    return () => clearInterval(intervalId);
  }, [zmanimData]);

  const times = zmanimData ? [
    zmanimData.times.alotHaShachar,
    zmanimData.times.misheyakir,
    zmanimData.times.sunrise,
    zmanimData.times.sofZmanShma,
    zmanimData.times.sofZmanTfilla,
    zmanimData.times.chatzot,
    zmanimData.times.minchaGedola,
    zmanimData.times.minchaKetana,
    zmanimData.times.sunset,
  ].filter(t => t?.time) : [];

  return (
    <div className="content">
      <div className="left" ref={leftScrollRef}>
        {items.map((item, i) => (
          <div key={i}>
            <h2>{item.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: item.html }} />
          </div>
        ))}
      </div>

      {zmanimData && (
        <div className="right" ref={rightScrollRef}>
          <h1>ZMANIM</h1>
          <p>{zmanimData.location.city}, {zmanimData.location.country}</p>
          {times.map((t, i) => (
            <div key={i}>
              <span>{t.name}</span>
              <strong>{t.time}</strong>
              <small>{t.hebrew}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentCard;
