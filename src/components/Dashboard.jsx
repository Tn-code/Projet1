import React, { useState, useEffect } from 'react';
import { getAllAssessments, getAssessmentStats } from '../services/adminService';

const Dashboard = ({ user, totalScore, completedPrinciples, language }) => {
  const [assessments, setAssessments] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [assessmentsResult, statsResult] = await Promise.all([
      getAllAssessments(),
      getAssessmentStats()
    ]);
    if (assessmentsResult.data) setAssessments(assessmentsResult.data);
    if (statsResult.data) setStats(statsResult.data);
    setLoading(false);
  };

  const getTranslation = (key) => {
    const translations = {
      welcome: { en: 'Welcome back,', fr: 'Bon retour,', ar: 'مرحباً بعودتك،' },
      stats: { en: 'Your Learning Stats', fr: 'Vos Statistiques', ar: 'إحصائياتك' },
      totalPoints: { en: 'Total Points', fr: 'Points Totaux', ar: 'إجمالي النقاط' },
      principlesLearned: { en: 'Principles Learned', fr: 'Principes Appris', ar: 'المبادئ المتعلمة' },
      progress: { en: 'Completion', fr: 'Progression', ar: 'الإنجاز' },
      nextMilestone: { en: 'Next Milestone', fr: 'Prochain Jalon', ar: 'المعالم القادمة' },
      principles: { en: 'principles', fr: 'principes', ar: 'مبادئ' },
      assessment: { en: '📋 Assessments', fr: '📋 Évaluations', ar: '📋 التقييمات' },
      completed: { en: 'Completed', fr: 'Complété', ar: 'مكتمل' },
      pending: { en: 'Pending', fr: 'En attente', ar: 'قيد الانتظار' },
      streak: { en: '🔥 Streak', fr: '🔥 Série', ar: '🔥 السلسلة' },
      level: { en: '⭐ Level', fr: '⭐ Niveau', ar: '⭐ المستوى' },
      totalAssessments: { en: 'Total Assessments', fr: 'Total Évaluations', ar: 'إجمالي التقييمات' },
      averageScore: { en: 'Average Score', fr: 'Score Moyen', ar: 'متوسط النتيجة' },
      dailyGoal: { en: '🎯 Daily Goal', fr: '🎯 Objectif Quotidien', ar: '🎯 الهدف اليومي' },
      weeklyGoal: { en: '📅 Weekly Goal', fr: '📅 Objectif Hebdomadaire', ar: '📅 الهدف الأسبوعي' },
      overall: { en: '📊 Overall', fr: '📊 Global', ar: '📊 الإجمالي' },
      bestScore: { en: '🏆 Best Score', fr: '🏆 Meilleur Score', ar: '🏆 أفضل نتيجة' },
      progressChart: { en: '📈 Progress', fr: '📈 Progrès', ar: '📈 التقدم' },
      recentActivity: { en: '🕐 Recent Activity', fr: '🕐 Activité Récente', ar: '🕐 النشاط الأخير' },
      noData: { en: 'No data available', fr: 'Aucune donnée disponible', ar: 'لا توجد بيانات' },
      startLearning: { en: 'Start Learning', fr: 'Commencer à Apprendre', ar: 'ابدأ التعلم' },
      continueLearning: { en: 'Continue Learning', fr: 'Continuer à Apprendre', ar: 'مواصلة التعلم' },
      master: { en: 'Master', fr: 'Maîtriser', ar: 'إتقان' },
      expert: { en: 'Expert', fr: 'Expert', ar: 'خبير' },
      advanced: { en: 'Advanced', fr: 'Avancé', ar: 'متقدم' },
      intermediate: { en: 'Intermediate', fr: 'Intermédiaire', ar: 'متوسط' },
      beginner: { en: 'Beginner', fr: 'Débutant', ar: 'مبتدئ' },
      novice: { en: 'Novice', fr: 'Novice', ar: 'مبتدئ' }
    };
    return translations[key]?.[language] || translations[key]?.en || key;
  };

  // Niveau basé sur le score
  const getLevelInfo = () => {
    if (totalScore >= 80) return { name: getTranslation('expert'), emoji: '🏆', color: '#8b5cf6', bg: '#f0f0ff' };
    if (totalScore >= 60) return { name: getTranslation('advanced'), emoji: '🥇', color: '#667eea', bg: '#f0f4ff' };
    if (totalScore >= 40) return { name: getTranslation('intermediate'), emoji: '🥈', color: '#f59e0b', bg: '#fffbeb' };
    if (totalScore >= 20) return { name: getTranslation('beginner'), emoji: '🥉', color: '#22c55e', bg: '#f0fdf4' };
    return { name: getTranslation('novice'), emoji: '🌱', color: '#94a3b8', bg: '#f8fafc' };
  };

  const level = getLevelInfo();
  const progress = Math.round((completedPrinciples / 5) * 100);

  // Données d'activité récente
  const recentActivities = assessments.slice(-5).reverse().map(a => ({
    name: `${a.prenom || ''} ${a.nom || ''}`.trim() || 'User',
    score: a.score || 0,
    date: a.createdAt ? new Date(a.createdAt).toLocaleDateString() : 'N/A',
    status: a.score >= 12 ? 'excellent' : (a.score >= 8 ? 'good' : 'needs_improvement')
  }));

  // Statistiques de progression
  const progressStats = {
    daily: Math.min(Math.round((completedPrinciples / 5) * 20), 20),
    weekly: Math.min(Math.round((completedPrinciples / 5) * 5), 5),
    overall: progress
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid #e2e8f0',
          borderTop: '4px solid #667eea',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <p style={{ color: '#5a6a7a' }}>Loading dashboard...</p>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ animation: 'fadeInUp 0.6s ease' }}>
      {/* Welcome Header avec Level */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '16px',
        padding: '30px',
        marginBottom: '25px',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '15px',
        boxShadow: '0 8px 30px rgba(102, 126, 234, 0.3)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h3 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', marginBottom: '6px' }}>
            👋 {getTranslation('welcome')} <strong style={{ color: '#f0f4ff' }}>
              {user?.displayName || user?.email?.split('@')[0] || 'User'}
            </strong>
          </h3>
          <p style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)', opacity: 0.9 }}>
            {getTranslation('stats')}
          </p>
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px', flexWrap: 'wrap' }}>
            <span style={{
              padding: '4px 14px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '20px',
              fontSize: '13px',
              backdropFilter: 'blur(10px)'
            }}>
              {level.emoji} {getTranslation('level')}: {level.name}
            </span>
            <span style={{
              padding: '4px 14px',
              background: progress === 100 ? 'rgba(34,197,94,0.4)' : 'rgba(251,191,36,0.4)',
              borderRadius: '20px',
              fontSize: '13px',
              backdropFilter: 'blur(10px)'
            }}>
              {progress === 100 ? '🏆 100% Complete!' : `${progress}% ${getTranslation('progress')}`}
            </span>
          </div>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            padding: '10px 20px',
            background: 'rgba(255,255,255,0.15)',
            borderRadius: '12px',
            textAlign: 'center',
            backdropFilter: 'blur(10px)',
            minWidth: '80px'
          }}>
            <div style={{ fontSize: '10px', opacity: 0.8 }}>{getTranslation('totalPoints')}</div>
            <div style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: '700' }}>{totalScore}</div>
          </div>
          <div style={{
            fontSize: '42px',
            opacity: 0.3,
            position: 'absolute',
            right: '-20px',
            top: '-20px',
            fontSize: '120px',
            opacity: 0.1
          }}>
            {level.emoji}
          </div>
        </div>
      </div>

      {/* Stats Grid - 4 colonnes */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(160px, 22vw, 220px), 1fr))',
        gap: '16px',
        marginBottom: '25px'
      }}>
        <div style={{
          padding: '20px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '14px',
          color: 'white',
          boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
          transition: 'transform 0.3s ease',
          cursor: 'default'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
          <div style={{ fontSize: '11px', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {getTranslation('totalPoints')}
          </div>
          <div style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '700', marginTop: '4px' }}>
            {totalScore}
          </div>
          <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '4px' }}>
            ⚡ +10 per principle
          </div>
        </div>

        <div style={{
          padding: '20px',
          background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
          borderRadius: '14px',
          color: 'white',
          boxShadow: '0 4px 15px rgba(34, 197, 94, 0.3)',
          transition: 'transform 0.3s ease',
          cursor: 'default'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
          <div style={{ fontSize: '11px', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {getTranslation('principlesLearned')}
          </div>
          <div style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '700', marginTop: '4px' }}>
            {completedPrinciples}/5
          </div>
          <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '4px' }}>
            📈 {progress}% {getTranslation('progress')}
          </div>
        </div>

        <div style={{
          padding: '20px',
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          borderRadius: '14px',
          color: 'white',
          boxShadow: '0 4px 15px rgba(245, 158, 11, 0.3)',
          transition: 'transform 0.3s ease',
          cursor: 'default'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
          <div style={{ fontSize: '11px', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {getTranslation('nextMilestone')}
          </div>
          <div style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: '700', marginTop: '4px' }}>
            {completedPrinciples < 5 ? `${completedPrinciples + 1}/5` : '🎉 Complete!'}
          </div>
          <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '4px' }}>
            {progress < 100 ? getTranslation('continueLearning') : '🏆 ' + getTranslation('master')}
          </div>
        </div>

        <div style={{
          padding: '20px',
          background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
          borderRadius: '14px',
          color: 'white',
          boxShadow: '0 4px 15px rgba(236, 72, 153, 0.3)',
          transition: 'transform 0.3s ease',
          cursor: 'default'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
          <div style={{ fontSize: '11px', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {getTranslation('streak')}
          </div>
          <div style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '700', marginTop: '4px' }}>
            {completedPrinciples > 0 ? `${completedPrinciples * 2}🔥` : '0🔥'}
          </div>
          <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '4px' }}>
            {level.emoji} {level.name}
          </div>
        </div>
      </div>

      {/* Progress Bar Section */}
      <div style={{
        background: 'white',
        padding: '25px',
        borderRadius: '14px',
        marginBottom: '25px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        border: '1px solid rgba(0,0,0,0.04)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '12px',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <div>
            <h4 style={{ fontSize: '16px', color: '#1a2a3a' }}>
              📊 {getTranslation('progressChart')}
            </h4>
            <p style={{ fontSize: '13px', color: '#5a6a7a' }}>
              {completedPrinciples}/5 {getTranslation('principles')} • {progress}% {getTranslation('progress')}
            </p>
          </div>
          <div style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap'
          }}>
            <span style={{
              padding: '4px 12px',
              background: '#f0f4ff',
              borderRadius: '12px',
              fontSize: '12px',
              color: '#667eea'
            }}>
              {getTranslation('dailyGoal')}: {progressStats.daily}/20
            </span>
            <span style={{
              padding: '4px 12px',
              background: '#f0fdf4',
              borderRadius: '12px',
              fontSize: '12px',
              color: '#22c55e'
            }}>
              {getTranslation('weeklyGoal')}: {progressStats.weekly}/5
            </span>
          </div>
        </div>

        <div style={{
          width: '100%',
          height: '14px',
          backgroundColor: '#f1f5f9',
          borderRadius: '10px',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <div style={{
            width: `${progress}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #667eea 0%, #764ba2 50%, #22c55e 100%)',
            borderRadius: '10px',
            transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)',
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
                fontSize: '11px',
                fontWeight: '700'
              }}>
                {progress}%
              </div>
            )}
          </div>
        </div>

        {/* Milestones */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '14px',
          padding: '0 4px'
        }}>
          {[1, 2, 3, 4, 5].map((i) => {
            const isCompleted = completedPrinciples >= i;
            const names = ['Seiri', 'Seiton', 'Seiso', 'Seiketsu', 'Shitsuke'];
            return (
              <div key={i} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                flex: 1
              }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: isCompleted ? '#22c55e' : '#e2e8f0',
                  border: isCompleted ? '3px solid #16a34a' : '2px solid #cbd5e1',
                  transition: 'all 0.4s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  color: isCompleted ? 'white' : '#94a3b8',
                  fontWeight: '700'
                }}>
                  {isCompleted ? '✓' : i}
                </div>
                <span style={{
                  fontSize: '10px',
                  color: isCompleted ? '#1a2a3a' : '#94a3b8',
                  fontWeight: isCompleted ? '600' : '400',
                  textAlign: 'center'
                }}>
                  {names[i-1]}
                </span>
                <span style={{
                  fontSize: '9px',
                  color: isCompleted ? '#22c55e' : '#cbd5e1'
                }}>
                  {isCompleted ? '✅' : '⏳'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div style={{
        background: 'white',
        padding: '20px 25px',
        borderRadius: '14px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        border: '1px solid rgba(0,0,0,0.04)'
      }}>
        <h4 style={{ fontSize: '16px', color: '#1a2a3a', marginBottom: '15px' }}>
          {getTranslation('recentActivity')}
        </h4>
        {recentActivities.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                  <th style={{ padding: '10px 8px', textAlign: 'left', fontSize: '13px', color: '#5a6a7a' }}>User</th>
                  <th style={{ padding: '10px 8px', textAlign: 'center', fontSize: '13px', color: '#5a6a7a' }}>Score</th>
                  <th style={{ padding: '10px 8px', textAlign: 'center', fontSize: '13px', color: '#5a6a7a' }}>Status</th>
                  <th style={{ padding: '10px 8px', textAlign: 'center', fontSize: '13px', color: '#5a6a7a' }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentActivities.map((activity, index) => (
                  <tr key={index} style={{
                    borderBottom: index < recentActivities.length - 1 ? '1px solid #f1f5f9' : 'none',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                    <td style={{ padding: '10px 8px', fontWeight: '500', fontSize: '14px' }}>
                      {activity.name}
                    </td>
                    <td style={{
                      padding: '10px 8px',
                      textAlign: 'center',
                      fontWeight: '700',
                      fontSize: '15px',
                      color: activity.score >= 12 ? '#22c55e' : (activity.score >= 8 ? '#f59e0b' : '#dc2626')
                    }}>
                      {activity.score}/15
                    </td>
                    <td style={{ padding: '10px 8px', textAlign: 'center' }}>
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                        background: activity.status === 'excellent' ? '#d1fae5' :
                                  activity.status === 'good' ? '#fef3c7' : '#fee2e2',
                        color: activity.status === 'excellent' ? '#065f46' :
                               activity.status === 'good' ? '#92400e' : '#991b1b'
                      }}>
                        {activity.status === 'excellent' ? '✅ Excellent' :
                         activity.status === 'good' ? '📊 Good' : '📈 Needs Improvement'}
                      </span>
                    </td>
                    <td style={{ padding: '10px 8px', textAlign: 'center', fontSize: '13px', color: '#5a6a7a' }}>
                      {activity.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '30px',
            color: '#94a3b8'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>📊</div>
            <p>{getTranslation('noData')}</p>
            <p style={{ fontSize: '14px', marginTop: '5px' }}>
              {getTranslation('startLearning')} 🚀
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
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

export default Dashboard;
