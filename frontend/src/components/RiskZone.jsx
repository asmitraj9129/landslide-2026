import { Circle } from "react-leaflet";

function RiskZone({ location }) {
  const [longitude, latitude] =
    location.geometry.coordinates;

  const { risk, status } =
    location.properties;

  let color = "green";
  let radius = 3000;

  if (status === "CRITICAL") {
    color = "red";
    radius = 10000;
  } else if (status === "HIGH") {
    color = "orange";
    radius = 8000;
  } else if (status === "MODERATE") {
    color = "yellow";
    radius = 6000;
  } else if (status === "LOW") {
    color = "green";
    radius = 4000;
  }

  return (
    <Circle
      center={[latitude, longitude]}
      radius={radius}
      pathOptions={{
        color: color,
        fillColor: color,
        fillOpacity: 0.15,
        weight: 2
      }}
    />
  );
}

export default RiskZone;