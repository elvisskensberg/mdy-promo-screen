import React from 'react';
import './SponsorBar.css';

/**
 * SponsorBar - Horizontal scrolling sponsor text at bottom
 */
const SponsorBar = ({ items }) => {
  // Create sponsor segments with styled titles and spacing
  const renderSponsors = () => {
    return items.map((item, index) => {
      // Extract text from HTML (remove tags)
      const text = item.html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
      return (
        <span key={index} className="sponsor-item">
          <span className="sponsor-title">{item.title}</span>
          <span className="sponsor-text">: {text}</span>
        </span>
      );
    });
  };

  return (
    <div className="sponsor-bar">
      <div className="sponsor-scroll">
        <div className="sponsor-content">
          {renderSponsors()}
        </div>
        <div className="sponsor-content">
          {renderSponsors()}
        </div>
      </div>
    </div>
  );
};

export default SponsorBar;
