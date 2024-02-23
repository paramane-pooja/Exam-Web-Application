import React from "react";
import {Route , Routes} from "react-router-dom";

import SuperDash from "./components/SuperAdmin/SuperDash";
import AllCenters from "./components/SuperAdmin/AllCenters";
import Exam from "./components/SuperAdmin/Exam";
import ManageCenter from "./components/SuperAdmin/ManageCenter";
import AddCenter from "./components/SuperAdmin/AddCenter";
import Login from "./components/Login";
import AdminDashboard from "./components/Admin/AdminDashboard";
import ManageStudent from "./components/Admin/ManageStudent";
import StudentDashboard from "./components/Student/StudentDashboard";
import StudentExam from "./components/Student/StudentExam";
import SuperManageStudent from "./components/SuperAdmin/SuperManageStudent";
import StudentLogin from "./components/Student/StudentLogin";
import StudentInfo from "./components/Admin/StudentInfo";
import { CenterProvider } from "./components/SuperAdmin/CenterContext";
import { StudentProvider } from './components/Admin/StudentContext';
import EditStudent from "./components/Admin/EditStudent";


function App() {

    return (
    <>
    <CenterProvider>
    <StudentProvider>

    <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/SuperDash" element={<SuperDash />} />
    <Route path="/AdminDashboard"  element={<AdminDashboard/>}/>
    <Route path="/AllCenters" element={<AllCenters />} />
    <Route path="/Exam" element={<Exam />} />
    <Route path="/ManageCenter" element={<ManageCenter />} />
    <Route path="/AddCenter" element={<AddCenter />} />
    <Route path="/ManageStudent" element={<ManageStudent />}/>
    <Route path="/StudentDashboard/:id" element={<StudentDashboard />}/>
    <Route path="/StudentExam/:id" element={<StudentExam />}/>
    <Route path="/SuperManageStudent" element={<SuperManageStudent/>}/>
    <Route path="/StudentInfo" element={<StudentInfo/>}/>
    <Route path="/StudentLogin" element={<StudentLogin />} />
    <Route path="/EditStudent/:id" element={<EditStudent />} />

    </Routes>

    </StudentProvider>
    </CenterProvider>
      
     </>
  );
}

export default App;
