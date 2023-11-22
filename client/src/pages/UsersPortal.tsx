import React, { useState, useEffect } from "react";
import { getAllEvents, getEventById } from "../Apis/events";
import {
  getAllRegistrationsByUserId,
  updateRegistration,
} from "../Apis/registrations";

interface Event {
  eventId: number;
  name: string;
  time: string;
  venue: string;
  description: string;
}

function UserPortal() {
  const [registeredEvents, setRegisteredEvents] = useState<Event[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const userId = localStorage.getItem("userIdGDSC");

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

  async function handleRegisterForEvent(eventId: number) {
    try {
      await updateRegistration(userId, eventId);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }

  const isEventRegistered = (eventId: number) => {
    return registeredEvents.some((event) => event.eventId === eventId);
  };

  return (
    <div className="min-h-full p-4">
      <h2 className="text-2xl font-bold mb-4">User Portal</h2>
      <div>
        <h3 className="text-xl font-semibold mb-4">Available Events</h3>
        <div className="flex flex-col gap-3 items-center">
          {events.map((event) => (
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
                className="bg-[#186d67] text-white rounded px-3 py-1 mt-2 hover:bg-[#183937] "
              >
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
