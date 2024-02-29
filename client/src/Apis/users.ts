import axios from "axios";

const API_URL = process.env.REACT_APP_BACK_URL;

export const createUser = async (userDto: any) => {
  try {
    const response = await axios.post(`${API_URL}/users/create`, userDto);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const getUserByMail = async (payload: { email: any; password: any }) => {
  try {
    const { email, password } = payload;
    const response = await axios.get(`${API_URL}/users/get-user-by-mail`, {
      params: { email, password },
    });
    return response.data;
  } catch (error) {
    console.error("Error getting user by mail:", error);
    throw error;
  }
};

export const getUserById = async (userId: any) => {
  try {
    const response = await axios.get(`${API_URL}/users/get-user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data by ID:", error);
    throw error;
  }
};

export const isUserAdmin = async (userId: any) => {
  try {
    const response = await axios.get(`${API_URL}/users/is-admin/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error checking if user is an admin:", error);
    throw error;
  }
};

export const deleteUserById = async (userId: any) => {
  try {
    const response = await axios.delete(
      `${API_URL}/users/delete-by-id/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting user by ID:", error);
    throw error;
  }
};
