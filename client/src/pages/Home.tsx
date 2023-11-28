import React, { useState, useEffect } from "react";
import Popup from "./Popup";
import Signup from "./SignIn";
import { createUser } from "../Apis/users";
import Login from "./Login";
import admin from "../images/admin.png";
import Hero from "./Hero";

const cards = [
  {
    image: "https://i.pinimg.com/originals/61/6c/4d/616c4d1b3ba7abe709e31c3e01ce539c.png",
    title: "Conduct Events",
    description:
      "EventHub allows you to easily create and manage events. Whether you're a user looking to attend events or an admin organizing them, EventHub has you covered.",
  },
  {
    image: "https://miro.medium.com/v2/resize:fit:1400/1*0l1FBAqH-wOk7Fhw9ZeW2Q.png",
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
    <div>
      <Hero/>
      <div className="p-5  text-slate-800 bg-gray-50">
        {/* {showPopup && <Popup onClose={handleClosePopup} />} */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card, index) => (
            <div
              key={index}
              className="shadow-lg max-w-sm hover:scale-105 duration-300 bg-gray-100 border border-slate-200 rounded-lg"
            >
              <div className=" h-[222px] overflow-hidden">
                <img src={card.image} alt="image" className="rounded-lg" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">{card.title}</h3>
                <p className="mb-4">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-white flex flex-col gap-4 items-center p-6">
        <p className="text-xl text-gray-600 font-semibold">Join us, at GDSC.</p>
          <p className="text-gray-500 text-lg">
            Discover amazing events and connect with like-minded people.
          </p>
          {/* <div className="shadow-lg w-fit hover:scale-105 duration-300 bg-slate-200 text-gray-800 border border-[#323434] rounded-md">
            {showSignup ? <Signup /> : <Login />}
          </div> */}
          {/* <p className="cursor-pointer text-[#868686] hover:underline hover:text-[#318C07] text-lg">
          {showSignup ? "Already have an account" : "New user?"}{" "}
            <span
              className="font-bold cursor-pointer"
              onClick={() => setShowSignup(!showSignup)}
            >
              {showSignup ? "Log in here" : "Sign up here"}
            </span>
          </p> */}
        </div>
      </div>
    </div>
  );
}

export default Home;
