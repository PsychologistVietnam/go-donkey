const mapTilerKey = import.meta.env.VITE_MAPTILER_KEY ?? "";

// Any XYZ tile service can be used by changing these environment variables.
export const mapTiles = {
  url:
    import.meta.env.VITE_MAP_TILE_URL ||
    `https://api.maptiler.com/maps/streets-v4/256/{z}/{x}/{y}.png?key=${encodeURIComponent(mapTilerKey)}`,
  attribution:
    import.meta.env.VITE_MAP_TILE_ATTRIBUTION ||
    '&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
};
