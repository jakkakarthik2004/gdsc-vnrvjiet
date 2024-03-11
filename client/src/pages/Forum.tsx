import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AdminForum from "./AdminForum";
import UserForum from "./userForum";
import { getUserById } from "../Apis/users";

function Forum() {
  const location = useLocation();
  // const [user, setUser] = useState(location.state?.user);
  const [user, setUser] = useState();

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

  // if (user && (user as any).isAdmin) {
  //   return <AdminForum />;
  // }
  // console.log(user)
  return <UserForum />;
  
}

export default Forum;
