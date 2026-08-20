import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import PrincipleCard from './PrincipleCard';
import PrincipleDetails from './PrincipleDetails';
import Dashboard from './Dashboard';
import Certificate from './Certificate';
import Leaderboard from './Leaderboard';
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
  const [showSidebar, setShowSidebar] = useState(true);

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

  // Close certificate handler - THIS IS THE KEY FIX
  const handleCloseCertificate = () => {
    console.log('Closing certificate...');
    setShowCertificate(false);
  };

  // Show certificate when all principles are completed
  useEffect(() => {
    if (completedPrinciples.length === 5 && !showCertificate) {
      console.log('All principles completed! Showing certificate...');
      setShowCertificate(true);
      // Save progress to Firebase
      saveUserProgress(user.uid, {
        completedPrinciples: completedPrinciples,
        score: score
      });
    }
  }, [completedPrinciples, score, user]);

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
          width: '60px',
          height: '60px',
          border: '4px solid var(--gray-200)',
          borderTop: '4px solid #667eea',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <p style={{ color: 'var(--gray-500)' }}>Loading your progress...</p>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--gray-50)' }}>
      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        style={{
          position: 'fixed',
          top: '20px',
          left: showSidebar ? '290px' : '20px',
          zIndex: 1000,
          padding: '12px 16px',
          backgroundColor: 'white',
          color: 'var(--gray-700)',
          border: '1px solid var(--gray-200)',
          borderRadius: '12px',
          cursor: 'pointer',
          fontSize: '18px',
          transition: 'left 0.3s ease',
          boxShadow: 'var(--shadow-md)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        {showSidebar ? '◀' : '▶'}
        <span style={{ fontSize: '13px', fontWeight: '500' }}>
          {showSidebar ? 'Close' : 'Menu'}
        </span>
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
        maxWidth: '1100px', 
        margin: '0 auto',
        padding: '30px 20px',
        paddingLeft: showSidebar ? '310px' : '30px',
        transition: 'padding-left 0.3s ease'
      }}>
        {/* Header */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '25px 30px',
          marginBottom: '25px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          animation: 'fadeInUp 0.5s ease'
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
                fontSize: '24px',
                fontWeight: '700',
                color: 'var(--gray-800)',
                marginBottom: '4px'
              }}>
                {getTranslation('title')}
              </h1>
              <p style={{ color: 'var(--gray-500)', fontSize: '14px' }}>
                {getTranslation('subtitle')}
              </p>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px'
            }}>
              <div style={{
                padding: '8px 16px',
                backgroundColor: '#f0f4ff',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '11px', color: 'var(--gray-500)' }}>Score</div>
                <div style={{ fontSize: '22px', fontWeight: '700', color: '#667eea' }}>
                  {score}
                </div>
              </div>
              <div style={{
                padding: '8px 16px',
                backgroundColor: '#f0fdf4',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '11px', color: 'var(--gray-500)' }}>Progress</div>
                <div style={{ fontSize: '22px', fontWeight: '700', color: '#22c55e' }}>
                  {Math.round((completedPrinciples.length / 5) * 100)}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard */}
        <Dashboard 
          user={user} 
          totalScore={score} 
          completedPrinciples={completedPrinciples.length}
          language={language}
        />

        {/* Game Area */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '30px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          animation: 'fadeInUp 0.6s ease'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '25px',
            flexWrap: 'wrap',
            gap: '10px'
          }}>
            <div>
              <h3 style={{ fontSize: '20px', color: 'var(--gray-800)' }}>
                📚 {getTranslation('totalPrinciples')}
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--gray-500)' }}>
                {getTranslation('tapToLearn')}
              </p>
            </div>
            <div style={{
              fontSize: '13px',
              color: 'var(--gray-500)',
              backgroundColor: 'var(--gray-50)',
              padding: '6px 14px',
              borderRadius: '20px'
            }}>
              {completedPrinciples.length}/5 completed
            </div>
          </div>

          {showResult && selectedPrinciple && (
            <div style={{
              backgroundColor: '#d1fae5',
              color: '#065f46',
              padding: '16px 20px',
              borderRadius: '12px',
              marginBottom: '20px',
              textAlign: 'center',
              fontSize: '16px',
              fontWeight: '500',
              animation: 'fadeInUp 0.5s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}>
              <span>✅</span>
              +10 {getTranslation('scoreGain')} <strong>{selectedPrinciple.name[language]}</strong>!
              {completedPrinciples.includes(selectedPrinciple.id) && ' 🎉 Already completed!'}
            </div>
          )}

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px'
          }}>
            {PRINCIPLES.map((principle) => (
              <PrincipleCard
                key={principle.id}
                principle={principle}
                language={language}
                isSelected={selectedPrinciple?.id === principle.id}
                isCompleted={completedPrinciples.includes(principle.id)}
                onSelect={handlePrincipleSelect}
              />
            ))}
          </div>

          {showDetails && selectedPrinciple && (
            <PrincipleDetails
              principle={selectedPrinciple}
              language={language}
              onClose={handleCloseDetails}
            />
          )}

          <div style={{
            marginTop: '30px',
            paddingTop: '20px',
            borderTop: '2px solid var(--gray-100)',
            textAlign: 'center'
          }}>
            <p style={{ fontSize: '14px', color: 'var(--gray-500)' }}>
              {getTranslation('keepLearning')}
            </p>
          </div>
        </div>

        {/* Leaderboard */}
        <Leaderboard language={language} />

        {/* Certificate Modal */}
        {showCertificate && (
          <Certificate 
            user={user} 
            score={score} 
            onClose={handleCloseCertificate}
            language={language}
          />
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          div[style*="paddingLeft"] {
            padding-left: 20px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Game5S;
