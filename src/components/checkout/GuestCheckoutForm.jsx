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

      // =====================================
      // BUILD PAYLOAD
      // =====================================

      const payload = {

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

        pickup: {

          address:
            pickup?.address,

          coordinates: [
            pickup?.lng,
            pickup?.lat,
          ],

          fullName:
            form.pickupName,

          phone:
            form.pickupPhone,

          email:
            form.pickupEmail,

          notes:
            form.notes,
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
              form.dropoffName,

            phone:
              form.dropoffPhone,

            email:
              form.dropoffEmail,

            notes:
              form.notes,
          },
        ],
      };

      console.log(
        "PICKUP:",
        pickup
      );

      console.log(
        "DROPOFF:",
        dropoff
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
                  quote?.currencyCode,

                orderType:
                  "ondemand",

                quotePayload:
                  payload,

                guestData: {

                  pickupName:
                    form.pickupName,

                  pickupPhone:
                    form.pickupPhone,

                  pickupEmail:
                    form.pickupEmail,
                },
              }),
          }
        );

      const data =
        await response.json();

      if (!data.success) {

        throw new Error(
          data.message
        );
      }

      // =====================================
      // REDIRECT TO STRIPE
      // =====================================

      window.location.href =
        data.data.checkoutUrl;

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
