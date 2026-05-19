import {
  useState,
} from "react";

import axios
  from "axios";

const API_BASE =
  "https://gip-unified-widget-production.up.railway.app";

export default function useQuote() {

  const [loading, setLoading] =
    useState(false);

  const [quote, setQuote] =
    useState(null);

  const [error, setError] =
    useState("");

  async function getCaptchaToken() {

    return new Promise(
      (resolve, reject) => {

        if (
          !window.grecaptcha ||
          !window.grecaptcha.enterprise
        ) {

          reject(
            "Recaptcha not loaded"
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

                  "6Ld6MqomAAAAACj3-PD8-noxdlsK-zRs8gUD47Dx",

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

        console.log(payload);

        const response =
          await axios.post(

            `${API_BASE}/api/quote/calculate`,

            {

              endpoint:
                "ondemand",

              payload,

              captchaToken:
                captcha.token,

              timestamp:
                captcha.ts,
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

      console.log(payload);

      const response =
        await axios.post(

          `${API_BASE}/api/quote/calculate`,

          {

            endpoint:
              "pickup-delivery",

            payload,

            captchaToken:
              captcha.token,

            timestamp:
              captcha.ts,
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
