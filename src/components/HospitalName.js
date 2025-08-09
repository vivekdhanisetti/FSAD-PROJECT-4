import React from 'react';

const HospitalName = () => {
  const styles = {
    header: {
      padding: '0.5rem',
      textAlign: 'center',
      position: 'relative',
      minWidth: 'fit-content',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '20px'
    },
    logo: {
      width: '60px',
      height: '60px',
      objectFit: 'contain',
      borderRadius: '50%',
      boxShadow: '0 2px 10px rgba(255, 215, 0, 0.2)'
    },
    title: {
      position: 'relative',
      display: 'inline-block',
      color:  '#ffd700', // Gold color
      fontSize: '2.2rem',
      fontWeight: 'bold',
      margin: 0,
      padding: '0 1rem',
      whiteSpace: 'nowrap',
    },
    underline: {
      content: '""',
      display: 'block',
      width: '100%',
      height: '3px',
      background: 'linear-gradient(90deg, #ffd700, #ff8c00, #ffd700)',
      backgroundSize: '200% 100%',
      position: 'absolute',
      bottom: '-8px',
      left: 0,
      animation: 'shimmer 3s infinite linear'
    }
  };

  return (
    <header style={styles.header}>
      <img src="/images/logo.jpg" alt="Hospital Logo" style={styles.logo} />
      <h1 style={styles.title}>
          Good-Cure Hospital
        <span style={styles.underline}></span>
      </h1>
      <style>
        {`
          @keyframes shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}
      </style>
    </header>
  );
};

export default HospitalName; 