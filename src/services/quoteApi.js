import axios from "axios";

const API_BASE =
  "http://localhost:5000";

export async function fetchQuote(
  payload
) {

  try {

    const response =
      await axios.post(
        `${API_BASE}/api/quote/calculate`,
        payload
      );

    return response.data;

  } catch (error) {

    console.error(
      "QUOTE API ERROR:",
      error
    );

    throw error;
  }
}