import { PropertyBase } from "../MapWrapper";
import L from "leaflet";
import { Feature } from "geojson";

export const geoJsonsFactory = (plots: PropertyBase[]): any => {
  return plots.map(plot => {
    return {
      type: "Feature",
      properties: {
        name: plot.name,
        description: plot.description
      },
      geometry: {
        type: "Polygon",
        coordinates: [L.GeoJSON.latLngsToCoords(plot.coordinates)]
      }
    } as Feature
  });
};