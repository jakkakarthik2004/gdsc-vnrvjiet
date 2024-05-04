import axios from "axios";

const API_URL = process.env.REACT_APP_BACK_URL;

interface UpdateQuestionDto {
  answer?: string;
  question?: string;
  answered?: number;
}

export const createQuestion = async (questionDto: any) => {
  try {
    const response = await axios.post(
      `${API_URL}/questions/create`,
      questionDto
    );
    return response.data;
  } catch (error) {
    console.error("Error creating question:", error);
    throw error;
  }
};

export const getAllQuestions = async () => {
  try {
    const response = await axios.get(`${API_URL}/questions/get-Questions`);
    return response.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};

export const getAnsweredQuestions = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/questions/get-answered-questions`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching answered questions:", error);
    throw error;
  }
};

export const getUnAnsweredQuestions = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/questions/get-unanswered-questions`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching answered questions:", error);
    throw error;
  }
};

export const getQuestionById = async (questionId: any) => {
  try {
    const response = await axios.get(
      `${API_URL}/questions/get-QuestionId/${questionId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching question by ID:", error);
    throw error;
  }
};

export const updateQuestion = async (
  questionId: any,
  payload: UpdateQuestionDto
) => {
  try {
    const response = await axios.put(
      `${API_URL}/questions/update-answer/${questionId}`,
      { payload }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating answer:", error);
    throw error;
  }
};

export const updateApproval = async (questionId: any) => {
  try {
    console.log(questionId);
    const response = await axios.put(
      `${API_URL}/questions/update-approval/${questionId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error updating question approval:", error);
    throw error;
  }
};

export const deleteQuestionById = async (questionId: any) => {
  try {
    const response = await axios.delete(
      `${API_URL}/questions/delete-by-id/${questionId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting question by ID:", error);
    throw error;
  }
};
