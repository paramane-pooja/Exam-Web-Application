import React, { useState } from 'react';

import { Navigate,useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';



const StudentDashboard = () => {
  const {id} = useParams();
  const [accepted, setAccepted] = useState(false);


  const handleAcceptanceChange = () => {
    setAccepted(!accepted);
  };

  const navigate = useNavigate();

  const handleStartExam = () => {
    if (accepted) {
      navigate(`/StudentExam/${id}`);
    } else {
      alert('Please accept the terms before starting the exam.');
    }
  };

  return (
    <div>
      <Navbar />
    <div className='card'
    style={{
      maxHeight:"600px",
      width: '60%',
      marginTop: '80px',
      marginLeft:'270px',
      padding:'10px', 
      boxShadow:"5px 5px 5px rgba(126, 128, 130, 0.5)"
    }}
>
      <h1 style={{paddingBottom:"10px"}}> Exam Instructions</h1>
      <p style={{fontSize:"25px",paddingLeft:"20px"}}>
        Welcome to the exam.<br/>
        
       Please read the following instructions carefully before proceeding.
      </p>
      <ul style={{listStyleType:"square"}}>
        <li>Ensure you have a stable internet connection.</li>
        <li>Do not use any unauthorized materials during the exam.</li>
        <li>Check the box below to indicate your acceptance of the exam terms.</li>
        <li>Don't refresh the exam page during exam</li>
      </ul>
      <label>
        <input
          type="checkbox"
          checked={accepted}
          onChange={handleAcceptanceChange}
          style={{marginRight:"20px",marginLeft:"20px"}}
        />
        I accept the terms and conditions
      </label>
      <br />  
        <button onClick={handleStartExam} style={{width:"20%",marginLeft:"20px"}}>Start Exam</button>
    </div>
    </div>
  );
};

export default StudentDashboard;


