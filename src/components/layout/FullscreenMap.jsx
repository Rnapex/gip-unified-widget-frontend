import { useEffect, useRef }
  from "react";

import mapboxgl
  from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";

import useZones
  from "../../hooks/useZones";

import {
  getRoute,
} from "../../services/mapboxRouteApi";

mapboxgl.accessToken =
  import.meta.env
    .VITE_MAPBOX_TOKEN;

function FullscreenMap({
  pickup,
  dropoff,
  pickupZone,
  dropoffZone,
}) {

  const mapRef =
    useRef(null);

  const mapInstance =
    useRef(null);

    const pickupMarkerRef =
  useRef(null);

const dropoffMarkerRef =
  useRef(null);

  const { zones } =
    useZones();

  // INITIALIZE MAP
  useEffect(() => {

    if (!mapRef.current) {
      return;
    }

    if (mapInstance.current) {
      return;
    }

    mapInstance.current =
      new mapboxgl.Map({
        container:
          mapRef.current,

        style:
          "mapbox://styles/mapbox/dark-v11",

        center:
          [-63.5752, 44.6488],

        zoom: 8.5,

        pitch: 35,

        bearing: -10,

        antialias: true,
      });

    mapInstance.current.addControl(
      new mapboxgl.NavigationControl(),
      "bottom-right"
    );

    mapInstance.current.on(
      "load",
      () => {
        renderZones();
      }
    );

    return () => {
      mapInstance.current?.remove();
    };

  }, []);

  // RENDER ZONES
  useEffect(() => {

    const map =
      mapInstance.current;

    if (!map) {
      return;
    }

    if (!zones.length) {
      return;
    }

    if (
      !map.isStyleLoaded()
    ) {

      map.once(
        "load",
        () => {
          renderZones();
        }
      );

      return;
    }

    renderZones();

  }, [
    zones,
    pickupZone,
    dropoffZone,
  ]);

  // SMART FIT BOUNDS
  useEffect(() => {

    if (
      !pickup ||
      !dropoff
    ) {
      return;
    }

    const map =
      mapInstance.current;

    if (!map) {
      return;
    }

    if (
      typeof pickup.lng !==
        "number" ||
      typeof pickup.lat !==
        "number" ||
      typeof dropoff.lng !==
        "number" ||
      typeof dropoff.lat !==
        "number"
    ) {
      return;
    }

    const bounds =
      new mapboxgl.LngLatBounds();

    bounds.extend([
      pickup.lng,
      pickup.lat,
    ]);

    bounds.extend([
      dropoff.lng,
      dropoff.lat,
    ]);

    map.fitBounds(
      bounds,
      {
        padding: {
          top: 120,
          bottom: 220,
          left: 120,
          right: 120,
        },

        duration: 1800,

        pitch: 30,
      }
    );

  }, [
    pickup,
    dropoff,
  ]);

  useEffect(() => {

  async function loadRoute() {

    if (
      !pickup ||
      !dropoff
    ) {
      return;
    }

    const map =
      mapInstance.current;

    if (!map) {
      return;
    }

    const routeData =
      await getRoute(
        pickup,
        dropoff
      );

    const geometry =
      routeData?.routes?.[0]
        ?.geometry;

    if (!geometry) {
      return;
    }

    // REMOVE OLD ROUTE
    if (
      map.getSource(
        "route-line"
      )
    ) {

      if (
        map.getLayer(
          "route-line-layer"
        )
      ) {
        map.removeLayer(
          "route-line-layer"
        );
      }

      map.removeSource(
        "route-line"
      );
    }

    map.addSource(
      "route-line",
      {
        type: "geojson",

        data: {
          type: "Feature",

          geometry,
        },
      }
    );

    map.addLayer({
      id:
        "route-line-layer",

      type: "line",

      source:
        "route-line",

      layout: {
        "line-cap":
          "round",

        "line-join":
          "round",
      },

     paint: {

  "line-color":
    "#00FFC6",

  "line-width": 6,

  "line-opacity":
    0.9,

  "line-blur":
    0.5,
},
    });
  }

  loadRoute();

}, [
  pickup,
  dropoff,
]);
useEffect(() => {

  const map =
    mapInstance.current;

  if (!map) {
    return;
  }

  // REMOVE OLD
  pickupMarkerRef.current
    ?.remove();

  dropoffMarkerRef.current
    ?.remove();

  // PICKUP
  if (pickup) {

    const pickupEl =
      document.createElement(
        "div"
      );

    pickupEl.className =
      "pickup-marker";

    pickupMarkerRef.current =
      new mapboxgl.Marker(
        pickupEl
      )
        .setLngLat([
          pickup.lng,
          pickup.lat,
        ])
        .addTo(map);
  }

  // DROPOFF
  if (dropoff) {

    const dropoffEl =
      document.createElement(
        "div"
      );

    dropoffEl.className =
      "dropoff-marker";

    dropoffMarkerRef.current =
      new mapboxgl.Marker(
        dropoffEl
      )
        .setLngLat([
          dropoff.lng,
          dropoff.lat,
        ])
        .addTo(map);
  }

}, [
  pickup,
  dropoff,
]);
  function renderZones() {

    const map =
      mapInstance.current;

    if (!map) {
      return;
    }

    // REMOVE OLD
    if (
      map.getSource(
        "pricing-zones"
      )
    ) {

      if (
        map.getLayer(
          "pricing-zones-fill"
        )
      ) {
        map.removeLayer(
          "pricing-zones-fill"
        );
      }

      if (
        map.getLayer(
          "pricing-zones-outline"
        )
      ) {
        map.removeLayer(
          "pricing-zones-outline"
        );
      }

      map.removeSource(
        "pricing-zones"
      );
    }

    const geojson = {
      type:
        "FeatureCollection",

      features:
        zones.map(
          (zone) => ({
            type:
              "Feature",

            properties: {
              name:
                zone.name,

              isPickup:
                pickupZone?.id ===
                zone.id,

              isDropoff:
                dropoffZone?.id ===
                zone.id,
            },

            geometry:
              zone.location,
          })
        ),
    };

    map.addSource(
      "pricing-zones",
      {
        type: "geojson",

        data: geojson,
      }
    );

    // FILL
    map.addLayer({
      id:
        "pricing-zones-fill",

      type: "fill",

      source:
        "pricing-zones",

      paint: {

        "fill-color": [
          "case",

          [
            "get",
            "isPickup",
          ],
          "#22C55E",

          [
            "get",
            "isDropoff",
          ],
          "#F97316",

          "#0671E3",
        ],

        "fill-opacity": [
          "case",

          [
            "get",
            "isPickup",
          ],
          0.35,

          [
            "get",
            "isDropoff",
          ],
          0.35,

          0.15,
        ],
      },
    });

    // OUTLINE
    map.addLayer({
      id:
        "pricing-zones-outline",

      type: "line",

      source:
        "pricing-zones",

      paint: {

        "line-color": [
          "case",

          [
            "get",
            "isPickup",
          ],
          "#22C55E",

          [
            "get",
            "isDropoff",
          ],
          "#F97316",

          "#4DA3FF",
        ],

        "line-width": [
          "case",

          [
            "get",
            "isPickup",
          ],
          4,

          [
            "get",
            "isDropoff",
          ],
          4,

          2,
        ],
      },
    });
  }

  return (
    <div
      ref={mapRef}
      className="
        fullscreen-map
      "
    />
  );
}

export default FullscreenMap;