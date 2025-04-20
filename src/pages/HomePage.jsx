import React from 'react';
import InstallPrompt from '../components/InstallPrompt';
import styles from './HomePage.module.css';

function HomePage() {
  return (
    <section className={styles.container}>
      <div className={styles.hero}>
        <h1>Welcome to PWA Demo</h1>
        <p>This is a simple Progressive Web App demonstration</p>
        <InstallPrompt />
      </div>
      
      <div className={styles.features}>
        <div className={styles.feature}>
          <h2>Offline Access</h2>
          <p>This page and the About page are cached for offline use</p>
        </div>
        <div className={styles.feature}>
          <h2>Installable</h2>
          <p>You can install this app on your device</p>
        </div>
        <div className={styles.feature}>
          <h2>Responsive</h2>
          <p>Works on all devices and screen sizes</p>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
