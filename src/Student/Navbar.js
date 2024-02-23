import React from "react";
import { Navigate,useNavigate ,Link} from "react-router-dom";


export default function Navbar() {
  const navigate =useNavigate();
  const handleLogout = () => {
    navigate('/');
}
  return (
  <nav className="navbar sticky-top bg-body-tertiary">
  <div className="container-fluid" onClick={handleLogout} style={{justifyContent:"right"}}>
  <i className='bi bi-box-arrow-left nav_icon' style={{color:"#676767", marginRight:"10px"}} />
  <a><Link style={{color:'#676767',textDecoration:"none", fontSize:"20px",paddingRight:"40px"}}>Logout</Link>  </a>
  </div>
</nav>
);
};