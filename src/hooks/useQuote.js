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

      console.log(
        "===================================="
      );

      console.log(
        "FRONTEND RECEIVED DATA:"
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
      // VALIDATIONS
      // =====================================

      if (
        !data.pickup ||
        !Array.isArray(
          data.pickup
        ) ||
        data.pickup.length !== 2
      ) {

        throw new Error(
          "Invalid pickup coordinates from frontend"
        );
      }

      if (
        !data.dropoff ||
        !Array.isArray(
          data.dropoff
        ) ||
        data.dropoff.length !== 2
      ) {

        throw new Error(
          "Invalid dropoff coordinates from frontend"
        );
      }

      // =====================================
      // SEND RAW DATA TO BACKEND
      // BACKEND BUILDS FINAL PAYLOAD
      // =====================================

      const backendPayload = {

        mode:
          data.mode,

        pickup: [

          Number(
            data.pickup[0]
          ),

          Number(
            data.pickup[1]
          ),
        ],

        dropoff: [

          Number(
            data.dropoff[0]
          ),

          Number(
            data.dropoff[1]
          ),
        ],

        vehicleId:
          data.vehicleId,

        serviceId:
          data.serviceId,

        customerId:
          data.customerId,
      };

      console.log(
        "FRONTEND FINAL REQUEST:"
      );

      console.log(
        JSON.stringify(
          backendPayload,
          null,
          2
        )
      );

      console.log(
        "===================================="
      );

      const response =
        await axios.post(

          `${API_BASE}/api/quote/calculate`,

          backendPayload
        );

      console.log(
        "FINAL QUOTE RESPONSE:"
      );

      console.log(
        response.data
      );

      // =====================================
      // SUCCESS
      // =====================================

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
        "QUOTE API ERROR:",
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
