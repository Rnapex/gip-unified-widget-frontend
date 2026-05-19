import {
  useState,
} from "react";

import axios
  from "axios";

const RECAPTCHA_KEY =
  "6Ld6MqomAAAAACj3-PD8-noxdlsK-zRs8gUD47Dx";

const ONRO_BASE =
  "https://rest.getitpicked.com";

export default function useQuote() {

  const [loading, setLoading] =
    useState(false);

  const [quote, setQuote] =
    useState(null);

  const [error, setError] =
    useState("");

  // =====================================
  // GET CAPTCHA TOKEN
  // =====================================

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

  // =====================================
  // GET QUOTE
  // =====================================

  async function getQuote(data) {

    try {

      setLoading(true);

      setError("");

      setQuote(null);

      console.log(
        "FRONTEND RECEIVED:"
      );

      console.log(data);

      // =====================================
      // CAPTCHA
      // =====================================

      const captcha =
        await getCaptchaToken();

      // =====================================
      // INDIVIDUAL
      // =====================================

      if (
        data.mode ===
        "individual"
      ) {

        const payload = {

          pickup: {

            coordinates:
              data.pickup,

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
                data.dropoff,

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
              data.vehicleId,

            options: [],
          },

          service: {

            id:
              data.serviceId,

            options: [],
          },

          customerId:
            data.customerId,
        };

        console.log(
          "INDIVIDUAL FINAL PAYLOAD:"
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

            `${ONRO_BASE}/api/v1/customer/widget/calculate-price`,

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
          "INDIVIDUAL RESPONSE:"
        );

        console.log(
          response.data
        );

        if (
          response.data?.code === 0
        ) {

          setQuote(
            response.data.data
          );

        } else {

          setError(

            response.data?.message ||

            "Quote failed"
          );
        }

        return;
      }

      // =====================================
      // BUSINESS
      // =====================================

      const payload = {

        pickup: {

          coordinates:
            data.pickup,

          completeAfter: 0,

          completeBefore: 0,
        },

        delivery: {

          coordinates:
            data.dropoff,

          completeAfter: 0,

          completeBefore: 0,
        },

        service: {

          id:
            data.serviceId,

          options: [],
        },

        customerId:
          data.customerId,
      };

      console.log(
        "BUSINESS FINAL PAYLOAD:"
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

          `${ONRO_BASE}/api/v1/customer/widget/pickup-delivery/calculate-price`,

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
        "BUSINESS RESPONSE:"
      );

      console.log(
        response.data
      );

      if (
        response.data?.code === 0
      ) {

        setQuote(
          response.data.data
        );

      } else {

        setError(

          response.data?.message ||

          "Quote failed"
        );
      }

    } catch (err) {

      console.error(
        "QUOTE ERROR:",
        err?.response?.data ||
        err
      );

      setError(

        err?.response?.data
          ?.message ||

        err.message ||

        "Failed to fetch quote"
      );

    } finally {

      setLoading(false);
    }
  }

  return {

    loading,

    quote,

    error,

    getQuote,

    setQuote,
  };
}
