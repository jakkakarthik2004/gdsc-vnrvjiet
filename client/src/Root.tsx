import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./pages/SignIn";
import Home from "./pages/Home";
import PastEvents from "./pages/Events/PastEvents";
import Login from "./pages/Login";
import Forum from "./pages/Forum";
import Leads from "./pages/Leads";
import UpcomingEvents from "./pages/Events/UpcomingEvents";
import SolutionChallenge from "./pages/SolutionChallenge";
import CommunityGuidelines from "./pages/CommunityGuidelines";

function Root() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-signup" element={<Signup />} />
        <Route path="/admin-login" element={<Login />} />
        <Route path="/upcoming-events" element={<UpcomingEvents />} />
        <Route path="/past-events" element={<PastEvents />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/solution-challenge" element={<SolutionChallenge />} />
        <Route path="/community-guidelines" element={<CommunityGuidelines />} />
      </Routes>
    </Router>
  );
}

export default Root;
