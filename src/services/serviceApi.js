import axios from "axios";

import { API_BASE }
  from "../config/api";

export async function fetchServices() {

  const response =
    await axios.get(
      `${API_BASE}/api/widget/services`
    );

  return response.data;
}
