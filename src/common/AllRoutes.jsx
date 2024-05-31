import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import SingUp from "@/pages/Sing-up";

function AllRoutes() {
  return (
    <Routes>
      <>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SingUp />} />
      </>
    </Routes>
  );
}

export default AllRoutes;
