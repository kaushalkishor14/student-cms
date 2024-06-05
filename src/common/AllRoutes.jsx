import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import StudentPage from "@/pages/users/StudentPage";
import { useAuth } from "./AuthProvider";
import Teacher from "@/pages/Teacher";
import Subject from '@/pages/Subject'

function AllRoutes() {
  const { user } = useAuth();
  return (
    <Routes>
      <>
        {user ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/student" element={<StudentPage />} />
            <Route path="*" element={<Home />} />
            <Route path="/teacher" element={<Teacher/>}/>
            <Route path="/subject" element={<Subject/>}/>
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
