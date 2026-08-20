import React, { useState } from 'react';
import { OPERATEURS } from './operators';

const App = () => {
  const [matricule, setMatricule] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [gameState, setGameState] = useState('login'); // 'login' | 'game'

  // 5S Game State
  const [selected5S, setSelected5S] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const found = OPERATEURS.find(op => op.matricule === matricule.trim());
    if (found) {
      setUser(found);
      setError('');
      setGameState('game');
      setSelected5S(null);
      setScore(0);
      setShowResult(false);
    } else {
      setError('Matricule non trouvé. Veuillez réessayer.');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setMatricule('');
    setGameState('login');
    setSelected5S(null);
    setScore(0);
    setShowResult(false);
  };

  // 5S Principles
  const principles = [
    { id: 'seiri', name: 'Seiri (Trier)', emoji: '📋', description: 'Éliminer ce qui est inutile' },
    { id: 'seiton', name: 'Seiton (Ranger)', emoji: '📦', description: 'Chaque chose à sa place' },
    { id: 'seiso', name: 'Seiso (Nettoyer)', emoji: '🧹', description: 'Maintenir la propreté' },
    { id: 'seiketsu', name: 'Seiketsu (Standardiser)', emoji: '📐', description: 'Créer des standards' },
    { id: 'shitsuke', name: 'Shitsuke (Maintenir)', emoji: '🔄', description: 'Respecter les règles' }
  ];

  const handle5SSelect = (principle) => {
    setSelected5S(principle);
    setScore(score + 10);
    setShowResult(true);
    setTimeout(() => {
      setShowResult(false);
    }, 2000);
  };

  // Login Page
  if (gameState === 'login') {
    return (
      <div style={{
        maxWidth: '450px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '24px',
        padding: '40px 35px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
        border: '1px solid rgba(0,0,0,0.05)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{
            fontSize: '48px',
            marginBottom: '10px',
            background: 'linear-gradient(135deg, #2193b0, #6dd5ed)',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}>5S</div>
          <h1 style={{ fontSize: '28px', fontWeight: '600', color: '#1a2a3a', marginBottom: '8px' }}>
            Méthodologie 5S
          </h1>
          <p style={{ color: '#5a6a7a', fontSize: '15px' }}>
            Connectez-vous avec votre matricule
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontWeight: '500',
              color: '#2a3a4a',
              marginBottom: '8px',
              fontSize: '14px'
            }}>
              Matricule
            </label>
            <input
              type="text"
              value={matricule}
              onChange={(e) => setMatricule(e.target.value)}
              placeholder="Ex: D000010"
              style={{
                width: '100%',
                padding: '14px 16px',
                border: '2px solid #e2e8f0',
                borderRadius: '12px',
                fontSize: '16px',
                transition: 'all 0.2s',
                outline: 'none',
                backgroundColor: '#f8fafc'
              }}
              onFocus={(e) => e.target.style.borderColor = '#2193b0'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>

          {error && (
            <div style={{
              backgroundColor: '#fee2e2',
              color: '#dc2626',
              padding: '12px 16px',
              borderRadius: '10px',
              marginBottom: '20px',
              fontSize: '14px'
            }}>
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '15px',
              backgroundColor: '#2193b0',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              boxShadow: '0 4px 12px rgba(33,147,176,0.3)'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#1a7a94'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#2193b0'}
          >
            Se connecter
          </button>
        </form>

        <div style={{
          marginTop: '25px',
          paddingTop: '20px',
          borderTop: '1px solid #e2e8f0',
          textAlign: 'center'
        }}>
          <p style={{ color: '#5a6a7a', fontSize: '13px' }}>
            Les opérateurs sont disponibles dans la base de données
          </p>
          <p style={{ color: '#8a9aaa', fontSize: '12px', marginTop: '4px' }}>
            Exemples: D000010, D000100, D000103
          </p>
        </div>
      </div>
    );
  }

  // 5S Game Page
  return (
    <div style={{
      maxWidth: '900px',
      margin: '0 auto'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '20px',
        padding: '20px 30px',
        marginBottom: '25px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h2 style={{ fontSize: '20px', color: '#1a2a3a' }}>
            🎯 5S Game
          </h2>
          <p style={{ color: '#5a6a7a', fontSize: '14px' }}>
            {user?.prenom} {user?.nom} • {user?.matricule}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#2193b0' }}>
              {score}
            </div>
            <div style={{ fontSize: '12px', color: '#5a6a7a' }}>Points</div>
          </div>
          <button
            onClick={handleLogout}
            style={{
              padding: '8px 18px',
              backgroundColor: '#f1f5f9',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: '500',
              color: '#475569',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#e2e8f0'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#f1f5f9'}
          >
            Déconnexion
          </button>
        </div>
      </div>

      {/* Game Area */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '20px',
        padding: '30px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h3 style={{ fontSize: '22px', color: '#1a2a3a', marginBottom: '6px' }}>
            🧩 Sélectionnez un principe 5S
          </h3>
          <p style={{ color: '#5a6a7a', fontSize: '15px' }}>
            Cliquez sur un principe pour gagner des points
          </p>
        </div>

        {showResult && selected5S && (
          <div style={{
            backgroundColor: '#d1fae5',
            color: '#065f46',
            padding: '16px',
            borderRadius: '12px',
            marginBottom: '25px',
            textAlign: 'center',
            fontSize: '16px',
            fontWeight: '500',
            animation: 'fadeIn 0.5s'
          }}>
            ✅ +10 points pour {selected5S.name} !
          </div>
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '16px'
        }}>
          {principles.map((p) => (
            <button
              key={p.id}
              onClick={() => handle5SSelect(p)}
              style={{
                padding: '20px 10px',
                backgroundColor: selected5S?.id === p.id ? '#e0f2fe' : '#f8fafc',
                border: selected5S?.id === p.id ? '3px solid #2193b0' : '2px solid #e2e8f0',
                borderRadius: '16px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                textAlign: 'center',
                minHeight: '130px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                if (!selected5S || selected5S.id !== p.id) {
                  e.currentTarget.style.borderColor = '#94a3b8';
                  e.currentTarget.style.backgroundColor = '#f1f5f9';
                }
              }}
              onMouseLeave={(e) => {
                if (!selected5S || selected5S.id !== p.id) {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.backgroundColor = '#f8fafc';
                }
              }}
            >
              <div style={{ fontSize: '36px' }}>{p.emoji}</div>
              <div style={{ fontWeight: '600', fontSize: '14px', color: '#1a2a3a' }}>
                {p.name}
              </div>
              <div style={{ fontSize: '11px', color: '#5a6a7a' }}>
                {p.description}
              </div>
            </button>
          ))}
        </div>

        <div style={{
          marginTop: '30px',
          paddingTop: '20px',
          borderTop: '1px solid #e2e8f0',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '13px', color: '#8a9aaa' }}>
            🏆 Continuez à apprendre la méthodologie 5S !
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default App;
