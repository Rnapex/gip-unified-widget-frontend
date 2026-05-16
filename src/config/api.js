import axios from "axios";

const API_BASE =
  import.meta.env
    .VITE_API_BASE_URL;

console.log(
  "API BASE:",
  API_BASE
);

const apiClient =
  axios.create({
    baseURL: API_BASE,
  });

export default apiClient;
