import axios from "axios";

import { API_BASE }
  from "../config/api";

import {
  getCaptchaToken,
} from "./captchaService";

export async function fetchQuote({

  pickup,

  dropoff,

  vehicleId,

  serviceId,

  customerId,
}) {

  try {

    const captchaData =
      await getCaptchaToken(
        "calculate_ondemand_price"
      );

    const captchaToken =
      captchaData?.token;

    const timestamp =
      captchaData?.timestamp;

    const payload = {

      pickup: {

        coordinates: [
          pickup.lng,
          pickup.lat,
        ],

        schedulePickupNow:
          false,

        scheduleDateAfter:
          0,

        scheduleDateBefore:
          0,
      },

      dropoffs: [
        {

          coordinates: [
            dropoff.lng,
            dropoff.lat,
          ],

          scheduleDateAfter:
            0,

          scheduleDateBefore:
            0,
        },
      ],

      isScheduled:
        false,

      vehicleType: {

        id:
          vehicleId,

        options: [],
      },

      service: {

        id:
          serviceId,

        options: [],
      },

      customerId,
    };

    console.log(
      "REAL PAYLOAD:",
      payload
    );

    const response =
      await axios.post(

        `${API_BASE}/api/quote/calculate`,

        {

          payload,

          captchaToken,

          timestamp,
        }
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
