import React, { useState, useEffect } from 'react';
import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
  RadialLinearScale
} from 'chart.js';
import { Line, Bar, Doughnut, PolarArea } from 'react-chartjs-2';
import { getAllAssessments, getAssessmentStats } from '../services/adminService';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
  RadialLinearScale
);

const Dashboard = ({ user, totalScore, completedPrinciples, language }) => {
  const [assessments, setAssessments] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('week');

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
      level: { en: '⭐ Level', fr: '⭐ Niveau', ar: '⭐ المستوى' },
      performance: { en: 'Performance Overview', fr: 'Aperçu de la Performance', ar: 'نظرة عامة على الأداء' },
      principlesPerformance: { en: 'Principles Performance', fr: 'Performance par Principe', ar: 'الأداء حسب المبدأ' },
      scoreDistribution: { en: 'Score Distribution', fr: 'Distribution des Scores', ar: 'توزيع النقاط' },
      recentActivity: { en: 'Recent Activity', fr: 'Activité Récente', ar: 'النشاط الأخير' },
      exportReport: { en: '📄 Export Report', fr: '📄 Exporter le Rapport', ar: '📄 تصدير التقرير' },
      refresh: { en: '🔄 Refresh', fr: '🔄 Rafraîchir', ar: '🔄 تحديث' },
      totalAssessments: { en: 'Total Assessments', fr: 'Total Évaluations', ar: 'إجمالي التقييمات' },
      averageScore: { en: 'Average Score', fr: 'Score Moyen', ar: 'متوسط النتيجة' }
    };
    return translations[key]?.[language] || translations[key]?.en || key;
  };

  // Level calculation
  const getLevel = () => {
    if (totalScore >= 80) return { name: 'Expert', emoji: '🏆', color: '#8b5cf6' };
    if (totalScore >= 60) return { name: 'Advanced', emoji: '🥇', color: '#667eea' };
    if (totalScore >= 40) return { name: 'Intermediate', emoji: '🥈', color: '#f59e0b' };
    if (totalScore >= 20) return { name: 'Beginner', emoji: '🥉', color: '#22c55e' };
    return { name: 'Novice', emoji: '🌱', color: '#94a3b8' };
  };

  // Chart data preparation
  const getPerformanceTrend = () => {
    const sorted = [...assessments].sort((a, b) => 
      new Date(a.createdAt) - new Date(b.createdAt)
    );
    const labels = sorted.map(a => new Date(a.createdAt).toLocaleDateString());
    const scores = sorted.map(a => a.score);
    return { labels, scores };
  };

  const getPrinciplesData = () => {
    const principles = {
      seiri: { en: 'Seiri', fr: 'Seiri', ar: 'سيري' },
      seiton: { en: 'Seiton', fr: 'Seiton', ar: 'سيتون' },
      seiso: { en: 'Seiso', fr: 'Seiso', ar: 'سيسو' },
      seiketsu: { en: 'Seiketsu', fr: 'Seiketsu', ar: 'سيكيتسو' },
      shitsuke: { en: 'Shitsuke', fr: 'Shitsuke', ar: 'شيتسوكي' }
    };
    
    const scores = {};
    Object.keys(principles).forEach(p => {
      scores[p] = { correct: 0, total: 0 };
    });
    
    assessments.forEach(a => {
      if (a.results) {
        Object.keys(a.results).forEach(p => {
          if (scores[p]) {
            scores[p].correct += a.results[p].correct || 0;
            scores[p].total += a.results[p].total || 0;
          }
        });
      }
    });
    
    const labels = Object.keys(principles).map(p => principles[p][language] || principles[p].en);
    const data = Object.values(scores).map(s => 
      s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0
    );
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFD93D'];
    return { labels, data, colors };
  };

  const getScoreDistribution = () => {
    const distribution = { '0-5': 0, '6-10': 0, '11-15': 0 };
    assessments.forEach(a => {
      if (a.score <= 5) distribution['0-5']++;
      else if (a.score <= 10) distribution['6-10']++;
      else distribution['11-15']++;
    });
    return {
      labels: ['0-5', '6-10', '11-15'],
      data: Object.values(distribution),
      colors: ['#dc2626', '#f59e0b', '#22c55e']
    };
  };

  const level = getLevel();
  const progress = Math.round((completedPrinciples / 5) * 100);
  const trend = getPerformanceTrend();
  const principlesData = getPrinciplesData();
  const distribution = getScoreDistribution();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <div className="spinner" />
        <p style={{ color: '#5a6a7a' }}>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div style={{
      animation: 'fadeInUp 0.5s ease'
    }}>
      {/* Welcome Header */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '16px',
        padding: '25px 30px',
        marginBottom: '25px',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '15px',
        boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)'
      }}>
        <div>
          <h3 style={{ 
            fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', 
            marginBottom: '4px'
          }}>
            👋 {getTranslation('welcome')} <strong style={{ color: '#f0f4ff' }}>
              {user?.displayName || user?.email?.split('@')[0] || 'User'}
            </strong>
          </h3>
          <p style={{ fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)', opacity: 0.9 }}>
            {getTranslation('stats')}
          </p>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            padding: '8px 20px',
            backgroundColor: 'rgba(255,255,255,0.15)',
            borderRadius: '12px',
            textAlign: 'center',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ fontSize: '10px', opacity: 0.8 }}>{getTranslation('level')}</div>
            <div style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', fontWeight: '700' }}>
              {level.emoji} {level.name}
            </div>
          </div>
          <div style={{
            padding: '8px 20px',
            backgroundColor: progress === 100 ? 'rgba(34,197,94,0.3)' : 'rgba(251,191,36,0.3)',
            borderRadius: '12px',
            fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)',
            fontWeight: '600',
            color: 'white',
            backdropFilter: 'blur(10px)'
          }}>
            {progress === 100 ? '🏆 Complete!' : `${progress}%`}
          </div>
        </div>
      </div>

      {/* Stats Grid - 4 columns */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(160px, 22vw, 220px), 1fr))',
        gap: '15px',
        marginBottom: '25px'
      }}>
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
            {completedPrinciples < 5 ? `${completedPrinciples + 1}/5 ${getTranslation('principles')}` : '🎉 Complete!'}
          </div>
          <div style={{ fontSize: '11px', opacity: 0.7, marginTop: '4px' }}>
            {progress < 100 ? 'Keep going!' : '🎉 You\'re done!'}
          </div>
        </div>

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
        marginBottom: '25px'
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
          marginTop: '10px',
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
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: completedPrinciples >= i ? '#22c55e' : '#e2e8f0',
                border: completedPrinciples >= i ? '3px solid #16a34a' : '2px solid #cbd5e1',
                transition: 'all 0.3s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                color: completedPrinciples >= i ? 'white' : '#94a3b8'
              }}>
                {completedPrinciples >= i ? '✓' : i}
              </div>
              <span style={{
                fontSize: '9px',
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

      {/* Charts Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '20px',
        marginBottom: '25px'
      }}>
        {/* Performance Trend */}
        <div className="professional-card">
          <h4 style={{ marginBottom: '15px', color: '#1a2a3a' }}>
            📈 {getTranslation('performance')}
          </h4>
          {trend.labels.length > 0 ? (
            <Line
              data={{
                labels: trend.labels.slice(-10),
                datasets: [{
                  label: 'Score',
                  data: trend.scores.slice(-10),
                  borderColor: '#667eea',
                  backgroundColor: 'rgba(102, 126, 234, 0.1)',
                  fill: true,
                  tension: 0.4
                }]
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: false }
                },
                scales: {
                  y: {
                    min: 0,
                    max: 15
                  }
                }
              }}
            />
          ) : (
            <p style={{ textAlign: 'center', color: '#94a3b8', padding: '20px' }}>
              No data available yet
            </p>
          )}
        </div>

        {/* Principles Performance */}
        <div className="professional-card">
          <h4 style={{ marginBottom: '15px', color: '#1a2a3a' }}>
            📊 {getTranslation('principlesPerformance')}
          </h4>
          {principlesData.data.some(d => d > 0) ? (
            <Bar
              data={{
                labels: principlesData.labels,
                datasets: [{
                  label: 'Performance (%)',
                  data: principlesData.data,
                  backgroundColor: principlesData.colors,
                  borderRadius: 8
                }]
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: false }
                },
                scales: {
                  y: {
                    max: 100,
                    beginAtZero: true
                  }
                }
              }}
            />
          ) : (
            <p style={{ textAlign: 'center', color: '#94a3b8', padding: '20px' }}>
              No data available yet
            </p>
          )}
        </div>
      </div>

      {/* Quick Stats - 3 columns */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '15px',
        marginBottom: '20px'
      }}>
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
            {assessments.length}
          </div>
          <div style={{ fontSize: '12px', color: '#5a6a7a' }}>
            {assessments.length > 0 ? getTranslation('completed') : getTranslation('pending')}
          </div>
        </div>

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
        .professional-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
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
