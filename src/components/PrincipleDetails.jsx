import React from 'react';

const PrincipleDetails = ({ principle, language, onClose }) => {
  const getTranslation = (key) => {
    const translations = {
      detailsTitle: { en: '📖 Detailed Explanation', fr: '📖 Explication Détaillée', ar: '📖 شرح مفصل' },
      examplesTitle: { en: '💡 Practical Examples', fr: '💡 Exemples Pratiques', ar: '💡 أمثلة عملية' },
      benefitsTitle: { en: '🎯 Benefits', fr: '🎯 Avantages', ar: '🎯 الفوائد' },
      close: { en: 'Close', fr: 'Fermer', ar: 'إغلاق' }
    };
    return translations[key]?.[language] || translations[key]?.en || key;
  };

  return (
    <div style={{
      marginTop: '25px',
      padding: '25px',
      backgroundColor: '#f8fafc',
      borderRadius: '16px',
      border: '2px solid #e2e8f0',
      animation: 'slideUp 0.4s ease'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '32px' }}>{principle.emoji}</span>
          <h4 style={{ fontSize: '20px', color: '#1a2a3a' }}>
            {principle.name[language]}
          </h4>
        </div>
        <button
          onClick={onClose}
          style={{
            padding: '6px 16px',
            backgroundColor: '#e2e8f0',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            color: '#475569',
            fontWeight: '500'
          }}
        >
          ✕ {getTranslation('close')}
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px'
      }}>
        <div>
          <div style={{
            fontWeight: '600',
            color: '#2193b0',
            marginBottom: '10px',
            fontSize: '15px'
          }}>
            {getTranslation('detailsTitle')}
          </div>
          <p style={{
            color: '#334155',
            fontSize: '14px',
            lineHeight: '1.8',
            backgroundColor: 'white',
            padding: '16px',
            borderRadius: '10px',
            border: '1px solid #e2e8f0'
          }}>
            {principle.details[language]}
          </p>
        </div>

        <div>
          <div style={{
            fontWeight: '600',
            color: '#2193b0',
            marginBottom: '10px',
            fontSize: '15px'
          }}>
            {getTranslation('examplesTitle')}
          </div>
          <div style={{
            backgroundColor: 'white',
            padding: '16px',
            borderRadius: '10px',
            border: '1px solid #e2e8f0'
          }}>
            {principle.examples[language].map((example, i) => (
              <div key={i} style={{
                padding: '6px 0',
                fontSize: '13px',
                color: '#334155',
                borderBottom: i < principle.examples[language].length - 1 ? '1px solid #f1f5f9' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span style={{ color: '#2193b0' }}>•</span>
                {example}
              </div>
            ))}
          </div>
        </div>

        <div>
          <div style={{
            fontWeight: '600',
            color: '#2193b0',
            marginBottom: '10px',
            fontSize: '15px'
          }}>
            {getTranslation('benefitsTitle')}
          </div>
          <div style={{
            backgroundColor: 'white',
            padding: '16px',
            borderRadius: '10px',
            border: '1px solid #e2e8f0'
          }}>
            {principle.benefits[language].map((benefit, i) => (
              <div key={i} style={{
                padding: '6px 0',
                fontSize: '13px',
                color: '#334155',
                borderBottom: i < principle.benefits[language].length - 1 ? '1px solid #f1f5f9' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span style={{ color: '#22c55e' }}>✅</span>
                {benefit}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default PrincipleDetails;
