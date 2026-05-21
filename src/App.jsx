// src/App.jsx

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

import GuestCheckoutForm
  from "./components/checkout/GuestCheckoutForm";

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

  const [
    showGuestForm,
    setShowGuestForm,
  ] = useState(false);

  const {
    loading,
    quote,
    error,
    getQuote,
    setQuote,
  } = useQuote();

  // =====================================
  // RESET WHEN MODE CHANGES
  // =====================================

  useEffect(() => {

    setSelectedService(null);

    setSelectedVehicle(null);

    setQuote(null);

    setShowGuestForm(false);

  }, [
    mode,
    setQuote,
  ]);

  // =====================================
  // RESET QUOTE WHEN ADDRESS CHANGES
  // =====================================

  useEffect(() => {

    if (quote) {

      setQuote(null);

      setShowGuestForm(false);
    }

  }, [
    pickup,
    dropoff,
  ]);

  return (

    <div className="app-container">

      <FullscreenMap
        pickup={pickup}
        dropoff={dropoff}
        pickupZone={pickupZone}
        dropoffZone={dropoffZone}
      />

      <div className="mobile-ui-stack">

        <FloatingPanel

          mode={mode}
          setMode={setMode}

          pickup={pickup}
          setPickup={setPickup}

          dropoff={dropoff}
          setDropoff={setDropoff}

          pickupZone={pickupZone}
          setPickupZone={setPickupZone}

          dropoffZone={dropoffZone}
          setDropoffZone={setDropoffZone}

          selectedService={selectedService}
          setSelectedService={setSelectedService}

          selectedVehicle={selectedVehicle}
          setSelectedVehicle={setSelectedVehicle}

          loading={loading}
          error={error}

          showGuestForm={showGuestForm}
          
          getQuote={getQuote}
        />

        {/* =====================================
            QUOTE CARD
        ===================================== */}

        {quote?.price != null && (

          <QuoteResultCard

            quote={quote}

            onGuestCheckout={() =>
              setShowGuestForm(true)
            }

          />

        )}

        {/* =====================================
            GUEST FORM
        ===================================== */}

        {showGuestForm && (

          <GuestCheckoutForm

            quote={quote}

            pickup={pickup}

            dropoff={dropoff}

            selectedService={
              selectedService
            }

            selectedVehicle={
              selectedVehicle
            }

          />

        )}

      </div>

    </div>
  );
}

export default App;
