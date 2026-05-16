import axios from "axios";

const API_BASE =
  "http://localhost:5000";

export async function fetchZones() {
  try {
    const response =
      await axios.get(
        `${API_BASE}/api/widget/pricing-zones`
      );

    return response.data || [];

  } catch (error) {
    console.error(
      "Failed to fetch zones",
      error
    );

    return [];
  }
}