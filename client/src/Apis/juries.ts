import axios from "axios";

const API_URL = process.env.REACT_APP_BACK_URL;

export const submitEval = async (dto: any) => {
  try {
    const response = await axios.post(`${API_URL}/jury/create`, dto);
    return response.data;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

export const getLeaderboard = async () => {
  try {
    const response = await axios.get(`${API_URL}/jury/get-metrics`);
    return response.data;
  } catch (error) {
    console.error("Error getting Leaderboard", error);
    throw error;
  }
};
