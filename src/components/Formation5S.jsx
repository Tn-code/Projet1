import React, { useState } from 'react';
import { FORMATION_DATA } from '../data/formationData';

const Formation5S = ({ language }) => {
  const [activeFormation, setActiveFormation] = useState('entreprise');
  const [activeLevel, setActiveLevel] = useState(null);
  const [expandedLevel, setExpandedLevel] = useState(null);

  const getTranslation = (key) => {
    const translations = {
      title: { en: '📚 5S Training', fr: '📚 Formation 5S', ar: '📚 تدريب 5S' },
      subtitle: { en: 'Complete 5S Training for Enterprise and Workstation', fr: 'Formation complète 5S pour l\'Entreprise et le Poste de Travail', ar: 'تدريب كامل 5S للمؤسسة ومحطة العمل' },
      enterprise: { en: '🏢 Enterprise 5S', fr: '🏢 5S Entreprise', ar: '🏢 5S المؤسسة' },
      poste: { en: '🔧 Poste 5S', fr: '🔧 5S Poste de Travail', ar: '🔧 5S محطة العمل' },
      levels: { en: 'Training Levels', fr: 'Niveaux de Formation', ar: 'مستويات التدريب' },
      duration: { en: 'Duration', fr: 'Durée', ar: 'المدة' },
      startTraining: { en: 'Start Training', fr: 'Commencer la Formation', ar: 'بدء التدريب' },
      backToLevels: { en: 'Back to Levels', fr: 'Retour aux Niveaux', ar: 'العودة إلى المستويات' },
      completed: { en: '✅ Completed', fr: '✅ Complété', ar: '✅ مكتمل' },
      inProgress: { en: '🔄 In Progress', fr: '🔄 En Cours', ar: '🔄 قيد التقدم' },
      notStarted: { en: '📝 Not Started', fr: '📝 Non Commencé', ar: '📝 لم يبدأ' }
    };
    return translations[key]?.[language] || translations[key]?.en || key;
  };

  const formation = FORMATION_DATA[activeFormation];
  const levels = formation?.levels || [];

  const handleLevelClick = (levelId) => {
    if (expandedLevel === levelId) {
      setExpandedLevel(null);
    } else {
      setExpandedLevel(levelId);
    }
  };

  const renderLevelContent = (level) => {
    return (
      <div style={{
        marginTop: '15px',
        padding: '20px',
        backgroundColor: '#f8fafc',
        borderRadius: '12px',
        border: '1px solid #e2e8f0'
      }}>
        <div dangerouslySetInnerHTML={{ __html: level.content[language] }} />
        <div style={{
          marginTop: '15px',
          padding: '12px',
          backgroundColor: '#e0f2fe',
          borderRadius: '8px',
          fontSize: '14px',
          color: '#1e40af'
        }}>
          ⏱️ {getTranslation('duration')}: {level.duration[language]}
        </div>
      </div>
    );
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '25px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
      marginBottom: '20px'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '15px'
      }}>
        <div>
          <h2 style={{ 
            fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', 
            color: '#1a2a3a' 
          }}>
            {getTranslation('title')}
          </h2>
          <p style={{ fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)', color: '#5a6a7a' }}>
            {getTranslation('subtitle')}
          </p>
        </div>
      </div>

      {/* Formation Type Selector */}
      <div style={{
        display: 'flex',
        gap: '12px',
        marginBottom: '25px',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => {
            setActiveFormation('entreprise');
            setExpandedLevel(null);
          }}
          style={{
            padding: '12px 24px',
            backgroundColor: activeFormation === 'entreprise' ? '#667eea' : '#f8fafc',
            color: activeFormation === 'entreprise' ? 'white' : '#1a2a3a',
            border: activeFormation === 'entreprise' ? '2px solid #667eea' : '2px solid #e2e8f0',
            borderRadius: '12px',
            cursor: 'pointer',
            fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
            fontWeight: '600',
            transition: 'all 0.3s',
            flex: '1',
            minWidth: '150px'
          }}
          onMouseEnter={(e) => {
            if (activeFormation !== 'entreprise') {
              e.target.style.backgroundColor = '#f1f5f9';
            }
          }}
          onMouseLeave={(e) => {
            if (activeFormation !== 'entreprise') {
              e.target.style.backgroundColor = '#f8fafc';
            }
          }}
        >
          {getTranslation('enterprise')}
        </button>
        <button
          onClick={() => {
            setActiveFormation('poste');
            setExpandedLevel(null);
          }}
          style={{
            padding: '12px 24px',
            backgroundColor: activeFormation === 'poste' ? '#667eea' : '#f8fafc',
            color: activeFormation === 'poste' ? 'white' : '#1a2a3a',
            border: activeFormation === 'poste' ? '2px solid #667eea' : '2px solid #e2e8f0',
            borderRadius: '12px',
            cursor: 'pointer',
            fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
            fontWeight: '600',
            transition: 'all 0.3s',
            flex: '1',
            minWidth: '150px'
          }}
          onMouseEnter={(e) => {
            if (activeFormation !== 'poste') {
              e.target.style.backgroundColor = '#f1f5f9';
            }
          }}
          onMouseLeave={(e) => {
            if (activeFormation !== 'poste') {
              e.target.style.backgroundColor = '#f8fafc';
            }
          }}
        >
          {getTranslation('poste')}
        </button>
      </div>

      {/* Formation Name */}
      <div style={{
        marginBottom: '20px',
        padding: '15px 20px',
        backgroundColor: '#f0f4ff',
        borderRadius: '12px',
        border: '1px solid #dbeafe'
      }}>
        <h3 style={{ 
          fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', 
          color: '#1a2a3a' 
        }}>
          {formation.name[language]}
        </h3>
        <p style={{ fontSize: 'clamp(0.8rem, 1.2vw, 0.9rem)', color: '#5a6a7a' }}>
          {getTranslation('levels')}: {levels.length}
        </p>
      </div>

      {/* Levels List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {levels.map((level, index) => (
          <div
            key={level.id}
            style={{
              border: expandedLevel === level.id ? '2px solid #667eea' : '1px solid #e2e8f0',
              borderRadius: '12px',
              overflow: 'hidden',
              transition: 'all 0.3s',
              animation: `fadeInUp 0.3s ease ${index * 0.1}s both`
            }}
          >
            <div
              onClick={() => handleLevelClick(level.id)}
              style={{
                padding: '16px 20px',
                backgroundColor: expandedLevel === level.id ? '#f0f4ff' : 'white',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'all 0.2s',
                flexWrap: 'wrap',
                gap: '10px'
              }}
              onMouseEnter={(e) => {
                if (expandedLevel !== level.id) {
                  e.currentTarget.style.backgroundColor = '#f8fafc';
                }
              }}
              onMouseLeave={(e) => {
                if (expandedLevel !== level.id) {
                  e.currentTarget.style.backgroundColor = 'white';
                }
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '30px',
                  height: '30px',
                  backgroundColor: '#667eea',
                  color: 'white',
                  borderRadius: '50%',
                  fontSize: '14px',
                  fontWeight: '700'
                }}>
                  {index + 1}
                </span>
                <div>
                  <div style={{ fontWeight: '600', color: '#1a2a3a' }}>
                    {level.name[language]}
                  </div>
                  <div style={{ fontSize: '12px', color: '#5a6a7a' }}>
                    ⏱️ {level.duration[language]}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{
                  fontSize: '12px',
                  color: '#5a6a7a',
                  backgroundColor: '#f1f5f9',
                  padding: '4px 12px',
                  borderRadius: '12px'
                }}>
                  {getTranslation('notStarted')}
                </span>
                <span style={{
                  fontSize: '20px',
                  color: '#94a3b8',
                  transition: 'transform 0.3s',
                  transform: expandedLevel === level.id ? 'rotate(180deg)' : 'rotate(0deg)'
                }}>
                  ▼
                </span>
              </div>
            </div>
            {expandedLevel === level.id && (
              <div style={{
                padding: '20px',
                backgroundColor: '#fafafa',
                borderTop: '1px solid #e2e8f0'
              }}>
                {renderLevelContent(level)}
              </div>
            )}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Formation5S;
