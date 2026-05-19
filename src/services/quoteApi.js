import axios from "axios";

const RECAPTCHA_KEY =
  "6Ld6MqomAAAAACj3-PD8-noxdlsK-zRs8gUD47Dx";

const ONRO_BASE =
  "https://rest.getitpicked.com";

async function getCaptchaToken() {

  return new Promise(
    (resolve, reject) => {

      if (
        !window.grecaptcha ||
        !window.grecaptcha.enterprise
      ) {

        reject(
          new Error(
            "Recaptcha not loaded"
          )
        );

        return;
      }

      const ts =
        Date.now();

      const action =
        `custom_customer_quote_${ts}`;

      window.grecaptcha.enterprise.ready(
        async () => {

          try {

            const token =
              await window.grecaptcha.enterprise.execute(

                RECAPTCHA_KEY,

                {
                  action,
                }
              );

            resolve({
              token,
              ts,
            });

          } catch (err) {

            reject(err);
          }
        }
      );
    }
  );
}

export async function fetchQuote({

  mode,

  pickup,

  dropoff,

  vehicleId,

  serviceId,

  customerId,
}) {

  try {

    const captcha =
      await getCaptchaToken();

    let payload;

    let endpoint;

    // =====================================
    // BUSINESS
    // =====================================

    if (
      mode === "business"
    ) {

      endpoint =
        "/api/v1/customer/widget/pickup-delivery/calculate-price";

      payload = {

        pickup: {

          coordinates:
            pickup,

          completeAfter: 0,

          completeBefore: 0,
        },

        delivery: {

          coordinates:
            dropoff,

          completeAfter: 0,

          completeBefore: 0,
        },

        service: {

          id:
            serviceId,

          options: [],
        },

        customerId,
      };

    } else {

      // =====================================
      // INDIVIDUAL
      // =====================================

      endpoint =
        "/api/v1/customer/widget/calculate-price";

      payload = {

        pickup: {

          coordinates:
            pickup,

          schedulePickupNow:
            false,

          scheduleDateAfter:
            0,

          scheduleDateBefore:
            0,
        },

        dropoffs: [

          {

            coordinates:
              dropoff,

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
    }

    console.log(
      "REAL PAYLOAD:"
    );

    console.log(
      JSON.stringify(
        payload,
        null,
        2
      )
    );

    const response =
      await axios.post(

        `${ONRO_BASE}${endpoint}`,

        payload,

        {

          headers: {

            "x-captcha-token":
              captcha.token,

            "x-request-ts":
              captcha.ts,

            "Accept-Language":
              "en",

            "Content-Type":
              "application/json",
          },
        }
      );

    console.log(
      "FINAL QUOTE:"
    );

    console.log(
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
