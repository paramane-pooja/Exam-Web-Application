import React, { useState, useEffect } from 'react';
import './Exam.css';
import SuperSidebar from './SuperSidebar';

function Exam() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(3000);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const savedAnswers = JSON.parse(localStorage.getItem('quizAnswers')) || [];
    setAnswers(savedAnswers);
  }, []);

  useEffect(() => {
    localStorage.setItem('quizAnswers', JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeRemaining > 0) {
        setTimeRemaining(time => time - 1);
      } else {
        submitExam();
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=50&category=18&difficulty=medium')
      .then((response) => response.json())
      .then((data) => {
        console.log("Data: " , data)
        if (data.response_code === 0) {
          const formattedQuestions = data.results.map((questionItem) => {
            return {
              question: questionItem.question,
              options: [...questionItem.incorrect_answers, questionItem.correct_answer], 
              correct_answer: questionItem.correct_answer, 
            };
          });
          setQuestions(formattedQuestions);
          setAnswers(Array(formattedQuestions.length).fill(''));
          setLoading(false);
        } else {
          console.error('Error fetching questions:', data);
        }
      })
      .catch((error) => console.error('Error fetching questions:', error));
  }, []);
  
  const handleQuestionChange = (index) => {
    setCurrentQuestion(index);
    setSelectedOption(answers[index]);
  };

  const handleOptionChange = (options) => {
    setSelectedOption(options);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = options;
    setAnswers(newAnswers);
  };

  const saveAndNext = () => {
    if (currentQuestion < questions.length - 1) {
      const newCount = count + (selectedOption === questions[currentQuestion].correct_answer ? 1 : 0);
      setCount(newCount);
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(answers[currentQuestion + 1]);
    }
  };
  
  const previous = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(answers[currentQuestion - 1]);
    }
  };

  const submitExam = () => {
    setTimeRemaining(0);
    let totalCorrect = 0;
    answers.forEach((selectedOption, index) => {
      if (selectedOption === questions[index].correct_answer) {
        totalCorrect++;
      }
    });
    console.log("Total correct answers:", totalCorrect);
  };
  
  const isQuestionAttempted = (index) => {
    return answers[index] !== '';
  };

  const isQuestionVisited = (index) => {
    return index <= currentQuestion;
  };

  const renderQuestionButtons = () => {
    return (
      <div className='button-container'>
        <div className='button-grid'>
          {questions.map((_, index) => (
            <button
              key={index}
                onClick={() => handleQuestionChange(index)}
                  className={`question-button ${
                  isQuestionAttempted(index)
                  ? 'attempted-button'
                  : index === currentQuestion
                  ? 'current-question-button'
                  : isQuestionVisited(index)
                  ? 'visited-but-unattempted-button'
                  : 'not-attempted-button'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderQuestion = () => {
    if (loading) {
      return <p>Loading questions...</p>;
    }

    const question = questions[currentQuestion];
    return (
      <div>
        <h3 style={{ fontSize: '22px', color: 'black' }}>
          Q.{currentQuestion + 1}] {question.question}
        </h3>
        <ul className='ul'>
          {question.options.map((option, index) => (
            <li key={index}>
              <label
                style={{
                  paddingTop: '15px',
                  fontSize: '18px',
                  color: '#676767',
                }}
              >
                <input
                  type='radio'
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => handleOptionChange(option)}
                />
                {option}
              </label>
            </li>
          ))}
        </ul>
        <div className='button-container' style={{ paddingTop: '50px' }}>
          <button
            onClick={previous}
            className='small-button'
            disabled={currentQuestion === 0}
            style={{
              height: '40px',
              width: '30%',
            }}
          >
            Previous
          </button>

          {currentQuestion < questions.length - 1 && (
            <button
              onClick={saveAndNext}
              className='small-button'
              style={{
                height: '40px',
                width: '30%',
                backgroundColor: isQuestionAttempted(currentQuestion) ? 'green' : '',
              }}
            >
              Save and Next
            </button>
          )}

          {currentQuestion === questions.length - 1 && (
            <button
              onClick={submitExam}
              className='small-button'
              style={{
                height: '40px',
                width: '30%',
              }}
            >
              Submit Exam
            </button>
          )}

        </div>
      </div>
    );
  };

  
  return (
    <>
      <div>
        <SuperSidebar />
        <div className='App'>
          <div className='sidebar'>
          
            <h3 style={{ textAlign: 'center' }}>MCQ Quiz</h3>
            {renderQuestionButtons()}
          </div>
          <div className='content' style={{ marginTop: '100px' }}>
            {renderQuestion()}
          </div>
        </div>
      </div>
    </>
  );
}

export default Exam; 


