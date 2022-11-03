import { PropertyBase, PropertyBaseType } from "../../MapWrapper";
import L from "leaflet";
import { Feature } from "geojson";

export const geoJsonsFactory = (properties: PropertyBase[]): any => {
  return properties.map(property => {
    return {
      type: "Feature",
      properties: {
        id: property.id,
        propertyType:
          "green_type" in property
            ? PropertyBaseType.GREEN
            : PropertyBaseType.PLOT,
        name: property.name,
        description: property.description
      },
      geometry: {
        type: "Polygon",
        coordinates: [L.GeoJSON.latLngsToCoords(property.coordinates)]
      }
    } as Feature;
  });
};
