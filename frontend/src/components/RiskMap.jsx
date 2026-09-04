import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  useMap
} from "react-leaflet";

import nerLocations from "../data/ner_locations.json";
import LocationMarker from "./LocationMarker.jsx";
import RiskZone from "./RiskZone.jsx";
import nerBoundary from "../data/ner_boundary.json";

function MapController({ selectedLocation }) {
  const map = useMap();

  if (selectedLocation) {
    const [longitude, latitude] =
      selectedLocation.geometry.coordinates;

    map.flyTo(
      [latitude, longitude],
      10,
      {
        duration: 1.5
      }
    );
  }

  return null;
}

function RiskMap() {
  const [selectedLocation, setSelectedLocation] =
    useState(null);

  return (
    <div style={{ position: "relative" }}>

      {/* Location Selector */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          zIndex: 1000,
          background: "white",
          padding: "12px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)"
        }}
      >
        <label
          style={{
            display: "block",
            fontWeight: "bold",
            marginBottom: "6px"
          }}
        >
          Select Location
        </label>

        <select
          value={
            selectedLocation
              ? selectedLocation.properties.location
              : ""
          }
          onChange={(event) => {
            const location =
              nerLocations.features.find(
                (item) =>
                  item.properties.location ===
                  event.target.value
              );

            setSelectedLocation(location);
          }}
          style={{
            padding: "8px",
            minWidth: "180px"
          }}
        >
          <option value="">
            -- Select Location --
          </option>

          {nerLocations.features.map((location) => (
            <option
              key={location.properties.location}
              value={location.properties.location}
            >
              {location.properties.location}
            </option>
          ))}
        </select>
      </div>

      {/* Selected Location Information */}
{selectedLocation && (
  <div
    style={{
      position: "absolute",
      top: "100px",
      left: "20px",
      zIndex: 1000,
      background: "white",
      padding: "15px",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
      minWidth: "230px"
    }}
  >
    <h3 style={{ marginTop: 0 }}>
      {selectedLocation.properties.location}
    </h3>

    <p>
      <strong>State:</strong>{" "}
      {selectedLocation.properties.state}
    </p>

    <p>
      <strong>Rainfall:</strong>{" "}
      {selectedLocation.properties.rainfall} mm
    </p>

    <p>
      <strong>Soil Moisture:</strong>{" "}
      {selectedLocation.properties.soilMoisture}%
    </p>

    <p>
      <strong>Slope:</strong>{" "}
      {selectedLocation.properties.slope}°
    </p>

    <p>
      <strong>Risk:</strong>{" "}
      {selectedLocation.properties.risk}%
    </p>

    <p>
      <strong>Status:</strong>{" "}
      {selectedLocation.properties.status}
    </p>

    <p>
      <strong>Coordinates:</strong>{" "}
      {selectedLocation.geometry.coordinates[1]},
      {" "}
      {selectedLocation.geometry.coordinates[0]}
    </p>
  </div>
)}

      {/* Map */}
      <MapContainer
        center={[25.5, 92.5]}
        zoom={6}
        style={{
          height: "600px",
          width: "100%"
        }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

       <GeoJSON
  data={nerBoundary}
  style={{
    color: "black",
    weight: 2,
    fillOpacity: 0.05
  }}
  onEachFeature={(feature, layer) => {
    const stateName =
      feature.properties.NAME_1;

    layer.bindTooltip(stateName);

    layer.on({
      mouseover: (event) => {
        event.target.setStyle({
          weight: 3,
          fillOpacity: 0.25
        });
      },

      mouseout: (event) => {
        event.target.setStyle({
          weight: 2,
          fillOpacity: 0.05
        });
      },

      click: (event) => {
        event.target.bindPopup(
          `<strong>${stateName}</strong><br/>
           North-East Region`
        ).openPopup();
      }
    });
  }}
/>

        <MapController
          selectedLocation={selectedLocation}
        />

        {nerLocations.features.map((location) => (
  <RiskZone
    key={`zone-${location.properties.location}`}
    location={location}
  />
))}

{nerLocations.features.map((location) => (
  <LocationMarker
    key={location.properties.location}
    location={location}
  />
))}

        {nerLocations.features.map((location) => (
          <LocationMarker
            key={location.properties.location}
            location={location}
          />
        ))}
      </MapContainer>

      {/* Risk Legend */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          background: "white",
          padding: "15px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
          zIndex: 1000,
          minWidth: "150px"
        }}
      >
        <h3
          style={{
            margin: "0 0 10px 0",
            fontSize: "16px"
          }}
        >
          Landslide Risk
        </h3>

        <div>🔴 Critical</div>
        <div>🟠 High</div>
        <div>🟡 Moderate</div>
        <div>🟢 Low</div>
      </div>

    </div>
  );
}

export default RiskMap;