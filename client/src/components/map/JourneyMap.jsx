import {
  MapContainer,
  TileLayer,
  Circle,
  CircleMarker,
  Tooltip,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "./JourneyMap.css";
import { mapTiles } from "./mapTiles";

function JourneyMap({ location, activity, height = "30rem", className = "" }) {
  return (
    <div className={`journey-map ${className}`.trim()} style={{ height }}>
      <MapContainer
        center={location.position}
        zoom={17}
        maxZoom={20}
        scrollWheelZoom
        className="journey-map__leaflet"
      >
        <TileLayer
          attribution={mapTiles.attribution}
          url={mapTiles.url}
        />

        <Circle
          center={location.position}
          radius={300}
          pathOptions={{
            color: "#317d43",
            weight: 1.5,
            fillColor: "#459d59",
            fillOpacity: 0.15,
          }}
        />

        <CircleMarker
          center={location.position}
          radius={9}
          pathOptions={{
            color: "#ffffff",
            weight: 3,
            fillColor: location.status === "walking" ? "#2f8748" : "#d59a35",
            fillOpacity: 1,
          }}
        >
          <Tooltip
            permanent
            direction="top"
            offset={[0, -12]}
            className="journey-map__tooltip"
          >
            <span className="journey-map__tooltip-content">
              <i className={`fa-solid ${activity.icon}`} aria-hidden="true" />
              {location.city}
            </span>
          </Tooltip>

          <Popup>
            <div className="journey-map__popup">
              <span className="journey-map__popup-label">DEMO LOCATION</span>

              <h3 className="journey-map__popup-title">
                {location.city}, {location.country}
              </h3>

              <span
                className={`journey-map__activity journey-map__activity--${location.status}`}
              >
                <i className={`fa-solid ${activity.icon}`} aria-hidden="true" />
                {activity.label}
              </span>

              <p className="journey-map__popup-description">
                {activity.description}
              </p>

              <div className="journey-map__popup-time">
                <i className="fa-regular fa-clock" aria-hidden="true" />
                {location.updatedAt
                  ? `Updated ${new Date(location.updatedAt).toLocaleString("en-GB")}`
                  : "Sample data — not live GPS"}
              </div>
            </div>
          </Popup>
        </CircleMarker>
      </MapContainer>
    </div>
  );
}

export default JourneyMap;
