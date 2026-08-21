import React, { useState } from 'react';

const TrainingManagement = ({ language }) => {
  const [trainings, setTrainings] = useState([
    {
      id: 1,
      title: { en: '5S Introduction', fr: 'Introduction 5S', ar: 'مقدمة 5S' },
      type: 'online',
      duration: '2h',
      participants: 15,
      status: 'active',
      date: '2024-01-15'
    },
    {
      id: 2,
      title: { en: 'Advanced 5S Techniques', fr: 'Techniques 5S Avancées', ar: 'تقنيات 5S المتقدمة' },
      type: 'in-person',
      duration: '4h',
      participants: 8,
      status: 'upcoming',
      date: '2024-02-01'
    },
    {
      id: 3,
      title: { en: '5S Workplace Organization', fr: 'Organisation 5S du Lieu de Travail', ar: 'تنظيم مكان العمل 5S' },
      type: 'online',
      duration: '3h',
      participants: 22,
      status: 'completed',
      date: '2023-12-10'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newTraining, setNewTraining] = useState({
    title: '',
    type: 'online',
    duration: '',
    date: ''
  });

  const getTranslation = (key) => {
    const translations = {
      title: { en: '📚 Training Management', fr: '📚 Gestion des Formations', ar: '📚 إدارة التدريبات' },
      addTraining: { en: '➕ Add Training', fr: '➕ Ajouter une Formation', ar: '➕ إضافة تدريب' },
      titleLabel: { en: 'Training Title', fr: 'Titre de la Formation', ar: 'عنوان التدريب' },
      type: { en: 'Type', fr: 'Type', ar: 'النوع' },
      online: { en: 'Online', fr: 'En Ligne', ar: 'عن بعد' },
      inPerson: { en: 'In-Person', fr: 'Présentiel', ar: 'حضوري' },
      duration: { en: 'Duration', fr: 'Durée', ar: 'المدة' },
      participants: { en: 'Participants', fr: 'Participants', ar: 'المشاركون' },
      status: { en: 'Status', fr: 'Statut', ar: 'الحالة' },
      active: { en: 'Active', fr: 'Actif', ar: 'نشط' },
      upcoming: { en: 'Upcoming', fr: 'À Venir', ar: 'قادم' },
      completed: { en: 'Completed', fr: 'Terminé', ar: 'مكتمل' },
      date: { en: 'Date', fr: 'Date', ar: 'التاريخ' },
      actions: { en: 'Actions', fr: 'Actions', ar: 'الإجراءات' },
      edit: { en: '✏️ Edit', fr: '✏️ Modifier', ar: '✏️ تعديل' },
      delete: { en: '🗑️ Delete', fr: '🗑️ Supprimer', ar: '🗑️ حذف' },
      noData: { en: 'No training sessions available', fr: 'Aucune formation disponible', ar: 'لا توجد دورات تدريبية' },
      cancel: { en: 'Cancel', fr: 'Annuler', ar: 'إلغاء' },
      save: { en: 'Save', fr: 'Enregistrer', ar: 'حفظ' },
      update: { en: 'Update', fr: 'Mettre à Jour', ar: 'تحديث' },
      editTraining: { en: 'Edit Training', fr: 'Modifier la Formation', ar: 'تعديل التدريب' },
      addNew: { en: 'Add New Training', fr: 'Ajouter une Nouvelle Formation', ar: 'إضافة تدريب جديد' }
    };
    return translations[key]?.[language] || translations[key]?.en || key;
  };

  const handleAddTraining = () => {
    setEditingId(null);
    setNewTraining({
      title: '',
      type: 'online',
      duration: '',
      date: ''
    });
    setShowAddForm(true);
  };

  const handleEditTraining = (training) => {
    setEditingId(training.id);
    setNewTraining({
      title: training.title.en || training.title,
      type: training.type,
      duration: training.duration,
      date: training.date
    });
    setShowAddForm(true);
  };

  const handleSaveTraining = () => {
    if (editingId) {
      // Update existing training
      setTrainings(trainings.map(t => 
        t.id === editingId 
          ? { 
              ...t, 
              title: { en: newTraining.title, fr: newTraining.title, ar: newTraining.title },
              type: newTraining.type,
              duration: newTraining.duration,
              date: newTraining.date
            }
          : t
      ));
    } else {
      // Add new training
      const newTrainingObj = {
        id: Date.now(),
        title: { en: newTraining.title, fr: newTraining.title, ar: newTraining.title },
        type: newTraining.type,
        duration: newTraining.duration,
        participants: 0,
        status: 'upcoming',
        date: newTraining.date
      };
      setTrainings([...trainings, newTrainingObj]);
    }
    setShowAddForm(false);
    setEditingId(null);
    setNewTraining({
      title: '',
      type: 'online',
      duration: '',
      date: ''
    });
  };

  const handleDeleteTraining = (id) => {
    if (window.confirm('Are you sure you want to delete this training?')) {
      setTrainings(trainings.filter(t => t.id !== id));
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingId(null);
    setNewTraining({
      title: '',
      type: 'online',
      duration: '',
      date: ''
    });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return '#22c55e';
      case 'upcoming': return '#f59e0b';
      case 'completed': return '#94a3b8';
      default: return '#94a3b8';
    }
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
          onClick={handleAddTraining}
          style={{
            padding: '10px 20px',
            backgroundColor: '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#5b21b6';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#667eea';
            e.target.style.transform = 'scale(1)';
          }}
        >
          {getTranslation('addTraining')}
        </button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div style={{
          backgroundColor: '#f8fafc',
          padding: '25px',
          borderRadius: '12px',
          marginBottom: '20px',
          border: '2px solid #667eea',
          animation: 'fadeInUp 0.3s ease'
        }}>
          <h3 style={{ marginBottom: '15px', color: '#1a2a3a' }}>
            {editingId ? getTranslation('editTraining') : getTranslation('addNew')}
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px'
          }}>
            <input
              type="text"
              placeholder={getTranslation('titleLabel')}
              value={newTraining.title}
              onChange={(e) => setNewTraining({...newTraining, title: e.target.value})}
              style={{
                padding: '10px 14px',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
            <select
              value={newTraining.type}
              onChange={(e) => setNewTraining({...newTraining, type: e.target.value})}
              style={{
                padding: '10px 14px',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            >
              <option value="online">{getTranslation('online')}</option>
              <option value="in-person">{getTranslation('inPerson')}</option>
            </select>
            <input
              type="text"
              placeholder={getTranslation('duration')}
              value={newTraining.duration}
              onChange={(e) => setNewTraining({...newTraining, duration: e.target.value})}
              style={{
                padding: '10px 14px',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
            <input
              type="date"
              value={newTraining.date}
              onChange={(e) => setNewTraining({...newTraining, date: e.target.value})}
              style={{
                padding: '10px 14px',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button
              onClick={handleSaveTraining}
              disabled={!newTraining.title || !newTraining.date}
              style={{
                padding: '10px 30px',
                backgroundColor: !newTraining.title || !newTraining.date ? '#94a3b8' : '#22c55e',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: !newTraining.title || !newTraining.date ? 'not-allowed' : 'pointer',
                fontWeight: '600',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                if (newTraining.title && newTraining.date) {
                  e.target.style.backgroundColor = '#16a34a';
                  e.target.style.transform = 'scale(1.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (newTraining.title && newTraining.date) {
                  e.target.style.backgroundColor = '#22c55e';
                  e.target.style.transform = 'scale(1)';
                }
              }}
            >
              {editingId ? getTranslation('update') : getTranslation('save')}
            </button>
            <button
              onClick={handleCancel}
              style={{
                padding: '10px 30px',
                backgroundColor: '#e2e8f0',
                color: '#475569',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#cbd5e1';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#e2e8f0';
              }}
            >
              {getTranslation('cancel')}
            </button>
          </div>
        </div>
      )}

      {/* Training List */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>{getTranslation('titleLabel')}</th>
              <th style={{ padding: '12px', textAlign: 'center' }}>{getTranslation('type')}</th>
              <th style={{ padding: '12px', textAlign: 'center' }}>{getTranslation('duration')}</th>
              <th style={{ padding: '12px', textAlign: 'center' }}>{getTranslation('participants')}</th>
              <th style={{ padding: '12px', textAlign: 'center' }}>{getTranslation('status')}</th>
              <th style={{ padding: '12px', textAlign: 'center' }}>{getTranslation('date')}</th>
              <th style={{ padding: '12px', textAlign: 'center' }}>{getTranslation('actions')}</th>
            </tr>
          </thead>
          <tbody>
            {trainings.map((t, i) => (
              <tr key={t.id} style={{
                borderBottom: '1px solid #e2e8f0',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                <td style={{ padding: '12px', fontWeight: '500' }}>
                  {t.title[language] || t.title.en}
                </td>
                <td style={{ padding: '12px', textAlign: 'center' }}>
                  {t.type === 'online' ? '🌐' : '🏢'} {getTranslation(t.type)}
                </td>
                <td style={{ padding: '12px', textAlign: 'center' }}>{t.duration}</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>
                  <span style={{
                    padding: '2px 10px',
                    borderRadius: '12px',
                    backgroundColor: '#dbeafe',
                    color: '#1e40af',
                    fontWeight: '600',
                    fontSize: '12px'
                  }}>
                    {t.participants}
                  </span>
                </td>
                <td style={{ padding: '12px', textAlign: 'center' }}>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '12px',
                    backgroundColor: getStatusColor(t.status) + '20',
                    color: getStatusColor(t.status),
                    fontWeight: '600',
                    fontSize: '12px'
                  }}>
                    {getTranslation(t.status)}
                  </span>
                </td>
                <td style={{ padding: '12px', textAlign: 'center' }}>
                  {new Date(t.date).toLocaleDateString()}
                </td>
                <td style={{ padding: '12px', textAlign: 'center' }}>
                  <button
                    onClick={() => handleEditTraining(t)}
                    style={{
                      padding: '6px 14px',
                      backgroundColor: '#667eea',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      marginRight: '5px',
                      transition: 'all 0.2s',
                      fontSize: '13px'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#5b21b6';
                      e.target.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#667eea';
                      e.target.style.transform = 'scale(1)';
                    }}
                  >
                    ✏️ {getTranslation('edit')}
                  </button>
                  <button
                    onClick={() => handleDeleteTraining(t.id)}
                    style={{
                      padding: '6px 14px',
                      backgroundColor: '#dc2626',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      fontSize: '13px'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#b91c1c';
                      e.target.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#dc2626';
                      e.target.style.transform = 'scale(1)';
                    }}
                  >
                    🗑️ {getTranslation('delete')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {trainings.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: '#94a3b8'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>📚</div>
            <p>{getTranslation('noData')}</p>
            <button
              onClick={handleAddTraining}
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
              {getTranslation('addTraining')}
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default TrainingManagement;
