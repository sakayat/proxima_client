import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { useAuthContext } from "./hooks/useAuthContext";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

const App = () => {
  const {user} = useAuthContext()
  
  return (
    <div className="container mx-auto">
      <Navbar />
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/login" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
