import { useEffect, useRef } from "react";

function GoogleAutocompleteInput({
  placeholder,
  onPlaceSelect,
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (
      !window.google ||
      !window.google.maps ||
      !window.google.maps.places
    ) {
      return;
    }

    const autocomplete =
      new window.google.maps.places.Autocomplete(
        inputRef.current,
        {
          componentRestrictions: {
            country: "ca",
          },

          fields: [
            "formatted_address",
            "geometry",
            "name",
          ],

          types: ["address"],
        }
      );

    autocomplete.setBounds(
      new window.google.maps.LatLngBounds(
        new window.google.maps.LatLng(
          43.3,
          -66.5
        ),

        new window.google.maps.LatLng(
          47.2,
          -59.5
        )
      )
    );

    autocomplete.addListener(
      "place_changed",
      () => {
        const place =
          autocomplete.getPlace();

        if (!place.geometry) return;

        const payload = {
          address:
            place.formatted_address,

          lat:
            place.geometry.location.lat(),

          lng:
            place.geometry.location.lng(),
        };

        console.log(
          "Selected Place:",
          payload
        );

        onPlaceSelect(payload);
      }
    );
  }, []);

  return (
    <div className="google-input-wrapper">
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        className="google-address-input"
      />
    </div>
  );
}

export default GoogleAutocompleteInput;