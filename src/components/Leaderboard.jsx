import React, { useState, useEffect } from 'react';
import { getLeaderboard } from '../services/dbService';

const Leaderboard = ({ language }) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    setLoading(true);
    const result = await getLeaderboard();
    if (result.error) {
      setError(result.error);
    } else {
      setLeaderboard(result.data);
    }
    setLoading(false);
  };

  const getTranslation = (key) => {
    const translations = {
      title: { en: '🏆 Leaderboard', fr: '🏆 Classement', ar: '🏆 لوحة المتصدرين' },
      rank: { en: 'Rank', fr: 'Rang', ar: 'الترتيب' },
      user: { en: 'User', fr: 'Utilisateur', ar: 'المستخدم' },
      points: { en: 'Points', fr: 'Points', ar: 'النقاط' },
      completed: { en: 'Completed', fr: 'Complété', ar: 'مكتمل' },
      noData: { en: 'No data available yet. Start playing!', fr: 'Aucune donnée disponible. Commencez à jouer!', ar: 'لا توجد بيانات حتى الآن. ابدأ اللعب!' }
    };
    return translations[key]?.[language] || translations[key]?.en || key;
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '20px', color: '#5a6a7a' }}>Loading...</div>;
  }

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '20px',
      padding: '25px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
      marginTop: '20px'
    }}>
      <h3 style={{ fontSize: '20px', color: '#1a2a3a', marginBottom: '15px' }}>
        {getTranslation('title')}
      </h3>
      
      {error && (
        <div style={{ color: '#dc2626', padding: '10px', textAlign: 'center' }}>
          {error}
        </div>
      )}

      {leaderboard.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#5a6a7a', padding: '20px' }}>
          {getTranslation('noData')}
        </p>
      ) : (
        <div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '60px 1fr 80px 90px',
            gap: '10px',
            padding: '10px 15px',
            backgroundColor: '#f8fafc',
            borderRadius: '10px',
            fontWeight: '600',
            color: '#1a2a3a',
            fontSize: '13px',
            marginBottom: '10px'
          }}>
            <div>{getTranslation('rank')}</div>
            <div>{getTranslation('user')}</div>
            <div style={{ textAlign: 'center' }}>{getTranslation('points')}</div>
            <div style={{ textAlign: 'center' }}>{getTranslation('completed')}</div>
          </div>
          
          {leaderboard.slice(0, 10).map((user, index) => (
            <div
              key={user.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '60px 1fr 80px 90px',
                gap: '10px',
                padding: '12px 15px',
                borderBottom: index < Math.min(leaderboard.length, 10) - 1 ? '1px solid #e2e8f0' : 'none',
                alignItems: 'center',
                backgroundColor: index === 0 ? '#fef3c7' : (index === 1 ? '#f0fdf4' : (index === 2 ? '#eff6ff' : 'transparent')),
                borderRadius: '8px',
                fontSize: '14px'
              }}
            >
              <div style={{ fontWeight: '600', color: index < 3 ? '#2193b0' : '#475569' }}>
                {index === 0 ? '🥇' : (index === 1 ? '🥈' : (index === 2 ? '🥉' : `#${index + 1}`))}
              </div>
              <div style={{ fontWeight: '500' }}>
                {user.displayName || user.email || user.id.slice(0, 8)}
              </div>
              <div style={{ textAlign: 'center', fontWeight: '700', color: '#2193b0' }}>
                {user.score || 0}
              </div>
              <div style={{ textAlign: 'center', fontSize: '12px', color: '#5a6a7a' }}>
                {user.completedPrinciples?.length || 0}/5
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
