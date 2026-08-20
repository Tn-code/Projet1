import React from 'react';

const PrincipleCard = ({ principle, language, isSelected, isCompleted, onSelect }) => {
  const getColor = () => {
    if (isCompleted) return '#22c55e';
    if (isSelected) return '#667eea';
    return principle.color || '#667eea';
  };

  return (
    <button
      onClick={() => onSelect(principle)}
      style={{
        padding: '20px 15px',
        backgroundColor: isCompleted ? '#f0fdf4' : (isSelected ? '#f0f4ff' : 'white'),
        border: `2px solid ${getColor()}`,
        borderRadius: '16px',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        textAlign: 'center',
        minHeight: '140px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        boxShadow: isSelected ? '0 4px 20px rgba(102, 126, 234, 0.2)' : 'var(--shadow-sm)'
      }}
      onMouseEnter={(e) => {
        if (!isSelected && !isCompleted) {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
          e.currentTarget.style.borderColor = '#667eea';
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected && !isCompleted) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
          e.currentTarget.style.borderColor = 'var(--gray-200)';
        }
      }}
    >
      {/* Status Badge */}
      <div style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        fontSize: '18px'
      }}>
        {isCompleted ? '✅' : (isSelected ? '🔄' : '')}
      </div>

      {/* Icon */}
      <div style={{
        fontSize: '42px',
        marginBottom: '4px',
        transition: 'transform 0.3s'
      }}>
        {principle.emoji}
      </div>

      {/* Title */}
      <div style={{
        fontWeight: '700',
        fontSize: '15px',
        color: 'var(--gray-800)',
        lineHeight: '1.2'
      }}>
        {principle.name[language]}
      </div>

      {/* Description */}
      <div style={{
        fontSize: '12px',
        color: 'var(--gray-500)',
        lineHeight: '1.3',
        padding: '0 4px'
      }}>
        {principle.description[language]}
      </div>

      {/* Status Label */}
      {isCompleted && (
        <div style={{
          fontSize: '11px',
          color: '#16a34a',
          fontWeight: '600',
          backgroundColor: '#dcfce7',
          padding: '2px 12px',
          borderRadius: '12px',
          marginTop: '4px'
        }}>
          ✅ Completed
        </div>
      )}

      {/* Progress Bar at Bottom */}
      <div style={{
        position: 'absolute',
        bottom: '0',
        left: '0',
        right: '0',
        height: '4px',
        backgroundColor: 'var(--gray-100)',
        borderRadius: '0 0 16px 16px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: isCompleted ? '100%' : (isSelected ? '50%' : '0%'),
          height: '100%',
          backgroundColor: getColor(),
          transition: 'width 0.6s ease'
        }} />
      </div>
    </button>
  );
};

export default PrincipleCard;
