import React, { useState, useEffect } from 'react';
import FirebaseLogin from './components/FirebaseLogin';
import Game5S from './components/Game5S';
import { onAuthStateChange } from './services/authService';

const App = () => {
  const [user, setUser] = useState(null);
  const [language, setLanguage] = useState('en');
  const [gameState, setGameState] = useState('login');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((firebaseUser) => {
      setLoading(false);
      if (firebaseUser) {
        setUser(firebaseUser);
        setGameState('game');
      } else {
        setUser(null);
        setGameState('login');
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = (firebaseUser) => {
    setUser(firebaseUser);
    setGameState('game');
  };

  const handleLogout = () => {
    setUser(null);
    setGameState('login');
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh', 
        fontSize: '18px', 
        color: '#2193b0' 
      }}>
        🔥 Loading...
      </div>
    );
  }

  if (gameState === 'login') {
    return (
      <FirebaseLogin 
        onLogin={handleLogin}
        language={language}
        setLanguage={setLanguage}
      />
    );
  }

  return (
    <Game5S 
      user={user}
      onLogout={handleLogout}
      language={language}
      setLanguage={setLanguage}
    />
  );
};

export default App;
