import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentLogin.css';
import Navbar from './Navbar';

export default function StudentLogin() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [idError, setIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateId = () => {
    setIdError('');
    if (!id) setIdError('Id is required');
  };

  const validatePassword = () => {
    setPasswordError('');
    if (!password) setPasswordError('Password is required');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateId();
    validatePassword();

    const storedPasswords = JSON.parse(localStorage.getItem('studentPasswords')) || {};

    if (id in storedPasswords && password === storedPasswords[id]) {
      navigate(`/StudentDashboard/${id}`);
    } else {
      console.log('Invalid credentials');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Navbar />
      <div className='container Demo card'>
        <div className="card-body">
          <form className="col g-3 mx-auto" onSubmit={handleSubmit}>
            <p className='Heading' style={{ marginLeft: "90px" }}>Student Login</p>
            <div className="col-md-8 EachDiv">
              <input
                className="form-control"
                placeholder="Id"
                type="text"
                autoComplete="new-id"
                value={id}
                onChange={(e) => setId(e.target.value)}
                onBlur={validateId}
                required
              />
              {idError && <p style={{ color: "red" }}>{idError}</p>}
            </div>

            <div className="col-md-8 EachDiv" style={{ marginTop: "2px" }}>
              <div className="password-container">
                <input
                  className="form-control"
                  placeholder="Password"
                  type={showPassword ? "text" : 'password'}
                  autoComplete="new-password"
                  value={password}
                  maxLength={8}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={validatePassword}
                  required
                />
                <span
                  className='password-toggle-icon'
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <i className='bi bi-eye'></i>
                  ) : (
                    <i className='bi bi-eye-slash'></i>
                  )}
                </span>
                {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
              </div>
            </div>

            <div className="Sub">
              <button
                className='btn btn-dark'
                type="submit"
                style={{
                  height: "40px",
                  width: "40%",
                  backgroundColor: "#676767"
                }}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
