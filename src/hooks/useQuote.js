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

  async function getCaptchaToken(
    actionName
  ) {

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
          new Date().getTime();

        const action =
          `custom_customer_${actionName}_${ts}`;

        console.log(
          "CAPTCHA ACTION:"
        );

        console.log(
          action
        );

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
        "===================================="
      );

      console.log(
        "FRONTEND RECEIVED:"
      );

      console.log(
        JSON.stringify(
          data,
          null,
          2
        )
      );

      console.log(
        "===================================="
      );

      // =====================================
      // INDIVIDUAL MODE
      // =====================================

      if (
        data.mode ===
        "individual"
      ) {

        const captcha =
          await getCaptchaToken(
            "calculate_ondemand_price"
          );

        const payload = {

          pickup: {

            coordinates: [
              Number(
                data.pickup[0]
              ),

              Number(
                data.pickup[1]
              ),
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
                Number(
                  data.dropoff[0]
                ),

                Number(
                  data.dropoff[1]
                ),
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
      // BUSINESS MODE
      // =====================================

      const captcha =
        await getCaptchaToken(
          "calculate_pickup_delivery_price"
        );

      const payload = {

        pickup: {

          coordinates: [
            Number(
              data.pickup[0]
            ),

            Number(
              data.pickup[1]
            ),
          ],

          completeAfter: 0,

          completeBefore: 0,
        },

        delivery: {

          coordinates: [
            Number(
              data.dropoff[0]
            ),

            Number(
              data.dropoff[1]
            ),
          ],

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
        "QUOTE ERROR:"
      );

      console.error(
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
