import React, { useState, useEffect } from 'react';
import { getAllUsers, getAllAssessments } from '../services/adminService';

const AdminModule = ({ language }) => {
  const [users, setUsers] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('users');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [usersResult, assessmentsResult] = await Promise.all([
      getAllUsers(),
      getAllAssessments()
    ]);
    if (usersResult.data) setUsers(usersResult.data);
    if (assessmentsResult.data) setAssessments(assessmentsResult.data);
    setLoading(false);
  };

  const getTranslation = (key) => {
    const translations = {
      title: { en: '🏢 Admin Module', fr: '🏢 Module Administratif', ar: '🏢 وحدة الإدارة' },
      users: { en: '👥 Users Management', fr: '👥 Gestion des Utilisateurs', ar: '👥 إدارة المستخدمين' },
      training: { en: '📚 Training Management', fr: '📚 Gestion des Formations', ar: '📚 إدارة التدريبات' },
      planning: { en: '📅 Planning', fr: '📅 Planification', ar: '📅 التخطيط' },
      attendance: { en: '📋 Attendance', fr: '📋 Présence', ar: '📋 الحضور' },
      totalUsers: { en: 'Total Users', fr: 'Total Utilisateurs', ar: 'إجمالي المستخدمين' },
      totalAssessments: { en: 'Total Assessments', fr: 'Total Évaluations', ar: 'إجمالي التقييمات' },
      name: { en: 'Name', fr: 'Nom', ar: 'الاسم' },
      email: { en: 'Email', fr: 'Email', ar: 'البريد الإلكتروني' },
      score: { en: 'Score', fr: 'Score', ar: 'النتيجة' },
      progress: { en: 'Progress', fr: 'Progrès', ar: 'التقدم' },
      actions: { en: 'Actions', fr: 'Actions', ar: 'الإجراءات' }
    };
    return translations[key]?.[language] || translations[key]?.en || key;
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>{getTranslation('title')}</h2>

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
          onClick={() => setActiveTab('users')}
          style={{
            padding: '10px 20px',
            backgroundColor: activeTab === 'users' ? '#667eea' : 'transparent',
            color: activeTab === 'users' ? 'white' : '#475569',
            border: activeTab === 'users' ? '2px solid #667eea' : '2px solid transparent',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          {getTranslation('users')}
        </button>
        <button
          onClick={() => setActiveTab('training')}
          style={{
            padding: '10px 20px',
            backgroundColor: activeTab === 'training' ? '#667eea' : 'transparent',
            color: activeTab === 'training' ? 'white' : '#475569',
            border: activeTab === 'training' ? '2px solid #667eea' : '2px solid transparent',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          {getTranslation('training')}
        </button>
        <button
          onClick={() => setActiveTab('planning')}
          style={{
            padding: '10px 20px',
            backgroundColor: activeTab === 'planning' ? '#667eea' : 'transparent',
            color: activeTab === 'planning' ? 'white' : '#475569',
            border: activeTab === 'planning' ? '2px solid #667eea' : '2px solid transparent',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          {getTranslation('planning')}
        </button>
        <button
          onClick={() => setActiveTab('attendance')}
          style={{
            padding: '10px 20px',
            backgroundColor: activeTab === 'attendance' ? '#667eea' : 'transparent',
            color: activeTab === 'attendance' ? 'white' : '#475569',
            border: activeTab === 'attendance' ? '2px solid #667eea' : '2px solid transparent',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          {getTranslation('attendance')}
        </button>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px',
        marginBottom: '25px'
      }}>
        <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '12px', textAlign: 'center' }}>
          <div style={{ fontSize: '12px', color: '#5a6a7a' }}>{getTranslation('totalUsers')}</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#667eea' }}>{users.length}</div>
        </div>
        <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '12px', textAlign: 'center' }}>
          <div style={{ fontSize: '12px', color: '#5a6a7a' }}>{getTranslation('totalAssessments')}</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#22c55e' }}>{assessments.length}</div>
        </div>
        <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '12px', textAlign: 'center' }}>
          <div style={{ fontSize: '12px', color: '#5a6a7a' }}>Active Users</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#f59e0b' }}>
            {users.filter(u => (u.score || 0) > 0).length}
          </div>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'users' && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc' }}>
                <th style={{ padding: '10px', textAlign: 'left' }}>{getTranslation('name')}</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>{getTranslation('email')}</th>
                <th style={{ padding: '10px', textAlign: 'center' }}>{getTranslation('score')}</th>
                <th style={{ padding: '10px', textAlign: 'center' }}>{getTranslation('progress')}</th>
                <th style={{ padding: '10px', textAlign: 'center' }}>{getTranslation('actions')}</th>
              </tr>
            </thead>
            <tbody>
              {users.slice(0, 20).map((u, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '10px' }}>{u.displayName || u.email}</td>
                  <td style={{ padding: '10px' }}>{u.email}</td>
                  <td style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>{u.score || 0}</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>
                    {u.completedPrinciples?.length || 0}/5
                  </td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>
                    <button style={{
                      padding: '4px 12px',
                      backgroundColor: '#667eea',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}>
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'training' && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>📚</div>
          <p>Training Management Module - Coming Soon</p>
          <p style={{ fontSize: '14px' }}>Manage training sessions, content, and schedules</p>
        </div>
      )}

      {activeTab === 'planning' && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>📅</div>
          <p>Planning Module - Coming Soon</p>
          <p style={{ fontSize: '14px' }}>Plan and schedule training sessions</p>
        </div>
      )}

      {activeTab === 'attendance' && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>📋</div>
          <p>Attendance Module - Coming Soon</p>
          <p style={{ fontSize: '14px' }}>Track attendance and participation</p>
        </div>
      )}
    </div>
  );
};

export default AdminModule;
