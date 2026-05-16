import axios from "axios";

import { getDB }
  from "../db/mongo.js";

export async function getPricingZones(
  req,
  res
) {
  try {
    const db = getDB();

    const zones =
      await db
        .collection("pricingzones")
        .find({
          isActive: true,
        })
        .project({
          _id: 0,
          id: 1,
          name: 1,
          location: 1,
        })
        .toArray();

    res.json(zones);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Failed to fetch zones",
    });
  }
}

export async function getServices(
  req,
  res
) {
  try {
    const db = getDB();

    const services =
      await db
        .collection("services")
        .find({
          isActive: true,
        })
        .project({
          _id: 0,

          id: 1,

          title: 1,

          description: 1,

          icon: 1,

          orderTypes: 1,

          vehicleTypes: 1,
        })
        .toArray();

    res.json(services);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Failed to fetch services",
    });
  }
}