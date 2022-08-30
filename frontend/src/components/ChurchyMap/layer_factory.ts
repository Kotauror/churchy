import { PropertyBase } from "../MapWrapper";
import L from "leaflet";
import { geoJsonsFactory } from "./geoJson_factory";

const actionListenersForLayers = (
  feature: any,
  layer: any,
  setActiveFeature: any
) => {
  layer.bindTooltip(feature.properties.name);
  layer.on("click", () => {
    setActiveFeature(feature)
  });
  layer.on("mouseover", () => {
    layer.setStyle({
      weight: 2
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
    actionListenersForLayers(feature, layer, setActiveFeature);
  }}).addTo(map);
