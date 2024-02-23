import React,{useState} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './AdminDash.css';

export default function AdminSidebar() {
    const [showNav, setShowNav] = useState(true);
    const navigate = useNavigate();
    const {id} = useParams()

    const handleLogout = () => {
      navigate('/')
  }

  return  <div>
  <div className={`l-navbar${showNav ? ' show' : ''}`}>
    <nav className="nav">
      <div>
        <p  className="nav_logo"> 
          <i className='bi bi-app nav_logo-icon' /> <span className="nav_logo-name"> Admin Dashboard</span>
        </p>
        <div className="nav_list">
          <p className="nav_link">
            <i class="bi bi-pc-display-horizontal nav_icon"></i>
                <span className="nav_name">
                  <Link style={{color:"#f7f6fb",textDecoration:"none"}} to='/AdminDashboard'>Dashboard</Link>
                </span>
          </p>  
        </div>

        <div className="nav_list">
          <p className="nav_link">
            <i class="bi bi-file-earmark-person-fill nav_icon"></i>
              <span className="nav_name">
                <Link style={{color:"#f7f6fb",textDecoration:"none"}} to='/StudentInfo'>Student Details</Link>
              </span>
          </p>
        </div>

        <div className="nav_list">
          <p className="nav_link">
            <i class="bi bi-card-list nav_icon"></i>
              <span className="nav_name">
                <Link style={{color:"#f7f6fb",textDecoration:"none"}} to='/EditStudent/:student.id'>Edit Student Details</Link>
              </span>
          </p>
        </div>


        <div className="nav_list">
          <p className="nav_link">
            <i className='bi bi-person-check-fill nav_icon' /><span className="nav_name">
              <Link style={{color:' #F7F6FB',textDecoration:"none"}} to='/ManageStudent'>Manage Student</Link></span>
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
