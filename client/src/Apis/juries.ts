import axios from "axios";

const API_URL = process.env.REACT_APP_BACK_URL;

export const getJuryTeams = async (juryId: number) => {
  try {
    const response = await axios.get(`${API_URL}/team/get-by-jury/${juryId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching jury teams:", error);
    throw error;
  }
};

export const submitEval = async (dto: any) => {
  try {
    const response = await axios.post(`${API_URL}/score/post-score`, dto);
    return response.data;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

export const getLeaderboard = async () => {
  try {
    const response = await axios.get(`${API_URL}/score/get-metrics`);
    return response.data;
  } catch (error) {
    console.error("Error getting Leaderboard", error);
    throw error;
  }
};

export const getLeaderboardFinal = async () => {
  try {
    const response = await axios.get(`${API_URL}/score/get-metrics-round2`);
    return response.data;
  } catch (error) {
    console.error("Error getting Leaderboard", error);
    throw error;
  }
};

export const getTeamEvaluatedbyJury = async (juryId:number) => {
  try {
    const response = await axios.get(`${API_URL}/score/get-teams-evaluated-by-jury/${juryId}`);
    return response.data;
  } catch (error) {
    console.error("Error getting Leaderboard", error);
    throw error;
  }
};