import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SuperDash';
import './SuperManage.css';
import SuperSidebar from './SuperSidebar';

const generateRandomPassword = () => {
  return Math.random().toString(36).substring(7);
};

const SuperManageStudent = () => {
  const location = useLocation();

  const students = location.state && location.state.students ? location.state.students : [];
  const navigate = useNavigate();

  const [studentPasswords, setStudentPasswords] = useState({});

  useEffect(() => {
    const storedPasswords = JSON.parse(localStorage.getItem('studentPasswords')) || {};
    setStudentPasswords(storedPasswords);
  }, []);

  const handleApprove = (student) => {
    let newPassword;

    if (studentPasswords[student.id]) {
      newPassword = studentPasswords[student.id];
    } else {
      newPassword = generateRandomPassword();
      localStorage.setItem('studentPasswords', JSON.stringify({ ...studentPasswords, [student.id]: newPassword }));
      setStudentPasswords({ ...studentPasswords, [student.id]: newPassword });
    }

    const index = students.findIndex((s) => s === student);
    const updatedStudents = [...students];
    updatedStudents[index] = {
      ...student,
      password: newPassword,
    };

    navigate('/ManageStudent', {
      state: {
        students: updatedStudents,
        credentials: {
          id: student.id,  
          password: newPassword,
        },
      },
    });
  };

  return (
    <>
      <div className='table-container'>
        <SuperSidebar />

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
                        <button onClick={() => handleApprove(student)}>Approve</button>
                      )}
                    </td>
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

export default SuperManageStudent;
