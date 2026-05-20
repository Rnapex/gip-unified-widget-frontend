
import express
  from "express";

import {
  createGuestSession,
} from "../services/guestOrder.service.js";

const router =
  express.Router();

// =====================================
// CREATE SESSION
// =====================================

router.post(
  "/create-session",
  async (req, res) => {

    try {

      const {

        mode,
        quote,
        pickup,
        dropoff,
        service,
        vehicle,
        guest,
        notes,
      } = req.body;

      // BASIC VALIDATION

      if (
        !quote ||
        !pickup ||
        !dropoff ||
        !service ||
        !guest
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Missing required fields",
        });
      }

      const session =
        await createGuestSession({

          mode,

          quote,

          pickup,

          dropoff,

          service,

          vehicle,

          guest,

          notes,

          rawPayload:
            req.body,
        });

      return res.json({

        success: true,

        sessionId:
          session.sessionId,
      });

    } catch (error) {

      console.error(
        "CREATE SESSION ERROR:",
        error
      );

      return res.status(500).json({

        success: false,

        message:
          "Failed to create guest session",
      });
    }
  }
);

export default router;
