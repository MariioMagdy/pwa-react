// src/pages/OfflineFallback.js
import React from 'react';
import { Link } from 'react-router-dom';

function OfflineFallback() {
  return (
    <div className="offline-fallback">
      <div className="offline-icon">📶</div>
      <h1>You're Offline</h1>
      <p>The page you're trying to access isn't available offline.</p>
      <p>You can still access these pages while offline:</p>
      <div className="offline-links">
        <Link to="/" className="offline-link">Home</Link>
        <Link to="/about" className="offline-link">About</Link>
      </div>
    </div>
  );
}

export default OfflineFallback;