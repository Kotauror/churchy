import * as React from "react";
import L from "leaflet";
import { useEffect } from "react";
import { Plot, Green, Building } from "../MapWrapper";
import { plotStyle, greenStyle } from "./polygon_styles"

const defaultZoom = 15;
const simplefMapStyle = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: "abcd",
    maxNativeZoom: 17
  }
);

const createMap = (plots: Plot[], greens: Green[], buildings: Building[]) => {
  const map = L.map("map", {
    center: [50.03, 19.94],
    zoom: defaultZoom,
    layers: [simplefMapStyle]
  });

  plots.map(plot => {
    var polgon = L.polygon(plot.coordinates, plotStyle);
    polgon.on("click", function() {
      console.log(plot.name);
    });
    polgon.addTo(map);
  });

  greens.map(green => {
    var polgon = L.polygon(green.coordinates, greenStyle).addTo(map);
    polgon.on("click", function() {
      console.log(green.name);
    });
  });

  var buildingMarkers = buildings.map(building => {
    var marker = L.marker(building.coordinates);
    marker.on("click", function() {
      console.log(building.name);
    });
    return marker;
  });

  var buildingsLayer = L.layerGroup(buildingMarkers);

  map.on("zoom", function(e) {
    if (map.getZoom() >= 16) {
      buildingsLayer.addTo(map);
    } else {
      map.removeLayer(buildingsLayer);
    }
  });

  return map;
};

interface ChurchyMapProps {
  plots: Plot[];
  greens: Green[];
  buildings: Building[];
}

export const ChurchyMap = ({
  plots,
  greens,
  buildings
}: ChurchyMapProps): JSX.Element => {
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
