function QuoteResultCard({
  quote,
}) {

  if (
    !quote ||
    !quote.success
  ) {
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
            {
              Number(
                quote.pricing
                  ?.total || 0
              ).toLocaleString(
                "en-CA",
                {
                  style:
                    "currency",

                  currency:
                    quote.pricing
                      ?.currency ||
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
              quote.pricing
                ?.currency ||
              "CAD"
            }
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
