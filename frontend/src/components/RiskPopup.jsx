function RiskPopup({ properties }) {
  const {
    location,
    state,
    rainfall,
    soilMoisture,
    slope,
    risk,
    status
  } = properties;

  return (
    <div style={{ minWidth: "200px" }}>
      <h3 style={{ marginTop: 0 }}>
        {location}
      </h3>

      <p>
        <strong>State:</strong> {state}
      </p>

      <p>
        <strong>Rainfall:</strong> {rainfall} mm
      </p>

      <p>
        <strong>Soil Moisture:</strong> {soilMoisture}%
      </p>

      <p>
        <strong>Slope:</strong> {slope}°
      </p>

      <p>
        <strong>Risk:</strong> {risk}%
      </p>

      <p>
        <strong>Status:</strong>{" "}
        <span style={{ fontWeight: "bold" }}>
          {status}
        </span>
      </p>
    </div>
  );
}

export default RiskPopup;