import axios
  from "axios";

const API_BASE =
  "https://rest.getitpicked.com";

export async function calculateQuote(
  req,
  res
) {

  try {

    const {
      mode,

      pickup,

      dropoff,

      service,

      vehicle,
    } = req.body;

    // IMPORTANT
    // REAL CUSTOMER IDS

    const CUSTOMER_IDS = {

      individual:
        "m4RhWQBMr1on56j-w-yu4",

      business:
        "BUSINESS_CUSTOMER_ID",
    };

    const customerId =
      mode === "individual"
        ? CUSTOMER_IDS.individual
        : CUSTOMER_IDS.business;

    let response;

    // INDIVIDUAL
    if (
      mode === "individual"
    ) {

      response =
        await axios.post(
          `${API_BASE}/api/v1/customer/widget/calculate-price`,
          {

            pickup: {
              lat:
                pickup.lat,

              lng:
                pickup.lng,

              address:
                pickup.address,
            },

            dropoffs: [
              {
                lat:
                  dropoff.lat,

                lng:
                  dropoff.lng,

                address:
                  dropoff.address,
              },
            ],

            vehicleType:
              vehicle?.id,

            service:
              service?.id,

            customerId,
          },

          {
            headers: {

              "Content-Type":
                "application/json",

              "Accept-Language":
                "en",

              "x-request-ts":
                Date.now(),
            },
          }
        );

    } else {

      // BUSINESS

      response =
        await axios.post(
          `${API_BASE}/api/v1/customer/widget/pickup-delivery/calculate-price`,
          {

            pickup: {
              lat:
                pickup.lat,

              lng:
                pickup.lng,

              address:
                pickup.address,
            },

            delivery: {
              lat:
                dropoff.lat,

              lng:
                dropoff.lng,

              address:
                dropoff.address,
            },

            service:
              service?.id,

            customerId,
          },

          {
            headers: {

              "Content-Type":
                "application/json",

              "Accept-Language":
                "en",

              "x-request-ts":
                Date.now(),
            },
          }
        );
    }

    console.log(
      "LIVE QUOTE:",
      response.data
    );

    return res.json(
      response.data
    );

  } catch (error) {

    console.error(
      "LIVE QUOTE ERROR:",
      error?.response?.data ||
      error.message
    );

    return res.status(500).json({

      success: false,

      message:
        "Live pricing failed",
    });
  }
}