import express from "express";

const router = express.Router();

router.post(
  "/calculate",
  async (req, res) => {

    try {

      const {
        pickupZone,
        dropoffZone,
        service,
        vehicle,
        mode,
      } = req.body;

      console.log(
        "QUOTE REQUEST:",
        req.body
      );

      // TEMP MOCK RESPONSE

      return res.json({

        success: true,

        pricing: {

          baseFare: 25,

          distanceFare: 12,

          serviceFee: 3,

          tax: 6,

          total: 46,
        },

        eta: {

          pickup: "15 mins",

          delivery: "45 mins",
        },

        meta: {

          mode,

          pickupZone:
            pickupZone?.name,

          dropoffZone:
            dropoffZone?.name,

          service:
            service?.title?.en,

          vehicle:
            vehicle?.title?.en,
        },
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Quote calculation failed",
      });
    }
  }
);

export default router;