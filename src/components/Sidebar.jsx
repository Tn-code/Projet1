import React, { useState, useEffect } from 'react';
import Quiz from './Quiz';
import Assessment from './Assessment';

const Sidebar = ({ 
  user, 
  language, 
  setLanguage, 
  onLogout,
  score,
  completedPrinciples,
  isOpen,
  toggleSidebar 
}) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [showAssessment, setShowAssessment] = useState(false);

  const getTranslation = (key) => {
    const translations = {
      menu: { en: '📋 Menu', fr: '📋 Menu', ar: '📋 القائمة' },
      dashboard: { en: '📊 Dashboard', fr: '📊 Tableau de bord', ar: '📊 لوحة التحكم' },
      game: { en: '🎯 Game', fr: '🎯 Jeu', ar: '🎯 اللعبة' },
      quiz: { en: '📝 Quiz (50 Questions)', fr: '📝 Quiz (50 Questions)', ar: '📝 اختبار (50 سؤال)' },
      assessment: { en: '📋 5S Assessment', fr: '📋 Évaluation 5S', ar: '📋 تقييم 5S' },
      profile: { en: '👤 Profile', fr: '👤 Profil', ar: '👤 الملف الشخصي' },
      logout: { en: '🚪 Logout', fr: '🚪 Déconnexion', ar: '🚪 تسجيل الخروج' },
      progress: { en: 'Progress', fr: 'Progrès', ar: 'التقدم' },
      points: { en: 'Points', fr: 'Points', ar: 'النقاط' }
    };
    return translations[key]?.[language] || translations[key]?.en || key;
  };

  const isRTL = language === 'ar';

  const handleQuizClick = () => setShowQuiz(true);
  const handleQuizClose = () => setShowQuiz(false);
  const handleAssessmentClick = () => setShowAssessment(true);
  const handleAssessmentClose = () => setShowAssessment(false);

  return (
    <>
      {/* Sidebar Overlay for Mobile */}
      {isOpen && window.innerWidth <= 640 && (
        <div
          onClick={toggleSidebar}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 998,
            display: 'block'
          }}
        />
      )}

      {/* Sidebar */}
      <div style={{
        position: 'fixed',
        top: 0,
        [isRTL ? 'right' : 'left']: isOpen ? '0' : (window.innerWidth <= 640 ? '-280px' : '-280px'),
        width: '280px',
        height: '100vh',
        backgroundColor: 'white',
        boxShadow: isRTL ? '-2px 0 20px rgba(0,0,0,0.08)' : '2px 0 20px rgba(0,0,0,0.08)',
        transition: 'all 0.3s ease',
        overflow: 'hidden',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{
          padding: '20px',
          flex: 1,
          overflowY: 'auto'
        }}>
          {/* Close Button - Only on mobile */}
          {window.innerWidth <= 640 && (
            <button
              onClick={toggleSidebar}
              style={{
                position: 'absolute',
                top: '10px',
                [isRTL ? 'left' : 'right']: '10px',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#94a3b8',
                padding: '5px'
              }}
            >
              ✕
            </button>
          )}

          {/* Header */}
          <div style={{
            textAlign: 'center',
            padding: '10px 0 20px',
            borderBottom: '2px solid #f1f5f9',
            marginBottom: '20px',
            marginTop: window.innerWidth <= 640 ? '10px' : '0'
          }}>
            <div style={{
              fontSize: '36px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              marginBottom: '8px'
            }}>5S</div>
            <div style={{ fontWeight: '600', color: '#1a2a3a', fontSize: '16px' }}>
              {user?.displayName || user?.email?.split('@')[0] || 'User'}
            </div>
            <div style={{ fontSize: '12px', color: '#5a6a7a' }}>
              {user?.email || ''}
            </div>
          </div>

          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '10px',
            marginBottom: '20px'
          }}>
            <div style={{
              padding: '12px',
              backgroundColor: '#f8fafc',
              borderRadius: '10px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '11px', color: '#5a6a7a' }}>{getTranslation('points')}</div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#667eea' }}>{score}</div>
            </div>
            <div style={{
              padding: '12px',
              backgroundColor: '#f8fafc',
              borderRadius: '10px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '11px', color: '#5a6a7a' }}>{getTranslation('progress')}</div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#22c55e' }}>
                {completedPrinciples}/5
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{
              padding: '12px 16px',
              backgroundColor: '#f8fafc',
              borderRadius: '10px',
              fontWeight: '600',
              color: '#1a2a3a',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              📊 {getTranslation('dashboard')}
            </div>
            
            <div style={{
              padding: '12px 16px',
              backgroundColor: '#e0f2fe',
              borderRadius: '10px',
              fontWeight: '600',
              color: '#667eea',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              border: '2px solid #667eea'
            }}>
              🎯 {getTranslation('game')}
            </div>

            <button
              onClick={handleQuizClick}
              style={{
                padding: '12px 16px',
                backgroundColor: '#fef3c7',
                borderRadius: '10px',
                fontWeight: '600',
                color: '#d97706',
                fontSize: '14px',
                border: '2px solid #f59e0b',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'all 0.2s',
                width: '100%'
              }}
            >
              📝 {getTranslation('quiz')}
              <span style={{
                fontSize: '11px',
                backgroundColor: '#d97706',
                color: 'white',
                padding: '2px 8px',
                borderRadius: '12px'
              }}>50</span>
            </button>

            <button
              onClick={handleAssessmentClick}
              style={{
                padding: '12px 16px',
                backgroundColor: '#dbeafe',
                borderRadius: '10px',
                fontWeight: '600',
                color: '#1d4ed8',
                fontSize: '14px',
                border: '2px solid #3b82f6',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'all 0.2s',
                width: '100%'
              }}
            >
              📋 {getTranslation('assessment')}
              <span style={{
                fontSize: '11px',
                backgroundColor: '#3b82f6',
                color: 'white',
                padding: '2px 8px',
                borderRadius: '12px'
              }}>15</span>
            </button>

            <div style={{
              padding: '12px 16px',
              backgroundColor: '#f8fafc',
              borderRadius: '10px',
              fontWeight: '500',
              color: '#475569',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              👤 {getTranslation('profile')}
            </div>

            <button
              onClick={onLogout}
              style={{
                padding: '12px 16px',
                backgroundColor: '#fee2e2',
                borderRadius: '10px',
                fontWeight: '500',
                color: '#dc2626',
                fontSize: '14px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginTop: '10px',
                transition: 'all 0.2s',
                width: '100%'
              }}
            >
              🚪 {getTranslation('logout')}
            </button>
          </div>

          {/* Language selector */}
          <div style={{
            marginTop: '20px',
            paddingTop: '15px',
            borderTop: '2px solid #f1f5f9'
          }}>
            <div style={{ fontSize: '12px', color: '#5a6a7a', marginBottom: '8px' }}>🌐 Language</div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                backgroundColor: 'white',
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              <option value="en">🇬🇧 English</option>
              <option value="fr">🇫🇷 Français</option>
              <option value="ar">🇸🇦 العربية</option>
            </select>
          </div>
        </div>
      </div>

      {/* Quiz Modal */}
      {showQuiz && <Quiz language={language} onClose={handleQuizClose} />}
      {showAssessment && <Assessment language={language} onClose={handleAssessmentClose} user={user} />}
    </>
  );
};

export default Sidebar;
