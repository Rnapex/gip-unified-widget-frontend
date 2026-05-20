
import mongoose
  from "mongoose";

const guestCheckoutSessionSchema =
  new mongoose.Schema({

    sessionId: {
      type: String,
      required: true,
      unique: true,
    },

    mode: {
      type: String,
      enum: [
        "individual",
        "business",
      ],
      required: true,
    },

    status: {
      type: String,
      enum: [
        "pending_payment",
        "paid",
        "order_created",
        "failed",
        "expired",
      ],
      default:
        "pending_payment",
    },

    quote: {

      amount: Number,

      currency: {
        type: String,
        default: "CAD",
      },
    },

    pickup: {
      type: Object,
      required: true,
    },

    dropoff: {
      type: Object,
      required: true,
    },

    service: {
      type: Object,
      required: true,
    },

    vehicle: {
      type: Object,
      default: null,
    },

    guest: {

      pickupName: String,
      pickupPhone: String,
      pickupEmail: String,

      dropoffName: String,
      dropoffPhone: String,
      dropoffEmail: String,
    },

    notes: {
      type: String,
      default: "",
    },

    stripeSessionId: {
      type: String,
      default: null,
    },

    stripePaymentIntentId: {
      type: String,
      default: null,
    },

    gipOrderId: {
      type: String,
      default: null,
    },

    rawPayload: {
      type: Object,
      default: {},
    },

  }, {

    timestamps: true,
  });

export default mongoose.model(
  "GuestCheckoutSession",
  guestCheckoutSessionSchema
);
