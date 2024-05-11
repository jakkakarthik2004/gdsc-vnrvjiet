import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import {
  createEvent,
  getAllEvents,
  getEventById,
  getUpcomingEvents,
} from "../../../Apis/events";
import {
  getAllRegistrationsByUserId,
  updateRegistration,
} from "../../../Apis/registrations";
import ConfettiExplosion from "react-confetti-explosion";
import { getUserById } from "../../../Apis/users";
import { format } from "date-fns";

interface Event {
  eventId: number;
  name: string;
  startDate: string;
  endDate: string;
  venue: string;
  description: string;
  // image: string;
}

function UserPortalUpcoming() {
  const navigate = useNavigate();
  const [registeredEvents, setRegisteredEvents] = useState<Event[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const userId = localStorage.getItem("userIdGDSC");
  const [userData, setUserData] = useState<{ id: number; name: string }>();
  const [explodingEvent, setExplodingEvent] = React.useState<number | null>(
    null
  );
  const [message, setMessage] = useState("Loading...");

  async function fetchData() {
    try {
      const fetchedEvents = await getUpcomingEvents();
      // const user = await getUserById(userId);
      // setUserData(user);
      setEvents(fetchedEvents.payload.reverse());
      setMessage("No upcoming events for now :(");
      // const registeredEvents = await getAllRegistrationsByUserId(userId);
      // setRegisteredEvents(registeredEvents);
    } catch (error) {
      console.log(error);
    }
  }
  function gotoRegister(){
    navigate("/register")
  }

  useEffect(() => {
    fetchData();
  }, []);

  // const handleRegisterForEvent = async (eventId: number) => {
  //   try {
  //     if (userId) {
  //       const register = isEventRegistered(eventId);
  //       await updateRegistration(userId, eventId);

  //       if (!register && explodingEvent !== eventId) {
  //         setExplodingEvent(eventId);

  //         setTimeout(() => {
  //           setExplodingEvent(null);
  //         }, 5000);
  //       }

  //       fetchData();
  //     } else {
  //       window.alert("Please login to register");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const isEventRegistered = (eventId: number) => {
  //   return registeredEvents.some((event) => event.eventId === eventId);
  // };

  const heroStyle = {
    backgroundImage: `url('https://res.cloudinary.com/startup-grind/image/fetch/c_scale,w_2560/c_crop,h_650,w_2560,y_0.0_mul_h_sub_0.0_mul_650/c_crop,h_650,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/https://res.cloudinary.com/startup-grind/image/upload/c_fill%2Cdpr_2.0%2Cf_auto%2Cg_center%2Cq_auto:good/v1/gcs/platform-data-goog/chapter_banners/IOE22-Bevy-ChapterBanner-2560x650_x6zWRuV.png')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100px",
  };

  return (
    <div className="min-h-full p-4">
      <div
        className="HeroSection flex flex-col  bg-cover bg-center bg-no-repeat m-4"
        style={heroStyle}
      >
        <img src="" />
        <h2 className="text-2xl font-bold mb-4 my-auto">
          Welcome
          {/* back, {userData?.name}. */}
        </h2>
      </div>

      <div>
        {events.length ? (
          <>
            <h3 className="text-xl font-semibold mb-4">Upcoming Events</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {events.map((event) => (
                <div
                  key={event.eventId}
                  className="bg-white rounded shadow-lg max-w-sm hover:scale-105 duration-200 border border-slate-400 p-4"
                >
                  <h4 className="text-lg font-semibold mb-3">{event.name}</h4>
                  <p>
                    {" "}
                    <strong>What's Happening : </strong>
                    {event.description}
                  </p>
                  <p className="py-2">
                    <strong>When : </strong>{" "}
                    {/* {format(new Date(event.startDate), "yyyy-MM-dd HH:mm")} to{" "}
                    {format(new Date(event.endDate), "yyyy-MM-dd HH:mm")} */}
                    {event.startDate}
                    {" - "}
                    {event.endDate}
                  </p>
                  <p>
                    <strong>Where : </strong>
                    {event.venue}
                  </p>
                  {/* <button
                    onClick={() => handleRegisterForEvent(event.eventId)}
                    className="bg-[#0F71F2] rounded px-3 py-1 mt-2 hover:ring-4 text-white font-semibold  "
                  >
                    {explodingEvent === event.eventId && (
                      <ConfettiExplosion
                        force={0.5}
                        duration={2500}
                        particleCount={80}
                        width={1000}
                        colors={[
                          "#0F71F2",
                          "#318C07",
                          "#F2A20C",
                          "#D92929",
                          "#868686",
                        ]}
                      />
                    )}
                    {isEventRegistered(event.eventId)
                      ? "Registered !"
                      : "Register"}
                  </button> */} 
                  <div className="mt-2">
                  <button onClick={gotoRegister} type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Register</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center">
            <p>{message}</p>
            <img
              src="https://hadibuttt.github.io/GDSC-Portfolio-Site/img/main.png"
              alt="image"
              className="w-[75vw] md:w-[40vw]"
            />
          </div>
        )}
      </div>
      {/* <div>
        <h3 className="text-xl font-semibold">Registered Events</h3>
        <ul>
          {registeredEvents.map((event) => (
            <div
              key={event.eventId}
              className="shadow-lg w-[80vw] hover:scale-105 duration-300 bg-[#1e1e1e] border border-[#323434] p-4"
            >
              <h4 className="text-lg font-semibold mb-3">{event.name}</h4>
              <p>What's Happening: {event.description}</p>
              <p>When: {event.time}</p>
              <p>Where: {event.venue}</p>
              <button
                onClick={() => handleRegisterForEvent(event.eventId)}
                className="bg-[#186d67] text-white rounded px-3 py-1 mt-2 hover:bg-[#183937] cursor-not-allowed"
                disabled
              >
                Registered
              </button>
            </div>
          ))}
        </ul>
      </div> */}
    </div>
  );
}

export default UserPortalUpcoming;
