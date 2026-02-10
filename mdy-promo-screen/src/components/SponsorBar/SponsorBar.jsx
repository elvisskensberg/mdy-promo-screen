import React from 'react';
import './SponsorBar.css';

/**
 * SponsorBar - Horizontal scrolling sponsor text at bottom
 */
const SponsorBar = ({ items }) => {
  // Create a continuous text string from all sponsors
  const sponsorText = items.map(item => {
    // Extract text from HTML (remove tags)
    const text = item.html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    return `${item.title}: ${text}`;
  }).join(' • ');

  return (
    <div className="sponsor-bar">
      <div className="sponsor-scroll">
        <span>{sponsorText}</span>
        <span>{sponsorText}</span>
      </div>
    </div>
  );
};

export default SponsorBar;
