// import React, { useState, useEffect } from 'react';
// import './StudentExam.css';
// import Navbar from './Navbar';
// import { v4 as uuidv4 } from 'uuid';
// import shuffledQuestions from '../SuperAdmin/questions';


// function StudentExam() {
//   const [questionSet, setQuestionSet] = useState([]);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [setID, setSetID] = useState(null);
//   const [question, setQuestion] = useState([]);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [answers, setAnswers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [timeRemaining, setTimeRemaining] = useState(60);
//   const [answerCount,setAnswerCount] = useState(0);

//   useEffect(() => {
//     const savedAnswers = JSON.parse(localStorage.getItem('quizAnswers')) || [];
//     setAnswers(savedAnswers);
//     const newSetID = uuidv4().split('-').pop().substring(0, 4);
//     setSetID(newSetID);
  
//     const initialQuestionSet = shuffledQuestions.slice(0, 10);
//     setQuestionSet(initialQuestionSet);
//     setQuestion(initialQuestionSet);
//     setLoading(false);
//   }, []);

//   useEffect(() => 
//   { 
//     localStorage.setItem('quizAnswers', JSON.stringify(answers));
//   }, [answers]);


//   useEffect(() => 
//   {
//     const timer = setInterval(() => {
//       if (timeRemaining > 0)
//       {
//         setTimeRemaining(time => time - 1);
//       } 
//       else 
//       {
//         submitExam();
//         clearInterval(timer);
//       }
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [timeRemaining]);

//   useEffect(() => 
//   {
//     if (currentQuestion % 10 === 0 && currentQuestion > 0) 
//     {
//       const startIndex = currentQuestion;
//       const endIndex = startIndex + 10;
//       const newQuestionSet = shuffledQuestions.slice(startIndex, endIndex);
//       setQuestionSet(newQuestionSet);
//       setQuestion(newQuestionSet);
//     }
//   }, [currentQuestion]);


//   useEffect(() => 
//   {
//     setQuestion(shuffledQuestions);
//     setAnswers(Array(shuffledQuestions.length).fill(''));
//     setLoading(false);
//   }, []);
  
//   const handleQuestionChange = (index) => 
//   {
//     setCurrentQuestion(index);
//     setSelectedOption(answers[index]);
//   };

//   const handleOptionChange = (option) =>
//    {
//     setSelectedOption(option);

//   };

//   const saveAndNext = () => 
//   {
//     if(currentQuestion < shuffledQuestions.length - 1) 
//     {
//       const isCorrect = selectedOption === shuffledQuestions[currentQuestion].answer;

//       if(isCorrect) {
//         setAnswerCount(count => count + 1)
//       }

//       const newAnswers = [...answers];
//       newAnswers[currentQuestion] = selectedOption;
//       setAnswers(newAnswers);
//       setCurrentQuestion(currentQuestion + 1);
//       setSelectedOption(newAnswers[currentQuestion + 1]);
//     }
    
//   };

//   const previous = () => 
//   {
//     if (currentQuestion > 0) {
//       setCurrentQuestion(currentQuestion - 1);
//       setSelectedOption(answers[currentQuestion - 1]);
//     }
//   };

//   const submitExam = () => 
//   {
//       setTimeRemaining(0);
//       console.log(`Exam submitted for Set ID ${setID}! Total:`, answerCount);
//       alert('Exam Submitted Successfully !');   
//   };


//   const isQuestionAttempted = (index) => 
//   {
//     return answers[index] !== '';
//   };

//   const isQuestionVisited = (index) => 
//   {
//     return index <= currentQuestion;
//   };
  

//   const renderQuestionButtons = () => {
//     return (
//       <div className='button-container'>
//         <div className='button-grid'>
//           {questionSet.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => handleQuestionChange(index)}
//               className={`question-button ${
//                 isQuestionAttempted(index)
//                   ? 'attempted-button'
//                   : index === currentQuestion
//                   ? 'current-question-button'
//                   : isQuestionVisited(index)
//                   ? 'visited-but-unattempted-button'
//                   : 'not-attempted-button'
//               }`}
//             >
//               {index + 1}
//             </button>
//           ))}
//         </div>
//       </div>
//     );
//   };
  
//   const renderQuestion = () => {
//     if (loading) {
//       return <p>Loading questions...</p>;
//     }

//     const question = shuffledQuestions[currentQuestion];
    
//     return (
//       <div>
//         <h3 style={{ fontSize: '22px', color: 'black' }}>
//           Q.{currentQuestion + 1}] {question.question}
//         </h3>
//         <ul className='ul'>
//           {question.options.map((option, index) => (
//             <li key={index}>
//               <label
//                 style={{
//                   paddingTop: '15px',
//                   fontSize: '18px',
//                   color: '#676767',
//                 }}
//               >
//                 <input
//                   type='radio'
                  
//                   value={option}
//                   checked={selectedOption === option}
//                   onChange={() => handleOptionChange(option)}
//                 />
//                 {option}
//               </label>
//             </li>
//           ))}
//         </ul>
//         <div className='button-container' style={{ paddingTop: '50px' }}>
//           <button
//             onClick={previous}
//             className='small-button'
//             disabled={currentQuestion === 0}
//             style={{
//               height: '40px',
//               width: '30%',
//             }}
//           >
//             Previous
//           </button>

//           {currentQuestion < 9 && (
//              <button
//             onClick={saveAndNext}
//             className='small-button'
//             style={{
//               height: '40px',
//               width: '30%',
//               backgroundColor: isQuestionAttempted(currentQuestion) ? 'green' : '',
//             }}
//           >Save and Next
//           </button>
//           )}
 
//         {currentQuestion === 9 && (
//           <button
//             onClick={submitExam}
//             className='small-button'
//             style={{
//               height: '40px',
//               width: '30%',
//             }}
//           >
//             Submit Exam
//           </button>
//         )}
//         </div>
//       </div>
//     );
//   };

//   const renderInstructions = () => {
//     const instructionItems = [
//       { color: 'green', text: 'Attempted Questions' },
//       { color: 'blue', text: 'Current Question' },
//       { color: 'red', text: 'Visited but not attempted Questions' },
//     ];

//     return (
//       <div className='instruction-card'>
//         <h4 style={{fontSize:"30px", textAlign:"center", marginBottom:"20px"}}>Instructions</h4>
//         {instructionItems.map((item, index) => (
//           <p key={index}>
//             <span className={`color-box ${item.color}`}></span>
//             {item.text}
//           </p>
//         ))}
//        <p style={{fontWeight:"bolder",fontSize:"20px",marginTop:"20px"}}>Time Remaining: {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toLocaleString('en-US', { minimumIntegerDigits: 2 })}</p>

//       </div>
//     );  };



//   return (
//     <>
//       <div>
//         <Navbar />
//         <div className='App'>
//         <div className='sidebar'>
//           {renderInstructions()} 

//             <h3 style={{ textAlign: 'center' ,marginTop:"-10px"}}>MCQ Quiz</h3>
//             {renderQuestionButtons()}
//           </div>
//           <div className='content' style={{ marginTop: '60px' }}>
//             {renderQuestion()}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default StudentExam;



import React, { useState, useEffect } from 'react';
import './StudentExam.css';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';

function StudentExam() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(3000);
  const [count, setCount] = useState(0);

  const {id} = useParams();

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
    const totalMarks = totalCorrect;
    console.log(`Total correct answers of ID ${id} is:`, totalCorrect);
  
    saveTotalMarksWithID(id, totalMarks);
    };

    const saveTotalMarksWithID = (enrolledID, marks) => {
      const totalMarksData = JSON.parse(localStorage.getItem('totalMarks')) || {};
      totalMarksData[enrolledID] = marks;
      localStorage.setItem('totalMarks', JSON.stringify(totalMarksData));
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

  const renderInstructions = () => {
    const instructionItems = [
      { color: 'green', text: 'Attempted Questions' },
      { color: 'blue', text: 'Current Question' },
      { color: 'red', text: 'Visited but not attempted Questions' },
    ];

    return (
      <div className='instruction-card'>
        <h4 style={{ fontSize: "30px", textAlign: "center", marginBottom: "20px" }}>Instructions</h4>

        {instructionItems.map((item, index) => (
          <p key={index}>
            <span className={`color-box ${item.color}`}></span>
            {item.text}
          </p>
        ))}
        <p style={{ fontWeight: "bolder", fontSize: "20px", marginTop: "20px" }}>Time Remaining: {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toLocaleString('en-US', { minimumIntegerDigits: 2 })}</p>

      </div>
    );
  };

  return (
    <>
      <div>
        <Navbar />
        <div className='App'>
          <div className='sidebar'>
            <p studentId={id} style={{textAlign:"center",fontWeight:"bold"}}>ID:{id}</p>

              {renderInstructions()}
          
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

export default StudentExam; 


