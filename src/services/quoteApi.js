import axios from "axios";

import { API_BASE }
  from "../config/api";

import {
  getCaptchaToken,
} from "./captchaService";

export async function fetchQuote(
  payload
) {

  try {

    const captchaToken =
      await getCaptchaToken();

    console.log(
      "CAPTCHA:",
      captchaToken
    );

    const response =
      await axios.post(
        `${API_BASE}/api/quote/calculate`,
        payload,
        {
          headers: {

            "x-captcha-token":
              captchaToken,
          },
        }
      );

    console.log(
      "QUOTE RESPONSE:",
      response.data
    );

    return response.data;

  } catch (error) {

    console.error(
      "QUOTE API ERROR:",
      error.response?.data ||
      error
    );

    throw error;
  }
}
