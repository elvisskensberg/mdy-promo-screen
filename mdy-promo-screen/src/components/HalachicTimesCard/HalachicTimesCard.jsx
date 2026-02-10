import React, { useState, useEffect } from 'react';
import './HalachicTimesCard.css';

/**
 * HalachicTimesCard - Displays today's halachic times for Bet Shemesh
 * Loads data from pre-fetched JSON files in /assets/zmanim/
 *
 * @returns {JSX.Element}
 */
const HalachicTimesCard = () => {
  const [zmanimData, setZmanimData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTodayZmanim = async () => {
      try {
        // Get today's date in YYYY-MM-DD format
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const dateStr = `${year}-${month}-${day}`;

        // Fetch the JSON file for today
        const response = await fetch(`/assets/zmanim/${dateStr}.json`);

        if (!response.ok) {
          throw new Error(`Failed to load zmanim data for ${dateStr}`);
        }

        const data = await response.json();
        setZmanimData(data);
        setLoading(false);
      } catch (err) {
        console.error('Error loading zmanim:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    loadTodayZmanim();
  }, []);

  // Show loading state
  if (loading) {
    return (
      <div className="halachic-times-card">
        <div className="halachic-times-header">
          <div className="halachic-times-title">Zmanim</div>
          <div className="halachic-times-date">Loading...</div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error || !zmanimData) {
    return (
      <div className="halachic-times-card">
        <div className="halachic-times-header">
          <div className="halachic-times-title">Zmanim</div>
          <div className="halachic-times-date">Data unavailable</div>
        </div>
      </div>
    );
  }

  // Prepare times array from loaded data
  const times = zmanimData.times;
  const timesArray = [
    times.alotHaShachar,
    times.misheyakir,
    times.sunrise,
    times.sofZmanShma,
    times.sofZmanShmaGRA,
    times.sofZmanTfilla,
    times.chatzot,
    times.minchaGedola,
    times.minchaKetana,
    times.plagHamincha,
    times.sunset,
    times.tzeit
  ].filter(time => time && time.time); // Filter out null/missing times

  return (
    <div className="halachic-times-card">
      <div className="halachic-times-header">
        <div className="halachic-times-title">Zmanim</div>
        <div className="halachic-times-date">{zmanimData.gregorianDate}</div>
        {zmanimData.hebrewDate && (
          <div className="halachic-times-hebrew-date">{zmanimData.hebrewDate}</div>
        )}
        <div className="halachic-times-location">
          {zmanimData.location.city}, {zmanimData.location.country}
        </div>
      </div>
      <div className="halachic-times-list">
        {timesArray.map((time, index) => (
          <div key={index} className="halachic-time-item">
            <div className="halachic-time-info">
              <span className="halachic-time-name">{time.name}</span>
              <span className="halachic-time-hebrew">{time.hebrew}</span>
            </div>
            <span className="halachic-time-value">{time.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HalachicTimesCard;
