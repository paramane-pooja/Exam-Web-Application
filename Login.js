import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import "./Login.css";
export default function Login() {

  const [showPassword, setShowPassword] = useState(false);

   
     const [email,setEmail] = useState('');
     const [password,setPassword] = useState('');

     const [emailError,setEmailError] = useState('');

     const [passwordError,setPasswordError] = useState('');

        const SuperEmail = 'superAdmin@org.com';
        const SuperPass = '123@123';

        const Admin = 'admin@org.com';
        const AdPass = '123@1234';


        const navigate = useNavigate();
    

    const navigateToDash = () =>
    {
      if(email===SuperEmail && password===SuperPass )
      {
        navigate('/SuperDash');
    } 
    else if(email===Admin && password===AdPass )
    {
      navigate('/AdminDashboard');
    } 
    else {
      navigate("/")
    }
  }

  const handleLogin = () =>
  {
    navigate('/StudentLogin');
  } 

  /*const validateStudentEmail = () => {
    if (!email) {
      setEmailError('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  const validateStudentPass = () => {
    if (!password) {
      setPasswordError('Password is required');
    } else if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!$#%@])[A-Za-z\d!$#%@]{8,}$/
    ) {
      setPasswordError('');
    } else {
      setPasswordError('Invalid Format');
    }

  };*/

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


    const validateEmail = () => {
        if(!email)
        {
            setEmailError('Email is required');
        }
        else if(email!== SuperEmail && email!==Admin )
        {
            setEmailError('Incorrect Email Id');
        }
        else
        {
            setEmailError('');
        }
    }

    const validatePassword = () =>{
        if(!password)
        {
            setPasswordError('Password is required');

        }
        else if(password !== SuperPass && password!== AdPass)
        {
            setPasswordError('Incorrect Password');
        }
        else
        {
            setPasswordError('');
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(email,password);
        
    
          if ( email !== '' && password !== '' ) {
             
            setEmail('');
            setPassword('')
          }
            else 
            {
              console.log('Navigating to SuperDash');   
            }
            
        };
        return ( 
        
              
        <>
        <div className='container Demo card'
         style={{width: "40rem",
         height:"350px",
         backgroundColor:"#fff",
         color:"#676767", 
         marginTop:'100px',
         boxShadow: '7px 7px 2px rgba(187, 186, 186, 0.5)'}}
         >
            <div className="card-body"> 
               <form className="col g-3 mx-auto " onSubmit={handleSubmit}>
              <div>
                <p className='Heading' style={{marginLeft:"170px"}}>Login</p>
              </div>
             
            <div className="col-md-8 EachDiv">
            
            <input
             className="form-control"
             id="validationDefault02"
             placeholder="Email"
             type="email"
             autoComplete="new-email"
             value={email}
            onChange={(e) => setEmail(e.target.value) }
            onBlur={validateEmail}
            style={{boxShadow:"1px 3px 7px rgba(187,186,186,0.6)"}}
            required
           /> {emailError && <p style={{color:"red"}}>{emailError}</p>}
        
          </div>
          
          <div className="col-md-8 EachDiv" style={{marginTop:"2px"}}>
          <div className="password-container">
            <div className="password-input-container">
            
            
            <input
             className="form-control"
             id="validationDefault03"
             placeholder="Password"
             type={showPassword ? "text " : "password"}
             autoComplete="new-password"
             value={password}
             maxLength={8}
             onChange={(e) => setPassword(e.target.value) }
             onBlur={validatePassword}
             style={{boxShadow:"1px 3px 7px rgba(187,186,186,0.6)"}}
               required
            />             {passwordError && <p style={{color:"red"}}>{passwordError}</p>}

                        <span
                className='password-toggle-icon'
                onClick={togglePasswordVisibility}
              >
                 {showPassword ?(
                   <i className='bi bi-eye'></i>
                   ) : (
                     <i className='bi bi-eye-slash'></i>
                   )}
              </span>
       </div>
                   </div>
           </div >


            <div className= "Sub"  >
            <button className='btn btn-dark'
             type="submit"
              onClick={navigateToDash}
              style={{
                height:"40px",
                 width:"40%",
                 backgroundColor:"#676767"}}
              >
               Login 
               </button>
          </div>
        </form>
        </div>
        </div>
        <div style={{
             marginTop:"40px",
             width: "15%",             
             height: "40px",
             paddingBottom: "20px",
             justifyContent: "center",
             marginLeft: "600px",
          
        }}>
        <button onClick={handleLogin}>Login as Student</button>
        
        </div>
        </>  
          )}
        