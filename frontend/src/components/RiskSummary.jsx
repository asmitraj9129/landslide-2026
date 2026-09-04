import nerLocations from "../data/ner_locations.json";

function RiskSummary() {
  const locations = nerLocations.features;

  const totalLocations = locations.length;

  const criticalCount = locations.filter(
    (location) =>
      location.properties.status === "CRITICAL"
  ).length;

  const highCount = locations.filter(
    (location) =>
      location.properties.status === "HIGH"
  ).length;

  const totalRisk = locations.reduce(
    (sum, location) =>
      sum + Number(location.properties.risk),
    0
  );

  const averageRisk =
    totalLocations > 0
      ? Math.round(totalRisk / totalLocations)
      : 0;

  return (
    <div classname="summary-container"
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit, minmax(180px, 1fr))",
        gap: "15px",
        padding: "20px"
      }}
    >
      {/* Total Locations */}
      <div classname="summary-card"
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
        }}
      >
        <h3>📍 Monitored Locations</h3>

        <p classname="summary-value"
          style={{
            fontSize: "30px",
            fontWeight: "bold",
            margin: "10px 0"
          }}
        >
          {totalLocations}
        </p>
      </div>

      {/* Critical */}
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
        }}
      >
        <h3>🔴 Critical</h3>

        <p
          style={{
            fontSize: "30px",
            fontWeight: "bold",
            margin: "10px 0"
          }}
        >
          {criticalCount}
        </p>
      </div>

      {/* High */}
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
        }}
      >
        <h3>🟠 High Risk</h3>

        <p
          style={{
            fontSize: "30px",
            fontWeight: "bold",
            margin: "10px 0"
          }}
        >
          {highCount}
        </p>
      </div>

      {/* Average Risk */}
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
        }}
      >
        <h3>⚠️ Average Risk</h3>

        <p
          style={{
            fontSize: "30px",
            fontWeight: "bold",
            margin: "10px 0"
          }}
        >
          {averageRisk}%
        </p>
      </div>
    </div>
  );
}

export default RiskSummary;