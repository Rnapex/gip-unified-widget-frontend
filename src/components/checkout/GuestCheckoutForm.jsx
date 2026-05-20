function GuestCheckoutForm({

  onProceed,

  loading = false,

}) {

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

      {/* =======================================
          PICKUP CONTACT
      ======================================= */}

      <div className="guest-section">

        <h3>
          Pickup Contact
        </h3>

        <div className="guest-grid">

          <input
            type="text"
            placeholder="Pickup Full Name"
            className="guest-input"
          />

          <input
            type="tel"
            placeholder="Pickup Phone Number"
            className="guest-input"
          />

          <input
            type="email"
            placeholder="Pickup Email Address"
            className="guest-input"
          />

        </div>

      </div>

      {/* =======================================
          DROPOFF CONTACT
      ======================================= */}

      <div className="guest-section">

        <h3>
          Dropoff Contact
        </h3>

        <div className="guest-grid">

          <input
            type="text"
            placeholder="Dropoff Full Name"
            className="guest-input"
          />

          <input
            type="tel"
            placeholder="Dropoff Phone Number"
            className="guest-input"
          />

          <input
            type="email"
            placeholder="Dropoff Email Address"
            className="guest-input"
          />

        </div>

      </div>

      {/* =======================================
          NOTES
      ======================================= */}

      <div className="guest-section">

        <h3>
          Delivery Notes
        </h3>

        <textarea
          className="guest-textarea"
          placeholder="
Additional delivery instructions, buzzer number, apartment details, fragile items, etc.
"
        />

      </div>

      {/* =======================================
          BUTTON
      ======================================= */}

      <button
        className="guest-payment-btn"
        onClick={onProceed}
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
