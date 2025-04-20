// src/components/OfflineIndicator.js
import React, { useState, useEffect } from "react";
// import "./OfflineIndicator.css";

function OfflineIndicator() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="offline-indicator">
      You are offline. Some features may not be available.
    </div>
  );
}

export default OfflineIndicator;
