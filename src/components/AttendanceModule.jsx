import React, { useState } from 'react';

const AttendanceModule = ({ language }) => {
  const [attendance, setAttendance] = useState([
    { id: 1, name: 'Ahmed Ben Ali', date: '2024-01-15', status: 'present', department: 'Production' },
    { id: 2, name: 'Fatma Ben Salah', date: '2024-01-15', status: 'absent', department: 'Quality' },
    { id: 3, name: 'Mohamed Trabelsi', date: '2024-01-15', status: 'present', department: 'Production' },
    { id: 4, name: 'Sarah Ayari', date: '2024-01-15', status: 'late', department: 'Logistics' },
    { id: 5, name: 'Karim Akkari', date: '2024-01-15', status: 'present', department: 'Maintenance' }
  ]);

  const [filter, setFilter] = useState('all');

  const getTranslation = (key) => {
    const translations = {
      title: { en: '📋 Attendance Module', fr: '📋 Module de Présence', ar: '📋 وحدة الحضور' },
      date: { en: 'Date', fr: 'Date', ar: 'التاريخ' },
      name: { en: 'Name', fr: 'Nom', ar: 'الاسم' },
      department: { en: 'Department', fr: 'Département', ar: 'القسم' },
      status: { en: 'Status', fr: 'Statut', ar: 'الحالة' },
      present: { en: '✅ Present', fr: '✅ Présent', ar: '✅ حاضر' },
      absent: { en: '❌ Absent', fr: '❌ Absent', ar: '❌ غائب' },
      late: { en: '⏰ Late', fr: '⏰ En Retard', ar: '⏰ متأخر' },
      all: { en: 'All', fr: 'Tous', ar: 'الكل' },
      presentOnly: { en: 'Present', fr: 'Présents', ar: 'الحاضرون' },
      absentOnly: { en: 'Absent', fr: 'Absents', ar: 'الغائبون' },
      lateOnly: { en: 'Late', fr: 'En Retard', ar: 'المتأخرون' },
      summary: { en: '📊 Attendance Summary', fr: '📊 Résumé des Présences', ar: '📊 ملخص الحضور' },
      total: { en: 'Total', fr: 'Total', ar: 'الإجمالي' },
      presentCount: { en: 'Present', fr: 'Présents', ar: 'حاضر' },
      absentCount: { en: 'Absent', fr: 'Absents', ar: 'غائب' },
      lateCount: { en: 'Late', fr: 'Retard', ar: 'متأخر' },
      noData: { en: 'No attendance records', fr: 'Aucun enregistrement de présence', ar: 'لا توجد سجلات حضور' },
      exportReport: { en: '📄 Export Report', fr: '📄 Exporter le Rapport', ar: '📄 تصدير التقرير' }
    };
    return translations[key]?.[language] || translations[key]?.en || key;
  };

  const filteredAttendance = attendance.filter(a => {
    if (filter === 'all') return true;
    return a.status === filter;
  });

  const stats = {
    total: attendance.length,
    present: attendance.filter(a => a.status === 'present').length,
    absent: attendance.filter(a => a.status === 'absent').length,
    late: attendance.filter(a => a.status === 'late').length
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <h2>{getTranslation('title')}</h2>
        <button
          style={{
            padding: '10px 20px',
            backgroundColor: '#dc2626',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          {getTranslation('exportReport')}
        </button>
      </div>

      {/* Statistics Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '15px',
        marginBottom: '25px'
      }}>
        <div style={{
          padding: '15px',
          backgroundColor: '#f8fafc',
          borderRadius: '12px',
          textAlign: 'center',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ fontSize: '12px', color: '#5a6a7a' }}>{getTranslation('total')}</div>
          <div style={{ fontSize: '28px', fontWeight: '700', color: '#667eea' }}>{stats.total}</div>
        </div>
        <div style={{
          padding: '15px',
          backgroundColor: '#d1fae5',
          borderRadius: '12px',
          textAlign: 'center',
          border: '1px solid #86efac'
        }}>
          <div style={{ fontSize: '12px', color: '#065f46' }}>{getTranslation('presentCount')}</div>
          <div style={{ fontSize: '28px', fontWeight: '700', color: '#22c55e' }}>{stats.present}</div>
        </div>
        <div style={{
          padding: '15px',
          backgroundColor: '#fee2e2',
          borderRadius: '12px',
          textAlign: 'center',
          border: '1px solid #fca5a5'
        }}>
          <div style={{ fontSize: '12px', color: '#991b1b' }}>{getTranslation('absentCount')}</div>
          <div style={{ fontSize: '28px', fontWeight: '700', color: '#dc2626' }}>{stats.absent}</div>
        </div>
        <div style={{
          padding: '15px',
          backgroundColor: '#fef3c7',
          borderRadius: '12px',
          textAlign: 'center',
          border: '1px solid #fcd34d'
        }}>
          <div style={{ fontSize: '12px', color: '#92400e' }}>{getTranslation('lateCount')}</div>
          <div style={{ fontSize: '28px', fontWeight: '700', color: '#f59e0b' }}>{stats.late}</div>
        </div>
      </div>

      {/* Filters */}
      <div style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '20px',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => setFilter('all')}
          style={{
            padding: '8px 16px',
            backgroundColor: filter === 'all' ? '#667eea' : '#f8fafc',
            color: filter === 'all' ? 'white' : '#475569',
            border: '2px solid #667eea',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          {getTranslation('all')}
        </button>
        <button
          onClick={() => setFilter('present')}
          style={{
            padding: '8px 16px',
            backgroundColor: filter === 'present' ? '#22c55e' : '#f8fafc',
            color: filter === 'present' ? 'white' : '#475569',
            border: '2px solid #22c55e',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          {getTranslation('presentOnly')}
        </button>
        <button
          onClick={() => setFilter('absent')}
          style={{
            padding: '8px 16px',
            backgroundColor: filter === 'absent' ? '#dc2626' : '#f8fafc',
            color: filter === 'absent' ? 'white' : '#475569',
            border: '2px solid #dc2626',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          {getTranslation('absentOnly')}
        </button>
        <button
          onClick={() => setFilter('late')}
          style={{
            padding: '8px 16px',
            backgroundColor: filter === 'late' ? '#f59e0b' : '#f8fafc',
            color: filter === 'late' ? 'white' : '#475569',
            border: '2px solid #f59e0b',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          {getTranslation('lateOnly')}
        </button>
      </div>

      {/* Attendance Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>{getTranslation('name')}</th>
              <th style={{ padding: '12px', textAlign: 'center' }}>{getTranslation('department')}</th>
              <th style={{ padding: '12px', textAlign: 'center' }}>{getTranslation('date')}</th>
              <th style={{ padding: '12px', textAlign: 'center' }}>{getTranslation('status')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredAttendance.map((a, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '12px', fontWeight: '500' }}>{a.name}</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>{a.department}</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>
                  {new Date(a.date).toLocaleDateString()}
                </td>
                <td style={{ padding: '12px', textAlign: 'center' }}>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '12px',
                    backgroundColor: a.status === 'present' ? '#d1fae5' :
                                  a.status === 'absent' ? '#fee2e2' : '#fef3c7',
                    color: a.status === 'present' ? '#065f46' :
                           a.status === 'absent' ? '#991b1b' : '#92400e',
                    fontWeight: '600',
                    fontSize: '12px'
                  }}>
                    {getTranslation(a.status)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredAttendance.length === 0 && (
          <p style={{ textAlign: 'center', color: '#94a3b8', padding: '40px' }}>
            {getTranslation('noData')}
          </p>
        )}
      </div>
    </div>
  );
};

export default AttendanceModule;
