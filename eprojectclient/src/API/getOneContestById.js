import axios from "axios";

export const getOneContestById = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:5190/api/Student/GetOneContestById/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching contest:", error);
    throw error;
  }
};
