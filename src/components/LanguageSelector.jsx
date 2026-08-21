import React from 'react';

const LanguageSelector = ({ language, setLanguage }) => {
  const languages = [
    { code: 'en', label: '🇬🇧 English', dir: 'ltr' },
    { code: 'fr', label: '🇫🇷 Français', dir: 'ltr' },
    { code: 'ar', label: '🇸🇦 العربية', dir: 'rtl' }
  ];

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    // Update document direction
    const langObj = languages.find(l => l.code === newLang);
    if (langObj) {
      document.documentElement.dir = langObj.dir;
      document.documentElement.lang = newLang;
    }
  };

  return (
    <select
      value={language}
      onChange={handleLanguageChange}
      style={{
        padding: '8px 14px',
        borderRadius: '10px',
        border: '2px solid #e2e8f0',
        backgroundColor: 'white',
        fontSize: '14px',
        cursor: 'pointer',
        outline: 'none',
        transition: 'all 0.2s',
        minWidth: '140px'
      }}
      onFocus={(e) => e.target.style.borderColor = '#667eea'}
      onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
    >
      {languages.map(lang => (
        <option key={lang.code} value={lang.code}>
          {lang.label}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;
