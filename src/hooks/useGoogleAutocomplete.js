import { useEffect, useState } from "react";

const GOOGLE_SCRIPT_ID =
  "gip-google-maps-script";

export default function useGoogleAutocomplete() {
  const [isLoaded, setIsLoaded] =
    useState(false);

  useEffect(() => {
    if (
      window.google &&
      window.google.maps &&
      window.google.maps.places
    ) {
      setIsLoaded(true);
      return;
    }

    const existingScript =
      document.getElementById(
        GOOGLE_SCRIPT_ID
      );

    if (existingScript) {
      existingScript.onload = () => {
        setIsLoaded(true);
      };

      return;
    }

    const script =
      document.createElement("script");

    script.id = GOOGLE_SCRIPT_ID;

    script.src =
      `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_API_KEY}&libraries=places`;

    script.async = true;

    script.defer = true;

    script.onload = () => {
      console.log(
        "Google Places Loaded"
      );

      setIsLoaded(true);
    };

    script.onerror = () => {
      console.error(
        "Google Maps failed to load"
      );
    };

    document.body.appendChild(script);
  }, []);

  return {
    isLoaded,
  };
}