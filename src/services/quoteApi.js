import axios from "axios";

import {
  API_BASE,
} from "../config/api";

export async function fetchQuote(
  payload
) {
  try {

    const response =
      await axios.post(
        `${API_BASE}/api/quote/calculate`,
        payload
      );

    console.log(
      "QUOTE RESPONSE:",
      response.data
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
