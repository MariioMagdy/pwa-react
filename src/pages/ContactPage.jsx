import React, { useState, useEffect, useRef } from 'react';
import InstallPrompt from '../components/InstallPrompt';
import styles from './ContactPage.module.css';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState(null);
  const nameInputRef = useRef(null);
  
  // Auto-focus the name input when component mounts
  useEffect(() => {
    if (nameInputRef.current) {
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 1000);
    }
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, you would send this data to a server
    console.log('Form submitted:', formData);
    
    // Show success message
    setFormStatus('success');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      message: ''
    });
    
    // Clear success message after 5 seconds
    setTimeout(() => {
      setFormStatus(null);
    }, 5000);
  };
  
  return (
    <section className={styles.contact}>
      <h1>Contact Us</h1>
      <p>This page is NOT cached by the service worker and will NOT be available offline.</p>
      
      <InstallPrompt />
      
      <div className={styles.contactForm}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              ref={nameInputRef}
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          
          <button type="submit">Send Message</button>
        </form>
        
        {formStatus === 'success' && (
          <div className={styles.success}>
            Message sent successfully! We will get back to you soon.
          </div>
        )}
      </div>
    </section>
  );
}

export default ContactPage;
