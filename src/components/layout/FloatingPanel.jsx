// src/components/layout/FloatingPanel.jsx

import {
  useEffect,
} from "react";

import useGoogleAutocomplete
  from "../../hooks/useGoogleAutocomplete";

import useZones
  from "../../hooks/useZones";

import useServices
  from "../../hooks/useServices";

import GoogleAutocompleteInput
  from "../address/GoogleAutocompleteInput";

import ServiceSelector
  from "../services/ServiceSelector";

import {
  detectZone,
} from "../../utils/polygonUtils";

import ModeToggle
  from "../mode/ModeToggle";

import useVehicles
  from "../../hooks/useVehicles";

import VehicleSelector
  from "../vehicles/VehicleSelector";

import {
  MODES,
  CUSTOMER_IDS,
} from "../../utils/constants";

import QuoteButton
  from "../quote/QuoteButton";

function FloatingPanel({

  mode,
  setMode,

  pickup,
  setPickup,

  dropoff,
  setDropoff,

  pickupZone,
  setPickupZone,

  dropoffZone,
  setDropoffZone,

  selectedService,
  setSelectedService,

  selectedVehicle,
  setSelectedVehicle,

  loading,
  error,
  getQuote,

}) {

  const { isLoaded } =
    useGoogleAutocomplete();

  const { zones } =
    useZones();

  const { services } =
    useServices();

  // =====================================
  // DETECT PICKUP ZONE
  // =====================================

  useEffect(() => {

    const zone =
      detectZone(
        pickup,
        zones
      );

    setPickupZone(zone);

  }, [
    pickup,
    zones,
    setPickupZone,
  ]);

  // =====================================
  // DETECT DROPOFF ZONE
  // =====================================

  useEffect(() => {

    const zone =
      detectZone(
        dropoff,
        zones
      );

    setDropoffZone(zone);

  }, [
    dropoff,
    zones,
    setDropoffZone,
  ]);

  // =====================================
  // CUSTOMER ID
  // =====================================

  const customerId =

    mode === MODES.individual

      ? CUSTOMER_IDS.individual

      : CUSTOMER_IDS.business;

  // =====================================
  // VEHICLES
  // =====================================

  const {
    vehicles,
  } = useVehicles({

    serviceId:
      selectedService?.id,

    customerId,
  });

  // =====================================
  // GET QUOTE
  // =====================================

  async function handleGetQuote() {

    try {

      if (
        !pickup ||
        !dropoff ||
        !selectedService
      ) {

        alert(
          "Please complete all fields"
        );

        return;
      }

      console.log(
        "SELECTED SERVICE:",
        selectedService
      );

      console.log(
        "SELECTED VEHICLE:",
        selectedVehicle
      );

      console.log(
        "PICKUP:",
        pickup
      );

      console.log(
        "DROPOFF:",
        dropoff
      );

      // =====================================
      // BUSINESS MODE
      // =====================================

      if (
        mode === MODES.business
      ) {

        const businessPayload = {

          mode,

          pickup: [
            Number(
              pickup.lng
            ),
            Number(
              pickup.lat
            ),
          ],

          dropoff: [
            Number(
              dropoff.lng
            ),
            Number(
              dropoff.lat
            ),
          ],

          serviceId:
            selectedService.id,

          customerId,
        };

        console.log(
          "BUSINESS PAYLOAD:",
          businessPayload
        );

        await getQuote(
          businessPayload
        );

        return;
      }

      // =====================================
      // INDIVIDUAL MODE
      // =====================================

      if (
        !selectedVehicle
      ) {

        alert(
          "Please select vehicle"
        );

        return;
      }

      const individualPayload = {

        mode,

        pickup: [
          Number(
            pickup.lng
          ),
          Number(
            pickup.lat
          ),
        ],

        dropoffs: [
  [
    Number(dropoff.lng),
    Number(dropoff.lat),
  ],
],

        vehicleId:
          selectedVehicle.id,

        serviceId:
          selectedService.id,

        customerId,
      };

      console.log(
        "INDIVIDUAL PAYLOAD:",
        individualPayload
      );

      await getQuote(
        individualPayload
      );

    } catch (err) {

      console.error(
        "QUOTE ERROR:",
        err
      );
    }
  }

  return (

    <div className="floating-panel">

      <div className="panel-header">

        <h1>
          Get It Picked
        </h1>

        <p>
          Unified Quote System
        </p>

      </div>

      <div className="panel-body">

        {!isLoaded ? (

          <div className="placeholder-block">

            Loading Google Places...

          </div>

        ) : (

          <>

            <ModeToggle
              mode={mode}
              setMode={setMode}
            />

            <ServiceSelector
              services={services}
              mode={mode}
              selectedService={
                selectedService
              }
              setSelectedService={
                setSelectedService
              }
            />

            {mode ===
              MODES.individual && (

              <VehicleSelector
                vehicles={vehicles}
                selectedVehicle={
                  selectedVehicle
                }
                setSelectedVehicle={
                  setSelectedVehicle
                }
              />
            )}

            <GoogleAutocompleteInput
              placeholder="Enter pickup address"
              onPlaceSelect={
                setPickup
              }
            />

            <GoogleAutocompleteInput
              placeholder="Enter dropoff address"
              onPlaceSelect={
                setDropoff
              }
            />

            <div className="zone-container">

              <div className="zone-badge pickup-zone">

                Pickup Zone:
                <br />

                <strong>
                  {
                    pickupZone?.name ||
                    "No zone detected"
                  }
                </strong>

              </div>

              <div className="zone-badge dropoff-zone">

                Dropoff Zone:
                <br />

                <strong>
                  {
                    dropoffZone?.name ||
                    "No zone detected"
                  }
                </strong>

              </div>

            </div>

            <QuoteButton
              onClick={handleGetQuote}
              loading={loading}
              disabled={

                !pickup ||

                !dropoff ||

                !selectedService ||

                (
                  mode ===
                    MODES.individual &&

                  !selectedVehicle
                )
              }
            />

            {error && (

              <div
                className="
                  quote-error
                "
              >
                ⚠ {error}
              </div>
            )}

          </>
        )}

      </div>

    </div>
  );
}

export default FloatingPanel;
