import React from 'react';

const Footer = ({ language }) => {
  const getTranslation = (key) => {
    const translations = {
      copyright: {
        en: '© 2026 WKW Automotive - Department: Amélioration Contenue WKW Tunisia | All rights reserved',
        fr: '© 2026 WKW Automotive - Département: Amélioration Contenue WKW Tunisie | Tous droits réservés',
        ar: '© 2026 WKW Automotive - القسم: التحسين المستمر WKW تونس | جميع الحقوق محفوظة'
      }
    };
    return translations[key]?.[language] || translations[key]?.en || key;
  };

  return (
    <footer style={{
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      color: '#e2e8f0',
      padding: '20px',
      marginTop: '40px',
      borderRadius: '16px 16px 0 0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated gradient line at top */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, #667eea, #764ba2, #f093fb, #f5576c)',
        backgroundSize: '300% 100%',
        animation: 'gradientShift 4s ease infinite'
      }} />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        flexWrap: 'wrap',
        padding: '10px 0',
        position: 'relative',
        zIndex: 1
      }}>
        {/* WKW Logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px'
        }}>
          <img 
            src="https://www.electrive.com/media/2018/01/wkw-automotive-logo-symbolbild.png"
            alt="WKW Logo"
            style={{
              height: '40px',
              width: 'auto',
              filter: 'brightness(0) invert(1)',
              transition: 'transform 0.3s ease'
            }}
            onError={(e) => {
              // Fallback if image doesn't load
              e.target.style.display = 'none';
              // Show text fallback
              const parent = e.target.parentElement;
              const fallback = document.createElement('span');
              fallback.textContent = 'WKW';
              fallback.style.cssText = 'font-size:24px;font-weight:bold;color:#667eea;';
              parent.appendChild(fallback);
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.1) rotate(-3deg)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1) rotate(0deg)';
            }}
          />
        </div>

        {/* Copyright Text */}
        <div style={{
          textAlign: 'center',
          fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)',
          color: '#94a3b8'
        }}>
          {getTranslation('copyright')}
        </div>
      </div>

      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
