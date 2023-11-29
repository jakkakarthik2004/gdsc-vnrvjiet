import React, { useEffect, useState } from "react";
import AdminPortal from "./admin/Upcoming-AdminPortal";
import UserPortal from "./user/Upcoming-UsersPortal";
import { useLocation } from "react-router-dom";
import { getUserById } from "../../Apis/users";

function Events() {
  const location = useLocation();
  const [user, setUser] = useState(location.state?.user);

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) {
        try {
          const userId = localStorage.getItem("userIdGDSC");
          const fetchedUser = await getUserById(userId);
          setUser(fetchedUser);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };

    fetchUser();
  }, [user]);

  if (user && user.isAdmin) {
    return <AdminPortal />;
  } else {
    return <UserPortal />;
  }
}

export default Events;
