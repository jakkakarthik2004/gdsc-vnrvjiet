import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AdminForum from "./AdminForum";
import UserForum from "./userForum";
import { getUserById } from "../Apis/users";

function Forum() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userObjGDSC") || "null") as {
      role: string;
    } | null
  );

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const userId = localStorage.getItem("userIdGDSC");
  //       const fetchedUser = await getUserById(userId);
  //       setUser(fetchedUser.user);
  //     } catch (error) {
  //       console.error("Error fetching user:", error);
  //     }
  //   };

  //   fetchUser();
  // }, []);

  if (user && user.role === "admin") {
    return <AdminForum />;
  }
  return <UserForum />;
}

export default Forum;
