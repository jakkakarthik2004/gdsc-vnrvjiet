import React, { useState, useEffect } from "react";
import { getAllEvents, getEventById } from "../Apis/events";
import {
  getAllRegistrationsByUserId,
  updateRegistration,
} from "../Apis/registrations";
import ConfettiExplosion from "react-confetti-explosion";

interface Event {
  eventId: number;
  name: string;
  time: string;
  venue: string;
  description: string;
  // image: string;
}

function UserPortal() {
  const [registeredEvents, setRegisteredEvents] = useState<Event[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const userId = localStorage.getItem("userIdGDSC");
  const [explodingEvent, setExplodingEvent] = React.useState<number | null>(
    null
  );

  async function fetchData() {
    try {
      const fetchedEvents = await getAllEvents();
      setEvents(fetchedEvents);
      const registeredEvents = await getAllRegistrationsByUserId(userId);
      setRegisteredEvents(registeredEvents);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleRegisterForEvent = async (eventId: number) => {
    try {
      const register = isEventRegistered(eventId);
      await updateRegistration(userId, eventId);

      if (!register && explodingEvent !== eventId) {
        setExplodingEvent(eventId);

        setTimeout(() => {
          setExplodingEvent(null);
        }, 5000);
      }

      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const isEventRegistered = (eventId: number) => {
    return registeredEvents.some((event) => event.eventId === eventId);
  };

  return (
    <div className="min-h-full p-4 text-white">
      <h2 className="text-2xl font-bold mb-4">User Portal</h2>
      <div>
        <h3 className="text-xl font-semibold mb-4">Available Events</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event) => (
            <div
              key={event.eventId}
              className="shadow-lg max-w-sm hover:scale-105 duration-300 bg-[#1e1e1e] border border-[#323434] p-4"
            >
              <h4 className="text-lg font-semibold mb-3">{event.name}</h4>
              <p>What's Happening: {event.description}</p>
              <p>When: {event.time}</p>
              <p>Where: {event.venue}</p>
              <button
                onClick={() => handleRegisterForEvent(event.eventId)}
                className="bg-[#186d67] text-white rounded px-3 py-1 mt-2 hover:bg-[#183937] "
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
                {isEventRegistered(event.eventId) ? "Registered !" : "Register"}
              </button>
            </div>
          ))}
        </div>
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

export default UserPortal;
