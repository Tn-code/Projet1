import React, { useState } from 'react';
import { login, register } from '../services/authService';
import { saveUserProgress } from '../services/dbService';
import LanguageSelector from './LanguageSelector';

const FirebaseLogin = ({ onLogin, language, setLanguage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    let result;
    if (isRegister) {
      result = await register(email, password);
    } else {
      result = await login(email, password);
    }

    setLoading(false);

    if (result.error) {
      let userMessage = result.error;
      if (result.error.includes('user-not-found')) {
        userMessage = 'No account found with this email. Please register first.';
      } else if (result.error.includes('wrong-password')) {
        userMessage = 'Incorrect password. Please try again.';
      } else if (result.error.includes('invalid-email')) {
        userMessage = 'Invalid email format. Please check your email.';
      } else if (result.error.includes('too-many-requests')) {
        userMessage = 'Too many failed attempts. Please try again later.';
      } else if (result.error.includes('network-request-failed')) {
        userMessage = 'Network error. Please check your connection.';
      }
      setError(userMessage);
    } else if (result.user) {
      await saveUserProgress(result.user.uid, {
        email: result.user.email,
        displayName: result.user.displayName || '',
        score: 0,
        completedPrinciples: [],
        createdAt: new Date().toISOString()
      });
      onLogin(result.user);
    }
  };

  return (
    <div style={{
      maxWidth: '480px',
      margin: '0 auto',
      backgroundColor: 'white',
      borderRadius: '24px',
      padding: '40px 35px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.12)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2193b0' }}>🔥 5S</div>
        <LanguageSelector language={language} setLanguage={setLanguage} />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <div style={{
          fontSize: '48px',
          marginBottom: '12px',
          background: 'linear-gradient(135deg, #2193b0, #6dd5ed)',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white'
        }}>5S</div>
        <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#1a2a3a' }}>5S Methodology</h1>
        <p style={{ color: '#5a6a7a' }}>Login or register to continue</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontWeight: '500', color: '#2a3a4a', marginBottom: '6px' }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="user@example.com"
            required
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '2px solid #e2e8f0',
              borderRadius: '12px',
              fontSize: '16px',
              outline: 'none',
              backgroundColor: '#f8fafc'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#667eea';
              e.target.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e2e8f0';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: '500', color: '#2a3a4a', marginBottom: '6px' }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            minLength={6}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '2px solid #e2e8f0',
              borderRadius: '12px',
              fontSize: '16px',
              outline: 'none',
              backgroundColor: '#f8fafc'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#667eea';
              e.target.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e2e8f0';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        {error && (
          <div style={{
            backgroundColor: '#fee2e2',
            color: '#dc2626',
            padding: '12px 16px',
            borderRadius: '10px',
            marginBottom: '20px',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span>⚠️</span> {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '14px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
            transition: 'all 0.3s',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.5)';
            }
          }}
          onMouseLeave={(e) => {
            if (!loading) {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
            }
          }}
        >
          {loading ? 'Loading...' : (isRegister ? 'Register' : 'Login')}
        </button>
      </form>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button
          onClick={() => {
            setIsRegister(!isRegister);
            setError('');
          }}
          style={{
            background: 'none',
            border: 'none',
            color: '#667eea',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            textDecoration: 'underline',
            transition: 'color 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.color = '#764ba2'}
          onMouseLeave={(e) => e.target.style.color = '#667eea'}
        >
          {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
        </button>
      </div>

      <div style={{
        marginTop: '25px',
        paddingTop: '20px',
        borderTop: '2px solid #f1f5f9',
        textAlign: 'center'
      }}>
        <p style={{ color: '#94a3b8', fontSize: '12px' }}>
          🔒 Secure authentication with Firebase
        </p>
      </div>
    </div>
  );
};

export default FirebaseLogin;
