import React, { useState, useEffect } from 'react';
import './NetworkStatus.css';

/**
 * NetworkStatus - Shows online/offline indicator
 */
const NetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowNotification(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Only show when offline or when notification is active
  if (!showNotification && isOnline) return null;

  return (
    <div className={`network-status ${isOnline ? 'online' : 'offline'}`}>
      <div className="network-status-content">
        <span className="network-icon">
          {isOnline ? '✓' : '⚠'}
        </span>
        <span className="network-text">
          {isOnline ? 'Back Online' : 'Offline - Using Cached Data'}
        </span>
      </div>
    </div>
  );
};

export default NetworkStatus;
