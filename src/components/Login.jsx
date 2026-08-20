import React, { useState } from 'react';

const Login = ({ onLogin, language, setLanguage }) => {
  const [matricule, setMatricule] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const translations = {
    title: {
      en: '5S Methodology',
      fr: 'Méthodologie 5S',
      ar: 'منهجية 5S'
    },
    subtitle: {
      en: 'Login to continue your learning journey',
      fr: 'Connectez-vous pour continuer votre apprentissage',
      ar: 'سجل الدخول لمواصلة رحلة التعلم'
    },
    matricule: {
      en: 'Matricule',
      fr: 'Matricule',
      ar: 'الرقم التعريفي'
    },
    placeholder: {
      en: 'Enter your matricule (e.g., D000010)',
      fr: 'Entrez votre matricule (ex: D000010)',
      ar: 'أدخل رقمك التعريفي (مثال: D000010)'
    },
    login: {
      en: 'Start Learning',
      fr: 'Commencer à Apprendre',
      ar: 'ابدأ التعلم'
    },
    loading: {
      en: 'Loading...',
      fr: 'Chargement...',
      ar: 'جاري التحميل...'
    },
    error: {
      en: 'Matricule not found. Please try again.',
      fr: 'Matricule non trouvé. Veuillez réessayer.',
      ar: 'الرقم التعريفي غير موجود. يرجى المحاولة مرة أخرى.'
    },
    welcome: {
      en: 'Welcome Back!',
      fr: 'Bon Retour!',
      ar: 'مرحباً بعودتك!'
    },
    features: {
      en: ['Learn 5S Principles', 'Interactive Quizzes', 'Track Progress', 'Earn Certificates'],
      fr: ['Apprendre les principes 5S', 'Quiz interactifs', 'Suivre les progrès', 'Obtenir des certificats'],
      ar: ['تعلم مبادئ 5S', 'اختبارات تفاعلية', 'تتبع التقدم', 'الحصول على شهادات']
    }
  };

  const t = (key) => translations[key]?.[language] || translations[key]?.en || key;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Simulate async login
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const success = onLogin(matricule.trim());
    if (!success) {
      setError(t('error'));
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        right: '-50%',
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
        animation: 'pulse 8s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-50%',
        left: '-50%',
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
        animation: 'pulse 10s ease-in-out infinite reverse'
      }} />

      <div style={{
        maxWidth: '480px',
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: '32px',
        padding: '40px 35px',
        boxShadow: '0 25px 80px rgba(0,0,0,0.3)',
        position: 'relative',
        zIndex: 1,
        animation: 'fadeInUp 0.6s ease'
      }}>
        {/* Language Selector */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid var(--gray-200)',
              backgroundColor: 'white',
              fontSize: '13px',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <option value="en">🇬🇧 English</option>
            <option value="fr">🇫🇷 Français</option>
            <option value="ar">🇸🇦 العربية</option>
          </select>
        </div>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            margin: '0 auto 15px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '36px',
            fontWeight: 'bold',
            color: 'white',
            boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)'
          }}>
            5S
          </div>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '6px'
          }}>
            {t('title')}
          </h1>
          <p style={{ color: 'var(--gray-500)', fontSize: '15px' }}>
            {t('subtitle')}
          </p>
        </div>

        {/* Features Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '10px',
          marginBottom: '25px'
        }}>
          {t('features').map((feature, index) => (
            <div key={index} style={{
              padding: '10px',
              backgroundColor: 'var(--gray-50)',
              borderRadius: '10px',
              fontSize: '12px',
              color: 'var(--gray-600)',
              textAlign: 'center',
              border: '1px solid var(--gray-100)'
            }}>
              {feature}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontWeight: '600',
              color: 'var(--gray-700)',
              marginBottom: '6px',
              fontSize: '14px'
            }}>
              {t('matricule')}
            </label>
            <input
              type="text"
              value={matricule}
              onChange={(e) => setMatricule(e.target.value)}
              placeholder={t('placeholder')}
              style={{
                width: '100%',
                padding: '14px 16px',
                border: '2px solid var(--gray-200)',
                borderRadius: '12px',
                fontSize: '15px',
                transition: 'all 0.2s',
                outline: 'none',
                backgroundColor: 'var(--gray-50)'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#667eea';
                e.target.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--gray-200)';
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
              padding: '16px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
              opacity: loading ? 0.7 : 1,
              position: 'relative',
              overflow: 'hidden'
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
            {loading ? t('loading') : t('login')}
          </button>
        </form>

        <div style={{
          marginTop: '25px',
          paddingTop: '20px',
          borderTop: '2px solid var(--gray-100)',
          textAlign: 'center'
        }}>
          <p style={{ color: 'var(--gray-400)', fontSize: '12px' }}>
            🔒 Secure learning platform • 5S Methodology
          </p>
          <p style={{ color: 'var(--gray-400)', fontSize: '11px', marginTop: '4px' }}>
            Test credentials: D000010, D000100, D000103
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
