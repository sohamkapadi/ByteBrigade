import React, { useState, useEffect } from 'react';
import './Quiz.css'; // Import the CSS file for styling

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch quiz questions when the component mounts
    const fetchQuestions = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/quiz/');
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching quiz questions:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswerChange = (questionIndex, answer) => {
    const newAnswers = [...userAnswers];
    newAnswers[questionIndex] = answer;
    setUserAnswers(newAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/v1/quiz/evaluate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userAnswers,
          correctAnswers: questions.map(q => ({ correctAnswer: q.correctAnswer, topic: q.topic })),
        }),
      });
      const data = await response.json();
      setScore(data.score);
      setFeedback(data.feedback);
      setQuizCompleted(true);
    } catch (error) {
      console.error('Error submitting quiz answers:', error);
    }
  };

  return (
    <div className="quiz-container">
      <h2>Finance Quiz</h2>
      {loading ? (
        <div className="loading">Loading questions...</div> // Loading message
      ) : quizCompleted ? (
        <div>
          <h3>Your Score: {score}</h3>
          <p>{feedback}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {questions.map((question, index) => (
            <div key={index} className="question-block">
              <h4>{question.question}</h4>
              {question.options.map((option, i) => (
                <label key={i} className="option-label">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    onChange={() => handleAnswerChange(index, option)}
                    required
                  />
                  {option}
                </label>
              ))}
            </div>
          ))}
          <button type="submit" className="submit-button">Submit Quiz</button>
        </form>
      )}
    </div>
  );
};

export default Quiz;
