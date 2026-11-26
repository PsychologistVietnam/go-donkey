import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Circle,
  CircleMarker,
  Polyline,
  Tooltip,
  Popup,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "./JourneyMap.css";
import { mapTiles } from "./mapTiles";

function ResizeMapOnOpen({ isVisible }) {
  const map = useMap();

  useEffect(() => {
    if (!isVisible) return undefined;

    const frame = requestAnimationFrame(() => map.invalidateSize());
    return () => cancelAnimationFrame(frame);
  }, [isVisible, map]);

  return null;
}

function JourneyMap({
  location,
  activity,
  height = "30rem",
  className = "",
  isVisible = true,
  routeStart = null,
  routePath = null,
  scrollWheelZoom = true,
  showLocationPopup = true,
}) {
  const routePoints = routeStart
    ? routePath ?? [routeStart.position, location.position]
    : null;

  return (
    <div className={`journey-map ${className}`.trim()} style={{ height }}>
      <MapContainer
        center={routePoints ? undefined : location.position}
        zoom={routePoints ? undefined : 17}
        bounds={routePoints ?? undefined}
        boundsOptions={routePoints ? { padding: [12, 12] } : undefined}
        zoomSnap={routePoints ? 0.5 : 1}
        maxZoom={20}
        scrollWheelZoom={scrollWheelZoom}
        className="journey-map__leaflet"
      >
        <ResizeMapOnOpen isVisible={isVisible} />
        <TileLayer
          attribution={mapTiles.attribution}
          url={mapTiles.url}
        />

        {routePoints ? (
          <>
            <Polyline
              positions={routePoints}
              pathOptions={{ color: "#ca3658", weight: 4, dashArray: "10 8" }}
            />
            <CircleMarker
              center={routeStart.position}
              radius={8}
              pathOptions={{
                color: "#ffffff",
                weight: 3,
                fillColor: "#ca3658",
                fillOpacity: 1,
              }}
            >
              <Tooltip permanent direction="bottom" offset={[0, 10]} className="journey-map__tooltip">
                {routeStart.city}
              </Tooltip>
            </CircleMarker>
          </>
        ) : (
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
        )}

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

          {showLocationPopup && <Popup>
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
          </Popup>}
        </CircleMarker>
      </MapContainer>
    </div>
  );
}

export default JourneyMap;
