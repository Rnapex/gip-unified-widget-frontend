import express
  from "express";

import {
  getPricingZones,
  getServices,
} from "../controllers/widget.controller.js";

const router =
  express.Router();

router.get(
  "/pricing-zones",
  getPricingZones
);

router.get(
  "/services",
  getServices
);

export default router;