import { CircleMarker, Popup } from "react-leaflet";
import RiskPopup from "./RiskPopup.jsx";

function LocationMarker({ location }) {
  const [longitude, latitude] = location.geometry.coordinates;

  const { status } = location.properties;

  let color = "green";

  if (status === "CRITICAL") {
    color = "red";
  } else if (status === "HIGH") {
    color = "orange";
  } else if (status === "MODERATE") {
    color = "yellow";
  }

  return (
    <CircleMarker
      center={[latitude, longitude]}
      radius={10}
      pathOptions={{
        color: color,
        fillColor: color,
        fillOpacity: 0.8
      }}
    >
      <Popup>
        <RiskPopup properties={location.properties} />
      </Popup>
    </CircleMarker>
  );
}

export default LocationMarker;