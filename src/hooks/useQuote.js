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

  async function getQuote(data) {

    try {

      setLoading(true);

      setError("");

      setQuote(null);

      // =====================================
      // BUSINESS MODE
      // =====================================

      if (
        data.mode === "business"
      ) {

        const payload = {

          pickup: {

            coordinates: data.pickup,

            completeAfter: 0,

            completeBefore: 0,
          },

          delivery: {

            coordinates: data.dropoff,

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
          "BUSINESS REAL PAYLOAD:",
          payload
        );

        const response =
          await axios.post(

            `${API_BASE}/api/quote/calculate`,

            payload
          );

        console.log(
          "BUSINESS FINAL QUOTE:",
          response.data
        );

        setQuote(
          response.data.data
        );

        return;
      }

      // =====================================
      // INDIVIDUAL MODE
      // =====================================

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
        "INDIVIDUAL REAL PAYLOAD:",
        payload
      );

      const response =
        await axios.post(

          `${API_BASE}/api/quote/calculate`,

          payload
        );

      console.log(
        "INDIVIDUAL FINAL QUOTE:",
        response.data
      );

      setQuote(
        response.data.data
      );

    } catch (err) {

      console.error(
        "QUOTE API ERROR:",
        err?.response?.data ||
        err
      );

      setError(

        err?.response?.data
          ?.message ||

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
