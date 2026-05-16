function QuoteResultCard({
  quote,
}) {

  if (!quote) {
    return null;
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
            $
            {
              quote.pricing
                ?.total
            }
          </div>

          <div
            className="
              booking-currency
            "
          >
            CAD
          </div>

        </div>

        <div
          className="
            booking-eta
          "
        >
          ETA:
          {" "}
          {
            quote.eta
              ?.delivery
          }
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
            Service:
          </strong>

          {" "}

          {
            quote.meta
              ?.service
          }
        </div>

        <div>
          <strong>
            Vehicle:
          </strong>

          {" "}

          {
            quote.meta
              ?.vehicle
          }
        </div>

      </div>

      <button
        className="
          continue-booking-btn
        "
      >
        Continue Booking
      </button>

    </div>
  );
}

export default QuoteResultCard;