import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import StudentPage from "@/pages/users/StudentPage";
import { useAuth } from "./AuthProvider";
import Teacher from "@/pages/Teacher";
import Subject from '@/pages/Subject'
import Dashboard from "@/pages/Dashboard";
import Course from "@/pages/Course";
import {TeacherForm} from "@/components/teacher-page/teacher-form";
import ProfilePage from "../pages/users/profilePage"


function AllRoutes() {
  const { user } = useAuth();
  return (
    <Routes>
      <>
      {user ? (
          <>
            <Route path="/" element={<Dashboard />} />
            <Route path="/student" element={<StudentPage />} />
            <Route path="/teacher" element={<Teacher/>} />
            <Route path="/course/:name" element={<Subject/>} />
            <Route path="/course" element={<Course/>} /> 
            <Route path="*" element={<Dashboard />} />
            <Route path="/teacher-form/create" element={<TeacherForm />}> </Route>
            <Route path="/teacher-form?/:id" element={<TeacherForm initialData={1}/>}> </Route>
            <Route path='/profile-page' element={<ProfilePage/>} />
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