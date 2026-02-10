import React, { useState, useEffect } from 'react';
import './ContentCard.css';

/**
 * ContentCard - Zmanim display in top left corner
 */
const ContentCard = () => {
  const [zmanimData, setZmanimData] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

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

  // Update current time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

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

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="content">
      <div className="zmanim-container">
        <div className="header-row">
          <h1>ZMANIM</h1>
          <span className="current-time">{formatTime(currentTime)}</span>
        </div>
        {times.map((t, i) => (
          <div key={i} className="zman-item">
            <span className="zman-name">{t.name}</span>
            <strong className="zman-time">{t.time}</strong>
            <small className="zman-hebrew">{t.hebrew}</small>
          </div>
        ))}
        <img src="/images/logo.jpg" alt="MDY Logo" className="zmanim-logo" />
      </div>
    </div>
  );
};

export default ContentCard;
