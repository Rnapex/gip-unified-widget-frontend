import axios from "axios";

import { API_BASE }
  from "../config/api";

import {
  getCaptchaToken,
} from "./captchaService";

export async function fetchQuote({
  pickup,
  dropoffs,
  vehicleId,
  serviceId,
  customerId,
}) {

  try {

    const captchaToken =
      await getCaptchaToken();

    const payload = {

      pickup: {
        lat: pickup[1],
        lng: pickup[0],
      },

      dropoff: {
        lat: dropoffs[1],
        lng: dropoffs[0],
      },

      vehicleId,

      serviceId,

      customerId,

      captchaToken,
    };

    console.log(
      "QUOTE PAYLOAD:",
      payload
    );

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
      error.response?.data || error
    );

    throw error;
  }
}
