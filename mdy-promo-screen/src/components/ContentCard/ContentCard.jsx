import React, { useState, useEffect, useRef } from 'react';
import './ContentCard.css';

/**
 * ContentCard - Zmanim display in top left corner
 */
const ContentCard = () => {
  const [zmanimData, setZmanimData] = useState(null);
  const scrollRef = useRef(null);

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

  // Auto-scroll for zmanim
  useEffect(() => {
    const element = scrollRef.current;
    if (!element || !zmanimData) return;
    let position = 0;
    const intervalId = setInterval(() => {
      position += 0.3;
      if (position >= element.scrollHeight - element.clientHeight) position = 0;
      element.scrollTop = position;
    }, 30);
    return () => clearInterval(intervalId);
  }, [zmanimData]);

  if (!zmanimData) return null;

  const times = [
    zmanimData.times.alotHaShachar,
    zmanimData.times.misheyakir,
    zmanimData.times.sunrise,
    zmanimData.times.sofZmanShma,
    zmanimData.times.sofZmanTfilla,
    zmanimData.times.chatzot,
    zmanimData.times.minchaGedola,
    zmanimData.times.minchaKetana,
    zmanimData.times.sunset,
    zmanimData.times.tzeit,
  ].filter(t => t?.time);

  return (
    <div className="content">
      <div className="zmanim-container" ref={scrollRef}>
        <h1>ZMANIM</h1>
        <p className="location">{zmanimData.location.city}, {zmanimData.location.country}</p>
        {times.map((t, i) => (
          <div key={i} className="zman-item">
            <span className="zman-name">{t.name}</span>
            <strong className="zman-time">{t.time}</strong>
            <small className="zman-hebrew">{t.hebrew}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentCard;
