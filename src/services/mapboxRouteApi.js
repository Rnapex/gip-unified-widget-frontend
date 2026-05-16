import axios
  from "axios";

const TOKEN =
  import.meta.env
    .VITE_MAPBOX_TOKEN;

export async function getRoute(
  pickup,
  dropoff
) {

  try {

    const url =
      `https://api.mapbox.com/directions/v5/mapbox/driving/` +
      `${pickup.lng},${pickup.lat};` +
      `${dropoff.lng},${dropoff.lat}` +
      `?geometries=geojson` +
      `&overview=full` +
      `&access_token=${TOKEN}`;

    const response =
      await axios.get(url);

    return response.data;

  } catch (error) {

    console.error(
      "ROUTE ERROR:",
      error
    );

    return null;
  }
}