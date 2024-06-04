import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import StudentPage from "@/pages/users/StudentPage";
import { useAuth } from "./AuthProvider";

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
