import React, { useState, useEffect } from "react";
import Popup from "./Popup";
import Signup from "./SignIn";
import { createUser } from "../Apis/users";
import Login from "./Login";
import conduct from "../images/conduct.png";
import register from "../images/register.png";
import admin from "../images/admin.png";

const cards = [
  {
    image: conduct,
    title: "Conduct Events",
    description:
      "EventHub allows you to easily create and manage events. Whether you're a user looking to attend events or an admin organizing them, EventHub has you covered.",
  },
  {
    image: register,
    title: "Register for Events",
    description:
      "As a user, you can explore a variety of events and register for the ones that interest you. Stay updated with event details and manage your registrations hassle-free.",
  },
  {
    image: admin,
    title: "Admin Portal",
    description:
      "Admins have access to a powerful portal for event management. Create, edit, or delete events with ease. EventHub simplifies event organization for administrators.",
  },
];

interface props {
  darkMode: boolean;
}

const createAdminUser = async () => {
  try {
    await createUser({
      name: "admin",
      email: "admin@gmail.com",
      password: "adminpassword",
      isAdmin: 1,
    });
  } catch (error) {
    console.log(error);
  }
};

function Home() {
  const [showPopup, setShowPopup] = useState(true);
  const [showSignup, setShowSignup] = useState(false);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    createAdminUser();
  }, []);

  return (
    <div className="p-4 mt-10">
      {/* {showPopup && <Popup onClose={handleClosePopup} />} */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="shadow-lg max-w-sm hover:scale-105 duration-300 bg-[#1e1e1e] border border-[#323434]"
          >
            <div className=" h-[222px] overflow-hidden">
              <img src={card.image} alt="image" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">{card.title}</h3>
              <p className="mb-4">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 text-white flex flex-col gap-4 items-center p-6">
        <p className="text-xl font-semibold">Join the EventHub Community</p>
        <p className="text-gray-300 text-lg">
          Discover amazing events and connect with like-minded people.
        </p>
        <div className="shadow-lg w-fit hover:scale-105 duration-300 bg-[#1e1e1e] border border-[#323434]">
          {showSignup ? <Signup /> : <Login />}
        </div>
        <p className="cursor-pointer text-[#6caba7] hover:underline text-lg">
        {showSignup ? "Already have an account" : "New user?"}{" "}
          <span
            className="font-bold cursor-pointer"
            onClick={() => setShowSignup(!showSignup)}
          >
            {showSignup ? "Log in here" : "Sign up here"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Home;
