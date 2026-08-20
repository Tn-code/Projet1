import React from 'react';

const Dashboard = ({ user, totalScore, completedPrinciples, language }) => {
  const getTranslation = (key) => {
    const translations = {
      title: { en: '📊 Performance Dashboard', fr: '📊 Tableau de Performance', ar: '📊 لوحة الأداء' },
      welcome: { en: 'Welcome back,', fr: 'Bon retour,', ar: 'مرحباً بعودتك،' },
      stats: { en: 'Your Learning Stats', fr: 'Vos Statistiques', ar: 'إحصائياتك' },
      totalPoints: { en: 'Total Points', fr: 'Points Totaux', ar: 'إجمالي النقاط' },
      principlesLearned: { en: 'Principles Learned', fr: 'Principes Appris', ar: 'المبادئ المتعلمة' },
      progress: { en: 'Completion', fr: 'Progression', ar: 'الإنجاز' },
      rank: { en: 'Rank', fr: 'Rang', ar: 'الترتيب' },
      memberSince: { en: 'Member Since', fr: 'Membre Depuis', ar: 'عضو منذ' },
      nextMilestone: { en: 'Next Milestone', fr: 'Prochain Jalon', ar: 'المعالم القادمة' },
      principles: { en: 'principles', fr: 'principes', ar: 'مبادئ' }
    };
    return translations[key]?.[language] || translations[key]?.en || key;
  };

  const progress = Math.round((completedPrinciples / 5) * 100);
  const nextMilestone = completedPrinciples < 5 ? `${completedPrinciples + 1}/5 ${getTranslation('principles')}` : '🎉 Complete!';

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '20px',
      padding: '25px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
      marginBottom: '20px',
      animation: 'fadeInUp 0.5s ease'
    }}>
      {/* Welcome Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <div>
          <h3 style={{ fontSize: '20px', color: 'var(--gray-800)' }}>
            {getTranslation('title')}
          </h3>
          <p style={{ color: 'var(--gray-500)', fontSize: '14px' }}>
            {getTranslation('welcome')} <strong>{user?.displayName || user?.email?.split('@')[0] || 'User'}</strong>
          </p>
        </div>
        <div style={{
          padding: '6px 16px',
          backgroundColor: progress === 100 ? '#d1fae5' : '#fef3c7',
          borderRadius: '20px',
          fontSize: '13px',
          fontWeight: '600',
          color: progress === 100 ? '#065f46' : '#92400e'
        }}>
          {progress === 100 ? '🏆 Complete!' : `${progress}%`}
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '15px',
        marginBottom: '20px'
      }}>
        <div style={{
          padding: '15px',
          backgroundColor: 'var(--gray-50)',
          borderRadius: '14px',
          border: '1px solid var(--gray-100)',
          transition: 'all 0.3s',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = 'var(--shadow-md)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}>
          <div style={{ fontSize: '11px', color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {getTranslation('totalPoints')}
          </div>
          <div style={{ fontSize: '28px', fontWeight: '700', color: '#667eea', marginTop: '4px' }}>
            {totalScore}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--gray-400)' }}>
            +10 per principle
          </div>
        </div>

        <div style={{
          padding: '15px',
          backgroundColor: 'var(--gray-50)',
          borderRadius: '14px',
          border: '1px solid var(--gray-100)',
          transition: 'all 0.3s',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = 'var(--shadow-md)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}>
          <div style={{ fontSize: '11px', color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {getTranslation('principlesLearned')}
          </div>
          <div style={{ fontSize: '28px', fontWeight: '700', color: '#22c55e', marginTop: '4px' }}>
            {completedPrinciples}/5
          </div>
          <div style={{ fontSize: '11px', color: 'var(--gray-400)' }}>
            {getTranslation('progress')}
          </div>
        </div>

        <div style={{
          padding: '15px',
          backgroundColor: 'var(--gray-50)',
          borderRadius: '14px',
          border: '1px solid var(--gray-100)',
          transition: 'all 0.3s',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = 'var(--shadow-md)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}>
          <div style={{ fontSize: '11px', color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {getTranslation('nextMilestone')}
          </div>
          <div style={{ fontSize: '20px', fontWeight: '700', color: '#f59e0b', marginTop: '4px' }}>
            {nextMilestone}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--gray-400)' }}>
            {progress < 100 ? 'Keep going!' : '🎉 You\'re done!'}
          </div>
        </div>
      </div>

      {/* Progress Bar with Labels */}
      <div style={{ marginTop: '5px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '12px',
          color: 'var(--gray-500)',
          marginBottom: '6px'
        }}>
          <span>0%</span>
          <span>{getTranslation('progress')}</span>
          <span>100%</span>
        </div>
        <div style={{
          width: '100%',
          height: '10px',
          backgroundColor: 'var(--gray-100)',
          borderRadius: '8px',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <div style={{
            width: `${progress}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '8px',
            transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative'
          }}>
            {progress > 20 && (
              <div style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'white',
                fontSize: '10px',
                fontWeight: '600'
              }}>
                {progress}%
              </div>
            )}
          </div>
        </div>
        {/* Milestone markers */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '4px',
          padding: '0 2px'
        }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px'
            }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: completedPrinciples >= i ? '#22c55e' : 'var(--gray-200)',
                border: completedPrinciples >= i ? '2px solid #16a34a' : '2px solid var(--gray-300)',
                transition: 'all 0.3s'
              }} />
              <span style={{
                fontSize: '9px',
                color: completedPrinciples >= i ? 'var(--gray-700)' : 'var(--gray-400)',
                fontWeight: completedPrinciples >= i ? '600' : '400'
              }}>
                {i}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
