import * as React from "react";
import L from "leaflet";
import { useEffect } from "react";
import { Plot, Green, Building } from "../MapWrapper";

const defaultZoom = 15;
const simplefMapStyle = L.tileLayer(
  "http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    detectRetina: true,
    maxZoom: 20,
    maxNativeZoom: 17
  }
);

const createMap = (plots: Plot[], greens: Green[], buildings: Building[]) => {
  const map = L.map("map", {
    center: [50.04, 19.94],
    zoom: defaultZoom,
    layers: [simplefMapStyle]
  });

  plots.map((plot) => {
    L.polygon(plot.coordinates).addTo(map); 
  })



  return map
};

interface ChurchyMapProps {
  plots: Plot[]
  greens: Green[]
  buildings: Building[]
}

export const ChurchyMap = ({plots, greens, buildings}: ChurchyMapProps): JSX.Element => {

  useEffect(() => {
    const map = createMap(plots, greens, buildings);
    return () => {
      map.remove();
    };
  }, [plots, greens, buildings]);

  return (
    <div>
      <div id="map" style={{ height: "1500px" }}></div>
    </div>
  );
};
