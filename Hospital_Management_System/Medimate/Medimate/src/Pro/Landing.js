import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Landing.module.css';

export default function Landing() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Our Website</h1>
      <p className={styles.description}>Explore our features and services.</p>
      <button className={styles.getStartedButton} onClick={handleGetStarted}>
        Get Started
      </button>
    </div>
  );
}
