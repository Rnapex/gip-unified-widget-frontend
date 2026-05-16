import { useEffect, useState } from "react";

import { fetchZones }
  from "../services/zoneApi";

export default function useZones() {
  const [zones, setZones] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadZones() {
      setLoading(true);

      const data =
        await fetchZones();

      console.log(
        "ZONES:",
        data
      );

      setZones(data);

      setLoading(false);
    }

    loadZones();
  }, []);

  return {
    zones,
    loading,
  };
}