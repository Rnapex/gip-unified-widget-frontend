import axios from "axios";

import { API_BASE }
  from "../config/api";

export async function fetchZones() {

  const response =
    await axios.get(
      `${API_BASE}/api/widget/pricing-zones`
    );
console.log("ZONE RESPONSE:", response.data);

  return response.data;
}
