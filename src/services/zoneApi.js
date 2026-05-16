import axios from "axios";

import { API_BASE }
  from "../config/api";

export async function fetchZones() {

  const response =
    await axios.get(
      `${API_BASE}/api/widget/pricing-zones`
    );

  return response.data;
}
console.log("ZONE RESPONSE:", response.data);
