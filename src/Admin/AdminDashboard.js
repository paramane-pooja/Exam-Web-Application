import React, { useState } from 'react';

import './AdminDash.css';
import { Link, useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import AdminSidebar from './AdminSidebar';
import { useStudentContext } from './StudentContext';


function AdminDashboard() {
  const { addStudent,nextId } = useStudentContext();

  const [showNav, setShowNav] = useState(false);
  const navigate = useNavigate();

  const [name,setName] = useState('');
  const [mobile,setMobile] = useState('');
  const [gender,setGender] = useState('');
  const [dob,setDob] = useState('');
  const [course,setCourse] = useState ('');
  const [fees,setFees] = useState('');
  const [address,setAddress]= useState('');
  

  const [nameError, setNameError] = useState('');
  const [mobileError, setMobileError] = useState('');

  const [submitted,setSubmitted]=useState('');

  const validateName = () => {
    if (!name) {
      setNameError('Name is required');
    } 
    else if (!/[A-Za-z]/.test(name)) {
      setNameError('Invalid name');
    } 
      
    else {
      setNameError('');
    }
  };

  const validateMobile = () => {
    if (!mobile) {
      setMobileError('Mobile number is required');
    } else if (!/^[6-9]\d{9}$/.test(mobile)) {
      setMobileError('Invalid mobile number');
    } else if (/^(\d)(\1{4})$/.test(mobile.substring(0, 5))) {
      setMobileError('Invalid mobile number');
    } else {
      setMobileError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name,dob,mobile,address,gender,course,fees);

      if (name !== '' && dob !== '' && mobile !== '' && address !== '' && gender !== '' 
          && course !== '' && fees !=='' ) {

            const newStudent = {
              id:nextId,
              name,
              dob,
              mobile,
              address,
              gender,
              course,
              fees,
            };
      
        addStudent(newStudent);

        setSubmitted(true);
       
        setName('');
        setGender('');
        setMobile('');
        setDob('');
        setAddress('');
        setCourse('');
        setFees('');
    

       navigate('/ManageStudent');


          }
           else {
            alert('Please fill in all fields.');
          } 
    };


  return (
<>
    <div>

     <AdminSidebar />
    
    <div className="pt-4 pb-4">
    <div className='container card all'>
    <Form className="flex-grow-1">
    <header className='Heading'>Student Registration</header>

      <Row className="mb-6 col-md-12">
        <Form.Group as={Col} controlId="formGridName" className='col-md-6'>
          <Form.Label>Full Name</Form.Label>
          <Form.Control 
           type="text"
           placeholder="Enter Full Name" 
           value={name}
           onChange={(e)=> setName(e.target.value)}
           onBlur={validateName}/>
          {nameError && <p style={{color:"red"}}>{nameError}</p>}

        </Form.Group>


        <Form.Group as={Col} controlId="formGridMobile" className='col-md-6'>
          <Form.Label>Mobile</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Mobile No."
            value={mobile}
            maxLength={10}
            onChange={(e)=> setMobile(e.target.value)}
            onBlur={validateMobile}          
             />
           { mobileError && <p style={{color:"red"}}>{mobileError}</p>}

        </Form.Group>

      </Row>
      <Row className='mb-4'>
      <Form.Group className="mb-3 col-md-11" controlId="formGridAddress1" 
      style={{marginLeft:"10px"}}>
        <Form.Label>Address</Form.Label>
        <Form.Control 
        placeholder="Enter Address" 
        value={address}
        onChange={(e) => setAddress(e.target.value)}/>
      </Form.Group>
      </Row>

      <Row className='mb-4 col-md-14'>
      <Form.Group className="mb-3 col-md-4" controlId="formGridDob" style={{marginLeft:"10px"}}>
        <Form.Label>Date of Birth</Form.Label>
        <Form.Control 
        type='date'
        value={dob}
        onChange={(e) => setDob(e.target.value)} />
      </Form.Group> 

      
      
        <Form.Group 
        style={{marginLeft:"40px"}}
        as={Row} 
        className="mb-3 col-md-6"
        controlId="formHorizontalRadios"
        value={gender}
        onChange={(e) => setGender(e.target.value)}

        >
          <Form.Label as="legend" column sm={4} >
             Gender
          </Form.Label>
          
            <Form.Check
              type="radio"
              label="Male"
              name="formHorizontalRadios"
              id="formHorizontalRadios1"
              value="Male"
            />
            <Form.Check
              type="radio"
              label="Female"
              name="formHorizontalRadios"
              id="formHorizontalRadios2"
              value="Female"
             />

         </Form.Group>
      
      </Row>


      <Row className="mb-4 col-md-10">

        <Form.Group
         
          as={Col} 
          controlId="formGridCourse"
          className='col-md-6'>
          <Form.Label>Course</Form.Label>
          <Form.Select 
          defaultValue="Courses"
          value={course}
          onChange={(e) => setCourse(e.target.value)}>
            <option>Courses</option>
            <option>Tally ERP</option>
            <option>MS-CIT</option>
            <option>CCC</option>
            <option>Digital Marketing</option>

          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridCity" className='col-md-6'>
          <Form.Label>Fees</Form.Label>
          <Form.Control 
          type='text'
          value={fees}
          onChange={(e) => setFees(e.target.value)}
           />
        </Form.Group>
       </Row>

     {/* <Form.Group className="mb-3" id="formGridCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      */}

      <Button
        
       type="submit"
       className='sub-button'
       onClick={handleSubmit} >
        Submit
      </Button> 
      
    </Form> 
    </div>

    </div>  
    </div>
    </>
  )
}

export default AdminDashboard;