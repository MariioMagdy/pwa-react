import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/HomePage";
import About from "./pages/AboutPage";
import Contact from "./pages/ContactPage";
import OfflineFallback from "./pages/OfflineFallback";
import Navigation from "./components/Navigation";
import OfflineIndicator from "./components/OfflineIndicator";
import InstallPrompt from "./components/InstallPrompt";
import "./App.css";

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <Router>
      <div className="App">
        <OfflineIndicator />
        <Navigation />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/contact"
              element={
                isOnline ? <Contact /> : <Navigate to="/offline" replace />
              }
            />
            <Route path="/offline" element={<OfflineFallback />} />
          </Routes>
        </main>

        <footer>
          <p>&copy; 2025 PWA Demo</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
