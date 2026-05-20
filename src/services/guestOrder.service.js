
import crypto
  from "crypto";

import GuestCheckoutSession
  from "../models/guestCheckoutSession.model.js";

export async function createGuestSession({

  mode,
  quote,
  pickup,
  dropoff,
  service,
  vehicle,
  guest,
  notes,
  rawPayload,
}) {

  const sessionId =

    `gcs_${crypto.randomUUID()}`;

  const session =
    await GuestCheckoutSession.create({

      sessionId,

      mode,

      quote,

      pickup,

      dropoff,

      service,

      vehicle,

      guest,

      notes,

      rawPayload,
    });

  return session;
}
