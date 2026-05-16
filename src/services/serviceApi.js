import axios from "axios";

const API_BASE =
  "http://localhost:5000";

export async function fetchServices() {
  try {
    const response =
      await axios.get(
        `${API_BASE}/api/widget/services`
      );

    return response.data || [];

  } catch (error) {
    console.error(
      "Failed to fetch services",
      error
    );

    return [];
  }
}