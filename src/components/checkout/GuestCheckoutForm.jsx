import {
  useState,
} from "react";

import {
  createGuestCheckoutSession,
} from "../../services/guestCheckoutApi";

function GuestCheckoutForm({

  quote,

  pickup,

  dropoff,

  selectedService,

  selectedVehicle,

}) {

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    pickupName,
    setPickupName,
  ] = useState("");

  const [
    pickupPhone,
    setPickupPhone,
  ] = useState("");

  const [
    pickupEmail,
    setPickupEmail,
  ] = useState("");

  const [
    dropoffName,
    setDropoffName,
  ] = useState("");

  const [
    dropoffPhone,
    setDropoffPhone,
  ] = useState("");

  const [
    dropoffEmail,
    setDropoffEmail,
  ] = useState("");

  const [
    notes,
    setNotes,
  ] = useState("");

  async function handleProceed() {

    try {

      setLoading(true);

      // =====================================
      // BUILD REAL GIP PAYLOAD
      // =====================================

      const payload = {

        customerId:
          "JQnJ3wq8QbKj6f7_WyfDo",

        pickup: {

          address:
            pickup?.address,

          coordinates: [
            pickup?.lng,
            pickup?.lat,
          ],

          fullName:
            pickupName,

          phone:
            pickupPhone,

          email:
            pickupEmail,

          placeId: "",

          customerDescription:
            notes,

          schedulePickupNow:
            true,

          scheduleDateAfter: 0,

          scheduleDateBefore: 0,
        },

        dropoffs: [
          {

            address:
              dropoff?.address,

            coordinates: [
              dropoff?.lng,
              dropoff?.lat,
            ],

            fullName:
              dropoffName,

            phone:
              dropoffPhone,

            email:
              dropoffEmail,

            placeId: "",

            scheduleDateAfter: 0,

            scheduleDateBefore: 0,
          },
        ],

        service: {

          id:
            selectedService?.id,

          options: [],
        },

        vehicleType: {

          id:
            selectedVehicle?.id,

          options: [],
        },

        paymentMethod:
          "Wallet",

        paymentSide:
          "Sender",

        isScheduled:
          false,

        codAmount: 0,

        promoCode: "",

        uid:
          `guest_${Date.now()}`,

        referenceId:
          `WEB_${Date.now()}`,
      };

      // =====================================
      // CREATE STRIPE SESSION
      // =====================================

      const session =
        await createGuestCheckoutSession({

          amount:
            quote?.price,

          orderType:
            "ondemand",

          payload,

          guestData: {

            pickupName,

            pickupPhone,

            pickupEmail,

            dropoffName,

            dropoffPhone,

            dropoffEmail,

            notes,
          },
        });

      // =====================================
      // REDIRECT TO STRIPE
      // =====================================

      window.location.href =
        session.checkoutUrl;

    } catch (err) {

      console.error(err);

      alert(
        err.message
      );

    } finally {

      setLoading(false);
    }
  }

  return (

    <div className="guest-checkout-card">

      <div className="guest-checkout-header">

        <h2>
          Guest Checkout
        </h2>

        <p>
          Enter pickup and delivery contact information
        </p>

      </div>

      <div className="guest-section">

        <h3>
          Pickup Contact
        </h3>

        <div className="guest-grid">

          <input
            type="text"
            placeholder="Pickup Full Name"
            className="guest-input"
            value={pickupName}
            onChange={(e) =>
              setPickupName(
                e.target.value
              )
            }
          />

          <input
            type="tel"
            placeholder="Pickup Phone Number"
            className="guest-input"
            value={pickupPhone}
            onChange={(e) =>
              setPickupPhone(
                e.target.value
              )
            }
          />

          <input
            type="email"
            placeholder="Pickup Email Address"
            className="guest-input"
            value={pickupEmail}
            onChange={(e) =>
              setPickupEmail(
                e.target.value
              )
            }
          />

        </div>

      </div>

      <div className="guest-section">

        <h3>
          Dropoff Contact
        </h3>

        <div className="guest-grid">

          <input
            type="text"
            placeholder="Dropoff Full Name"
            className="guest-input"
            value={dropoffName}
            onChange={(e) =>
              setDropoffName(
                e.target.value
              )
            }
          />

          <input
            type="tel"
            placeholder="Dropoff Phone Number"
            className="guest-input"
            value={dropoffPhone}
            onChange={(e) =>
              setDropoffPhone(
                e.target.value
              )
            }
          />

          <input
            type="email"
            placeholder="Dropoff Email Address"
            className="guest-input"
            value={dropoffEmail}
            onChange={(e) =>
              setDropoffEmail(
                e.target.value
              )
            }
          />

        </div>

      </div>

      <div className="guest-section">

        <h3>
          Delivery Notes
        </h3>

        <textarea
          className="guest-textarea"
          value={notes}
          onChange={(e) =>
            setNotes(
              e.target.value
            )
          }
          placeholder="
Additional delivery instructions, buzzer number, apartment details, fragile items, etc.
"
        />

      </div>

      <button
        className="guest-payment-btn"
        onClick={handleProceed}
        disabled={loading}
      >

        {
          loading
            ? "Redirecting..."
            : "Proceed To Payment"
        }

      </button>

    </div>
  );
}

export default GuestCheckoutForm;
