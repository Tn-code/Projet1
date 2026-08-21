import React, { useState } from 'react';
import { FORMATION_DATA } from '../data/formationData';

const Formation5S = ({ language }) => {
  const [activeFormation, setActiveFormation] = useState('entreprise');
  const [expandedLevel, setExpandedLevel] = useState(null);
  const [trainingStarted, setTrainingStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  const getTranslation = (key) => {
    const translations = {
      title: { en: '📚 5S Training', fr: '📚 Formation 5S', ar: '📚 تدريب 5S' },
      subtitle: { en: 'Complete 5S Training for Operators - 30 minutes', fr: 'Formation complète 5S pour Opérateurs - 30 minutes', ar: 'تدريب كامل 5S للمشغلين - 30 دقيقة' },
      enterprise: { en: '🏢 Enterprise 5S', fr: '🏢 5S Entreprise', ar: '🏢 5S المؤسسة' },
      poste: { en: '🔧 Poste 5S', fr: '🔧 5S Poste de Travail', ar: '🔧 5S محطة العمل' },
      duration: { en: 'Duration', fr: 'Durée', ar: 'المدة' },
      startTraining: { en: '▶️ Start Training', fr: '▶️ Commencer la Formation', ar: '▶️ بدء التدريب' },
      continueTraining: { en: 'Continue Training', fr: 'Continuer la Formation', ar: 'مواصلة التدريب' },
      completed: { en: '✅ Completed', fr: '✅ Complété', ar: '✅ مكتمل' },
      inProgress: { en: '🔄 In Progress', fr: '🔄 En Cours', ar: '🔄 قيد التقدم' },
      notStarted: { en: '📝 Not Started', fr: '📝 Non Commencé', ar: '📝 لم يبدأ' },
      backToLevels: { en: '◀️ Back to Levels', fr: '◀️ Retour aux Niveaux', ar: '◀️ العودة إلى المستويات' },
      nextStep: { en: 'Next Step →', fr: 'Étape Suivante →', ar: '→ الخطوة التالية' },
      prevStep: { en: '← Previous Step', fr: '← Étape Précédente', ar: '← الخطوة السابقة' },
      completeTraining: { en: '🎉 Complete Training', fr: '🎉 Terminer la Formation', ar: '🎉 إكمال التدريب' }
    };
    return translations[key]?.[language] || translations[key]?.en || key;
  };

  const formation = FORMATION_DATA[activeFormation];
  const levels = formation?.levels || [];
  const currentLevel = levels[0]; // Only one level per formation for now

  const startTraining = () => {
    setTrainingStarted(true);
    setCurrentStep(0);
    setCompletedSteps([]);
  };

  const handleStepComplete = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Training complete
      setTrainingStarted(false);
      setExpandedLevel(null);
    }
  };

  const renderTrainingContent = () => {
    if (!currentLevel) return null;

    const steps = [
      { id: 'intro', label: 'Introduction' },
      { id: 'seiri', label: 'Seiri (Sort)' },
      { id: 'seiton', label: 'Seiton (Set in Order)' },
      { id: 'seiso', label: 'Seiso (Shine)' },
      { id: 'seiketsu', label: 'Seiketsu (Standardize)' },
      { id: 'shitsuke', label: 'Shitsuke (Sustain)' }
    ];

    const isComplete = completedSteps.length === 5;

    return (
      <div style={{
        padding: '20px',
        backgroundColor: '#f8fafc',
        borderRadius: '12px',
        border: '2px solid #667eea'
      }}>
        {/* Progress Bar */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '12px',
            color: '#5a6a7a',
            marginBottom: '5px'
          }}>
            <span>Progress</span>
            <span>{Math.round((completedSteps.length / 5) * 100)}%</span>
          </div>
          <div style={{
            width: '100%',
            height: '8px',
            backgroundColor: '#e2e8f0',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${(completedSteps.length / 5) * 100}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #667eea, #764ba2)',
              transition: 'width 0.5s ease'
            }} />
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '5px',
            fontSize: '10px',
            color: '#94a3b8'
          }}>
            {steps.map((step, index) => (
              <span key={step.id} style={{
                color: completedSteps.includes(index) ? '#22c55e' : '#94a3b8',
                fontWeight: completedSteps.includes(index) ? '600' : '400'
              }}>
                {completedSteps.includes(index) ? '✅' : '○'}
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div dangerouslySetInnerHTML={{ __html: currentLevel.content[language] }} />

        {/* Navigation */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '20px',
          gap: '10px',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => {
              setTrainingStarted(false);
              setCurrentStep(0);
              setCompletedSteps([]);
            }}
            style={{
              padding: '10px 20px',
              backgroundColor: '#e2e8f0',
              color: '#475569',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            {getTranslation('backToLevels')}
          </button>
          
          {isComplete ? (
            <button
              onClick={() => {
                setTrainingStarted(false);
                setCurrentStep(0);
                setCompletedSteps([]);
                setExpandedLevel(null);
              }}
              style={{
                padding: '12px 30px',
                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              🎉 {getTranslation('completeTraining')}
            </button>
          ) : (
            <button
              onClick={handleStepComplete}
              style={{
                padding: '12px 30px',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              {currentStep < 4 ? getTranslation('nextStep') : getTranslation('completeTraining')}
            </button>
          )}
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
            setTrainingStarted(false);
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
        >
          {getTranslation('enterprise')}
        </button>
        <button
          onClick={() => {
            setActiveFormation('poste');
            setTrainingStarted(false);
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
        >
          {getTranslation('poste')}
        </button>
      </div>

      {/* Training Content */}
      {trainingStarted ? (
        renderTrainingContent()
      ) : (
        <div>
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
              {getTranslation('duration')}: {levels[0]?.duration[language] || '30 minutes'}
            </p>
          </div>

          {/* Level Card */}
          {levels.map((level, index) => (
            <div
              key={level.id}
              style={{
                border: '2px solid #667eea',
                borderRadius: '12px',
                overflow: 'hidden',
                transition: 'all 0.3s',
                animation: `fadeInUp 0.3s ease ${index * 0.1}s both`
              }}
            >
              <div
                style={{
                  padding: '20px 25px',
                  backgroundColor: '#f0f4ff',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '10px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px',
                    backgroundColor: '#667eea',
                    color: 'white',
                    borderRadius: '50%',
                    fontSize: '16px',
                    fontWeight: '700'
                  }}>
                    {index + 1}
                  </span>
                  <div>
                    <div style={{ fontWeight: '600', color: '#1a2a3a', fontSize: '16px' }}>
                      {level.name[language]}
                    </div>
                    <div style={{ fontSize: '13px', color: '#5a6a7a' }}>
                      ⏱️ {level.duration[language]}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => startTraining()}
                  style={{
                    padding: '10px 24px',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '600',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.boxShadow = '0 4px 15px rgba(102,126,234,0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  {getTranslation('startTraining')}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

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
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
};

export default Formation5S;
