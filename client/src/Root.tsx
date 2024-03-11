import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Signup from "./pages/SignIn";
import Home from "./pages/Home";
import PastEvents from "./pages/Events/PastEvents";
import Login from "./pages/Login";
import Forum from "./pages/Forum";
import Leads from "./pages/Leads";
import UpcomingEvents from "./pages/Events/UpcomingEvents";
import SolutionChallenge from "./pages/SolutionChallenge";
import CommunityGuidelines from "./pages/CommunityGuidelines";
import Leaderboard from "./pages/leaderboard/leaderboard";
import Enter from "./pages/leaderboard/enter";
import Score from "./pages/leaderboard/score";
import accessDenied from "./images/accessDenied.png";
import ForgotPassword from "./pages/ForgotPassword";

const isAuthenticated = () => {
  return localStorage.getItem("userIdGDSC") == "1";
};

const ProtectedRoute: React.FC<{ element: React.ReactNode; path: string }> = ({
  element,
}) => {
  return isAuthenticated() ? (
    <>{element}</>
  ) : (
    <div className="flex items-center justify-center">
      <img className="w-[75vw] md:w-[40vw]" src={accessDenied} />
    </div>
  );
};

function Root() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/admin-signup" element={<Signup />} />
        <Route path="/admin-login" element={<Login />} /> */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/upcoming-events" element={<UpcomingEvents />} />
        <Route path="/past-events" element={<PastEvents />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/solution-challenge" element={<SolutionChallenge />} />
        <Route path="/community-guidelines" element={<CommunityGuidelines />} />
        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute element={<Leaderboard />} path="/leaderboard" />
          }
        />
        <Route
          path="/enter"
          element={<ProtectedRoute element={<Enter />} path="/enter" />}
        />
        <Route
          path="/score"
          element={<ProtectedRoute element={<Score />} path="/score" />}
        />
      </Routes>
    </Router>
  );
}

export default Root;
