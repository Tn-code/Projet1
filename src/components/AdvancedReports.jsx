import React, { useState, useEffect } from 'react';
import { getAllUsers, getAllAssessments } from '../services/adminService';

const AdvancedReports = ({ language }) => {
  const [users, setUsers] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [reportType, setReportType] = useState('individual');

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
      title: { en: '📋 Advanced Reports', fr: '📋 Rapports Avancés', ar: '📋 تقارير متقدمة' },
      individual: { en: 'Individual Report', fr: 'Rapport Individuel', ar: 'تقرير فردي' },
      department: { en: 'Department Report', fr: 'Rapport par Département', ar: 'تقرير حسب القسم' },
      exportPDF: { en: '📄 Export PDF', fr: '📄 Exporter PDF', ar: '📄 تصدير PDF' },
      exportExcel: { en: '📊 Export Excel', fr: '📊 Exporter Excel', ar: '📊 تصدير Excel' },
      user: { en: 'User', fr: 'Utilisateur', ar: 'المستخدم' },
      score: { en: 'Score', fr: 'Score', ar: 'النتيجة' },
      date: { en: 'Date', fr: 'Date', ar: 'التاريخ' },
      trend: { en: 'Trend Analysis', fr: 'Analyse des Tendances', ar: 'تحليل الاتجاهات' },
      noData: { en: 'No data available', fr: 'Aucune donnée disponible', ar: 'لا توجد بيانات' }
    };
    return translations[key]?.[language] || translations[key]?.en || key;
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>Loading reports...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>{getTranslation('title')}</h2>
      
      {/* Report Type Selector */}
      <div style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '20px',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => setReportType('individual')}
          style={{
            padding: '10px 20px',
            backgroundColor: reportType === 'individual' ? '#667eea' : '#f8fafc',
            color: reportType === 'individual' ? 'white' : '#1a2a3a',
            border: '2px solid #667eea',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          {getTranslation('individual')}
        </button>
        <button
          onClick={() => setReportType('department')}
          style={{
            padding: '10px 20px',
            backgroundColor: reportType === 'department' ? '#667eea' : '#f8fafc',
            color: reportType === 'department' ? 'white' : '#1a2a3a',
            border: '2px solid #667eea',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          {getTranslation('department')}
        </button>
      </div>

      {/* User Selector */}
      {reportType === 'individual' && (
        <div style={{ marginBottom: '20px' }}>
          <select
            onChange={(e) => setSelectedUser(e.target.value)}
            style={{
              padding: '10px',
              border: '2px solid #e2e8f0',
              borderRadius: '8px',
              width: '100%',
              maxWidth: '300px'
            }}
          >
            <option value="">Select a user...</option>
            {users.map((u, i) => (
              <option key={i} value={u.id}>
                {u.displayName || u.email}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Report Content */}
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
      }}>
        {assessments.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#94a3b8' }}>{getTranslation('noData')}</p>
        ) : (
          <div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc' }}>
                  <th style={{ padding: '10px', textAlign: 'left' }}>{getTranslation('user')}</th>
                  <th style={{ padding: '10px', textAlign: 'center' }}>{getTranslation('score')}</th>
                  <th style={{ padding: '10px', textAlign: 'center' }}>{getTranslation('date')}</th>
                  <th style={{ padding: '10px', textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {assessments.slice(0, 20).map((a, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '10px' }}>{a.prenom} {a.nom}</td>
                    <td style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>
                      {a.score}/15
                    </td>
                    <td style={{ padding: '10px', textAlign: 'center' }}>
                      {new Date(a.createdAt).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '10px', textAlign: 'center' }}>
                      <button
                        onClick={() => alert('Export PDF - Coming soon!')}
                        style={{
                          padding: '4px 12px',
                          backgroundColor: '#dc2626',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        {getTranslation('exportPDF')}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {assessments.length > 20 && (
              <p style={{ textAlign: 'center', color: '#94a3b8', marginTop: '10px' }}>
                Showing 20 of {assessments.length} records
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedReports;
