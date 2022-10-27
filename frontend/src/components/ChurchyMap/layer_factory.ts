import { PropertyBase } from "../MapWrapper";
import L from "leaflet";
import { geoJsonsFactory } from "./geoJson_factory";

const actionListenersForLayers = (
  map: any,
  feature: any,
  layer: any,
  setActiveFeature: any
) => {
  layer.bindTooltip(feature.properties.name);
  layer.on("click", () => {
    setActiveFeature(feature)
    map.flyTo([feature.geometry.coordinates[0][0][1], feature.geometry.coordinates[0][0][0] - 0.003], 16)
  })
  layer.on("mouseover", () => {
    layer.setStyle({
      weight: 3
    });
  });
  layer.on("mouseout", () => {
    layer.setStyle({
      weight: 1
    })
  });
};

export const layerFactory = (map: L.Map, terrains: PropertyBase[], style: object, setActiveFeature: any) =>
  L.geoJSON(geoJsonsFactory(terrains), {style: style, onEachFeature: function(feature: any, layer: any) {
    actionListenersForLayers(map, feature, layer, setActiveFeature);
  }}).addTo(map);
