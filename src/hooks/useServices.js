import { useEffect, useState }
  from "react";

import {
  fetchServices,
} from "../services/serviceApi";

export default function useServices() {
  const [services, setServices] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);

      const data =
        await fetchServices();

      console.log(
        "SERVICES:",
        data
      );

      setServices(data);

      setLoading(false);
    }

    load();
  }, []);

  return {
    services,
    loading,
  };
}