import React, { useState, useEffect } from 'react';
import { 
  getAllEvents, 
  addEvent, 
  updateEvent, 
  deleteEvent 
} from '../services/trainingService';

const PlanningModule = ({ language }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    instructor: '',
    participants: 0
  });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    setLoading(true);
    const result = await getAllEvents();
    if (result.data) {
      setEvents(result.data);
    }
    setLoading(false);
  };

  const getTranslation = (key) => {
    const translations = {
      title: { en: '📅 Planning Module', fr: '📅 Module de Planification', ar: '📅 وحدة التخطيط' },
      addEvent: { en: '➕ Add Event', fr: '➕ Ajouter un Événement', ar: '➕ إضافة حدث' },
      eventTitle: { en: 'Event Title', fr: 'Titre de l\'Événement', ar: 'عنوان الحدث' },
      date: { en: 'Date', fr: 'Date', ar: 'التاريخ' },
      time: { en: 'Time', fr: 'Heure', ar: 'الوقت' },
      location: { en: 'Location', fr: 'Lieu', ar: 'الموقع' },
      instructor: { en: 'Instructor', fr: 'Formateur', ar: 'المدرب' },
      participants: { en: 'Participants', fr: 'Participants', ar: 'المشاركون' },
      actions: { en: 'Actions', fr: 'Actions', ar: 'الإجراءات' },
      edit: { en: '✏️ Edit', fr: '✏️ Modifier', ar: '✏️ تعديل' },
      delete: { en: '🗑️ Delete', fr: '🗑️ Supprimer', ar: '🗑️ حذف' },
      noData: { en: 'No events scheduled', fr: 'Aucun événement planifié', ar: 'لا توجد أحداث مجدولة' },
      cancel: { en: 'Cancel', fr: 'Annuler', ar: 'إلغاء' },
      save: { en: 'Save', fr: 'Enregistrer', ar: 'حفظ' },
      update: { en: 'Update', fr: 'Mettre à Jour', ar: 'تحديث' },
      addNew: { en: 'Add New Event', fr: 'Ajouter un Nouvel Événement', ar: 'إضافة حدث جديد' },
      editEvent: { en: 'Edit Event', fr: 'Modifier l\'Événement', ar: 'تعديل الحدث' },
      loading: { en: 'Loading...', fr: 'Chargement...', ar: 'جاري التحميل...' }
    };
    return translations[key]?.[language] || translations[key]?.en || key;
  };

  const handleAddEvent = () => {
    setEditingId(null);
    setNewEvent({
      title: '',
      date: '',
      time: '',
      location: '',
      instructor: '',
      participants: 0
    });
    setShowAddForm(true);
  };

  const handleEditEvent = (event) => {
    setEditingId(event.id);
    setNewEvent({
      title: event.title.en || event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      instructor: event.instructor,
      participants: event.participants || 0
    });
    setShowAddForm(true);
  };

  const handleSaveEvent = async () => {
    const eventData = {
      title: { en: newEvent.title, fr: newEvent.title, ar: newEvent.title },
      date: newEvent.date,
      time: newEvent.time,
      location: newEvent.location,
      instructor: newEvent.instructor,
      participants: parseInt(newEvent.participants) || 0
    };

    let result;
    if (editingId) {
      result = await updateEvent(editingId, eventData);
    } else {
      result = await addEvent(eventData);
    }

    if (!result.error) {
      await loadEvents();
      setShowAddForm(false);
      setEditingId(null);
      setNewEvent({
        title: '',
        date: '',
        time: '',
        location: '',
        instructor: '',
        participants: 0
      });
    } else {
      alert('Error saving event: ' + result.error);
    }
  };

  const handleDeleteEvent = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      const result = await deleteEvent(id);
      if (!result.error) {
        await loadEvents();
      } else {
        alert('Error deleting event: ' + result.error);
      }
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingId(null);
    setNewEvent({
      title: '',
      date: '',
      time: '',
      location: '',
      instructor: '',
      participants: 0
    });
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
          onClick={handleAddEvent}
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
          {getTranslation('addEvent')}
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
            {editingId ? getTranslation('editEvent') : getTranslation('addNew')}
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px'
          }}>
            <input
              type="text"
              placeholder={getTranslation('eventTitle')}
              value={newEvent.title}
              onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
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
              value={newEvent.date}
              onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
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
              type="time"
              value={newEvent.time}
              onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
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
              type="text"
              placeholder={getTranslation('location')}
              value={newEvent.location}
              onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
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
              type="text"
              placeholder={getTranslation('instructor')}
              value={newEvent.instructor}
              onChange={(e) => setNewEvent({...newEvent, instructor: e.target.value})}
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
              value={newEvent.participants}
              onChange={(e) => setNewEvent({...newEvent, participants: e.target.value})}
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
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button
              onClick={handleSaveEvent}
              disabled={!newEvent.title || !newEvent.date}
              style={{
                padding: '10px 30px',
                backgroundColor: !newEvent.title || !newEvent.date ? '#94a3b8' : '#22c55e',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: !newEvent.title || !newEvent.date ? 'not-allowed' : 'pointer',
                fontWeight: '600',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                if (newEvent.title && newEvent.date) {
                  e.target.style.backgroundColor = '#16a34a';
                  e.target.style.transform = 'scale(1.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (newEvent.title && newEvent.date) {
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

      {/* Events Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>{getTranslation('eventTitle')}</th>
              <th style={{ padding: '12px', textAlign: 'center' }}>{getTranslation('date')}</th>
              <th style={{ padding: '12px', textAlign: 'center' }}>{getTranslation('time')}</th>
              <th style={{ padding: '12px', textAlign: 'center' }}>{getTranslation('location')}</th>
              <th style={{ padding: '12px', textAlign: 'center' }}>{getTranslation('instructor')}</th>
              <th style={{ padding: '12px', textAlign: 'center' }}>{getTranslation('participants')}</th>
              <th style={{ padding: '12px', textAlign: 'center' }}>{getTranslation('actions')}</th>
            </tr>
          </thead>
          <tbody>
            {events.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
                  {getTranslation('noData')}
                </td>
              </tr>
            ) : (
              events.map((event) => (
                <tr key={event.id} style={{
                  borderBottom: '1px solid #e2e8f0',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <td style={{ padding: '12px', fontWeight: '500' }}>
                    {event.title?.[language] || event.title?.en || event.title}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    {new Date(event.date).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>{event.time}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>{event.location}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>{event.instructor}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <span style={{
                      padding: '2px 10px',
                      borderRadius: '12px',
                      backgroundColor: '#dbeafe',
                      color: '#1e40af',
                      fontWeight: '600',
                      fontSize: '12px'
                    }}>
                      {event.participants || 0}
                    </span>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <button
                      onClick={() => handleEditEvent(event)}
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
                      onClick={() => handleDeleteEvent(event.id)}
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

export default PlanningModule;
