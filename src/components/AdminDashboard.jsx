import React, { useState, useEffect } from 'react';
import { 
  getAllUsers, 
  getAllAssessments, 
  getAssessmentStats,
  getUserAssessments 
} from '../services/adminService';
import { logout } from '../services/authService';

const AdminDashboard = ({ user, onLogout, language }) => {
  const [users, setUsers] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userAssessments, setUserAssessments] = useState([]);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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
      users: { en: '👥 Users', fr: '👥 Utilisateurs', ar: '👥 المستخدمين' },
      assessments: { en: '📋 Assessments', fr: '📋 Évaluations', ar: '📋 التقييمات' },
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
      question: { en: 'Question', fr: 'Question', ar: 'سؤال' },
      correct: { en: 'Correct', fr: 'Correct', ar: 'صحيح' },
      incorrect: { en: 'Incorrect', fr: 'Incorrect', ar: 'غير صحيح' },
      yourAnswer: { en: 'Your Answer', fr: 'Votre Réponse', ar: 'إجابتك' },
      correctAnswer: { en: 'Correct Answer', fr: 'Réponse Correcte', ar: 'الإجابة الصحيحة' },
      status: { en: 'Status', fr: 'Statut', ar: 'الحالة' }
    };
    return translations[key]?.[language] || translations[key]?.en || key;
  };

  const generateDetailedAssessmentHTML = (assessment) => {
    const principleNames = {
      seiri: { en: 'Seiri (Sort)', fr: 'Seiri (Trier)', ar: 'سيري (الفرز)' },
      seiton: { en: 'Seiton (Set in order)', fr: 'Seiton (Ranger)', ar: 'سيتون (الترتيب)' },
      seiso: { en: 'Seiso (Shine)', fr: 'Seiso (Nettoyer)', ar: 'سيسو (التنظيف)' },
      seiketsu: { en: 'Seiketsu (Standardize)', fr: 'Seiketsu (Standardiser)', ar: 'سيكيتسو (التوحيد)' },
      shitsuke: { en: 'Shitsuke (Sustain)', fr: 'Shitsuke (Maintenir)', ar: 'شيتسوكي (الاستدامة)' }
    };

    const allQuestions = [
      { id: 's1', principle: 'seiri', question: 'What is the first step in implementing Seiri?' },
      { id: 's2', principle: 'seiri', question: 'What should you do with items that are not needed in Seiri?' },
      { id: 's3', principle: 'seiri', question: 'What is the red tag technique used for in Seiri?' },
      { id: 't1', principle: 'seiton', question: 'What is the main goal of Seiton?' },
      { id: 't2', principle: 'seiton', question: 'What tool is used in Seiton for visual organization?' },
      { id: 't3', principle: 'seiton', question: 'What is the "place for everything" principle in Seiton?' },
      { id: 'c1', principle: 'seiso', question: 'What is the dual purpose of Seiso?' },
      { id: 'c2', principle: 'seiso', question: 'How often should Seiso be performed?' },
      { id: 'c3', principle: 'seiso', question: 'What can cleaning reveal during Seiso?' },
      { id: 'd1', principle: 'seiketsu', question: 'What is the purpose of Seiketsu?' },
      { id: 'd2', principle: 'seiketsu', question: 'What is a Standard Operating Procedure (SOP)?' },
      { id: 'd3', principle: 'seiketsu', question: 'Why is standardization important in 5S?' },
      { id: 'u1', principle: 'shitsuke', question: 'What is the main focus of Shitsuke?' },
      { id: 'u2', principle: 'shitsuke', question: 'How do you sustain 5S practices?' },
      { id: 'u3', principle: 'shitsuke', question: 'What makes Shitsuke different from other 5S principles?' }
    ];

    const options = {
      en: [
        ['Identify all items in the workspace', 'Clean the area', 'Organize tools', 'Create labels'],
        ['Keep them in storage', 'Remove them from workspace', 'Organize them better', 'Label them'],
        ['Marking items to be evaluated', 'Cleaning schedule', 'Safety signs', 'Tool organization'],
        ['Organize items for easy access', 'Clean the workplace', 'Remove waste', 'Create standards'],
        ['Shadow boards', 'Cleaning supplies', 'Red tags', 'Safety equipment'],
        ['Everything has a designated location', 'Everything is cleaned daily', 'Everything is labeled', 'Everything is removed'],
        ['Clean and inspect', 'Organize and label', 'Sort and remove', 'Standardize and sustain'],
        ['Daily', 'Weekly', 'Monthly', 'Annually'],
        ['Problems and defects', 'Organized tools', 'Clean surfaces', 'Labeled items'],
        ['Create standards and procedures', 'Clean the area', 'Organize tools', 'Remove waste'],
        ['Written instructions for tasks', 'Cleaning schedule', 'Tool inventory', 'Safety rules'],
        ['Ensures consistency', 'Saves time', 'Reduces cost', 'All of the above'],
        ['Maintain discipline and improvement', 'Clean the area', 'Organize tools', 'Create standards'],
        ['Regular audits and training', 'One-time cleaning', 'Organizing once', 'Removing items'],
        ['It sustains all other principles', 'It is the first step', 'It is the easiest', 'It is optional']
      ],
      fr: [
        ['Identifier tous les articles dans l\'espace de travail', 'Nettoyer la zone', 'Organiser les outils', 'Créer des étiquettes'],
        ['Les garder dans le stockage', 'Les retirer de l\'espace de travail', 'Mieux les organiser', 'Les étiqueter'],
        ['Marquer les articles à évaluer', 'Calendrier de nettoyage', 'Panneaux de sécurité', 'Organisation des outils'],
        ['Organiser les articles pour un accès facile', 'Nettoyer le lieu de travail', 'Retirer les déchets', 'Créer des standards'],
        ['Tableaux d\'ombre', 'Fournitures de nettoyage', 'Tags rouges', 'Équipement de sécurité'],
        ['Chaque chose a un emplacement désigné', 'Chaque chose est nettoyée quotidiennement', 'Chaque chose est étiquetée', 'Chaque chose est retirée'],
        ['Nettoyer et inspecter', 'Organiser et étiqueter', 'Trier et retirer', 'Standardiser et maintenir'],
        ['Quotidiennement', 'Hebdomadairement', 'Mensuellement', 'Annuellement'],
        ['Problèmes et défauts', 'Outils organisés', 'Surfaces propres', 'Articles étiquetés'],
        ['Créer des standards et procédures', 'Nettoyer la zone', 'Organiser les outils', 'Retirer les déchets'],
        ['Instructions écrites pour les tâches', 'Calendrier de nettoyage', 'Inventaire des outils', 'Règles de sécurité'],
        ['Assure la cohérence', 'Gagne du temps', 'Réduit les coûts', 'Toutes les réponses'],
        ['Maintenir la discipline et l\'amélioration', 'Nettoyer la zone', 'Organiser les outils', 'Créer des standards'],
        ['Audits et formations réguliers', 'Nettoyage ponctuel', 'Organiser une fois', 'Retirer les articles'],
        ['Il soutient tous les autres principes', 'C\'est la première étape', 'C\'est le plus facile', 'C\'est facultatif']
      ],
      ar: [
        ['تحديد جميع العناصر في مكان العمل', 'تنظيف المنطقة', 'تنظيم الأدوات', 'إنشاء ملصقات'],
        ['الاحتفاظ بها في المخزن', 'إزالتها من مكان العمل', 'تنظيمها بشكل أفضل', 'وضع ملصقات عليها'],
        ['تحديد العناصر المراد تقييمها', 'جدول التنظيف', 'علامات السلامة', 'تنظيم الأدوات'],
        ['تنظيم العناصر لسهولة الوصول', 'تنظيف مكان العمل', 'إزالة النفايات', 'إنشاء معايير'],
        ['لوحات الظل', 'مستلزمات التنظيف', 'بطاقات حمراء', 'معدات السلامة'],
        ['كل شيء له موقع محدد', 'كل شيء يتم تنظيفه يومياً', 'كل شيء م labeled', 'كل شيء يتم إزالته'],
        ['تنظيف وفحص', 'تنظيم ووضع ملصقات', 'فرز وإزالة', 'توحيد واستدامة'],
        ['يومياً', 'أسبوعياً', 'شهرياً', 'سنوياً'],
        ['المشاكل والعيوب', 'الأدوات المنظمة', 'الأسطح النظيفة', 'العناصر الم labeled'],
        ['إنشاء معايير وإجراءات', 'تنظيف المنطقة', 'تنظيم الأدوات', 'إزالة النفايات'],
        ['تعليمات مكتوبة للمهام', 'جدول التنظيف', 'جرد الأدوات', 'قواعد السلامة'],
        ['يضمن الاتساق', 'يوفر الوقت', 'يقلل التكلفة', 'كل ما سبق'],
        ['الحفاظ على الانضباط والتحسين', 'تنظيف المنطقة', 'تنظيم الأدوات', 'إنشاء معايير'],
        ['التدقيق والتدريب المنتظم', 'تنظيف لمرة واحدة', 'تنظيم مرة واحدة', 'إزالة العناصر'],
        ['يحافظ على جميع المبادئ الأخرى', 'إنها الخطوة الأولى', 'إنها الأسهل', 'إنها اختيارية']
      ]
    };

    const correctAnswers = [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0];

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
          .info-item { padding: 5px; }
          .info-item strong { color: #475569; }
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
          .badge { display: inline-block; padding: 2px 10px; border-radius: 12px; font-size: 11px; font-weight: 600; }
          .badge-pass { background: #dcfce7; color: #16a34a; }
          .badge-fail { background: #fee2e2; color: #dc2626; }
          .status-icon { font-size: 18px; }
    `;

    html += `
        </style>
      </head>
      <body>
        <div class="header">
          <h1>📋 5S Assessment Report</h1>
          <p>Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</p>
          <p style="font-size:14px;">Assessment ID: ${assessment.id || 'N/A'}</p>
        </div>

        <div class="section">
          <div class="section-title">👤 Candidate Information</div>
          <div class="info-grid">
            <div class="info-item"><strong>Name:</strong> ${assessment.prenom} ${assessment.nom}</div>
            <div class="info-item"><strong>Matricule:</strong> ${assessment.matricule}</div>
            <div class="info-item"><strong>Email:</strong> ${assessment.email || 'N/A'}</div>
            <div class="info-item"><strong>Date:</strong> ${new Date(assessment.createdAt).toLocaleDateString()}</div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">📊 Overall Score</div>
          <div style="text-align:center;padding:20px;">
            <div style="font-size:48px;font-weight:bold;color:#667eea;">${assessment.score}/15</div>
            <div style="font-size:18px;color:#475569;margin:5px 0;">${Math.round((assessment.score/15)*100)}%</div>
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

    const principleNamesList = ['seiri', 'seiton', 'seiso', 'seiketsu', 'shitsuke'];
    principleNamesList.forEach(p => {
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

    html += `
        </div>

        <div class="section">
          <div class="section-title">📝 Detailed Answers</div>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>${getTranslation('question')}</th>
                <th>${getTranslation('yourAnswer')}</th>
                <th>${getTranslation('correctAnswer')}</th>
                <th>${getTranslation('status')}</th>
              </tr>
            </thead>
            <tbody>
    `;

    allQuestions.forEach((q, index) => {
      const userAnswer = assessment.answers?.[q.id];
      const correct = correctAnswers[index] !== undefined ? correctAnswers[index] : 0;
      const isCorrect = userAnswer === correct;
      const optionsList = options[language]?.[index] || options.en[index] || ['Option A', 'Option B', 'Option C', 'Option D'];
      
      html += `
        <tr>
          <td style="text-align:center;">${index + 1}</td>
          <td style="font-size:12px;">${q.question}</td>
          <td style="font-size:12px;">${userAnswer !== undefined ? optionsList[userAnswer] || 'Not answered' : 'Not answered'}</td>
          <td style="font-size:12px;">${optionsList[correct]}</td>
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
          <p>Generated by 5S Assessment System • © ${new Date().getFullYear()} All Rights Reserved</p>
          <p>This report is confidential and for internal use only.</p>
        </div>
      </body>
      </html>
    `;

    return html;
  };

  const handleExportPDF = async (html, filename) => {
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
      html2canvas: { 
        scale: 2,
        useCORS: true,
        logging: false
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait' 
      }
    };
    
    html2pdf.default().set(opt).from(element).save();
  };

  const exportDetailedPDF = (assessment) => {
    const html = generateDetailedAssessmentHTML(assessment);
    const filename = `5S-Assessment-${assessment.prenom}-${assessment.nom}-${new Date().toISOString().split('T')[0]}.pdf`;
    handleExportPDF(html, filename);
  };

  const exportAllDetailedPDF = () => {
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
          .assessment-block { background: white; border-radius: 12px; padding: 20px; margin-bottom: 25px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); page-break-after: always; }
          .assessment-title { font-size: 18px; font-weight: bold; color: #1a2a3a; border-bottom: 2px solid #667eea; padding-bottom: 8px; margin-bottom: 15px; }
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
          <p>Total Assessments: ${assessments.length}</p>
        </div>
    `;

    assessments.forEach((a, index) => {
      allHtml += `
        <div class="assessment-block">
          <div class="assessment-title">Assessment #${index + 1}</div>
          <div class="info-grid">
            <div><strong>Name:</strong> ${a.prenom} ${a.nom}</div>
            <div><strong>Matricule:</strong> ${a.matricule}</div>
            <div><strong>Score:</strong> ${a.score}/15</div>
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
          <p>Generated by 5S Assessment System • © ${new Date().getFullYear()} All Rights Reserved</p>
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

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8fafc',
      padding: '10px'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: 'white',
        padding: '15px 20px',
        borderRadius: '12px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '10px',
        marginBottom: '20px'
      }}>
        <div>
          <h1 style={{ 
            fontSize: 'clamp(1.2rem, 4vw, 1.8rem)', 
            color: '#1a2a3a' 
          }}>
            👑 {getTranslation('title')}
          </h1>
          <p style={{ fontSize: 'clamp(0.7rem, 2vw, 0.9rem)', color: '#5a6a7a' }}>
            {user?.email || 'Admin'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={exportAllDetailedPDF}
            style={{
              padding: '8px 16px',
              backgroundColor: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: 'clamp(0.7rem, 1.5vw, 0.9rem)',
              fontWeight: '500'
            }}
          >
            📄 {getTranslation('exportAllPDF')}
          </button>
          <button
            onClick={onLogout}
            style={{
              padding: '8px 16px',
              backgroundColor: '#fee2e2',
              color: '#dc2626',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: 'clamp(0.7rem, 1.5vw, 0.9rem)',
              fontWeight: '500'
            }}
          >
            {getTranslation('logout')}
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Statistics Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(140px, 20vw, 200px), 1fr))',
          gap: '15px',
          marginBottom: '20px'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '15px',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
          }}>
            <div style={{ fontSize: 'clamp(0.6rem, 1.5vw, 0.8rem)', color: '#5a6a7a' }}>
              {getTranslation('totalUsers')}
            </div>
            <div style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: '700', color: '#667eea' }}>
              {users.length}
            </div>
          </div>
          <div style={{
            backgroundColor: 'white',
            padding: '15px',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
          }}>
            <div style={{ fontSize: 'clamp(0.6rem, 1.5vw, 0.8rem)', color: '#5a6a7a' }}>
              {getTranslation('totalAssessments')}
            </div>
            <div style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: '700', color: '#22c55e' }}>
              {assessments.length}
            </div>
          </div>
          <div style={{
            backgroundColor: 'white',
            padding: '15px',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
          }}>
            <div style={{ fontSize: 'clamp(0.6rem, 1.5vw, 0.8rem)', color: '#5a6a7a' }}>
              {getTranslation('averageScore')}
            </div>
            <div style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: '700', color: '#f59e0b' }}>
              {stats?.averageScore || 0}/15
            </div>
          </div>
        </div>

        {/* Principle Breakdown */}
        {stats?.principleScores && (
          <div style={{
            backgroundColor: 'white',
            padding: '15px',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            marginBottom: '20px'
          }}>
            <h3 style={{ 
              fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)', 
              color: '#1a2a3a', 
              marginBottom: '12px' 
            }}>
              {getTranslation('principleBreakdown')}
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(140px, 20vw, 180px), 1fr))',
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
                    padding: '12px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '10px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <div style={{ fontSize: 'clamp(0.7rem, 1.5vw, 0.85rem)', fontWeight: '600', color: '#1a2a3a' }}>
                      {names[p] || p}
                    </div>
                    <div style={{
                      fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
                      fontWeight: '700',
                      color: pct >= 80 ? '#22c55e' : (pct >= 60 ? '#f59e0b' : '#dc2626')
                    }}>
                      {pct}%
                    </div>
                    <div style={{ fontSize: 'clamp(0.6rem, 1.2vw, 0.75rem)', color: '#5a6a7a' }}>
                      {data.correct}/{data.total} correct
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Assessments Table */}
        <div style={{
          backgroundColor: 'white',
          padding: '15px',
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
            <h3 style={{ 
              fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)', 
              color: '#1a2a3a' 
            }}>
              📋 {getTranslation('assessments')} ({assessments.length})
            </h3>
            <input
              type="text"
              placeholder={getTranslation('search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: 'clamp(0.7rem, 1.5vw, 0.9rem)',
                outline: 'none',
                minWidth: 'clamp(120px, 30vw, 200px)'
              }}
            />
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: 'clamp(0.65rem, 1.2vw, 0.85rem)'
            }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc' }}>
                  <th style={{ padding: '8px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>
                    {getTranslation('name')}
                  </th>
                  <th style={{ padding: '8px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>
                    {getTranslation('matricule')}
                  </th>
                  <th style={{ padding: '8px', textAlign: 'center', borderBottom: '2px solid #e2e8f0' }}>
                    {getTranslation('score')}
                  </th>
                  <th style={{ padding: '8px', textAlign: 'center', borderBottom: '2px solid #e2e8f0' }}>
                    {getTranslation('completed')}
                  </th>
                  <th style={{ padding: '8px', textAlign: 'center', borderBottom: '2px solid #e2e8f0' }}>
                    {getTranslation('date')}
                  </th>
                  <th style={{ padding: '8px', textAlign: 'center', borderBottom: '2px solid #e2e8f0' }}>
                    Actions
                  </th>
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
                  filteredAssessments.slice(0, 20).map((a, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '8px' }}>{a.prenom} {a.nom}</td>
                      <td style={{ padding: '8px' }}>{a.matricule}</td>
                      <td style={{
                        padding: '8px',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        color: a.score >= 12 ? '#22c55e' : (a.score >= 8 ? '#f59e0b' : '#dc2626')
                      }}>
                        {a.score}/15
                      </td>
                      <td style={{ padding: '8px', textAlign: 'center' }}>
                        {a.results ? Object.keys(a.results).filter(r => a.results[r].correct === a.results[r].total).length : 0}/5
                      </td>
                      <td style={{ padding: '8px', textAlign: 'center' }}>
                        {new Date(a.createdAt).toLocaleDateString()}
                      </td>
                      <td style={{ padding: '8px', textAlign: 'center' }}>
                        <button
                          onClick={() => exportDetailedPDF(a)}
                          style={{
                            padding: '4px 10px',
                            backgroundColor: '#dc2626',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: 'clamp(0.6rem, 1vw, 0.75rem)',
                            marginRight: '4px'
                          }}
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
                            padding: '4px 10px',
                            backgroundColor: '#667eea',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: 'clamp(0.6rem, 1vw, 0.75rem)'
                          }}
                        >
                          👁️ {getTranslation('details')}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {filteredAssessments.length > 20 && (
              <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.8rem', padding: '10px' }}>
                Showing 20 of {filteredAssessments.length} assessments
              </p>
            )}
          </div>
        </div>
      </div>

      {/* User Details Modal */}
      {showUserDetails && selectedUser && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '10px',
          backdropFilter: 'blur(4px)'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '16px',
            maxWidth: '600px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            boxShadow: '0 25px 80px rgba(0,0,0,0.3)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '15px'
            }}>
              <h2 style={{ fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', color: '#1a2a3a' }}>
                {getTranslation('userDetails')}
              </h2>
              <button
                onClick={() => setShowUserDetails(false)}
                style={{
                  padding: '4px 12px',
                  backgroundColor: '#e2e8f0',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                ✕
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px',
              marginBottom: '15px',
              fontSize: 'clamp(0.7rem, 1.5vw, 0.85rem)'
            }}>
              <div><strong>{getTranslation('name')}:</strong> {selectedUser.prenom} {selectedUser.nom}</div>
              <div><strong>{getTranslation('matricule')}:</strong> {selectedUser.matricule}</div>
              <div><strong>{getTranslation('email')}:</strong> {selectedUser.email}</div>
              <div><strong>{getTranslation('score')}:</strong> {selectedUser.score}/15</div>
            </div>

            <h3 style={{ fontSize: 'clamp(0.85rem, 2vw, 1rem)', color: '#1a2a3a', marginBottom: '10px' }}>
              📋 {getTranslation('assessments')} ({userAssessments.length})
            </h3>
            
            {userAssessments.length > 0 && (
              <div style={{ marginBottom: '15px' }}>
                {userAssessments.map((a, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px',
                    marginBottom: '8px',
                    border: '1px solid #e2e8f0',
                    flexWrap: 'wrap',
                    gap: '8px'
                  }}>
                    <div>
                      <strong>Assessment #{i + 1}</strong>
                      <span style={{ marginLeft: '10px', color: '#5a6a7a' }}>
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
                        padding: '4px 10px',
                        backgroundColor: '#dc2626',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: 'clamp(0.6rem, 1vw, 0.75rem)'
                      }}
                    >
                      📄 {getTranslation('exportPDF')}
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div style={{
              display: 'flex',
              gap: '10px',
              marginTop: '15px',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={() => setShowUserDetails(false)}
                style={{
                  flex: 1,
                  padding: '10px',
                  backgroundColor: '#e2e8f0',
                  color: '#475569',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: 'clamp(0.7rem, 1.5vw, 0.85rem)',
                  fontWeight: '500',
                  minWidth: '100px'
                }}
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
