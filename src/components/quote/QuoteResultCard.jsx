function QuoteResultCard({
  quote,
}) {

  if (
    !quote ||
    quote.code !== 0
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
                quote.data?.price || 0
              ).toLocaleString(
                "en-CA",
                {
                  style:
                    "currency",

                  currency:
                    quote.data
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
              quote.data
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
