import React from 'react';

const Certificate = ({ user, score, onClose, language }) => {
  const getTranslation = (key) => {
    const translations = {
      title: { en: '🏆 Certificate of Completion', fr: '🏆 Certificat de Réussite', ar: '🏆 شهادة الإنجاز' },
      certifies: { en: 'This certifies that', fr: 'Ce certifie que', ar: 'تشهد هذه الشهادة بأن' },
      completed: { en: 'has successfully completed the 5S Methodology training', fr: 'a réussi la formation en méthodologie 5S', ar: 'أكمل بنجاح التدريب على منهجية 5S' },
      score: { en: 'Total Score', fr: 'Score Total', ar: 'إجمالي النقاط' },
      points: { en: 'points', fr: 'points', ar: 'نقاط' },
      continue: { en: 'Continue Learning', fr: 'Continuer à Apprendre', ar: 'مواصلة التعلم' },
      principles: { en: 'All 5 principles completed!', fr: 'Les 5 principes complétés!', ar: 'جميع المبادئ الخمسة مكتملة!' }
    };
    return translations[key]?.[language] || translations[key]?.en || key;
  };

  const handleClose = () => {
    // Call the onClose callback to close the certificate
    if (onClose) {
      onClose();
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      padding: '20px',
      backdropFilter: 'blur(4px)',
      animation: 'fadeIn 0.3s ease'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '24px',
        maxWidth: '550px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 25px 80px rgba(0,0,0,0.3)',
        animation: 'slideUp 0.5s ease',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative border */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '6px',
          background: 'linear-gradient(90deg, #667eea, #764ba2, #22c55e, #f59e0b)'
        }} />
        
        {/* Close button (X) */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '20px',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#94a3b8',
            transition: 'color 0.2s, transform 0.2s',
            padding: '5px',
            zIndex: 10
          }}
          onMouseEnter={(e) => {
            e.target.style.color = '#dc2626';
            e.target.style.transform = 'scale(1.2)';
          }}
          onMouseLeave={(e) => {
            e.target.style.color = '#94a3b8';
            e.target.style.transform = 'scale(1)';
          }}
        >
          ✕
        </button>

        <div style={{ fontSize: '72px', margin: '20px 0 10px' }}>🏆</div>
        <h2 style={{ 
          fontSize: '28px', 
          fontWeight: '700', 
          color: '#1a2a3a', 
          margin: '10px 0',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          {getTranslation('title')}
        </h2>
        
        <div style={{ margin: '20px 0' }}>
          <p style={{ color: '#5a6a7a', fontSize: '16px' }}>
            {getTranslation('certifies')}
          </p>
          <h3 style={{ 
            fontSize: '24px', 
            fontWeight: '600', 
            color: '#1a2a3a',
            margin: '8px 0'
          }}>
            {user?.displayName || user?.email?.split('@')[0] || 'User'}
          </h3>
          <p style={{ color: '#5a6a7a', fontSize: '14px', lineHeight: '1.6' }}>
            {getTranslation('completed')}
          </p>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '30px',
          margin: '20px 0',
          padding: '15px',
          backgroundColor: '#f8fafc',
          borderRadius: '12px'
        }}>
          <div>
            <div style={{ fontSize: '12px', color: '#5a6a7a' }}>{getTranslation('score')}</div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#667eea' }}>
              {score} {getTranslation('points')}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#5a6a7a' }}>{getTranslation('principles')}</div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#22c55e' }}>
              ✅ 5/5
            </div>
          </div>
        </div>

        <button
          onClick={handleClose}
          style={{
            padding: '14px 40px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            transition: 'all 0.3s',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
            marginTop: '10px',
            width: '100%'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
          }}
        >
          {getTranslation('continue')}
        </button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default Certificate;
