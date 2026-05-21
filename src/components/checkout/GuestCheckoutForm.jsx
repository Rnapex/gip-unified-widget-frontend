// src/components/checkout/GuestCheckoutForm.jsx

import {
  useState,
} from "react";

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

  // =====================================
  // FORM STATE
  // =====================================

  const [
    form,
    setForm,
  ] = useState({

    pickupName: "",
    pickupPhone: "",
    pickupEmail: "",

    dropoffName: "",
    dropoffPhone: "",
    dropoffEmail: "",

    notes: "",
  });

  // =====================================
  // HANDLE CHANGE
  // =====================================

  function handleChange(e) {

    setForm({

      ...form,

      [e.target.name]:
        e.target.value,
    });
  }

  // =====================================
  // FORMAT PHONE
  // =====================================

  function formatPhone(phone) {

    const cleaned =
      phone.replace(/\D/g, "");

    // Canada/US 10 digit
    if (
      cleaned.length === 10
    ) {

      return `+1${cleaned}`;
    }

    // Already has country code
    if (
      cleaned.length === 11 &&
      cleaned.startsWith("1")
    ) {

      return `+${cleaned}`;
    }

    return `+${cleaned}`;
  }

  // =====================================
  // SUBMIT
  // =====================================

  async function handleProceed() {

    try {

      // =====================================
      // VALIDATION
      // =====================================

      if (
        !form.pickupName ||
        !form.pickupPhone ||
        !form.pickupEmail ||

        !form.dropoffName ||
        !form.dropoffPhone ||
        !form.dropoffEmail
      ) {

        alert(
          "Please fill all required fields"
        );

        return;
      }

      setLoading(true);

      let payload = {};

      let orderType = "";

      const pickupPhone =
        formatPhone(
          form.pickupPhone
        );

      const dropoffPhone =
        formatPhone(
          form.dropoffPhone
        );

      // =====================================
      // INDIVIDUAL / ONDEMAND
      // =====================================

      if (selectedVehicle?.id) {

        orderType =
          "ondemand";

        payload = {

          uid:
            `guest_${Date.now()}`,

          referenceId:
            `WEB_${Date.now()}`,

          customerId:
            "JQnJ3wq8QbKj6f7_WyfDo",

          paymentMethod:
            "Wallet",

          paymentSide:
            "Sender",

          codAmount: 0,

          promoCode: "",

          isScheduled: false,

          note:
            form.notes || "",

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

          // =====================================
          // PICKUP
          // =====================================

          pickup: {

            address:
              pickup?.address || "",

            coordinates: [
              pickup?.lng,
              pickup?.lat,
            ],

            customerDescription:
              form.notes || "",

            schedulePickupNow:
              false,

            scheduleDateAfter:
              0,

            scheduleDateBefore:
              0,

            fullName:
              form.pickupName,

            phone:
              pickupPhone,

            email:
              form.pickupEmail,

            placeId: "",

            floor: "",

            room: "",

            buildingBlock: "",
          },

          // =====================================
          // DROPOFFS
          // =====================================

          dropoffs: [
            {

              address:
                dropoff?.address || "",

              coordinates: [
                dropoff?.lng,
                dropoff?.lat,
              ],

              customerDescription:
                form.notes || "",

              scheduleDateAfter:
                0,

              scheduleDateBefore:
                0,

              fullName:
                form.dropoffName,

              // FIXED
              phone:
                dropoffPhone,

              email:
                form.dropoffEmail,

              placeId: "",

              floor: "",

              room: "",

              buildingBlock: "",
            },
          ],
        };

      } else {

        // =====================================
        // BUSINESS / PICKUP DELIVERY
        // =====================================

        orderType =
          "pickup-delivery";

        payload = {

          uid:
            `guest_${Date.now()}`,

          referenceId:
            `WEB_${Date.now()}`,

          customerId:
            "JQnJ3wq8QbKj6f7_WyfDo",

          paymentMethod:
            "Wallet",

          paymentSide:
            "Sender",

          codAmount: 0,

          draft: false,

          note:
            form.notes || "",

          service: {

            id:
              selectedService?.id,

            options: [],
          },

          // =====================================
          // PICKUP
          // =====================================

          pickup: {

            address:
              pickup?.address || "",

            addressDetail:
              form.notes || "",

            completeAfter: 0,

            completeBefore: 0,

            coordinates: [
              pickup?.lng,
              pickup?.lat,
            ],

            fullName:
              form.pickupName,

            phone:
              pickupPhone,

            email:
              form.pickupEmail,

            placeId: "",
          },

          // =====================================
          // DELIVERY
          // =====================================

          delivery: {

            address:
              dropoff?.address || "",

            addressDetail:
              form.notes || "",

            completeAfter: 0,

            completeBefore: 0,

            coordinates: [
              dropoff?.lng,
              dropoff?.lat,
            ],

            fullName:
              form.dropoffName,

            // FIXED
            phone:
              dropoffPhone,

            email:
              form.dropoffEmail,

            placeId: "",
          },
        };
      }

      console.log(
        "ORDER TYPE:",
        orderType
      );

      console.log(
        "PAYLOAD:",
        payload
      );

      // =====================================
      // CREATE STRIPE SESSION
      // =====================================

      const response =
        await fetch(

          "https://gip-guest-checkout-api-production.up.railway.app/api/guest-checkout/create-session",

          {

            method: "POST",

            headers: {

              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({

                amount:
                  quote?.price,

                currency:
                  quote?.currencyCode || "cad",

                orderType:
                  orderType,

                quotePayload:
                  payload,

                guestData: {

                  pickupName:
                    form.pickupName,

                  pickupPhone:
                    pickupPhone,

                  pickupEmail:
                    form.pickupEmail,

                  dropoffName:
                    form.dropoffName,

                  dropoffPhone:
                    dropoffPhone,

                  dropoffEmail:
                    form.dropoffEmail,
                },
              }),
          }
        );

      const data =
        await response.json();

      console.log(
        "SESSION RESPONSE:",
        data
      );

      if (!data.success) {

        throw new Error(

          data.message ||

          "Failed to create checkout session"
        );
      }

      // =====================================
      // REDIRECT TO STRIPE
      // =====================================

      window.location.href =
        data.data.checkoutUrl;

    } catch (err) {

      console.error(
        "CHECKOUT ERROR:",
        err
      );

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

      {/* =====================================
          PICKUP CONTACT
      ===================================== */}

      <div className="guest-section">

        <h3>
          Pickup Contact
        </h3>

        <div className="guest-grid">

          <input
            type="text"
            name="pickupName"
            value={form.pickupName}
            onChange={handleChange}
            placeholder="Pickup Full Name"
            className="guest-input"
          />

          <input
            type="tel"
            name="pickupPhone"
            value={form.pickupPhone}
            onChange={handleChange}
            placeholder="Pickup Phone Number"
            className="guest-input"
          />

          <input
            type="email"
            name="pickupEmail"
            value={form.pickupEmail}
            onChange={handleChange}
            placeholder="Pickup Email Address"
            className="guest-input"
          />

        </div>

      </div>

      {/* =====================================
          DROPOFF CONTACT
      ===================================== */}

      <div className="guest-section">

        <h3>
          Dropoff Contact
        </h3>

        <div className="guest-grid">

          <input
            type="text"
            name="dropoffName"
            value={form.dropoffName}
            onChange={handleChange}
            placeholder="Dropoff Full Name"
            className="guest-input"
          />

          <input
            type="tel"
            name="dropoffPhone"
            value={form.dropoffPhone}
            onChange={handleChange}
            placeholder="Dropoff Phone Number"
            className="guest-input"
          />

          <input
            type="email"
            name="dropoffEmail"
            value={form.dropoffEmail}
            onChange={handleChange}
            placeholder="Dropoff Email Address"
            className="guest-input"
          />

        </div>

      </div>

      {/* =====================================
          DELIVERY NOTES
      ===================================== */}

      <div className="guest-section">

        <h3>
          Delivery Notes
        </h3>

        <textarea
          className="guest-textarea"
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Additional delivery instructions..."
        />

      </div>

      {/* =====================================
          BUTTON
      ===================================== */}

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
