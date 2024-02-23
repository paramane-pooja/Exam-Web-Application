import React, { useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import './ManageStudent.css';
import AdminSidebar from './AdminSidebar';
import './AdminDash.css';
import { useStudentContext } from './StudentContext';

const ManageStudent = () => {
  
  const location = useLocation();
  const { students } = useStudentContext();
  const navigate = useNavigate();
  const credentials = location.state && location.state.credentials ? location.state.credentials : null;

  const handleRequest = () => {

    navigate('/SuperManageStudent', { state: { students } });

  }
  return (
    <>
    <div className='table-container'>
      <AdminSidebar />
    
    <div>
      {students.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Gender</th>
              <th>Mobile</th>
              <th>Address</th>
              <th>Course</th>
              <th>Fees</th>
              <th>Request</th>

              {credentials && (
                    <>
                      <th>Password</th>
                    </>
                  )}

            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.dob}</td>
                <td>{student.gender}</td>
                <td>{student.mobile}</td>
                <td>{student.address}</td>
                <td>{student.course}</td>
                <td>{student.fees}</td>                
                <td>
                  {student.approved ? (
                    <button disabled>Approved</button>
                  ) : (
                    <button onClick={() => handleRequest()}>Request</button>
                  )
                  
                  }
                </td>


                {credentials && credentials && index === students.length - 1 && (
                <>
                  <td>{credentials.password}</td>
                </>
                    )}
                  

              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No students to display.</p>
      )}
    </div>
    </div>
    </>
  );
};

export default ManageStudent;
