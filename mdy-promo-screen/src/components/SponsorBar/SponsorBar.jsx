import React from 'react';
import './SponsorBar.css';

/**
 * SponsorBar - Horizontal scrolling sponsor text at bottom
 */
const SponsorBar = ({ items }) => {
  // Don't render if no items
  if (!items || items.length === 0) {
    return null;
  }

  // Create sponsor segments with styled titles and spacing
  const renderSponsors = () => {
    return items.map((item, index) => {
      // Extract text from HTML (remove tags) - with defensive checks
      const htmlContent = item.html || item.content || '';
      const text = htmlContent.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
      const title = item.title || item.heading || '';

      // Skip items without content
      if (!title && !text) {
        return null;
      }

      return (
        <span key={index} className="sponsor-item">
          <span className="sponsor-title">{title}</span>
          {text && <span className="sponsor-text">: {text}</span>}
        </span>
      );
    }).filter(Boolean); // Remove null entries
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
