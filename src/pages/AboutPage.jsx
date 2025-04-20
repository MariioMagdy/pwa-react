import React from 'react';
import styles from './AboutPage.module.css';

function AboutPage() {
  return (
    <section className={styles.about}>
      <h1>About This PWA</h1>
      <p>This is a simple Progressive Web App (PWA) demonstration with three pages.</p>
      <p>This page is cached by the service worker and will be available offline.</p>
      
      <div className={styles.pwaInfo}>
        <h2>What is a PWA?</h2>
        <p>Progressive Web Apps (PWAs) are web applications that provide a native app-like experience to users. They work offline, can be installed on devices, and offer features like push notifications.</p>
        
        <h2>Key Features of PWAs</h2>
        <ul>
          <li>Offline functionality</li>
          <li>Installable on home screen</li>
          <li>Fast loading times</li>
          <li>Responsive design</li>
          <li>App-like experience</li>
        </ul>
      </div>
    </section>
  );
}

export default AboutPage;
