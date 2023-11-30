import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./pages/SignIn";
import Home from "./pages/Home";
import PastEvents from "./pages/Events/PastEvents";
import Login from "./pages/Login";
import Forum from "./pages/Forum";
import UpcomingEvents from "./pages/Events/UpcomingEvents";

function Root() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/SignUp" element={<Signup />} />
        <Route path="/LogIn" element={<Login />} />
        <Route path="/Upcoming-events" element={<UpcomingEvents/>} />
        <Route path="/Past-events" element={<PastEvents/>} />
        <Route path="/Forum" element={<Forum/>} />
      </Routes>
    </Router>
  );
}

export default Root;
