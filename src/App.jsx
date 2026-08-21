import React, { useState, useEffect } from 'react';
import FirebaseLogin from './components/FirebaseLogin';
import Game5S from './components/Game5S';
import AdminDashboard from './components/AdminDashboard';
import { onAuthStateChange } from './services/authService';

const App = () => {
  const [user, setUser] = useState(null);
  const [language, setLanguage] = useState('en');
  const [gameState, setGameState] = useState('login');
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Admin emails list
  const ADMIN_EMAILS = [
    'houssine.trabelsi6@gmail.com',
    'admin@5sgame.com'
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChange((firebaseUser) => {
      setLoading(false);
      if (firebaseUser) {
        setUser(firebaseUser);
        const isAdminUser = ADMIN_EMAILS.includes(firebaseUser.email);
        setIsAdmin(isAdminUser);
        setGameState(isAdminUser ? 'admin' : 'game');
      } else {
        setUser(null);
        setGameState('login');
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Set RTL for Arabic
  useEffect(() => {
    if (language === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = language;
    }
  }, [language]);

  const handleLogin = (firebaseUser) => {
    setUser(firebaseUser);
    const isAdminUser = ADMIN_EMAILS.includes(firebaseUser.email);
    setIsAdmin(isAdminUser);
    setGameState(isAdminUser ? 'admin' : 'game');
  };

  const handleLogout = () => {
    setUser(null);
    setGameState('login');
    setIsAdmin(false);
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

  if (gameState === 'admin') {
    return (
      <AdminDashboard 
        user={user}
        onLogout={handleLogout}
        language={language}
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
