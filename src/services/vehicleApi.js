import axios from "axios";

import {
  getCaptchaToken,
} from "./captchaService";

export async function fetchVehicles({
  serviceId,
  customerId,
}) {

  try {

    const captchaToken =
      await getCaptchaToken();

    const response =
      await axios.get(
        `${API_BASE}/api/widget/vehicles`,
        {
          params: {
            serviceId,
            customerId,
          },

          headers: {
            "x-captcha-token":
              captchaToken,
          },
        }
      );

    console.log(
      "VEHICLES:",
      response.data
    );

    return (
      response.data || []
    );

  } catch (error) {

    console.error(
      "Failed to fetch vehicles",
      error
    );

    return [];
  }
}
