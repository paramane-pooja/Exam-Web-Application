import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link,useNavigate } from 'react-router-dom';
import './SuperDashStyle.css';

export default function SuperSidebar() {

    const [showNav, setShowNav] = useState(true);
    const navigate = useNavigate();

        const handleLogout = () => {
            navigate('/')
        }


  return  <div>
  <div className={`l-navbar${showNav ? ' show' : ''}`}>
    <nav className="nav">
      <div>
        <p  className="nav_logo">
          <i className='bi bi-app nav_logo-icon' /> <span className="nav_logo-name"> Super Admin <br/>Dashboard</span>
        </p>
        <div className="nav_list">
          <p className="nav_link">
          <i class="bi bi-pc-display-horizontal nav_icon"></i>
         <span className="nav_name">
            <Link style={{color:"#f7f6fb",textDecoration:"none"}} to='/SuperDash'>Dashboard</Link>
        </span>
          </p>
         </div>



         <div className="nav_list">
          <p className="nav_link">
            <i className='bi bi-person-check-fill nav_icon' /><span className="nav_name">
              <Link style={{color:' #F7F6FB',textDecoration:"none"}} to='/SuperManageStudent'>Manage Student</Link></span>
          </p>
         </div>


         <div className="nav_list">
          <p className="nav_link">
         <i className='bi bi-mortarboard-fill nav_icon' />
         <span className="nav_name">
            <Link style={{color:' #F7F6FB',textDecoration:"none"}} to='/Exam'>Exam</Link>
        </span>
          </p>
         </div>

         <div className="nav_list">
          <p className="nav_link">
         <i className='bi bi-building-fill-add nav_icon' />
         <span className="nav_name">
            <Link style={{color:' #F7F6FB',textDecoration:"none"}} to='/AddCenter'>Add Center</Link>
        </span>
          </p>
         </div>

         <div className="nav_list">
              <p className="nav_link" onClick={handleLogout}>
                <i className='bi bi-box-arrow-left nav_icon' />
                <Link style={{color:' #F7F6FB',textDecoration:"none"}} to='/'>Log Out</Link>
                </p>
            </div>


         </div>
    </nav>
  </div>
  </div>
      
  
}
