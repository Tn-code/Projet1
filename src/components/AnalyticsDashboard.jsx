import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { getAssessmentStats, getAllAssessments } from '../services/adminService';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
);

const AnalyticsDashboard = ({ language }) => {
  const [stats, setStats] = useState(null);
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('month');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [statsResult, assessmentsResult] = await Promise.all([
      getAssessmentStats(),
      getAllAssessments()
    ]);
    if (statsResult.data) setStats(statsResult.data);
    if (assessmentsResult.data) setAssessments(assessmentsResult.data);
    setLoading(false);
  };

  const getTranslation = (key) => {
    const translations = {
      title: { en: '📊 Analytics Dashboard', fr: '📊 Tableau de Bord Analytique', ar: '📊 لوحة التحليل' },
      overview: { en: 'Performance Overview', fr: 'Aperçu de la Performance', ar: 'نظرة عامة على الأداء' },
      averageScore: { en: 'Average Score', fr: 'Score Moyen', ar: 'متوسط النتيجة' },
      totalAssessments: { en: 'Total Assessments', fr: 'Total Évaluations', ar: 'إجمالي التقييمات' },
      totalPoints: { en: 'Total Points', fr: 'Points Totaux', ar: 'إجمالي النقاط' },
      completionRate: { en: 'Completion Rate', fr: 'Taux de Complétion', ar: 'معدل الإكمال' },
      trend: { en: 'Performance Trend', fr: 'Tendance de Performance', ar: 'اتجاه الأداء' },
      principles: { en: 'Principles Performance', fr: 'Performance par Principe', ar: 'الأداء حسب المبدأ' },
      distribution: { en: 'Score Distribution', fr: 'Distribution des Scores', ar: 'توزيع النتائج' },
      exportReport: { en: '📄 Export Report', fr: '📄 Exporter le Rapport', ar: '📄 تصدير التقرير' },
      refresh: { en: '🔄 Refresh', fr: '🔄 Rafraîchir', ar: '🔄 تحديث' }
    };
    return translations[key]?.[language] || translations[key]?.en || key;
  };

  // Prepare data for charts
  const getPerformanceTrend = () => {
    const sorted = [...assessments].sort((a, b) => 
      new Date(a.createdAt) - new Date(b.createdAt)
    );
    const labels = sorted.map(a => new Date(a.createdAt).toLocaleDateString());
    const scores = sorted.map(a => a.score);
    return { labels, scores };
  };

  const getPrinciplesData = () => {
    const principles = {
      seiri: { en: 'Seiri', fr: 'Seiri', ar: 'سيري' },
      seiton: { en: 'Seiton', fr: 'Seiton', ar: 'سيتون' },
      seiso: { en: 'Seiso', fr: 'Seiso', ar: 'سيسو' },
      seiketsu: { en: 'Seiketsu', fr: 'Seiketsu', ar: 'سيكيتسو' },
      shitsuke: { en: 'Shitsuke', fr: 'Shitsuke', ar: 'شيتسوكي' }
    };
    
    const scores = {};
    Object.keys(principles).forEach(p => {
      scores[p] = { correct: 0, total: 0 };
    });
    
    assessments.forEach(a => {
      if (a.results) {
        Object.keys(a.results).forEach(p => {
          if (scores[p]) {
            scores[p].correct += a.results[p].correct || 0;
            scores[p].total += a.results[p].total || 0;
          }
        });
      }
    });
    
    const labels = Object.keys(principles).map(p => principles[p][language] || principles[p].en);
    const data = Object.values(scores).map(s => 
      s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0
    );
    return { labels, data };
  };

  const getScoreDistribution = () => {
    const distribution = { '0-5': 0, '6-10': 0, '11-15': 0 };
    assessments.forEach(a => {
      if (a.score <= 5) distribution['0-5']++;
      else if (a.score <= 10) distribution['6-10']++;
      else distribution['11-15']++;
    });
    return {
      labels: ['0-5', '6-10', '11-15'],
      data: Object.values(distribution)
    };
  };

  const trend = getPerformanceTrend();
  const principles = getPrinciplesData();
  const distribution = getScoreDistribution();

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <div className="spinner" />
        <p>Loading analytics...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '25px',
        flexWrap: 'wrap',
        gap: '15px'
      }}>
        <div>
          <h2 style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', color: '#1a2a3a' }}>
            {getTranslation('title')}
          </h2>
          <p style={{ color: '#5a6a7a' }}>{getTranslation('overview')}</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={loadData}
            style={{
              padding: '8px 16px',
              backgroundColor: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            {getTranslation('refresh')}
          </button>
          <button
            onClick={() => alert('Export PDF - Coming soon!')}
            style={{
              padding: '8px 16px',
              backgroundColor: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            {getTranslation('exportReport')}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
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
          <div style={{ fontSize: '12px', opacity: 0.8 }}>{getTranslation('averageScore')}</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{stats?.averageScore || 0}/15</div>
        </div>
        <div style={{
          padding: '20px',
          background: 'linear-gradient(135deg, #22c55e, #16a34a)',
          borderRadius: '12px',
          color: 'white'
        }}>
          <div style={{ fontSize: '12px', opacity: 0.8 }}>{getTranslation('totalAssessments')}</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{stats?.totalAssessments || 0}</div>
        </div>
        <div style={{
          padding: '20px',
          background: 'linear-gradient(135deg, #f59e0b, #d97706)',
          borderRadius: '12px',
          color: 'white'
        }}>
          <div style={{ fontSize: '12px', opacity: 0.8 }}>{getTranslation('totalPoints')}</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{stats?.totalScore || 0}</div>
        </div>
        <div style={{
          padding: '20px',
          background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
          borderRadius: '12px',
          color: 'white'
        }}>
          <div style={{ fontSize: '12px', opacity: 0.8 }}>{getTranslation('completionRate')}</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{stats?.totalAssessments > 0 ? '75%' : '0%'}</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '20px',
        marginBottom: '20px'
      }}>
        {/* Performance Trend */}
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
        }}>
          <h4 style={{ marginBottom: '15px' }}>{getTranslation('trend')}</h4>
          <Line
            data={{
              labels: trend.labels.slice(-10),
              datasets: [{
                label: 'Score',
                data: trend.scores.slice(-10),
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                fill: true,
                tension: 0.4
              }]
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false }
              }
            }}
          />
        </div>

        {/* Principles Performance */}
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
        }}>
          <h4 style={{ marginBottom: '15px' }}>{getTranslation('principles')}</h4>
          <Bar
            data={{
              labels: principles.labels,
              datasets: [{
                label: 'Performance (%)',
                data: principles.data,
                backgroundColor: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFD93D'],
                borderRadius: 8
              }]
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false }
              },
              scales: {
                y: {
                  max: 100,
                  beginAtZero: true
                }
              }
            }}
          />
        </div>

        {/* Score Distribution */}
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
        }}>
          <h4 style={{ marginBottom: '15px' }}>{getTranslation('distribution')}</h4>
          <Doughnut
            data={{
              labels: ['0-5 (Low)', '6-10 (Medium)', '11-15 (High)'],
              datasets: [{
                data: distribution.data,
                backgroundColor: ['#dc2626', '#f59e0b', '#22c55e'],
                borderWidth: 0
              }]
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'bottom'
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
