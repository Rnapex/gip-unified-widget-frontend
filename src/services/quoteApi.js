import axios from "axios";

import {
  API_BASE,
} from "../config/api";

import {
  getCaptchaToken,
} from "./captchaService";

export async function fetchQuote({

  mode,

  pickup,

  dropoff,

  dropoffs,

  vehicleId,

  serviceId,

  customerId,
}) {

  try {

    const captchaToken =
      await getCaptchaToken();

    let payload;

    // =========================
    // BUSINESS MODE
    // =========================

    if (
      mode === "business"
    ) {

      payload = {

        pickup: {

          coordinates: pickup,

          completeAfter: 0,

          completeBefore: 0,
        },

        delivery: {

          coordinates: dropoff,

          completeAfter: 0,

          completeBefore: 0,
        },

        service: {

          id: serviceId,

          options: [],
        },

        customerId,
      };

    } else {

      // =========================
      // INDIVIDUAL MODE
      // =========================

      payload = {

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
    }

    console.log(
      "REAL PAYLOAD:",
      payload
    );

    const response =
      await axios.post(

        `${API_BASE}/api/quote/calculate`,

        {

          mode,

          ...payload,

          captchaToken,
        }
      );

    console.log(
      "FINAL QUOTE:",
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
