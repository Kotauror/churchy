import * as React from "react";
import L, { LatLngExpression } from "leaflet";
import { useEffect } from "react";
import { Plot, Green, Building } from "../MapWrapper";
import { analysedArea } from "./analysed_area";
import {
  plotStyle,
  specialAccessGreenStyle,
  daytimeOpenGreenStyle,
  unrestrictedGreenStyle,
  noAccessGreenStyle
} from "./polygon_styles";
import { layerFactory } from "./layer_factory";
import { Feature } from "geojson";

const defaultZoom = 14;
const simplefMapStyle = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  {
    attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: "abcd",
    maxNativeZoom: 17
  }
  );
  
  const createMap = (
    plots: Plot[],
    fullyAccessibleGreens: Green[],
    greensOpenDaytime: Green[],
    greensWithSpecialAccess: Green[],
    noAccessGreen: Green[],
    buildings: Building[],
    setActiveFeature: (feature: any) => void
) => {
  const map = L.map("map", {
    center: [50.051, 19.94],
    zoom: defaultZoom,
    layers: [simplefMapStyle]
  });
  
  var baseMaps = {
    // "Plan miasta": simplefMapStyle
  };
  var overlayMaps = {
    "Zielone tereny kościelne dostępne bez ograniczeń": layerFactory(
      map,
      fullyAccessibleGreens,
      unrestrictedGreenStyle,
      setActiveFeature
      ),
    "Zielone tereny kościelne otwarte w godzinach otwarcia kościoła": layerFactory(
      map,
      greensOpenDaytime,
      daytimeOpenGreenStyle,
      setActiveFeature
      ),
    "Zielone tereny kościelne z ograniczonym dostępem (np. za opłatą)": layerFactory(
      map,
      greensWithSpecialAccess,
      specialAccessGreenStyle,
      setActiveFeature
    ),
    "Zielone tereny kościelne niedostępne": layerFactory(
      map,
      noAccessGreen,
      noAccessGreenStyle,
      setActiveFeature
      ),
      "Działki kościelne o przeważającym charakterze niekomerycyjnym": layerFactory(
        map,
        plots,
        plotStyle,
        setActiveFeature
        )
      };
      
      L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map);
      
      var buildingMarkers = buildings.map(building => {
        var marker = L.marker(building.coordinates);
    marker.on("click", function() {
      console.log(building.name);
    });
    return marker;
  });
  
  var buildingsLayer = L.layerGroup(buildingMarkers);
  
  L.polyline(analysedArea as LatLngExpression[]).addTo(map);
  
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
  fullyAccessibleGreens: Green[];
  greensOpenDaytime: Green[];
  greensWithSpecialAccess: Green[];
  noAccessGreen: Green[];
  buildings: Building[];
}

export const ChurchyMap = ({
  plots,
  fullyAccessibleGreens,
  greensOpenDaytime,
  greensWithSpecialAccess,
  noAccessGreen,
  buildings
}: ChurchyMapProps): JSX.Element => {
  const [activeFeature, setActiveFeature] = React.useState<Feature>();
  console.log(activeFeature)

  useEffect(() => {
    const map = createMap(
      plots,
      fullyAccessibleGreens,
      greensOpenDaytime,
      greensWithSpecialAccess,
      noAccessGreen,
      buildings,
      setActiveFeature 
    );
    return () => {
      map.remove();
    };
  }, [plots, fullyAccessibleGreens, buildings]);

  return (
    <div>
    <div className="main-grid">
      <div id="map" style={{ height: "900px" }}></div>
      {/* BUILD A COM PONENT OR THIS, MAYBE WITH ANTD?! */}
      {activeFeature !== null && <div className="item-details">{activeFeature?.properties?.name}</div>}
    </div>
    </div>
  );
};
