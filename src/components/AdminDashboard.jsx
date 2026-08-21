import React, { useState, useEffect } from 'react';
import { getAllUsers, getAllAssessments, getAssessmentStats } from '../services/adminService';
import { logout } from '../services/authService';
import Formation5S from './Formation5S';
import ProgressionPlan from './ProgressionPlan';
import AdminModule from './AdminModule';

const AdminDashboard = ({ user, onLogout, language }) => {
  const [users, setUsers] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
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
      adminModule: { en: '🏢 Admin', fr: '🏢 Admin', ar: '🏢 الإدارة' },
      totalUsers: { en: 'Total Users', fr: 'Total Utilisateurs', ar: 'إجمالي المستخدمين' },
      totalAssessments: { en: 'Total Assessments', fr: 'Total Évaluations', ar: 'إجمالي التقييمات' },
      averageScore: { en: 'Average Score', fr: 'Score Moyen', ar: 'متوسط النتيجة' },
      search: { en: 'Search...', fr: 'Rechercher...', ar: 'بحث...' },
      noData: { en: 'No data available', fr: 'Aucune donnée disponible', ar: 'لا توجد بيانات' },
      principleBreakdown: { en: 'Principle Breakdown', fr: 'Répartition par Principe', ar: 'توزيع المبادئ' },
      score: { en: 'Score', fr: 'Score', ar: 'النتيجة' },
      date: { en: 'Date', fr: 'Date', ar: 'التاريخ' },
      name: { en: 'Name', fr: 'Nom', ar: 'الاسم' },
      matricule: { en: 'Matricule', fr: 'Matricule', ar: 'الرقم التعريفي' },
      email: { en: 'Email', fr: 'Email', ar: 'البريد الإلكتروني' },
      completed: { en: 'Completed Principles', fr: 'Principes Complétés', ar: 'المبادئ المكتملة' },
      logout: { en: 'Logout', fr: 'Déconnexion', ar: 'تسجيل الخروج' },
      exportAllPDF: { en: '📄 Export All Results', fr: '📄 Exporter Tous les Résultats', ar: '📄 تصدير جميع النتائج' },
      refresh: { en: 'Refresh Data', fr: 'Rafraîchir les Données', ar: 'تحديث البيانات' },
      totalPoints: { en: 'Total Points', fr: 'Points Totaux', ar: 'إجمالي النقاط' }
    };
    return translations[key]?.[language] || translations[key]?.en || key;
  };

  // Generate detailed assessment HTML for PDF - FIXED VERSION
  const generateAssessmentPDFHTML = (assessment) => {
    if (!assessment) return '<h1>No assessment data</h1>';

    const principleNames = {
      seiri: { en: 'Seiri (Sort)', fr: 'Seiri (Trier)', ar: 'سيري (الفرز)' },
      seiton: { en: 'Seiton (Set in order)', fr: 'Seiton (Ranger)', ar: 'سيتون (الترتيب)' },
      seiso: { en: 'Seiso (Shine)', fr: 'Seiso (Nettoyer)', ar: 'سيسو (التنظيف)' },
      seiketsu: { en: 'Seiketsu (Standardize)', fr: 'Seiketsu (Standardiser)', ar: 'سيكيتسو (التوحيد)' },
      shitsuke: { en: 'Shitsuke (Sustain)', fr: 'Shitsuke (Maintenir)', ar: 'شيتسوكي (الاستدامة)' }
    };

    let html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>5S Assessment Report</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 30px; background: #f8fafc; }
          .header { text-align: center; padding: 25px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border-radius: 12px; margin-bottom: 25px; }
          .header h1 { margin: 0; font-size: 28px; }
          .header p { margin: 5px 0; opacity: 0.9; }
          .section { background: white; border-radius: 12px; padding: 20px; margin-bottom: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
          .section-title { font-size: 18px; font-weight: bold; color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 8px; margin-bottom: 15px; }
          .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; background: #f8fafc; padding: 15px; border-radius: 8px; }
          .score-badge { display: inline-block; padding: 8px 20px; border-radius: 25px; font-weight: bold; font-size: 16px; }
          .score-high { background: #d1fae5; color: #065f46; }
          .score-medium { background: #fef3c7; color: #92400e; }
          .score-low { background: #fee2e2; color: #991b1b; }
          table { width: 100%; border-collapse: collapse; margin: 10px 0; font-size: 13px; }
          th, td { padding: 10px 12px; border: 1px solid #e2e8f0; text-align: left; }
          th { background: #f8fafc; font-weight: 600; color: #1a2a3a; }
          .correct { color: #16a34a; font-weight: bold; }
          .incorrect { color: #dc2626; font-weight: bold; }
          .principle-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; margin: 10px 0; }
          .principle-header { display: flex; justify-content: space-between; align-items: center; }
          .progress-bar { width: 100%; height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden; margin: 5px 0; }
          .progress-fill { height: 100%; border-radius: 4px; transition: width 0.3s; }
          .footer { text-align: center; padding: 20px; color: #94a3b8; font-size: 12px; border-top: 1px solid #e2e8f0; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>📋 5S Assessment Report</h1>
          <p>Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</p>
        </div>

        <div class="section">
          <div class="section-title">👤 Candidate Information</div>
          <div class="info-grid">
            <div><strong>Name:</strong> ${assessment.prenom || 'N/A'} ${assessment.nom || 'N/A'}</div>
            <div><strong>Matricule:</strong> ${assessment.matricule || 'N/A'}</div>
            <div><strong>Email:</strong> ${assessment.email || 'N/A'}</div>
            <div><strong>Date:</strong> ${assessment.createdAt ? new Date(assessment.createdAt).toLocaleDateString() : 'N/A'}</div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">📊 Overall Score</div>
          <div style="text-align:center;padding:20px;">
            <div style="font-size:48px;font-weight:bold;color:#667eea;">${assessment.score || 0}/15</div>
            <div style="font-size:18px;color:#475569;">${Math.round(((assessment.score || 0)/15)*100)}%</div>
            <div style="margin-top:10px;">
              <span class="score-badge ${assessment.score >= 12 ? 'score-high' : (assessment.score >= 8 ? 'score-medium' : 'score-low')}">
                ${assessment.score >= 12 ? '✅ Excellent' : (assessment.score >= 8 ? '📊 Good' : '📈 Needs Improvement')}
              </span>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">📊 Per Principle Breakdown</div>
    `;

    const principleList = ['seiri', 'seiton', 'seiso', 'seiketsu', 'shitsuke'];
    principleList.forEach(p => {
      const result = assessment.results?.[p];
      if (result) {
        const pct = Math.round((result.correct / result.total) * 100);
        const color = pct >= 80 ? '#22c55e' : (pct >= 60 ? '#f59e0b' : '#dc2626');
        html += `
          <div class="principle-card">
            <div class="principle-header">
              <span style="font-weight:600;">${principleNames[p]?.[language] || p}</span>
              <span style="font-weight:bold;color:${color};">${result.correct}/${result.total} (${pct}%)</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width:${pct}%;background:${color};"></div>
            </div>
          </div>
        `;
      }
    });

    // Questions and answers
    const allQuestions = [
      { id: 's1', q: 'What is the first step in implementing Seiri?' },
      { id: 's2', q: 'What should you do with items that are not needed in Seiri?' },
      { id: 's3', q: 'What is the red tag technique used for in Seiri?' },
      { id: 't1', q: 'What is the main goal of Seiton?' },
      { id: 't2', q: 'What tool is used in Seiton for visual organization?' },
      { id: 't3', q: 'What is the "place for everything" principle in Seiton?' },
      { id: 'c1', q: 'What is the dual purpose of Seiso?' },
      { id: 'c2', q: 'How often should Seiso be performed?' },
      { id: 'c3', q: 'What can cleaning reveal during Seiso?' },
      { id: 'd1', q: 'What is the purpose of Seiketsu?' },
      { id: 'd2', q: 'What is a Standard Operating Procedure (SOP)?' },
      { id: 'd3', q: 'Why is standardization important in 5S?' },
      { id: 'u1', q: 'What is the main focus of Shitsuke?' },
      { id: 'u2', q: 'How do you sustain 5S practices?' },
      { id: 'u3', q: 'What makes Shitsuke different from other 5S principles?' }
    ];

    const optionsList = [
      ['Identify all items', 'Clean the area', 'Organize tools', 'Create labels'],
      ['Keep them in storage', 'Remove them', 'Organize them', 'Label them'],
      ['Marking items to evaluate', 'Cleaning schedule', 'Safety signs', 'Tool organization'],
      ['Organize for easy access', 'Clean the workplace', 'Remove waste', 'Create standards'],
      ['Shadow boards', 'Cleaning supplies', 'Red tags', 'Safety equipment'],
      ['Designated location', 'Cleaned daily', 'Labeled', 'Removed'],
      ['Clean and inspect', 'Organize and label', 'Sort and remove', 'Standardize'],
      ['Daily', 'Weekly', 'Monthly', 'Annually'],
      ['Problems and defects', 'Organized tools', 'Clean surfaces', 'Labeled items'],
      ['Create standards', 'Clean the area', 'Organize tools', 'Remove waste'],
      ['Written instructions', 'Cleaning schedule', 'Tool inventory', 'Safety rules'],
      ['Ensures consistency', 'Saves time', 'Reduces cost', 'All of the above'],
      ['Maintain discipline', 'Clean the area', 'Organize tools', 'Create standards'],
      ['Regular audits', 'One-time cleaning', 'Organizing once', 'Removing items'],
      ['Sustains all principles', 'First step', 'Easiest', 'Optional']
    ];

    const correctAnswers = [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0];

    html += `
        </div>

        <div class="section">
          <div class="section-title">📝 Detailed Answers</div>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Question</th>
                <th>Your Answer</th>
                <th>Correct Answer</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
    `;

    allQuestions.forEach((q, idx) => {
      const userAnswer = assessment.answers?.[q.id];
      const correct = correctAnswers[idx];
      const isCorrect = userAnswer === correct;
      const opts = optionsList[idx] || ['Option A', 'Option B', 'Option C', 'Option D'];
      
      html += `
        <tr>
          <td style="text-align:center;">${idx + 1}</td>
          <td style="font-size:12px;">${q.q}</td>
          <td style="font-size:12px;">${userAnswer !== undefined ? opts[userAnswer] || 'Not answered' : 'Not answered'}</td>
          <td style="font-size:12px;">${opts[correct]}</td>
          <td style="text-align:center;">
            <span class="${isCorrect ? 'correct' : 'incorrect'}">${isCorrect ? '✅' : '❌'}</span>
          </td>
        </tr>
      `;
    });

    html += `
            </tbody>
          </table>
        </div>

        <div class="footer">
          <p>Generated by 5S Assessment System • © ${new Date().getFullYear()} WKW Automotive</p>
          <p>Department: Amélioration Contenue WKW Tunisia</p>
        </div>
      </body>
      </html>
    `;

    return html;
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

  // Export individual assessment - FIXED
  const exportIndividualPDF = (assessment) => {
    if (!assessment) {
      alert('No assessment data to export');
      return;
    }
    const html = generateAssessmentPDFHTML(assessment);
    const filename = `5S-Assessment-${assessment.prenom || 'user'}-${assessment.nom || 'unknown'}-${new Date().toISOString().split('T')[0]}.pdf`;
    handleExportPDF(html, filename);
  };

  // Export all assessments - FIXED
  const exportAllPDF = () => {
    if (assessments.length === 0) {
      alert('No assessments available to export.');
      return;
    }

    let allHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>All 5S Assessments Report</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 30px; background: #f8fafc; }
          .header { text-align: center; padding: 25px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border-radius: 12px; margin-bottom: 25px; }
          .header h1 { margin: 0; font-size: 28px; }
          .header p { margin: 5px 0; opacity: 0.9; }
          .header .count { margin-top: 10px; display: inline-block; padding: 5px 20px; background: rgba(255,255,255,0.2); border-radius: 20px; }
          .assessment-block { background: white; border-radius: 12px; padding: 25px; margin-bottom: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.08); page-break-after: always; }
          .assessment-title { font-size: 20px; font-weight: bold; color: #1a2a3a; border-bottom: 2px solid #667eea; padding-bottom: 10px; margin-bottom: 20px; }
          .info-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; background: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 15px; }
          .score-badge { display: inline-block; padding: 5px 15px; border-radius: 20px; font-weight: bold; }
          .score-high { background: #d1fae5; color: #065f46; }
          .score-medium { background: #fef3c7; color: #92400e; }
          .score-low { background: #fee2e2; color: #991b1b; }
          .footer { text-align: center; padding: 20px; color: #94a3b8; font-size: 12px; border-top: 1px solid #e2e8f0; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>📊 All 5S Assessments Report</h1>
          <p>Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</p>
          <div class="count">Total Assessments: ${assessments.length}</div>
        </div>
    `;

    assessments.forEach((a, index) => {
      allHtml += `
        <div class="assessment-block">
          <div class="assessment-title">Assessment #${index + 1}</div>
          <div class="info-grid">
            <div><strong>Name:</strong> ${a.prenom || 'N/A'} ${a.nom || 'N/A'}</div>
            <div><strong>Matricule:</strong> ${a.matricule || 'N/A'}</div>
            <div><strong>Score:</strong> ${a.score || 0}/15</div>
          </div>
          <div style="text-align:center;padding:10px;">
            <span class="score-badge ${a.score >= 12 ? 'score-high' : (a.score >= 8 ? 'score-medium' : 'score-low')}">
              ${a.score >= 12 ? '✅ Excellent' : (a.score >= 8 ? '📊 Good' : '📈 Needs Improvement')}
            </span>
          </div>
        </div>
      `;
    });

    allHtml += `
        <div class="footer">
          <p>Generated by 5S Assessment System • © ${new Date().getFullYear()} WKW Automotive</p>
          <p>Department: Amélioration Contenue WKW Tunisia</p>
        </div>
      </body>
      </html>
    `;

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
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid #e2e8f0',
          borderTop: '4px solid #667eea',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <p style={{ color: '#5a6a7a' }}>Loading admin dashboard...</p>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
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
      case 'adminModule':
        return <AdminModule language={language} />;
      case 'overview':
      default:
        return (
          <div>
            {/* Statistics Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '15px',
              marginBottom: '25px'
            }}>
              <div style={{
                padding: '20px',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                borderRadius: '12px',
                color: 'white'
              }}>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>{getTranslation('totalUsers')}</div>
                <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{users.length}</div>
              </div>
              <div style={{
                padding: '20px',
                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                borderRadius: '12px',
                color: 'white'
              }}>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>{getTranslation('totalAssessments')}</div>
                <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{assessments.length}</div>
              </div>
              <div style={{
                padding: '20px',
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                borderRadius: '12px',
                color: 'white'
              }}>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>{getTranslation('averageScore')}</div>
                <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{stats?.averageScore || 0}/15</div>
              </div>
              <div style={{
                padding: '20px',
                background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
                borderRadius: '12px',
                color: 'white'
              }}>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>{getTranslation('totalPoints')}</div>
                <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{stats?.totalScore || 0}</div>
              </div>
            </div>

            {/* Principle Breakdown */}
            {stats?.principleScores && (
              <div style={{
                background: 'white',
                padding: '20px',
                borderRadius: '12px',
                marginBottom: '25px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
              }}>
                <h3 style={{ marginBottom: '15px' }}>{getTranslation('principleBreakdown')}</h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
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
                        background: '#f8fafc',
                        borderRadius: '10px',
                        border: '1px solid #e2e8f0'
                      }}>
                        <div style={{ fontWeight: '600' }}>{names[p] || p}</div>
                        <div style={{
                          fontSize: '24px',
                          fontWeight: 'bold',
                          color: pct >= 80 ? '#22c55e' : (pct >= 60 ? '#f59e0b' : '#dc2626')
                        }}>
                          {pct}%
                        </div>
                        <div style={{ fontSize: '12px', color: '#5a6a7a' }}>
                          {data.correct}/{data.total} correct
                        </div>
                        <div style={{
                          width: '100%',
                          height: '6px',
                          background: '#e2e8f0',
                          borderRadius: '3px',
                          marginTop: '8px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            width: `${pct}%`,
                            height: '100%',
                            background: pct >= 80 ? '#22c55e' : (pct >= 60 ? '#f59e0b' : '#dc2626')
                          }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Assessments Table */}
            <div style={{
              background: 'white',
              padding: '20px',
              borderRadius: '12px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '15px',
                flexWrap: 'wrap',
                gap: '10px'
              }}>
                <h3>📋 {getTranslation('assessments')} ({assessments.length})</h3>
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
                      fontSize: '14px',
                      outline: 'none',
                      minWidth: '200px'
                    }}
                  />
                  <button
                    onClick={exportAllPDF}
                    style={{
                      padding: '8px 16px',
                      background: '#dc2626',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: '500'
                    }}
                  >
                    📄 {getTranslation('exportAllPDF')}
                  </button>
                </div>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc' }}>
                      <th style={{ padding: '10px', textAlign: 'left' }}>{getTranslation('name')}</th>
                      <th style={{ padding: '10px', textAlign: 'left' }}>{getTranslation('matricule')}</th>
                      <th style={{ padding: '10px', textAlign: 'center' }}>{getTranslation('score')}</th>
                      <th style={{ padding: '10px', textAlign: 'center' }}>{getTranslation('completed')}</th>
                      <th style={{ padding: '10px', textAlign: 'center' }}>{getTranslation('date')}</th>
                      <th style={{ padding: '10px', textAlign: 'center' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAssessments.length === 0 ? (
                      <tr>
                        <td colSpan="6" style={{ padding: '30px', textAlign: 'center', color: '#94a3b8' }}>
                          {getTranslation('noData')}
                        </td>
                      </tr>
                    ) : (
                      filteredAssessments.slice(0, 50).map((a, index) => (
                        <tr key={index} style={{ borderBottom: '1px solid #e2e8f0' }}>
                          <td style={{ padding: '10px' }}>{a.prenom} {a.nom}</td>
                          <td style={{ padding: '10px' }}>{a.matricule}</td>
                          <td style={{
                            padding: '10px',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            color: a.score >= 12 ? '#22c55e' : (a.score >= 8 ? '#f59e0b' : '#dc2626')
                          }}>
                            {a.score || 0}/15
                          </td>
                          <td style={{ padding: '10px', textAlign: 'center' }}>
                            {a.results ? Object.keys(a.results).filter(r => a.results[r].correct === a.results[r].total).length : 0}/5
                          </td>
                          <td style={{ padding: '10px', textAlign: 'center' }}>
                            {a.createdAt ? new Date(a.createdAt).toLocaleDateString() : 'N/A'}
                          </td>
                          <td style={{ padding: '10px', textAlign: 'center' }}>
                            <button
                              onClick={() => exportIndividualPDF(a)}
                              style={{
                                padding: '4px 12px',
                                background: '#667eea',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '12px'
                              }}
                            >
                              📄 PDF
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
                {filteredAssessments.length > 50 && (
                  <p style={{ textAlign: 'center', color: '#94a3b8', padding: '10px' }}>
                    Showing 50 of {filteredAssessments.length} assessments
                  </p>
                )}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#f8fafc',
      padding: '15px',
      paddingBottom: '30px'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        padding: '20px 25px',
        marginBottom: '25px',
        borderRadius: '16px',
        color: 'white'
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
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '8px',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)'
              }}
            >
              🔄 {getTranslation('refresh')}
            </button>
            <button
              onClick={exportAllPDF}
              style={{
                padding: '8px 16px',
                background: 'rgba(220,38,38,0.8)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              📄 {getTranslation('exportAllPDF')}
            </button>
            <button
              onClick={onLogout}
              style={{
                padding: '8px 16px',
                background: 'rgba(220,38,38,0.8)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
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
            background: activeTab === 'overview' ? '#667eea' : 'transparent',
            color: activeTab === 'overview' ? 'white' : '#475569',
            border: activeTab === 'overview' ? '2px solid #667eea' : '2px solid transparent',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          📊 {getTranslation('overview')}
        </button>
        <button
          onClick={() => setActiveTab('formation')}
          style={{
            padding: '10px 24px',
            background: activeTab === 'formation' ? '#667eea' : 'transparent',
            color: activeTab === 'formation' ? 'white' : '#475569',
            border: activeTab === 'formation' ? '2px solid #667eea' : '2px solid transparent',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          📚 {getTranslation('formation')}
        </button>
        <button
          onClick={() => setActiveTab('progression')}
          style={{
            padding: '10px 24px',
            background: activeTab === 'progression' ? '#667eea' : 'transparent',
            color: activeTab === 'progression' ? 'white' : '#475569',
            border: activeTab === 'progression' ? '2px solid #667eea' : '2px solid transparent',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          📈 {getTranslation('progression')}
        </button>
        <button
          onClick={() => setActiveTab('adminModule')}
          style={{
            padding: '10px 24px',
            background: activeTab === 'adminModule' ? '#667eea' : 'transparent',
            color: activeTab === 'adminModule' ? 'white' : '#475569',
            border: activeTab === 'adminModule' ? '2px solid #667eea' : '2px solid transparent',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          🏢 {getTranslation('adminModule')}
        </button>
      </div>

      {/* Content */}
      {renderContent()}
    </div>
  );
};

// Default export - CRITICAL
export default AdminDashboard;
