import { PropertyBase } from "../MapWrapper";
import L from "leaflet";
import { geoJsonsFactory } from "./geoJson_factory";
export const layerFactory = (map: L.Map, terrains: PropertyBase[], style: object) =>
  L.geoJSON(geoJsonsFactory(terrains), style).addTo(map);
