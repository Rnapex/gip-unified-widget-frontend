function VehicleSelector({
  vehicles,
  selectedVehicle,
  setSelectedVehicle,
}) {

  if (!vehicles?.length) {
    return null;
  }

  // COLLAPSED VIEW
  if (selectedVehicle) {

    return (
      <div
        className="
          selected-vehicle-card
        "
      >
        <div
          className="
            selected-vehicle-header
          "
        >
          <div
            className="
              selected-vehicle-info
            "
          >
            {selectedVehicle.icon && (
              <img
                src={
                  selectedVehicle.icon
                }
                alt=""
                className="
                  selected-vehicle-icon
                "
              />
            )}

            <div>

              <h3>
                {
                  selectedVehicle
                    .title?.en
                }
              </h3>

              <p>
                {
                  selectedVehicle
                    .description?.en
                }
              </p>

            </div>
          </div>

          <button
            className="
              change-vehicle-btn
            "
            onClick={() =>
              setSelectedVehicle(
                null
              )
            }
          >
            Change
          </button>

        </div>
      </div>
    );
  }

  // LIST VIEW
  return (
    <div
      className="
        vehicle-scroll
      "
    >
      {vehicles.map(
        (vehicle) => (

          <button
            key={vehicle.id}

            className="
              vehicle-pill
            "

            onClick={() =>
              setSelectedVehicle(
                vehicle
              )
            }
          >
            {vehicle.icon && (
              <img
                src={vehicle.icon}
                alt=""
                className="
                  vehicle-pill-icon
                "
              />
            )}

            <span>
              {
                vehicle.title
                  ?.en
              }
            </span>

          </button>
        )
      )}
    </div>
  );
}

export default VehicleSelector;