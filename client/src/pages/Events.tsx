import React from "react";
import AdminPortal from "./AdminPortal";
import UserPortal from "./UsersPortal";
import Home from "./Home";
import { useLocation } from "react-router-dom";

function Events() {
  const location = useLocation();
  const user = location.state?.user;

  if (user) {
    return user.isAdmin ? <AdminPortal /> : <UserPortal />;
  } else {
    return <Home />;
  }
}

export default Events;
