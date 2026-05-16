import {
  useEffect,
  useState,
} from "react";

import {
  fetchVehicles,
} from "../services/vehicleApi";

export default function useVehicles({
  serviceId,
  customerId,
}) {

  const [
    vehicles,
    setVehicles,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(false);

  useEffect(() => {

    if (
      !serviceId ||
      !customerId
    ) {
      setVehicles([]);
      return;
    }

    async function load() {

      setLoading(true);

      const data =
        await fetchVehicles({
          serviceId,
          customerId,
        });

      console.log(
        "VEHICLES:",
        data
      );

      setVehicles(data);

      setLoading(false);
    }

    load();

  }, [
    serviceId,
    customerId,
  ]);

  return {
    vehicles,
    loading,
  };
}