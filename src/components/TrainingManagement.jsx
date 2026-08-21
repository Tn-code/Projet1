import React, { useState, useEffect } from 'react';
import { 
  getAllTrainings, 
  addTraining, 
  updateTraining, 
  deleteTraining 
} from '../services/trainingService';

const TrainingManagement = ({ language }) => {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newTraining, setNewTraining] = useState({
    title: '',
    type: 'online',
    duration: '',
    date: '',
    participants: 0,
    status: 'upcoming'
  });

  useEffect(() => {
    loadTrainings();
  }, []);

  const loadTrainings = async () => {
    setLoading(true);
    const result = await getAllTrainings();
    if (result.data) {
      setTrainings(result.data);
    }
    setLoading(false);
  };

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
      addNew: { en: 'Add New Training', fr: 'Ajouter une Nouvelle Formation', ar: 'إضافة تدريب جديد' },
      loading: { en: 'Loading...', fr: 'Chargement...', ar: 'جاري التحميل...' }
    };
    return translations[key]?.[language] || translations[key]?.en || key;
  };

  const handleAddTraining = () => {
    setEditingId(null);
    setNewTraining({
      title: '',
      type: 'online',
      duration: '',
      date: '',
      participants: 0,
      status: 'upcoming'
    });
    setShowAddForm(true);
  };

  const handleEditTraining = (training) => {
    setEditingId(training.id);
    setNewTraining({
      title: training.title.en || training.title,
      type: training.type,
      duration: training.duration,
      date: training.date,
      participants: training.participants || 0,
      status: training.status
    });
    setShowAddForm(true);
  };

  const handleSaveTraining = async () => {
    const trainingData = {
      title: { en: newTraining.title, fr: newTraining.title, ar: newTraining.title },
      type: newTraining.type,
      duration: newTraining.duration,
      date: newTraining.date,
      participants: parseInt(newTraining.participants) || 0,
      status: newTraining.status
    };

    let result;
    if (editingId) {
      result = await updateTraining(editingId, trainingData);
    } else {
      result = await addTraining(trainingData);
    }

    if (!result.error) {
      await loadTrainings();
      setShowAddForm(false);
      setEditingId(null);
      setNewTraining({
        title: '',
        type: 'online',
        duration: '',
        date: '',
        participants: 0,
        status: 'upcoming'
      });
    } else {
      alert('Error saving training: ' + result.error);
    }
  };

  const handleDeleteTraining = async (id) => {
    if (window.confirm('Are you sure you want to delete this training?')) {
      const result = await deleteTraining(id);
      if (!result.error) {
        await loadTrainings();
      } else {
        alert('Error deleting training: ' + result.error);
      }
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingId(null);
    setNewTraining({
      title: '',
      type: 'online',
      duration: '',
      date: '',
      participants: 0,
      status: 'upcoming'
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

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#5a6a7a' }}>
        {getTranslation('loading')}
      </div>
    );
  }

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
            <input
              type="number"
              placeholder={getTranslation('participants')}
              value={newTraining.participants}
              onChange={(e) => setNewTraining({...newTraining, participants: e.target.value})}
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
              min="0"
            />
            <select
              value={newTraining.status}
              onChange={(e) => setNewTraining({...newTraining, status: e.target.value})}
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
              <option value="upcoming">{getTranslation('upcoming')}</option>
              <option value="active">{getTranslation('active')}</option>
              <option value="completed">{getTranslation('completed')}</option>
            </select>
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
            {trainings.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
                  {getTranslation('noData')}
                </td>
              </tr>
            ) : (
              trainings.map((t) => (
                <tr key={t.id} style={{
                  borderBottom: '1px solid #e2e8f0',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <td style={{ padding: '12px', fontWeight: '500' }}>
                    {t.title?.[language] || t.title?.en || t.title}
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
                      {t.participants || 0}
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
              ))
            )}
          </tbody>
        </table>
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
