import React, { useState } from 'react';
import { ASSESSMENT_QUESTIONS } from '../data/assessmentQuestions';

const Assessment = ({ language, onClose, user }) => {
  const [currentStep, setCurrentStep] = useState(-1); // -1 for personal info
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    matricule: '',
    answers: {}
  });
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [saving, setSaving] = useState(false);

  const principles = Object.keys(ASSESSMENT_QUESTIONS);
  const currentPrinciple = principles[currentStep];
  const questions = currentPrinciple ? ASSESSMENT_QUESTIONS[currentPrinciple].questions : [];
  const totalSteps = principles.length;

  const getTranslation = (key, data) => {
    if (typeof data === 'object' && data[language]) {
      return data[language];
    }
    return data?.[language] || data?.en || key;
  };

  const translations = {
    title: { en: '📝 5S Assessment Form', fr: '📝 Formulaire d\'Évaluation 5S', ar: '📝 نموذج تقييم 5S' },
    personalInfo: { en: 'Personal Information', fr: 'Informations Personnelles', ar: 'المعلومات الشخصية' },
    firstName: { en: 'First Name', fr: 'Prénom', ar: 'الاسم الأول' },
    lastName: { en: 'Last Name', fr: 'Nom', ar: 'الاسم العائلي' },
    matricule: { en: 'Matricule', fr: 'Matricule', ar: 'الرقم التعريفي' },
    next: { en: 'Next', fr: 'Suivant', ar: 'التالي' },
    previous: { en: 'Previous', fr: 'Précédent', ar: 'السابق' },
    submit: { en: 'Submit Assessment', fr: 'Soumettre l\'Évaluation', ar: 'تقديم التقييم' },
    results: { en: '📊 Assessment Results', fr: '📊 Résultats de l\'Évaluation', ar: '📊 نتائج التقييم' },
    score: { en: 'Score', fr: 'Score', ar: 'النتيجة' },
    correct: { en: 'Correct Answers', fr: 'Réponses Correctes', ar: 'الإجابات الصحيحة' },
    total: { en: 'Total Questions', fr: 'Total des Questions', ar: 'إجمالي الأسئلة' },
    percentage: { en: 'Percentage', fr: 'Pourcentage', ar: 'النسبة المئوية' },
    exportPDF: { en: '📄 Export PDF', fr: '📄 Exporter PDF', ar: '📄 تصدير PDF' },
    close: { en: 'Close', fr: 'Fermer', ar: 'إغلاق' },
    selectOption: { en: 'Please select an option', fr: 'Veuillez sélectionner une option', ar: 'يرجى اختيار خيار' },
    question: { en: 'Question', fr: 'Question', ar: 'سؤال' },
    saving: { en: 'Saving...', fr: 'Sauvegarde...', ar: 'جاري الحفظ...' },
    saved: { en: 'Assessment saved successfully!', fr: 'Évaluation sauvegardée avec succès!', ar: 'تم حفظ التقييم بنجاح!' }
  };

  const t = (key) => translations[key]?.[language] || translations[key]?.en || key;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAnswerSelect = (questionId, optionIndex) => {
    setFormData({
      ...formData,
      answers: {
        ...formData.answers,
        [questionId]: optionIndex
      }
    });
  };

  const handleSubmit = async () => {
    // Calculate score
    let correct = 0;
    let total = 0;
    const results = {};
    
    principles.forEach(p => {
      const questions = ASSESSMENT_QUESTIONS[p].questions;
      let principleCorrect = 0;
      questions.forEach(q => {
        total++;
        if (formData.answers[q.id] === q.correct) {
          correct++;
          principleCorrect++;
        }
      });
      results[p] = { correct: principleCorrect, total: questions.length };
    });
    
    setScore(correct);
    setTotalQuestions(total);
    
    // Save to Firestore
    setSaving(true);
    try {
      const { db } = await import('../firebase/config');
      const { collection, addDoc } = await import('firebase/firestore');
      
      const assessmentData = {
        userId: user?.uid || 'anonymous',
        nom: formData.nom,
        prenom: formData.prenom,
        matricule: formData.matricule,
        score: correct,
        totalQuestions: total,
        answers: formData.answers,
        results: results,
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      };
      
      await addDoc(collection(db, 'assessments'), assessmentData);
      console.log('✅ Assessment saved to Firestore');
      
      // Show success message
      alert(t('saved'));
    } catch (error) {
      console.error('Error saving assessment:', error);
      alert('Error saving assessment: ' + error.message);
    }
    setSaving(false);
    
    setShowResults(true);
  };

  const renderPersonalInfo = () => (
    <div>
      <h3 style={{ fontSize: '18px', color: '#1a2a3a', marginBottom: '20px' }}>
        {t('personalInfo')}
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', fontWeight: '500', marginBottom: '5px', fontSize: '14px' }}>
            {t('firstName')} *
          </label>
          <input
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleInputChange}
            placeholder={t('firstName')}
            style={{
              width: '100%',
              padding: '12px 14px',
              border: '2px solid #e2e8f0',
              borderRadius: '10px',
              fontSize: '15px',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontWeight: '500', marginBottom: '5px', fontSize: '14px' }}>
            {t('lastName')} *
          </label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleInputChange}
            placeholder={t('lastName')}
            style={{
              width: '100%',
              padding: '12px 14px',
              border: '2px solid #e2e8f0',
              borderRadius: '10px',
              fontSize: '15px',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontWeight: '500', marginBottom: '5px', fontSize: '14px' }}>
            {t('matricule')} *
          </label>
          <input
            type="text"
            name="matricule"
            value={formData.matricule}
            onChange={handleInputChange}
            placeholder={t('matricule')}
            style={{
              width: '100%',
              padding: '12px 14px',
              border: '2px solid #e2e8f0',
              borderRadius: '10px',
              fontSize: '15px',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
          />
        </div>
      </div>
    </div>
  );

  const renderQuestions = () => (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h3 style={{ fontSize: '18px', color: '#1a2a3a' }}>
          {getTranslation('name', ASSESSMENT_QUESTIONS[currentPrinciple].name)}
        </h3>
        <span style={{
          fontSize: '13px',
          color: '#5a6a7a',
          backgroundColor: '#f1f5f9',
          padding: '4px 12px',
          borderRadius: '12px'
        }}>
          {currentStep + 1}/{totalSteps}
        </span>
      </div>

      {questions.map((q, index) => (
        <div key={q.id} style={{
          marginBottom: '20px',
          padding: '16px',
          backgroundColor: '#f8fafc',
          borderRadius: '12px',
          border: '1px solid #e2e8f0'
        }}>
          <p style={{
            fontWeight: '600',
            fontSize: '15px',
            color: '#1a2a3a',
            marginBottom: '12px'
          }}>
            {t('question')} {index + 1}: {getTranslation('question', q.question)}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {q.options[language].map((option, optIndex) => (
              <label
                key={optIndex}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 14px',
                  backgroundColor: formData.answers[q.id] === optIndex ? '#e0f2fe' : 'white',
                  borderRadius: '8px',
                  border: formData.answers[q.id] === optIndex ? '2px solid #667eea' : '1px solid #e2e8f0',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <input
                  type="radio"
                  name={q.id}
                  checked={formData.answers[q.id] === optIndex}
                  onChange={() => handleAnswerSelect(q.id, optIndex)}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <span style={{ fontSize: '14px', color: '#334155' }}>
                  {String.fromCharCode(65 + optIndex)}. {option}
                </span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderResults = () => (
    <div id="assessment-results" style={{
      padding: '20px',
      backgroundColor: 'white'
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '30px',
        padding: '20px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '16px',
        color: 'white'
      }}>
        <h2 style={{ fontSize: '24px' }}>🏆 {t('results')}</h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '15px',
        marginBottom: '25px'
      }}>
        <div style={{
          padding: '15px',
          backgroundColor: '#f8fafc',
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '12px', color: '#5a6a7a' }}>{t('score')}</div>
          <div style={{ fontSize: '28px', fontWeight: '700', color: '#667eea' }}>
            {score}/{totalQuestions}
          </div>
        </div>
        <div style={{
          padding: '15px',
          backgroundColor: '#f8fafc',
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '12px', color: '#5a6a7a' }}>{t('percentage')}</div>
          <div style={{ fontSize: '28px', fontWeight: '700', color: '#22c55e' }}>
            {Math.round((score / totalQuestions) * 100)}%
          </div>
        </div>
      </div>

      {/* Per Principle Breakdown */}
      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ fontSize: '16px', color: '#1a2a3a', marginBottom: '12px' }}>
          📊 Per Principle Breakdown
        </h4>
        {principles.map(p => {
          const qs = ASSESSMENT_QUESTIONS[p].questions;
          let correct = 0;
          qs.forEach(q => {
            if (formData.answers[q.id] === q.correct) correct++;
          });
          const pct = Math.round((correct / qs.length) * 100);
          return (
            <div key={p} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '8px 0',
              borderBottom: '1px solid #f1f5f9'
            }}>
              <span style={{ fontSize: '20px' }}>{ASSESSMENT_QUESTIONS[p].emoji}</span>
              <span style={{ flex: 1, fontSize: '14px', color: '#1a2a3a' }}>
                {getTranslation('name', ASSESSMENT_QUESTIONS[p].name)}
              </span>
              <span style={{
                padding: '2px 10px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: '600',
                backgroundColor: pct >= 80 ? '#dcfce7' : (pct >= 60 ? '#fef3c7' : '#fee2e2'),
                color: pct >= 80 ? '#16a34a' : (pct >= 60 ? '#d97706' : '#dc2626')
              }}>
                {correct}/{qs.length} ({pct}%)
              </span>
            </div>
          );
        })}
      </div>

      <div style={{
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: '#f8fafc',
        borderRadius: '12px',
        border: '1px solid #e2e8f0'
      }}>
        <h4 style={{ fontSize: '14px', color: '#1a2a3a', marginBottom: '8px' }}>👤 Candidate Information</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '14px', color: '#475569' }}>
          <span><strong>{t('firstName')}:</strong> {formData.prenom}</span>
          <span><strong>{t('lastName')}:</strong> {formData.nom}</span>
          <span><strong>{t('matricule')}:</strong> {formData.matricule}</span>
          <span><strong>Date:</strong> {new Date().toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );

  const isPersonalInfoComplete = formData.nom && formData.prenom && formData.matricule;
  const isStepComplete = currentStep === -1 ? isPersonalInfoComplete : questions.every(q => formData.answers[q.id] !== undefined);

  if (showResults) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '20px',
        backdropFilter: 'blur(4px)'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '20px',
          maxWidth: '700px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          boxShadow: '0 25px 80px rgba(0,0,0,0.3)'
        }}>
          {renderResults()}
          <div style={{
            display: 'flex',
            gap: '10px',
            marginTop: '20px',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={onClose}
              style={{
                flex: 1,
                padding: '12px',
                backgroundColor: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                minWidth: '150px'
              }}
            >
              ✕ {t('close')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '20px',
      backdropFilter: 'blur(4px)'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '20px',
        maxWidth: '650px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        boxShadow: '0 25px 80px rgba(0,0,0,0.3)',
        animation: 'slideUp 0.4s ease'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h2 style={{ fontSize: '22px', color: '#1a2a3a' }}>{t('title')}</h2>
          <button
            onClick={onClose}
            style={{
              padding: '6px 14px',
              backgroundColor: '#e2e8f0',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '18px',
              color: '#475569'
            }}
          >
            ✕
          </button>
        </div>

        {/* Progress Bar */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '12px',
            color: '#5a6a7a',
            marginBottom: '4px'
          }}>
            <span>Personal Info</span>
            {principles.map((p, i) => (
              <span key={p} style={{
                fontWeight: i <= currentStep ? '600' : '400',
                color: i <= currentStep ? '#667eea' : '#94a3b8'
              }}>
                {i + 1}
              </span>
            ))}
          </div>
          <div style={{
            width: '100%',
            height: '6px',
            backgroundColor: '#e2e8f0',
            borderRadius: '3px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${((currentStep + 1) / (totalSteps + 1)) * 100}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #667eea, #764ba2)',
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>

        {/* Content */}
        {currentStep === -1 ? renderPersonalInfo() : renderQuestions()}

        {/* Navigation */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '25px',
          paddingTop: '20px',
          borderTop: '2px solid #f1f5f9'
        }}>
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            disabled={currentStep === -1}
            style={{
              padding: '10px 20px',
              backgroundColor: currentStep === -1 ? '#e2e8f0' : '#f1f5f9',
              color: currentStep === -1 ? '#94a3b8' : '#475569',
              border: 'none',
              borderRadius: '10px',
              cursor: currentStep === -1 ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            ← {t('previous')}
          </button>

          {currentStep < totalSteps - 1 ? (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!isStepComplete}
              style={{
                padding: '10px 30px',
                background: isStepComplete ? 'linear-gradient(135deg, #667eea, #764ba2)' : '#e2e8f0',
                color: isStepComplete ? 'white' : '#94a3b8',
                border: 'none',
                borderRadius: '10px',
                cursor: isStepComplete ? 'pointer' : 'not-allowed',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              {t('next')} →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!isStepComplete || !isPersonalInfoComplete || saving}
              style={{
                padding: '10px 30px',
                background: isStepComplete && isPersonalInfoComplete && !saving ? '#22c55e' : '#e2e8f0',
                color: isStepComplete && isPersonalInfoComplete && !saving ? 'white' : '#94a3b8',
                border: 'none',
                borderRadius: '10px',
                cursor: isStepComplete && isPersonalInfoComplete && !saving ? 'pointer' : 'not-allowed',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              {saving ? t('saving') : '📊 ' + t('submit')}
            </button>
          )}
        </div>

        {!isStepComplete && currentStep >= 0 && (
          <div style={{
            marginTop: '10px',
            fontSize: '12px',
            color: '#dc2626',
            textAlign: 'center'
          }}>
            ⚠️ {t('selectOption')}
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};

// Add default export
export default Assessment;
