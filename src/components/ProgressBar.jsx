import React from 'react';

const ProgressBar = ({ progress }) => {
  return (
    <div style={{
      width: '100%',
      height: '8px',
      backgroundColor: '#e2e8f0',
      borderRadius: '4px',
      overflow: 'hidden',
      margin: '10px 0'
    }}>
      <div style={{
        width: `${progress}%`,
        height: '100%',
        background: 'linear-gradient(90deg, #2193b0, #6dd5ed, #22c55e)',
        transition: 'width 0.8s ease',
        borderRadius: '4px'
      }} />
    </div>
  );
};

export default ProgressBar;
