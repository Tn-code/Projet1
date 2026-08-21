import React, { useState } from 'react';
import TrainingManagement from './TrainingManagement';
import PlanningModule from './PlanningModule';

const AdminModule = ({ language }) => {
  const [activeTab, setActiveTab] = useState('training');

  const getTranslation = (key) => {
    const translations = {
      title: { en: '🏢 Admin Module', fr: '🏢 Module Administratif', ar: '🏢 وحدة الإدارة' },
      training: { en: '📚 Training', fr: '📚 Formation', ar: '📚 التدريب' },
      planning: { en: '📅 Planning', fr: '📅 Planification', ar: '📅 التخطيط' }
    };
    return translations[key]?.[language] || translations[key]?.en || key;
  };

  return (
    <div>
      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '25px',
        flexWrap: 'wrap',
        borderBottom: '2px solid #e2e8f0',
        paddingBottom: '10px'
      }}>
        <button
          onClick={() => setActiveTab('training')}
          style={{
            padding: '10px 24px',
            backgroundColor: activeTab === 'training' ? '#667eea' : 'transparent',
            color: activeTab === 'training' ? 'white' : '#475569',
            border: activeTab === 'training' ? '2px solid #667eea' : '2px solid transparent',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            if (activeTab !== 'training') {
              e.target.style.backgroundColor = '#f1f5f9';
            }
          }}
          onMouseLeave={(e) => {
            if (activeTab !== 'training') {
              e.target.style.backgroundColor = 'transparent';
            }
          }}
        >
          📚 {getTranslation('training')}
        </button>
        <button
          onClick={() => setActiveTab('planning')}
          style={{
            padding: '10px 24px',
            backgroundColor: activeTab === 'planning' ? '#667eea' : 'transparent',
            color: activeTab === 'planning' ? 'white' : '#475569',
            border: activeTab === 'planning' ? '2px solid #667eea' : '2px solid transparent',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            if (activeTab !== 'planning') {
              e.target.style.backgroundColor = '#f1f5f9';
            }
          }}
          onMouseLeave={(e) => {
            if (activeTab !== 'planning') {
              e.target.style.backgroundColor = 'transparent';
            }
          }}
        >
          📅 {getTranslation('planning')}
        </button>
      </div>

      {/* Content */}
      {activeTab === 'training' && <TrainingManagement language={language} />}
      {activeTab === 'planning' && <PlanningModule language={language} />}
    </div>
  );
};

export default AdminModule;
