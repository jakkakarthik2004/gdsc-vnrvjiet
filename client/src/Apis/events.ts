import axios from "axios";

const API_URL = "http://localhost:8000";

export const createEvent = async (eventDto: any) => {
  console.log(eventDto);
  try {
    const response = await axios.post(`${API_URL}/Events/create`, eventDto);
    return response.data;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

export const getEventById = async (eventId: any) => {
  try {
    const response = await axios.get(
      `${API_URL}/Events/get-eventId/${eventId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching event data by ID:", error);
    throw error;
  }
};

export const getAllEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/Events/get-events`);
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

export const deleteEventById = async (eventId: any) => {
  try {
    const response = await axios.delete(
      `${API_URL}/Events/delete-by-id/${eventId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting event by ID:", error);
    throw error;
  }
};

export const updateEvent = async (eventDto: any) => {
  try {
    const response = await axios.post(`${API_URL}/Events/update`, eventDto);
    return response.data;
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};
