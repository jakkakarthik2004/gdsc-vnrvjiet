import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AdminForum from "./AdminForum";
import UserForum from "./userForum";
import { getUserById } from "../Apis/users";

function Forum() {
  const location = useLocation();
  const [user, setUser] = useState(location.state?.user);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     if (!user) {
  //       try {
  //         const userId = localStorage.getItem("userIdGDSC");
  //         const fetchedUser = await getUserById(userId);
  //         setUser(fetchedUser);
  //       } catch (error) {
  //         console.error("Error fetching user:", error);
  //       }
  //     }
  //   };

  //   fetchUser();
  // }, [user]);

  if (user && user.isAdmin) {
    return <AdminForum />;
  }

  return <UserForum />;
}

export default Forum;
