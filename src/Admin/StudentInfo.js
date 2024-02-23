import React, { useEffect, useState } from 'react';
import './StudentInfo.css'; 
import AdminSidebar from "./AdminSidebar";
import { Link } from 'react-router-dom';

  const StudentInfo = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => { 
    const studentData = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
      if (key.startsWith('studentID_')) {
        const student = JSON.parse(localStorage.getItem(key));
        studentData.push(student);  
      }
    }
  
        studentData.sort((a, b) => a.id - b.id);
        setStudents(studentData);
  }, []);

  return (
    <div>
      <AdminSidebar />
      <div className="student-info-container">
        <h2>All Students</h2>
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
                <th>Marks</th>
                <th>Edit</th>
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
                <td>{student.marks}</td>
                
                <td>
                  <Link to={`/EditStudent/${student.id}`}><button>Edit</button></Link>
                </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No students found.</p>
        )}
      </div>
    </div>
  );
};

export default StudentInfo;
