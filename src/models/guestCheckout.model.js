import mongoose
  from "mongoose";

const guestCheckoutSchema =
  new mongoose.Schema({

    sessionId: String,

    stripeSessionId: String,

    stripePaymentIntentId: String,

    gipOrderId: String,

    paymentStatus: {
      type: String,
      default: "paid",
    },

    orderStatus: {
      type: String,
      default: "created",
    },

    mode: String,

    quote: Object,

    pickup: Object,

    dropoff: Object,

    service: Object,

    vehicle: Object,

    guest: Object,

    notes: String,

    gipResponse: Object,

  }, {

    timestamps: true,
  });

export default mongoose.model(
  "GuestCheckout",
  guestCheckoutSchema
);
