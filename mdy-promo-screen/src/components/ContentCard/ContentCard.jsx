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

  // Hardcoded English names for zmanim (overriding JSON names)
  const zmanimNames = {
    alotHaShachar: 'Dawn',
    misheyakir: 'Earliest T&T',
    sunrise: 'Sunrise',
    sofZmanShma: 'Latest Shema Gra & BhT',
    sofZmanTfilla: 'Latest Shacharit Gra & BhT',
    chatzot: 'Chatzot',
    minchaGedola: 'Earliest Mincha',
    minchaKetana: 'Mincha Ketana',
    sunset: 'Sunset'
  };

  const times = [
    { ...zmanimData.times.alotHaShachar, name: zmanimNames.alotHaShachar },
    { ...zmanimData.times.misheyakir, name: zmanimNames.misheyakir },
    { ...zmanimData.times.sunrise, name: zmanimNames.sunrise },
    { ...zmanimData.times.sofZmanShma, name: zmanimNames.sofZmanShma },
    { ...zmanimData.times.sofZmanTfilla, name: zmanimNames.sofZmanTfilla },
    { ...zmanimData.times.chatzot, name: zmanimNames.chatzot },
    { ...zmanimData.times.minchaGedola, name: zmanimNames.minchaGedola },
    { ...zmanimData.times.minchaKetana, name: zmanimNames.minchaKetana },
    { ...zmanimData.times.sunset, name: zmanimNames.sunset },
    zmanimData.times.tzeit,
    zmanimData.times.chatzotNight,
  ].filter(t => t?.time);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  /**
   * Get time proximity status for a zman
   * Returns: 'upcoming' (within 15 mins before), 'active' (within 15 mins after), or null
   */
  const getTimeProximity = (zmanTime) => {
    if (!zmanTime) return null;

    try {
      // Parse zman time (format: "HH:MM AM/PM")
      const [time, period] = zmanTime.split(' ');
      const [hours, minutes] = time.split(':').map(Number);

      let hour24 = hours;
      if (period === 'PM' && hours !== 12) hour24 += 12;
      if (period === 'AM' && hours === 12) hour24 = 0;

      const zmanDate = new Date(currentTime);
      zmanDate.setHours(hour24, minutes, 0, 0);

      const diffMinutes = (zmanDate - currentTime) / (1000 * 60);

      // Within 15 minutes before
      if (diffMinutes > 0 && diffMinutes <= 15) return 'upcoming';

      // Within 15 minutes after
      if (diffMinutes < 0 && diffMinutes >= -15) return 'active';

      return null;
    } catch (error) {
      return null;
    }
  };

  return (
    <div className="content">
      <div className="zmanim-container">
        <div className="header-row">
          <h1>ZMANIM</h1>
          <span className="current-time">{formatTime(currentTime)}</span>
        </div>
        {times.map((t, i) => {
          const proximity = getTimeProximity(t.time);
          return (
            <div key={i} className={`zman-item ${proximity || ''}`}>
              <span className="zman-name">{t.name}</span>
              <strong className="zman-time">{t.time}</strong>
              <small className="zman-hebrew">{t.hebrew}</small>
            </div>
          );
        })}
        <div className="logo-wrapper">
          <img src="/images/Logo/MDY Logo transparent .png" alt="MDY Logo" className="zmanim-logo" />
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
