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
    const response = await axios.post(`${API_URL}/users/login`, {
      email,
      password,
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

export const forgotPw = async (email: any) => {
  try {
    const response = await axios.post(`${API_URL}/users/forgot-password`, {
      data: { email },
    });
    return response.data;
  } catch (error) {
    console.error("Error sending otp:", error);
    throw error;
  }
};

export const verifypw = async (otp: any, email: any) => {
  try {
    const response = await axios.post(`${API_URL}/users/verify-otp`, {
      data: { otp, email },
    });
    return response.data;
  } catch (error) {
    console.error("Error verifying otp:", error);
    throw error;
  }
};

export const resetPw = async (
  password: string,
  confirmPassword: string,
  email: string
) => {
  try {
    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    const response = await axios.post(`${API_URL}/users/reset-password`, {
      password,
      confirmPassword,
      email,
    });

    return response.data;
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
};
