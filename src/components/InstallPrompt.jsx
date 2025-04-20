import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './InstallPrompt.module.css';

function InstallPrompt() {
  const location = useLocation();
  const isContactPage = location.pathname === '/contact';
  const installButtonRef = useRef(null);
  
  // Store the beforeinstallprompt event
  const deferredPromptRef = useRef(null);
  
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Store the event for later use
      deferredPromptRef.current = e;
      
      // Only show the install button on non-contact pages
      if (!isContactPage && installButtonRef.current) {
        installButtonRef.current.classList.remove(styles.hidden);
      }
    };
    
    // Add event listener for beforeinstallprompt
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    return () => {
      // Clean up event listener
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, [isContactPage]);
  
  const showInstallPrompt = () => {
    if (!deferredPromptRef.current) return;
    
    // Show the install prompt
    deferredPromptRef.current.prompt();
    
    // Wait for the user to respond to the prompt
    deferredPromptRef.current.userChoice.then((choiceResult) => {
      console.log(`User response to the install prompt: ${choiceResult.outcome}`);
      // We've used the prompt, and can't use it again, throw it away
      deferredPromptRef.current = null;
      
      // Hide the install button
      if (installButtonRef.current) {
        installButtonRef.current.classList.add(styles.hidden);
      }
    });
  };
  
  // Only render the button if not on the contact page
  if (isContactPage) {
    return null;
  }
  
  return (
    <button 
      ref={installButtonRef} 
      className={`${styles.installButton} ${styles.hidden}`}
      onClick={showInstallPrompt}
    >
      Install App
    </button>
  );
}

export default InstallPrompt;