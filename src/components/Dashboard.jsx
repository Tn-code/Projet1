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
      principles: { en: 'principles', fr: 'principes', ar: 'مبادئ' },
      assessment: { en: '📋 Assessments', fr: '📋 Évaluations', ar: '📋 التقييمات' },
      completed: { en: 'Completed', fr: 'Complété', ar: 'مكتمل' },
      pending: { en: 'Pending', fr: 'En attente', ar: 'قيد الانتظار' },
      quiz: { en: '📝 Quiz', fr: '📝 Quiz', ar: '📝 اختبار' },
      accuracy: { en: 'Accuracy', fr: 'Précision', ar: 'الدقة' },
      streak: { en: '🔥 Streak', fr: '🔥 Série', ar: '🔥 السلسلة' },
      level: { en: '⭐ Level', fr: '⭐ Niveau', ar: '⭐ المستوى' }
    };
    return translations[key]?.[language] || translations[key]?.en || key;
  };

  const progress = Math.round((completedPrinciples / 5) * 100);
  const nextMilestone = completedPrinciples < 5 ? `${completedPrinciples + 1}/5 ${getTranslation('principles')}` : '🎉 Complete!';
  
  // Determine level based on score
  const getLevel = () => {
    if (totalScore >= 80) return { name: 'Expert', emoji: '🏆', color: '#8b5cf6' };
    if (totalScore >= 60) return { name: 'Advanced', emoji: '🥇', color: '#667eea' };
    if (totalScore >= 40) return { name: 'Intermediate', emoji: '🥈', color: '#f59e0b' };
    if (totalScore >= 20) return { name: 'Beginner', emoji: '🥉', color: '#22c55e' };
    return { name: 'Novice', emoji: '🌱', color: '#94a3b8' };
  };

  const level = getLevel();

  return (
    <div style={{
      animation: 'fadeInUp 0.5s ease'
    }}>
      {/* Welcome Header */}
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '20px 25px',
        marginBottom: '20px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '15px'
      }}>
        <div>
          <h3 style={{ 
            fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', 
            color: '#1a2a3a',
            marginBottom: '4px'
          }}>
            {getTranslation('title')}
          </h3>
          <p style={{ color: '#5a6a7a', fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)' }}>
            {getTranslation('welcome')} <strong style={{ color: '#667eea' }}>
              {user?.displayName || user?.email?.split('@')[0] || 'User'}
            </strong>
          </p>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            padding: '8px 16px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '12px',
            color: 'white',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '10px', opacity: 0.8 }}>{getTranslation('level')}</div>
            <div style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', fontWeight: '700' }}>
              {level.emoji} {level.name}
            </div>
          </div>
          <div style={{
            padding: '8px 16px',
            backgroundColor: progress === 100 ? '#d1fae5' : '#fef3c7',
            borderRadius: '12px',
            fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)',
            fontWeight: '600',
            color: progress === 100 ? '#065f46' : '#92400e'
          }}>
            {progress === 100 ? '🏆 Complete!' : `${progress}%`}
          </div>
        </div>
      </div>

      {/* Stats Grid - 4 columns */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(150px, 22vw, 220px), 1fr))',
        gap: '15px',
        marginBottom: '20px'
      }}>
        {/* Total Points */}
        <div className="professional-card" style={{
          padding: '18px 20px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          border: 'none'
        }}>
          <div style={{ fontSize: '11px', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {getTranslation('totalPoints')}
          </div>
          <div style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: '700', marginTop: '4px' }}>
            {totalScore}
          </div>
          <div style={{ fontSize: '11px', opacity: 0.7, marginTop: '4px' }}>
            +10 per principle
          </div>
        </div>

        {/* Principles Learned */}
        <div className="professional-card" style={{
          padding: '18px 20px',
          background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
          color: 'white',
          border: 'none'
        }}>
          <div style={{ fontSize: '11px', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {getTranslation('principlesLearned')}
          </div>
          <div style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: '700', marginTop: '4px' }}>
            {completedPrinciples}/5
          </div>
          <div style={{ fontSize: '11px', opacity: 0.7, marginTop: '4px' }}>
            {getTranslation('progress')}: {progress}%
          </div>
        </div>

        {/* Next Milestone */}
        <div className="professional-card" style={{
          padding: '18px 20px',
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          color: 'white',
          border: 'none'
        }}>
          <div style={{ fontSize: '11px', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {getTranslation('nextMilestone')}
          </div>
          <div style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: '700', marginTop: '4px' }}>
            {nextMilestone}
          </div>
          <div style={{ fontSize: '11px', opacity: 0.7, marginTop: '4px' }}>
            {progress < 100 ? 'Keep going!' : '🎉 You\'re done!'}
          </div>
        </div>

        {/* Level / Streak */}
        <div className="professional-card" style={{
          padding: '18px 20px',
          background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
          color: 'white',
          border: 'none'
        }}>
          <div style={{ fontSize: '11px', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {getTranslation('streak')}
          </div>
          <div style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: '700', marginTop: '4px' }}>
            {completedPrinciples * 2}🔥
          </div>
          <div style={{ fontSize: '11px', opacity: 0.7, marginTop: '4px' }}>
            {level.emoji} {level.name}
          </div>
        </div>
      </div>

      {/* Progress Bar with Milestones */}
      <div className="professional-card" style={{
        padding: '20px 25px',
        marginBottom: '20px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 'clamp(0.7rem, 1.2vw, 0.85rem)',
          color: '#5a6a7a',
          marginBottom: '8px'
        }}>
          <span>0%</span>
          <span style={{ fontWeight: '600', color: '#1a2a3a' }}>
            {getTranslation('progress')}
          </span>
          <span>100%</span>
        </div>
        
        <div style={{
          width: '100%',
          height: '12px',
          backgroundColor: '#f1f5f9',
          borderRadius: '8px',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <div style={{
            width: `${progress}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #667eea 0%, #764ba2 50%, #22c55e 100%)',
            borderRadius: '8px',
            transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            boxShadow: '0 2px 10px rgba(102, 126, 234, 0.3)'
          }}>
            {progress > 20 && (
              <div style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'white',
                fontSize: '10px',
                fontWeight: '700'
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
          marginTop: '8px',
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
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                backgroundColor: completedPrinciples >= i ? '#22c55e' : '#e2e8f0',
                border: completedPrinciples >= i ? '3px solid #16a34a' : '2px solid #cbd5e1',
                transition: 'all 0.3s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '9px',
                color: completedPrinciples >= i ? 'white' : '#94a3b8'
              }}>
                {completedPrinciples >= i ? '✓' : i}
              </div>
              <span style={{
                fontSize: '10px',
                color: completedPrinciples >= i ? '#1a2a3a' : '#94a3b8',
                fontWeight: completedPrinciples >= i ? '600' : '400'
              }}>
                {i === 1 ? 'Seiri' : 
                 i === 2 ? 'Seiton' :
                 i === 3 ? 'Seiso' :
                 i === 4 ? 'Seiketsu' : 'Shitsuke'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats - 3 columns */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '15px'
      }}>
        {/* Assessment Stats */}
        <div className="professional-card" style={{
          padding: '18px 20px',
          textAlign: 'center',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>📋</div>
          <div style={{ fontSize: '14px', fontWeight: '600', color: '#1a2a3a' }}>
            {getTranslation('assessment')}
          </div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#667eea', marginTop: '4px' }}>
            {completedPrinciples > 0 ? '✓' : '0'}
          </div>
          <div style={{ fontSize: '12px', color: '#5a6a7a' }}>
            {completedPrinciples > 0 ? getTranslation('completed') : getTranslation('pending')}
          </div>
        </div>

        {/* Quiz Stats */}
        <div className="professional-card" style={{
          padding: '18px 20px',
          textAlign: 'center',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>📝</div>
          <div style={{ fontSize: '14px', fontWeight: '600', color: '#1a2a3a' }}>
            {getTranslation('quiz')}
          </div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#f59e0b', marginTop: '4px' }}>
            {completedPrinciples * 10}
          </div>
          <div style={{ fontSize: '12px', color: '#5a6a7a' }}>
            {getTranslation('accuracy')}: {completedPrinciples > 0 ? '80%' : '0%'}
          </div>
        </div>

        {/* Member Since */}
        <div className="professional-card" style={{
          padding: '18px 20px',
          textAlign: 'center',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>📅</div>
          <div style={{ fontSize: '14px', fontWeight: '600', color: '#1a2a3a' }}>
            {getTranslation('memberSince')}
          </div>
          <div style={{ fontSize: '18px', fontWeight: '700', color: '#22c55e', marginTop: '4px' }}>
            {new Date(user?.metadata?.creationTime || Date.now()).toLocaleDateString()}
          </div>
          <div style={{ fontSize: '12px', color: '#5a6a7a' }}>
            {getTranslation('rank')}: {completedPrinciples > 0 ? 'Active' : 'New'}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .professional-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .professional-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
