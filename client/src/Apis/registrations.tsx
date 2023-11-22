import axios from "axios";

const API_URL = "http://localhost:8000";

export const updateRegistration = async (userId: any, eventId: any) => {
  try {
    await axios.post(`${API_URL}/registrations/update/${userId}/${eventId}`);
  } catch (error) {
    console.error("Error updating registration:", error);
    throw error;
  }
};

export const getAllRegistrationsByUserId = async (userId: any) => {
  try {
    const response = await axios.get(`${API_URL}/registrations/get-all-by-user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error getting registrations by userId:", error);
    throw error;
  }
};

export const getAllRegistrationsByEventId = async (eventId: any) => {
  try {
    const response = await axios.get(
      `${API_URL}/registrations/get-all-by-event/${eventId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting registrations by eventId:", error);
    throw error;
  }
};
