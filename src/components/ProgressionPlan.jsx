import React, { useState, useEffect } from 'react';
import { translations } from '../i18n/translations';

const ProgressionPlan = ({ user, language, completedPrinciples, score }) => {
  const [activeTab, setActiveTab] = useState('goals');
  const [userProgress, setUserProgress] = useState({
    level: 1,
    experience: 0,
    nextLevelXP: 100,
    skills: {
      seiri: 0,
      seiton: 0,
      seiso: 0,
      seiketsu: 0,
      shitsuke: 0
    }
  });

  const t = (key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  // Calculate user level based on score
  useEffect(() => {
    const xp = score * 2;
    const level = Math.floor(xp / 100) + 1;
    const nextLevelXP = level * 100;
    setUserProgress(prev => ({
      ...prev,
      level,
      experience: xp % 100,
      nextLevelXP
    }));
  }, [score]);

  // SMART Goals
  const smartGoals = [
    {
      id: 1,
      title: {
        en: 'Master Seiri (Sort)',
        fr: 'Maîtriser Seiri (Trier)',
        ar: 'إتقان سيري (الفرز)'
      },
      specific: {
        en: 'Remove all unnecessary items from workstation',
        fr: 'Retirer tous les éléments inutiles du poste de travail',
        ar: 'إزالة جميع العناصر غير الضرورية من محطة العمل'
      },
      measurable: {
        en: 'Reduce workspace clutter by 80%',
        fr: 'Réduire l\'encombrement de l\'espace de travail de 80%',
        ar: 'تقليل الفوضى في مساحة العمل بنسبة 80%'
      },
      achievable: {
        en: 'Daily 5-minute sorting routine',
        fr: 'Routine de tri quotidienne de 5 minutes',
        ar: 'روتين فرز يومي لمدة 5 دقائق'
      },
      relevant: {
        en: 'Creates organized and efficient workspace',
        fr: 'Crée un espace de travail organisé et efficace',
        ar: 'يخلق مساحة عمل منظمة وفعالة'
      },
      timeBound: {
        en: 'Complete within 2 weeks',
        fr: 'Terminer dans 2 semaines',
        ar: 'إكمال في غضون أسبوعين'
      },
      completed: completedPrinciples.includes('seiri'),
      progress: completedPrinciples.includes('seiri') ? 100 : 60
    },
    {
      id: 2,
      title: {
        en: 'Master Seiton (Set in Order)',
        fr: 'Maîtriser Seiton (Ranger)',
        ar: 'إتقان سيتون (الترتيب)'
      },
      specific: {
        en: 'Organize all tools and materials logically',
        fr: 'Organiser tous les outils et matériaux logiquement',
        ar: 'تنظيم جميع الأدوات والمواد بشكل منطقي'
      },
      measurable: {
        en: 'Reduce tool search time by 70%',
        fr: 'Réduire le temps de recherche d\'outils de 70%',
        ar: 'تقليل وقت البحث عن الأدوات بنسبة 70%'
      },
      achievable: {
        en: 'Implement shadow boards and labels',
        fr: 'Mettre en place des tableaux d\'ombre et des étiquettes',
        ar: 'تنفيذ لوحات الظل والملصقات'
      },
      relevant: {
        en: 'Improves workflow efficiency',
        fr: 'Améliore l\'efficacité du flux de travail',
        ar: 'يحسن كفاءة سير العمل'
      },
      timeBound: {
        en: 'Complete within 3 weeks',
        fr: 'Terminer dans 3 semaines',
        ar: 'إكمال في غضون 3 أسابيع'
      },
      completed: completedPrinciples.includes('seiton'),
      progress: completedPrinciples.includes('seiton') ? 100 : 40
    },
    {
      id: 3,
      title: {
        en: 'Master Seiso (Shine)',
        fr: 'Maîtriser Seiso (Nettoyer)',
        ar: 'إتقان سيسو (التنظيف)'
      },
      specific: {
        en: 'Establish daily cleaning routine',
        fr: 'Établir une routine de nettoyage quotidienne',
        ar: 'إنشاء روتين تنظيف يومي'
      },
      measurable: {
        en: 'Maintain 100% clean workstation daily',
        fr: 'Maintenir un poste de travail 100% propre quotidiennement',
        ar: 'الحفاظ على محطة عمل نظيفة 100% يومياً'
      },
      achievable: {
        en: '10-minute daily cleaning ritual',
        fr: 'Rituel de nettoyage quotidien de 10 minutes',
        ar: 'طقوس تنظيف يومية لمدة 10 دقائق'
      },
      relevant: {
        en: 'Ensures safety and quality',
        fr: 'Assure la sécurité et la qualité',
        ar: 'يضمن السلامة والجودة'
      },
      timeBound: {
        en: 'Complete within 4 weeks',
        fr: 'Terminer dans 4 semaines',
        ar: 'إكمال في غضون 4 أسابيع'
      },
      completed: completedPrinciples.includes('seiso'),
      progress: completedPrinciples.includes('seiso') ? 100 : 20
    },
    {
      id: 4,
      title: {
        en: 'Master Seiketsu (Standardize)',
        fr: 'Maîtriser Seiketsu (Standardiser)',
        ar: 'إتقان سيكيتسو (التوحيد)'
      },
      specific: {
        en: 'Create standardized work procedures',
        fr: 'Créer des procédures de travail standardisées',
        ar: 'إنشاء إجراءات عمل موحدة'
      },
      measurable: {
        en: 'Document 5 standard operating procedures',
        fr: 'Documenter 5 procédures opérationnelles standard',
        ar: 'توثيق 5 إجراءات تشغيل قياسية'
      },
      achievable: {
        en: 'Document one SOP per week',
        fr: 'Documenter une SOP par semaine',
        ar: 'توثيق إجراء تشغيل قياسي واحد في الأسبوع'
      },
      relevant: {
        en: 'Ensures consistency across teams',
        fr: 'Assure la cohérence entre les équipes',
        ar: 'يضمن الاتساق بين الفرق'
      },
      timeBound: {
        en: 'Complete within 5 weeks',
        fr: 'Terminer dans 5 semaines',
        ar: 'إكمال في غضون 5 أسابيع'
      },
      completed: completedPrinciples.includes('seiketsu'),
      progress: completedPrinciples.includes('seiketsu') ? 100 : 10
    },
    {
      id: 5,
      title: {
        en: 'Master Shitsuke (Sustain)',
        fr: 'Maîtriser Shitsuke (Maintenir)',
        ar: 'إتقان شيتسوكي (الاستدامة)'
      },
      specific: {
        en: 'Maintain 5S habits daily',
        fr: 'Maintenir les habitudes 5S quotidiennement',
        ar: 'الحفاظ على عادات 5S يومياً'
      },
      measurable: {
        en: 'Achieve 90% 5S audit score',
        fr: 'Atteindre 90% au score d\'audit 5S',
        ar: 'تحقيق 90% في درجة تدقيق 5S'
      },
      achievable: {
        en: 'Weekly self-audits and improvements',
        fr: 'Auto-audits et améliorations hebdomadaires',
        ar: 'التدقيق الذاتي والتحسينات الأسبوعية'
      },
      relevant: {
        en: 'Creates lasting organizational habits',
        fr: 'Crée des habitudes organisationnelles durables',
        ar: 'يخلق عادات تنظيمية دائمة'
      },
      timeBound: {
        en: 'Complete within 6 weeks',
        fr: 'Terminer dans 6 semaines',
        ar: 'إكمال في غضون 6 أسابيع'
      },
      completed: completedPrinciples.includes('shitsuke'),
      progress: completedPrinciples.includes('shitsuke') ? 100 : 5
    }
  ];

  // Skills tracking
  const skills = [
    { id: 'seiri', name: t('skillSeiri'), emoji: '📋', progress: completedPrinciples.includes('seiri') ? 100 : 40, color: '#FF6B6B' },
    { id: 'seiton', name: t('skillSeiton'), emoji: '📦', progress: completedPrinciples.includes('seiton') ? 100 : 30, color: '#4ECDC4' },
    { id: 'seiso', name: t('skillSeiso'), emoji: '🧹', progress: completedPrinciples.includes('seiso') ? 100 : 20, color: '#45B7D1' },
    { id: 'seiketsu', name: t('skillSeiketsu'), emoji: '📐', progress: completedPrinciples.includes('seiketsu') ? 100 : 10, color: '#96CEB4' },
    { id: 'shitsuke', name: t('skillShitsuke'), emoji: '🔄', progress: completedPrinciples.includes('shitsuke') ? 100 : 5, color: '#FFD93D' }
  ];

  // Recommendations based on progress
  const getRecommendations = () => {
    const recommendations = [];
    
    if (!completedPrinciples.includes('seiri')) {
      recommendations.push({
        title: t('reviewPrinciple'),
        description: t('practiceMore') + ' Seiri (Sort)',
        action: '📋 Start with Seiri',
        priority: 'high'
      });
    }
    
    if (completedPrinciples.includes('seiri') && !completedPrinciples.includes('seiton')) {
      recommendations.push({
        title: t('reviewPrinciple'),
        description: t('practiceMore') + ' Seiton (Set in Order)',
        action: '📦 Move to Seiton',
        priority: 'medium'
      });
    }
    
    if (completedPrinciples.length === 5) {
      recommendations.push({
        title: '🎉 Congratulations!',
        description: 'You have mastered all 5S principles!',
        action: '🏆 Claim your certificate',
        priority: 'low'
      });
    }
    
    if (recommendations.length === 0) {
      recommendations.push({
        title: '🌟 Keep Going!',
        description: 'You\'re making great progress. Continue practicing 5S daily.',
        action: '💪 Stay consistent',
        priority: 'low'
      });
    }
    
    return recommendations;
  };

  const recommendations = getRecommendations();
  const totalProgress = Math.round((completedPrinciples.length / 5) * 100);

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
          <h2 style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', color: '#1a2a3a' }}>
            {t('progressionPlan')}
          </h2>
          <p style={{ fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)', color: '#5a6a7a' }}>
            {t('personalizedPath')}
          </p>
        </div>
        <div style={{
          padding: '10px 20px',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          borderRadius: '12px',
          color: 'white',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '11px', opacity: 0.8 }}>{t('currentLevel')}</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>⭐ {userProgress.level}</div>
        </div>
      </div>

      {/* Progress Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '15px',
        marginBottom: '20px'
      }}>
        <div style={{ padding: '15px', background: '#f8fafc', borderRadius: '12px', textAlign: 'center' }}>
          <div style={{ fontSize: '12px', color: '#5a6a7a' }}>{t('completionRate')}</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#22c55e' }}>{totalProgress}%</div>
        </div>
        <div style={{ padding: '15px', background: '#f8fafc', borderRadius: '12px', textAlign: 'center' }}>
          <div style={{ fontSize: '12px', color: '#5a6a7a' }}>{t('timeSpent')}</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#667eea' }}>{score * 2}min</div>
        </div>
        <div style={{ padding: '15px', background: '#f8fafc', borderRadius: '12px', textAlign: 'center' }}>
          <div style={{ fontSize: '12px', color: '#5a6a7a' }}>{t('nextLevel')}</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#f59e0b' }}>⭐ {userProgress.level + 1}</div>
        </div>
      </div>

      {/* Experience Bar */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '12px',
          color: '#5a6a7a',
          marginBottom: '5px'
        }}>
          <span>Level {userProgress.level}</span>
          <span>{userProgress.experience} / {userProgress.nextLevelXP} XP</span>
        </div>
        <div style={{
          width: '100%',
          height: '10px',
          backgroundColor: '#e2e8f0',
          borderRadius: '5px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${(userProgress.experience / userProgress.nextLevelXP) * 100}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #667eea, #764ba2, #f093fb)',
            borderRadius: '5px',
            transition: 'width 0.5s ease'
          }} />
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '20px',
        borderBottom: '2px solid #e2e8f0',
        paddingBottom: '10px',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => setActiveTab('goals')}
          style={{
            padding: '8px 20px',
            backgroundColor: activeTab === 'goals' ? '#667eea' : 'transparent',
            color: activeTab === 'goals' ? 'white' : '#475569',
            border: activeTab === 'goals' ? '2px solid #667eea' : '2px solid transparent',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            transition: 'all 0.3s'
          }}
        >
          🎯 {t('smartGoals')}
        </button>
        <button
          onClick={() => setActiveTab('skills')}
          style={{
            padding: '8px 20px',
            backgroundColor: activeTab === 'skills' ? '#667eea' : 'transparent',
            color: activeTab === 'skills' ? 'white' : '#475569',
            border: activeTab === 'skills' ? '2px solid #667eea' : '2px solid transparent',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            transition: 'all 0.3s'
          }}
        >
          📊 {t('skillsTracking')}
        </button>
        <button
          onClick={() => setActiveTab('recommendations')}
          style={{
            padding: '8px 20px',
            backgroundColor: activeTab === 'recommendations' ? '#667eea' : 'transparent',
            color: activeTab === 'recommendations' ? 'white' : '#475569',
            border: activeTab === 'recommendations' ? '2px solid #667eea' : '2px solid transparent',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            transition: 'all 0.3s'
          }}
        >
          💡 {t('recommendations')}
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'goals' && (
        <div>
          {smartGoals.map((goal, index) => (
            <div key={goal.id} style={{
              padding: '15px 20px',
              marginBottom: '12px',
              backgroundColor: goal.completed ? '#f0fdf4' : '#f8fafc',
              borderRadius: '12px',
              border: goal.completed ? '2px solid #22c55e' : '1px solid #e2e8f0',
              transition: 'all 0.3s'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '10px',
                flexWrap: 'wrap',
                gap: '10px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '20px' }}>{goal.completed ? '✅' : '🎯'}</span>
                  <span style={{ fontWeight: '600', fontSize: '16px' }}>
                    {goal.title[language] || goal.title.en}
                  </span>
                </div>
                <span style={{
                  fontSize: '12px',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  backgroundColor: goal.completed ? '#dcfce7' : '#fef3c7',
                  color: goal.completed ? '#16a34a' : '#d97706'
                }}>
                  {goal.completed ? t('goalCompleted') : t('goalInProgress')}
                </span>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '8px',
                fontSize: '13px',
                color: '#475569'
              }}>
                <div><strong>🎯 {t('specific')}:</strong> {goal.specific[language] || goal.specific.en}</div>
                <div><strong>📊 {t('measurable')}:</strong> {goal.measurable[language] || goal.measurable.en}</div>
                <div><strong>✅ {t('achievable')}:</strong> {goal.achievable[language] || goal.achievable.en}</div>
                <div><strong>💡 {t('relevant')}:</strong> {goal.relevant[language] || goal.relevant.en}</div>
                <div><strong>⏱️ {t('timeBound')}:</strong> {goal.timeBound[language] || goal.timeBound.en}</div>
              </div>

              {!goal.completed && (
                <div style={{ marginTop: '10px' }}>
                  <div style={{
                    width: '100%',
                    height: '6px',
                    backgroundColor: '#e2e8f0',
                    borderRadius: '3px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${goal.progress}%`,
                      height: '100%',
                      backgroundColor: '#667eea',
                      borderRadius: '3px',
                      transition: 'width 0.5s ease'
                    }} />
                  </div>
                  <div style={{ fontSize: '11px', color: '#5a6a7a', marginTop: '4px' }}>
                    {goal.progress}% complete
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'skills' && (
        <div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '15px'
          }}>
            {skills.map(skill => (
              <div key={skill.id} style={{
                padding: '15px',
                backgroundColor: '#f8fafc',
                borderRadius: '12px',
                textAlign: 'center',
                border: '1px solid #e2e8f0',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{ fontSize: '36px' }}>{skill.emoji}</div>
                <div style={{ fontSize: '14px', fontWeight: '600', margin: '8px 0' }}>
                  {skill.name}
                </div>
                <div style={{ fontSize: '24px', fontWeight: '700', color: skill.color }}>
                  {skill.progress}%
                </div>
                <div style={{
                  width: '100%',
                  height: '6px',
                  backgroundColor: '#e2e8f0',
                  borderRadius: '3px',
                  marginTop: '8px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${skill.progress}%`,
                    height: '100%',
                    backgroundColor: skill.color,
                    borderRadius: '3px',
                    transition: 'width 0.5s ease'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'recommendations' && (
        <div>
          {recommendations.map((rec, index) => (
            <div key={index} style={{
              padding: '15px 20px',
              marginBottom: '12px',
              backgroundColor: rec.priority === 'high' ? '#fef3c7' : '#f8fafc',
              borderRadius: '12px',
              border: rec.priority === 'high' ? '2px solid #f59e0b' : '1px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '20px' }}>💡</span>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '16px' }}>
                    {rec.title}
                  </div>
                  <div style={{ fontSize: '14px', color: '#5a6a7a', marginTop: '4px' }}>
                    {rec.description}
                  </div>
                  <div style={{
                    marginTop: '8px',
                    padding: '6px 16px',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    color: 'white',
                    borderRadius: '20px',
                    display: 'inline-block',
                    fontSize: '13px',
                    fontWeight: '500'
                  }}>
                    {rec.action}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default ProgressionPlan;
