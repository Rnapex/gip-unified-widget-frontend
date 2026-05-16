function ServiceSelector({
  services,
  mode,
  selectedService,
  setSelectedService,
}) {

  const filteredServices =
    services.filter((service) => {

      const orderTypes =
        service.orderTypes || [];

      if (mode === "individual") {
        return orderTypes.includes(
          "Ondemand"
        );
      }

      return orderTypes.includes(
        "PickupDelivery"
      );
    });

  // COLLAPSED VIEW
  if (selectedService) {

    return (
      <div
        className="
          selected-service-card
        "
      >
        <div
          className="
            selected-service-header
          "
        >
          <div>

            <h3>
              {
                selectedService.title
                  ?.en
              }
            </h3>

            <p>
              {
                selectedService
                  .description
                  ?.en
              }
            </p>

          </div>

          <button
            className="
              change-service-btn
            "
            onClick={() =>
              setSelectedService(
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

  // FULL LIST VIEW
  return (
    <div
      className="
        service-scroll
      "
    >
      {filteredServices.map(
        (service) => (

          <button
            key={service.id}

            className={`
              service-pill
              ${
                selectedService?.id ===
                service.id
                  ? "active"
                  : ""
              }
            `}

            onClick={() =>
              setSelectedService(
                service
              )
            }
          >
            <>
  {service.icon && (
    <img
      src={service.icon}
      alt=""
      className="
        service-pill-icon
      "
    />
  )}

  <span>
    {
      service.title?.en
    }
  </span>
</>
          </button>
        )
      )}
    </div>
  );
}

export default ServiceSelector;