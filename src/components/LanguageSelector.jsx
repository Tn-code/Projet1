import React from 'react';

const LanguageSelector = ({ language, setLanguage }) => {
  const languages = [
    { code: 'en', label: '🇬🇧 English' },
    { code: 'fr', label: '🇫🇷 Français' },
    { code: 'ar', label: '🇸🇦 العربية' }
  ];

  return (
    <select 
      value={language} 
      onChange={(e) => setLanguage(e.target.value)}
      style={{
        padding: '8px 14px',
        borderRadius: '10px',
        border: '2px solid #e2e8f0',
        backgroundColor: 'white',
        fontSize: '14px',
        cursor: 'pointer',
        outline: 'none'
      }}
    >
      {languages.map(lang => (
        <option key={lang.code} value={lang.code}>{lang.label}</option>
      ))}
    </select>
  );
};

export default LanguageSelector;
