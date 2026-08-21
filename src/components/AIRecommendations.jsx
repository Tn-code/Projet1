import React, { useState, useEffect } from 'react';
import { getUserProgress } from '../services/dbService';

const AIRecommendations = ({ user, language }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateRecommendations();
  }, [user]);

  const generateRecommendations = async () => {
    setLoading(true);
    const result = await getUserProgress(user?.uid);
    const userData = result.data;
    
    const recs = [];
    
    // Analyze user progress
    if (userData) {
      const completed = userData.completedPrinciples || [];
      const score = userData.score || 0;
      
      // Check missing principles
      const allPrinciples = ['seiri', 'seiton', 'seiso', 'seiketsu', 'shitsuke'];
      const missing = allPrinciples.filter(p => !completed.includes(p));
      
      if (missing.length > 0) {
        recs.push({
          type: 'missing',
          priority: 'high',
          title: 'Complete Missing Principles',
          description: `You haven't mastered ${missing.length} principles yet. Start with ${missing[0]}.`,
          action: `Focus on ${missing.join(', ')}`,
          icon: '🎯'
        });
      }
      
      // Check score
      if (score < 30) {
        recs.push({
          type: 'score',
          priority: 'high',
          title: 'Improve Your Score',
          description: 'Your score is below average. Review the 5S principles again.',
          action: 'Take the assessment again',
          icon: '📈'
        });
      } else if (score >= 30 && score < 50) {
        recs.push({
          type: 'score',
          priority: 'medium',
          title: 'Good Progress!',
          description: 'You\'re on the right track. Keep practicing to reach expert level.',
          action: 'Continue learning',
          icon: '🌟'
        });
      } else if (score >= 50) {
        recs.push({
          type: 'score',
          priority: 'low',
          title: 'Excellent Performance!',
          description: 'You have mastered the 5S methodology. Time to apply it in practice.',
          action: 'Share your knowledge with others',
          icon: '🏆'
        });
      }
      
      // Check time since last activity
      if (userData.lastUpdated) {
        const last = new Date(userData.lastUpdated);
        const now = new Date();
        const days = Math.floor((now - last) / (1000 * 60 * 60 * 24));
        if (days > 7) {
          recs.push({
            type: 'inactivity',
            priority: 'medium',
            title: 'Time to Practice!',
            description: `It's been ${days} days since your last activity. Keep your skills sharp!`,
            action: 'Review the principles',
            icon: '⏰'
          });
        }
      }
    }
    
    // Default recommendation if no data
    if (recs.length === 0) {
      recs.push({
        type: 'default',
        priority: 'low',
        title: 'Keep Learning!',
        description: 'Continue your 5S journey and become an expert.',
        action: 'Explore the training modules',
        icon: '📚'
      });
    }
    
    setRecommendations(recs);
    setLoading(false);
  };

  const getTranslation = (key) => {
    const translations = {
      title: { en: '🤖 AI Recommendations', fr: '🤖 Recommandations IA', ar: '🤖 توصيات الذكاء الاصطناعي' },
      personalized: { en: 'Personalized Learning Recommendations', fr: 'Recommandations d\'Apprentissage Personnalisées', ar: 'توصيات التعلم المخصصة' },
      highPriority: { en: 'High Priority', fr: 'Haute Priorité', ar: 'أولوية عالية' },
      mediumPriority: { en: 'Medium Priority', fr: 'Priorité Moyenne', ar: 'أولوية متوسطة' },
      lowPriority: { en: 'Low Priority', fr: 'Priorité Faible', ar: 'أولوية منخفضة' },
      noRecommendations: { en: 'No recommendations available', fr: 'Aucune recommandation disponible', ar: 'لا توجد توصيات' }
    };
    return translations[key]?.[language] || translations[key]?.en || key;
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <div className="spinner" />
        <p>Generating recommendations...</p>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '25px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
      marginBottom: '20px'
    }}>
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', color: '#1a2a3a' }}>
          {getTranslation('title')}
        </h3>
        <p style={{ fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)', color: '#5a6a7a' }}>
          {getTranslation('personalized')}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {recommendations.map((rec, index) => (
          <div
            key={index}
            style={{
              padding: '16px 20px',
              backgroundColor: rec.priority === 'high' ? '#fef3c7' :
                              rec.priority === 'medium' ? '#e0f2fe' : '#f8fafc',
              borderRadius: '12px',
              border: rec.priority === 'high' ? '2px solid #f59e0b' :
                      rec.priority === 'medium' ? '2px solid #3b82f6' : '1px solid #e2e8f0',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateX(4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ fontSize: '24px' }}>{rec.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '8px'
                }}>
                  <div style={{ fontWeight: '600', fontSize: '16px', color: '#1a2a3a' }}>
                    {rec.title}
                  </div>
                  <span style={{
                    fontSize: '11px',
                    padding: '2px 12px',
                    borderRadius: '12px',
                    backgroundColor: rec.priority === 'high' ? '#f59e0b' :
                                    rec.priority === 'medium' ? '#3b82f6' : '#94a3b8',
                    color: 'white',
                    fontWeight: '500'
                  }}>
                    {rec.priority === 'high' ? getTranslation('highPriority') :
                     rec.priority === 'medium' ? getTranslation('mediumPriority') :
                     getTranslation('lowPriority')}
                  </span>
                </div>
                <div style={{ fontSize: '14px', color: '#5a6a7a', marginTop: '4px' }}>
                  {rec.description}
                </div>
                <div style={{
                  marginTop: '8px',
                  padding: '6px 16px',
                  backgroundColor: '#667eea',
                  color: 'white',
                  borderRadius: '20px',
                  display: 'inline-block',
                  fontSize: '13px',
                  fontWeight: '500'
                }}>
                  💡 {rec.action}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIRecommendations;
