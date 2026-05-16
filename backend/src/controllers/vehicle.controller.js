import { getDB }
  from "../db/mongo.js";

export async function getVehicles(
  req,
  res
) {

  try {

    const {
      serviceId,
    } = req.query;

    const db = getDB();

    const service =
      await db
        .collection("services")
        .findOne({
          id: serviceId,
        });

    if (!service) {
      return res.status(404).json({
        message:
          "Service not found",
      });
    }

    const vehicleIds =
      service.vehicleTypes || [];

    const vehicles =
      await db
        .collection("vehicletypes")
        .find({
          id: {
            $in: vehicleIds,
          },
        })
        .project({
          _id: 0,

          id: 1,

          title: 1,

          description: 1,

          icon: 1,
        })
        .toArray();

    res.json(vehicles);

  } catch (error) {

    console.error(
      "Vehicle API Error:",
      error
    );

    res.status(500).json({
      message:
        "Failed to fetch vehicles",
    });
  }
}