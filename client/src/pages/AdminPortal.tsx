import React, { useState, useEffect } from "react";
import {
  createEvent,
  deleteEventById,
  getAllEvents,
  updateEvent,
} from "../Apis/events";

interface Event {
  eventId: number;
  name: string;
  time: string;
  venue: string;
  description: string;
}

interface NewEvent {
  name: string;
  time: string;
  venue: string;
  description: string;
}

function AdminPortal() {
  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState<NewEvent>({
    name: "",
    time: "",
    venue: "",
    description: "",
  });
  const [editEvent, setEditEvent] = useState<Event | null>();
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);

  async function fetchData() {
    try {
      const fetchedEvents = await getAllEvents();
      setEvents(fetchedEvents);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function handleCreateEvent() {
    try {
      if (
        !newEvent.name ||
        !newEvent.description ||
        !newEvent.time ||
        !newEvent.venue
      ) {
        document.querySelectorAll(".input-validation").forEach((input) => {
          if (!(input as HTMLInputElement).value) {
            input.classList.add("border-red-500");
          } else {
            input.classList.remove("border-red-500");
          }
        });
        return;
      }

      const createdEvent = await createEvent(newEvent);
      setEvents([...events, createdEvent]);
      setNewEvent({
        name: "",
        time: "",
        venue: "",
        description: "",
      });
      setIsCreatingEvent(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleEditEvent(editorId: number) {
    try {
      await updateEvent({ editorId, ...editEvent });
      fetchData();
      setEditEvent(null);
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteEvent = async (eventId: number) => {
    try {
      await deleteEventById(eventId);
      setEvents(events.filter((event) => event.eventId !== eventId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 ">Admin Portal</h2>
      <button
        onClick={() => setIsCreatingEvent(true)}
        className="bg-[#186d67] text-white rounded px-3 py-1 hover:bg-[#183937] my-3"
      >
        Add New Event
      </button>
      {isCreatingEvent && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ">
          <div className="bg-[#1e1e1e] p-4 rounded shadow-md">
            <span
              className="absolute top-2 right-2 text-gray-600 cursor-pointer"
              onClick={() => setIsCreatingEvent(false)}
            >
              &times;
            </span>
            <h3 className="text-xl font-semibold mb-5 text-white">
              Add New Event
            </h3>
            <input
              type="text"
              placeholder="Event Name"
              value={newEvent.name}
              onChange={(e) =>
                setNewEvent({ ...newEvent, name: e.target.value })
              }
              className="border border-[#323434] rounded px-2 py-1 w-[80vw] mb-4 input-validation bg-[#323434]"
            />
            <input
              type="text"
              placeholder="Event Description"
              value={newEvent.description}
              onChange={(e) =>
                setNewEvent({ ...newEvent, description: e.target.value })
              }
              className="border border-[#323434] rounded px-2 py-1 w-[80vw] mb-4 input-validation bg-[#323434]"
            />
            <input
              type="text"
              placeholder="Event Date"
              value={newEvent.time}
              onChange={(e) =>
                setNewEvent({ ...newEvent, time: e.target.value })
              }
              className="border border-[#323434] rounded px-2 py-1 w-[80vw] mb-4 input-validation bg-[#323434]"
            />
            <input
              type="text"
              placeholder="Event Location"
              value={newEvent.venue}
              onChange={(e) =>
                setNewEvent({ ...newEvent, venue: e.target.value })
              }
              className="border border-[#323434] rounded px-2 py-1 w-[80vw] mb-4 input-validation bg-[#323434]"
            />
            <button
              onClick={handleCreateEvent}
              className="bg-[#186d67] text-white rounded px-3 py-1 hover:bg-[#1e4b48]"
            >
              Save
            </button>
            <button
              onClick={() => setIsCreatingEvent(false)}
              className="bg-gray-400 text-black rounded px-3 py-1 ml-2 hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <div>
        <h3 className="text-xl font-semibold my-3">Events List</h3>
        <div className="flex flex-col gap-3 items-center">
          {events.map((event) => (
            <div
              key={event.eventId}
              className="shadow-lg w-screen hover:scale-105 duration-300 bg-[#1e1e1e] border border-[#323434] p-4"
            >
              <h4 className="text-2xl font-semibold mb-3">{event.name}</h4>
              <p>
                <span className=" font-semibold text-lg">
                  What's Happening:{" "}
                </span>
                {event.description}
              </p>
              <p>
                <span className=" font-semibold text-lg">When: </span>
                {event.time}
              </p>
              <p>
                <span className=" font-semibold text-lg">Where: </span>
                {event.venue}
              </p>
              <div className="mt-2">
                <button
                  onClick={() => setEditEvent(event)}
                  className="bg-[#186d67] text-white rounded px-2 py-1 ml-2 hover:bg-[#1e4b48]"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteEvent(event.eventId)}
                  className="bg-red-500 text-white rounded px-2 py-1 ml-2 hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {editEvent && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ">
        <div className="bg-[#1e1e1e] p-4 rounded shadow-md">
            <span
              className="absolute top-2 right-2 text-gray-600 cursor-pointer"
              onClick={() => setEditEvent(null)}
            >
              &times;
            </span>
            <h3 className="text-xl font-semibold mb-2 text-white">Edit Event</h3>
            <input
              type="text"
              placeholder="Event Name"
              value={editEvent.name}
              onChange={(e) =>
                setEditEvent({ ...editEvent, name: e.target.value })
              }
              className="border border-[#323434] rounded px-2 py-1 w-[80vw] mb-4 input-validation bg-[#323434]"
            />
            <input
              type="text"
              placeholder="Event Description"
              value={editEvent.description}
              onChange={(e) =>
                setEditEvent({ ...editEvent, description: e.target.value })
              }
              className="border border-[#323434] rounded px-2 py-1 w-[80vw] mb-4 input-validation bg-[#323434]"
            />
            <input
              type="text"
              placeholder="Event Date"
              value={editEvent.time}
              onChange={(e) =>
                setEditEvent({ ...editEvent, time: e.target.value })
              }
              className="border border-[#323434] rounded px-2 py-1 w-[80vw] mb-4 input-validation bg-[#323434]"
            />
            <input
              type="text"
              placeholder="Event Location"
              value={editEvent.venue}
              onChange={(e) =>
                setEditEvent({ ...editEvent, venue: e.target.value })
              }
              className="border border-[#323434] rounded px-2 py-1 w-[80vw] mb-4 input-validation bg-[#323434]"
            />
            <button
              onClick={() => handleEditEvent(editEvent.eventId)}
              className="bg-[#186d67] text-white rounded px-3 py-1 hover:bg-[#1e4b48]"
            >
              Save
            </button>
            <button
              onClick={() => setEditEvent(null)}
              className="bg-gray-400 text-black rounded px-3 py-1 ml-2 hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPortal;
