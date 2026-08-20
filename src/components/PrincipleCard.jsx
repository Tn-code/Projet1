import React from 'react';

const PrincipleCard = ({ principle, language, isSelected, isCompleted, onSelect }) => {
  const getColor = () => {
    if (isCompleted) return '#22c55e';
    if (isSelected) return '#667eea';
    return principle.color || '#667eea';
  };

  const getImageUrl = (id) => {
    const images = {
      seiri: 'https://www.learnleansigma.com/wp-content/uploads/2023/05/Visual-3-%E2%80%94-Sort-and-red-tag-decisions.png',
      seiton: 'https://www.learnleansigma.com/wp-content/uploads/2023/05/Visual-4-%E2%80%94-Set-in-Order-around-the-work.png',
      seiso: 'https://www.learnleansigma.com/wp-content/uploads/2023/05/Visual-5-%E2%80%94-Shine-as-cleaning-and-inspection.png',
      seiketsu: 'https://www.learnleansigma.com/wp-content/uploads/2023/05/Visual-6-%E2%80%94-Building-the-visible-normal-condition.png',
      shitsuke: 'https://www.learnleansigma.com/wp-content/uploads/2023/05/Visual-7-%E2%80%94-Sustain-through-daily-management.png'
    };
    return images[id] || null;
  };

  const imageUrl = getImageUrl(principle.id);

  return (
    <button
      onClick={() => onSelect(principle)}
      style={{
        padding: '0',
        backgroundColor: isCompleted ? '#f0fdf4' : (isSelected ? '#f0f4ff' : 'white'),
        border: `2px solid ${getColor()}`,
        borderRadius: '16px',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        textAlign: 'center',
        minHeight: '250px',
        display: 'flex',
        flexDirection: 'column',
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
        fontSize: '20px',
        zIndex: 5,
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: '50%',
        padding: '4px',
        width: '32px',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {isCompleted ? '✅' : (isSelected ? '🔄' : '')}
      </div>

      {/* Image */}
      <div style={{
        width: '100%',
        height: '140px',
        overflow: 'hidden',
        backgroundColor: '#f8fafc',
        position: 'relative'
      }}>
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={principle.name[language]}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.3s ease'
            }}
            onError={(e) => {
              // Fallback if image fails to load
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = `
                <div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:48px;background:linear-gradient(135deg, #f0f4ff, #e8eeff)">
                  ${principle.emoji}
                </div>
              `;
            }}
          />
        ) : (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            fontSize: '48px',
            background: 'linear-gradient(135deg, #f0f4ff, #e8eeff)'
          }}>
            {principle.emoji}
          </div>
        )}
        {/* Gradient overlay for better text readability */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '40%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)'
        }} />
      </div>

      {/* Content */}
      <div style={{
        padding: '12px 15px 15px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px'
      }}>
        <div style={{
          fontWeight: '700',
          fontSize: '15px',
          color: 'var(--gray-800)',
          lineHeight: '1.2'
        }}>
          {principle.name[language]}
        </div>

        <div style={{
          fontSize: '12px',
          color: 'var(--gray-500)',
          lineHeight: '1.3',
          padding: '0 4px'
        }}>
          {principle.description[language]}
        </div>

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
      </div>

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
