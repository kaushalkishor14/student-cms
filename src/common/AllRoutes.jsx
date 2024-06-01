import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import SingUp from "@/pages/Sing-up";

function AllRoutes() {
  return (
    <Routes>
      <>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SingUp />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </>
    </Routes>
  );
}

export default AllRoutes;
