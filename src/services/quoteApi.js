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

    const timestamp =
      new Date().getTime();

    const payload = {
      pickup: {
        coordinates: pickup,
        schedulePickupNow: false,
        scheduleDateAfter: 0,
        scheduleDateBefore: 0,
      },

      dropoffs: [
        {
          coordinates: dropoffs,
          scheduleDateAfter: 0,
          scheduleDateBefore: 0,
        },
      ],

      isScheduled: false,

      vehicleType: {
        id: vehicleId,
        options: [],
      },

      service: {
        id: serviceId,
        options: [],
      },

      customerId,
    };

    console.log(
      "QUOTE PAYLOAD:",
      payload
    );

    const response =
      await axios.post(
        `${API_BASE}/api/v1/customer/widget/calculate-price`,
        payload,
        {
          headers: {
            "x-captcha-token":
              captchaToken,

            "x-request-ts":
              timestamp,

            "Accept-Language":
              "en",

            "Content-Type":
              "application/json",
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
      "QUOTE ERROR:",
      error.response?.data || error
    );

    throw error;
  }
}
