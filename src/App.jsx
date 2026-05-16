import {
  useEffect,
  useState,
} from "react";

import FullscreenMap
  from "./components/layout/FullscreenMap";

import FloatingPanel
  from "./components/layout/FloatingPanel";

import QuoteResultCard
  from "./components/quote/QuoteResultCard";

import useQuote
  from "./hooks/useQuote";

import {
  MODES,
} from "./utils/constants";

function App() {

  const [mode, setMode] =
    useState(
      MODES.individual
    );

  const [pickup, setPickup] =
    useState(null);

  const [dropoff, setDropoff] =
    useState(null);

  const [pickupZone, setPickupZone] =
    useState(null);

  const [dropoffZone, setDropoffZone] =
    useState(null);

  const [
    selectedService,
    setSelectedService,
  ] = useState(null);

  const [
    selectedVehicle,
    setSelectedVehicle,
  ] = useState(null);

  const {
    loading,
    quote,
    error,
    getQuote,
    setQuote,
  } = useQuote();

  // RESET ON MODE CHANGE

  useEffect(() => {

    setSelectedService(
      null
    );

    setSelectedVehicle(
      null
    );

    setQuote(
      null
    );

  }, [mode]);

  // RESET QUOTE WHEN DATA CHANGES

  useEffect(() => {

    setQuote(
      null
    );

  }, [

    pickup,

    dropoff,

    selectedService,

    selectedVehicle,
  ]);

  return (

    <div className="app-container">

      <FullscreenMap
        pickup={pickup}

        dropoff={dropoff}

        pickupZone={
          pickupZone
        }

        dropoffZone={
          dropoffZone
        }
      />

      <FloatingPanel
        mode={mode}
        setMode={setMode}

        pickup={pickup}
        setPickup={setPickup}

        dropoff={dropoff}
        setDropoff={setDropoff}

        pickupZone={
          pickupZone
        }

        setPickupZone={
          setPickupZone
        }

        dropoffZone={
          dropoffZone
        }

        setDropoffZone={
          setDropoffZone
        }

        selectedService={
          selectedService
        }

        setSelectedService={
          setSelectedService
        }

        selectedVehicle={
          selectedVehicle
        }

        setSelectedVehicle={
          setSelectedVehicle
        }

        loading={loading}

        quote={quote}

        error={error}

        getQuote={getQuote}
      />

      {quote && (

        <QuoteResultCard
          quote={quote}
        />

      )}

    </div>
  );
}

export default App;
