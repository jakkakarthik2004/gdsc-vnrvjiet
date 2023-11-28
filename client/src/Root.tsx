import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./pages/SignIn";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Login from "./pages/Login";
import Forum from "./pages/Forum";
import Navbar from "./pages/Navbar";

function Root() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/SignUp" element={<Signup />} />
        <Route path="/LogIn" element={<Login />} />
        <Route path="/Events" element={<Events/>} />
        <Route path="/Forum" element={<Forum/>} />
      </Routes>
    </Router>
  );
}

export default Root;
