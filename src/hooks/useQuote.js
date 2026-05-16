import {
  useState,
} from "react";

import {
  fetchQuote,
} from "../services/quoteApi";

export default function useQuote() {

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    quote,
    setQuote,
  ] = useState(null);

  const [
    error,
    setError,
  ] = useState(null);

  async function getQuote(
    payload
  ) {

    try {

      setLoading(true);

      setError(null);

      const result =
        await fetchQuote(
          payload
        );

      console.log(
        "FINAL QUOTE:",
        result
      );

      setQuote(result);

    } catch (err) {

      console.error(err);

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
