import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import { Toaster } from "react-hot-toast";
// import Signup from "../";

function Auth({ handleLogin }) {
  return (
    <BrowserRouter>
      <Toaster></Toaster>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="*" element={<Login onLogin={handleLogin} />} />
        {/* <Route path="/signup" element={<Signup />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default Auth;