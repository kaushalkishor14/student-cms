import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import StudentPage from "@/pages/users/StudentPage";
import { useAuth } from "./AuthProvider";
import Teacher from "@/pages/Teacher";
import Subject from '@/pages/Subject'
import Dashboard from "@/pages/Dashboard";
import Course from "@/pages/Course";
import EmployeeForm from "@/components/teacher-page/teacher-form"
function AllRoutes() {
  const { user } = useAuth();
  return (
    <Routes>
      <>
        {user ? (
          <>
            <Route path="/" element={<Dashboard />} />
            <Route path="/student" element={<StudentPage />} />
            <Route path="/teacher" element={<Teacher/>}/>
            <Route path="/course/dsa" element={<Subject/>}/>
            <Route path="/" element={<Course/>}> 

              {/* here u can add Subroute like this way  */}
              <Route path="dsa" element={<Subject/>} />
            </Route> 
            <Route path="*" element={<Dashboard />} />
            <Route path="/EmployeeForm" element={<EmployeeForm/>}> </Route>
          </>
        ) : (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<LoginPage />} />
          </>
        )}
      </>
    </Routes>
  );
}

export default AllRoutes;
