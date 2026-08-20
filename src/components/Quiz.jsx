import React, { useState, useEffect } from 'react';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';

const Quiz = ({ language, onClose }) => {
  const [currentPrinciple, setCurrentPrinciple] = useState('seiri');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [principleScores, setPrincipleScores] = useState({});

  const principles = Object.keys(QUIZ_QUESTIONS);
  const currentQuestions = QUIZ_QUESTIONS[currentPrinciple]?.questions || [];
  const totalQuestions = principles.reduce((acc, p) => acc + QUIZ_QUESTIONS[p].questions.length, 0);

  const getTranslation = (key, data) => {
    if (typeof data === 'object' && data[language]) {
      return data[language];
    }
    return data?.[language] || data?.en || key;
  };

  const handleOptionSelect = (index) => {
    if (selectedOption !== null || showFeedback) return;
    
    setSelectedOption(index);
    const correct = index === currentQuestions[currentQuestionIndex].correct;
    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) {
      setScore(score + 10);
      setTotalCorrect(totalCorrect + 1);
    }
    setTotalAnswered(totalAnswered + 1);

    // Update principle score
    const currentPrincipleId = currentPrinciple;
    setPrincipleScores(prev => ({
      ...prev,
      [currentPrincipleId]: {
        correct: (prev[currentPrincipleId]?.correct || 0) + (correct ? 1 : 0),
        total: (prev[currentPrincipleId]?.total || 0) + 1
      }
    }));

    setTimeout(() => {
      setShowFeedback(false);
      setSelectedOption(null);
      
      if (currentQuestionIndex < currentQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Move to next principle or complete quiz
        const currentIndex = principles.indexOf(currentPrinciple);
        if (currentIndex < principles.length - 1) {
          setCurrentPrinciple(principles[currentIndex + 1]);
          setCurrentQuestionIndex(0);
        } else {
          setQuizCompleted(true);
          setShowResult(true);
        }
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentPrinciple('seiri');
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setTotalCorrect(0);
    setTotalAnswered(0);
    setShowResult(false);
    setShowFeedback(false);
    setQuizCompleted(false);
    setPrincipleScores({});
  };

  const getProgress = () => {
    let answered = 0;
    let total = 0;
    principles.forEach(p => {
      const qs = QUIZ_QUESTIONS[p].questions;
      total += qs.length;
      const progress = principleScores[p];
      if (progress) {
        answered += progress.total;
      }
    });
    return { answered, total };
  };

  const progress = getProgress();

  if (quizCompleted) {
    const totalPossible = totalQuestions * 10;
    const percentage = Math.round((score / totalPossible) * 100);
    
    return (
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
        zIndex: 2000,
        padding: '20px',
        backdropFilter: 'blur(4px)'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '24px',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          boxShadow: '0 25px 80px rgba(0,0,0,0.3)',
          animation: 'slideUp 0.5s ease'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{ fontSize: '64px' }}>🏆</div>
            <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1a2a3a', marginTop: '10px' }}>
              Quiz Complete!
            </h2>
            <p style={{ color: '#5a6a7a', fontSize: '16px' }}>
              You've answered all 50 questions!
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '15px',
            marginBottom: '25px'
          }}>
            <div style={{ padding: '15px', backgroundColor: '#f8fafc', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '12px', color: '#5a6a7a' }}>Total Score</div>
              <div style={{ fontSize: '28px', fontWeight: '700', color: '#2193b0' }}>{score}</div>
            </div>
            <div style={{ padding: '15px', backgroundColor: '#f8fafc', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '12px', color: '#5a6a7a' }}>Correct Answers</div>
              <div style={{ fontSize: '28px', fontWeight: '700', color: '#22c55e' }}>{totalCorrect}/{totalQuestions}</div>
            </div>
          </div>

          <div style={{ marginBottom: '25px' }}>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#1a2a3a', marginBottom: '10px' }}>
              Performance by Principle:
            </div>
            {principles.map(p => {
              const data = principleScores[p] || { correct: 0, total: 0 };
              const pct = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
              return (
                <div key={p} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px 0',
                  borderBottom: '1px solid #f1f5f9'
                }}>
                  <span style={{ fontSize: '20px' }}>{QUIZ_QUESTIONS[p].emoji}</span>
                  <span style={{ flex: 1, fontSize: '14px', color: '#1a2a3a' }}>
                    {QUIZ_QUESTIONS[p].name[language]}
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: pct >= 80 ? '#22c55e' : (pct >= 60 ? '#f59e0b' : '#dc2626') }}>
                    {pct}% ({data.correct}/{data.total})
                  </span>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={resetQuiz}
              style={{
                flex: 1,
                padding: '12px',
                backgroundColor: '#2193b0',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#1a7a94'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#2193b0'}
            >
              🔄 Retake Quiz
            </button>
            <button
              onClick={onClose}
              style={{
                flex: 1,
                padding: '12px',
                backgroundColor: '#e2e8f0',
                color: '#475569',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
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
      zIndex: 2000,
      padding: '20px',
      backdropFilter: 'blur(4px)'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '35px',
        borderRadius: '24px',
        maxWidth: '700px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        boxShadow: '0 25px 80px rgba(0,0,0,0.3)',
        animation: 'slideUp 0.5s ease'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '28px' }}>{QUIZ_QUESTIONS[currentPrinciple]?.emoji}</span>
            <h3 style={{ fontSize: '20px', color: '#1a2a3a' }}>
              {QUIZ_QUESTIONS[currentPrinciple]?.name[language]}
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              padding: '6px 16px',
              backgroundColor: '#e2e8f0',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              color: '#475569'
            }}
          >
            ✕ Close
          </button>
        </div>

        {/* Progress Bar */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#5a6a7a', marginBottom: '5px' }}>
            <span>Progress</span>
            <span>{progress.answered}/{totalQuestions} questions</span>
          </div>
          <div style={{
            width: '100%',
            height: '6px',
            backgroundColor: '#e2e8f0',
            borderRadius: '3px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${(progress.answered / totalQuestions) * 100}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #2193b0, #6dd5ed)',
              transition: 'width 0.5s ease'
            }} />
          </div>
        </div>

        {/* Question */}
        <div style={{ marginBottom: '25px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#5a6a7a', marginBottom: '10px' }}>
            <span>Question {currentQuestionIndex + 1}/{currentQuestions.length}</span>
            <span>Score: {score} pts</span>
          </div>
          <p style={{
            fontSize: '18px',
            fontWeight: '500',
            color: '#1a2a3a',
            lineHeight: '1.6',
            padding: '15px',
            backgroundColor: '#f8fafc',
            borderRadius: '12px'
          }}>
            {getTranslation('question', currentQuestions[currentQuestionIndex]?.question)}
          </p>
        </div>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
          {currentQuestions[currentQuestionIndex]?.options[language].map((option, index) => {
            const isSelected = selectedOption === index;
            const isCorrectAnswer = index === currentQuestions[currentQuestionIndex].correct;
            let backgroundColor = '#f8fafc';
            let borderColor = '#e2e8f0';
            
            if (showFeedback) {
              if (isCorrectAnswer) {
                backgroundColor = '#d1fae5';
                borderColor = '#22c55e';
              } else if (isSelected && !isCorrectAnswer) {
                backgroundColor = '#fee2e2';
                borderColor = '#dc2626';
              }
            } else if (isSelected) {
              backgroundColor = '#e0f2fe';
              borderColor = '#2193b0';
            }

            return (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                disabled={showFeedback}
                style={{
                  padding: '14px 18px',
                  backgroundColor,
                  border: `2px solid ${borderColor}`,
                  borderRadius: '12px',
                  cursor: showFeedback ? 'default' : 'pointer',
                  fontSize: '15px',
                  color: '#1a2a3a',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                  opacity: showFeedback && !isSelected && !isCorrectAnswer ? 0.6 : 1
                }}
                onMouseEnter={(e) => {
                  if (!showFeedback && !isSelected) {
                    e.target.style.borderColor = '#94a3b8';
                    e.target.style.backgroundColor = '#f1f5f9';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!showFeedback && !isSelected) {
                    e.target.style.borderColor = '#e2e8f0';
                    e.target.style.backgroundColor = '#f8fafc';
                  }
                }}
              >
                <span style={{ fontWeight: '600', marginRight: '10px' }}>
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
                {showFeedback && isCorrectAnswer && <span style={{ marginLeft: '10px' }}>✅</span>}
                {showFeedback && isSelected && !isCorrectAnswer && <span style={{ marginLeft: '10px' }}>❌</span>}
              </button>
            );
          })}
        </div>

        {/* Progress indicator */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '15px',
          borderTop: '1px solid #e2e8f0'
        }}>
          <div style={{ fontSize: '13px', color: '#5a6a7a' }}>
            {principleScores[currentPrinciple] ? 
              `✅ ${principleScores[currentPrinciple].correct}/${principleScores[currentPrinciple].total} correct` :
              '📝 Not started yet'
            }
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {principles.map(p => (
              <div
                key={p}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: principleScores[p]?.total > 0 
                    ? (principleScores[p].correct === principleScores[p].total ? '#22c55e' : '#f59e0b')
                    : '#e2e8f0',
                  border: currentPrinciple === p ? '2px solid #2193b0' : 'none'
                }}
                title={QUIZ_QUESTIONS[p].name[language]}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
