import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './Sidebar';
import PrincipleCard from './PrincipleCard';
import PrincipleDetails from './PrincipleDetails';
import Dashboard from './Dashboard';
import Certificate from './Certificate';
import { PRINCIPLES } from '../data/principles';
import { 
  getUserProgress, 
  saveUserProgress, 
  updateUserScore,
  addCompletedPrinciple 
} from '../services/dbService';
import { logout } from '../services/authService';

const Game5S = ({ user, onLogout, language, setLanguage }) => {
  const [selectedPrinciple, setSelectedPrinciple] = useState(null);
  const [score, setScore] = useState(0);
  const [completedPrinciples, setCompletedPrinciples] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(window.innerWidth >= 641);
  const [certificateShown, setCertificateShown] = useState(false);

  // Handle window resize for responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 641) {
        setShowSidebar(true);
      } else {
        setShowSidebar(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    loadUserData();
  }, [user]);

  const loadUserData = async () => {
    setLoading(true);
    const result = await getUserProgress(user.uid);
    if (result.data) {
      setScore(result.data.score || 0);
      setCompletedPrinciples(result.data.completedPrinciples || []);
    }
    setLoading(false);
  };

  const getTranslation = (key) => {
    const translations = {
      title: { en: '🎯 5S Learning Journey', fr: '🎯 Parcours d\'Apprentissage 5S', ar: '🎯 رحلة تعلم 5S' },
      subtitle: { en: 'Master each principle to become a 5S expert!', fr: 'Maîtrisez chaque principe pour devenir un expert 5S!', ar: 'أتقن كل مبدأ لتصبح خبيراً في 5S!' },
      scoreGain: { en: 'Points earned for', fr: 'Points gagnés pour', ar: 'نقاط مكتسبة لـ' },
      keepLearning: { en: '🌟 Keep learning and growing with 5S!', fr: '🌟 Continuez à apprendre et à grandir avec la 5S!', ar: '🌟 استمر في التعلم والنمو مع 5S!' },
      totalPrinciples: { en: '5 Principles to Master', fr: '5 Principes à Maîtriser', ar: '5 مبادئ لإتقانها' },
      tapToLearn: { en: 'Tap a card to start learning', fr: 'Appuyez sur une carte pour commencer', ar: 'انقر على بطاقة لبدء التعلم' }
    };
    return translations[key]?.[language] || translations[key]?.en || key;
  };

  const handlePrincipleSelect = async (principle) => {
    setSelectedPrinciple(principle);
    
    if (!completedPrinciples.includes(principle.id)) {
      const newScore = score + 10;
      setScore(newScore);
      setCompletedPrinciples([...completedPrinciples, principle.id]);
      
      await updateUserScore(user.uid, newScore);
      await addCompletedPrinciple(user.uid, principle.id);
    }
    
    setShowResult(true);
    setShowDetails(true);
    setTimeout(() => {
      setShowResult(false);
    }, 2000);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  const handleLogout = async () => {
    await logout();
    onLogout();
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  // Close certificate handler
  const handleCloseCertificate = useCallback(() => {
    console.log('🔴 Closing certificate...');
    setShowCertificate(false);
    setCertificateShown(true);
  }, []);

  // Show certificate when all principles are completed
  useEffect(() => {
    if (completedPrinciples.length === 5 && !showCertificate && !certificateShown) {
      console.log('🏆 All principles completed! Showing certificate...');
      setShowCertificate(true);
      // Save progress to Firebase
      saveUserProgress(user.uid, {
        completedPrinciples: completedPrinciples,
        score: score
      });
    }
  }, [completedPrinciples, score, user, showCertificate, certificateShown]);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '4px solid #e2e8f0',
          borderTop: '4px solid #667eea',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <p style={{ color: '#5a6a7a' }}>Loading your progress...</p>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8fafc',
      paddingBottom: '30px'
    }}>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="menu-toggle"
        style={{
          position: 'fixed',
          top: '10px',
          left: '10px',
          zIndex: 1000,
          padding: '10px 14px',
          background: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: '10px',
          cursor: 'pointer',
          fontSize: '20px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          display: window.innerWidth >= 641 ? 'none' : 'block'
        }}
      >
        ☰
      </button>

      {/* Desktop Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        style={{
          position: 'fixed',
          top: '20px',
          left: showSidebar ? '290px' : '20px',
          zIndex: 1000,
          padding: '8px 12px',
          background: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '16px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          transition: 'left 0.3s ease',
          display: window.innerWidth >= 641 ? 'block' : 'none'
        }}
      >
        {showSidebar ? '◀' : '▶'}
      </button>

      {/* Sidebar */}
      <Sidebar 
        user={user}
        language={language}
        setLanguage={setLanguage}
        onLogout={handleLogout}
        score={score}
        completedPrinciples={completedPrinciples.length}
        isOpen={showSidebar}
        toggleSidebar={toggleSidebar}
      />

      {/* Main Content */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        padding: '20px 15px',
        paddingTop: window.innerWidth >= 641 ? '30px' : '70px',
        paddingLeft: window.innerWidth >= 641 && showSidebar ? '300px' : '20px',
        transition: 'padding-left 0.3s ease'
      }}>
        {/* Header - Professional Design */}
        <div className="professional-card animate-fadeInUp" style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '25px 30px',
          marginBottom: '25px',
          borderRadius: '16px',
          color: 'white'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '15px'
          }}>
            <div>
              <h1 style={{
                fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
                fontWeight: '700',
                marginBottom: '5px'
              }}>
                {getTranslation('title')}
              </h1>
              <p style={{ 
                fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                opacity: 0.9
              }}>
                {getTranslation('subtitle')}
              </p>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              flexWrap: 'wrap'
            }}>
              <div style={{
                padding: '10px 20px',
                backgroundColor: 'rgba(255,255,255,0.15)',
                borderRadius: '12px',
                textAlign: 'center',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{ fontSize: '11px', opacity: 0.8 }}>Score</div>
                <div style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: '700' }}>
                  {score}
                </div>
              </div>
              <div style={{
                padding: '10px 20px',
                backgroundColor: 'rgba(255,255,255,0.15)',
                borderRadius: '12px',
                textAlign: 'center',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{ fontSize: '11px', opacity: 0.8 }}>Progress</div>
                <div style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: '700' }}>
                  {Math.round((completedPrinciples.length / 5) * 100)}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard with Charts and Analytics */}
        <Dashboard 
          user={user} 
          totalScore={score} 
          completedPrinciples={completedPrinciples.length}
          language={language}
        />

        {/* Game Area */}
        <div className="professional-card animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            flexWrap: 'wrap',
            gap: '10px'
          }}>
            <div>
              <h3 style={{ 
                fontSize: 'clamp(1.1rem, 3vw, 1.3rem)', 
                color: '#1a2a3a' 
              }}>
                📚 {getTranslation('totalPrinciples')}
              </h3>
              <p style={{ fontSize: 'clamp(0.8rem, 2vw, 0.9rem)', color: '#5a6a7a' }}>
                {getTranslation('tapToLearn')}
              </p>
            </div>
            <div style={{
              fontSize: 'clamp(0.7rem, 1.5vw, 0.85rem)',
              color: '#5a6a7a',
              backgroundColor: '#f8fafc',
              padding: '6px 16px',
              borderRadius: '20px',
              border: '1px solid #e2e8f0'
            }}>
              {completedPrinciples.length}/5 completed
            </div>
          </div>

          {showResult && selectedPrinciple && (
            <div className="animate-fadeInUp" style={{
              backgroundColor: '#d1fae5',
              color: '#065f46',
              padding: '14px 20px',
              borderRadius: '10px',
              marginBottom: '16px',
              textAlign: 'center',
              fontSize: 'clamp(0.85rem, 2vw, 1rem)',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              flexWrap: 'wrap',
              border: '1px solid #86efac'
            }}>
              <span>✅</span>
              +10 {getTranslation('scoreGain')} <strong>{selectedPrinciple.name[language]}</strong>!
              {completedPrinciples.includes(selectedPrinciple.id) && ' 🎉 Already completed!'}
            </div>
          )}

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(150px, 25vw, 200px), 1fr))',
            gap: 'clamp(12px, 2vw, 20px)'
          }}>
            {PRINCIPLES.map((principle, index) => (
              <div key={principle.id} style={{ animationDelay: `${index * 0.1}s` }} className="animate-fadeInUp">
                <PrincipleCard
                  principle={principle}
                  language={language}
                  isSelected={selectedPrinciple?.id === principle.id}
                  isCompleted={completedPrinciples.includes(principle.id)}
                  onSelect={handlePrincipleSelect}
                />
              </div>
            ))}
          </div>

          {showDetails && selectedPrinciple && (
            <div className="animate-fadeInUp">
              <PrincipleDetails
                principle={selectedPrinciple}
                language={language}
                onClose={handleCloseDetails}
              />
            </div>
          )}

          <div style={{
            marginTop: '30px',
            paddingTop: '20px',
            borderTop: '2px solid #f1f5f9',
            textAlign: 'center'
          }}>
            <p style={{ 
              fontSize: 'clamp(0.8rem, 2vw, 0.95rem)', 
              color: '#5a6a7a' 
            }}>
              {getTranslation('keepLearning')}
            </p>
          </div>
        </div>

        {/* Certificate */}
        {showCertificate && (
          <div className="animate-fadeInUp">
            <Certificate 
              user={user} 
              score={score} 
              onClose={handleCloseCertificate}
              language={language}
            />
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 640px) {
          .menu-toggle {
            display: block !important;
          }
          div[style*="paddingLeft"] {
            padding-left: 20px !important;
          }
        }
        @media (min-width: 641px) {
          .menu-toggle {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Game5S;
