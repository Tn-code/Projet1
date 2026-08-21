import React, { useState, useEffect } from 'react';
import { 
  getAllUsers, 
  getAllAssessments, 
  getAssessmentStats,
  getUserAssessments 
} from '../services/adminService';
import { logout } from '../services/authService';
import Formation5S from './Formation5S';
import ProgressionPlan from './ProgressionPlan';
import AnalyticsDashboard from './AnalyticsDashboard';
import AdvancedReports from './AdvancedReports';
import AIRecommendations from './AIRecommendations';
import AdminModule from './AdminModule';

const AdminDashboard = ({ user, onLogout, language }) => {
  const [users, setUsers] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userAssessments, setUserAssessments] = useState([]);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    const [usersResult, assessmentsResult, statsResult] = await Promise.all([
      getAllUsers(),
      getAllAssessments(),
      getAssessmentStats()
    ]);
    
    if (usersResult.data) setUsers(usersResult.data);
    if (assessmentsResult.data) setAssessments(assessmentsResult.data);
    if (statsResult.data) setStats(statsResult.data);
    setLoading(false);
  };

  const getTranslation = (key) => {
    const translations = {
      title: { en: '👑 Admin Dashboard', fr: '👑 Tableau de Bord Admin', ar: '👑 لوحة تحكم المدير' },
      overview: { en: '📊 Overview', fr: '📊 Aperçu', ar: '📊 نظرة عامة' },
      formation: { en: '📚 Formation 5S', fr: '📚 Formation 5S', ar: '📚 تدريب 5S' },
      progression: { en: '📈 Progression', fr: '📈 Progression', ar: '📈 التقدم' },
      analytics: { en: '📊 Analytics', fr: '📊 Analytique', ar: '📊 التحليلات' },
      reports: { en: '📋 Reports', fr: '📋 Rapports', ar: '📋 التقارير' },
      ai: { en: '🤖 AI', fr: '🤖 IA', ar: '🤖 الذكاء الاصطناعي' },
      adminModule: { en: '🏢 Admin', fr: '🏢 Admin', ar: '🏢 الإدارة' },
      totalUsers: { en: 'Total Users', fr: 'Total Utilisateurs', ar: 'إجمالي المستخدمين' },
      totalAssessments: { en: 'Total Assessments', fr: 'Total Évaluations', ar: 'إجمالي التقييمات' },
      averageScore: { en: 'Average Score', fr: 'Score Moyen', ar: 'متوسط النتيجة' },
      search: { en: 'Search...', fr: 'Rechercher...', ar: 'بحث...' },
      userDetails: { en: 'User Details', fr: 'Détails Utilisateur', ar: 'تفاصيل المستخدم' },
      close: { en: 'Close', fr: 'Fermer', ar: 'إغلاق' },
      noData: { en: 'No data available', fr: 'Aucune donnée disponible', ar: 'لا توجد بيانات' },
      principleBreakdown: { en: 'Principle Breakdown', fr: 'Répartition par Principe', ar: 'توزيع المبادئ' },
      score: { en: 'Score', fr: 'Score', ar: 'النتيجة' },
      date: { en: 'Date', fr: 'Date', ar: 'التاريخ' },
      name: { en: 'Name', fr: 'Nom', ar: 'الاسم' },
      matricule: { en: 'Matricule', fr: 'Matricule', ar: 'الرقم التعريفي' },
      email: { en: 'Email', fr: 'Email', ar: 'البريد الإلكتروني' },
      completed: { en: 'Completed Principles', fr: 'Principes Complétés', ar: 'المبادئ المكتملة' },
      logout: { en: 'Logout', fr: 'Déconnexion', ar: 'تسجيل الخروج' },
      details: { en: 'Details', fr: 'Détails', ar: 'تفاصيل' },
      exportPDF: { en: '📄 Export PDF', fr: '📄 Exporter PDF', ar: '📄 تصدير PDF' },
      exportAllPDF: { en: '📄 Export All Results', fr: '📄 Exporter Tous les Résultats', ar: '📄 تصدير جميع النتائج' },
      refresh: { en: 'Refresh Data', fr: 'Rafraîchir les Données', ar: 'تحديث البيانات' },
      totalPoints: { en: 'Total Points', fr: 'Points Totaux', ar: 'إجمالي النقاط' }
    };
    return translations[key]?.[language] || translations[key]?.en || key;
  };

  // Generate detailed assessment HTML for PDF
  const generateDetailedAssessmentHTML = (assessment) => {
    // ... keep existing generateDetailedAssessmentHTML function ...
    return `<html>...</html>`;
  };

  // Export PDF function
  const handleExportPDF = async (html, filename) => {
    try {
      const html2pdf = await import('html2pdf.js');
      const element = document.createElement('div');
      element.innerHTML = html;
      element.style.padding = '20px';
      element.style.fontFamily = 'Arial, sans-serif';
      element.style.backgroundColor = 'white';
      
      const opt = {
        margin: [10, 10, 10, 10],
        filename: filename || '5S-Assessment-Report.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      
      await html2pdf.default().set(opt).from(element).save();
    } catch (error) {
      console.error('PDF Export error:', error);
      alert('Error exporting PDF. Please try again.');
    }
  };

  // Export individual assessment PDF
  const exportDetailedPDF = (assessment) => {
    const html = generateDetailedAssessmentHTML(assessment);
    const filename = `5S-Assessment-${assessment.prenom}-${assessment.nom}-${new Date().toISOString().split('T')[0]}.pdf`;
    handleExportPDF(html, filename);
  };

  // Export all assessments PDF
  const exportAllDetailedPDF = () => {
    let allHtml = `<h1>All Assessments</h1>`;
    assessments.slice(0, 50).forEach((a, index) => {
      allHtml += `
        <div style="border:1px solid #ddd;padding:15px;margin:10px 0;">
          <h3>Assessment #${index + 1}</h3>
          <p><strong>Name:</strong> ${a.prenom} ${a.nom}</p>
          <p><strong>Matricule:</strong> ${a.matricule}</p>
          <p><strong>Score:</strong> ${a.score}/15</p>
        </div>
      `;
    });
    handleExportPDF(allHtml, `All-5S-Assessments-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const filteredAssessments = assessments.filter(a => {
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return (a.nom?.toLowerCase().includes(search) || 
              a.prenom?.toLowerCase().includes(search) || 
              a.matricule?.toLowerCase().includes(search));
    }
    return true;
  });

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <div className="spinner" />
        <p style={{ color: '#5a6a7a' }}>Loading admin dashboard...</p>
      </div>
    );
  }

  // Render content based on active tab
  const renderContent = () => {
    switch(activeTab) {
      case 'formation':
        return <Formation5S language={language} />;
      case 'progression':
        return <ProgressionPlan 
          user={user} 
          language={language}
          completedPrinciples={user?.completedPrinciples || []}
          score={user?.score || 0}
        />;
      case 'analytics':
        return <AnalyticsDashboard language={language} />;
      case 'reports':
        return <AdvancedReports language={language} />;
      case 'ai':
        return <AIRecommendations user={user} language={language} />;
      case 'adminModule':
        return <AdminModule language={language} />;
      case 'overview':
      default:
        return renderOverview();
    }
  };

  // Overview content
  const renderOverview = () => (
    <>
      {/* Statistics Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(160px, 22vw, 220px), 1fr))',
        gap: '15px',
        marginBottom: '25px'
      }}>
        <div className="professional-card" style={{
          padding: '18px 20px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          border: 'none'
        }}>
          <div style={{ fontSize: '11px', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {getTranslation('totalUsers')}
          </div>
          <div style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '700', marginTop: '4px' }}>
            {users.length}
          </div>
        </div>

        <div className="professional-card" style={{
          padding: '18px 20px',
          background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
          color: 'white',
          border: 'none'
        }}>
          <div style={{ fontSize: '11px', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {getTranslation('totalAssessments')}
          </div>
          <div style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '700', marginTop: '4px' }}>
            {assessments.length}
          </div>
        </div>

        <div className="professional-card" style={{
          padding: '18px 20px',
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          color: 'white',
          border: 'none'
        }}>
          <div style={{ fontSize: '11px', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {getTranslation('averageScore')}
          </div>
          <div style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '700', marginTop: '4px' }}>
            {stats?.averageScore || 0}/15
          </div>
        </div>

        <div className="professional-card" style={{
          padding: '18px 20px',
          background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
          color: 'white',
          border: 'none'
        }}>
          <div style={{ fontSize: '11px', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {getTranslation('totalPoints')}
          </div>
          <div style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '700', marginTop: '4px' }}>
            {stats?.totalScore || 0}
          </div>
        </div>
      </div>

      {/* Principle Breakdown */}
      {stats?.principleScores && (
        <div className="professional-card animate-fadeInUp" style={{
          marginBottom: '25px',
          animationDelay: '0.1s'
        }}>
          <h3 style={{ 
            fontSize: 'clamp(1rem, 2vw, 1.2rem)', 
            color: '#1a2a3a', 
            marginBottom: '15px' 
          }}>
            {getTranslation('principleBreakdown')}
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(160px, 22vw, 200px), 1fr))',
            gap: '12px'
          }}>
            {Object.keys(stats.principleScores).map(p => {
              const data = stats.principleScores[p];
              const pct = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
              const names = {
                seiri: '📋 Seiri',
                seiton: '📦 Seiton',
                seiso: '🧹 Seiso',
                seiketsu: '📐 Seiketsu',
                shitsuke: '🔄 Shitsuke'
              };
              return (
                <div key={p} style={{
                  padding: '15px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  <div style={{ fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)', fontWeight: '600', color: '#1a2a3a' }}>
                    {names[p] || p}
                  </div>
                  <div style={{
                    fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                    fontWeight: '700',
                    color: pct >= 80 ? '#22c55e' : (pct >= 60 ? '#f59e0b' : '#dc2626')
                  }}>
                    {pct}%
                  </div>
                  <div style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.85rem)', color: '#5a6a7a' }}>
                    {data.correct}/{data.total} correct
                  </div>
                  <div style={{
                    width: '100%',
                    height: '6px',
                    backgroundColor: '#e2e8f0',
                    borderRadius: '3px',
                    marginTop: '8px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${pct}%`,
                      height: '100%',
                      backgroundColor: pct >= 80 ? '#22c55e' : (pct >= 60 ? '#f59e0b' : '#dc2626'),
                      borderRadius: '3px',
                      transition: 'width 0.6s ease'
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Assessments Table */}
      <div className="professional-card animate-fadeInUp" style={{
        animationDelay: '0.2s'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '15px',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <h3 style={{ 
            fontSize: 'clamp(1rem, 2vw, 1.2rem)', 
            color: '#1a2a3a' 
          }}>
            📋 {getTranslation('assessments')} ({assessments.length})
          </h3>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder={getTranslation('search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '8px 14px',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)',
                outline: 'none',
                minWidth: 'clamp(150px, 30vw, 250px)',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: 'clamp(0.7rem, 1.2vw, 0.85rem)'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc' }}>
                <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>
                  {getTranslation('name')}
                </th>
                <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>
                  {getTranslation('matricule')}
                </th>
                <th style={{ padding: '10px 12px', textAlign: 'center', borderBottom: '2px solid #e2e8f0' }}>
                  {getTranslation('score')}
                </th>
                <th style={{ padding: '10px 12px', textAlign: 'center', borderBottom: '2px solid #e2e8f0' }}>
                  {getTranslation('completed')}
                </th>
                <th style={{ padding: '10px 12px', textAlign: 'center', borderBottom: '2px solid #e2e8f0' }}>
                  {getTranslation('date')}
                </th>
                <th style={{ padding: '10px 12px', textAlign: 'center', borderBottom: '2px solid #e2e8f0' }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAssessments.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
                    <div style={{ fontSize: '48px', marginBottom: '10px' }}>📊</div>
                    {getTranslation('noData')}
                    <br />
                    <button
                      onClick={loadDashboardData}
                      style={{
                        marginTop: '15px',
                        padding: '8px 20px',
                        backgroundColor: '#667eea',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      🔄 {getTranslation('refresh')}
                    </button>
                  </td>
                </tr>
              ) : (
                filteredAssessments.slice(0, 50).map((a, index) => (
                  <tr key={index} style={{ 
                    borderBottom: '1px solid #e2e8f0',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                    <td style={{ padding: '10px 12px', fontWeight: '500' }}>
                      {a.prenom} {a.nom}
                    </td>
                    <td style={{ padding: '10px 12px' }}>{a.matricule}</td>
                    <td style={{
                      padding: '10px 12px',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      color: a.score >= 12 ? '#22c55e' : (a.score >= 8 ? '#f59e0b' : '#dc2626')
                    }}>
                      {a.score}/15
                    </td>
                    <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                      {a.results ? Object.keys(a.results).filter(r => a.results[r].correct === a.results[r].total).length : 0}/5
                    </td>
                    <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                      {new Date(a.createdAt).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                      <button
                        onClick={() => exportDetailedPDF(a)}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#dc2626',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: 'clamp(0.6rem, 1vw, 0.75rem)',
                          marginRight: '5px',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#b91c1c'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#dc2626'}
                      >
                        📄 {getTranslation('exportPDF')}
                      </button>
                      <button
                        onClick={() => {
                          setSelectedUser({
                            id: a.userId,
                            nom: a.nom,
                            prenom: a.prenom,
                            matricule: a.matricule,
                            score: a.score,
                            email: a.email || 'N/A'
                          });
                          setUserAssessments(filteredAssessments.filter(ass => ass.userId === a.userId));
                          setShowUserDetails(true);
                        }}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#667eea',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: 'clamp(0.6rem, 1vw, 0.75rem)',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#5b21b6'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#667eea'}
                      >
                        👁️ {getTranslation('details')}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {filteredAssessments.length > 50 && (
            <p style={{ 
              textAlign: 'center', 
              color: '#94a3b8', 
              fontSize: '0.85rem', 
              padding: '15px'
            }}>
              Showing 50 of {filteredAssessments.length} assessments
            </p>
          )}
        </div>
      </div>
    </>
  );

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8fafc',
      padding: '15px',
      paddingBottom: '30px'
    }}>
      {/* Header */}
      <div className="professional-card animate-fadeInUp" style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px 25px',
        marginBottom: '25px',
        borderRadius: '16px',
        color: 'white',
        border: 'none'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '15px'
        }}>
          <div>
            <h1 style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', marginBottom: '4px' }}>
              👑 {getTranslation('title')}
            </h1>
            <p style={{ fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)', opacity: 0.9 }}>
              {user?.email || 'Admin'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={loadDashboardData}
              style={{
                padding: '8px 16px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: 'clamp(0.7rem, 1.5vw, 0.9rem)',
                fontWeight: '500',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.3)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
            >
              🔄 {getTranslation('refresh')}
            </button>
            <button
              onClick={exportAllDetailedPDF}
              style={{
                padding: '8px 16px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: 'clamp(0.7rem, 1.5vw, 0.9rem)',
                fontWeight: '500',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.3)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
            >
              📄 {getTranslation('exportAllPDF')}
            </button>
            <button
              onClick={onLogout}
              style={{
                padding: '8px 16px',
                backgroundColor: 'rgba(220,38,38,0.8)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: 'clamp(0.7rem, 1.5vw, 0.9rem)',
                fontWeight: '500',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(220,38,38,1)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(220,38,38,0.8)'}
            >
              {getTranslation('logout')}
            </button>
          </div>
        </div>
      </div>

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
          onClick={() => setActiveTab('overview')}
          style={{
            padding: '10px 24px',
            backgroundColor: activeTab === 'overview' ? '#667eea' : 'transparent',
            color: activeTab === 'overview' ? 'white' : '#475569',
            border: activeTab === 'overview' ? '2px solid #667eea' : '2px solid transparent',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
            fontWeight: '600',
            transition: 'all 0.3s'
          }}
        >
          📊 {getTranslation('overview')}
        </button>
        <button
          onClick={() => setActiveTab('formation')}
          style={{
            padding: '10px 24px',
            backgroundColor: activeTab === 'formation' ? '#667eea' : 'transparent',
            color: activeTab === 'formation' ? 'white' : '#475569',
            border: activeTab === 'formation' ? '2px solid #667eea' : '2px solid transparent',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
            fontWeight: '600',
            transition: 'all 0.3s'
          }}
        >
          📚 {getTranslation('formation')}
        </button>
        <button
          onClick={() => setActiveTab('progression')}
          style={{
            padding: '10px 24px',
            backgroundColor: activeTab === 'progression' ? '#667eea' : 'transparent',
            color: activeTab === 'progression' ? 'white' : '#475569',
            border: activeTab === 'progression' ? '2px solid #667eea' : '2px solid transparent',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
            fontWeight: '600',
            transition: 'all 0.3s'
          }}
        >
          📈 {getTranslation('progression')}
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          style={{
            padding: '10px 24px',
            backgroundColor: activeTab === 'analytics' ? '#667eea' : 'transparent',
            color: activeTab === 'analytics' ? 'white' : '#475569',
            border: activeTab === 'analytics' ? '2px solid #667eea' : '2px solid transparent',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
            fontWeight: '600',
            transition: 'all 0.3s'
          }}
        >
          📊 {getTranslation('analytics')}
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          style={{
            padding: '10px 24px',
            backgroundColor: activeTab === 'reports' ? '#667eea' : 'transparent',
            color: activeTab === 'reports' ? 'white' : '#475569',
            border: activeTab === 'reports' ? '2px solid #667eea' : '2px solid transparent',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
            fontWeight: '600',
            transition: 'all 0.3s'
          }}
        >
          📋 {getTranslation('reports')}
        </button>
        <button
          onClick={() => setActiveTab('ai')}
          style={{
            padding: '10px 24px',
            backgroundColor: activeTab === 'ai' ? '#667eea' : 'transparent',
            color: activeTab === 'ai' ? 'white' : '#475569',
            border: activeTab === 'ai' ? '2px solid #667eea' : '2px solid transparent',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
            fontWeight: '600',
            transition: 'all 0.3s'
          }}
        >
          🤖 {getTranslation('ai')}
        </button>
        <button
          onClick={() => setActiveTab('adminModule')}
          style={{
            padding: '10px 24px',
            backgroundColor: activeTab === 'adminModule' ? '#667eea' : 'transparent',
            color: activeTab === 'adminModule' ? 'white' : '#475569',
            border: activeTab === 'adminModule' ? '2px solid #667eea' : '2px solid transparent',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
            fontWeight: '600',
            transition: 'all 0.3s'
          }}
        >
          🏢 {getTranslation('adminModule')}
        </button>
      </div>

      {/* Content */}
      {renderContent()}

      {/* User Details Modal */}
      {showUserDetails && selectedUser && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '15px',
          backdropFilter: 'blur(4px)'
        }}>
          <div className="professional-card" style={{
            maxWidth: '600px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            padding: '25px',
            animation: 'fadeInUp 0.3s ease'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h2 style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', color: '#1a2a3a' }}>
                {getTranslation('userDetails')}
              </h2>
              <button
                onClick={() => setShowUserDetails(false)}
                style={{
                  padding: '6px 14px',
                  backgroundColor: '#e2e8f0',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '18px',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#cbd5e1'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#e2e8f0'}
              >
                ✕
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              marginBottom: '20px',
              fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)'
            }}>
              <div><strong>{getTranslation('name')}:</strong> {selectedUser.prenom} {selectedUser.nom}</div>
              <div><strong>{getTranslation('matricule')}:</strong> {selectedUser.matricule}</div>
              <div><strong>{getTranslation('email')}:</strong> {selectedUser.email}</div>
              <div><strong>{getTranslation('score')}:</strong> {selectedUser.score}/15</div>
            </div>

            <h3 style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', color: '#1a2a3a', marginBottom: '12px' }}>
              📋 {getTranslation('assessments')} ({userAssessments.length})
            </h3>
            
            {userAssessments.length > 0 ? (
              <div style={{ marginBottom: '20px' }}>
                {userAssessments.map((a, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 15px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '10px',
                    marginBottom: '8px',
                    border: '1px solid #e2e8f0',
                    flexWrap: 'wrap',
                    gap: '8px',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}>
                    <div>
                      <strong>Assessment #{i + 1}</strong>
                      <span style={{ marginLeft: '10px', color: '#5a6a7a', fontSize: '0.85rem' }}>
                        {new Date(a.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div style={{
                      fontWeight: 'bold',
                      color: a.score >= 12 ? '#22c55e' : (a.score >= 8 ? '#f59e0b' : '#dc2626')
                    }}>
                      {a.score}/15
                    </div>
                    <button
                      onClick={() => exportDetailedPDF(a)}
                      style={{
                        padding: '4px 12px',
                        backgroundColor: '#dc2626',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: 'clamp(0.65rem, 1vw, 0.8rem)',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#b91c1c'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#dc2626'}
                    >
                      📄 {getTranslation('exportPDF')}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ textAlign: 'center', color: '#94a3b8', padding: '20px' }}>
                {getTranslation('noData')}
              </p>
            )}

            <div style={{
              display: 'flex',
              gap: '10px',
              marginTop: '10px',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={() => setShowUserDetails(false)}
                style={{
                  flex: 1,
                  padding: '12px',
                  backgroundColor: '#e2e8f0',
                  color: '#475569',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)',
                  fontWeight: '500',
                  minWidth: '100px',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#cbd5e1'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#e2e8f0'}
              >
                {getTranslation('close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
