import React, { useEffect, useRef } from 'react';
import './ContentCard.css';

/**
 * ContentCard - Static overlay with two vertically stacked auto-scroll sections
 */
const ContentCard = ({ items }) => {
  const topScrollRef = useRef(null);
  const bottomScrollRef = useRef(null);

  // Split items into two halves
  const midpoint = Math.ceil(items.length / 2);
  const topItems = items.slice(0, midpoint);
  const bottomItems = items.slice(midpoint);

  // Auto-scroll for top section
  useEffect(() => {
    const element = topScrollRef.current;
    if (!element) return;
    let position = 0;
    const intervalId = setInterval(() => {
      position += 0.5;
      if (position >= element.scrollHeight - element.clientHeight) position = 0;
      element.scrollTop = position;
    }, 30);
    return () => clearInterval(intervalId);
  }, []);

  // Auto-scroll for bottom section
  useEffect(() => {
    const element = bottomScrollRef.current;
    if (!element) return;
    let position = 0;
    const intervalId = setInterval(() => {
      position += 0.5;
      if (position >= element.scrollHeight - element.clientHeight) position = 0;
      element.scrollTop = position;
    }, 30);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="content">
      <div className="top" ref={topScrollRef}>
        {topItems.map((item, i) => (
          <div key={i}>
            <h2>{item.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: item.html }} />
          </div>
        ))}
      </div>

      <div className="bottom" ref={bottomScrollRef}>
        {bottomItems.map((item, i) => (
          <div key={i}>
            <h2>{item.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: item.html }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentCard;
