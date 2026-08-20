import React from 'react';

const PrincipleDetails = ({ principle, language, onClose }) => {
  const getTranslation = (key) => {
    const translations = {
      detailsTitle: { en: '📖 Detailed Explanation', fr: '📖 Explication Détaillée', ar: '📖 شرح مفصل' },
      examplesTitle: { en: '💡 Practical Examples', fr: '💡 Exemples Pratiques', ar: '💡 أمثلة عملية' },
      benefitsTitle: { en: '🎯 Benefits', fr: '🎯 Avantages', ar: '🎯 الفوائد' },
      close: { en: 'Close', fr: 'Fermer', ar: 'إغلاق' },
      visualGuide: { en: '🖼️ Visual Guide', fr: '🖼️ Guide Visuel', ar: '🖼️ دليل بصري' }
    };
    return translations[key]?.[language] || translations[key]?.en || key;
  };

  const getImageUrl = (id) => {
    const images = {
      seiri: 'https://www.learnleansigma.com/wp-content/uploads/2023/05/Visual-3-%E2%80%94-Sort-and-red-tag-decisions.png',
      seiton: 'https://www.learnleansigma.com/wp-content/uploads/2023/05/Visual-4-%E2%80%94-Set-in-Order-around-the-work.png',
      seiso: 'https://www.learnleansigma.com/wp-content/uploads/2023/05/Visual-5-%E2%80%94-Shine-as-cleaning-and-inspection.png',
      seiketsu: 'https://www.learnleansigma.com/wp-content/uploads/2023/05/Visual-6-%E2%80%94-Building-the-visible-normal-condition.png',
      shitsuke: 'https://www.learnleansigma.com/wp-content/uploads/2023/05/Visual-7-%E2%80%94-Sustain-through-daily-management.png'
    };
    return images[id] || null;
  };

  const imageUrl = getImageUrl(principle.id);

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
        gridTemplateColumns: '1fr 1fr',
        gap: '24px'
      }}>
        {/* Left Column - Details and Examples */}
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
            border: '1px solid #e2e8f0',
            marginBottom: '15px'
          }}>
            {principle.details[language]}
          </p>

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

          <div style={{
            fontWeight: '600',
            color: '#2193b0',
            marginBottom: '10px',
            fontSize: '15px',
            marginTop: '15px'
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

        {/* Right Column - Visual Guide Image */}
        <div>
          <div style={{
            fontWeight: '600',
            color: '#2193b0',
            marginBottom: '10px',
            fontSize: '15px'
          }}>
            {getTranslation('visualGuide')}
          </div>
          <div style={{
            backgroundColor: 'white',
            padding: '12px',
            borderRadius: '10px',
            border: '1px solid #e2e8f0',
            minHeight: '250px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {imageUrl ? (
              <img 
                src={imageUrl} 
                alt={principle.name[language]}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '350px',
                  objectFit: 'contain',
                  borderRadius: '8px'
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = `
                    <div style="text-align:center;padding:20px;color:#94a3b8;">
                      <div style="font-size:48px;margin-bottom:10px;">${principle.emoji}</div>
                      <p style="font-size:14px;">Visual guide illustration</p>
                      <p style="font-size:12px;">${principle.name[language]}</p>
                    </div>
                  `;
                }}
              />
            ) : (
              <div style={{ textAlign: 'center', padding: '20px', color: '#94a3b8' }}>
                <div style={{ fontSize: '48px', marginBottom: '10px' }}>{principle.emoji}</div>
                <p style={{ fontSize: '14px' }}>Visual guide illustration</p>
                <p style={{ fontSize: '12px' }}>{principle.name[language]}</p>
              </div>
            )}
          </div>
          <div style={{
            marginTop: '10px',
            fontSize: '12px',
            color: '#94a3b8',
            textAlign: 'center',
            fontStyle: 'italic'
          }}>
            Source: learnleansigma.com
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .details-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PrincipleDetails;
