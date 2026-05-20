function QuoteResultCard({

  quote,

  onGuestCheckout,

}) {

  if (!quote) {
    return null;
  }

  function handleSignIn() {

    window.location.href =
      "https://app.getitpicked.com/";
  }

  return (

    <div
      className="
        booking-drawer
      "
    >

      <div
        className="
          booking-top
        "
      >

        <div>

          <div
            className="
              booking-price
            "
          >

            {
              Number(
                quote?.price || 0
              ).toLocaleString(
                "en-CA",
                {
                  style:
                    "currency",

                  currency:
                    quote
                      ?.currencyCode ||
                    "CAD",
                }
              )
            }

          </div>

          <div
            className="
              booking-currency
            "
          >

            {
              quote
                ?.currencyCode ||
              "CAD"
            }

          </div>

        </div>

        <div
          className="
            booking-eta
          "
        >

          Live Pricing

        </div>

      </div>

      <div
        className="
          booking-divider
        "
      />

      <div
        className="
          booking-meta
        "
      >

        <div>

          <strong>
            Status:
          </strong>

          {" "}

          Quote Calculated

        </div>

        <div>

          <strong>
            API:
          </strong>

          {" "}

          Get It Picked Live

        </div>

      </div>

      <div
        className="
          booking-actions
        "
      >

        <button
          className="
            signin-booking-btn
          "
          onClick={
            handleSignIn
          }
        >

          Sign In

        </button>

        <button
          className="
            guest-booking-btn
          "
          onClick={
            onGuestCheckout
          }
        >

          Guest Checkout

        </button>

      </div>

    </div>
  );
}

export default QuoteResultCard;
